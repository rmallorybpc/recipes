#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const VALID_MEALS = new Set(["breakfast", "lunch", "dinner"]);
const VALID_STYLES = new Set([
	"meat",
	"rice-or-pasta",
	"soup-or-stew",
	"handheld",
	"baked-casserole",
	"bowls",
	"vegetarian",
	"seafood"
]);

function usage() {
	console.log(`Import a recipe submitted via GitHub issue into repository files.

Usage:
	node ./scripts/import-recipe-from-issue.mjs --issue <number|url> [--repo owner/name] [--force]

Examples:
	node ./scripts/import-recipe-from-issue.mjs --issue 1
	node ./scripts/import-recipe-from-issue.mjs --issue https://github.com/rmallorybpc/recipes/issues/1
	node ./scripts/import-recipe-from-issue.mjs --issue 42 --repo rmallorybpc/recipes

Notes:
	- Uses GITHUB_TOKEN (or GH_TOKEN) if available.
	- Updates recipe markdown, known-recipes.md, and script.js RECIPES list.
	- Does not regenerate ingredient data automatically.
`);
}

function parseArgs(argv) {
	const args = {
		issue: "",
		repo: process.env.GITHUB_REPOSITORY || "rmallorybpc/recipes",
		force: false
	};

	for (let i = 0; i < argv.length; i += 1) {
		const token = argv[i];

		if (token === "--issue") {
			args.issue = argv[i + 1] || "";
			i += 1;
			continue;
		}

		if (token === "--repo") {
			args.repo = argv[i + 1] || "";
			i += 1;
			continue;
		}

		if (token === "--force") {
			args.force = true;
			continue;
		}

		if (token === "-h" || token === "--help") {
			usage();
			process.exit(0);
		}

		throw new Error(`Unknown argument: ${token}`);
	}

	if (!args.issue) {
		throw new Error("Missing required --issue argument");
	}

	if (!args.repo || !args.repo.includes("/")) {
		throw new Error("--repo must be in owner/name format");
	}

	return args;
}

function extractIssueNumber(issueArg) {
	if (/^\d+$/.test(issueArg)) {
		return Number.parseInt(issueArg, 10);
	}

	const match = issueArg.match(/\/issues\/(\d+)(?:\D|$)/i);
	if (!match) {
		throw new Error(`Could not parse issue number from: ${issueArg}`);
	}

	return Number.parseInt(match[1], 10);
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/-{2,}/g, "-");
}

function parseFrontmatter(markdown) {
	const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
	if (!match) {
		throw new Error("Recipe markdown is missing YAML frontmatter");
	}

	const fields = {};
	const lines = match[1].split(/\r?\n/);

	for (const line of lines) {
		const entry = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
		if (!entry) {
			continue;
		}

		const key = entry[1].trim();
		const rawValue = entry[2].trim();
		fields[key] = rawValue.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
	}

	return fields;
}

function parseIssueRecipeBody(body) {
	const pathMatch = body.match(/^Suggested file path:\s*(\S+)\s*$/im);

	const codeBlockMatch = body.match(/```(?:md|markdown)?\s*\n([\s\S]*?)```/i);
	if (!codeBlockMatch) {
		throw new Error("Issue body does not contain a markdown code block");
	}

	const recipeMarkdown = codeBlockMatch[1].trim() + "\n";
	const frontmatter = parseFrontmatter(recipeMarkdown);

	const title = frontmatter.title || "";
	const meal = frontmatter.meal || "";
	const style = frontmatter.style || "";

	if (!title || !meal || !style) {
		throw new Error("Recipe markdown frontmatter must include title, meal, and style");
	}

	if (!VALID_MEALS.has(meal)) {
		throw new Error(`Invalid meal value in frontmatter: ${meal}`);
	}

	if (!VALID_STYLES.has(style)) {
		throw new Error(`Invalid style value in frontmatter: ${style}`);
	}

	const suggestedPath = pathMatch ? pathMatch[1].trim() : "";
	const sourceMatch = recipeMarkdown.match(/^\s*-\s*Source:\s*(https?:\/\/\S+)\s*$/im);
	const source = sourceMatch ? sourceMatch[1].trim() : "";

	return {
		title,
		meal,
		style,
		source,
		suggestedPath,
		recipeMarkdown
	};
}

