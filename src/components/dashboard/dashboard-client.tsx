
"use client"

import React, { useState, useEffect, lazy, Suspense } from "react"
import { DashboardHeader } from "./header"
import { StatCards } from "./stat-cards"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Printer, 
  Package, 
  FileText, 
  Settings, 
  BookOpen, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react"

// Lazy load chart components to improve initial load time
const OrdersChart = lazy(() => import('./orders-chart').then(mod => ({ default: mod.OrdersChart })))
const RevenueChart = lazy(() => import('./revenue-chart').then(mod => ({ default: mod.RevenueChart })))
const InventoryStatus = lazy(() => import('./inventory-status').then(mod => ({ default: mod.InventoryStatus })))
const RecentOrders = lazy(() => import('./recent-orders').then(mod => ({ default: mod.RecentOrders })))

export type Currency = "USD" | "EUR" | "AED" | "INR"
export type RevenueTimeframe = "month" | "year";

function WelcomeBlankSlate() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed welcome screen
    const isDismissed = localStorage.getItem('welcome_dismissed') === 'true'
    if (isDismissed) {
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('welcome_dismissed', 'true')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div className="space-y-6">
      {/* Hero Welcome Card */}
      <Card className="border-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Welcome to Pryysm!</CardTitle>
                <CardDescription className="text-base mt-2">
                  Your blank canvas is ready. Let's set up your 3D print farm management system.
                </CardDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Getting Started Steps */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Step 1: Add Printers */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Printer className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">1. Add Printers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Register your 3D printers and their specifications to start tracking production.
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link href="/inventory#printers">
                Add Printers <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Add Materials */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-lg">2. Add Materials</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Catalog your filament, resin, and other materials with pricing information.
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link href="/inventory#materials">
                Add Materials <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Step 3: Create First Order */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-lg">3. Create First Order</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create your first print job and assign it to your printers.
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link href="/orders">
                Create Order <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Quick Tips to Get Started
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                Start by setting up your printers in the Inventory section
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                Define all your materials including cost and specifications
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                Use the AI Chat feature to get help with job costing and planning
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                Check the Costing module to calculate accurate job quotes
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 border-t" />
        <span className="text-sm text-muted-foreground">Or start with existing data</span>
        <div className="flex-1 border-t" />
      </div>
    </div>
  )
}

export function DashboardClient() {
  const [currency, setCurrency] = useState<Currency>("USD")
  const [revenueTimeframe, setRevenueTimeframe] = useState<RevenueTimeframe>("year");
  const [currentDate, setCurrentDate] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    // Set date on client-side only to prevent hydration mismatch
    setCurrentDate(format(new Date(), 'dd-MM-yyyy'))
    
    // Check if this is a new user
    const newSignup = localStorage.getItem('new_signup') === 'true'
    const notDismissed = localStorage.getItem('welcome_dismissed') !== 'true'
    setIsNewUser(newSignup && notDismissed)
  }, [])

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8 gap-6 md:gap-8">
      <DashboardHeader
        currency={currency}
        setCurrency={setCurrency}
        revenueTimeframe={revenueTimeframe}
        setRevenueTimeframe={setRevenueTimeframe}
        currentDate={currentDate}
      />
      
      {isNewUser ? (
        // New user - show blank slate welcome screen
        <WelcomeBlankSlate />
      ) : (
        // Existing user - show normal dashboard
        <>
          <StatCards currency={currency} revenueTimeframe={revenueTimeframe} />
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="h-96 bg-slate-100 rounded-lg animate-pulse" />}>
                <OrdersChart />
              </Suspense>
            </div>
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="h-96 bg-slate-100 rounded-lg animate-pulse" />}>
                <RevenueChart />
              </Suspense>
            </div>
          </div>
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <Suspense fallback={<div className="h-96 bg-slate-100 rounded-lg animate-pulse" />}>
              <InventoryStatus />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-slate-100 rounded-lg animate-pulse" />}>
              <RecentOrders currency={currency} />
            </Suspense>
          </div>
        </>
      )}
    </div>
  )
}


