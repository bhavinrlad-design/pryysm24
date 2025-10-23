# Azure SQL Database Setup for Pryysm v2

## ✅ Current Status
- **Database Type**: Azure SQL Server
- **ORM**: Prisma 5.6.0
- **Schema**: Configured with models for Printers, Materials, and PrintJobs
- **Connection Method**: GitHub Secret `DATABASE_URL`

## 📋 Prerequisites

Before deployment, ensure you have:

1. ✅ Azure SQL Database created
2. ✅ Database connection string (from Azure Portal)
3. ✅ GitHub Secret `DATABASE_URL` configured
4. ✅ Firewall rules allowing Azure App Service to connect

## 🔐 GitHub Secrets Configuration

### Required Secrets:
Set these in your GitHub repository (Settings → Secrets and variables → Actions):

| Secret | Value | Example |
|--------|-------|---------|
| `DATABASE_URL` | Azure SQL connection string | `sqlserver://myserver.database.windows.net:1433;database=pryysm;user=admin@myserver;password=YourPassword;encrypt=true;trustServerCertificate=false;connection timeout=30;` |
| `NEXT_PUBLIC_API_URL` | Azure App Service URL | `https://pryysm-v2-dyfqbdd3g4gycnee.uaenorth-01.azurewebsites.net/api` |

## 🗄️ Database Schema

The app includes three main models:

### Printer
```prisma
model Printer {
  id        Int     @id @default(autoincrement())
  name      String
  status    String
  ipAddress String?
  location  String?
  prints    PrintJob[]
}
```

### Material
```prisma
model Material {
  id       Int     @id @default(autoincrement())
  name     String
  type     String?
  color    String?
  quantity Float?
  prints   PrintJob[]
}
```

### PrintJob
```prisma
model PrintJob {
  id          Int       @id @default(autoincrement())
  name        String
  status      String
  fileUrl     String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  printer     Printer   @relation(fields: [printerId], references: [id])
  printerId   Int
  material    Material  @relation(fields: [materialId], references: [id])
  materialId  Int
}
```

## 🚀 Deployment Workflow

### Automatic (CI/CD):
1. Push code to `new-main` branch
2. GitHub Actions workflow triggers
3. Workflow uses `DATABASE_URL` secret from GitHub
4. Prisma client generated automatically
5. Migrations applied during deployment
6. App deployed to Azure

### Manual (Local):
```bash
# 1. Set local environment
$env:DATABASE_URL = "your-connection-string"

# 2. Generate Prisma client
npx prisma generate

# 3. Run migrations
npx prisma migrate deploy

# 4. Seed database (optional)
npm run db:seed

# 5. Build and test
npm run build
npm run start
```

## 🔗 Azure SQL Connection String Format

Get from Azure Portal: **SQL Database → Connection strings → ADO.NET**

```
sqlserver://[server-name].database.windows.net:1433;
database=[database-name];
user=[admin-username]@[server-name];
password=[password];
encrypt=true;
trustServerCertificate=false;
connection timeout=30;
```

## 🛡️ Firewall Configuration

In Azure Portal → SQL Server → Firewall and virtual networks:

1. ✅ **Allow Azure services and resources to access this server**: ON
2. ✅ **Add Azure App Service IP** (if not covered by above)

## ✅ Verification Checklist

- [ ] Azure SQL Database created and running
- [ ] Database connection string obtained
- [ ] GitHub Secret `DATABASE_URL` set
- [ ] Firewall allows Azure App Service connections
- [ ] Prisma schema verified (`prisma/schema.prisma`)
- [ ] Build succeeds with `npm run build`
- [ ] Deployment to Azure completed
- [ ] Check Azure App Service logs for connection errors

## 🐛 Troubleshooting

### Build fails: "DATABASE_URL not set"
```bash
# Solution: Ensure GitHub Secret is properly configured
# Check in: GitHub → Repository Settings → Secrets and variables → Actions
```

### Deployment fails: "Cannot connect to database"
```bash
# Solution: Check firewall rules
# In Azure Portal → SQL Server → Firewall and virtual networks
# Ensure: "Allow Azure services and resources" = ON
```

### Prisma client generation error
```bash
# Solution: Regenerate Prisma client locally
npx prisma generate

# Then commit changes
git add .
git commit -m "Regenerate Prisma client"
git push
```

### Migration fails during deployment
```bash
# Solution: Check migration history
npx prisma migrate status

# Reset if needed (development only)
npx prisma migrate reset  # WARNING: Deletes all data

# Or resolve manually
npx prisma migrate resolve --rolled-back migration_name
```

## 📊 Environment Variables

### Production (.env.production)
- `DATABASE_URL`: From GitHub Secret
- `NODE_ENV`: production
- `PORT`: 8080
- `NEXT_PUBLIC_API_URL`: Azure App Service URL

### Development (.env.local)
```bash
DATABASE_URL="sqlserver://localhost:1433;database=pryysm_dev;user=sa;password=YourPassword;encrypt=true;trustServerCertificate=true;"
NODE_ENV=development
```

## 🔄 Continuous Deployment

When you push to `new-main`:

1. GitHub Actions workflow runs
2. Creates `.env.production` with `DATABASE_URL` from secret
3. Runs `npx prisma generate`
4. Runs `npm run build`
5. Applies pending migrations (if any)
6. Deploys to Azure App Service

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma Azure SQL Guide](https://www.prisma.io/docs/orm/overview/databases/sql-server)
- [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

## ✨ Next Steps

1. ✅ Database setup complete
2. 🔄 Next deployment will automatically use the connection string
3. 📱 Test authentication and data persistence
4. 🚀 Monitor Azure logs for any connection issues
