#!/bin/bash
echo "[DEBUG] Deployment process starting..."
echo "[DEBUG] Current directory: $(pwd)"
echo "[DEBUG] Directory contents:"
ls -la
echo "[DEBUG] Node version:"
node --version
echo "[DEBUG] NPM version:"
npm --version
echo "[DEBUG] Package.json exists:"
test -f package.json && echo "YES" || echo "NO"
echo "[DEBUG] Server.js exists:"
test -f server.js && echo "YES" || echo "NO"
echo "[DEBUG] Starting server..."
exec node server.js