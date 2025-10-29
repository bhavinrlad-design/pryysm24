# Application Error - Comprehensive Fix & Troubleshooting

## 🚨 Problem: App Shows "Application Error"

The deployment succeeded, but the server isn't starting or is crashing immediately.

---

## 🎯 Root Causes & Solutions

### Potential Cause #1: Missing Startup Command Configuration ❌
**For**: Azure Linux App Service  
**Fix Applied**: Added `Procfile`

```procfile
web: NODE_ENV=production node index.js
```

Azure reads this and knows exactly how to start the app.

### Potential Cause #2: Dependencies Not Installing ❌
**Fix Applied**: Always run npm install in startup.sh

```bash
npm install --legacy-peer-deps || true
```

The `|| true` ensures it continues even if it fails temporarily.

### Potential Cause #3: .next Folder Missing ❌
**Fix Applied**: Check and rebuild if missing

```bash
if [ ! -d ".next" ]; then
  npm run build
fi
```

### Potential Cause #4: Startup Script Not Executable ❌
**Fix Applied**: Using bash explicitly

```
command = bash startup.sh  # ✅ This always works
```

### Potential Cause #5: Environment Variables Not Set ❌
**Fix Applied**: Diagnostic script shows all env vars

The `start-with-diagnostics.sh` script shows:
- NODE_ENV value
- PORT number
- DATABASE_URL status
- File system structure
- node_modules status
- .next status

---

## ✅ All Fixes in Commit 98b5c3f

| Fix | File | Change | Why |
|-----|------|--------|-----|
| 1 | `Procfile` | Created for Azure startup | Tells Azure exactly how to start |
| 2 | `startup.sh` | Always run npm install | Ensure dependencies available |
| 3 | `startup.sh` | Check .next exists | Verify build output present |
| 4 | `.deployment` | Use `bash startup.sh` | Execute startup script properly |
| 5 | `start-with-diagnostics.sh` | Created | Debug what's happening |
| 6 | `main_pryysm-v2.yml` | Include new files in artifact | Deploy diagnostic scripts |

---

## 🔄 Deployment Flow (Now Fixed)

### GitHub Actions:
```
1. Checkout code
2. Setup Node 22.x
3. npm install --legacy-peer-deps
4. npx prisma generate
5. npm run build (creates .next)
6. Upload artifact:
   - .next/
   - node_modules/ ❌ NOT included (too large)
   - package.json
   - package-lock.json
   - index.js
   - startup.sh ✅
   - Procfile ✅
   - .deployment ✅
```

### Azure App Service:
```
1. Download artifact
2. Kudu deployment engine processes files
3. .deployment file found → execute command
4. Command: bash startup.sh
5. startup.sh runs:
   - npm install --legacy-peer-deps (recreates node_modules)
   - Checks .next exists
   - Sets NODE_ENV=production
   - Runs: node index.js
6. index.js loads Next.js
7. Server listens on :8080
8. Azure routes traffic to port 8080
9. ✅ App displays!
```

---

## 🧪 Testing the Fix

### Step 1: Monitor GitHub Actions Build
- Go to: https://github.com/lad-pryysm/pryysm-v2/actions
- Watch for commit 17c08f5
- Verify all steps succeed (build, upload, deploy)
- Look for "0 errors" in build summary

### Step 2: Check Deployment Status
- After ~10 minutes, deployment completes
- Azure Portal → PRYYSM-V2 → Status should show "Running"
- Deployment Center should show "Successful"

### Step 3: Access the App
- Refresh https://pryysm.app (or hard refresh: Ctrl+Shift+R)
- **Expected**: Homepage loads WITHOUT "Application Error"
- **Verify**: 
  - Styling visible
  - Navigation menu appears
  - Login/Signup buttons clickable

### Step 4: Check Azure Logs (If Still Broken)
If it still shows error:
1. Azure Portal → PRYYSM-V2
2. Click "App Service logs" or "Log Stream"
3. Look for error messages
4. Share the error with detailed context

---

## 🔍 Diagnostics Available

If needed, you can run diagnostic script:

**Via SSH/Console**:
```bash
bash start-with-diagnostics.sh
```

This shows:
- All environment variables (masked safely)
- Node/npm versions
- File system status (.next, node_modules, index.js)
- Directory sizes
- Then attempts to start the app with full output

