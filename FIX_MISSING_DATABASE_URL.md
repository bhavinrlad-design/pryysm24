# 🔧 Missing DATABASE_URL Environment Variable

## The Problem

```
Environment variable not found: DATABASE_URL
```

Prisma needs the `DATABASE_URL` to know which database to connect to.

---

## ✅ Solution

### Step 1: Get Your Connection String from Azure

1. **Azure Portal** → **SQL databases** → **pryysm**
2. Click on the database
3. Copy the connection string:
   - Look for **"Show database connection strings"** or **"Connection strings"**
   - Select **"ODBC (Python)"** tab
   - Copy the entire string

**Format:**
```
Driver={ODBC Driver 17 for SQL Server};Server=tcp:pryysm.database.windows.net,1433;Database=pryysm;Uid=youruser;Pwd=yourpassword;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;
```

Or simpler format for Prisma:
```
sqlserver://username:password@pryysm.database.windows.net:1433;database=pryysm;encrypt=true;trustServerCertificate=false;
```

---

### Step 2: Set Environment Variable Locally

**For PowerShell (Windows):**

```powershell
# Set the variable
$env:DATABASE_URL = "sqlserver://username:password@pryysm.database.windows.net:1433;database=pryysm;encrypt=true;trustServerCertificate=false;"

# Verify it's set
$env:DATABASE_URL

# Then try Prisma
npx prisma db push --skip-generate
```

**Or create `.env` file in project root:**

**File:** `d:\Pryysm-v2\pryysm-v2-3dprint\.env`

```
DATABASE_URL="sqlserver://username:password@pryysm.database.windows.net:1433;database=pryysm;encrypt=true;trustServerCertificate=false;"
```

Then Prisma will automatically read it!

---

### Step 3: Get Your Credentials

You need:
- **username**: Your SQL Server admin username (e.g., `sqladmin`)
- **password**: Your SQL Server admin password
- **server**: `pryysm.database.windows.net`
- **database**: `pryysm`

**Example:**
```
sqlserver://sqladmin:MyPassword123@pryysm.database.windows.net:1433;database=pryysm;encrypt=true;trustServerCertificate=false;
```

---

## Full Connection String Formats

### Azure SQL (SQL Server)
```
sqlserver://[user]:[password]@[server]:1433;database=[database];encrypt=true;trustServerCertificate=false;
```

### With Special Characters in Password

If your password has special characters (like `@`, `;`, `:`), URL-encode them:
- `@` → `%40`
- `;` → `%3B`
- `:` → `%3A`

**Example:** If password is `Pass@word;123`:
```
sqlserver://sqladmin:Pass%40word%3B123@pryysm.database.windows.net:1433;database=pryysm;encrypt=true;trustServerCertificate=false;
```

---

## Steps to Create `.env` File

1. **In VS Code:**
   - Open your project: `d:\Pryysm-v2\pryysm-v2-3dprint`
   - Create new file: `.env`
   - Paste your connection string:
   ```
   DATABASE_URL="sqlserver://username:password@pryysm.database.windows.net:1433;database=pryysm;encrypt=true;trustServerCertificate=false;"
   ```
   - Save (Ctrl+S)

2. **Then run:**
   ```bash
   npx prisma db push --skip-generate
   ```

---

## For GitHub Actions

The `.env` file is local only. GitHub Actions needs the secret:

**GitHub** → **Repository Settings** → **Secrets and variables** → **Actions**

Create secret:
```
Name: DATABASE_URL
Value: sqlserver://username:password@pryysm.database.windows.net:1433;database=pryysm;encrypt=true;trustServerCertificate=false;
```

The workflow already uses it:
```yaml
- name: Run Prisma migrations
  run: |
    npx prisma db push --skip-generate
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## ⚠️ Important

- ⛔ Don't commit `.env` to Git (it has passwords!)
- ✅ `.env` is already in `.gitignore`
- ✅ `.env` is local to your machine only
- ✅ GitHub Actions uses secrets (secure alternative)

---

## Try Now

1. Create `.env` file with your connection string
2. Run:
   ```bash
   npx prisma db push --skip-generate
   ```

It should work! 🚀
