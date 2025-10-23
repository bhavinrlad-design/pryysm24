# 🔐 PRYYSM V2 | Azure AD Authentication Setup - COMPLETE GUIDE

## Overview

You're setting up Azure AD (Microsoft Entra) authentication for **PRYYSM V2** to allow:
- ✅ Single sign-on with Microsoft/Azure credentials
- ✅ Secure authentication without passwords
- ✅ User management through Azure AD
- ✅ Enterprise-grade security

---

## Phase 1: Azure Setup (10 minutes)

### Step 1.1: Go to Microsoft Entra Admin Center

```
URL: https://entra.microsoft.com/
Action: Sign in with your Azure account
```

### Step 1.2: Register New Application

**Navigation:**
```
Left Menu → Applications → App registrations → + New registration
```

**Fill Form:**
```
Name:                        PRYYSM-V2
Supported account types:     Accounts in this organizational directory only
Redirect URI:
  Platform:                  Web
  URI:                       https://pryysm.app/api/auth/callback/azure-ad
```

**Click:** Register

### Step 1.3: Copy Application IDs

**After registration, you'll see overview page:**

```
Look for:
1. Application (client) ID  → Copy this ✓
2. Directory (tenant) ID    → Copy this ✓
```

**Save to safe place:**
```
CLIENT_ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
TENANT_ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Step 1.4: Create Client Secret

**Navigation:**
```
Manage → Certificates & secrets → + New client secret
```

**Fill Form:**
```
Description: PRYYSM-V2 Production
Expires:     24 months (or your preference)
```

**Click:** Add

**⚠️ IMPORTANT:**
```
Copy the VALUE immediately!
You CANNOT see it again!

CLIENT_SECRET: abc123xyz...
```

### Step 1.5: Configure API Permissions

**Navigation:**
```
Manage → API permissions → + Add a permission
```

**For each permission:**
1. Select **Microsoft Graph**
2. Select **Delegated permissions**
3. Search and check:
   - ☑️ User.Read
   - ☑️ email
   - ☑️ profile
4. Click **Add permissions**

**Grant Consent:**
```
After adding, click: Grant admin consent for [Your Organization]
```

### Step 1.6: Configure Authentication

**Navigation:**
```
Manage → Authentication
```

**Add Platform:**
```
+ Add a platform → Web
```

**Configure Redirect URIs:**
```
☑️ https://pryysm.app/api/auth/callback/azure-ad
```

**Implicit Grant:**
```
☑️ Access tokens
☑️ ID tokens
```

**Click:** Save

---

## Phase 2: GitHub Setup (5 minutes)

### Step 2.1: Add GitHub Secrets

**Navigation:**
```
GitHub Repository
  → Settings
    → Secrets and variables
      → Actions
        → New repository secret
```

### Step 2.2: Create Each Secret

**Secret 1:**
```
Name:  AZURE_AD_CLIENT_ID
Value: [Your CLIENT_ID from Entra]
```

**Secret 2:**
```
Name:  AZURE_AD_TENANT_ID
Value: [Your TENANT_ID from Entra]
```

**Secret 3:**
```
Name:  AZURE_AD_CLIENT_SECRET
Value: [Your CLIENT_SECRET from Entra]
```

**Secret 4: Generate NEXTAUTH_SECRET**
```
Go to: https://generate-secret.vercel.app/32
Copy the 32-character secret

Name:  NEXTAUTH_SECRET
Value: [Generated 32-char secret]
```

---

## Phase 3: Local Development (5 minutes)

### Step 3.1: Create .env.local

**File:** `.env.local` in project root

```bash
# Database
DATABASE_URL="sqlserver://your-azure-sql-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-from-above"

# Azure AD
AZURE_AD_CLIENT_ID="your-client-id"
AZURE_AD_TENANT_ID="your-tenant-id"
AZURE_AD_CLIENT_SECRET="your-client-secret"
```

### Step 3.2: Verify Installation

```bash
# Check NextAuth installed
npm list next-auth

# Check Prisma adapter
npm list @auth/prisma-adapter
```

### Step 3.3: Run Migrations

```bash
# Generate Prisma
npx prisma generate

# Push schema to database
npx prisma db push

# View database
npx prisma studio
```

### Step 3.4: Test Locally

```bash
# Start dev server
npm run dev

# Open browser
URL: http://localhost:3000/login
```

---

## Phase 4: Production Deployment

### Step 4.1: Update .env.production

**File:** `.env.production`

```bash
# Database (injected from GitHub Secret)
# DATABASE_URL is already there

# NextAuth (will be injected from GitHub Secrets)
NEXTAUTH_URL="https://pryysm.app"

# Azure AD (will be injected from GitHub Secrets)
```

### Step 4.2: Deploy

```bash
# Commit changes
git add .
git commit -m "Add Azure AD authentication via NextAuth"

