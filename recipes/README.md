# Recipe Library Structure

This folder stores all known recipes.

## Organization

Recipes are organized by two dimensions:

1. Meal time: `breakfast`, `lunch`, `dinner`
2. Primary style: `meat`, `rice-or-pasta`, `soup-or-stew`, `handheld`, `baked-casserole`, `bowls`, `vegetarian`, `seafood`

Path pattern:

`recipes/<meal>/<style>/<recipe-name>.md`

Example:

`recipes/dinner/rice-or-pasta/chicken-alfredo.md`

## Add A New Recipe

1. Copy `recipes/recipe-template.md`
2. Save it into the correct meal/style folder
3. Fill in metadata fields and instructions
4. Add keywords that make searching easy

If you created a recipe via the Live page issue form, import it with:

`node ./scripts/import-recipe-from-issue.mjs --issue <number-or-issue-url>`

You can also label the issue with `ready-to-import` to trigger the GitHub Actions auto-import workflow.

## Naming Convention

Use lowercase and hyphens.

- Good: `beef-tacos.md`
- Good: `egg-fried-rice.md`
- Avoid: `Beef Tacos.md`

## Search

Use the helper script from the repository root:

`./scripts/find-recipe.sh --help`
