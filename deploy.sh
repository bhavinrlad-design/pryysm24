#!/bin/bash

# Custom Azure App Service deployment script
echo "🔧 Starting Kudu deployment..."

# Set deployment source
DEPLOYMENT_SOURCE=$DEPLOYMENT_SOURCE

# Install production dependencies
echo "📦 Installing production dependencies..."
npm install --legacy-peer-deps --production

# Generate Prisma client
echo "🔨 Generating Prisma client..."
npx prisma generate

# Build Next.js
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Deployment complete!"
