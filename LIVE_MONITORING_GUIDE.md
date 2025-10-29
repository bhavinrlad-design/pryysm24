# 📊 LIVE MONITORING GUIDE

## 🔍 CHECK BUILD STATUS

### GitHub Actions
**Link**: https://github.com/lad-pryysm/pryysm-v2/actions

**What to Look For**:
- Find the latest run for "Build and deploy Node.js app to Azure Web App - PRYYSM-V2"
- Commits that triggered this build:
  - c224afe (docs: final deployment status verification) - Current
  - f698d69 (docs: explain the actual fix)
  - c64a524 (CRITICAL: Remove Prisma migrations from build) - Key fix

**Expected Stages**:
1. ✅ `build` job
   - Checkout code
   - Setup Node.js 22.x
   - npm install
   - npm run build
   - npm run test
   - Upload artifact

2. ✅ `deploy` job (runs after build succeeds)
   - Download artifact
   - Login to Azure
   - Deploy to Azure Web App

**Success Indicators**:
- All steps show ✅ green checkmarks
- No red ❌ X marks
- Both jobs complete
- Total runtime: ~3-5 minutes

---

## 🟢 CHECK AZURE DEPLOYMENT

### Azure App Service
**Link**: https://portal.azure.com → App Services → PRYYSM-V2

**What to Look For**:

**Status**:
```
✅ Running      (green light)
❌ Stopped      (red light - problem)
⚠️  Restarting  (yellow - in progress)
```

**Deployment Center** (left sidebar):
- Latest deployment status
- Commit hash that was deployed
- Timestamp

**Log Stream** (left sidebar):
```
Expected output when app starts:
✅ Server running at http://0.0.0.0:8080
```

**Errors to Watch For**:
```
❌ "Application Error"           → Startup failed
❌ "Cannot find next"            → Module loading failed
❌ "DATABASE_URL" undefined      → Env var missing
❌ "Prisma error"                → Database connection failed
❌ "TimeoutError"                → Azure service loading
```

---

## 🌐 VERIFY APPLICATION

### Home Page
**URL**: https://pryysm.app

**Expected**:
- Page loads immediately (no "Application Error")
- Layout displays correctly
- No console errors

**Verification Steps**:
1. Visit https://pryysm.app
2. Press F12 (Developer Tools → Console)
3. Check for red errors
4. Look for: `✅ Server running at http://0.0.0.0:8080` in Azure logs

---

## 🔐 LOGIN TEST

### Test Login
**URL**: https://pryysm.app/login

**Expected**:
- Login page loads
- Email input field visible
- Password input field visible
- "Sign in" button visible
- No "Application Error"

**Test Credentials** (if available):
```
Email:    [Your test user email]
Password: [Your test user password]
```

---

## 📊 TIMELINE

```
Stage 1: Build (5-10 min after push)
├─ npm install
├─ npm run build
├─ npm run test
└─ ✅ Build succeeds (all 31 pages compiled)

Stage 2: Deploy (1-2 min after build)
├─ Download artifact
├─ Login to Azure
└─ ✅ Deploy to PRYYSM-V2 service

Stage 3: Start (1-2 min after deploy)
├─ Azure App Service pulls new code
├─ Node.js starts index.js
├─ Prisma client initializes
└─ ✅ Server listens on :8080

Stage 4: Ready (at T+15 min)
└─ ✅ LIVE at https://pryysm.app
```

---

## 🆘 TROUBLESHOOTING

### If Build Fails
**Check**:
1. GitHub Actions → Latest run → View logs
2. Look for Prisma errors (should NOT appear now)
3. Look for npm errors
4. Check that workflow file has Prisma migration step removed

### If Deployment Fails
**Check**:
1. Azure App Service → Deployment Center
2. Check error message
3. Verify AZURE_CREDENTIALS secret is valid

### If App Doesn't Start
**Check**:
1. Azure logs → Log stream
2. Look for "Cannot find module" errors
3. Look for "DATABASE_URL" errors
4. Restart app service manually (Restart button in overview)

### If App Loads But Shows Error
**Check**:
1. Browser console (F12 → Console tab)
2. Azure logs (App Service → Log stream)
3. Database connectivity (test connection string manually)
4. Environment variables (verify all 4 are set in Azure)

---

## ✅ SUCCESS MARKERS

**Build Complete**:
- ✅ GitHub Actions shows all green
- ✅ Last step: "Deploy to Azure Web App" successful

**Deployment Complete**:
- ✅ Azure status: "Running" (green)
- ✅ Deployment Center shows latest commit
- ✅ App Service logs show server started

**Application Working**:
- ✅ https://pryysm.app loads home page
- ✅ No "Application Error" message
- ✅ Login page accessible
- ✅ Database queries working

---

## 🎯 FINAL STATUS

**When Everything is Green**:
```
GitHub Actions:  ✅ All steps passed
Azure Status:    ✅ Running
Home Page:       ✅ Loads correctly
Login Page:      ✅ Accessible
Database:        ✅ Connected
```

**Then**: 🎉 **PRYYSM V2 IS LIVE AT https://pryysm.app**

---

*Last Updated*: After commit c224afe
*Monitoring Purpose*: Track real-time deployment progress
*Expected Completion*: Within 15 minutes of this document being created
