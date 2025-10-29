# TOP 5 MOST LIKELY ISSUES (Based on 2 weeks of troubleshooting)

## 1. PORT Issue (Most Common) ⭐⭐⭐
**Error**: `listen EADDRINUSE: address already in use :::8080`  
**Why**: Another process is using port 8080  
**Fix**: Azure App Service configuration issue

**Check**: When you restart app, does it say "listening on port" in logs?

---

## 2. Database Connection Issue ⭐⭐⭐
**Error**: `SequelizeConnectionError` or `ECONNREFUSED` or `Timeout`  
**Why**: Cannot connect to Azure SQL Server  
**Fix**: Firewall rules or wrong connection string

**Check**: In Azure Portal → PRYYSM-V2 → Settings → "Configuration", verify DATABASE_URL is correct:
```
sqlserver://bhavin:Lad12345@pryysm.database.windows.net:1433;database=pryysm;encrypt=true;trustServerCertificate=false;connectionTimeout=30
```

---

## 3. Missing node_modules ⭐⭐
**Error**: `Cannot find module 'next'` or similar  
**Why**: npm install failed or artifact didn't include node_modules  
**Fix**: This should be fixed by latest deployment (41a1719 includes node_modules)

**Check**: Logs should show "npm install" completing successfully

---

## 4. Next.js Build Issue ⭐⭐
**Error**: `.next folder not found` or build-related error  
**Why**: Build didn't create .next folder properly  
**Fix**: Run build locally to verify it works

**Check**: Run locally: `npm run build` - does it create .next folder?

---

## 5. Environment Variables Missing ⭐
**Error**: `NEXTAUTH_SECRET` undefined or other env var error  
**Why**: Configuration not passed to runtime  
**Fix**: Set in Azure Portal Configuration

**Check**: In logs, should see these at startup:
```
NODE_ENV: production
PORT: 8080
```

---

## QUICK DIAGNOSTIC

When you check the log stream, look for:

✅ GOOD SIGNS:
- "Starting Pryysm v2..."
- "npm install" completing
- "ready - started server on 0.0.0.0:8080"
- "listening on port 8080"

❌ BAD SIGNS / ERROR MESSAGES:
- Any "Error:" lines
- "Cannot find module"
- "ECONNREFUSED"
- "listen EADDRINUSE"
- Database errors
- Missing file errors

---

**Share the error message and I'll have this fixed in 5 minutes.**
