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

# Step 1: Verify we're in the right directory
echo "📍 Current directory: $(pwd)"
echo "📁 Contents:"
ls -la | head -20
echo ""

# Step 2: Install dependencies (fresh)
echo "📦 Installing production dependencies..."
npm install --legacy-peer-deps --omit=dev --no-save

echo "✅ Dependencies installed"
echo ""

# Step 3: Verify build output exists - CRITICAL
echo "🔍 Verifying build output (.next folder)..."
if [ ! -d ".next" ]; then
  echo "⚠️  .next folder missing! Rebuilding from source..."
  npm run build
  if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
  fi
else
  echo "✅ .next folder found:"
  du -sh .next/
fi

echo ""
echo "=========================================="
echo "✅ All checks passed!"
echo "▶️  Starting application with 'npm start'"
echo "=========================================="
echo ""

# Step 4: Start the application (npm start = next start)
exec npm start
