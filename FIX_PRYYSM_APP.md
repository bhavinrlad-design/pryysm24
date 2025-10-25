# Fix for pryysm.app - Production Deployment

## Current Status Check

### What We've Done
✅ Database migration added to GitHub Actions workflow  
✅ `.env.production` configured with proper structure  
✅ Secrets are referenced correctly  
✅ Database initialization module created  

### What May Be Missing
❓ GitHub Secrets might not be fully configured  
❓ Azure SQL database might not exist or be accessible  
❓ Deployment hasn't been triggered yet  

---

## Step 1: Verify GitHub Secrets Are Set

GitHub Secrets Required:
1. `DATABASE_URL` - Azure SQL connection string
2. `NEXTAUTH_SECRET` - Session encryption key
3. `NEXTAUTH_URL` - Should be `https://pryysm.app`
4. `AZUREAPPSERVICE_CLIENTID_E4770AE16B2441F5868CA061B4D8D689` - Azure AD
5. `AZUREAPPSERVICE_TENANTID_8D7DB62EBB904F2BB2CE8DA8F0479EB8` - Azure AD
6. `AZUREAPPSERVICE_SUBSCRIPTIONID_DBBEC2F91325438DBB9DAB05E8F0CF0B` - Azure AD

### How to Check Secrets

**On GitHub**:
1. Go to: https://github.com/lad-pryysm/pryysm-v2
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Check if all secrets above are listed

**Expected Secrets Should Show**:
```
DATABASE_URL                                                    (set)
NEXTAUTH_SECRET                                                (set)
NEXTAUTH_URL                                                   (set)
AZUREAPPSERVICE_CLIENTID_...                                   (set)
AZUREAPPSERVICE_TENANTID_...                                   (set)
AZUREAPPSERVICE_SUBSCRIPTIONID_...                             (set)
```

---

## Step 2: Trigger Deployment to Production

### Option A: Push to main branch (Automatic)
```bash
# Make sure you're on new-main
cd d:\Pryysm-v2\pryysm-v2-3dprint

# Merge new-main into main
git checkout main
git pull origin main
git merge new-main
git push origin main

# This will automatically trigger GitHub Actions
```

### Option B: Manual Workflow Trigger
1. Go to: https://github.com/lad-pryysm/pryysm-v2
2. Click **Actions** tab
3. Select "Build and deploy Node.js app to Azure Web App - PRYYSM-V2"
4. Click **Run workflow**
5. Select branch: `main`
6. Click **Run workflow** again

### What Should Happen
1. GitHub Actions starts building
2. `npm install` runs
3. `npm run build` runs (compiles Next.js)
4. **`npx prisma db push`** runs ← This creates database tables!
5. Build artifact created
6. Deployment to Azure App Service
7. App starts and initializes database

---

## Step 3: Monitor the Deployment

### Watch GitHub Actions
1. Go to: https://github.com/lad-pryysm/pryysm-v2/actions
2. Look for latest workflow run
3. Check these steps:
   - ✅ "npm install, build, and test" - Should show successful Next.js build
   - ✅ "Run Prisma migrations" - Should show `Datasource "db": SQL Server database "pryysm"`
   - ✅ "Deploy to Azure Web App" - Should show successful deployment

### Expected Output from Migration Step
```
Datasource "db": SQL Server database "pryysm" at "..."
Already in sync, no schema change or datasource change detected.
Done in 2s

# OR if first time:

Datasource "db": SQL Server database "pryysm" at "..."
The following migration(s) have been created and applied:
  ✔ migrations/[timestamp]_initial
Done in 5s
```

### Check Azure Logs
```bash
# Real-time logs from production
az webapp log tail --name PRYYSM-V2 --resource-group [YOUR-RG]

# Should show:
# - Database connection success
# - Tables created/verified
# - Server ready on port 8080
```

---

## Step 4: Verify Production is Working

### Test 1: Check if Site is Up
```bash
# Should return 200
curl -I https://pryysm.app

# Expected response:
# HTTP/2 200
```

### Test 2: Check Login Page
- Visit: https://pryysm.app/login
- Should load without errors
- Should see login form

### Test 3: Test Demo Login
1. Go to https://pryysm.app/login
2. Email: `demo@prysm.com`
3. Password: `demo123`
4. Should login successfully
5. Should redirect to dashboard
6. Should see blank slate (if demo user marked as new) or normal dashboard

### Test 4: Test Signup
1. Go to https://pryysm.app/signup
2. Fill in form with test data
3. Create account
4. Should see blank slate welcome screen ✨
5. Check that you can dismiss it
6. Verify it doesn't reappear on refresh

