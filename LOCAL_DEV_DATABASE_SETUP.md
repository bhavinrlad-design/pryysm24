# 🗄️ Local Development Database Setup

## Choose Your Database

### Option 1: LocalDB (SQL Server Express) ✅ RECOMMENDED
**Best for:** Local development without Docker

#### Step 1: Install SQL Server Express LocalDB
- Download: https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb
- Or: Install via Visual Studio (included)

#### Step 2: Verify LocalDB is Running
```powershell
sqllocaldb info
```

Should show:
```
MSSQLLocalDB
```

#### Step 3: Update .env.local
```bash
DATABASE_URL="sqlserver://(localdb)\\mssqllocaldb;database=pryysm_dev;encrypt=true;trustServerCertificate=true;"
```

#### Step 4: Continue with Prisma
```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

### Option 2: Azure SQL (Your Production Database)
**Best for:** Testing with production-like setup

#### Step 1: Get Connection String
- Go to: https://portal.azure.com
- Find your Azure SQL Server
- Copy connection string

#### Step 2: Update .env.local
```bash
DATABASE_URL="sqlserver://server.database.windows.net:1433;database=pryysm_dev;user=admin@server;password=YourPassword;encrypt=true;trustServerCertificate=false;connection timeout=30;"
```

Replace:
- `server` → Your Azure SQL server name
- `pryysm_dev` → Your database name
- `admin@server` → Your username
- `YourPassword` → Your password

#### Step 3: Continue with Prisma
```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

### Option 3: Docker (SQL Server in Container)
**Best for:** Isolated environment

#### Step 1: Install Docker Desktop
- Download: https://www.docker.com/products/docker-desktop

#### Step 2: Start SQL Server Container
```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourPassword123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:latest
```

#### Step 3: Update .env.local
```bash
DATABASE_URL="sqlserver://sa:YourPassword123@localhost:1433;database=pryysm_dev;encrypt=true;trustServerCertificate=true;"
```

#### Step 4: Continue with Prisma
```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

### Option 4: SQLite (Lightweight Testing)
**Best for:** Quick testing without databases

#### Step 1: Update .env.local
```bash
DATABASE_URL="file:./prisma/dev.db"
```

#### Step 2: Update Prisma Schema
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

#### Step 3: Continue with Prisma
```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

## Recommended Setup for Your Project

Since you're using Azure SQL in production, I recommend **Option 1 (LocalDB)** for local development:

### Setup LocalDB

#### 1. Check if LocalDB is installed
```powershell
sqllocaldb info
```

If not found, install: https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb

#### 2. Update .env.local
Your file already has this commented out. Replace the DATABASE_URL line with:

```bash
DATABASE_URL="sqlserver://(localdb)\\mssqllocaldb;database=pryysm_dev;encrypt=true;trustServerCertificate=true;"
```

#### 3. Run Prisma
```bash
npx prisma generate
npx prisma db push
```

#### 4. View Database
```bash
npx prisma studio
```

---

## Troubleshooting

### Error: "the URL must start with the protocol `sqlserver://`"
**Solution:** Your DATABASE_URL is not set correctly. Follow the setup above.

### Error: "Cannot connect to LocalDB"
**Solution:** LocalDB might not be installed. Install SQL Server Express: https://www.microsoft.com/en-us/sql-server/sql-server-express

### Error: "Cannot connect to Azure SQL"
**Solution:** 
1. Check your connection string is correct
2. Make sure firewall allows your IP
3. Verify username/password are correct

### Prisma Studio not working
**Solution:** 
1. Make sure database connection is working
2. Run: `npx prisma generate` first
3. Then: `npx prisma studio`

---

## Next Steps

Once you have your database set up:

1. ✅ DATABASE_URL is correct in .env.local
2. Run: `npx prisma generate`
3. Run: `npx prisma db push`
4. Run: `npx prisma studio` (to verify)
5. Continue with Phase 3.4: Test Locally

---

**Which option would you like to use?**
