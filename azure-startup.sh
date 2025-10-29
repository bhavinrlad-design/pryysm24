#!/bin/bash

set -e

echo "=========================================="
echo "🚀 Starting Pryysm v2 Application"
echo "=========================================="

export NODE_ENV=production
export PORT=${PORT:-8080}

echo "Environment: $NODE_ENV"
echo "Port: $PORT"
echo "Working Directory: $(pwd)"
echo ""

# List what we have
echo "� Contents of current directory:"
ls -la | head -15
echo ""

# Check for standalone mode first
echo "🔍 Checking for standalone mode..."
if [ -d ".next/standalone" ]; then
  echo "✅ Standalone mode detected!"
  echo ""
  echo "📂 Contents of .next/standalone:"
  ls -la .next/standalone/ | head -15
  echo ""
  
  # Standalone mode is self-contained - just run it
  cd .next/standalone
  
  echo "📁 Changed to: $(pwd)"
  echo ""
  echo "🔍 Checking for node_modules in standalone..."
  if [ -d "node_modules" ]; then
    echo "✅ node_modules found in standalone"
  else
    echo "⚠️  node_modules NOT in standalone - this is a problem!"
    echo "   Listing contents:"
    ls -la
  fi
  echo ""
  
  echo "▶️  Starting server.js from standalone..."
  exec node server.js
else
  echo "⚠️  No standalone mode detected - falling back to project mode"
  echo ""
  
  # Fallback: Install dependencies and run normally
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
  
  echo "▶️  Starting with: npx next start"
  exec npx next start
fi
