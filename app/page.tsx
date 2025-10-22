
'use client';

import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle2, Layers, Workflow, Cpu, FileText, Zap, BarChart3, Shield, ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function LandingPage() {
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white text-slate-900">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">Pryysm</div>
              <div className="text-xs text-slate-500 font-medium">by 3D Prodigy</div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:inline-flex text-sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
                Book Demo
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/10 to-blue-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Next-Gen 3D Printing OS
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-primary to-accent bg-clip-text text-transparent">
                  Transform Your 3D Printing Operation
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed font-light">
                All-in-one intelligent platform for scheduling, tracking, costing, and scaling your 3D printing farm with AI-powered insights and complete operational visibility.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all px-8 py-6 text-base font-semibold">
                  <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
                    Book Your Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-200 hover:border-primary hover:bg-primary/5 px-8 py-6 text-base font-semibold">
                  <Link href="/login">
                    Start Free Trial
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 text-sm text-slate-600 border-t border-slate-200/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="font-medium">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="font-medium">Expert support included</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative w-full py-24 md:py-36 lg:py-48 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 md:mb-28">
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-slate-900 to-primary bg-clip-text text-transparent">
                  Powerful Features, Simplified
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed">
                Everything you need to optimize, automate, and scale your 3D printing operations in one unified platform.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-primary/30 bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary/5 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">AI-Powered Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    Intelligent algorithms automatically optimize job placement, minimize idle time, and maximize printer utilization.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Real-time scheduling</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Predictive optimization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Constraint handling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-primary/30 bg-white hover:bg-gradient-to-br hover:from-white hover:to-accent/5 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                    <Workflow className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-bold">Visual Project Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    Kanban-style boards and real-time dashboards provide complete visibility into every project and job status.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Kanban workflow</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Live status updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Drag-and-drop interface</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-primary/30 bg-white hover:bg-gradient-to-br hover:from-white hover:to-warning/5 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                    <Calculator className="h-6 w-6 text-warning" />
                  </div>
                  <CardTitle className="text-xl font-bold">Smart Costing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    Automatic cost calculations with material tracking, labor, overhead, and real-time profit analysis.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Material tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Profit margins</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Cost templates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-primary/30 bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary/5 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Analytics & Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    Comprehensive dashboards and reports for production metrics, efficiency trends, and business intelligence.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Real-time dashboards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Custom reports</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Export capabilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-primary/30 bg-white hover:bg-gradient-to-br hover:from-white hover:to-accent/5 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-bold">Document Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    Generate professional invoices, quotations, shipping labels, and complete order documentation automatically.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Auto-generated docs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Custom templates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Digital signing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-primary/30 bg-white hover:bg-gradient-to-br hover:from-white hover:to-info/5 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-info/20 to-info/10 flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                    <Shield className="h-6 w-6 text-info" />
                  </div>
                  <CardTitle className="text-xl font-bold">Enterprise Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    Bank-grade security with role-based access, audit logs, data encryption, and compliance certifications.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Role-based access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Data encryption</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">Compliance ready</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="relative w-full py-24 md:py-36 lg:py-48 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-3">47%</div>
                <p className="text-slate-600 font-light text-lg">Average productivity increase</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-3">3.2x</div>
                <p className="text-slate-600 font-light text-lg">Faster job scheduling</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-success mb-3">89%</div>
                <p className="text-slate-600 font-light text-lg">Cost reduction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-warning mb-3">5min</div>
                <p className="text-slate-600 font-light text-lg">Setup time</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="relative w-full py-24 md:py-36 lg:py-48 bg-gradient-to-r from-primary to-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight mb-8">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-xl text-white/90 mb-12 font-light leading-relaxed">
                Join 3D printing farms worldwide that are increasing efficiency, reducing costs, and scaling their operations with Pryysm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 font-semibold">
                  <Link href="https://calendly.com/bhavin-lad-3d-prodigy/pryysm-demo" target="_blank" rel="noopener noreferrer">
                    Schedule Demo <Rocket className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 font-semibold">
                  <Link href="/login">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative w-full py-24 md:py-36 lg:py-48 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-slate-900 to-primary bg-clip-text text-transparent">
                  Loved by 3D Printing Professionals
                </span>
              </h2>
              <p className="text-lg text-slate-600 font-light">
                See what industry leaders are saying about Pryysm
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="rounded-2xl border-slate-200">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    "Pryysm has transformed how we manage our farm. Scheduling is now 3x faster and costs are 40% lower. Absolutely incredible."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      JP
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">James Patterson</p>
                      <p className="text-sm text-slate-500">3D Farm Ops Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="rounded-2xl border-slate-200">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    "The AI scheduling is mind-blowing. It optimizes jobs better than our team ever could. We increased throughput by 47%."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Sarah Kumar</p>
                      <p className="text-sm text-slate-500">Printing Solutions CEO</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="rounded-2xl border-slate-200">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    "Dashboard visibility is unmatched. Our team now has complete real-time insight into every printer and job. Game changer."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      MC
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Mike Chen</p>
                      <p className="text-sm text-slate-500">Manufacturing Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative w-full py-24 md:py-36 lg:py-48 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-slate-900 to-primary bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="text-lg text-slate-600 font-light">
                Everything you need to know about Pryysm
              </p>
            </div>

            <div className="grid gap-8 max-w-3xl mx-auto">
              {[
                {
                  q: "How long does it take to set up Pryysm?",
                  a: "Most users have Pryysm fully set up and running within 5 minutes. No complex configuration required."
                },
                {
                  q: "Is my data secure?",
                  a: "Yes, we use bank-grade encryption, regular security audits, and comply with GDPR and SOC 2 standards."
                },
                {
                  q: "Can I try Pryysm before purchasing?",
                  a: "Absolutely! We offer a 14-day free trial with full access to all features. No credit card required."
                },
                {
                  q: "What support options are available?",
                  a: "We offer email, chat, and phone support. Premium plans include a dedicated success manager."
                },
                {
                  q: "Can Pryysm integrate with our existing tools?",
                  a: "Yes, Pryysm has APIs and integrations for most common 3D printing tools and business software."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, bank transfers, and wire transfers for enterprise plans."
                }
              ].map((item, index) => (
                <Card key={index} className="rounded-xl border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-slate-900">
                      {item.q}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 font-light leading-relaxed">
                      {item.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-slate-400 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Pryysm</div>
                  <div className="text-xs text-slate-500">by 3D Prodigy</div>
                </div>
              </div>
              <p className="text-sm font-light text-slate-500">The OS for Digital Manufacturing.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6">Product</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#features" className="hover:text-white transition font-light">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition font-light">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition font-light">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition font-light">About</Link></li>
                <li><Link href="#" className="hover:text-white transition font-light">Blog</Link></li>
                <li><Link href="#contact" className="hover:text-white transition font-light">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition font-light">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition font-light">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition font-light">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-12 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500">
            <p className="font-light">&copy; {new Date().getFullYear()} Pryysm by 3D Prodigy. All rights reserved.</p>
            <div className="flex gap-8 mt-6 sm:mt-0">
              <Link href="#" className="hover:text-white transition font-light">Twitter</Link>
              <Link href="#" className="hover:text-white transition font-light">LinkedIn</Link>
              <Link href="#" className="hover:text-white transition font-light">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
