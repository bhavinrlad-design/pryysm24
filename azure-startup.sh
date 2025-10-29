#!/bin/bash

set -e

echo "Starting Pryysm v2..."
export NODE_ENV=production
export PORT=${PORT:-8080}

# Install dependencies
npm install --legacy-peer-deps --omit=dev

# Start the server
npm start
