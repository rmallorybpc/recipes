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
