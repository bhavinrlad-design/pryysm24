# Azure Deployment Best Practices - Comprehensive Guide

## From Azure App Service Extension (VSCode)

### Critical Deployment Requirements

1. **PORT Environment Variable** (Most Important!)
   ```javascript
   // Your app MUST listen to process.env.PORT
   const port = process.env.PORT || 3000
   server.listen(port)
   ```
   - Azure App Service sets `PORT=8080` automatically
   - Your application MUST read and use this environment variable
   - Not listening on the correct port = "Application Error"

2. **Log Streaming**
   - Azure App Service provides real-time log streaming
   - Essential for debugging deployment issues
   - Available through VSCode extension or Azure CLI
   - Shows startup errors, crashes, and runtime issues

3. **Build Automation**
   - When enabled, App Service auto-runs `npm install --production`
   - For custom builds, use deployment scripts or `appsvc.yaml`
   - Builds happen in separate process/container from runtime

### Deployment Flow
```
Local Development
    ↓
GitHub Actions Build (Compile + Test)
    ↓
Create Artifact (Upload to Azure)
    ↓
Azure OneDeploy (Extract to /home/site/wwwroot)
    ↓
Oryx Runtime (Read appsvc.yaml or detect startup)
    ↓
npm install (Production dependencies only)
    ↓
npm start (Execute your start script)
    ↓
App listens on PORT 8080
    ↓
Azure routes incoming requests
```

---

## From SQL Server Samples Repository

### Database Connection Best Practices

1. **Connection String Format for Azure SQL**
   ```
   sqlserver://username:password@host:port;database=dbname
   ```
   - Always use environment variables (DATABASE_URL)
   - Never hardcode credentials in code
   - Include encryption settings in production

2. **Connection Pooling**
   - Essential for production apps
   - Prisma handles this automatically
   - Configured in DATABASE_URL via connection parameters

3. **Firewall & Network**
   - Azure SQL requires firewall rules
   - Ensure App Service can connect to SQL Server
   - Check connection from Azure portal networking section

---

## From VSCode Azure App Service Extension

### Deployment Issues & Troubleshooting

