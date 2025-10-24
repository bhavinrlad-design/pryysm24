# 🚀 Deployment Monitoring Guide

## Current Deployment Status

**Commit:** `d7d2c1f` pushed to `new-main` branch  
**Time:** October 24, 2025  
**Status:** ✅ Deployment Started

---

## Monitor Your Deployment

### 1️⃣ GitHub Actions (Real-Time Build Logs)

**Go to:** https://github.com/lad-pryysm/pryysm-v2/actions

**What you'll see:**
```
Workflow runs
┌─────────────────────────────────────────────────┐
│ Update production environment for Azure...      │
│ Branch: new-main                                │
│ Commit: d7d2c1f                                 │
│ Status: ⏳ In progress...                        │
│ Duration: 2 mins 15 secs                        │
└─────────────────────────────────────────────────┘
```

**Click on the workflow** to see detailed logs:

```
Build and Deploy
├── ✓ Checkout code (5 secs)
├── ✓ Setup Node.js (10 secs)
├── ✓ Install dependencies (45 secs)
├── ⏳ Run tests (in progress...)
├── ⏳ Build Next.js (pending...)
├── ⏳ Build Docker image (pending...)
├── ⏳ Push to Azure Container Registry (pending...)
└── ⏳ Deploy to App Service (pending...)
```

### 2️⃣ Azure Portal (Deployment History)

**Go to:** https://portal.azure.com

**Navigate:**
```
Search: "App Service"
→ Click: Your App Service (pryysm-v2-dyfqbdd3g4gycnee)
→ Left Menu: Deployments
→ See latest deployment
```

**You'll see:**
```
Deployment History
┌─────────────────────────────────────────────────┐
│ Latest Deployment                               │
│ ├─ Status: Deploying...                        │
│ ├─ Commit: d7d2c1f                             │
│ ├─ Author: [Your Name]                         │
│ ├─ Time: Just now                              │
│ └─ Duration: ~3-5 minutes total                │
└─────────────────────────────────────────────────┘
```

### 3️⃣ Application URL

**Visit:** https://pryysm.app

**During deployment (first 1-2 mins):**
```
❌ May show "Service Unavailable" (app restarting)
This is normal - just wait 30 seconds
```

**After deployment (3-5 mins):**
```
✅ Landing page loads
✅ All pages accessible
✅ Login page has "Sign in with Microsoft" button
```

---

## Expected Timeline

### 0-1 Minutes
- ✅ Code checked out from GitHub
- ✅ Node.js environment setup
- ✅ Dependencies installing

**Status:** Early stage build

### 1-2 Minutes
- ✅ Tests running
- ✅ Next.js app building
- ⏳ Docker image building

**Status:** Building application

### 2-4 Minutes
- ⏳ Docker image pushed to Azure Container Registry
- ⏳ Deployment to Azure App Service
- ⏳ Container starting
- ⏳ Health checks running

**Status:** Deploying to cloud

### 4-5 Minutes
- ✅ Deployment complete
- ✅ Application running
- ✅ Environment variables injected

**Status:** Live in production!

---

## What Gets Injected at Deploy Time

When GitHub Actions deploys, it automatically sets these environment variables:

```bash
# From GitHub Secrets
AZURE_AD_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_AD_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_AD_CLIENT_SECRET=abc123xyz...
NEXTAUTH_SECRET=c3a7f8b2e1d9c4a6f5b8e2d1c9a7f3b5
DATABASE_URL=sqlserver://...@pryysm.database.windows.net...

# From .env.production file
NEXTAUTH_URL=https://pryysm.app
NODE_ENV=production
PORT=8080
NEXT_PUBLIC_API_URL=https://pryysm-v2-dyfqbdd3g4gycnee.uaenorth-01.azurewebsites.net/api
```

---

## Sign of Successful Deployment

### ✅ You'll Know It's Done When:

**GitHub Actions:**
- All workflow steps show ✓ (green)
- "Workflow run succeeded" message
- Duration: ~5 minutes

**Application:**
- https://pryysm.app/ loads quickly
- Landing page displays
- No error messages
- Favicon appears in tab

**Login Page:**
- https://pryysm.app/login loads
- "Sign in with Microsoft" button visible
- Email/password form present
- Signup link visible

---

## Test Successful Deployment

### Test 1: Azure AD Login

```
1. Go to: https://pryysm.app/login
2. Click: "Sign in with Microsoft"
3. You're redirected to: login.microsoftonline.com
4. Sign in with your Azure credentials
5. Accept permissions
6. Redirected back to dashboard
7. ✅ You're logged in!
```

### Test 2: Email/Password Login

```
1. Go to: https://pryysm.app/login
2. Enter: demo@prysm.com
3. Enter: demo123
4. Click: Sign In
5. ✅ Redirected to dashboard
```

### Test 3: Application Features

```
1. Dashboard loads
2. Can see printer management
3. Can see print jobs
4. Can access all features
5. ✅ Application works!
```

---

## Troubleshooting Deployment

### GitHub Actions Still Running?

**Normal:** GitHub Actions takes 3-5 minutes first time

**What to do:**
1. Go to: https://github.com/lad-pryysm/pryysm-v2/actions
2. Click the running workflow
3. Scroll down to see current step
4. Wait 3-5 minutes total

**If it's taking >10 minutes:**
1. Check for errors in logs
2. Look for red X marks
3. Scroll to error message
4. Common issues:
   - Missing GitHub Secret
   - Invalid credential format
   - Build error in code

