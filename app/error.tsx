'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[ROOT ERROR BOUNDARY]', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Application Error</h1>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
            {error.message || 'An unexpected error occurred'}
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details style={{
              maxWidth: '600px',
              textAlign: 'left',
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '20px',
              border: '1px solid #ddd',
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details</summary>
              <pre style={{
                fontSize: '12px',
                overflow: 'auto',
                marginTop: '10px',
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '3px',
              }}>
                {error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