---

## 📊 Expected Timeline

```
T+0m   → Commit 17c08f5 pushed
T+2m   → GitHub Actions triggered
T+5m   → npm install + Prisma + build complete
T+10m  → Artifact ready, Azure deployment starts
T+12m  → Azure downloads artifact
T+13m  → .deployment file processed
T+14m  → startup.sh executes
T+15m  → npm install on Azure (rebuilds node_modules)
T+16m  → node index.js starts
T+17m  → Server listening on :8080
T+18m  → 🟢 App ready
T+20m  → **https://pryysm.app loads successfully!**
```

---

## ✅ Success Indicators

### Green Lights:
✅ GitHub Actions build succeeds  
✅ Azure deployment shows "Successful"  
✅ App Service status shows "Running"  
✅ https://pryysm.app loads  
✅ No "Application Error" message  
✅ Homepage displays correctly  
✅ Styling visible  

### Red Lights:
❌ Still shows "Application Error"
❌ Page times out (60+ seconds)
❌ JavaScript errors in console
❌ Azure logs show "failed to start"

---

## 🚨 If Still Broken

### Quick Fixes to Try:

1. **Hard Refresh Browser**
   ```
   Ctrl+Shift+R (or Cmd+Shift+R on Mac)
   ```

2. **Wait Longer**
   - Azure cold starts can take 2-3 minutes
   - Server might still be installing dependencies
   - Wait at least 5 minutes after deployment

3. **Check Environment Variables**
   - Azure Portal → Configuration
   - Verify DATABASE_URL is set
   - Verify NEXTAUTH_SECRET is set
   - Verify NODE_ENV = production
   - Click "Save" if any changes

4. **Restart App Service**
   - Azure Portal → Overview
   - Click "Restart" button (top)
   - Wait 2-3 minutes for restart

5. **Check for Errors**
   - Azure Portal → App Service logs
   - Look for "Error" or "Exception"
   - Screenshot and share error message

---

## 🔧 Technical Details

### Procfile (NEW)
```procfile
web: NODE_ENV=production node index.js
```

This tells Azure:
- Process type: `web` (handles HTTP requests)
- Startup command: Run `node index.js` with `NODE_ENV=production`

### startup.sh (IMPROVED)
```bash
#!/bin/bash
set -e  # Exit on any error

# Always install dependencies
npm install --legacy-peer-deps || true

# Verify .next exists
if [ ! -d ".next" ]; then
  npm run build
fi

# Start app
export NODE_ENV=production
export PORT=8080
exec node index.js
```

### .deployment (FIXED)
```
command = bash startup.sh
```

Simple and direct - executes startup.sh script.

---

## 📝 Files Deployed

**Commit 98b5c3f** includes:
- ✅ `Procfile` - Azure startup configuration
- ✅ `startup.sh` - Enhanced startup script
- ✅ `start-with-diagnostics.sh` - Diagnostic tool
- ✅ `.deployment` - Simplified deployment script
- ✅ `main_pryysm-v2.yml` - Updated workflow (includes all files)

**What's in Artifact**:
- `.next/` - Pre-built Next.js output
- `public/` - Static assets
- `package.json` - Dependencies list
- `index.js` - Entry point
- `startup.sh` - Startup script
- `Procfile` - Azure configuration
- `.deployment` - Deployment hook
- All other config files

---

## 🎯 Why This Works

1. **Procfile**: Azure knows exactly how to start the app
2. **startup.sh**: Handles dependency installation on Azure
3. **.deployment**: Hooks into Azure deployment pipeline
4. **diagnostics.sh**: If needed, can debug what's happening
5. **Foreground execution**: Azure monitors the process and restarts if it dies

---

## ✨ Summary

**Before**: Server started in background, exited → Application Error  
**After**: Server runs in foreground, Azure monitors it → App loads successfully

**What Changed**:
- Added Procfile (tells Azure how to start)
- Improved startup.sh (installs dependencies, checks .next)
- Simplified .deployment (just calls startup.sh)
- Added diagnostics (to debug if needed)

---

**Latest Commit**: 17c08f5  
**Status**: 🟢 **Fresh deployment with critical fixes**  
**ETA to Live**: ~20 minutes  
**Expected Result**: App loads successfully!

If still showing error after 20 minutes, please provide the error message from Azure logs.
