#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const RECIPES_DIR = path.join(ROOT_DIR, "recipes");

function parseArgs(argv) {
  return {
    dryRun: argv.includes("--dry-run")
  };
}

async function walkMarkdownFiles(dirPath) {
  const out = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkMarkdownFiles(fullPath)));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }

    if (entry.name === "known-recipes.md" || entry.name === "README.md" || entry.name === "recipe-template.md") {
      continue;
    }

    out.push(fullPath);
  }

  return out;
}

function normalizeStepText(raw) {
  let text = raw.trim();

  text = text.replace(/^STEP\s*\d+\s*-\s*/i, "");
  text = text.replace(/^step\s*\d+\.?\s*/i, "");
  text = text.replace(/^Add['’]?l\s+ingredients\s*:/i, "Additional ingredients:");
  text = text.replace(/\bsiracha\b/gi, "sriracha");

  if (/^(?:step\s*\d+\.?|\d+\.?)$/i.test(text)) {
    return "";
  }

  text = text.trim();
  if (!text) {
    return "";
  }

  if (!/[.!?:]$/.test(text)) {
    text = `${text}.`;
  }

  return text;
}

function cleanInstructionsSection(content) {
  const lines = content.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === "## Instructions");
  if (start === -1) {
    return { content, changed: false, removedMarkers: 0 };
  }

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }

  const sectionLines = lines.slice(start + 1, end);
  const stepTexts = [];
  let removedMarkers = 0;

  for (const line of sectionLines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    let candidate = trimmed;
    const numbered = trimmed.match(/^\d+\.\s*(.+)$/);
    if (numbered) {
      candidate = numbered[1].trim();
    }

    const normalized = normalizeStepText(candidate);
    if (!normalized) {
      removedMarkers += 1;
      continue;
    }

    stepTexts.push(normalized);
  }

  if (stepTexts.length === 0) {
    return { content, changed: false, removedMarkers };
  }

  const rebuilt = [
    "## Instructions",
    "",
    ...stepTexts.map((step, index) => `${index + 1}. ${step}`),
    ""
  ];

  const nextLines = [
    ...lines.slice(0, start),
    ...rebuilt,
    ...lines.slice(end)
  ];

  const nextContent = `${nextLines.join("\n").replace(/\n+$/g, "\n")}`;
  const changed = nextContent !== content;

  return {
    content: nextContent,
    changed,
    removedMarkers
  };
}

function cleanMiscTypos(content) {
  let next = content;
  next = next.replace(/^cuisine:\s*"Venezulan"\s*$/m, 'cuisine: "Venezuelan"');
  next = next.replace(/Add['’]?l\s+ingredients/gi, "Additional ingredients");
  next = next.replace(/\bsiracha\b/gi, "sriracha");
  return next;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = await walkMarkdownFiles(RECIPES_DIR);

  let scanned = 0;
  let touched = 0;
  let markerLinesRemoved = 0;

  for (const file of files) {
    let content = await fs.readFile(file, "utf8");

    if (!/^source_url:\s*https?:\/\/www\.themealdb\.com\/meal\//m.test(content)) {
      continue;
    }

    scanned += 1;

    let next = cleanMiscTypos(content);
    const instructionsResult = cleanInstructionsSection(next);
    next = instructionsResult.content;
    markerLinesRemoved += instructionsResult.removedMarkers;

    if (next !== content) {
      touched += 1;
      if (!args.dryRun) {
        await fs.writeFile(file, next, "utf8");
      }
    }
  }

  console.log("===== MealDB Markdown Cleanup =====");
  console.log(`Mode:              ${args.dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`Scanned files:     ${scanned}`);
  console.log(`Touched files:     ${touched}`);
  console.log(`Marker lines gone: ${markerLinesRemoved}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
