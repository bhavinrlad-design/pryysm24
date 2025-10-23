# Pryysm Database Initialization Script (Windows)

Write-Host "🚀 Initializing Pryysm Database..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Generate Prisma Client
Write-Host "📦 Step 1: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
  exit 1
}
Write-Host "✅ Prisma client generated" -ForegroundColor Green
Write-Host ""

# Step 2: Push database schema
Write-Host "📊 Step 2: Pushing database schema..." -ForegroundColor Yellow
npx prisma db push
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Failed to push database schema" -ForegroundColor Red
  exit 1
}
Write-Host "✅ Database schema updated" -ForegroundColor Green
Write-Host ""

# Step 3: Seed demo data
Write-Host "🌱 Step 3: Seeding demo data..." -ForegroundColor Yellow
npm run db:seed
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Failed to seed database" -ForegroundColor Red
  exit 1
}
Write-Host "✅ Demo data seeded" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 Database initialization complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Test Credentials:" -ForegroundColor Green
Write-Host "   Demo: demo@prysm.com / demo123"
Write-Host "   Admin: admin@prysm.com / AdminPassword123"
Write-Host "   Master: LAD@admin.com / MasterPass123"
