# recipes

Family Recipe Book with a searchable structure.

## Repository Purpose

This repo is set up to store known recipes and make them easy to find by:

- Meal: breakfast, lunch, dinner
- Style: meat, rice-or-pasta, other
- Keywords and free-text search

## Folder Layout

```
recipes/
	breakfast/
		meat/
		rice-or-pasta/
		other/
	lunch/
		meat/
		rice-or-pasta/
		other/
	dinner/
		meat/
		rice-or-pasta/
		other/
```

Use this path shape for each recipe file:

`recipes/<meal>/<style>/<recipe-name>.md`

## Add A Recipe

1. Copy `recipes/recipe-template.md`
2. Save it in the correct category folder
3. Fill metadata (`meal`, `style`, `protein`, `cuisine`, `keywords`)
4. Add ingredients and instructions

## Search Recipes

Use the helper script:

`./scripts/find-recipe.sh --help`

Examples:

- `./scripts/find-recipe.sh --meal dinner`
- `./scripts/find-recipe.sh --meal lunch --style meat`
- `./scripts/find-recipe.sh --q chicken`
- `./scripts/find-recipe.sh --meal breakfast --q quick`

More search guidance is in `docs/searching.md`.
