'use client'

import { useState } from 'react'

export function PaymentClient() {
  const [loading, setLoading] = useState(false)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: '#F9FAFB',
      fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '2rem',
        maxWidth: '28rem',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 700,
          color: '#004B8D',
          marginBottom: '1rem'
        }}>
          Payment
        </h1>
        
        <p style={{
          fontSize: '0.875rem',
          color: '#6B7280',
          marginBottom: '2rem'
        }}>
          Payment processing is coming soon. This is a placeholder for the payment system.
        </p>

        <button 
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.625rem 1rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'white',
            backgroundColor: '#004B8D',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  )
}
