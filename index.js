#!/usr/bin/env node

const http = require('http');
const port = process.env.PORT || 8080;

console.log(`[${Date.now()}] Starting...`);

let ready = false;
let handler = null;

const server = http.createServer((req, res) => {
  if (!ready) {
    res.writeHead(503);
    res.end('Starting');
    return;
  }
  handler(req, res).catch(err => {
    res.writeHead(500);
    res.end('Error');
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${Date.now()}] LISTENING ${port}`);
});

setImmediate(async () => {
  try {
    const next = require('next');
    const app = next({ dev: false });
    await app.prepare();
    handler = app.getRequestHandler();
    ready = true;
    console.log(`[${Date.now()}] READY`);
  } catch (err) {
    console.error(`[${Date.now()}] ERROR`, err.message);
    process.exit(1);
  }
});



