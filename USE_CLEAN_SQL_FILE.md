# ✅ Clean SQL File for Table Creation

## The Problem

The previous SQL had syntax errors (likely from smart quotes or special characters during copy-paste).

## ✅ The Solution

I've created a **clean `.sql` file** that you can use:

**File:** `azure_create_tables.sql`

---

## How to Use

### Option 1: Copy from the File (Recommended)

1. Open `azure_create_tables.sql` in VS Code
2. Select all the SQL (Ctrl+A)
3. Copy it (Ctrl+C)
4. Go to **Azure Portal** → **Query Editor**
5. Paste (Ctrl+V)
6. Click **"Run"**

### Option 2: Download and Run Directly

If Azure supports uploading SQL files:
1. Download `azure_create_tables.sql`
2. Upload to Query Editor
3. Click **"Run"**

---

## What This SQL Does

✅ Drops existing tables (safe - uses IF EXISTS)
✅ Creates User, Account, Session tables with correct schema
✅ Inserts 3 demo users with bcrypt hashed passwords
✅ Shows verification query at the end

---

## Expected Output

When successful, you should see:

```
Tables created successfully!

TableName        RowCount
User table       3
Account table    0
Session table    0
```

---

## Demo Users Created

```
Email: demo@prysm.com
Password: demo123

Email: admin@prysm.com
Password: AdminPassword123

Email: LAD@admin.com
Password: MasterPass123
```

---

## Then Test Login

```
https://pryysm.app/login
demo@prysm.com
demo123
```

Should redirect to dashboard! 🎉

---

## If Still Getting Syntax Error

Try this **minimal test** first in Query Editor:

```sql
SELECT 1 as Test;
```

If this works, the issue is with specific characters in the SQL. 

Then try running just:

```sql
DROP TABLE IF EXISTS [Session];
DROP TABLE IF EXISTS [Account];
DROP TABLE IF EXISTS [User];
```

This will confirm the DROP syntax works.
