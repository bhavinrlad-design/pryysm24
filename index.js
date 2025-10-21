#!/usr/bin/env node

/**
 * Standalone server wrapper for Azure
 * Minimal initialization - just delegates to Next.js
 */

process.env.NODE_ENV = 'production';

const next = require('next');
const app = next({ dev: false });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  require('http').createServer(handle).listen(process.env.PORT || 8080, () => {
    console.log(`Ready on http://localhost:${process.env.PORT || 8080}`);
  });
}).catch(err => {
  console.error('Failed to start:', err);
  process.exit(1);
});