---

## Step 5: Troubleshoot If Not Working

### Issue: Login page 404 or won't load
**Check**: 
1. GitHub Actions workflow completed successfully
2. App Service logs: `az webapp log tail --name PRYYSM-V2 --resource-group pryysm-rg`
3. Look for TypeScript/compilation errors

### Issue: "Invalid email or password" even with demo account
**Check**:
1. Database tables exist: Run SQL query in Azure Portal
   ```sql
   SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
   WHERE TABLE_SCHEMA = 'dbo' 
   ORDER BY TABLE_NAME;
   ```
   Should show: Account, Material, Printer, PrintJob, Session, User

2. Demo users exist:
   ```sql
   SELECT email, role FROM [User];
   ```
   Should show: demo@prysm.com, admin@prysm.com, LAD@admin.com

**If tables missing**: 
- Migration didn't run
- Check GitHub Actions logs for errors
- Manually run: See "Step 6: Manual Fix" below

### Issue: Database connection timeout
**Check**:
1. Azure SQL firewall allows Azure Services: 
   ```
   Azure Portal → SQL servers → [YOUR-SERVER] → Firewall rules
   "Allow Azure services and resources to access this server" = ON
   ```

2. DATABASE_URL secret is correct:
   ```
   Format: sqlserver://SERVER:1433;database=DBNAME;user=USER;password=PASS;...
   ```

### Issue: Blank slate not showing for new users
**Check**:
1. `localStorage.setItem('new_signup', 'true')` is called in signup
2. Check browser DevTools → Application → LocalStorage
3. After signup, should see `new_signup = true`
4. Dashboard should check this and show welcome

---

## Step 6: Manual Fix If Needed

### If Deployment Stuck, Do This:

#### Option 1: Force Redeployment
```bash
cd d:\Pryysm-v2\pryysm-v2-3dprint

# Clean and commit a small change to trigger deployment
echo "# Deployment trigger" >> DEPLOYMENT_TRIGGER.txt
git add DEPLOYMENT_TRIGGER.txt
git commit -m "Trigger production deployment"
git push origin main
```

#### Option 2: Manually Run Migration on Production
```bash
# SSH into the app
az webapp create-remote-connection --name PRYYSM-V2 --resource-group pryysm-rg

# Then run:
cd /home/site/wwwroot
npx prisma db push --skip-generate --force-reset
```

#### Option 3: Reseed Database
```bash
# In the remote connection:
npx prisma db execute --stdin <<EOF
DELETE FROM [PrintJob];
DELETE FROM [Session];
DELETE FROM [Account];
DELETE FROM [Material];
DELETE FROM [Printer];
DELETE FROM [User];
EOF

# Then seed:
npm run db:seed
```

---

## Step 7: Production Checklist

Before considering production "fixed", verify:

- [ ] GitHub Actions workflow runs without errors
- [ ] "Run Prisma migrations" step succeeds
- [ ] Deployment to Azure succeeds
- [ ] App Service shows status "Running"
- [ ] Login page loads at https://pryysm.app/login
- [ ] Can login with demo@prysm.com / demo123
- [ ] Can access dashboard after login
- [ ] Can visit signup page at https://pryysm.app/signup
- [ ] Can create new account
- [ ] Blank slate welcome shows for new accounts
- [ ] Can dismiss blank slate
- [ ] Dashboard loads without errors

---

## Quick Summary

### To Fix pryysm.app:

1. **Ensure GitHub Secrets are set** (most likely issue)
2. **Push to main branch** to trigger deployment
3. **Wait for GitHub Actions** to complete (5-10 minutes)
4. **Test login** at https://pryysm.app/login
5. **Monitor logs** if issues: `az webapp log tail --name PRYYSM-V2 --resource-group pryysm-rg`

### Key Files Deployed:
- ✅ `.github/workflows/main_pryysm-v2.yml` - With migration step
- ✅ `lib/db-init.js` - Database initialization
- ✅ `server-sync.js` - Server startup
- ✅ `src/components/dashboard/dashboard-client.tsx` - Blank slate

### What Gets Created on Azure SQL:
- 6 database tables (User, Account, Session, Printer, Material, PrintJob)
- Demo users (automatically seeded during deployment)
- Full schema for app to work

---

## Contact Points

If issues persist, check:
1. Azure Portal → App Services → PRYYSM-V2 → Logs
2. Azure Portal → SQL databases → pryysm → Query editor
3. GitHub → Actions → Latest run
4. Environment variables on App Service settings

