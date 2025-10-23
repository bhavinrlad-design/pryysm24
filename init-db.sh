#!/bin/bash

echo "🚀 Initializing Pryysm Database..."
echo ""

# Step 1: Generate Prisma Client
echo "📦 Step 1: Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
  echo "❌ Failed to generate Prisma client"
  exit 1
fi
echo "✅ Prisma client generated"
echo ""

# Step 2: Push database schema
echo "📊 Step 2: Pushing database schema..."
npx prisma db push
if [ $? -ne 0 ]; then
  echo "❌ Failed to push database schema"
  exit 1
fi
echo "✅ Database schema updated"
echo ""

# Step 3: Seed demo data
echo "🌱 Step 3: Seeding demo data..."
npm run db:seed
if [ $? -ne 0 ]; then
  echo "❌ Failed to seed database"
  exit 1
fi
echo "✅ Demo data seeded"
echo ""

echo "🎉 Database initialization complete!"
echo ""
echo "📝 Test Credentials:"
echo "   Demo: demo@prysm.com / demo123"
echo "   Admin: admin@prysm.com / AdminPassword123"
echo "   Master: LAD@admin.com / MasterPass123"
