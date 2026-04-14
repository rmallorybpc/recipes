# Recipe Search Guide

Use `./scripts/find-recipe.sh` from the repository root.

## Quick Filters

- By meal: `--meal breakfast|lunch|dinner`
- By style: `--style meat|rice-or-pasta|soup-or-stew|handheld|baked-casserole|bowls|vegetarian|seafood`
- By keyword or text: `--q <text>`

## Useful Search Patterns

- Fast weeknight ideas:
  `./scripts/find-recipe.sh --q quick`
- High-protein options:
  `./scripts/find-recipe.sh --q high-protein`
- Meal prep recipes:
  `./scripts/find-recipe.sh --q meal-prep`
- Cuisine search:
  `./scripts/find-recipe.sh --q italian`

## Recommendations For Better Findability

1. Always fill `keywords` in each recipe.
2. Keep recipe titles descriptive, like `one-pan-chicken-rice`.
3. Add tags for dietary needs such as `gluten-free`, `dairy-free`, `vegetarian`.
4. Add tags for context such as `kid-friendly`, `freezer`, `holiday`, `budget`.
5. Include key ingredient names in title and ingredients list.

## Ingredient Subpage

Open `ingredients.html` to search recipes by ingredient.

Supported filtering:

- Single ingredient lookup
- Multiple ingredients with AND match mode
- Multiple ingredients with OR match mode
- Meal and style filters combined with ingredient matching

## Build Ingredient Data

Before using ingredient search, generate the dataset:

`node ./scripts/generate-ingredient-data.mjs`

The generated files are:

- `data/recipes-with-ingredients.json`
- `data/ingredient-index.json`

Ingredient confidence labels indicate whether ingredients came from source-page scraping, search + scraping, or title heuristics.

## Model-Based Accuracy Verification

To add an LLM quality check (Claude Sonnet via GitHub Models), run:

`GITHUB_MODELS_TOKEN=<token> node ./scripts/verify-ingredient-data-with-model.mjs`

The script writes:

- `data/ingredient-validation-report.json`

The report includes verdicts (`accurate`, `mostly_accurate`, `likely_inaccurate`), confidence scores, and suggested corrections per recipe.
