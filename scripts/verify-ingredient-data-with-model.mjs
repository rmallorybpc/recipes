#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_PATH = path.join(ROOT_DIR, "data", "recipes-with-ingredients.json");
const REPORT_PATH = path.join(ROOT_DIR, "data", "ingredient-validation-report.json");

const MODELS_ENDPOINT = process.env.GITHUB_MODELS_ENDPOINT || "https://models.inference.ai.azure.com";
const MODELS_TOKEN = process.env.GITHUB_MODELS_TOKEN || "";
const MODELS_MODEL = process.env.GITHUB_MODELS_MODEL || "anthropic/claude-3.5-sonnet";
const VALIDATION_SAMPLE_SIZE = Math.max(1, Number.parseInt(process.env.VALIDATION_SAMPLE_SIZE || "46", 10));
const CHUNK_SIZE = Math.max(1, Number.parseInt(process.env.VALIDATION_CHUNK_SIZE || "8", 10));

function pickSample(recipes, sampleSize) {
  if (recipes.length <= sampleSize) {
    return recipes;
  }

  const stride = Math.max(1, Math.floor(recipes.length / sampleSize));
  const selected = [];

  for (let i = 0; i < recipes.length && selected.length < sampleSize; i += stride) {
    selected.push(recipes[i]);
  }

  return selected.slice(0, sampleSize);
}

function toChunks(items, chunkSize) {
  const chunks = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}

function parseFirstJsonObject(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch (_error) {
    return null;
  }
}

function promptForChunk(chunk) {
  return [
    "You are auditing recipe ingredient accuracy.",
    "For each recipe, evaluate if the ingredient list is plausible for the title and category.",
    "Respond with strict JSON only.",
    "",
    "Return schema:",
    "{",
    '  "audits": [',
    "    {",
    '      "id": "string",',
    '      "verdict": "accurate" | "mostly_accurate" | "likely_inaccurate",',
    '      "confidence": number,',
    '      "reasons": ["string"],',
    '      "missing_likely_ingredients": ["string"],',
    '      "suspicious_ingredients": ["string"],',
    '      "suggested_corrections": ["string"]',
    "    }",
    "  ]",
    "}",
    "",
    "Recipes to audit:",
    JSON.stringify(
      chunk.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        meal: recipe.meal,
        style: recipe.style,
        ingredient_source: recipe.ingredient_source,
        confidence: recipe.confidence,
        ingredients: recipe.ingredients_normalized || recipe.ingredients || []
      })),
      null,
      2
    )
  ].join("\n");
}

async function callModel(prompt) {
  const response = await fetch(`${MODELS_ENDPOINT}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${MODELS_TOKEN}`
    },
    body: JSON.stringify({
      model: MODELS_MODEL,
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are a meticulous culinary QA reviewer. Always return valid JSON matching the requested schema."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Model request failed: ${response.status} ${body.slice(0, 300)}`);
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content || "";
  const parsed = parseFirstJsonObject(content);

  if (!parsed || !Array.isArray(parsed.audits)) {
    throw new Error("Model response did not contain parseable audits JSON.");
  }

  return parsed.audits;
}

function summarizeAudits(audits) {
  const summary = {
    total_audited: audits.length,
    accurate: 0,
    mostly_accurate: 0,
    likely_inaccurate: 0,
    avg_confidence: 0
  };

  for (const audit of audits) {
    const verdict = audit.verdict;
    if (verdict === "accurate") {
      summary.accurate += 1;
    } else if (verdict === "mostly_accurate") {
      summary.mostly_accurate += 1;
    } else {
      summary.likely_inaccurate += 1;
    }

    summary.avg_confidence += Number(audit.confidence) || 0;
  }

  summary.avg_confidence = summary.total_audited
    ? Number((summary.avg_confidence / summary.total_audited).toFixed(3))
    : 0;

  return summary;
}

async function main() {
  if (!MODELS_TOKEN) {
    throw new Error("Missing GITHUB_MODELS_TOKEN environment variable.");
  }

  const payload = JSON.parse(await fs.readFile(DATA_PATH, "utf8"));
  const recipes = Array.isArray(payload.recipes) ? payload.recipes : [];

  if (!recipes.length) {
    throw new Error("No recipes found in data/recipes-with-ingredients.json.");
  }

  const sample = pickSample(recipes, VALIDATION_SAMPLE_SIZE);
  const chunks = toChunks(sample, CHUNK_SIZE);

  const audits = [];
  for (const chunk of chunks) {
    const prompt = promptForChunk(chunk);
    const chunkAudits = await callModel(prompt);
    audits.push(...chunkAudits);
  }

  const byId = new Map(audits.map((audit) => [audit.id, audit]));
  const orderedAudits = sample
    .filter((recipe) => byId.has(recipe.id))
    .map((recipe) => ({
      ...byId.get(recipe.id),
      id: recipe.id,
      title: recipe.title,
      meal: recipe.meal,
      style: recipe.style,
      ingredient_source: recipe.ingredient_source
    }));

  const summary = summarizeAudits(orderedAudits);

  const report = {
    generated_at: new Date().toISOString(),
    model: MODELS_MODEL,
    endpoint: MODELS_ENDPOINT,
    sample_size_requested: VALIDATION_SAMPLE_SIZE,
    sample_size_audited: orderedAudits.length,
    summary,
    audits: orderedAudits
  };

  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(`Validation report written to ${path.relative(ROOT_DIR, REPORT_PATH)}`);
  console.log(
    `Audited ${summary.total_audited}: accurate=${summary.accurate}, mostly_accurate=${summary.mostly_accurate}, likely_inaccurate=${summary.likely_inaccurate}`
  );

  if (summary.likely_inaccurate > 0) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error("Failed to validate ingredient data with model.");
  console.error(error.message || error);
  process.exit(1);
});
