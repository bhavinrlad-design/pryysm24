
"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Fallback router for environments without next/navigation
let useRouter: () => { push: (href: string) => void };

try {
  // @ts-ignore
  const mod = require('next/navigation');
  // @ts-ignore
  useRouter = mod.useRouter;
} catch {
  // Fallback to legacy router if available
  // @ts-ignore
  const mod2 = require('next/router');
  // @ts-ignore
  useRouter = mod2.useRouter;
}

export interface User {
    name: string;
    email: string;
    role: 'admin' | 'master';
    companyName?: string;
    numPrinters?: string;
    country?: string;
    industry?: string;
    avatar?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    signupWithEmail: (signupData: Omit<User, 'role'> & {password: string}) => Promise<boolean>;
    loginWithEmail: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
    updateUserProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleUser = useCallback((rawUser: User | null, additionalData?: Partial<User>): User | null => {
        if (rawUser && rawUser.email) {
            if (rawUser.email === 'demo@prysm.com') {
                localStorage.setItem('isDemoUser', 'true');
                const demoUser: User = { name: 'Demo User', email: 'demo@prysm.com', role: 'admin', ...additionalData };
                localStorage.setItem('user', JSON.stringify(demoUser));
                setUser(demoUser);
                return demoUser;
            }

            localStorage.removeItem('isDemoUser');

            if (rawUser.email === 'LAD@PRYYSM' || rawUser.email === 'LAD@admin.com') {
                const masterUser: User = {
                    name: 'LAD',
                    email: rawUser.email,
                    role: 'master',
                    avatar: rawUser?.avatar,
                    ...additionalData
                };
                 localStorage.setItem('user', JSON.stringify(masterUser));
                 setUser(masterUser);
                 return masterUser;
            }

            const userData: User = {
                name: rawUser.name || 'User',
                email: rawUser.email!,
                role: 'admin',
                avatar: rawUser?.avatar || undefined,
                ...additionalData
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        } else {
            localStorage.removeItem('isDemoUser');
            localStorage.removeItem('user');
            setUser(null);
            return null;
        }
    }, []);

    useEffect(() => {
        // Check for existing user session on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch {
                // Corrupted data
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);
    
    const navigateAfterLogin = (loggedInUser: User | null) => {
         if (loggedInUser) {
            console.log('✅ navigateAfterLogin - User logged in:', loggedInUser.email, 'Role:', loggedInUser.role);
            // Use a small timeout to ensure state is updated before navigation
            setTimeout(() => {
                if (loggedInUser.role === 'master') {
                    console.log('🔄 Redirecting to master-admin');
                    router.push('/master-admin');
                } else {
                    console.log('🔄 Redirecting to dashboard');
                    router.push('/dashboard');
                }
            }, 100);
            return true;
        }
        console.log('❌ navigateAfterLogin - No user provided');
        return false;
    }

    const signupWithEmail = async (signupData: Omit<User, 'role'> & {password: string}): Promise<boolean> => {
        const { email, name, ...rest } = signupData;
        try {
            // Simple signup - store user in localStorage
            const appUser = handleUser({ 
                name, 
                email, 
                role: 'admin', 
                ...rest 
            });
            localStorage.setItem('new_signup', 'true');
            return navigateAfterLogin(appUser);
        } catch (error) {
            console.error("Signup Error:", error);
            return false;
        }
    };
    
    const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
        console.log('🔐 Login attempt:', email);
        
        // Handle mock users first
        if (email === 'demo@prysm.com' && pass === 'demo123') {
            console.log('✅ Demo user credentials matched');
            const userToLogin: User = { name: 'Demo User', email, role: 'admin' };
            const result = handleUser(userToLogin);
            console.log('✅ handleUser returned:', result);
            const navigateResult = navigateAfterLogin(result);
            console.log('✅ navigateAfterLogin result:', navigateResult);
            return navigateResult;
        }
        
        if ((email === 'LAD@PRYYSM' && pass === 'Lad@1234') || (email === 'LAD@admin.com' && pass === 'Lad123')) {
            console.log('✅ LAD master user credentials matched');
            const userToLogin: User = { name: 'LAD', email, role: 'master' };
            return navigateAfterLogin(handleUser(userToLogin));
        }
        
        if (email === 'admin@prysm.com' && pass === 'Lad123') {
            console.log('✅ Admin user credentials matched');
            const userToLogin: User = { name: 'Admin User', email, role: 'admin' };
            return navigateAfterLogin(handleUser(userToLogin));
        }

        // Simple email/password login (for development)
        try {
            console.log('ℹ️ Accepting any email/password (development mode)');
            // For now, accept any email/password combination
            const userToLogin: User = { 
                name: email.split('@')[0], 
                email, 
                role: 'admin' 
            };
            const loggedInUser = handleUser(userToLogin);
            return navigateAfterLogin(loggedInUser);
        } catch (error) {
            console.error("❌ Login Error: ", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isDemoUser');
        setUser(null);
        router.push('/login');
    };

    const updateUserProfile = (updates: Partial<User>) => {
        if(user) {
            const updatedUser = {...user, ...updates};
            handleUser(updatedUser);
        }
    };

    const value: AuthContextType = {
        isAuthenticated: !!user,
        user,
        isLoading,
        signupWithEmail,
        loginWithEmail,
        logout,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

