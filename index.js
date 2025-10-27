#!/usr/bin/env node

// Main entry point for the application on Azure
const fs = require('fs');
const path = require('path');

console.log('[INIT] ========================================');
console.log('[INIT] Application starting...');
console.log('[INIT] Current directory:', process.cwd());
console.log('[INIT] Node version:', process.version);
console.log('[INIT] NODE_ENV:', process.env.NODE_ENV || 'not-set');
console.log('[INIT] PORT:', process.env.PORT || 'not-set');
console.log('[INIT] DATABASE_URL:', process.env.DATABASE_URL ? 'configured' : 'NOT SET');
console.log('[INIT] NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'not-set');
console.log('[INIT] NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'configured' : 'NOT SET');
console.log('[INIT] ========================================');

// Check if .next/standalone/server.js exists
const serverPath = path.join(__dirname, '.next', 'standalone', 'server.js');
console.log('[INIT] Looking for Next.js server at:', serverPath);
console.log('[INIT] Server exists:', fs.existsSync(serverPath));

if (!fs.existsSync(serverPath)) {
  console.error('[INIT] FATAL: .next/standalone/server.js not found!');
  console.error('[INIT] Contents of .next directory:');
  try {
    const nextDir = path.join(__dirname, '.next');
    if (fs.existsSync(nextDir)) {
      console.error(fs.readdirSync(nextDir));
    }
  } catch (e) {
    console.error('[INIT] Could not read .next directory');
  }
  process.exit(1);
}

// Try to load the Next.js standalone server
try {
  console.log('[INIT] Loading Next.js standalone server...');
  require(serverPath);
  console.log('[INIT] SUCCESS: Next.js server loaded and started');
} catch (error) {
  console.error('[INIT] ========================================');
  console.error('[INIT] FATAL ERROR: Failed to start Next.js server');
  console.error('[INIT] Error name:', error.name);
  console.error('[INIT] Error message:', error.message);
  console.error('[INIT] Stack trace:');
  console.error(error.stack);
  console.error('[INIT] ========================================');
  process.exit(1);
}




