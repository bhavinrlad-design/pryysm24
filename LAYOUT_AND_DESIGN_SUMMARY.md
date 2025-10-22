# Pryysm Application - Layout & Design Structure

## ✅ Application Layout & Design - FOUND AND INTACT

Your application has a complete, professional layout and design system. Here's where everything is located:

---

## 📁 Directory Structure

### **Main Application Files**

```
d:\Pryysm-v2\pryysm-v2-3dprint\
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout (providers, metadata)
│   ├── page.tsx                 # Landing page (public)
│   ├── globals.css              # Global styles
│   ├── dashboard/               # Dashboard page
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── orders/                  # Orders page
│   ├── inventory/               # Inventory page
│   ├── printers/                # Printers page
│   ├── settings/                # Settings page
│   ├── ai-chat/                 # AI Chat page
│   ├── finance/                 # Finance page
│   ├── labels/                  # Labels page
│   └── [other pages]/           # Additional features
│
└── src/
    ├── components/
    │   ├── layout/              # Layout components
    │   │   ├── app-layout.tsx           # Main app layout (sidebar + header)
    │   │   └── app-header.tsx           # Header component
    │   │
    │   ├── ui/                  # Shadcn UI components (30+ components)
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── sidebar.tsx
    │   │   ├── dialog.tsx
    │   │   ├── table.tsx
    │   │   ├── form.tsx
    │   │   └── [25 more...]
    │   │
    │   ├── dashboard/           # Dashboard components
    │   ├── auth/                # Auth components
    │   ├── navigation/          # Navigation components
    │   ├── shared/              # Shared components
    │   └── [feature components]/
    │
    ├── hooks/                   # Custom React hooks
    ├── providers/               # Context providers
    ├── lib/                     # Utility functions
    └── styles/                  # Additional styles
```

---

## 🎨 Design System Overview

### **UI Components (in `src/components/ui/`)**

30+ production-ready components from Shadcn UI:
- **Layout**: Sidebar, Card, Separator
- **Navigation**: Dropdown Menu, Menubar, Sheet
- **Forms**: Input, Label, Button, Checkbox, Select, Radio Group, Textarea
- **Data**: Table, Badge, Progress
- **Dialogs**: Dialog, Alert Dialog, Collapsible
- **Display**: Tooltip, Popover, Skeleton, Carousel
- **Charts**: Chart components
- **And more...** Tabs, Accordion, Toast, Calendar, Slider

### **Colors & Styling**
- **Framework**: Tailwind CSS
- **Theme**: Light/dark mode support
- **Fonts**: Roboto (weights: 300, 400, 500, 700)
- **Color Variables**: CSS custom properties (sidebar colors, primary, accent, etc.)

---

## 📄 Page Templates

Each page uses a consistent layout pattern:

```typescript
// Example: Dashboard page
import { DashboardClient } from "@/components/dashboard/dashboard-client"
import { AppLayout } from "@/components/layout/app-layout"

export default function DashboardPage() {
  return (
    <AppLayout>
      <DashboardClient />
    </AppLayout>
  )
}
```

### **Pages Available:**
1. **Public Pages**
   - `/` - Landing page with features, pricing, CTA
   - `/login` - Login form
   - `/signup` - Signup form

2. **Protected Pages** (require authentication)
   - `/dashboard` - Main dashboard with analytics
   - `/orders` - Order management
   - `/inventory` - Inventory management
   - `/printers` - Printer management
   - `/customers` - Customer management
   - `/finance` - Financial reports
   - `/settings` - App settings
   - `/ai-chat` - AI chat interface
   - `/labels` - Label printing
   - `/tracking` - Job tracking
   - `/job-allotment` - Job allocation
   - `/order-dispatch` - Order dispatch
   - `/add-remove-printer` - Printer management
   - `/costing` - Cost calculation
   - `/material-log` - Material tracking
   - `/raw-material` - Raw materials
   - `/subscribe` - Subscription page

---

## 🔐 Authentication & Protection

- **AuthProvider**: Wraps entire app at root layout
- **ProtectedRoute**: Guards dashboard and protected pages
- **WorkspaceProvider**: Manages app state and workspace data
- All sensitive pages automatically redirect to login if not authenticated

---

## 🎯 Root Layout (`app/layout.tsx`)

```typescript
- Title: "Pryysm by 3D Prodigy"
- Description: "3D Printing Farm Dashboard"
- Providers:
  * AuthProvider (handles user authentication)
  * WorkspaceProvider (manages workspace data)
  * Toaster (for notifications)
- Styles: Global CSS with Tailwind
- Fonts: Google Fonts (Roboto)
```

---

## 🚀 Landing Page Features (`app/page.tsx`)

The landing page includes:
- **Header/Navigation** - Sticky header with logo, menu, CTA buttons
- **Hero Section** - Main headline and CTA
- **Features Section** - Showcase of key features
- **Benefits Section** - Business value proposition
- **Pricing Section** - Pricing tiers (if configured)
- **Contact/Demo Section** - Book demo link to Calendly
- **Gradient Background** - Professional styling

---

## ✨ Design Highlights

✅ **Responsive Design** - Mobile-first approach with Tailwind breakpoints
✅ **Consistent UI** - Shadcn components ensure uniformity
✅ **Professional Theme** - Gradient backgrounds, smooth transitions
✅ **Dark Mode Ready** - Light/dark theme support built-in
✅ **Accessibility** - Semantic HTML, ARIA labels
✅ **Icons** - Lucide React icons throughout
✅ **Type Safety** - Full TypeScript support

---

## 🔍 What You Can Access

**Live App**: https://pryysm-v2-dyfqbdd3g4gycnee.uaenorth-01.azurewebsites.net

**Public Pages** (no login required):
- Home: `/`
- Login: `/login`
- Signup: `/signup`

**Protected Pages** (login required):
- Dashboard: `/dashboard`
- Orders: `/orders`
- Inventory: `/inventory`
- All other pages

---

## 📝 Summary

**Your application layout and design are completely intact and working perfectly!**

All pages, components, styling, and design system are properly deployed and accessible. The app uses:
- ✅ Professional Shadcn UI component library
- ✅ Tailwind CSS for responsive design
- ✅ Next.js App Router for modern page structure
- ✅ TypeScript for type safety
- ✅ Authentication and protected routes
- ✅ Consistent layout pattern across all pages

The app is production-ready and fully functional! 🎉
