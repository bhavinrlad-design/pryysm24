import { PrismaClient } from '@prisma/client'

const logger = {
  log: (...args: any[]) => console.log('[INIT]', ...args),
  error: (...args: any[]) => console.error('[INIT-ERROR]', ...args),
  warn: (...args: any[]) => console.warn('[INIT-WARN]', ...args),
}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    logger.log('Server-side instrumentation started')
    logger.log('NODE_ENV:', process.env.NODE_ENV)
    logger.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
    logger.log('DATABASE_URL:', process.env.DATABASE_URL ? 'configured' : 'NOT SET')
    logger.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'configured' : 'NOT SET')
    
    try {
      // Test database connection on startup
      if (process.env.DATABASE_URL) {
        logger.log('Attempting to connect to database...')
        const prisma = new PrismaClient()
        await prisma.$queryRaw`SELECT 1`
        logger.log('✓ Database connection successful')
        await prisma.$disconnect()
      } else {
        logger.warn('DATABASE_URL not set - database operations will fail')
      }
    } catch (error) {
      logger.error('Failed to connect to database:', error instanceof Error ? error.message : error)
    }

    // Log available routes
    logger.log('Server-side instrumentation completed')
  }
}
