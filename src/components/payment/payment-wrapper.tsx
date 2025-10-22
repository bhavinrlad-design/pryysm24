'use client';

import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

const PaymentClient = lazy(() => import('./payment-client-inner').then(mod => ({ default: mod.PaymentClient })));

export function PaymentContent() {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading payment form...</p>
          </div>
        </div>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}
