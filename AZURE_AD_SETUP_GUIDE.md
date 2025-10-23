# 🔐 Azure AD / Microsoft Entra Authentication Setup Guide

## Step 1: Register Application in Microsoft Entra Admin Center

### Go to Entra Admin Center:
1. Visit: https://entra.microsoft.com/
2. Sign in with your Azure account
3. Go to: **Applications** → **App registrations**
4. Click **+ New registration**

### Register the App:
- **Name**: `PRYYSM-V2`
- **Supported account types**: Select `Accounts in this organizational directory only`
- **Redirect URI**: 
  - Platform: **Web**
  - URI: `https://pryysm.app/api/auth/callback`
- Click **Register**

---

## Step 2: Configure Application

After registration, you'll see the Application overview. Note down:

### Copy These Values:
1. **Application (client) ID** - Example: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
2. **Directory (tenant) ID** - Example: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Create Client Secret:

1. Go to: **Manage** → **Certificates & secrets**
2. Click **+ New client secret**
3. Set expiration (recommend: 24 months)
4. Click **Add**
5. **Copy the Value** (not the ID!)

**⚠️ IMPORTANT**: Copy this immediately! You can't see it again.

---

## Step 3: Configure API Permissions

1. Go to: **Manage** → **API permissions**
2. Click **+ Add a permission**
3. Select **Microsoft Graph**
4. Select **Delegated permissions**
5. Search for and check:
   - `User.Read`
   - `email`
   - `profile`
6. Click **Add permissions**
7. Click **Grant admin consent for [Your Organization]**

---

## Step 4: Configure Authentication

1. Go to: **Manage** → **Authentication**
2. Under **Platform configurations**, click **+ Add a platform**
3. Select **Web**
4. Add URI: `https://pryysm.app/api/auth/callback`
5. Under **Implicit grant and hybrid flows**, check:
   - ☑️ Access tokens
   - ☑️ ID tokens
6. Click **Save**

---

## Step 5: Set GitHub Secrets

Add these secrets to your GitHub repository:

### Go to GitHub:
1. Repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**

### Add Each Secret:

**Secret 1: AZURE_AD_CLIENT_ID**
```
Value: [Your Application (client) ID from Entra]
```

**Secret 2: AZURE_AD_TENANT_ID**
```
Value: [Your Directory (tenant) ID from Entra]
```

**Secret 3: AZURE_AD_CLIENT_SECRET**
```
Value: [Your Client Secret value from Entra]
```

**Secret 4: NEXTAUTH_SECRET** (Generate random string)
```
Value: [Generate at: https://generate-secret.vercel.app/32]
```

---

## Step 6: Update Environment Variables

### .env.local (Development)
```bash
AZURE_AD_CLIENT_ID="your-client-id"
AZURE_AD_TENANT_ID="your-tenant-id"
AZURE_AD_CLIENT_SECRET="your-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"
```

### .env.production (Production)
```bash
# These will be injected from GitHub Secrets
AZURE_AD_CLIENT_ID="from-github-secret"
AZURE_AD_TENANT_ID="from-github-secret"
AZURE_AD_CLIENT_SECRET="from-github-secret"
NEXTAUTH_URL="https://pryysm.app"
NEXTAUTH_SECRET="from-github-secret"
```

---

## Step 7: Update Application Code

We'll add:
1. NextAuth.js configuration
2. Azure AD provider
3. Auth callback routes
4. Protected routes with Azure auth

---

## Testing

### Local Testing:
```bash
npm run dev
# Visit http://localhost:3000/login
# Click "Sign in with Azure"
# Use your Azure account
```

### Production Testing:
```bash
# Push changes to GitHub
git push origin new-main

# Wait for deployment (3-5 minutes)
# Visit https://pryysm.app/login
# Click "Sign in with Azure"
# Use your Azure account
```

---

## Troubleshooting

### Error: "Invalid redirect_uri"
- **Solution**: Check redirect URI matches exactly in:
  1. Entra Admin Center
  2. GitHub Secrets (.env.production)
  3. Application code

### Error: "Client authentication failed"
- **Solution**: Check client secret is correct and not expired

### Error: "Insufficient privileges"
- **Solution**: Grant admin consent for API permissions in Entra

### Not redirecting back to app
- **Solution**: Check NEXTAUTH_URL is set correctly

---

## Security Best Practices

✅ **Do's**:
- Store secrets in GitHub Secrets (never in code)
- Use strong NEXTAUTH_SECRET (32+ characters)
- Enable MFA for your Azure account
- Rotate client secrets periodically
- Use HTTPS everywhere

❌ **Don'ts**:
- Don't commit secrets to git
- Don't share client secret
- Don't use weak secrets
- Don't enable unnecessary permissions

---

## Next Steps

1. Complete Entra registration above
2. Copy all required values
3. Add GitHub Secrets
4. Update .env files
5. Wait for my code implementation
6. Test authentication flow

