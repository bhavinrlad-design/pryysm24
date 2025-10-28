'use client';

import React, { useState } from 'react';

interface PaymentClientProps {
  invoiceId?: string;
  amount?: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  [key: string]: any;
}

export function PaymentClient({ 
  invoiceId, 
  amount, 
  onSuccess,
  onError,
  ...props 
}: PaymentClientProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Implement your payment logic here
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId, amount }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Payment processing failed');
      }

      setSuccess(true);
      onSuccess?.();
      
      // Redirect after success
      if (invoiceId) {
        setTimeout(() => {
          window.location.href = `/payment/success?invoiceId=${invoiceId}`;
        }, 1500);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMsg);
      onError?.(errorMsg);
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="payment-client payment-success" {...props}>
        <div className="success-message">
          <h3>✅ Payment Successful!</h3>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-client" {...props}>
      <form onSubmit={handlePayment} className="payment-form">
        <h2>Complete Payment</h2>
        {(amount || invoiceId) && (
          <div className="payment-details">
            {invoiceId && <p className="invoice-id">Invoice: {invoiceId}</p>}
            {amount && <p className="amount">Amount: <strong>${amount.toFixed(2)}</strong></p>}
          </div>
        )}
        
        {error && (
          <div className="error-message" role="alert">
            <p>❌ {error}</p>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isProcessing}
          className="payment-button"
        >
          {isProcessing ? '⏳ Processing...' : '💳 Complete Payment'}
        </button>
      </form>
    </div>
  );
}

export default PaymentClient;
