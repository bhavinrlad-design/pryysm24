'use client';

import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle2, GanttChartSquare, Layers, Workflow, Cpu, FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white', color: '#1f2937', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
      <header style={{padding: '0 1.5rem', height: '4rem', display: 'flex', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
        <Link href="#" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit'}} prefetch={false}>
          <Layers style={{height: '2rem', width: '2rem', color: '#EAB308'}} />
          <span style={{marginLeft: '0.5rem', fontSize: '1.25rem', fontWeight: 700, color: '#004B8D', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
            Pryysm <span style={{fontSize: '0.875rem', fontWeight: 500, color: '#6B7280', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>by 3D Prodigy</span>
          </span>
        </Link>
        <nav style={{marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <Link href="#features" style={{fontSize: '0.9rem', fontWeight: 500, color: '#4B5563', textDecoration: 'none', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}} prefetch={false}>Features</Link>
          <Link href="#contact" style={{fontSize: '0.9rem', fontWeight: 500, color: '#4B5563', textDecoration: 'none', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}} prefetch={false}>Contact</Link>
          <Button asChild variant="secondary"><Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">Book Demo</Link></Button>
          <Button asChild><Link href="/login">Login</Link></Button>
        </nav>
      </header>
      <main style={{flex: '1', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
        <section style={{width: '100%', paddingTop: '6rem', paddingBottom: '8rem', textAlign: 'center', backgroundColor: 'white'}}>
          <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem'}}>
            <h1 style={{fontSize: 'clamp(2.5rem, 9vw, 4rem)', fontWeight: 800, backgroundImage: 'linear-gradient(135deg, #1f2937 0%, #004B8D 50%, #E6A635 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '2rem', lineHeight: 1.2, letterSpacing: '-0.02em', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Revolutionize Your 3D Printing Operation</h1>
            <p style={{maxWidth: '44rem', color: '#4B5563', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', margin: '0 auto', lineHeight: 1.6, fontWeight: 400, fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Pryysm is the all-in-one, intelligent platform designed to bring clarity, efficiency, and powerful automation to your 3D printing farm.</p>
          </div>
        </section>
        <section id="features" style={{width: '100%', padding: '3rem 0', backgroundColor: '#F9FAFB'}}>
          <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h2 style={{fontSize: 'clamp(1.875rem, 6vw, 2.25rem)', fontWeight: 700, color: '#111827', marginBottom: '1.5rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', lineHeight: 1.2}}>A Smarter Way to Print</h2>
              <p style={{color: '#4B5563', fontSize: 'clamp(0.95rem, 2vw, 1.125rem)', lineHeight: 1.6, fontWeight: 400, fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>From intelligent scheduling to complete financial oversight, Pryysm is the unified OS your 3D printing farm needs to scale efficiently.</p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '64rem', margin: '0 auto'}}>
              <Card style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #E5E7EB', padding: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                  <Cpu style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                  <CardTitle style={{fontSize: '1.125rem', fontWeight: 700, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>AI-Powered Scheduling</CardTitle>
                </div>
                <p style={{color: '#4B5563', lineHeight: 1.6, fontSize: '0.95rem', fontWeight: 400, fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Our intelligent AI scheduler analyzes your entire fleet, job requirements, and deadlines to find the absolute optimal production plan.</p>
              </Card>
              <Card style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #E5E7EB', padding: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                  <Workflow style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                  <CardTitle style={{fontSize: '1.125rem', fontWeight: 700, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Visual Project Tracking</CardTitle>
                </div>
                <p style={{color: '#4B5563', lineHeight: 1.6, fontSize: '0.95rem', fontWeight: 400, fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Our intuitive Kanban-style board gives you a complete visual overview of every project in your pipeline.</p>
              </Card>
              <Card style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #E5E7EB', padding: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                  <FileText style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                  <CardTitle style={{fontSize: '1.125rem', fontWeight: 700, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Integrated Financial Hub</CardTitle>
                </div>
                <p style={{color: '#4B5563', lineHeight: 1.6, fontSize: '0.95rem', fontWeight: 400, fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Pryysm integrates your finances directly into your workflow to ensure profitability.</p>
              </Card>
            </div>
          </div>
        </section>
        <section style={{width: '100%', padding: '3rem 0', backgroundColor: 'white'}}>
          <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem'}}>
            <h2 style={{fontSize: 'clamp(1.875rem, 6vw, 2.25rem)', fontWeight: 700, color: '#111827', textAlign: 'center', marginBottom: '3rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', lineHeight: 1.2}}>The Unified Platform for Manufacturing</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '64rem', margin: '0 auto'}}>
              <div style={{padding: '1.5rem'}}><Workflow style={{height: '2rem', width: '2rem', color: '#004B8D', marginBottom: '0.75rem'}} /><h3 style={{fontWeight: 700, color: '#111827', marginBottom: '0.5rem', fontSize: '1.125rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Total Workflow Control</h3><p style={{fontSize: '0.9rem', color: '#4B5563', fontWeight: 400, lineHeight: 1.5, fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Manage your entire production pipeline visually. Track every project from order to dispatch.</p></div>
              <div style={{padding: '1.5rem'}}><GanttChartSquare style={{height: '2rem', width: '2rem', color: '#004B8D', marginBottom: '0.75rem'}} /><h3 style={{fontWeight: 700, color: '#111827', marginBottom: '0.5rem', fontSize: '1.125rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Intelligent Resource Planning</h3><p style={{fontSize: '0.9rem', color: '#4B5563', fontWeight: 400, lineHeight: 1.5, fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Leverage AI to automate scheduling and maximize printer uptime.</p></div>
              <div style={{padding: '1.5rem'}}><Calculator style={{height: '2rem', width: '2rem', color: '#004B8D', marginBottom: '0.75rem'}} /><h3 style={{fontWeight: 700, color: '#111827', marginBottom: '0.5rem', fontSize: '1.125rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Integrated Financial Hub</h3><p style={{fontSize: '0.9rem', color: '#4B5563', fontWeight: 400, lineHeight: 1.5, fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Manage all your finances without leaving the platform.</p></div>
            </div>
          </div>
        </section>
      </main>
      <footer style={{backgroundColor: '#F3F4F6', color: '#4B5563', padding: '3rem 0', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem'}}>
          <div><h3 style={{fontWeight: 700, color: '#111827', marginBottom: '1rem', fontSize: '1rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Pryysm</h3><p style={{fontSize: '0.875rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>The OS for Digital Manufacturing.</p></div>
          <div><h3 style={{fontWeight: 700, color: '#111827', marginBottom: '1rem', fontSize: '1rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Product</h3><Link href="#features" style={{color: '#004B8D', textDecoration: 'none', fontSize: '0.875rem', display: 'block', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Features</Link></div>
          <div><h3 style={{fontWeight: 700, color: '#111827', marginBottom: '1rem', fontSize: '1rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Company</h3><Link href="#" style={{color: '#4B5563', textDecoration: 'none', fontSize: '0.875rem', display: 'block', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>About Us</Link><Link href="#" style={{color: '#4B5563', textDecoration: 'none', fontSize: '0.875rem', display: 'block', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Careers</Link></div>
          <div><h3 style={{fontWeight: 700, color: '#111827', marginBottom: '1rem', fontSize: '1rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Legal</h3><Link href="#" style={{color: '#4B5563', textDecoration: 'none', fontSize: '0.875rem', display: 'block', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Terms</Link></div>
        </div>
      </footer>
    </div>
  );
}
