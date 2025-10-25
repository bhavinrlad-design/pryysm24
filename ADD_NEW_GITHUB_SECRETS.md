# ✅ Add These 3 NEW GitHub Secrets

Your existing secrets work fine, but the GitHub Actions workflow is looking for **different secret names**.

## Add These 3 New Secrets to GitHub

Go to: **GitHub Repository → Settings → Secrets and variables → Actions → New repository secret**

### Secret 1: Client ID
```
Name: AZUREAPPSERVICE_CLIENTID_E4770AE16B2441F5868CA061B4D8D689
Value: [Copy the value from your existing AZURE_AD_CLIENT_ID secret]
```

### Secret 2: Tenant ID
```
Name: AZUREAPPSERVICE_TENANTID_8D7DB62EBB904F2BB2CE8DA8F0479EB8
Value: [Copy the value from your existing AZURE_AD_TENANT_ID secret]
```

### Secret 3: Subscription ID
```
Name: AZUREAPPSERVICE_SUBSCRIPTIONID_DBBEC2F91325438DBB9DAB05E8F0CF0B
Value: [Your Azure Subscription ID - can find in Azure Portal → Subscriptions]
```

---

## Where to Get Subscription ID

1. Go to **Azure Portal**
2. Search for **"Subscriptions"**
3. Click on your subscription
4. Copy the **Subscription ID** (long UUID format)

---

## After Adding

The GitHub Actions workflow will be able to authenticate and deploy! Just make a commit and push to main.

---

## Note

These 3 new secrets have the same values as your existing ones, just with different names:

| Existing Secret | New Secret Name (for workflow) |
|---|---|
| `AZURE_AD_CLIENT_ID` | `AZUREAPPSERVICE_CLIENTID_E4770AE16B2441F5868CA061B4D8D689` |
| `AZURE_AD_TENANT_ID` | `AZUREAPPSERVICE_TENANTID_8D7DB62EBB904F2BB2CE8DA8F0479EB8` |
| (New) | `AZUREAPPSERVICE_SUBSCRIPTIONID_DBBEC2F91325438DBB9DAB05E8F0CF0B` |

GitHub Actions requires these specific names (with UUIDs) to authenticate with Azure.
