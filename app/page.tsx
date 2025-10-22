
'use client';

import { Button } from "@/components/ui/button";
import { CheckCircle2, Layers, Workflow, Calculator, BarChart3, FileText, GanttChartSquare, Zap, Shield, ArrowRight, Rocket, Cpu } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Top Gradient Bar */}
      <div style={{
        background: 'linear-gradient(to right, #004B8D, #E6A635)',
        height: '4px',
      }}></div>

      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-gray-900">
            PRYYSM
          </Link>
          
          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex text-sm text-gray-600 hover:text-gray-900">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-white via-blue-50/20 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Next-Gen 3D Printing OS
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900">
                Transform Your 3D Printing Operation
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-lg text-gray-600 max-w-2xl leading-relaxed font-normal">
                All-in-one platform for scheduling, tracking, costing, and scaling your 3D printing farm with AI-powered insights.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold">
                  <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
                    Book Demo
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50 px-8 py-6 text-base font-semibold text-gray-900">
                  <Link href="/login">
                    Try Free
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="font-medium">No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="font-medium">14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="font-medium">24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative w-full py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                Core Features
              </h2>
              <p className="text-lg text-gray-600 font-normal leading-relaxed">
                Everything you need to optimize and scale your operations.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Cpu className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Smart Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Intelligent algorithms optimize job placement and maximize printer utilization.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                    <Workflow className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Project Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Real-time dashboards with complete visibility into every project and job status.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <Calculator className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Smart Costing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Automatic cost calculations with material tracking and real-time profit analysis.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <BarChart3 className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Comprehensive dashboards and reports for production metrics and business intelligence.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Auto-generated invoices, quotations, shipping labels, and complete order documentation.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                    <GanttChartSquare className="h-5 w-5 text-cyan-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Bank-grade security with role-based access, audit logs, and compliance certifications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">47%</div>
                <p className="text-gray-600 text-sm">Productivity increase</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">3.2x</div>
                <p className="text-gray-600 text-sm">Faster scheduling</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">89%</div>
                <p className="text-gray-600 text-sm">Cost reduction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">5min</div>
                <p className="text-gray-600 text-sm">Setup time</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="relative w-full py-20 md:py-28 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Transform your 3D printing operation with PRYYSM today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-base font-semibold">
                <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo">
                  Schedule Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-8 py-6 text-base font-semibold">
                <Link href="/login">
                  Start Free Trial
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-bold text-white text-lg mb-4">PRYYSM</h3>
              <p className="text-sm leading-relaxed">
                The all-in-one platform for 3D printing farm operations.
              </p>
            </div>
            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition">Roadmap</Link></li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm">
              © 2025 PRYYSM by 3D Prodigy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
