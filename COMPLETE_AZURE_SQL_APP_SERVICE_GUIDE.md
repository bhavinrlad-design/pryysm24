# 🌐 COMPLETE AZURE SQL & APP SERVICE GUIDE FOR PRYYSM

**Status**: ✅ Complete Guide  
**Last Updated**: December 2024  
**Framework**: Next.js 14.2.33 with Prisma 6.18.0  
**Database**: Azure SQL Server  
**Hosting**: Azure App Service

---

## 📑 TABLE OF CONTENTS

1. [Azure SQL Database Setup](#azure-sql-database-setup)
2. [Connection Strings](#connection-strings)
3. [Firewall Configuration](#firewall-configuration)
4. [Azure App Service Setup](#azure-app-service-setup)
5. [Environment Variables](#environment-variables)
6. [GitHub Secrets Configuration](#github-secrets-configuration)
7. [Continuous Deployment](#continuous-deployment)
8. [Monitoring & Logging](#monitoring--logging)
9. [Troubleshooting](#troubleshooting)

---

## 🗄️ AZURE SQL DATABASE SETUP

### **1. Understanding Your Current Setup**

**Your Database**:
- Server: `pryysm.database.windows.net`
- Database: `pryysm`
- Region: Typically same as App Service
- Provider: SQL Server

**Current Connection String**:
```
Server=pryysm.database.windows.net;
Database=pryysm;
User Id=bhavin;
Password=Lad@1234;
Encrypt=true;
TrustServerCertificate=false;
Connection Timeout=30;
```

---

### **2. Best Practices for Azure SQL**

| Practice | Your Setup | Status |
|----------|-----------|--------|
| **Encryption** | Enabled (Encrypt=true) | ✅ CORRECT |
| **Certificate Validation** | Enforced (TrustServerCertificate=false) | ✅ SECURE |
| **Connection Timeout** | 30 seconds | ⚠️ Consider 60s |
| **Connection Pooling** | Prisma v6 managed | ✅ OPTIMAL |
| **Firewall Rules** | Must allow App Service | ⚠️ NEEDS VERIFICATION |
| **Regular Backups** | Daily automatic | ✅ INCLUDED |
| **Monitoring** | Available in portal | ⚠️ OPTIONAL |

---

### **3. Azure SQL Performance Tiers**

**Current Tier** (Likely):
- Service Tier: Standard or General Purpose
- Compute Size: 2 vCores (typical for dev/test)
- Storage: Up to 250 GB

**Performance Characteristics**:
- DTU-based: ✅ Predictable pricing
- vCore-based: ✅ Better performance (if used)
- Serverless: ⚠️ Auto-pauses after 1 hour (may cause login issues)

---

### **4. Database Maintenance**

#### **Automatic Backups**
- ✅ Daily automatic backups
- ✅ 7-day retention
- ✅ Point-in-time restore available
- ✅ Geo-redundant backups

#### **Monitoring Health**
```bash
# Via Azure CLI
az sql server show --resource-group pryysm-rg --name pryysm

# Check status
az sql server show --resource-group pryysm-rg --name pryysm --query "state"
# Should return: "Ready"
```

#### **Check Database Size**
```bash
# Via Azure CLI
az sql db list-editions --location eastus --query "[].name"

# Check current usage
az sql db show-connection-string --client sqlcmd \
  --server pryysm.database.windows.net \
  --name pryysm
```

---

## 🔐 CONNECTION STRINGS

### **1. Prisma Connection String Format** (Recommended)

```
sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30
```

**Breakdown**:
- `sqlserver://` - Protocol
- `pryysm.database.windows.net:1433` - Server + port (1433 is default)
- `database=pryysm` - Database name
- `user=bhavin` - Username
- `password=Lad@1234` - Password
- `encrypt=true` - Enable encryption (REQUIRED for Azure)
- `trustServerCertificate=false` - Validate SSL cert (REQUIRED for Azure)
- `connectionTimeout=30` - Timeout in seconds

### **2. Alternative Connection String Formats**

#### **ADO.NET Format** (For .NET apps)
```
Server=pryysm.database.windows.net,1433;Initial Catalog=pryysm;Persist Security Info=False;User ID=bhavin;Password=Lad@1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

#### **ODBC Format** (For ODBC drivers)
```
Driver={ODBC Driver 17 for SQL Server};Server=pryysm.database.windows.net;Database=pryysm;UID=bhavin;PWD=Lad@1234;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;
```

#### **Node.js mssql Package**
```javascript
const config = {
    server: 'pryysm.database.windows.net',
    port: 1433,
    database: 'pryysm',
    user: 'bhavin',
    password: 'Lad@1234',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true,
        trustServerCertificate: false,
        connectionTimeout: 30000  // milliseconds
    }
};
```

---

### **3. Connection String for Your Setup**

**In `.env` file**:
```bash
DATABASE_URL="sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30"
```

**In GitHub Secrets** (for production):
```
Name: DATABASE_URL
Value: sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30
```

**In App Service Configuration**:
```
App Service > Configuration > Application Settings
Add: DATABASE_URL = sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30
```

---

## 🔥 FIREWALL CONFIGURATION

### **1. Azure SQL Firewall Rules**

**Location**: Azure Portal → SQL servers → pryysm → Firewall and virtual networks

#### **Rule 1: Allow All Azure Services** ✅ REQUIRED
- Enable: "Allow Azure services and resources to access this server"
- This allows App Service to connect

```bash
# Via Azure CLI
az sql server firewall-rule create \
  --resource-group pryysm-rg \
  --server pryysm \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

#### **Rule 2: Allow App Service IP** ✅ RECOMMENDED
- Find App Service public IP
- Add firewall rule for that specific IP

```bash
# Get App Service IP
az webapp show --resource-group pryysm-rg --name pryysm-v2 --query "outboundIpAddresses"

# Add firewall rule
az sql server firewall-rule create \
  --resource-group pryysm-rg \
  --server pryysm \
  --name AllowAppService \
  --start-ip-address 20.x.x.x \
  --end-ip-address 20.x.x.x
```

#### **Rule 3: Allow Local Development** ⚠️ OPTIONAL
- Your local IP for testing
- Find your IP: whatismyipaddress.com

```bash
# Get your IP
$myip = (Invoke-WebRequest -Uri "https://ifconfig.me").Content.Trim()
Write-Host "Your IP: $myip"

# Add firewall rule
az sql server firewall-rule create \
  --resource-group pryysm-rg \
  --server pryysm \
  --name AllowLocalDev \
  --start-ip-address $myip \
  --end-ip-address $myip
```

### **2. Verify Firewall Configuration**

```bash
# List all firewall rules
az sql server firewall-rule list \
  --resource-group pryysm-rg \
  --server pryysm \
  --output table
```

**Expected Output**:
| Name | StartIpAddress | EndIpAddress | Status |
|------|---|---|---|
| AllowAzureServices | 0.0.0.0 | 0.0.0.0 | ✅ |
| AllowAppService | 20.x.x.x | 20.x.x.x | ✅ |

### **3. Common Firewall Issues**

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot connect to server` | Firewall blocking | Add rule for App Service IP |
| `Timeout after 30s` | Rule not configured | Enable "Allow Azure services" |
| `Login failed for user` | Wrong credentials + firewall | Check both password AND firewall |
| `SSL connection error` | Certificate validation | Ensure TrustServerCertificate=false |

---

## 🚀 AZURE APP SERVICE SETUP

### **1. App Service Configuration**

**Your App Service**:
- Name: `pryysm-v2`
- Runtime: Node.js 18 LTS (or latest)
- OS: Windows
- Pricing: Standard tier (recommended)

### **2. Application Settings**

**Location**: Azure Portal → App Service → Configuration → Application Settings

**Required Settings**:
```
DATABASE_URL = sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30

NODE_ENV = production

NEXT_PUBLIC_DISABLE_AI = true
```

### **3. Runtime Settings**

**Node.js Version**:
- Current: 18 LTS (good for Next.js 14)
- Latest: 22 LTS (also compatible)
- Recommended: 20.9+ (for Next.js 16 future upgrade)

**Set Node Version**:
```bash
# Via Azure CLI
az webapp config appsettings set \
  --resource-group pryysm-rg \
  --name pryysm-v2 \
  --settings WEBSITE_NODE_DEFAULT_VERSION=18.17.1
```

**Verify Settings**:
```bash
az webapp config appsettings list \
  --resource-group pryysm-rg \
  --name pryysm-v2 \
  --output table
```

### **4. App Service Plans**

| Tier | CPU | Memory | Price | Recommendation |
|------|-----|--------|-------|-----------------|
| Free | Shared | 1 GB | $0 | ❌ Testing only |
| Shared | Shared | 1 GB | $9 | ❌ Limited |
| Basic | 1 | 1.75 GB | $50-75 | ⚠️ Small projects |
| Standard | 2 | 3.5 GB | $100-300 | ✅ YOUR TIER |
| Premium | 4+ | 7+ GB | $300+ | ✅ Production |

**Your Tier**: Standard (good balance of performance and cost)

---

## 🔧 ENVIRONMENT VARIABLES

### **1. Local Development Setup**

**File**: `.env.local`

```bash
# Local development with SQLite
DATABASE_URL="file:../dev.db"
NODE_ENV=development
NEXT_PUBLIC_DISABLE_AI=true

# For testing with Azure SQL locally
# DATABASE_URL="sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30"
```

### **2. Production Setup**

**File**: `.env.production` (or GitHub Secrets)

```bash
# Will be set from GitHub Secrets at deployment time
DATABASE_URL=${{ secrets.DATABASE_URL }}
NODE_ENV=production
NEXT_PUBLIC_DISABLE_AI=true
```

### **3. Setting Environment Variables for Testing**

**PowerShell** (Windows):
```powershell
# Set variable
$env:DATABASE_URL = "sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30"
$env:NODE_ENV = "production"

# Verify
Write-Host $env:DATABASE_URL

# Run app
npm run dev
```

**Bash** (macOS/Linux):
```bash
# Set variable
export DATABASE_URL="sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30"
export NODE_ENV="production"

# Verify
echo $DATABASE_URL

# Run app
npm run dev
```

---

## 🔑 GITHUB SECRETS CONFIGURATION

### **1. Add DATABASE_URL Secret**

**Steps**:
1. Go to GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Fill in:
   - **Name**: `DATABASE_URL`
   - **Value**: `sqlserver://pryysm.database.windows.net:1433;database=pryysm;user=bhavin;password=Lad@1234;encrypt=true;trustServerCertificate=false;connectionTimeout=30`
5. Click "Add secret"

### **2. Secrets Used in Workflows**

**In GitHub Actions Workflow** (`.github/workflows/main_pryysm-v2.yml`):

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  NODE_ENV: production
  NEXT_PUBLIC_DISABLE_AI: true
```

### **3. Verify Secrets Are Set**

```bash
# List (masked) secrets
gh secret list --repo <username>/pryysm-v2

# Update secret
gh secret set DATABASE_URL --body "your-new-value" --repo <username>/pryysm-v2

# Delete secret (if needed)
gh secret delete DATABASE_URL --repo <username>/pryysm-v2
```

### **4. Common Secrets Issues**

| Issue | Cause | Solution |
|-------|-------|----------|
| Build fails with "Database unavailable" | DATABASE_URL secret not set | Add it in GitHub Settings |
| Login fails in production | DATABASE_URL different from local | Verify value matches `.env` |
| Cannot decrypt secrets | Wrong GitHub token | Re-authenticate with `gh auth login` |

---

## 📦 CONTINUOUS DEPLOYMENT

### **1. GitHub Actions Workflow**

**File**: `.github/workflows/main_pryysm-v2.yml`

**Build & Deploy Steps**:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  NODE_ENV: production

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # 1. Checkout code
      - uses: actions/checkout@v3

      # 2. Setup Node.js
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # 3. Install dependencies
      - name: Install Dependencies
        run: npm ci

      # 4. Build app (uses DATABASE_URL from secrets)
      - name: Build
        run: npm run build

      # 5. Deploy to Azure
      - name: Deploy to Azure App Service
        uses: azure/webapps-deploy@v2
        with:
          app-name: pryysm-v2
          publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
          package: .
```

### **2. Deployment Process**

```
1. Push to GitHub
   ↓
2. GitHub Actions triggered
   ↓
3. Environment: DATABASE_URL from secrets
   ↓
4. npm ci (clean install)
   ↓
5. npm run build (compiles app)
   ↓
6. Test build (optional)
   ↓
7. Deploy to Azure App Service
   ↓
8. App restarted with new code
   ↓
9. Login/signup should work!
```

### **3. Monitor Deployment**

**In GitHub**:
```
Repository → Actions → Latest workflow run
- Green ✅ = Success
- Red ❌ = Failed
```

**In Azure Portal**:
```
App Service → Deployment Center → Deployment History
- Shows all deployments
- Latest should be "Active"
```

---

## 📊 MONITORING & LOGGING

### **1. View App Service Logs**

**Via Azure Portal**:
1. App Service → Log stream
2. Shows real-time logs from running app

**Via Azure CLI**:
```bash
# Get recent logs
az webapp log tail --resource-group pryysm-rg --name pryysm-v2

# Download logs
az webapp log download --resource-group pryysm-rg --name pryysm-v2
```

### **2. View Application Insights** (Optional)

If Application Insights is connected:
```bash
# Check if connected
az webapp config show \
  --resource-group pryysm-rg \
  --name pryysm-v2 \
  --query "appInsightsConfig"

# View metrics
az monitor metrics list-definitions \
  --resource /subscriptions/{id}/resourceGroups/pryysm-rg/providers/Microsoft.Web/sites/pryysm-v2
```

### **3. Database Metrics**

**Azure Portal**: SQL Database → Metrics

**Available Metrics**:
- CPU percentage
- Connection success/failures
- Query count
- Disk space usage
- DTU percentage (if DTU-based)

**Check Health**:
```bash
# Database DTU usage
az sql db list-editions \
  --location eastus \
  --query "[?name=='pryysm']"
```

### **4. Custom Logging in App**

**In your Next.js app** (for debugging):

```typescript
// app/api/auth/login/route.ts
console.log(`[${new Date().toISOString()}] Login attempt for: ${email}`);
console.log(`[${new Date().toISOString()}] Database URL check: ${process.env.DATABASE_URL ? '✅ Set' : '❌ Not set'}`);
console.log(`[${new Date().toISOString()}] Authentication result: ${result.success ? '✅ Success' : '❌ Failed'}`);
```

These will appear in:
- Local terminal (when running locally)
- Azure App Service log stream (in production)

---

## 🔍 TROUBLESHOOTING

### **Problem 1: Login fails with "Database connection failed"**

```
Status: 503
Error: Database connection failed
```

**Diagnose**:
```bash
# 1. Check if DATABASE_URL is set
az webapp config appsettings list \
  --resource-group pryysm-rg \
  --name pryysm-v2 \
  --query "[?name=='DATABASE_URL']"

# 2. Check if Azure SQL is online
az sql server show \
  --resource-group pryysm-rg \
  --name pryysm \
  --query "state"
# Should return: "Ready"

# 3. Check firewall
az sql server firewall-rule list \
  --resource-group pryysm-rg \
  --server pryysm

# 4. Test connection locally
npx prisma db push
```

**Fix**:
1. ✅ Add DATABASE_URL to App Service settings
2. ✅ Check Azure SQL status (if paused, resume)
3. ✅ Add firewall rule for App Service
4. ✅ Restart App Service: `az webapp restart --resource-group pryysm-rg --name pryysm-v2`

---

### **Problem 2: Deployment fails**

```
GitHub Actions: Build failed
Error: npm run build exited with status 1
```

**Diagnose**:
```bash
# 1. Check GitHub Actions logs
gh run view <run-id> --repo <username>/pryysm-v2

# 2. Build locally to see error
npm run build

# 3. Check Node version
node --version
# Should be 18.x or higher
```

**Fix**:
1. ✅ Fix TypeScript errors shown in build
2. ✅ Commit and push fixes
3. ✅ GitHub Actions will retry automatically

---

### **Problem 3: Login works locally but not in production**

```
Local (http://localhost:3000): ✅ Login works
Production (Azure): ❌ Login fails
```

**Root Cause Analysis**:
| Possible Cause | Check |
|---|---|
| DATABASE_URL not in App Service | `az webapp config appsettings list ...` |
| Different connection string than local | Compare `.env` and App Service settings |
| Firewall blocking connection | `az sql server firewall-rule list ...` |
| Database unavailable | `az sql server show ... --query state` |
| NODE_ENV not set to production | Check App Service settings |

**Fix**:
```bash
# 1. Verify DATABASE_URL matches
echo "Local:" && cat .env | grep DATABASE_URL
echo "Production:" && az webapp config appsettings list --resource-group pryysm-rg --name pryysm-v2 --query "[?name=='DATABASE_URL'].value" -o tsv

# 2. Restart App Service to pick up new settings
az webapp restart --resource-group pryysm-rg --name pryysm-v2

# 3. Check logs
az webapp log tail --resource-group pryysm-rg --name pryysm-v2
```

---

### **Problem 4: Connection timeout errors**

```
Error: CONNECT_TIMEOUT
Message: Connection timed out after 30 seconds
```

**Root Causes**:
1. ❌ Connection timeout too short
2. ❌ Network latency high
3. ❌ SQL Server slow to respond
4. ❌ Query taking too long

**Fix**:
```bash
# 1. Increase timeout in DATABASE_URL
# From: connectionTimeout=30
# To: connectionTimeout=60

# 2. Update in GitHub Secrets
gh secret set DATABASE_URL --body "sqlserver://...;connectionTimeout=60" --repo <username>/pryysm-v2

# 3. Update in App Service
az webapp config appsettings set \
  --resource-group pryysm-rg \
  --name pryysm-v2 \
  --settings DATABASE_URL="sqlserver://...;connectionTimeout=60"

# 4. Restart App Service
az webapp restart --resource-group pryysm-rg --name pryysm-v2
```

---

### **Problem 5: "User already exists" for new email**

```
Signup endpoint returns:
Error: User already exists
Status: 400
```

**Analysis**:
- This is EXPECTED if email was already registered
- Check if user created previously

**Fix**:
```bash
# 1. Use different email for testing
# 2. Or delete user from database

# Via Prisma Studio (interactive):
npx prisma studio
# Find user, click delete

# Or via SQL query:
npx prisma db execute --stdin
# DELETE FROM [User] WHERE email = 'test@example.com'
```

---

## ✅ DEPLOYMENT CHECKLIST

### **Before Each Deployment**:

- [ ] DATABASE_URL set in GitHub Secrets
- [ ] DATABASE_URL set in App Service Configuration
- [ ] Azure SQL firewall allows App Service
- [ ] Firewall allows Azure services
- [ ] Local `npm run build` completes successfully
- [ ] No TypeScript errors in build
- [ ] Prisma migrations applied (`npx prisma db push`)
- [ ] `.env.local` has correct LOCAL connection string
- [ ] `.env.production` uses GitHub Secrets variable

### **After Deployment**:

- [ ] Check GitHub Actions (green checkmark ✅)
- [ ] Check App Service (status "Running")
- [ ] Check app at https://pryysm-v2.azurewebsites.net
- [ ] Test login endpoint from browser
- [ ] Check App Service logs for errors
- [ ] Monitor for 24 hours

---

## 📚 USEFUL AZURE CLI COMMANDS

```bash
# Get resource group
az group list --query "[?name=='pryysm-rg']"

# Get SQL server info
az sql server show --resource-group pryysm-rg --name pryysm

# Get SQL database info
az sql db show --resource-group pryysm-rg --server pryysm --name pryysm

# Get App Service info
az webapp show --resource-group pryysm-rg --name pryysm-v2

# List all resources
az resource list --resource-group pryysm-rg --output table

# Check deployment status
az webapp deployment show --resource-group pryysm-rg --name pryysm-v2

# View real-time logs
az webapp log tail --resource-group pryysm-rg --name pryysm-v2

# Restart App Service
az webapp restart --resource-group pryysm-rg --name pryysm-v2

# Stop App Service
az webapp stop --resource-group pryysm-rg --name pryysm-v2

# Start App Service
az webapp start --resource-group pryysm-rg --name pryysm-v2
```

---

## 🎓 NEXT STEPS

1. **Verify Current Setup**:
   ```bash
   # Test DATABASE_URL is accessible
   npx prisma db push
   ```

2. **Deploy to Azure**:
   ```bash
   git add .
   git commit -m "Prisma v6 upgrade + Azure documentation"
   git push origin main
   ```

3. **Monitor Deployment**:
   ```bash
   # Watch GitHub Actions
   gh run list --repo <username>/pryysm-v2
   
   # Watch App Service logs
   az webapp log tail --resource-group pryysm-rg --name pryysm-v2
   ```

4. **Test in Production**:
   ```
   Navigate to: https://pryysm-v2.azurewebsites.net
   Try signup and login
   Check logs for errors
   ```

---

## 🆘 QUICK SUPPORT

| Issue | Quick Fix |
|-------|-----------|
| App won't start | `az webapp restart --resource-group pryysm-rg --name pryysm-v2` |
| Can't connect to DB | Verify DATABASE_URL in App Service settings |
| Firewall blocking | `az sql server firewall-rule create ... --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0` |
| Timeout errors | Increase connectionTimeout in DATABASE_URL |
| Deployment failed | Check GitHub Actions logs, fix errors, retry |
| Login failing | Check logs: `az webapp log tail ...` |

---

**Version**: 1.0  
**Status**: ✅ Complete & Ready for Production  
**Last Update**: December 2024  
**Tested With**: 
- Next.js 14.2.33
- Prisma 6.18.0
- Node.js 18 LTS
- Azure SQL Server
- Azure App Service
