#!/usr/bin/env node
const { existsSync } = require('fs');
const { spawn } = require('child_process');

try {
  const hasServer = existsSync('./server.js') || existsSync('./index.js');

  if (hasServer) {
    const entry = existsSync('./server.js') ? 'server.js' : 'index.js';
    console.log(`Found ${entry}, starting with node ${entry}`);
    const proc = spawn('node', [entry], { stdio: 'inherit' });
    proc.on('exit', (code) => process.exit(code));
  } else {
    console.log('No server.js/index.js found, falling back to `next start`');
    const port = process.env.PORT || '8080';
    const proc = spawn('npx', ['next', 'start', '-p', port], { stdio: 'inherit' });
    proc.on('exit', (code) => process.exit(code));
  }
} catch (err) {
  console.error('Failed to start application:', err);
  process.exit(1);
}
