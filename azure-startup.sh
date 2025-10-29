#!/bin/bash

# ============================================
# Pryysm Application Startup Script (Azure Linux)
# ============================================

set -e  # Exit on error

echo "=========================================="
echo "🚀 Starting Pryysm v2 Application"
echo "=========================================="

# Export production environment
export NODE_ENV=production
export PORT=${PORT:-8080}

echo "Environment: $NODE_ENV"
echo "Port: $PORT"
echo ""

# Step 1: Clean old npm cache (sometimes helps on Azure)
echo "🧹 Cleaning npm cache..."
npm cache clean --force 2>/dev/null || true

# Step 2: Install dependencies FRESH
echo "📦 Installing dependencies..."
rm -rf node_modules package-lock.json 2>/dev/null || true
npm install --legacy-peer-deps --no-optional --omit=dev

echo "✅ Dependencies installed"
echo ""

# Step 3: Verify build output exists
echo "🔍 Verifying build output..."
if [ ! -d ".next" ]; then
  echo "⚠️  .next folder missing! Rebuilding..."
  npm run build
else
  echo "✅ .next folder found"
fi

# Step 4: Verify package.json and index.js
if [ ! -f "package.json" ]; then
  echo "❌ ERROR: package.json not found!"
  exit 1
fi

if [ ! -f "index.js" ]; then
  echo "⚠️  index.js not found, will use 'npm start'"
fi

echo ""
echo "=========================================="
echo "▶️  Starting application..."
echo "=========================================="
echo ""

# Step 5: Start the application
exec npm start
