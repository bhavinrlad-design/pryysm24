


import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { PaymentClient } from "@/components/payment/payment-client-simple";

function PaymentFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading payment form...</p>
      </div>
    </div>
  );
}

function PaymentContent() {
  return <PaymentClient />;
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentFallback />}>
      <PaymentContent />
    </Suspense>
  );
}
