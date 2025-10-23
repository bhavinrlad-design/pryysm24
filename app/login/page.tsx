

"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from "@/hooks/use-toast"
import { Layers, Loader2, Eye, EyeOff, UserCheck, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter();
    const { loginWithEmail } = useAuth();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDemoLoading, setIsDemoLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const success = await loginWithEmail(email, password);

        if (success) {
            toast({
                title: 'Login Successful',
                description: 'Welcome back!',
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'Invalid email or password. Please try again.',
            });
            setIsLoading(false);
        }
    }
    
    const handleDemoLogin = async () => {
        console.log('🔘 Demo button clicked');
        setIsDemoLoading(true);
        try {
            console.log('🔐 Attempting demo login...');
            const success = await loginWithEmail('demo@prysm.com', 'demo123');
            console.log('📊 Demo login result:', success);
            
            if (success) {
                console.log('✅ Demo login successful!');
                toast({
                    title: 'Welcome, Demo User!',
                    description: 'You are now exploring the app with sample data.',
                });
            } else {
                console.log('❌ Demo login returned false');
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
            {/* Header with Logo */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem'}}>
                <Link href="/" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', textDecoration: 'none'}} prefetch={false}>
                    <div style={{height: '3.5rem', width: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', backgroundColor: 'white', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'}}>
                        <Layers style={{height: '2rem', width: '2rem', color: '#E6A635'}} />
                    </div>
                </Link>
                <h1 style={{fontSize: '1.875rem', fontWeight: 700, color: '#004B8D', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
                    Welcome to Pryysm
                </h1>
                <p style={{fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>by 3D Prodigy</p>
            </div>
            
            {/* Login Card */}
            <div style={{backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem'}}>
                {/* Card Header */}
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <h2 style={{fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Sign In</h2>
                    <p style={{fontSize: '0.875rem', color: '#6B7280', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Access your 3D printing farm dashboard.</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem'}}>
                    {/* Email Input */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <label htmlFor="email" style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827'}}
                        />
                    </div>

                    {/* Password Input */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <label htmlFor="password" style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Password</label>
                            <Link href="#" style={{fontSize: '0.875rem', color: '#004B8D', textDecoration: 'none', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Forgot password?</Link>
                        </div>
                        <div style={{position: 'relative'}}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{width: '100%', padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827', boxSizing: 'border-box'}}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 0}}
                            >
                                {showPassword ? <EyeOff style={{height: '1.25rem', width: '1.25rem'}} /> : <Eye style={{height: '1.25rem', width: '1.25rem'}} />}
                            </button>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button 
                        type="submit" 
                        disabled={isLoading || isDemoLoading}
                        style={{width: '100%', padding: '0.625rem 1rem', marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'white', backgroundColor: isLoading || isDemoLoading ? '#9CA3AF' : '#004B8D', border: 'none', borderRadius: '0.375rem', cursor: isLoading || isDemoLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s ease', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}
                    >
                        {isLoading ? <Loader2 style={{height: '1rem', width: '1rem', animation: 'spin 1s linear infinite'}} /> : <LogIn style={{height: '1rem', width: '1rem'}} />}
                        Sign in
                    </button>
                </form>

                {/* Divider */}
                <div style={{position: 'relative', margin: '1.5rem 0'}}>
                    <div style={{position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid #E5E7EB', transform: 'translateY(-50%)'}}></div>
                    <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                        <span style={{backgroundColor: 'white', padding: '0 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Or continue with</span>
                    </div>
                </div>

                {/* Demo Login Button */}
                <button 
                    type="button" 
                    onClick={handleDemoLogin}
                    disabled={isLoading || isDemoLoading}
                    style={{width: '100%', padding: '0.625rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: isLoading || isDemoLoading ? '#9CA3AF' : '#004B8D', backgroundColor: 'white', border: `1px solid ${isLoading || isDemoLoading ? '#D1D5DB' : '#004B8D'}`, borderRadius: '0.375rem', cursor: isLoading || isDemoLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s ease', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', opacity: isLoading || isDemoLoading ? 0.6 : 1}}
                >
                    {isDemoLoading ? <Loader2 style={{height: '1rem', width: '1rem', animation: 'spin 1s linear infinite'}} /> : <UserCheck style={{height: '1rem', width: '1rem'}} />}
                    Sign in as Demo User
                </button>
            </div>
        </div>

        {/* Footer */}
        <p style={{textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginTop: '2rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
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