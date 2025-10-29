#!/bin/bash
set -e

echo "🚀 Starting Pryysm Application"
echo "Node Version: $(node --version)"
echo "npm Version: $(npm --version)"
echo "Environment: ${NODE_ENV:-production}"
echo "Port: ${PORT:-8080}"
echo ""

# Always do a fresh npm install to be safe
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps || true

# Verify .next exists
if [ ! -d ".next" ]; then
  echo "⚠️  Warning: .next folder not found! Application build output missing."
  echo "Attempting to rebuild..."
  npm run build
fi

# Start application in foreground
echo "▶️ Starting Node.js server..."
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-8080}

echo "Server will listen on: http://0.0.0.0:${PORT}"
echo ""

exec node index.js
