# Deployment Troubleshooting Guide

## 🎯 CRITICAL FIX APPLIED - Standalone Mode Issue

**The Problem**: Next.js config has `output: 'standalone'` which creates a special `.next/standalone/` folder. The app MUST run from inside that folder using `node server.js`, NOT using `npx next start`.

**The Fix**: Updated `azure-startup.sh` to:
1. Detect if `.next/standalone/` exists
2. If yes: Copy necessary files (package.json, public, prisma) to `.next/standalone/`
3. Change directory to `.next/standalone/`
4. Run `node server.js` directly (no npm, no npx needed)

**Status**: 
- ✅ Commit: 4b5790f - CRITICAL FIX applied
- ✅ Pushed to GitHub
- ⏳ GitHub Actions deployment in progress
- ⏳ Waiting for app to restart on Azure

---

## Current Issue
App shows "Application Error" on https://pryysm.app despite successful deployment

## Status Timeline
- 2024-10-29 09:00 - Initial deployment (409 conflicts)
- 2024-10-29 14:30 - Fixed 409 conflict (disabled duplicate workflow)
- 2024-10-29 15:45 - Fixed dependencies (autoprefixer, tailwindcss)
- 2024-10-29 17:00 - Optimized artifact (80MB, excluded node_modules)
- 2024-10-29 18:15 - Deployment successful but app shows error
- 2024-10-29 18:30 - Attempted npx next start fix
- **2024-10-29 18:45 - CRITICAL FIX: Standalone mode issue identified and fixed** ⭐

## What the Fix Does

### Before (Broken)
```bash
npm install --legacy-peer-deps --omit=dev
npx next start  # ❌ Tries to run from project root, but app is in .next/standalone/
```

### After (Fixed)
```bash
npm install --legacy-peer-deps --omit=dev

if [ -d ".next/standalone" ]; then
  cd .next/standalone
  node server.js  # ✅ Runs directly in standalone folder
else
  npx next start  # Fallback for non-standalone mode
fi
```

## How Standalone Mode Works

When `next.config.js` has `output: 'standalone'`:

1. Build creates `.next/standalone/` folder containing:
   - `node_modules/` - Bundled dependencies
   - `server.js` - The Node.js server
   - `.next/` - Build output
   - All required production files

2. The standalone folder is self-contained and can run independently

3. You run it with: `node server.js` from inside the folder

4. This is MUCH lighter than shipping full node_modules

## Deployment Files

| File | Purpose | Status |
|------|---------|--------|
| `next.config.js` | Enables `output: 'standalone'` | ✅ Unchanged |
| `azure-startup.sh` | Startup script - NOW detects standalone mode | ✅ Fixed |
| `.next/standalone/` | Bundled app directory | ✅ Included in artifact |
| `Procfile` | Tells Azure to run `bash azure-startup.sh` | ✅ Correct |
| `.deployment` | Azure deployment hook | ✅ Correct |
| `.github/workflows/main_pryysm-v2.yml` | GitHub Actions workflow | ✅ Includes .next in artifact |

## Success Indicators
- https://pryysm.app loads WITHOUT "Application Error"
- Homepage displays correctly
- Navigation menu visible
- Login/Signup buttons clickable
- No 500 errors in browser console

## If Still Not Working

Check these in order:

### 1. Azure App Service Logs
Portal → App Services → PRYYSM-V2 → **Log Stream**
Should see:
```
🚀 Starting Pryysm v2 Application
Environment: production
Port: 8080
📦 Installing dependencies...
✅ Dependencies installed
🔍 Checking .next folder...
✅ Standalone mode detected - copying files...
📁 Current directory: /home/site/wwwroot/.next/standalone
▶️  Starting with standalone Next.js server
```

### 2. Verify Files on Azure
SSH into the container and check:
```bash
ls -la .next/standalone/
cat .next/standalone/package.json
```

### 3. Check Port is Correct
Azure App Service listens on port 8080 by default. If that's not set:
```
PORT=8080 node server.js
```

### 4. Test Locally
Run locally to verify it works:
```bash
npm install --legacy-peer-deps --omit=dev
npm run build
cd .next/standalone
node server.js
# Should see server listening on port 3000 (or PORT env var)
```

## Key Configuration

**next.config.js:**
```javascript
const nextConfig = {
  output: 'standalone',  // ← This is the key setting
  // ... other config
};
```

This tells Next.js to bundle everything into `.next/standalone/` so the app can run WITHOUT requiring the source code or full node_modules.

---
**Last Updated**: 2024-10-29 18:45  
**Current Fix**: Standalone mode handler (commit 4b5790f)  
**Waiting For**: GitHub Actions deployment to complete

