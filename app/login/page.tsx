

'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from "@/hooks/use-toast"
import { Layers, Loader2, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { signInAzureAD } from './actions'
import { useSearchParams } from 'next/navigation'

// Simple component for the Microsoft logo
const MicrosoftLogo = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.5H1.5V10H10V1.5Z" fill="#F25022"/>
    <path d="M19.5 1.5H11V10H19.5V1.5Z" fill="#7FBA00"/>
    <path d="M10 11H1.5V19.5H10V11Z" fill="#00A4EF"/>
    <path d="M19.5 11H11V19.5H19.5V11Z" fill="#FFB900"/>
  </svg>
);

export default function LoginPage() {
    const { loginWithEmail } = useAuth();
    const { toast } = useToast();
    const [isDemoLoading, setIsDemoLoading] = useState(false);
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const handleDemoLogin = async () => {
        setIsDemoLoading(true);
        try {
            const success = await loginWithEmail('demo@prysm.com', 'demo123');
            if (success) {
                toast({
                    title: 'Welcome, Demo User!',
                    description: 'You are now exploring the app with sample data.',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Demo Login Failed',
                    description: 'Could not sign in as demo user. Check console for details.',
                });
                setIsDemoLoading(false);
            }
        } catch (error) {
            console.error('❌ Demo login error:', error);
            toast({
                variant: 'destructive',
                title: 'Demo Login Error',
                description: 'An error occurred during login. Check console for details.',
            });
            setIsDemoLoading(false);
        }
    }

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
                    Welcome to Pryysm
                </h1>
                <p style={{fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem'}}>by 3D Prodigy</p>
            </div>
            
            {/* Login Card */}
            <div style={{backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem'}}>
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <h2 style={{fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem'}}>Sign In</h2>
                    <p style={{fontSize: '0.875rem', color: '#6B7280'}}>Access your 3D printing farm dashboard.</p>
                    {error === 'OAuthAccountNotLinked' && (
                        <p style={{color: '#EF4444', fontSize: '0.875rem', marginTop: '1rem'}}>
                            An account with this email already exists. Please sign in with your existing account or link this Microsoft account from your profile settings.
                        </p>
                    )}
                </div>

                {/* Azure AD Sign In */}
                <form action={signInAzureAD}>
                    <button 
                        type="submit" 
                        disabled={isDemoLoading}
                        style={{width: '100%', padding: '0.625rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '0.375rem', cursor: isDemoLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s ease', opacity: isDemoLoading ? 0.6 : 1}}
                    >
                        <MicrosoftLogo />
                        Sign in with Microsoft
                    </button>
                </form>

                {/* Divider */}
                <div style={{position: 'relative', margin: '1.5rem 0'}}>
                    <div style={{position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid #E5E7EB'}}></div>
                    <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                        <span style={{backgroundColor: 'white', padding: '0 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase'}}>Or</span>
                    </div>
                </div>

                {/* Demo Login Button */}
                <button 
                    type="button" 
                    onClick={handleDemoLogin}
                    disabled={isDemoLoading}
                    style={{width: '100%', padding: '0.625rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: isDemoLoading ? '#9CA3AF' : '#004B8D', backgroundColor: 'white', border: `1px solid ${isDemoLoading ? '#D1D5DB' : '#004B8D'}`, borderRadius: '0.375rem', cursor: isDemoLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s ease', opacity: isDemoLoading ? 0.6 : 1}}
                >
                    {isDemoLoading ? <Loader2 style={{height: '1rem', width: '1rem', animation: 'spin 1s linear infinite'}} /> : <UserCheck style={{height: '1rem', width: '1rem'}} />}
                    Sign in as Demo User
                </button>
            </div>
        </div>

        {/* Footer */}
        <p style={{textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginTop: '2rem'}}>
            &copy; {new Date().getFullYear()} Pryysm by 3D Prodigy.
        </p>

        <style>{`
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
  )
}