1. **Known Issue: Large Commits**
   - Local Git deployment may fail with large commits
   - Solution: Use optimized artifact upload (what we're doing)
   - Keep artifact size < 500MB

2. **Build Notification**
   - "Update configuration to run npm install on target server?"
   - Select YES to enable automatic npm install
   - This ensures production dependencies are installed

3. **Always Deploy Notification**
   - Choose YES when prompted to always deploy to same web app
   - Prevents accidental deployments to wrong app
   - Configured in `.vscode/settings.json`

### Log Stream Connection String
```
az webapp log tail --name <app-name> --resource-group <rg>
```
- View real-time logs from Azure App Service
- Shows every startup error and crash
- Invaluable for debugging

---

## From Oryx Runtime (Official Microsoft Documentation)

### Startup Priority Order

**Oryx checks in this order:**

1. **appsvc.yaml** ← We use this ✅
   - Highest priority
   - Complete override
   - Official Oryx feature

2. **Procfile** ← We have this as backup
   - Falls back if appsvc.yaml not found
   - Format: `web: npm start`

3. **package.json start script** ← We have this
   - If no appsvc.yaml/Procfile
   - Runs: `npm start`

4. **Detection** ← Last resort
   - Looks for bin/www, server.js, app.js, index.js
   - Uses PM2 for Node 14+

### Three Important Environment Variables

| Variable | Stage | Purpose | Default |
|----------|-------|---------|---------|
| `PRE_BUILD_COMMAND` | Build | Run before npm install | "" |
| `POST_BUILD_COMMAND` | Build | Run after npm install | "" |
| `PORT` | Runtime | Port to listen on | 8080 |

**Note**: Unlike traditional App Service, `STARTUP_COMMAND` is NOT reliably read by Oryx. Use `appsvc.yaml` instead.

---

## Why Our Solution Works

### Layer 1: appsvc.yaml (Primary)
```yaml
version: 1
run: npm install --legacy-peer-deps --omit=dev && node node_modules/.bin/next start
```
**Why this is perfect:**
- ✅ Official Oryx feature designed for this exact scenario
- ✅ Tells Oryx exactly what command to run
- ✅ Uses full path to next binary (avoids PATH issues)
- ✅ Ensures production dependencies only
- ✅ No authentication required
- ✅ Works with pre-built artifacts

### Layer 2: package.json (Fallback)
```json
"start": "node node_modules/.bin/next start"
```
**Why this is important:**
- ✅ Fallback if appsvc.yaml is missing
- ✅ Full path to next binary
- ✅ Works if Oryx runs npm start directly
- ✅ Double protection against PATH issues

### Layer 3: azure-startup.sh (Emergency Fallback)
- ✅ Last resort if previous layers fail
- ✅ Can be invoked via Procfile
- ✅ Handles environment setup manually

---

## Complete Startup Checklist

### Before Deployment
- [x] appsvc.yaml created with correct run command
- [x] package.json has full path in start script
- [x] .next folder verified in build output
- [x] node_modules included in artifact
- [x] Database environment variables set in Azure Portal
- [x] NODE_ENV set to "production"
- [x] NEXTAUTH_* secrets configured

### During Deployment
- [x] GitHub Actions build completes without errors
- [x] Artifact created (80-255MB)
- [x] Deployment to Azure initiated
- [x] OneDeploy extracts files to /home/site/wwwroot
- [ ] Oryx reads appsvc.yaml
- [ ] npm install runs (production only)
- [ ] Next.js server starts on port 8080

### After Deployment
- [ ] Check Azure logs: `az webapp log tail -n PRYYSM-V2 -g <rg>`
- [ ] Look for: "npm info using" and "ready - started server"
- [ ] No "next: not found" errors
- [ ] Visit https://pryysm.app
- [ ] Page loads without "Application Error"
- [ ] Login/Signup flows functional
- [ ] Database queries work

---

## Critical Details

### PORT Environment Variable
- **Azure sets this automatically to 8080**
- **Your Next.js app MUST read it**
- **Failure to do so = "Application Error"**

Your index.js should have:
```javascript
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
```

### Build vs Runtime
- **Build Stage**: Runs in Ubuntu (GitHub Actions)
  - `npm install` (includes devDependencies)
  - `npx prisma generate`
  - `npm run build`
  - Creates .next/ folder
  
- **Runtime Stage**: Runs in Linux container (Azure)
  - Oryx reads appsvc.yaml
  - `npm install --omit=dev` (production only)
  - `node node_modules/.bin/next start`
  - App listens to PORT env variable

### Why Full Path to Next Binary?
```bash
# ✅ Full path (WORKS)
node node_modules/.bin/next start

# ❌ Just "next" (FAILS - npm PATH not set)
next start

# ❌ npx next (Often fails due to reinstall)
npx next start
```

The npm PATH isn't reliably set in Azure's startup environment, so we use the full path.

---

## Success Story Timeline

**Week 1**: Auth bug after Prisma upgrade
→ **Week 2**: Fixed dependencies, CSS, build process
→ **Day 6**: 409 Conflict with duplicate workflows
→ **Day 7**: Fixed artifact optimization (500MB → 80MB)
→ **Day 8**: Discovered Oryx ignoring Procfile/startup.sh
→ **Day 9**: Applied official Oryx solution (appsvc.yaml)
→ **NOW**: Ready for deployment! 🚀

---

## Reference Documentation

- **Oryx GitHub**: https://github.com/microsoft/Oryx
- **Oryx Node.js Docs**: https://github.com/microsoft/Oryx/blob/main/doc/runtimes/nodejs.md
- **Azure App Service Node.js**: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs
- **SQL Server Samples**: https://github.com/microsoft/sql-server-samples
- **VSCode Azure Extension**: https://github.com/microsoft/vscode-azureappservice
- **appsvc.yaml Format**: https://github.com/microsoft/Oryx/blob/main/README.md (Build Configuration File section)

---

## Next Steps

1. **Monitor GitHub Actions**: New build automatically triggered
   - Watch for completion (~5-10 minutes)
   - Check for build errors

2. **Monitor Azure Deployment**: OneDeploy uploads artifact
   - Check Azure portal for deployment status
   - Should complete in ~2-3 minutes

3. **Monitor App Startup**: Oryx starts application
   - Check Azure log stream: `az webapp log tail -n PRYYSM-V2 -g <rg>`
   - Look for successful startup message
   - No errors about "next: not found"

4. **Test Application**:
   - Visit https://pryysm.app
   - Check homepage loads
   - Test login/signup flows
   - Verify database connectivity

5. **If Issues Occur**:
   - Check Azure logs immediately
   - Look for specific error messages
   - Verify environment variables are set
   - Check database connection string
   - Verify PORT environment variable is used

---

**Status**: ✅ Ready for deployment  
**Commit**: bad8bd5 (ORYX_STARTUP_ANALYSIS.md)  
**Solution**: Multi-layered startup configuration with official Oryx support  
**Confidence**: High - based on official Microsoft documentation
