#!/usr/bin/env node

/**
 * Startup wrapper: Start the real server in background and exit immediately
 * This bypasses Azure's startup timeout
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('[WRAPPER] Starting server in background...');

// Spawn the actual server process in background
const proc = spawn('node', [path.join(__dirname, 'server-static.js')], {
  cwd: __dirname,
  env: process.env,
  detached: true,  // Run as separate process group
  stdio: 'ignore'  // Ignore stdio
});

// Unref so this wrapper can exit without waiting
proc.unref();

console.log('[WRAPPER] Server started with PID:', proc.pid);
console.log('[WRAPPER] Exiting wrapper (server continues in background)');

// Exit immediately - don't wait for server
process.exit(0);
