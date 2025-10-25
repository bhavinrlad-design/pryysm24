# 📍 How to Find Azure Credentials for GitHub Secrets

## 1️⃣ AZUREAPPSERVICE_CLIENTID - Application (Client) ID

### Step-by-step:

1. Go to **Azure Portal** → https://portal.azure.com
2. Search for **"Azure Active Directory"** (or click the icon)
3. Click **"App registrations"** on the left menu
4. Find your app (or create new: name it `pryysm-v2-github`)
5. Copy **"Application (client) ID"** from the Overview page

**Visual:**
```
Azure Portal
    ↓
Azure Active Directory
    ↓
App registrations
    ↓
Your App Name
    ↓
Overview tab
    ↓
📋 Application (client) ID  ← COPY THIS
```

**Example format:** `550e8400-e29b-41d4-a716-446655440000`

---

## 2️⃣ AZUREAPPSERVICE_TENANTID - Directory (Tenant) ID

### Same location as above:

1. In your **App registration** → **Overview** page
2. Copy **"Directory (tenant) ID"** (right below Application ID)

**Visual:**
```
App registrations > Your App > Overview
├── Application (client) ID     ← Secret 1
├── Directory (tenant) ID       ← COPY THIS (Secret 2)
└── Object ID
```

**Example format:** `550e8400-e29b-41d4-a716-446655440111`

---

## 3️⃣ AZUREAPPSERVICE_SUBSCRIPTIONID - Subscription ID

### Different location:

1. Go to **Azure Portal** → Search for **"Subscriptions"**
2. Click on your subscription
3. Copy the **"Subscription ID"** from the Overview page

**Visual:**
```
Azure Portal
    ↓
Search: "Subscriptions"
    ↓
Your Subscription
    ↓
Overview tab
    ↓
📋 Subscription ID  ← COPY THIS
```

**Example format:** `550e8400-e29b-41d4-a716-446655440222`

---

## 🎯 Quick Summary

| Secret Name | Where to Find | Path |
|---|---|---|
| `AZUREAPPSERVICE_CLIENTID_...` | Application (client) ID | Azure AD → App registrations → Your app → Overview |
| `AZUREAPPSERVICE_TENANTID_...` | Directory (tenant) ID | Azure AD → App registrations → Your app → Overview |
| `AZUREAPPSERVICE_SUBSCRIPTIONID_...` | Subscription ID | Azure Portal → Subscriptions → Your subscription → Overview |

---

## After You Have the 3 Values

1. Go to **GitHub** → Your repository **pryysm-v2**
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add:

```
Name: AZUREAPPSERVICE_CLIENTID_E4770AE16B2441F5868CA061B4D8D689
Value: [Paste Application (client) ID]
```

```
Name: AZUREAPPSERVICE_TENANTID_8D7DB62EBB904F2BB2CE8DA8F0479EB8
Value: [Paste Directory (tenant) ID]
```

```
Name: AZUREAPPSERVICE_SUBSCRIPTIONID_DBBEC2F91325438DBB9DAB05E8F0CF0B
Value: [Paste Subscription ID]
```

---

## ⚠️ Important Notes

✅ **Make sure:**
- You copy the exact text (no spaces before/after)
- The secret names match exactly (including the long UUID at the end)
- You paste into the **Value** field, not the Name field

❌ **Don't:**
- Add spaces or line breaks
- Modify the secret names
- Share these values publicly

---

## Quick Links

- 🔗 Azure Portal: https://portal.azure.com
- 🔗 GitHub Secrets Settings: https://github.com/lad-pryysm/pryysm-v2/settings/secrets/actions

Once added, your GitHub Actions deployment will work! 🚀
