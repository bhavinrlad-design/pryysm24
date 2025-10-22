#!/usr/bin/env node

/**
 * Parent process that spawns Next.js in subprocess
 * Starts HTTP server immediately while subprocess initializes
 */

const http = require('http');
const { spawn } = require('child_process');
const net = require('net');

const port = parseInt(process.env.PORT, 10) || 8080;
const nextPort = 9000;

let nextReady = false;
let nextProcess = null;

// Start Next.js subprocess immediately
console.log('[Parent] Starting Next.js subprocess on port', nextPort);
nextProcess = spawn('node', ['-r', './server-simple.js'], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    PORT: nextPort
  },
  stdio: ['ignore', 'pipe', 'pipe']
});

// Log subprocess output
nextProcess.stdout.on('data', (data) => {
  console.log('[NextJS]', data.toString().trim());
});

nextProcess.stderr.on('data', (data) => {
  console.log('[NextJS ERR]', data.toString().trim());
});

nextProcess.on('error', (err) => {
  console.error('[Parent] Failed to start subprocess:', err.message);
});

// Check if Next.js port is open
function checkNextPort() {
  return new Promise((resolve) => {
    const socket = net.createConnection(nextPort, '127.0.0.1');
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('error', () => {
      resolve(false);
    });
  });
}

// Check Next.js every second
let checkInterval = setInterval(async () => {
  if (await checkNextPort()) {
    nextReady = true;
    console.log('[Parent] Next.js is ready!');
    clearInterval(checkInterval);
  }
}, 1000);

// Start parent HTTP server immediately
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  
  if (nextReady) {
    // Proxy to Next.js
    const proxyReq = http.request({
      hostname: '127.0.0.1',
      port: nextPort,
      path: req.url,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    
    proxyReq.on('error', (err) => {
      res.writeHead(502);
      res.end('Bad Gateway');
    });
    
    req.pipe(proxyReq);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<head><title>Loading</title><meta http-equiv="refresh" content="1"></head>
<body style="font-family:sans-serif;text-align:center;padding:100px">
<h1>Starting...</h1>
</body>
</html>`);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[Parent] HTTP server listening on port ${port}`);
});

server.on('error', (err) => {
  console.error('[Parent] Server error:', err.message);
  process.exit(1);
});

// Cleanup
process.on('exit', () => {
  if (nextProcess) {
    nextProcess.kill();
  }
});
