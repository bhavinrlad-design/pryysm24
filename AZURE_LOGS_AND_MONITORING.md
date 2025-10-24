# Azure Site - Where to See Login Activity & Logs

## 1. Azure Portal - App Service Logs

### Location
```
Azure Portal 
  → App Services 
    → PRYYSM-V2 (your app name)
      → Diagnose and solve problems
```

Or direct path:
```
https://portal.azure.com/#resource/subscriptions/{YOUR-SUB-ID}/resourceGroups/{YOUR-RG}/providers/Microsoft.Web/sites/PRYYSM-V2
```

### Steps to View Logs

**A. Real-time Log Stream**
1. Go to your App Service (PRYYSM-V2)
2. Left sidebar → **Log stream** (under Monitoring)
3. You'll see real-time logs of:
   - Login attempts
   - Signup requests
   - Database errors
   - API calls

**B. Application Logs**
1. Go to your App Service
2. Left sidebar → **App Service logs** (under Monitoring)
3. Click "Save" to enable logging
4. Set:
   - Application logging: **On** (File System or Application Insights)
   - Level: **Verbose** or **Information**
5. Click Save

**C. Download Log Files**
1. Go to your App Service
2. Left sidebar → **Advanced tools** (under Development Tools)
3. Click "Go" to open Kudu console
4. Navigate to `LogFiles` folder
5. Download `eventlog.xml` or `http` folder logs

## 2. Live Log Stream (Real-time)

### Using Azure CLI
```bash
# Install Azure CLI if you haven't
az login
az webapp log tail --name PRYYSM-V2 --resource-group YOUR-RESOURCE-GROUP

# Example with our setup
az webapp log tail --name PRYYSM-V2 --resource-group pryysm-rg
```

This shows live logs as they happen:
```
2025-10-24 14:23:45 Login attempt: user@example.com
2025-10-24 14:23:46 Database query: SELECT * FROM User WHERE email='user@example.com'
2025-10-24 14:23:47 Password verification: SUCCESS
2025-10-24 14:23:48 Login: SUCCESS - Session created
```

## 3. Application Insights (Recommended)

### Setup
1. Go to your App Service
2. Left sidebar → **Application Insights** (under Monitoring)
3. Click "Turn on Application Insights"
4. Create new or select existing instance
5. Click "Apply"

### View Login Data
Once enabled, go to Application Insights → Logs (under Monitoring):

**Query: Recent Login Attempts**
```kusto
traces 
| where message contains "Login" or message contains "signup"
| project timestamp, message, severityLevel
| order by timestamp desc 
| limit 100
```

**Query: Failed Logins**
```kusto
traces 
| where message contains "invalid" or message contains "failed" or message contains "error"
| project timestamp, message, customDimensions
| order by timestamp desc 
| limit 50
```

**Query: Database Errors**
```kusto
exceptions
| where type contains "PrismaClientKnownRequestError"
| project timestamp, outerMessage, details
| order by timestamp desc
```

## 4. Database Connection Issues (Azure SQL)

### Check Azure SQL Firewall
```
Azure Portal
  → SQL databases
    → pryysm (your database)
      → Networking (or Server name link)
        → Firewall rules
```

Make sure:
- ✅ "Allow Azure services and resources to access this server" = **ON**
- ✅ Your App Service IP is whitelisted

### Query Database Connection Logs
```
Azure Portal
  → SQL servers
    → YOUR-SERVER-NAME
      → Auditing
        → View audit logs
```

## 5. GitHub Actions Deployment Logs

To see if database migration ran:

```
GitHub Repository
  → Actions
    → Latest workflow run (Build and deploy Node.js app...)
      → build job
        → "Run Prisma migrations" step
```

Should show:
```
Datasource "db": SQL Server database "pryysm" at "..."
Already in sync, no schema change or datasource change detected.
Done in 2s
```

## 6. Check if Database Tables Exist

### Using Azure Portal Query Editor
```
Azure Portal
  → SQL databases
    → pryysm
      → Query editor
```

Run this SQL:
```sql
-- Check if User table exists
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'dbo'
ORDER BY TABLE_NAME;

-- Should show:
-- Account
-- Material
-- Printer
-- PrintJob
-- Session
-- User
```

If tables are missing, the GitHub Actions migration didn't run. Check:
1. GitHub Actions logs for errors
2. DATABASE_URL secret is correct
3. Azure SQL firewall allows GitHub Actions IPs

## 7. Common Issues & Where to Check

| Issue | Where to Check |
|-------|----------------|
| "Invalid email or password" on login | App Service Logs, then SQL query in Query Editor |
| Database connection timeout | Azure SQL Firewall rules, Networking settings |
| Migration didn't run | GitHub Actions logs, workflow "Run Prisma migrations" step |
| Empty User table | Query Editor → `SELECT * FROM [User]` |
| Login endpoint 500 error | Application Insights Exceptions, Real-time log stream |
| Signup creates user but can't login | Query Editor → check User table has email/password |

## 8. Example: Troubleshooting Login Failure

**Step 1: Check Real-time Logs**
```bash
az webapp log tail --name PRYYSM-V2 --resource-group pryysm-rg
# Look for error messages
```

**Step 2: Check Application Insights**
- Go to Application Insights
- Click "Failures" under Investigating
- Look for login endpoint errors

**Step 3: Query Database**
```sql
-- Check if user exists
SELECT email, role, createdAt FROM [User] 
WHERE email = 'demo@prysm.com';

-- If empty, tables weren't created
SELECT COUNT(*) FROM [User];
-- Should show: 3 (demo users)
```

**Step 4: Check GitHub Actions**
- Go to GitHub Actions
- Check last deployment
- Look for "Run Prisma migrations" output
- If it says "tables don't exist", migration failed

**Step 5: Manually Run Migration**
If migration failed, you can run it manually:
```bash
# SSH into app
az webapp create-remote-connection --name PRYYSM-V2 --resource-group pryysm-rg

# Then run
npx prisma db push --skip-generate
```

## 9. Enable Detailed Logging

### In your app code (optional enhancement)
Update `lib/db-init.js` to add more logging:

```javascript
async function initializeDatabase() {
  console.log(`[${now()}] Initializing database...`);
  console.log(`[${now()}] DATABASE_URL: ${process.env.DATABASE_URL ? 'SET' : 'NOT SET'}`);
  
  try {
    const prisma = new PrismaClient({
      log: ['error', 'warn', 'info', 'query'], // Add 'query' to see all SQL
    });
    
    // This will show in App Service logs
    console.log(`[${now()}] Connecting to database...`);
    await prisma.$queryRaw`SELECT 1`;
    console.log(`[${now()}] ✓ Connection successful`);
```

## 10. Quick Access Links

| Resource | URL Pattern |
|----------|------------|
| App Service | `https://portal.azure.com/#resource/subscriptions/.../Microsoft.Web/sites/PRYYSM-V2` |
| Log Stream | `Azure Portal → PRYYSM-V2 → Log stream` |
| Application Insights | `https://portal.azure.com/#resource/subscriptions/.../Microsoft.Insights/components/...` |
| Kudu Console | `https://PRYYSM-V2.scm.azurewebsites.net/DebugConsole` |
| Direct App | `https://pryysm.app` or `https://PRYYSM-V2.azurewebsites.net` |

## Summary

**To see login activity:**
1. **Real-time** → Log stream or `az webapp log tail`
2. **Recent errors** → Application Insights
3. **Database issues** → Azure SQL Query Editor
4. **Deployment issues** → GitHub Actions logs
5. **Live app issues** → Kudu console LogFiles

All login attempts, errors, and database queries will appear in these locations once you enable logging!
