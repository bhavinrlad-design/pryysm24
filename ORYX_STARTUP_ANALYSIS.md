# Oryx and Azure App Service Node.js Startup Analysis

## Key Findings from Official Microsoft Documentation

### 1. Oryx Node.js Startup Process (From github.com/microsoft/Oryx)

According to the **official Oryx Node.js runtime documentation**, the startup priority is:

1. **Run `npm start`** if a `start` script is specified in package.json
2. Else, if a script is specified in `package.json`'s `main` field, run that
3. Run the first found of these files in the root:
   - bin/www
   - server.js
   - app.js
   - index.js
   - hostingstart.js

**Key Point**: Oryx uses `npm start` by default when the script exists.

### 2. Azure App Service Configuration Options

**For Linux App Service**, Microsoft provides these startup methods:

#### Option A: Run with npm start (Current approach ✅)
- Just ensure a `start` script exists in package.json
- Oryx automatically detects and runs it

#### Option B: Run with a custom command
```bash
az webapp config set --resource-group <rg> --name <app-name> --startup-file "npm run start:prod"
```

#### Option C: Run with PM2 (Recommended for production)
```bash
az webapp config set --resource-group <rg> --name <app-name> --startup-file "pm2 start <file> --no-daemon"
```

### 3. The appsvc.yaml Solution (Official & Recommended)

From the Oryx docs, `appsvc.yaml` is the **official way** to override Oryx defaults:

```yaml
version: 1

pre-build: |
  echo "Pre-build steps"

post-build: |
  echo "Post-build steps"

run: npm install --legacy-peer-deps --omit=dev && node node_modules/.bin/next start
```

**Important**: The `run` section completely overrides Oryx's default startup behavior.

### 4. Why "next: not found" Happens

When Oryx runs `npm start`:
1. npm looks for the `start` script in package.json
2. If script is `"start": "next start"`, npm tries to find `next` command
3. npm searches PATH for the `next` binary
4. On Azure, npm's PATH isn't set up to include `./node_modules/.bin`
5. Result: `sh: 1: next: not found`

**Solution**: Use full path in package.json:
```json
"start": "node node_modules/.bin/next start"
```

OR use appsvc.yaml to override completely.

### 5. Environment Variables and Startup

**From Azure App Service docs:**
- `WEBSITE_NODE_DEFAULT_VERSION` - Sets Node version
- `PORT` - Already set by Azure (default 8080), apps should read from `process.env.PORT`
- `NODE_ENV` - Should be set to "production" in Azure Portal app settings
- `PRE_BUILD_COMMAND` - Run before npm install (build stage)
- `POST_BUILD_COMMAND` - Run after npm install (build stage)
- `STARTUP_COMMAND` - Set via Azure CLI to override startup (runtime stage)

### 6. Build vs Runtime vs Deployment

**Three Separate Stages:**

1. **Build Stage** (Oryx in GitHub Actions):
   - Runs `npm install`
   - Runs `npm run build`
   - Creates output (.next/, node_modules/)
   - Generates oryx-manifest.toml

2. **Deployment Stage** (OneDeploy):
   - Uploads artifact to Azure
   - Extracts files to /home/site/wwwroot
   - Does NOT modify startup script

3. **Runtime Stage** (App Service startup):
   - Reads oryx-manifest.toml
   - Looks for appsvc.yaml
   - Falls back to Procfile
   - Falls back to npm start
   - Executes startup command

### 7. Why Previous Fixes Didn't Work

**Previous attempts failed because:**
- ❌ Procfile - Ignored by Oryx during runtime
- ❌ azure-startup.sh - Ignored by Oryx during runtime
- ❌ azure-startup.sh via Procfile - Oryx doesn't read Procfile at runtime
- ❌ Copying `next` to /usr/local/bin - Oryx still runs from different context
- ❌ Setting STARTUP_COMMAND via Azure CLI in workflow - Resource group name issues

**Why appsvc.yaml works:**
- ✅ Official Oryx feature
- ✅ Oryx reads it during startup initialization
- ✅ Completely overrides Oryx defaults
- ✅ No authentication/permissions needed
- ✅ Works with deployed artifacts

### 8. Current Solution Stack (Recommended)

**Layer 1 - package.json (Fallback)**
```json
"start": "node node_modules/.bin/next start"
```
Why: If appsvc.yaml is missing, npm start will still work with full path.

**Layer 2 - appsvc.yaml (Primary)**
```yaml
version: 1
run: npm install --legacy-peer-deps --omit=dev && node node_modules/.bin/next start
```
Why: Official way to tell Oryx exactly how to start the app.

**Layer 3 - Procfile (Backup)**
```
web: bash azure-startup.sh
```
Why: Older Oryx versions might check this; provides another layer of safety.

### 9. What Happens During Startup (With Our Config)

1. **Container starts**
2. **Oryx runtime initializes**
3. **Oryx looks for appsvc.yaml** ← Found!
4. **Oryx reads: `run: npm install --legacy-peer-deps --omit=dev && node node_modules/.bin/next start`**
5. **Executes this command:**
   - `npm install --legacy-peer-deps --omit=dev` (ensures prod dependencies)
   - `node node_modules/.bin/next start` (starts Next.js with full path)
6. **Next.js server starts on port 8080**
7. **App becomes accessible** ✅

### 10. Verification Points

After deployment, check:
1. Azure Portal → PRYYSM-V2 → Log stream
2. Look for: "npm info using" and "ready - started server on"
3. No `next: not found` error
4. Visit https://pryysm.app
5. App loads without "Application Error"

---

## Technical References

- **Oryx GitHub**: https://github.com/microsoft/Oryx
- **Oryx Node.js Runtime**: https://github.com/microsoft/Oryx/blob/main/doc/runtimes/nodejs.md
- **Oryx Configuration**: https://github.com/microsoft/Oryx/blob/main/doc/configuration.md
- **Azure Node.js Config**: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs
- **appsvc.yaml Format**: https://github.com/microsoft/Oryx (README - Build Configuration File section)

---

## Success Checklist

- [x] Created appsvc.yaml with proper run command
- [x] Updated package.json start script with full path
- [x] Added appsvc.yaml to GitHub Actions artifact
- [x] Committed and pushed all changes
- [x] GitHub Actions automatically triggered
- [ ] Deployment completes (next 5-10 minutes)
- [ ] Azure logs show successful startup
- [ ] https://pryysm.app loads without errors
- [ ] Login/Signup flows work correctly
