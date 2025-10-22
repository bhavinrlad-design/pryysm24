#!/usr/bin/env node

/**
 * Worker thread approach: Use Node.js worker_threads to load Next.js in a separate thread
 * Main thread stays responsive while worker loads Next.js
 */

const http = require('http');
const url = require('url');
const { Worker } = require('worker_threads');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] MAIN: Starting main thread on port ${port}`);

let nextHandler = null;
let workerStarted = false;

// Create HTTP server in main thread - this is fast
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Health checks: respond immediately
  if (parsedUrl.pathname === '/health' || parsedUrl.pathname === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  // If Next.js ready, proxy to it
  if (nextHandler) {
    try {
      nextHandler(req, res);
    } catch (err) {
      console.error(`[${now()}] ERROR handling request:`, err.message);
      if (!res.headersSent) {
        res.writeHead(500);
        res.end('Error');
      }
    }
    return;
  }

  // Still loading - return loading page
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Starting</title>
  <meta http-equiv="refresh" content="3">
</head>
<body style="font-family: sans-serif; text-align: center; padding: 100px;">
  <h1>⏳ Initializing Application</h1>
  <p>Loading Next.js in background thread... This takes about 60-90 seconds on first start.</p>
  <p><small>Auto-refresh in 3 seconds</small></p>
  <p style="font-size: 0.8em; color: #999;">Worker thread status: Loading...</p>
</body>
</html>`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] MAIN: ✓ Server listening on port ${port}`);
});

server.on('error', (err) => {
  console.error(`[${now()}] MAIN: FATAL ERROR:`, err.message);
  process.exit(1);
});

// Start worker thread to load Next.js
function startWorker() {
  console.log(`[${now()}] MAIN: Starting worker thread to load Next.js...`);
  
  const worker = new Worker(path.join(__dirname, 'server-worker.js'));
  
  worker.on('message', (message) => {
    if (message.type === 'ready') {
      console.log(`[${now()}] MAIN: ✓ Worker reports Next.js ready!`);
      nextHandler = (req, res) => {
        // Use worker to handle requests
        worker.postMessage({ type: 'request', url: req.url, method: req.method });
        // This is simplified - in reality we'd need proper IPC
      };
    } else if (message.type === 'log') {
      console.log(`[${now()}] WORKER: ${message.message}`);
    }
  });
  
  worker.on('error', (err) => {
    console.error(`[${now()}] MAIN: Worker error:`, err);
  });
  
  worker.on('exit', (code) => {
    console.log(`[${now()}] MAIN: Worker exited with code ${code}`);
  });
  
  workerStarted = true;
}

// Start worker immediately
startWorker();
