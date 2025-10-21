#!/bin/bash
# Script to test the production build locally

# Ensure we're in the project root
cd "$(dirname "$0")"

# Stop the script if any command fails
set -e

echo "🔍 Testing production build for Azure deployment..."

# Clean any previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next || true

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run Prisma generate
echo "🔄 Generating Prisma client..."
npx prisma generate

# Build for production
echo "🔨 Building for production..."
npm run build

# Test the server
echo "🚀 Starting the production server..."
echo "📝 Press Ctrl+C to stop the server when done testing."
NODE_ENV=production npm start