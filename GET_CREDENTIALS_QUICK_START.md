# 🔑 Quick Start: Get Your 4 Authentication Credentials

This guide shows you exactly how to get the 4 credentials you need in ~10 minutes.

---

## Credential #1 & #2: CLIENT_ID & TENANT_ID

### Where to Get Them
1. Go to: **https://entra.microsoft.com/**
2. Sign in with your Azure/Microsoft account
3. Click: **Applications** (left sidebar)
4. Click: **App registrations**
5. Click: **+ New registration**

### Register Your App
Fill in the form:
```
Name:                  PRYYSM-V2
Supported account types: Accounts in this organizational directory only (Single tenant)
Redirect URI:
  Platform:           Web
  URI:                https://pryysm.app/api/auth/callback/azure-ad
```

Click: **Register**

### Copy Your IDs
After registration, you'll see an "Overview" page with:

```
┌─────────────────────────────────────────────┐
│ Application (client) ID                     │
│ xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx        │
│ [Copy button]                               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Directory (tenant) ID                       │
│ xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx        │
│ [Copy button]                               │
└─────────────────────────────────────────────┘
```

**Save these:**
```
AZURE_AD_CLIENT_ID = [copy the Application (client) ID]
AZURE_AD_TENANT_ID = [copy the Directory (tenant) ID]
```

---

## Credential #3: CLIENT_SECRET

### Create the Secret
1. In the same app page, click: **Manage** (left sidebar)
2. Click: **Certificates & secrets**
3. Click: **+ New client secret**

### Fill the Form
```
Description:     PRYYSM-V2 Production
Expires:         24 months (recommended)
```

Click: **Add**

### ⚠️ Copy Immediately!
**Important:** The secret is only shown ONCE. Copy it right now!

```
You'll see:
┌─────────────────────────────────────────────┐
│ Value                                       │
│ abc123xyz...                                │
│ [Copy button]                               │
└─────────────────────────────────────────────┘
```

**Save this:**
```
AZURE_AD_CLIENT_SECRET = [copy the Value]
```

---

## Credential #4: NEXTAUTH_SECRET

### Generate a Random Secret
1. Go to: **https://generate-secret.vercel.app/32**
2. You'll see a random 32-character string:

```
Example (yours will be different):
c3a7f8b2e1d9c4a6f5b8e2d1c9a7f3b5
```

3. Copy it

**Save this:**
```
NEXTAUTH_SECRET = [copy the generated string]
```

---

## Summary: Your 4 Credentials

You should now have 4 values. They look like this:

```
AZURE_AD_CLIENT_ID = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_AD_TENANT_ID = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_AD_CLIENT_SECRET = abc123xyz...
NEXTAUTH_SECRET = c3a7f8b2e1d9c4a6f5b8e2d1c9a7f3b5
```

---

## Next Step: Add to GitHub Secrets

Once you have all 4 values, go to:

**GitHub Repository Settings:**
```
1. Go to: https://github.com/lad-pryysm/pryysm-v2
2. Click: Settings (top menu)
3. Click: Secrets and variables → Actions (left sidebar)
4. Click: New repository secret (for each one)
```

**Add Each Secret:**

### Secret 1: AZURE_AD_CLIENT_ID
```
Name:  AZURE_AD_CLIENT_ID
Value: [paste the CLIENT_ID from Entra]
Click: Add secret
```

### Secret 2: AZURE_AD_TENANT_ID
```
Name:  AZURE_AD_TENANT_ID
Value: [paste the TENANT_ID from Entra]
Click: Add secret
```

### Secret 3: AZURE_AD_CLIENT_SECRET
```
Name:  AZURE_AD_CLIENT_SECRET
Value: [paste the CLIENT_SECRET from Entra]
Click: Add secret
```

### Secret 4: NEXTAUTH_SECRET
```
Name:  NEXTAUTH_SECRET
Value: [paste the generated secret]
Click: Add secret
```

---

## Verify All Secrets Are Added

After adding all 4 secrets, you should see:

```
Repository secrets
  AZURE_AD_CLIENT_ID          Updated X minutes ago
  AZURE_AD_CLIENT_SECRET      Updated X minutes ago
  AZURE_AD_TENANT_ID          Updated X minutes ago
  NEXTAUTH_SECRET             Updated X minutes ago
```

---

## Deploy

Once all 4 secrets are added, run:

```bash
git push origin new-main
```

GitHub Actions will automatically:
1. Build your app
2. Load the secrets
3. Deploy to production
4. Enable Azure AD login

**Done!** ✅ Your app now has Azure AD authentication.

---

## Troubleshooting

### "I forgot to copy the Client Secret"
**Solution:** Delete it and create a new one (same steps as before)

### "The redirect URI isn't working"
**Solution:** Make sure it's exactly:
```
https://pryysm.app/api/auth/callback/azure-ad
```

### "GitHub Actions is still building"
**Check:** https://github.com/lad-pryysm/pryysm-v2/actions
(May take 3-5 minutes)

### "Login button isn't appearing"
**Check:** Did you push the code? `git push origin new-main`

---

## Support

If you get stuck:
1. Check the AZURE_AD_COMPLETE_SETUP.md for detailed explanations
2. Verify all 4 GitHub secrets are present
3. Wait 5 minutes for GitHub Actions to complete
4. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

---

**Status: Ready to get your credentials!** 🚀
