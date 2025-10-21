#!/usr/bin/env node

/**
 * DUMB TEST: Just respond, don't load Next.js at all
 */

const http = require('http');
const port = process.env.PORT || 8080;

console.log(`[${Date.now()}] TEST SERVER STARTING`);

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello from test server at ${new Date().toISOString()}\n`);
}).listen(port, '0.0.0.0', () => {
  console.log(`[${Date.now()}] TEST SERVER LISTENING ON PORT ${port}`);
});
