#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PREVIEW="$ROOT/preview"

mkdir -p "$PREVIEW"

for file in index.html project.html; do
  sed \
    -e "s|href=\"images/|href=\"../images/|g" \
    -e "s|src=\"images/|src=\"../images/|g" \
    -e "s|'images/|'../images/|g" \
    -e "s|\"images/|\"../images/|g" \
    -e "s|href=\"TaylorSimpson_Resume.pdf\"|href=\"../TaylorSimpson_Resume.pdf\"|g" \
    -e "s|<head>|<head>\n    <meta name=\"robots\" content=\"noindex, nofollow\">\n    <script>if(sessionStorage.getItem('preview-auth')!=='ok')document.documentElement.classList.add('auth-pending');</script>\n    <style>html.auth-pending body{visibility:hidden}</style>|" \
    "$ROOT/$file" > "$PREVIEW/$file"

  # Inject auth script before </body>
  sed -i '' 's|</body>|    <script src="auth.js"></script>\n</body>|' "$PREVIEW/$file"
done

echo "Preview built in $PREVIEW"
