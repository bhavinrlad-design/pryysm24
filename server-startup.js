#!/usr/bin/env node

// This is the entry point for the app on Azure
// It ensures that environment variables are properly set before starting Next.js

console.log('[STARTUP]', 'Starting application...');
console.log('[STARTUP]', 'Node version:', process.version);
console.log('[STARTUP]', 'NODE_ENV:', process.env.NODE_ENV);
console.log('[STARTUP]', 'PORT:', process.env.PORT || 3000);

// Ensure critical environment variables are logged (for debugging)
const criticalEnvVars = ['DATABASE_URL', 'NEXTAUTH_URL', 'NEXTAUTH_SECRET'];
criticalEnvVars.forEach(key => {
  const value = process.env[key];
  if (value) {
    const masked = key === 'DATABASE_URL' 
      ? value.substring(0, 40) + '...' 
      : '***';
    console.log(`[STARTUP] ${key}: ${masked}`);
  } else {
    console.warn(`[STARTUP] WARNING: ${key} is not set`);
  }
});

try {
  // Try to start the Next.js server
  require('.next/standalone/server.js');
} catch (error) {
  console.error('[STARTUP] FATAL ERROR starting server:', error);
  process.exit(1);
}
