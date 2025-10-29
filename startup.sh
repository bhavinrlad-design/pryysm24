#!/bin/bash
set -e

echo "🚀 Starting Pryysm Application"
echo "Node Version: $(node --version)"
echo "npm Version: $(npm --version)"
echo "Environment: ${NODE_ENV:-production}"
echo "Port: ${PORT:-8080}"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install --legacy-peer-deps
fi

# Start application in foreground
echo "▶️ Starting Node.js server..."
export NODE_ENV=${NODE_ENV:-production}
exec node index.js
