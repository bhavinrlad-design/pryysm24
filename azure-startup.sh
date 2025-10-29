#!/bin/bash

set -e

echo "=========================================="
echo "🚀 Starting Pryysm v2 Application"
echo "=========================================="

export NODE_ENV=production
export PORT=${PORT:-8080}

echo "Environment: $NODE_ENV"
echo "Port: $PORT"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps --omit=dev

echo "✅ Dependencies installed"
echo ""

# Verify .next exists
echo "🔍 Checking .next folder..."
if [ ! -d ".next" ]; then
  echo "⚠️  .next not found, rebuilding..."
  npm run build
fi

echo "✅ Ready to start"
echo ""
echo "▶️  Starting with: npx next start"
echo ""

# Start using Next.js built-in server (using npx to ensure it finds next)
exec npx next start
