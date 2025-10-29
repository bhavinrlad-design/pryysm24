#!/bin/bash

set -e

echo "Starting Pryysm v2..."
export NODE_ENV=production
export PORT=${PORT:-8080}

# Install dependencies
npm install --legacy-peer-deps --omit=dev

# Make sure next binary is accessible globally
if [ -f "./node_modules/.bin/next" ]; then
  echo "Found next binary, ensuring it's accessible..."
  cp ./node_modules/.bin/next /usr/local/bin/next || true
  chmod +x /usr/local/bin/next
fi

# Start using next
exec next start