### Application Shows "Service Unavailable"

**This is normal during first 1-2 minutes!**

What's happening:
- Old container shutting down
- New container starting up
- Application initializing

Solution:
- Wait 30 seconds
- Refresh page (F5)
- If still shows after 2 mins, something went wrong

### Azure AD Login Not Working?

**Check #1: Is deployment finished?**
- GitHub Actions all steps green? ✅
- Wait at least 5 minutes since push

**Check #2: Hard refresh browser**
- Windows: `Ctrl+Shift+Delete`
- Mac: `Cmd+Shift+Delete`
- Or: Right-click → "Empty cache and hard refresh"

**Check #3: Check GitHub Secrets**
- Are all 4 secrets present?
- Did you set them before pushing?
- Are they spelled correctly?

**Check #4: Check Entra Configuration**
- Redirect URI: `https://pryysm.app/api/auth/callback/azure-ad`
- Is it exactly right? (no trailing slash)
- Client secret not expired?

**Check #5: Check production logs**
- Azure Portal → App Service → Logs
- Look for error messages
- Check if environment variables loaded

---

## Real-Time Monitoring Commands

### Check Git Status

```bash
cd d:\Pryysm-v2\pryysm-v2-3dprint

# See current branch
git branch

# See latest commits
git log --oneline -5

# See changes
git status
```

### Check Deployment Status

```bash
# List all GitHub Actions workflows
gh run list --repo lad-pryysm/pryysm-v2

# Watch the latest run
gh run watch --repo lad-pryysm/pryysm-v2 [RUN_ID]
```

*Note: Requires GitHub CLI installed*

---

## Common Issues & Solutions

### Issue: "Deployment failed - secrets not found"

**Solution:**
1. Go to GitHub Secrets
2. Verify all 4 Azure AD secrets are set
3. Check spelling exactly matches
4. Click "Update" if modified
5. Retry deployment: `git push origin new-main`

### Issue: "Invalid client secret"

**Solution:**
1. Check secret wasn't typed wrong
2. If unsure, regenerate in Entra:
   - Entra Admin Center
   - Your app → Certificates & secrets
   - Delete old secret
   - Create new one
   - Copy to GitHub Secrets
3. Retry deployment

### Issue: "NEXTAUTH_SECRET is not set"

**Solution:**
1. Go to GitHub Secrets
2. Create new secret: `NEXTAUTH_SECRET`
3. Generate at: https://generate-secret.vercel.app/32
4. Paste the 32-character string
5. Click "Add secret"
6. Retry deployment: `git push origin new-main`

### Issue: "Redirect URI mismatch"

**Solution:**
The URI must be **exactly**:
```
https://pryysm.app/api/auth/callback/azure-ad
```

Check in Entra Admin Center:
1. Your app registration
2. Authentication
3. Web redirect URIs
4. Make sure it matches exactly
5. No trailing slash!
6. No variations!

---

## After Deployment Success

### ✅ What's Now Live

- Production URL: https://pryysm.app
- Azure AD login: Working
- Email/password: Working
- Database: Azure SQL
- Sessions: Encrypted
- OAuth tokens: Stored

### 📊 Monitoring

**Check app health:**
- Azure Portal → Insights
- View requests/errors
- Monitor response times
- Check CPU/memory usage

**Check logs:**
- Azure Portal → Log stream
- Real-time application logs
- See any errors
- Monitor performance

---

## Next Steps (After Deployment)

### Immediate
1. ✅ Test Azure AD login
2. ✅ Test email/password login
3. ✅ Test dashboard access
4. ✅ Verify users in database

### Short Term
- [ ] Share link with team
- [ ] Have them test logins
- [ ] Document any issues
- [ ] Monitor logs for errors

### Documentation
- [ ] Read: AZURE_AD_SETUP_COMPLETE.md
- [ ] Read: PHASE_4_COMPLETE.md
- [ ] Save: GET_CREDENTIALS_QUICK_START.md
- [ ] Archive: All setup docs

---

## Deployment Summary

| Step | Status | Time | Action |
|------|--------|------|--------|
| Commit | ✅ | - | d7d2c1f |
| Push | ✅ | - | to new-main |
| GitHub Actions Start | ✅ | 0 min | Build initiated |
| Dependencies Install | ⏳ | ~1 min | In progress |
| Build App | ⏳ | ~2 min | Building... |
| Docker Build | ⏳ | ~2 min | Pending... |
| Push to Azure | ⏳ | ~1 min | Pending... |
| Deploy Container | ⏳ | ~1 min | Pending... |
| Health Check | ⏳ | ~1 min | Pending... |
| **Total** | **⏳** | **3-5 min** | **Deployment live soon!** |

---

## Support Resources

### Monitoring URLs
- **GitHub Actions:** https://github.com/lad-pryysm/pryysm-v2/actions
- **Azure Portal:** https://portal.azure.com
- **Application:** https://pryysm.app
- **Documentation:** See AZURE_AD_COMPLETE_SETUP.md

### Troubleshooting
- **GitHub Issues:** https://github.com/lad-pryysm/pryysm-v2/issues
- **Azure Support:** https://portal.azure.com (#support)
- **NextAuth Docs:** https://next-auth.js.org/

---

**⏳ Deployment in progress... Check back in 3-5 minutes!** 🚀

*Monitor at: https://github.com/lad-pryysm/pryysm-v2/actions*
