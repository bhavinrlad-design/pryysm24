export async function GET() {
  try {
    // Check if we can reach the database
    if (process.env.DATABASE_URL) {
      // Database URL is configured
      return new Response(
        JSON.stringify({ 
          status: 'ok',
          database: 'configured',
          timestamp: new Date().toISOString()
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      // No database configured - still return ok but note the missing config
      return new Response(
        JSON.stringify({ 
          status: 'ok',
          database: 'not-configured',
          timestamp: new Date().toISOString(),
          warning: 'DATABASE_URL not set'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
