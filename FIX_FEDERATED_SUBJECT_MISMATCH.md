# 🔧 Fix Federated Identity Subject Mismatch

## The Problem

```
Error: AADSTS700213: No matching federated identity record found
Check your federated identity credential Subject, Audience and Issuer 
against the presented assertion.
```

**What's happening:**
- GitHub Actions is sending: `repo:lad-pryysm/pryysm-v2:ref:refs/heads/main`
- Azure is looking for: Something different (wrong Subject in federated credential)

---

## ✅ Solution: Verify and Fix the Federated Credential

### Step 1: Check What's Currently Set

1. Go to **Azure Portal** → **Azure Active Directory**
2. Click **App registrations** → **PRYYSM-V2**
3. Click **Certificates & secrets** → **Federated credentials**
4. Find your credential and click it
5. **Check the Subject identifier field** - what does it show?

It should show exactly:
```
repo:lad-pryysm/pryysm-v2:ref:refs/heads/main
```

### Step 2: If It's Wrong, Delete and Recreate

**If the Subject is incorrect:**

1. Click the **trash icon** to delete the credential
2. Click **+ Add credential** again
3. **Carefully fill in:**
   - **Organization:** `lad-pryysm`
   - **Repository:** `pryysm-v2`
   - **Entity type:** Select `branch` (NOT "environment")
   - **Name:** `github-actions-pryysm-v2`

4. **Before clicking Add**, verify it shows:
   - **Subject identifier:** `repo:lad-pryysm/pryysm-v2:ref:refs/heads/main`
   - **Issuer:** `https://token.actions.githubusercontent.com`
   - **Audience:** `api://AzureADTokenExchange`

5. Click **Add**

---

## Common Issues

### Issue 1: Subject shows `repo:lad-pryysm/pryysm-v2:environment:main`
**Problem:** Entity type was set to "environment" instead of "branch"
**Solution:** Delete and recreate with **Entity type = "branch"**

### Issue 2: Subject shows `repo:lad-pryysm/pryysm-v2:pull_request`
**Problem:** Entity type was set to "pull_request"
**Solution:** Delete and recreate with **Entity type = "branch"**

### Issue 3: Subject shows wrong org/repo name
**Problem:** Typo in Organization or Repository
**Solution:** Delete and recreate with exact names:
- Organization: `lad-pryysm`
- Repository: `pryysm-v2`

---

## Expected Subject Format

For **branch** deployments, it should be:
```
repo:{organization}/{repository}:ref:refs/heads/{branch}
```

For your setup:
```
repo:lad-pryysm/pryysm-v2:ref:refs/heads/main
```

---

## After Fixing

1. Delete the wrong credential
2. Create a new one with correct Entity type = "branch"
3. Verify Subject identifier shows exactly: `repo:lad-pryysm/pryysm-v2:ref:refs/heads/main`
4. Click **Add**

Then trigger deployment:
```bash
cd d:\Pryysm-v2\pryysm-v2-3dprint
git commit --allow-empty -m "Trigger deployment - federated credential fixed"
git push origin main
```

---

## Reference: What GitHub Actions Sends

GitHub Actions sends this assertion for workflow on `main` branch:
```
issuer: https://token.actions.githubusercontent.com
subject: repo:lad-pryysm/pryysm-v2:ref:refs/heads/main
audience: api://AzureADTokenExchange
```

Azure needs the **Subject identifier in your credential to match exactly**.
