
'use client';

import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle2, GanttChartSquare, Layers, Workflow, Cpu, FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function LandingPage() {

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white', color: '#1F2937', fontFamily: "'Roboto', sans-serif"}}>
      <header style={{padding: '1rem 1.5rem', height: '4rem', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)'}}>
        <Link href="#" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit'}} prefetch={false}>
          <Layers style={{width: '2rem', height: '2rem', color: '#EAB308'}} />
          <span style={{marginLeft: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#004B8D'}}>
            Pryysm <span style={{fontSize: '0.875rem', fontWeight: 500, color: '#6B7280'}}>by 3D Prodigy</span>
          </span>
        </Link>
        <nav style={{marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <Link href="#features" style={{fontSize: '0.875rem', fontWeight: 500, color: '#4B5563', textDecoration: 'none', cursor: 'pointer'}} prefetch={false} onMouseEnter={(e) => (e.currentTarget.style.color = '#004B8D')} onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}>
            Features
          </Link>
          <Link href="#contact" style={{fontSize: '0.875rem', fontWeight: 500, color: '#4B5563', textDecoration: 'none', cursor: 'pointer'}} prefetch={false} onMouseEnter={(e) => (e.currentTarget.style.color = '#004B8D')} onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}>
            Contact
          </Link>
          <Button asChild variant="secondary">
            <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
              Book Demo
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>

      <main style={{flex: 1}}>
        {/* Hero Section */}
        <section style={{width: '100%', paddingTop: '6rem', paddingBottom: '8rem', textAlign: 'center', overflow: 'hidden', backgroundColor: 'white'}}>
          <div style={{maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
              <h1 style={{fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 'bold', letterSpacing: '-0.02em', marginBottom: '1.5rem', background: 'linear-gradient(to bottom right, #111827, #004B8D, #E6A635)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent'}}>
                Revolutionize Your 3D Printing Operation
              </h1>

              <p style={{maxWidth: '45rem', color: '#4B5563', fontSize: '1.125rem', marginBottom: '1rem', lineHeight: 1.6}}>
                Pryysm is the all-in-one, intelligent platform designed to bring clarity, efficiency, and powerful automation to your 3D printing farm.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{width: '100%', paddingTop: '3rem', paddingBottom: '6rem', backgroundColor: '#F3F4F6'}}>
          <div style={{maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center', marginBottom: '3rem'}}>
              <h2 style={{fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-0.02em', color: '#111827'}}>A Smarter Way to Print</h2>
              <p style={{maxWidth: '56rem', color: '#4B5563', fontSize: '1.125rem', lineHeight: 1.6}}>
                From intelligent scheduling to complete financial oversight, Pryysm is the unified OS your 3D printing farm needs to scale efficiently.
              </p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto'}}>        
              {/* Feature 1: AI Scheduling */}
              <Card style={{display: 'flex', flexDirection: 'column', border: '1px solid #E5E7EB', borderRadius: '0.75rem', backgroundColor: 'white'}}>
                <CardHeader style={{paddingBottom: '0.75rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div style={{display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'rgba(0, 75, 141, 0.1)'}}>
                      <Cpu style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                    </div>
                    <CardTitle style={{fontSize: '1.125rem', fontWeight: 'bold'}}>AI-Powered Scheduling</CardTitle>
                  </div>
                </CardHeader>
                <CardContent style={{flex: 1}}>
                  <p style={{color: '#6B7280', marginBottom: '1rem', lineHeight: 1.6}}>
                    Our intelligent AI scheduler analyzes your entire fleet, job requirements, and deadlines to find the absolute optimal production plan.
                  </p>
                  <ul style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', listStyle: 'none'}}>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
                      <CheckCircle2 style={{height: '1.25rem', width: '1.25rem', marginTop: '0.125rem', color: '#004B8D', flexShrink: 0}} />
                      <span>Automatically find the most efficient slot for any job.</span>
                    </li>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
                      <CheckCircle2 style={{height: '1.25rem', width: '1.25rem', marginTop: '0.125rem', color: '#004B8D', flexShrink: 0}} />
                      <span>Maximize printer utilization and reduce idle time.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 2: Visual Workflow */}
              <Card style={{display: 'flex', flexDirection: 'column', border: '1px solid #E5E7EB', borderRadius: '0.75rem', backgroundColor: 'white'}}>
                <CardHeader style={{paddingBottom: '0.75rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div style={{display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'rgba(0, 75, 141, 0.1)'}}>
                      <Workflow style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                    </div>
                    <CardTitle style={{fontSize: '1.125rem', fontWeight: 'bold'}}>Visual Project Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent style={{flex: 1}}>
                  <p style={{color: '#6B7280', marginBottom: '1rem', lineHeight: 1.6}}>
                    Ditch confusing spreadsheets. Our intuitive Kanban-style board gives you a complete visual overview of every project in your pipeline.
                  </p>
                  <ul style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', listStyle: 'none'}}>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
                      <CheckCircle2 style={{height: '1.25rem', width: '1.25rem', marginTop: '0.125rem', color: '#004B8D', flexShrink: 0}} />
                      <span>Track projects from order to dispatch in one view.</span>
                    </li>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
                      <CheckCircle2 style={{height: '1.25rem', width: '1.25rem', marginTop: '0.125rem', color: '#004B8D', flexShrink: 0}} />
                      <span>Get instant insights into bottlenecks and resource allocation.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 3: Financial Hub */}
              <Card style={{display: 'flex', flexDirection: 'column', border: '1px solid #E5E7EB', borderRadius: '0.75rem', backgroundColor: 'white'}}>
                <CardHeader style={{paddingBottom: '0.75rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div style={{display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'rgba(0, 75, 141, 0.1)'}}>
                      <FileText style={{height: '1.5rem', width: '1.5rem', color: '#004B8D'}} />
                    </div>
                    <CardTitle style={{fontSize: '1.125rem', fontWeight: 'bold'}}>Integrated Financial Hub</CardTitle>
                  </div>
                </CardHeader>
                <CardContent style={{flex: 1}}>
                  <p style={{color: '#6B7280', marginBottom: '1rem', lineHeight: 1.6}}>
                    From precise job costing to professional invoicing, Pryysm integrates your finances directly into your workflow to ensure profitability.
                  </p>
                  <ul style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', listStyle: 'none'}}>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
                      <CheckCircle2 style={{height: '1.25rem', width: '1.25rem', marginTop: '0.125rem', color: '#004B8D', flexShrink: 0}} />
                      <span>Calculate exact job costs, including materials and labor.</span>
                    </li>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
                      <CheckCircle2 style={{height: '1.25rem', width: '1.25rem', marginTop: '0.125rem', color: '#004B8D', flexShrink: 0}} />
                      <span>Generate and send professional quotes and invoices in minutes.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Pillars Section */}
        <section style={{width: '100%', paddingTop: '3rem', paddingBottom: '6rem', backgroundColor: 'white'}}>
          <div style={{maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center', marginBottom: '3rem'}}>
              <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', letterSpacing: '-0.02em', color: '#111827'}}>The Unified Platform for Manufacturing</h2>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto'}}>        
              <div style={{display: 'grid', gap: '0.5rem', padding: '1.5rem', borderRadius: '0.5rem', cursor: 'pointer', transition: 'background-color 0.2s'}} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <Workflow style={{height: '2rem', width: '2rem', color: '#004B8D'}} />
                <h3 style={{fontSize: '1.125rem', fontWeight: 'bold'}}>Total Workflow Control</h3>
                <p style={{fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6}}>Manage your entire production pipeline visually. Track every project from order to dispatch on an intuitive Kanban board and eliminate operational blind spots.</p>
              </div>
              <div style={{display: 'grid', gap: '0.5rem', padding: '1.5rem', borderRadius: '0.5rem', cursor: 'pointer', transition: 'background-color 0.2s'}} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <GanttChartSquare style={{height: '2rem', width: '2rem', color: '#004B8D'}} />
                <h3 style={{fontSize: '1.125rem', fontWeight: 'bold'}}>Intelligent Resource Planning</h3>
                <p style={{fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6}}>Leverage AI to automate scheduling, maximize printer uptime, and receive intelligent reorder alerts for materials before you run out. Turn your farm into a self-optimizing ecosystem.</p>
              </div>
              <div style={{display: 'grid', gap: '0.5rem', padding: '1.5rem', borderRadius: '0.5rem', cursor: 'pointer', transition: 'background-color 0.2s'}} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <Calculator style={{height: '2rem', width: '2rem', color: '#004B8D'}} />
                <h3 style={{fontSize: '1.125rem', fontWeight: 'bold'}}>Integrated Financial Hub</h3>
                <p style={{fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6}}>From precise job costing that ensures profitability to generating professional quotations and invoices, manage all your finances without leaving the platform.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer id="contact" style={{backgroundColor: '#F3F4F6', color: '#4B5563', paddingTop: '3rem', paddingBottom: '3rem'}}>
        <div style={{maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', padding: '0 1rem'}}>
            <div>
                <h3 style={{fontWeight: 600, color: '#111827', marginBottom: '1rem'}}>Pryysm <span style={{fontSize: '0.75rem', fontWeight: 500, color: '#6B7280'}}>by 3D Prodigy</span></h3>
                <p style={{fontSize: '0.875rem'}}>The OS for Digital Manufacturing.</p>
            </div>
             <div>
                <h3 style={{fontWeight: 600, color: '#111827', marginBottom: '1rem'}}>Product</h3>
                 <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', listStyle: 'none', padding: 0}}>
                    <li><Link href="#features" style={{textDecoration: 'none', color: '#4B5563', cursor: 'pointer'}} prefetch={false} onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')} onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}>Features</Link></li>
                </ul>
            </div>
            <div>
                <h3 style={{fontWeight: 600, color: '#111827', marginBottom: '1rem'}}>Company</h3>
                 <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', listStyle: 'none', padding: 0}}>
                    <li><Link href="#" style={{textDecoration: 'none', color: '#4B5563', cursor: 'pointer'}} prefetch={false} onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')} onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}>About Us</Link></li>
                    <li><Link href="#" style={{textDecoration: 'none', color: '#4B5563', cursor: 'pointer'}} prefetch={false} onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')} onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}>Careers</Link></li>
                    <li><Link href="#" style={{textDecoration: 'none', color: '#4B5563', cursor: 'pointer'}} prefetch={false} onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')} onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}>Contact</Link></li>
                </ul>
            </div>
             <div>
                <h3 style={{fontWeight: 600, color: '#111827', marginBottom: '1rem'}}>Legal</h3>
                 <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', listStyle: 'none', padding: 0}}>
                    <li><Link href="#" style={{textDecoration: 'none', color: '#4B5563', cursor: 'pointer'}} prefetch={false} onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')} onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}>Terms of Service</Link></li>
                    <li><Link href="#" style={{textDecoration: 'none', color: '#4B5563', cursor: 'pointer'}} prefetch={false} onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')} onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}>Privacy Policy</Link></li>
                </ul>
            </div>
        </div>
        <div style={{maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #E5E7EB', textAlign: 'center', fontSize: '0.875rem', padding: '0 1rem'}}>
             &copy; {new Date().getFullYear()} Pryysm by 3D Prodigy. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
