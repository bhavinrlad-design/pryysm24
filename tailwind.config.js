/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  safelist: [
    'bg-gradient-to-b',
    'from-white',
    'via-blue-50',
    'to-white',
    'text-slate-900',
    'sticky',
    'top-0',
    'z-50',
    'bg-white',
    'backdrop-blur-md',
    'border-slate-200',
    'shadow-sm',
    'flex',
    'items-center',
    'justify-between',
    'gap-2',
    'group',
    'rounded-lg',
    'shadow-lg',
    'text-sm',
    'font-bold',
    'leading-tight',
    'text-slate-500',
    'font-medium',
    'hidden',
    'md:flex',
    'gap-8',
    'text-slate-600',
    'hover:text-primary',
    'transition-colors',
    'hover:shadow-xl',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        warning: "var(--warning)",
        success: "var(--success)",
        error: "var(--error)",
        info: "var(--info)",
        neutral: {
          "50": "var(--neutral-50)",
          "100": "var(--neutral-100)",
          "200": "var(--neutral-200)",
          "300": "var(--neutral-300)",
          "400": "var(--neutral-400)",
          "500": "var(--neutral-500)",
          "600": "var(--neutral-600)",
          "700": "var(--neutral-700)",
          "800": "var(--neutral-800)",
          "900": "var(--neutral-900)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // Try to require tailwindcss-animate, but don't fail if it's not available
    function() {
      try {
        return require("tailwindcss-animate");
      } catch (e) {
        console.warn("tailwindcss-animate not found, animations may not work correctly");
        return {};
      }
    }()
  ],
}
