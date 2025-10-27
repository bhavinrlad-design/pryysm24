export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    nodeEnv: process.env.NODE_ENV || 'not-set',
    hasDatabase: !!process.env.DATABASE_URL,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasAzureAdConfig: !!(
      process.env.AZURE_AD_CLIENT_ID &&
      process.env.AZURE_AD_CLIENT_SECRET &&
      process.env.AZURE_AD_TENANT_ID
    ),
    environment: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'not-set',
      NODE_ENV: process.env.NODE_ENV || 'not-set',
      DATABASE_URL_MASKED: process.env.DATABASE_URL
        ? process.env.DATABASE_URL.substring(0, 50) + '...'
        : 'not-set',
    },
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };

  return new Response(JSON.stringify(diagnostics, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
