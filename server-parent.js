#!/usr/bin/env node

/**
 * Parent process that spawns Next.js in a child process
 * Parent starts immediately and responds to requests
 * Child loads Next.js in background
 */

const http = require('http');
const { spawn } = require('child_process');
const net = require('net');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 8080;
const nextPort = 9000;
const now = () => new Date().toISOString();

console.log(`[${now()}] PARENT: Starting parent process on port ${port}`);

let nextReady = false;
let nextProcess = null;

// Spawn Next.js in a subprocess
function spawnNextJs() {
  console.log(`[${now()}] PARENT: Spawning Next.js child process on port ${nextPort}`);
  
  const childPath = require('path').join(process.cwd(), 'server-child.js');
  console.log(`[${now()}] PARENT: Child path: ${childPath}`);
  
  nextProcess = spawn('node', [childPath], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: nextPort,
      NODE_ENV: 'production'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  // Log child stdout
  if (nextProcess.stdout) {
    nextProcess.stdout.on('data', (data) => {
      console.log(`[${now()}] [CHILD:OUT]`, data.toString().trim());
    });
  }

  // Log child stderr
  if (nextProcess.stderr) {
    nextProcess.stderr.on('data', (data) => {
      console.log(`[${now()}] [CHILD:ERR]`, data.toString().trim());
    });
  }

  // Handle child exit
  nextProcess.on('exit', (code, signal) => {
    console.error(`[${now()}] PARENT: ❌ Child process exited! Code: ${code}, Signal: ${signal}`);
    nextReady = false;
    
    // Try to restart child after 5 seconds
    console.log(`[${now()}] PARENT: Will attempt restart in 5 seconds...`);
    setTimeout(() => {
      if (!nextProcess || nextProcess.killed) {
        console.log(`[${now()}] PARENT: Restarting child process...`);
        spawnNextJs();
      }
    }, 5000);
  });

  nextProcess.on('error', (err) => {
    console.error(`[${now()}] PARENT: ❌ Failed to spawn child:`, err.message);
  });
}

// Check if Next.js port is responding
async function checkNextPort() {
  return new Promise((resolve) => {
    const socket = net.createConnection(nextPort, '127.0.0.1');
    socket.setTimeout(1000);
    
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    
    socket.on('error', () => {
      resolve(false);
    });
    
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
  });
}

// Periodically check if Next.js is ready
async function watchNextJs() {
  let checkCount = 0;
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!nextReady) {
      checkCount++;
      const ready = await checkNextPort();
      if (ready) {
        nextReady = true;
        console.log(`[${now()}] PARENT: ✓ Next.js is ready! (after ${checkCount * 2}s)`);
      } else if (checkCount % 10 === 0) {
        console.log(`[${now()}] PARENT: Still waiting for Next.js (${checkCount * 2}s elapsed)...`);
      }
    }
  }
}

// Start parent HTTP server immediately
const server = http.createServer((req, res) => {
  // Health checks always respond immediately
  if (req.url === '/health' || req.url === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', nextReady: nextReady }));
    return;
  }

  // If Next.js ready, proxy the request
  if (nextReady) {
    const proxyReq = http.request({
      hostname: '127.0.0.1',
      port: nextPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
      timeout: 30000
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error(`[${now()}] PARENT: Proxy error:`, err.message);
      // Try loading page instead of 502
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Reloading</title>
  <meta http-equiv="refresh" content="2">
</head>
<body style="font-family: sans-serif; text-align: center; padding: 100px;">
  <h1>⏳ Application Initializing</h1>
  <p>Next.js is starting, please wait...</p>
  <p style="font-size: 0.9em; color: #666;">Auto-refresh in 2 seconds</p>
</body>
</html>`);
    });

    proxyReq.on('timeout', () => {
      proxyReq.destroy();
      res.writeHead(504);
      res.end('Gateway Timeout');
    });

    req.pipe(proxyReq);
    return;
  }

  // Next.js not ready yet - return loading page
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Starting</title>
  <meta http-equiv="refresh" content="2">
</head>
<body style="font-family: sans-serif; text-align: center; padding: 100px;">
  <h1>⏳ Application Starting</h1>
  <p>Initializing Next.js, please wait...</p>
  <p style="font-size: 0.9em; color: #666;">Auto-refresh in 2 seconds</p>
</body>
</html>`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] PARENT: ✓ Parent listening on port ${port}`);
});

server.on('error', (err) => {
  console.error(`[${now()}] PARENT: Server error:`, err.message);
  process.exit(1);
});

// Start watching for Next.js
console.log(`[${now()}] PARENT: Starting watcher...`);
watchNextJs().catch(err => console.error(err));

// Spawn Next.js immediately
spawnNextJs();

// Cleanup on exit
process.on('exit', () => {
  if (nextProcess) {
    console.log(`[${now()}] PARENT: Cleaning up child process`);
    nextProcess.kill();
  }
});

process.on('SIGTERM', () => {
  console.log(`[${now()}] PARENT: Received SIGTERM, shutting down`);
  if (nextProcess) {
    nextProcess.kill();
  }
  process.exit(0);
});
