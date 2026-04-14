# recipes

Family Recipe Book with a searchable structure.

## Live Page

https://rmallorybpc.github.io/recipes/

The live page opens a recipe explorer with browse and search filters.

Ingredient search page:

https://rmallorybpc.github.io/recipes/ingredients.html

## Repository Purpose

This repo is set up to store known recipes and make them easy to find by:

- Meal: breakfast, lunch, dinner
- Style: meat, rice-or-pasta, soup-or-stew, handheld, baked-casserole, bowls, vegetarian, seafood
- Keywords and free-text search

## Folder Layout

```
recipes/
	breakfast/
		meat/
		rice-or-pasta/
		soup-or-stew/
		handheld/
		baked-casserole/
		bowls/
		vegetarian/
		seafood/
	lunch/
		meat/
		rice-or-pasta/
		soup-or-stew/
		handheld/
		baked-casserole/
		bowls/
		vegetarian/
		seafood/
	dinner/
		meat/
		rice-or-pasta/
		soup-or-stew/
		handheld/
		baked-casserole/
		bowls/
		vegetarian/
		seafood/
```

Use this path shape for each recipe file:

`recipes/<meal>/<style>/<recipe-name>.md`

## Add A Recipe

1. Copy `recipes/recipe-template.md`
2. Save it in the correct category folder
3. Fill metadata (`meal`, `style`, `protein`, `cuisine`, `keywords`)
4. Add ingredients and instructions

If a recipe came in through the Live page as a GitHub issue, you can import it automatically:

`node ./scripts/import-recipe-from-issue.mjs --issue <number-or-issue-url>`

Example:

`node ./scripts/import-recipe-from-issue.mjs --issue 1`

What it updates:

- recipe markdown file under `recipes/<meal>/<style>/`
- corresponding `known-recipes.md`
- `RECIPES` list in `script.js`

Then regenerate ingredient data:

`node ./scripts/generate-ingredient-data.mjs`

### Automatic import via GitHub Actions

Apply the `ready-to-import` label to a recipe submission issue. The workflow in `.github/workflows/import-recipe-from-issue.yml` will:

- run the importer for that issue
- regenerate ingredient datasets
- open a pull request with the changes
- comment back on the issue with the PR link

You can also run it manually from Actions using the `Import Recipe From Issue` workflow and provide the issue number.

## Search Recipes

Use the helper script:

`./scripts/find-recipe.sh --help`

Examples:

- `./scripts/find-recipe.sh --meal dinner`
- `./scripts/find-recipe.sh --meal lunch --style meat`
- `./scripts/find-recipe.sh --q chicken`
- `./scripts/find-recipe.sh --meal breakfast --q quick`

More search guidance is in `docs/searching.md`.

## Generate Ingredient Dataset

Run this one-time batch command from repo root:

`node ./scripts/generate-ingredient-data.mjs`

It creates:

- `data/recipes-with-ingredients.json`
- `data/ingredient-index.json`

The generator uses this priority:

1. Existing `Source` links in `known-recipes.md`
2. Web search for missing recipe links
3. Title-based ingredient heuristics when scraping is unavailable

Each recipe includes an ingredient confidence score and ingredient source label.

## Validate Ingredient Accuracy With Claude Sonnet

You can run a model-based audit using GitHub Models (Claude Sonnet) after generation.

Local command:

`GITHUB_MODELS_TOKEN=<token> node ./scripts/verify-ingredient-data-with-model.mjs`

Optional environment variables:

- `GITHUB_MODELS_MODEL` (default: `anthropic/claude-3.5-sonnet`)
- `GITHUB_MODELS_ENDPOINT` (default: `https://models.inference.ai.azure.com`)
- `VALIDATION_SAMPLE_SIZE` (default: `46`)
- `VALIDATION_CHUNK_SIZE` (default: `8`)

Output report:

- `data/ingredient-validation-report.json`

GitHub Actions workflow:

- `.github/workflows/ingredient-data-validation.yml`

Run it from the Actions tab with workflow dispatch. It generates recipe data, validates it with Claude Sonnet, and uploads the report as an artifact.
