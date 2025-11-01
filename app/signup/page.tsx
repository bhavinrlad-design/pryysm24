'use client'

import { Layers } from 'lucide-react'
import Link from 'next/link'
import { signInAzureAD } from '../login/actions' // Re-use the same action

// Simple component for the Microsoft logo
const MicrosoftLogo = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.5H1.5V10H10V1.5Z" fill="#F25022"/>
    <path d="M19.5 1.5H11V10H19.5V1.5Z" fill="#7FBA00"/>
    <path d="M10 11H1.5V19.5H10V11Z" fill="#00A4EF"/>
    <path d="M19.5 11H11V19.5H19.5V11Z" fill="#FFB900"/>
  </svg>
);

export default function SignupPage() {

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', padding: '1rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
        <div style={{width: '100%', maxWidth: '28rem'}}>
            {/* Header */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem'}}>
                <Link href="/" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', textDecoration: 'none'}} prefetch={false}>
                    <div style={{height: '3.5rem', width: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', backgroundColor: 'white', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'}}>
                        <Layers style={{height: '2rem', width: '2rem', color: '#E6A635'}} />
                    </div>
                </Link>
                <h1 style={{fontSize: '1.875rem', fontWeight: 700, color: '#004B8D'}}>
                    Create Your Pryysm Account
                </h1>
                <p style={{fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem'}}>by 3D Prodigy</p>
            </div>
            
            {/* Signup Card */}
            <div style={{backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem'}}>
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <h2 style={{fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem'}}>Get Started</h2>
                    <p style={{fontSize: '0.875rem', color: '#6B7280'}}>Create an account or sign in using your Microsoft account.</p>
                </div>

                {/* Azure AD Sign In */}
                <form action={signInAzureAD}>
                    <button 
                        type="submit" 
                        style={{width: '100%', padding: '0.625rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s ease'}}
                    >
                        <MicrosoftLogo />
                        Continue with Microsoft
                    </button>
                </form>

                <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
                    <p style={{fontSize: '0.875rem', color: '#6B7280'}}>
                        Already have an account? <Link href="/login" style={{color: '#004B8D', fontWeight: 600, textDecoration: 'none'}}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>

        {/* Footer */}
        <p style={{textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginTop: '2rem'}}>
            &copy; {new Date().getFullYear()} Pryysm by 3D Prodigy.
        </p>
    </div>
  )
}