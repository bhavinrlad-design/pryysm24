# 🚀 Production Fix Action Plan - pryysm.app

## Current Situation
- ✅ Local: Everything works (signup, login, blank slate)
- ❌ Production (pryysm.app): Not working
- ✅ Code: All fixes already committed
- ⏳ Deployment: Ready to trigger

---

## What's Already Fixed in Code

### 1. Database Migration ✅
- Added to GitHub Actions workflow
- Runs automatically on deployment
- Creates all tables on Azure SQL

### 2. Database Initialization ✅
- `lib/db-init.js` - Tests connection on startup
- `server-sync.js` - Calls init before server loads
- Graceful error handling if DB unavailable

### 3. Blank Slate Welcome ✅
- `src/components/dashboard/dashboard-client.tsx`
- Shows for new users on first visit
- Provides guided onboarding steps
- One-time dismissible welcome

### 4. Production Config ✅
- `.env.production` - Configured correctly
- `next.config.js` - Proper setup
- GitHub Actions workflow - Complete

---

## 🎯 Action Items to Fix pryysm.app

### CRITICAL: Step 1 - Check GitHub Secrets
```
Go to: https://github.com/lad-pryysm/pryysm-v2
Settings → Secrets and variables → Actions

MUST HAVE these secrets:
✓ DATABASE_URL          (Azure SQL connection string)
✓ NEXTAUTH_SECRET       (Session key)
✓ NEXTAUTH_URL          (https://pryysm.app)
✓ AZUREAPPSERVICE_CLIENTID_*
✓ AZUREAPPSERVICE_TENANTID_*
✓ AZUREAPPSERVICE_SUBSCRIPTIONID_*
```

**If any missing**: Ask to get from Azure/team and add them

---

### URGENT: Step 2 - Trigger Deployment

**Option A: Push to main branch**
```bash
cd d:\Pryysm-v2\pryysm-v2-3dprint
git checkout main
git pull origin main
git merge new-main
git push origin main
```

**Option B: Manual trigger**
1. Go to GitHub → Actions
2. Select "Build and deploy Node.js app..."
3. Click "Run workflow" → Select `main` → Run

---

### VERIFY: Step 3 - Monitor Deployment

**Check GitHub Actions**:
```
GitHub → Actions → Latest run

Look for ✅ in these steps:
✅ npm install, build, and test (3-5 min)
✅ Run Prisma migrations       (1-2 min)
✅ Deploy to Azure Web App     (2-3 min)
```

**Check Azure Logs** (while workflow runs):
```bash
az webapp log tail --name PRYYSM-V2 --resource-group pryysm-rg
```

---

### TEST: Step 4 - Verify It Works

#### Test Login
```
1. Visit: https://pryysm.app/login
2. Email: demo@prysm.com
3. Password: demo123
4. Should see dashboard ✅
```

#### Test Signup (NEW)
```
1. Visit: https://pryysm.app/signup
2. Fill form (any email, min 8 char password)
3. Submit
4. Should see BLANK SLATE WELCOME ✨
5. Click "Add Printers" → goes to /inventory
6. Click X → dismisses welcome
7. Refresh page → welcome gone ✅
```

---

## 📊 Expected Results

### After Successful Deployment:

**On Azure SQL**:
- ✅ Database "pryysm" exists
- ✅ 6 tables created (User, Account, Session, Printer, Material, PrintJob)
- ✅ 3 demo users exist

**On pryysm.app**:
- ✅ Login works with demo credentials
- ✅ Signup creates new accounts
- ✅ New users see blank slate welcome
- ✅ Dashboard loads without errors

---

## 🔧 If Problems Occur

### "Couldn't find app or pages directory"
```
→ Check GitHub Actions log
→ Verify npm install passed
→ May need to rebuild .next cache
```

### "Invalid email or password"
```
→ Check database tables exist:
   Azure Portal → pryysm → Query Editor
   SELECT COUNT(*) FROM [User];
→ Should show at least 3 (demo users)
→ If 0: Migration didn't run, check workflow logs
```

### "Database connection timeout"
```
→ Check Azure SQL firewall:
   "Allow Azure services" = ON
→ Verify DATABASE_URL secret is correct
→ Test connection: az sql db show ...
```

### "Page 404 or Not Found"
```
→ Check deployment completed: App Service → Status
→ Check logs: az webapp log tail --name PRYYSM-V2
→ Restart app: az webapp restart --name PRYYSM-V2
```

---

## ✅ Deployment Checklist

- [ ] GitHub Secrets are all set
- [ ] Pushed to main branch (or triggered workflow manually)
- [ ] GitHub Actions workflow started
- [ ] "Run Prisma migrations" step completed successfully
- [ ] Deployment step completed successfully
- [ ] App Service shows "Running" status
- [ ] https://pryysm.app loads without error
- [ ] Login works with demo@prysm.com
- [ ] Signup works and shows blank slate
- [ ] Blank slate can be dismissed
- [ ] Dashboard loads after login

---

## 📞 Key Resources

- **GitHub Workflow**: https://github.com/lad-pryysm/pryysm-v2/actions
- **Azure Portal**: https://portal.azure.com
- **Production Site**: https://pryysm.app
- **Guide**: See `FIX_PRYYSM_APP.md` in repo

---

## 🎯 Summary

**To fix pryysm.app:**

1. **Verify GitHub Secrets** (most likely issue)
2. **Push to main** to trigger deployment
3. **Wait 10 minutes** for deployment
4. **Test at pryysm.app/login** with demo@prysm.com / demo123
5. **Test signup** to see blank slate welcome
6. **Check logs** if anything fails

**All code is ready. Just need to deploy!** 🚀

