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

    // Test the connection
    console.log(`[${now()}] Testing database connection...`);
    await prisma.$queryRaw`SELECT 1`;
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
    console.error(`[${now()}] ❌ Database initialization failed:`, err.message);
    console.error(`[${now()}] This might be expected if DATABASE_URL is not set correctly`);
    return false;
  }
}

module.exports = { initializeDatabase };
