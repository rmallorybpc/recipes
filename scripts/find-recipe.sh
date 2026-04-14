#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RECIPES_DIR="$ROOT_DIR/recipes"

meal=""
style=""
query=""

usage() {
  cat <<'EOF'
Search recipes by meal, style, and free text.

Usage:
  ./scripts/find-recipe.sh [--meal breakfast|lunch|dinner] [--style meat|rice-or-pasta|other] [--q text]

Examples:
  ./scripts/find-recipe.sh --meal dinner --style meat
  ./scripts/find-recipe.sh --q chicken
  ./scripts/find-recipe.sh --meal lunch --q quick
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --meal)
      meal="$2"
      shift 2
      ;;
    --style)
      style="$2"
      shift 2
      ;;
    --q)
      query="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

search_path="$RECIPES_DIR"
if [[ -n "$meal" ]]; then
  search_path="$search_path/$meal"
fi
if [[ -n "$style" ]]; then
  search_path="$search_path/$style"
fi

if [[ ! -d "$search_path" ]]; then
  echo "No such category path: $search_path" >&2
  exit 1
fi

if [[ -n "$query" ]]; then
  rg -i --files-with-matches "$query" "$search_path" --glob '*.md' || true
else
  find "$search_path" -type f -name '*.md' ! -name 'README.md' ! -name 'recipe-template.md' | sort
fi
