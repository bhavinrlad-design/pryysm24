#!/bin/bash

echo "=========================================="
echo "🔍 PRYYSM APPLICATION DIAGNOSTICS"
echo "=========================================="
echo ""

echo "📋 ENVIRONMENT VARIABLES:"
echo "  NODE_ENV: ${NODE_ENV:-NOT SET}"
echo "  PORT: ${PORT:-8080}"
echo "  DATABASE_URL: ${DATABASE_URL:0:50}${DATABASE_URL:50:1:+...}"
echo "  NEXTAUTH_URL: ${NEXTAUTH_URL:-NOT SET}"
echo "  NEXTAUTH_SECRET: ${NEXTAUTH_SECRET:0:10}${NEXTAUTH_SECRET:10:1:+...}"
echo ""

echo "📦 NODE & NPM:"
echo "  Node: $(node --version)"
echo "  npm: $(npm --version)"
echo ""

echo "📁 FILE SYSTEM:"
echo "  .next exists: $([ -d '.next' ] && echo 'YES' || echo 'NO')"
echo "  node_modules exists: $([ -d 'node_modules' ] && echo 'YES' || echo 'NO')"
echo "  index.js exists: $([ -f 'index.js' ] && echo 'YES' || echo 'NO')"
echo "  package.json exists: $([ -f 'package.json' ] && echo 'YES' || echo 'NO')"
echo ""

echo "📊 DIRECTORY SIZE:"
echo "  .next: $([ -d '.next' ] && du -sh .next | cut -f1 || echo 'N/A')"
echo "  node_modules: $([ -d 'node_modules' ] && du -sh node_modules | cut -f1 || echo 'N/A')"
echo ""

echo "=========================================="
echo "🚀 ATTEMPTING TO START APPLICATION..."
echo "=========================================="
echo ""

# Install dependencies if missing
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (this may take a minute)..."
  npm install --legacy-peer-deps
  echo ""
fi

# Start the application
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-8080}

echo "▶️  Starting: node index.js"
echo "Environment: $NODE_ENV"
echo "Port: $PORT"
echo ""

exec node index.js
