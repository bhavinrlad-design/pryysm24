#!/bin/bash

set -e

echo "Starting Pryysm v2..."
export NODE_ENV=production
export PORT=${PORT:-8080}

# Set explicit PATH to node_modules/.bin FIRST
export PATH="/home/site/wwwroot/node_modules/.bin:/node_modules/.bin:$PATH"

# Install dependencies
npm install --legacy-peer-deps --omit=dev

# Start using explicit path to next
exec node /home/site/wwwroot/node_modules/.bin/next start
