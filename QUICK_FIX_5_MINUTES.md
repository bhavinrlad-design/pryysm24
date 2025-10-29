# ⚡ QUICK REFERENCE - 5 MINUTE FIX

## 🎯 THE 4 SETTINGS YOU NEED TO ADD

Copy-paste these into Azure Portal Configuration:

---

### **SETTING #1: DATABASE_URL**

```
Name: DATABASE_URL

Value: Server=tcp:pryysm.database.windows.net,1433;
       Initial Catalog=pryysm;
       Persist Security Info=False;
       User ID=YOUR_SQL_USERNAME;
       Password=YOUR_SQL_PASSWORD;
       MultipleActiveResultSets=False;
       Encrypt=True;
       TrustServerCertificate=False;
       Connection Timeout=30;
```

⚠️ **REPLACE**:
- `YOUR_SQL_USERNAME` → Your SQL Server admin username
- `YOUR_SQL_PASSWORD` → Your SQL Server admin password

---

### **SETTING #2: NEXTAUTH_SECRET**

```
Name: NEXTAUTH_SECRET

Value: abcd1234EFGH5678ijkl9012MNOP3456
```

💡 **OR generate random**: https://generate-secret.vercel.app/32

---

### **SETTING #3: NEXTAUTH_URL**

```
Name: NEXTAUTH_URL

Value: https://pryysm.app
```

---

### **SETTING #4: NODE_ENV**

```
Name: NODE_ENV

Value: production
```

---

## 🚀 STEPS IN ORDER

1. ✅ Go to https://portal.azure.com
2. ✅ Search: `pryysm-v2`
3. ✅ Click App Service
4. ✅ Left sidebar → Configuration
5. ✅ Add 4 settings (above)
6. ✅ Click "Save" (top)
7. ✅ Click "Continue" 
8. ✅ Click "Restart"
9. ✅ Wait 2-3 minutes
10. ✅ Test: https://pryysm.app

---

## ❓ WHERE TO GET SQL CREDENTIALS

**If you have them**: Use them in DATABASE_URL

**If you don't have them**:
1. Azure Portal → SQL Database "pryysm"
2. Click "Connection strings"
3. Copy ADO.NET connection string
4. Find username/password in that string

**To reset SQL password**:
1. Azure Portal → SQL Server (pryysm.database.windows.net)
2. Left sidebar → "Reset password"
3. Choose admin, set new password

---

## ✅ WHEN YOU'RE DONE

- https://pryysm.app loads ✅
- No "Application Error" ✅
- Home page visible ✅
- Status: 200 OK ✅

---

**Detailed Guide**: VISUAL_GUIDE_ADD_ENVIRONMENT_VARIABLES.md
