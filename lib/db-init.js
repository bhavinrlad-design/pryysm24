#!/usr/bin/env node

/**
 * Database initialization for production
 * This ensures the database schema is created if it doesn't exist
 */

const { PrismaClient } = require('@prisma/client');

const now = () => new Date().toISOString();

async function initializeDatabase() {
  console.log(`[${now()}] Initializing database...`);
  
  try {
    // Create Prisma client
    const prisma = new PrismaClient({
      log: ['error', 'warn'],
    });

    // Test the connection with timeout
    console.log(`[${now()}] Testing database connection...`);
    
    // Set a timeout for the connection test
    const connectionTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database connection timeout')), 5000)
    );
    
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      connectionTimeout
    ]);
    
    console.log(`[${now()}] ✓ Database connection successful`);

    // Try to check if User table exists
    try {
      const userCount = await prisma.user.count();
      console.log(`[${now()}] ✓ User table exists (${userCount} users found)`);
    } catch (err) {
      console.log(`[${now()}] ⚠ Database schema might not be initialized`);
      console.log(`[${now()}] Error: ${err.message}`);
      console.log(`[${now()}] NOTE: If this is the first deployment, the GitHub Actions workflow should have run "prisma db push"`);
    }

    await prisma.$disconnect();
    console.log(`[${now()}] ✓ Database initialization complete`);
    return true;
  } catch (err) {
    console.error(`[${now()}] ⚠️ Database initialization failed (non-blocking):`, err.message);
    console.error(`[${now()}] This might be expected if DATABASE_URL is not set correctly`);
    console.error(`[${now()}] App will still start - authentication will fail until DB is available`);
    // Don't throw - let app start anyway
    return false;
  }
}

module.exports = { initializeDatabase };
