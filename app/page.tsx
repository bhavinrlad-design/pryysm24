'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Cpu, TrendingUp, DollarSign, AlertCircle, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white', color: '#1f2937'}}>
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm sticky top-0 z-50 bg-white/80 backdrop-blur-sm" style={{padding: '0 1.5rem', height: '4rem', display: 'flex', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)'}}>
        <Link href="#" className="flex items-center justify-center" prefetch={false} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit'}}>
          <Layers className="h-8 w-8 text-yellow-500" style={{height: '2rem', width: '2rem', color: '#EAB308'}} />
          <span className="ml-2 text-xl font-bold text-primary" style={{marginLeft: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#004B8D'}}>
            Pryysm <span className="text-sm font-medium text-gray-500" style={{fontSize: '0.875rem', fontWeight: 500, color: '#6B7280'}}>by 3D Prodigy</span>
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center" style={{marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap'}}>
          <Link href="#features" className="text-sm font-medium hover:text-primary" prefetch={false} style={{fontSize: '0.875rem', fontWeight: 500, color: '#4B5563', textDecoration: 'none', cursor: 'pointer'}}>
            Features
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary" prefetch={false} style={{fontSize: '0.875rem', fontWeight: 500, color: '#4B5563', textDecoration: 'none', cursor: 'pointer'}}>
            Contact
          </Link>
          <Button asChild variant="secondary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>
            <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
              Book Demo
            </Link>
          </Button>
          <Button asChild style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1" style={{flex: '1'}}>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-yellow-50" style={{width: '100%', padding: '3rem 0', backgroundImage: 'linear-gradient(to bottom right, #EFF6FF, white, #FEFCE8)'}}>
          <div className="container mx-auto px-4 md:px-6" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div className="flex flex-col items-center space-y-6 text-center" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center'}}>
              <div className="space-y-4" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold" style={{fontSize: '3.75rem', fontWeight: 900, backgroundImage: 'linear-gradient(135deg, #004B8D 0%, #0066B3 50%, #E6A635 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: '1.2', color: '#004B8D'}}>
                  Manufacturing Insights,
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold" style={{fontSize: '3.75rem', fontWeight: 900, backgroundImage: 'linear-gradient(135deg, #004B8D 0%, #0066B3 50%, #E6A635 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: '1.2', color: '#004B8D'}}>
                  Delivered Simply.
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto" style={{fontSize: '1.125rem', color: '#374151', maxWidth: '42rem', margin: '1rem auto', lineHeight: '1.6'}}>
                  Pryysm is the manufacturing intelligence platform that transforms 3D printing operations. Real-time insights, predictive analytics, and intelligent automation—all designed for today's smart factories.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8" style={{display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Button size="lg" asChild style={{padding: '0.75rem 2rem', fontSize: '1rem', backgroundColor: '#004B8D', color: 'white', borderRadius: '0.375rem'}}>
                  <Link href="/login">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild style={{padding: '0.75rem 2rem', fontSize: '1rem', border: '2px solid #E6A635', backgroundColor: 'transparent', color: '#004B8D', borderRadius: '0.375rem'}}>
                  <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
                    Book Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" style={{width: '100%', padding: '3rem 0', backgroundColor: '#F9FAFB'}}>
          <div className="container mx-auto px-4 md:px-6" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center', marginBottom: '3rem'}}>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#111827'}}>A Smarter Way to Print</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl" style={{maxWidth: '56.25rem', color: '#4B5563', fontSize: '1.25rem', lineHeight: '1.8'}}>
                From intelligent scheduling to complete financial oversight, Pryysm is the unified OS your 3D printing farm needs to scale efficiently.
              </p>
            </div>

            <div className="grid max-w-5xl gap-8 mx-auto lg:grid-cols-3 sm:grid-cols-1 md:gap-12" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '64rem', margin: '0 auto'}}>
              {/* Feature 1: AI Scheduling */}
              <Card className="flex flex-col" style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <CardHeader style={{padding: '0', marginBottom: '1rem'}}>
                  <div className="flex items-center gap-4" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" style={{display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'rgba(0, 75, 141, 0.1)'}}>
                      <Cpu className="h-6 w-6 text-primary" style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                    </div>
                    <CardTitle style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#111827'}}>AI-Powered Scheduling</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1" style={{flex: '1'}}>
                  <p style={{color: '#4B5563', lineHeight: '1.6', fontSize: '0.95rem'}}>
                    Let AI optimize your printer queue based on material, geometry, and real-time demand. Maximize uptime and eliminate bottlenecks.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2: Real-Time Analytics */}
              <Card className="flex flex-col" style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <CardHeader style={{padding: '0', marginBottom: '1rem'}}>
                  <div className="flex items-center gap-4" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" style={{display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'rgba(0, 75, 141, 0.1)'}}>
                      <TrendingUp className="h-6 w-6 text-primary" style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                    </div>
                    <CardTitle style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#111827'}}>Real-Time Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1" style={{flex: '1'}}>
                  <p style={{color: '#4B5563', lineHeight: '1.6', fontSize: '0.95rem'}}>
                    Monitor every printer in real-time. Track success rates, material usage, costs, and ROI. Get alerts before problems occur.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3: Financial Control */}
              <Card className="flex flex-col" style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <CardHeader style={{padding: '0', marginBottom: '1rem'}}>
                  <div className="flex items-center gap-4" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" style={{display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'rgba(0, 75, 141, 0.1)'}}>
                      <DollarSign className="h-6 w-6 text-primary" style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                    </div>
                    <CardTitle style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#111827'}}>Financial Control</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1" style={{flex: '1'}}>
                  <p style={{color: '#4B5563', lineHeight: '1.6', fontSize: '0.95rem'}}>
                    Track material costs, printer maintenance, labor, and profit margins. Make data-driven pricing decisions. Scale profitably.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Pillars Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white" style={{width: '100%', padding: '3rem 0', backgroundColor: 'white'}}>
          <div className="container mx-auto px-4 md:px-6" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center', marginBottom: '3rem'}}>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#111827'}}>The Pryysm Difference</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl" style={{maxWidth: '56.25rem', color: '#4B5563', fontSize: '1.25rem', lineHeight: '1.8'}}>
                Three core pillars power every decision in your farm's operations.
              </p>
            </div>

            <div className="grid max-w-6xl gap-8 mx-auto lg:grid-cols-3 sm:grid-cols-1 md:gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '72rem', margin: '0 auto'}}>
              {/* Pillar 1 */}
              <div className="space-y-4 p-6 rounded-lg bg-blue-50 border border-blue-200" style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', borderRadius: '0.5rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE'}}>
                <div className="flex items-center gap-3" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <AlertCircle className="h-6 w-6 text-primary" style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                  <h3 className="font-bold text-lg text-gray-900" style={{fontWeight: 'bold', fontSize: '1.125rem', color: '#111827'}}>Visibility</h3>
                </div>
                <p style={{color: '#4B5563', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  Complete transparency across your entire operation. Know what's printing, why it's printing, and when it will be done.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-4 p-6 rounded-lg bg-yellow-50 border border-yellow-200" style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', borderRadius: '0.5rem', backgroundColor: '#FFFBEB', border: '1px solid #FCD34D'}}>
                <div className="flex items-center gap-3" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <Zap className="h-6 w-6 text-accent" style={{height: '1.5rem', width: '1.5rem', color: '#E6A635'}} />
                  <h3 className="font-bold text-lg text-gray-900" style={{fontWeight: 'bold', fontSize: '1.125rem', color: '#111827'}}>Efficiency</h3>
                </div>
                <p style={{color: '#4B5563', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  Reduce waste, maximize throughput, and eliminate idle time. Every printer works harder, smarter, and more profitably.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-4 p-6 rounded-lg bg-green-50 border border-green-200" style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', borderRadius: '0.5rem', backgroundColor: '#F0FDF4', border: '1px solid #86EFAC'}}>
                <div className="flex items-center gap-3" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <TrendingUp className="h-6 w-6 text-green-600" style={{height: '1.5rem', width: '1.5rem', color: '#16A34A'}} />
                  <h3 className="font-bold text-lg text-gray-900" style={{fontWeight: 'bold', fontSize: '1.125rem', color: '#111827'}}>Growth</h3>
                </div>
                <p style={{color: '#4B5563', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  Scale from 1 printer to 100+ with confidence. Our platform grows with you, handling complexity at any size.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-blue-700 text-white" style={{width: '100%', padding: '3rem 0', backgroundImage: 'linear-gradient(to right, #004B8D, #1e5fa8)', color: 'white'}}>
          <div className="container mx-auto px-4 md:px-6" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div className="flex flex-col items-center space-y-6 text-center" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center'}}>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{fontSize: '1.875rem', fontWeight: 'bold', color: 'white'}}>Ready to Transform Your Farm?</h2>
              <p className="max-w-[600px] text-blue-100 md:text-xl" style={{maxWidth: '37.5rem', color: '#DBEAFE', fontSize: '1.25rem', lineHeight: '1.8'}}>
                Join manufacturing leaders who are already using Pryysm to scale their operations. Get a personalized demo today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4" style={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Button size="lg" asChild style={{padding: '0.75rem 2rem', fontSize: '1rem', backgroundColor: '#E6A635', color: '#004B8D', borderRadius: '0.375rem', fontWeight: 'bold'}}>
                  <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
                    Book Demo
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild style={{padding: '0.75rem 2rem', fontSize: '1rem', border: '2px solid white', backgroundColor: 'transparent', color: 'white', borderRadius: '0.375rem'}}>
                  <Link href="/login">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-6 md:py-12" style={{width: '100%', borderTop: '1px solid #E5E7EB', backgroundColor: 'white', padding: '1.5rem 0'}}>
        <div className="container mx-auto px-4 md:px-6 text-center" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center'}}>
          <p className="text-sm text-gray-500" style={{fontSize: '0.875rem', color: '#6B7280'}}>
            © 2024 Pryysm by 3D Prodigy. All rights reserved. | <Link href="#" className="hover:text-primary" style={{color: '#004B8D', textDecoration: 'none'}}>Privacy</Link> | <Link href="#" className="hover:text-primary" style={{color: '#004B8D', textDecoration: 'none'}}>Terms</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
