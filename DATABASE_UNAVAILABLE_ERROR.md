# ⚠️ Database Unavailable Error

## The Problem

```
Database 'pryysm' on server 'pryysm.database.windows.net' is not currently available.
```

This is a **transient error** - the Azure SQL Server is temporarily unavailable.

---

## ✅ Solutions

### Option 1: Wait and Retry (Usually Works)

The database is likely restarting or under maintenance.

```bash
# Wait 30 seconds
Start-Sleep -Seconds 30

# Try again
npx prisma db push --skip-generate
```

---

### Option 2: Check Azure Portal

1. Go to **Azure Portal**
2. Search for **"SQL databases"**
3. Click **"pryysm"** database
4. Check **Status** - should be "Online"
5. If it says "Creating" or other status, wait for it to finish

---

### Option 3: Restart the Database

If it's stuck:

1. **Azure Portal** → **SQL databases** → **pryysm**
2. Click **"Start"** button (if available)
3. Wait 2-3 minutes
4. Try Prisma command again

---

### Option 4: Check Firewall Rules

Make sure your app can connect:

1. **Azure Portal** → **SQL servers** → **pryysm** (the server)
2. Click **"Firewalls and virtual networks"**
3. Verify:
   - "Public network access": Should be **"Selected networks"** or **"Yes"**
   - Firewall rule exists allowing your IP
   - Or allow **0.0.0.0 - 255.255.255.255** (all IPs)

---

## Common Causes

| Issue | Solution |
|---|---|
| Database restarting | Wait 30-60 seconds and retry |
| Maintenance window | Wait for Azure maintenance to finish |
| Firewall blocking | Check firewall rules above |
| Resource limits | Scale up database (unlikely for new DB) |
| Network issue | Check your internet connection |

---

## Current Status

The error message shows:
- ✅ TLS handshake successful (connection attempt worked)
- ❌ Database temporarily unavailable (Azure SQL issue, not connection issue)

---

## What To Do Now

1. **Wait 1 minute**
2. **Try this command:**
   ```bash
   cd d:\Pryysm-v2\pryysm-v2-3dprint
   npx prisma db push --skip-generate
   ```
3. **If still fails:** Check Azure Portal for database status

---

## For GitHub Actions

If this happens during GitHub Actions deployment, it will automatically retry. Most transient errors resolve within 1 minute.

---

## Session Tracing ID

If the problem persists, contact Azure Support with this ID:
```
5940C5FF-A6C4-49DE-A9CF-B3A309FAD4AD
```

---

**Try again in 30 seconds!** ⏱️