# Push to GitHub
git push origin new-main
```

**GitHub Actions will:**
1. Build application
2. Inject GitHub Secrets as env variables
3. Deploy to Azure
4. Automatically live in 3-5 minutes

### Step 4.3: Test Production

```bash
# Visit production
URL: https://pryysm.app/login

# Click "Sign in with Microsoft"
# Use your Azure credentials
# Should redirect to dashboard
```

---

## What Gets Deployed

### Files Created:
✅ `src/auth.ts` - NextAuth configuration  
✅ `app/api/auth/[...nextauth]/route.ts` - Auth API routes  

### Files Updated:
✅ `prisma/schema.prisma` - Added Account, Session, VerificationToken models  
✅ `package.json` - Added next-auth and @auth/prisma-adapter  
✅ `.env.local` - Added Azure AD environment variables  

### Database Changes:
✅ Account table (for OAuth tokens)  
✅ Session table (for auth sessions)  
✅ VerificationToken table (for email verification)  
✅ User table updated (made email/name optional for OAuth users)  

---

## Login Flow

### New Flow (with Azure AD):
```
1. User visits /login
2. Clicks "Sign in with Microsoft"
3. Redirected to login.microsoftonline.com
4. User signs in with Azure credentials
5. Consents to permissions (first time)
6. Redirected back to pryysm.app/api/auth/callback/azure-ad
7. NextAuth verifies token
8. Creates/updates user in database
9. Creates session
10. Redirects to /dashboard
11. User logged in! ✅
```

### Old Flow (still available):
```
1. User visits /login
2. Enters email and password
3. Clicks "Sign In"
4. API verifies credentials in database
5. Creates session
6. Redirects to /dashboard
```

---

## Testing Checklist

### Local Testing:
- [ ] npm install succeeds
- [ ] npx prisma generate works
- [ ] npx prisma db push succeeds
- [ ] npm run dev starts without errors
- [ ] http://localhost:3000/login loads
- [ ] Can sign in with email/password (old method)
- [ ] Can see "Sign in with Microsoft" button
- [ ] Clicking button redirects to login.microsoftonline.com
- [ ] Can sign in with Azure credentials
- [ ] Redirects back to dashboard
- [ ] User data appears in Prisma Studio

### Production Testing:
- [ ] Pushed to GitHub
- [ ] GitHub Actions deployment completed
- [ ] https://pryysm.app/login loads
- [ ] "Sign in with Microsoft" button present
- [ ] Can sign in with Azure credentials
- [ ] Redirects to dashboard correctly
- [ ] User created in database with correct data

---

## Troubleshooting

### Error: "NEXTAUTH_SECRET is not set"
```
Solution:
1. Generate secret at https://generate-secret.vercel.app/32
2. Add to GitHub Secrets as NEXTAUTH_SECRET
3. Restart dev server
```

### Error: "Invalid redirect_uri"
```
Solution:
1. Check redirect URI matches exactly:
   - Entra Admin Center
   - .env.local
   - .env.production
2. Format: https://pryysm.app/api/auth/callback/azure-ad
```

### Error: "Client authentication failed"
```
Solution:
1. Verify CLIENT_SECRET is correct
2. Check it hasn't expired
3. Generate new secret if needed
4. Update GitHub Secrets
```

### Error: "User table is missing columns"
```
Solution:
1. Run: npx prisma generate
2. Run: npx prisma db push
3. Restart dev server
```

### Not showing OAuth button
```
Solution:
1. Check AzureADProvider is in auth.ts
2. Check environment variables are set
3. Restart dev server
```

---

## Security Notes

✅ **Best Practices Implemented:**
- Secrets stored in GitHub Secrets (never in code)
- HTTPS required for production
- Session tokens encrypted
- CSRF protection enabled
- JWT tokens validated
- User data validated on backend

❌ **Never Do:**
- Don't commit secrets to git
- Don't share client secret
- Don't disable HTTPS
- Don't skip API validation
- Don't store passwords in plain text

---

## Support Resources

**NextAuth Docs:**
- Main: https://next-auth.js.org/
- Azure AD Provider: https://next-auth.js.org/providers/azure-ad
- Prisma Adapter: https://authjs.dev/reference/adapter/prisma

**Microsoft Entra Docs:**
- Main: https://learn.microsoft.com/en-us/entra/
- App Registration: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
- Azure AD OAuth: https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow

---

## Quick Reference Commands

```bash
# Install dependencies
npm install next-auth@beta @auth/prisma-adapter

# Generate Prisma
npx prisma generate

# Push database schema
npx prisma db push

# View database
npx prisma studio

# Start dev server
npm run dev

# Build production
npm run build

# Deploy
git push origin new-main
```

---

## Summary

| Phase | Status | Time |
|-------|--------|------|
| Azure Setup | ⏳ Do this first | 10 mins |
| GitHub Secrets | ⏳ Do after Azure | 5 mins |
| Local Dev | ✅ Ready | 5 mins |
| Production | ✅ Ready | 3-5 mins |

---

**Ready to set up? Start with Phase 1 above!** 🚀