async function fetchIssue({ owner, repo, issueNumber, token }) {
	const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`, {
		headers: {
			accept: "application/vnd.github+json",
			"user-agent": "recipes-issue-importer/1.0",
			...(token ? { authorization: `Bearer ${token}` } : {})
		}
	});

	if (!response.ok) {
		const details = await response.text();
		throw new Error(`GitHub API request failed (${response.status}): ${details.slice(0, 400)}`);
	}

	return response.json();
}

function chooseRecipePath(parsedRecipe) {
	const fallback = `recipes/${parsedRecipe.meal}/${parsedRecipe.style}/${slugify(parsedRecipe.title)}.md`;
	if (!parsedRecipe.suggestedPath) {
		return fallback;
	}

	const normalized = parsedRecipe.suggestedPath.replace(/^\.\//, "");
	if (!normalized.startsWith("recipes/")) {
		return fallback;
	}

	const segments = normalized.split("/");
	if (segments.length < 4) {
		return fallback;
	}

	const [, meal, style] = segments;
	if (meal !== parsedRecipe.meal || style !== parsedRecipe.style) {
		return fallback;
	}

	if (!normalized.endsWith(".md")) {
		return fallback;
	}

	return normalized;
}

async function writeRecipeFile(recipePath, recipeMarkdown, force) {
	const absPath = path.join(ROOT_DIR, recipePath);
	await fs.mkdir(path.dirname(absPath), { recursive: true });

	let exists = false;
	try {
		await fs.access(absPath);
		exists = true;
	} catch (_error) {
		exists = false;
	}

	if (exists && !force) {
		return { absPath, updated: false, skipped: true };
	}

	await fs.writeFile(absPath, recipeMarkdown, "utf8");
	return { absPath, updated: true, skipped: false };
}

function appendKnownRecipeEntry(existingText, title, source) {
	const titleRegex = new RegExp(`^\\s*-\\s+${escapeRegExp(title)}\\s*$`, "im");
	if (titleRegex.test(existingText)) {
		return { text: existingText, updated: false };
	}

	const trimmed = existingText.replace(/\s+$/g, "");
	const lines = ["", `- ${title}`];
	if (source) {
		lines.push(`  - Source: ${source}`);
	}

	return { text: `${trimmed}\n${lines.join("\n")}\n`, updated: true };
}

async function updateKnownRecipes(parsedRecipe) {
	const knownPath = path.join(ROOT_DIR, "recipes", parsedRecipe.meal, parsedRecipe.style, "known-recipes.md");

	let content = "";
	try {
		content = await fs.readFile(knownPath, "utf8");
	} catch (_error) {
		const heading = `# ${parsedRecipe.meal[0].toUpperCase()}${parsedRecipe.meal.slice(1)} ${parsedRecipe.style} Recipes`;
		content = `${heading}\n`;
	}

	const result = appendKnownRecipeEntry(content, parsedRecipe.title, parsedRecipe.source);
	if (!result.updated) {
		return { path: knownPath, updated: false };
	}

	await fs.writeFile(knownPath, result.text, "utf8");
	return { path: knownPath, updated: true };
}

function buildRecipeObjectSnippet(parsedRecipe) {
	const safeTitle = parsedRecipe.title.replace(/"/g, '\\"');
	if (parsedRecipe.source) {
		const safeSource = parsedRecipe.source.replace(/"/g, '\\"');
		return [
			"  {",
			`    name: \"${safeTitle}\",`,
			`    meal: \"${parsedRecipe.meal}\",`,
			`    style: \"${parsedRecipe.style}\",`,
			`    source: \"${safeSource}\"`,
			"  },"
		].join("\n");
	}

	return `  { name: \"${safeTitle}\", meal: \"${parsedRecipe.meal}\", style: \"${parsedRecipe.style}\" },`;
}

async function updateScriptRecipes(parsedRecipe) {
	const scriptPath = path.join(ROOT_DIR, "script.js");
	const source = await fs.readFile(scriptPath, "utf8");

	const alreadyExistsRegex = new RegExp(
		`name:\\s*\"${escapeRegExp(parsedRecipe.title)}\"[\\s\\S]{0,160}meal:\\s*\"${parsedRecipe.meal}\"[\\s\\S]{0,160}style:\\s*\"${parsedRecipe.style}\"`,
		"m"
	);

	if (alreadyExistsRegex.test(source)) {
		return { path: scriptPath, updated: false };
	}

	const anchor = "\n];\n\nconst mealFilter";
	const anchorIndex = source.indexOf(anchor);
	if (anchorIndex === -1) {
		throw new Error("Could not find RECIPES array closing in script.js");
	}

	const snippet = buildRecipeObjectSnippet(parsedRecipe);
	const beforeAnchor = source.slice(0, anchorIndex);
	const separator = beforeAnchor.trimEnd().endsWith(",") ? "\n" : ",\n";
	const insertion = `${separator}${snippet}`;
	const updatedSource = `${beforeAnchor}${insertion}${source.slice(anchorIndex)}`;

	await fs.writeFile(scriptPath, updatedSource, "utf8");
	return { path: scriptPath, updated: true };
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	const issueNumber = extractIssueNumber(args.issue);
	const [owner, repo] = args.repo.split("/");
	const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

	const issue = await fetchIssue({ owner, repo, issueNumber, token });
	if (issue.pull_request) {
		throw new Error(`Issue #${issueNumber} is a pull request, not an issue`);
	}

	const body = typeof issue.body === "string" ? issue.body : "";
	if (!body.trim()) {
		throw new Error(`Issue #${issueNumber} has no body`);
	}

	const parsedRecipe = parseIssueRecipeBody(body);
	const recipePath = chooseRecipePath(parsedRecipe);
	const recipeResult = await writeRecipeFile(recipePath, parsedRecipe.recipeMarkdown, args.force);
	const knownResult = await updateKnownRecipes(parsedRecipe);
	const scriptResult = await updateScriptRecipes(parsedRecipe);

	console.log(`Imported issue #${issueNumber}: ${parsedRecipe.title}`);
	console.log(`- Recipe file: ${path.relative(ROOT_DIR, recipeResult.absPath)} ${recipeResult.updated ? "(written)" : "(already exists, skipped)"}`);
	console.log(`- Known recipes: recipes/${parsedRecipe.meal}/${parsedRecipe.style}/known-recipes.md ${knownResult.updated ? "(updated)" : "(already listed)"}`);
	console.log(`- Homepage list: script.js ${scriptResult.updated ? "(updated)" : "(already listed)"}`);
	console.log("Next: run node ./scripts/generate-ingredient-data.mjs to refresh ingredient search data.");
}

main().catch((error) => {
	console.error(`Error: ${error.message}`);
	process.exit(1);
});
