
"use client"

import React, { useState, useEffect, lazy, Suspense } from "react"
import { DashboardHeader } from "./header"
import { StatCards } from "./stat-cards"
import { format } from "date-fns"

// Lazy load chart components to improve initial load time
const OrdersChart = lazy(() => import('./orders-chart').then(mod => ({ default: mod.OrdersChart })))
const RevenueChart = lazy(() => import('./revenue-chart').then(mod => ({ default: mod.RevenueChart })))
const InventoryStatus = lazy(() => import('./inventory-status').then(mod => ({ default: mod.InventoryStatus })))
const RecentOrders = lazy(() => import('./recent-orders').then(mod => ({ default: mod.RecentOrders })))

export type Currency = "USD" | "EUR" | "AED" | "INR"
export type RevenueTimeframe = "month" | "year";


export function DashboardClient() {
  const [currency, setCurrency] = useState<Currency>("USD")
  const [revenueTimeframe, setRevenueTimeframe] = useState<RevenueTimeframe>("year");
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    // Set date on client-side only to prevent hydration mismatch
    setCurrentDate(format(new Date(), 'dd-MM-yyyy'))
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
    </div>
  )
}


