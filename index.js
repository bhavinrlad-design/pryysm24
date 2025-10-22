#!/usr/bin/env node

// Test: can we start the simplest possible server?
const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from minimal server');
});

server.listen(port, '0.0.0.0', () => {
  console.log('Server listening on port', port);
});




