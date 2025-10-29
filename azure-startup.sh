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

# Check for standalone mode
echo "🔍 Checking for standalone mode..."
if [ -d ".next/standalone" ]; then
  echo "✅ Standalone mode detected - copying files..."
  # Copy necessary files to standalone directory
  cp package*.json .next/standalone/ 2>/dev/null || true
  cp -r public .next/standalone/ 2>/dev/null || true
  cp -r prisma .next/standalone/ 2>/dev/null || true
  
  # Change to standalone directory
  cd .next/standalone
  
  echo "📁 Current directory: $(pwd)"
  echo "▶️  Starting with standalone Next.js server"
  echo ""
  
  # Start the server (standalone includes node_modules)
  exec node server.js
else
  echo "📁 Standard mode - running from project root"
  echo ""
  echo "▶️  Starting with: npx next start"
  echo ""
  
  # Standard mode - start using Next.js built-in server
  exec npx next start
fi
