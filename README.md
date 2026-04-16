---

# Family Recipe Book — A Meal Planning System Built on GitHub Pages

This started as a simple problem: our family kept losing track of recipes. Some were bookmarked, some were in a notes app, some existed only in someone's memory. Finding what to cook on a Tuesday night meant opening four different apps and still not having an answer.

So I built a structured recipe system on GitHub Pages — no backend, no database, no ongoing cost. What began as a searchable recipe collection grew into a full meal planning pipeline that connects a family recipe book to live grocery store deal data, Colorado seasonal produce availability, and an AI-assisted meal plan generator.

Everything runs on static files, GitHub Actions, and a small set of public APIs. The total infrastructure cost is zero.

## What This Is

A family recipe system with six interconnected pages:

**[Planner](https://rmallorybpc.github.io/recipes/)** — Browse 99 recipes by meal type and cooking style. Drag recipe cards into a weekly meal planning grid organized by day and meal slot.

**[Ingredient Search](https://rmallorybpc.github.io/recipes/ingredients.html)** — Find recipes by ingredient using AND/OR matching. Type what you have in the fridge and see what you can cook.

**[Seasonal](https://rmallorybpc.github.io/recipes/seasonal.html)** — See what Colorado produce is at peak right now, browse which recipes are best suited to each month, and check any ingredient's harvest window across the full year. Sourced from the Colorado Department of Agriculture produce calendar.

**[Deals](https://rmallorybpc.github.io/recipes/deals.html)** — This week's on-sale items at King Soopers Belleview Square, matched to recipes in the collection. Updated automatically every Wednesday morning via GitHub Actions using the Kroger Developer API.

**[Suggest](https://rmallorybpc.github.io/recipes/suggest.html)** — A rule-based meal plan generator that scores recipes against this week's deals, current seasonal availability, and household rules you define once and save. Monday and Wednesday time caps, skip days, dietary restrictions, cuisine preferences, and a repeat window to avoid the same cuisine two weeks in a row. Optionally refines with Claude via a one-click prompt handoff to Claude.ai.

**[Cost](https://rmallorybpc.github.io/recipes/cost.html)** — A recipe cost estimator that compares estimated ingredient costs across any two months of the year. Uses actual King Soopers shelf prices from the Kroger API as the baseline, adjusted with seasonal price multipliers derived from USDA Economic Research Service retail price data and the Colorado Department of Agriculture seasonal calendar. Ingredients without actual price data are marked as estimated.

## How the Data Pipeline Works

The system is built around a set of data files that live in the `data/` folder and are generated or updated by scripts and GitHub Actions workflows.

**Weekly on Wednesdays:** A GitHub Actions workflow authenticates to the Kroger Developer API, queries ingredient terms from the recipe collection against the King Soopers Belleview Square store, identifies items where the promotional price is below the regular shelf price, and commits `data/weekly-deals.json` back to the repo. The deals page reads this file on every page load. No server, no database — just a JSON file updated once a week.

**Recipe ingredient data:** Running `node ./scripts/generate-ingredient-data.mjs` processes all recipe markdown files, extracts and normalizes ingredients, cross-references them against the Colorado seasonal calendar, and cross-references again against the current week's deals. It produces three output files: `data/recipes-with-ingredients.json`, `data/seasonal-match.json`, and `data/deals-match.json`. The seasonal and deals pages read these files to show recipe matches.

**Ingredient prices:** Each Wednesday deals run also writes `data/ingredient-prices.json` as a side effect — capturing the actual non-sale shelf price for every ingredient that appeared in the deals search. This file accumulates over time. Each week it gains more actual price data, gradually replacing estimated category averages with real Kroger prices. The cost estimator uses this file as its price baseline.

**Seasonal price multipliers:** `data/seasonal-price-multipliers.json` encodes month-by-month price multipliers for every produce item, protein, and pantry category in the collection. Multipliers are derived from USDA retail price spread data and the CDA seasonal calendar. A multiplier below 1.00 means the item is cheaper than the annual baseline that month — peak season. A multiplier above 1.00 means it costs more — off-season import premium.

## Repository Structure
recipes/               # Recipe markdown files organized by meal and style
breakfast/
lunch/
dinner/
meat/
rice-or-pasta/
soup-or-stew/
handheld/
baked-casserole/
bowls/
vegetarian/
seafood/
data/                  # Generated data files (committed to repo, served as static JSON)
recipes-with-ingredients.json
seasonal-colorado.json
seasonal-match.json
seasonal-price-multipliers.json
weekly-deals.json
deals-match.json
ingredient-prices.json
kroger-locations.json
scripts/               # Node.js scripts for data generation and import
generate-ingredient-data.mjs
generate-seasonal-match.mjs
fetch-weekly-deals.mjs
import-recipe-from-issue.mjs
import-suggested-recipes.mjs
verify-ingredient-data-with-model.mjs
.github/workflows/     # GitHub Actions automation
fetch-weekly-deals.yml
import-recipe-from-issue.yml
ingredient-data-validation.yml
docs/                  # Additional documentation

Each recipe file follows this path shape: `recipes/<meal>/<style>/<recipe-name>.md`

## Adding a Recipe

The fastest path is through the Submit form on the live Planner page. Fill in the recipe fields and click Create GitHub Issue — it opens a prefilled issue in the correct template format. Apply the `ready-to-import` label and the import workflow runs automatically:

- Creates the recipe markdown file in the correct folder
- Updates `known-recipes.md`
- Updates the `RECIPES` array in `script.js`
- Regenerates ingredient datasets
- Opens a pull request with the changes
- Comments back on the issue with the PR link

You can also import manually from the command line:

```bash
node ./scripts/import-recipe-from-issue.mjs --issue <number>
```

After any import, regenerate the full data pipeline:

```bash
node ./scripts/generate-ingredient-data.mjs
```

## Running the Deals Fetch Locally

Requires a free Kroger Developer account at [developer.kroger.com](https://developer.kroger.com). Register an app to get a `client_id` and `client_secret`. Find your nearest King Soopers location ID from the store URL on kingsoopers.com — the last two path segments combine to form the ID (e.g. `/620/00100` → `62000100`).

```bash
KROGER_CLIENT_ID=your_id \
KROGER_CLIENT_SECRET=your_secret \
KROGER_LOCATION_ID=62000100 \
node ./scripts/fetch-weekly-deals.mjs
```

For automated weekly runs, add those three values as GitHub Secrets (`KROGER_CLIENT_ID`, `KROGER_CLIENT_SECRET`, `KROGER_LOCATION_ID`) and the Wednesday workflow handles the rest.

## Validating Ingredient Data with Claude Sonnet

A model-based audit workflow uses Claude Sonnet via GitHub Models to validate ingredient accuracy across the recipe collection. It samples recipes, checks ingredient lists against expected content, and produces a confidence report.

Run locally:

```bash
GITHUB_MODELS_TOKEN=<token> node ./scripts/verify-ingredient-data-with-model.mjs
```

Optional environment variables:
- `GITHUB_MODELS_MODEL` (default: `anthropic/claude-3.5-sonnet`)
- `GITHUB_MODELS_ENDPOINT` (default: `https://models.inference.ai.azure.com`)
- `VALIDATION_SAMPLE_SIZE` (default: `46`)
- `VALIDATION_CHUNK_SIZE` (default: `8`)

Or run it from the Actions tab using the `Ingredient Data Validation` workflow dispatch. Output is written to `data/ingredient-validation-report.json` and uploaded as a workflow artifact.

## Searching Recipes from the Command Line

```bash
./scripts/find-recipe.sh --meal dinner
./scripts/find-recipe.sh --meal lunch --style meat
./scripts/find-recipe.sh --q chicken
./scripts/find-recipe.sh --meal breakfast --q quick
```

Full search options are documented in `docs/searching.md`.

## Data Sources

| Data | Source | Update frequency |
|---|---|---|
| Weekly deals | [Kroger Developer API](https://developer.kroger.com) | Every Wednesday via GitHub Actions |
| Seasonal availability | [Colorado Department of Agriculture](https://ag.colorado.gov/markets/colorado-proud/colorado-produce-calendar) | Annual |
| Seasonal price multipliers | [USDA Economic Research Service](https://www.ers.usda.gov) + CDA calendar | Annual |
| Recipe ingredients | Source recipe pages + title heuristics | On import |
| Ingredient validation | Claude Sonnet via [GitHub Models](https://github.com/features/models) | On demand |

## Technical Notes

The site runs entirely on GitHub Pages with no server-side code. All data is pre-generated as static JSON files and served directly. The weekly deals automation is the only scheduled process — everything else is triggered manually or on recipe import. The Anthropic API is not called at runtime. The "Refine with Claude" feature on the Suggest page assembles context and opens Claude.ai in a new tab — no API key required from the user.

---
