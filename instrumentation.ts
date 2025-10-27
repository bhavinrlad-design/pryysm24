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
      // Test database connection on startup (only if configured)
      if (process.env.DATABASE_URL) {
        try {
          logger.log('Attempting to connect to database...')
          const { PrismaClient } = require('@prisma/client')
          const prisma = new PrismaClient()
          await prisma.$queryRaw`SELECT 1`
          logger.log('✓ Database connection successful')
          await prisma.$disconnect()
        } catch (dbError) {
          logger.warn('Database connection test failed:', dbError instanceof Error ? dbError.message : dbError)
          // Don't throw - database operations might work later
        }
      } else {
        logger.warn('DATABASE_URL not set - database operations will fail at runtime')
      }
    } catch (error) {
      logger.error('Instrumentation error:', error instanceof Error ? error.message : error)
      // Don't throw - startup should continue even if instrumentation fails
    }

    logger.log('Server-side instrumentation completed')
  }
}
