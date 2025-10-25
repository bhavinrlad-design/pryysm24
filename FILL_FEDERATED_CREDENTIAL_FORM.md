# ✅ How to Fill the Federated Credential Form

## Form Fields Explained

### 1. **Federated credential scenario** (Already Selected ✓)
```
✅ GitHub Actions deploying Azure resources
```
(This should already be selected)

---

## 2. GitHub Account Details Section

### **Organization**
```
lad-pryysm
```
(Your GitHub username/organization)

### **Repository**
```
pryysm-v2
```
(Your repository name)

### **Entity type**
```
Click dropdown → Select: "Environment" (or "Branch" if available)
```

**If you see options:**
- `branch` → Select this if available
- `environment` → Select this if branch not available
- `pull_request` → Don't select

---

## 3. Auto-Generated Values (Read-Only)

These will auto-populate based on above:

### **Issuer** (Read-only, already filled)
```
https://token.actions.githubusercontent.com
```
✓ Leave as-is

### **Subject identifier** (Auto-generated, Read-only)
```
repo:lad-pryysm/pryysm-v2:ref:refs/heads/main
```
✓ This should auto-generate based on your GitHub details

---

## 4. Credential Details Section

### **Name**
```
github-actions-pryysm-v2
```
(Any descriptive name - cannot be changed later)

Examples:
- `github-actions-main`
- `pryysm-v2-github-actions`
- `github-deployment`

### **Description** (Optional)
```
GitHub Actions OIDC for deploying to Azure App Service
```

### **Audience** (Read-only)
```
api://AzureADTokenExchange
```
✓ Leave as-is

---

## Complete Example Fill-In

| Field | Value |
|---|---|
| Federated credential scenario | `GitHub Actions deploying Azure resources` |
| Organization | `lad-pryysm` |
| Repository | `pryysm-v2` |
| Entity type | `branch` (or `environment`) |
| Issuer | `https://token.actions.githubusercontent.com` (auto) |
| Subject identifier | `repo:lad-pryysm/pryysm-v2:ref:refs/heads/main` (auto) |
| Name | `github-actions-pryysm-v2` |
| Description | `GitHub Actions OIDC for deploying to Azure` |
| Audience | `api://AzureADTokenExchange` (auto) |

---

## Step-by-Step in Azure Portal

1. **Organization field:**
   - Type: `lad-pryysm`

2. **Repository field:**
   - Type: `pryysm-v2`

3. **Entity type dropdown:**
   - Click dropdown
   - Select: `branch` or `environment`

4. **Name field:**
   - Type: `github-actions-pryysm-v2`

5. **Description field (optional):**
   - Type: `GitHub Actions OIDC deployment credential`

6. **Review auto-generated values:**
   - Issuer should show: `https://token.actions.githubusercontent.com`
   - Subject should show: `repo:lad-pryysm/pryysm-v2:ref:refs/heads/main`
   - Audience should show: `api://AzureADTokenExchange`

7. **Click: "Add"**

---

## ⚠️ Important

**Subject Identifier must match your branch:**
```
repo:lad-pryysm/pryysm-v2:ref:refs/heads/main
                                              ^^^^
                                         Your branch name
```

Your workflow is on `main` branch, so it should auto-generate correctly.

---

## After Clicking "Add"

✅ Federated credential created
✅ GitHub Actions can now authenticate with Azure
✅ Next push to main will trigger deployment

Test it:
```bash
cd d:\Pryysm-v2\pryysm-v2-3dprint
git commit --allow-empty -m "Trigger deployment with federated credentials"
git push origin main
```

Then check: **GitHub → Actions** to watch the workflow run! 🚀
