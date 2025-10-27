export async function GET() {
  // This is the simplest possible endpoint - no dependencies
  return new Response('OK', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
