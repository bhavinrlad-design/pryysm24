import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

async function main() {
  console.log('🌱 Seeding database...')

  // Seed users
  console.log('👥 Creating users...')
  const demoHash = await hashPassword('demo123')
  const adminHash = await hashPassword('AdminPassword123')
  const masterHash = await hashPassword('MasterPass123')

  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@prysm.com',
      name: 'Demo User',
      passwordHash: demoHash,
      role: 'admin',
      companyName: 'Demo Company',
      country: 'USA',
      industry: 'Manufacturing',
    },
  })
  console.log('✓ Demo user created:', demoUser.email)

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@prysm.com',
      name: 'Admin User',
      passwordHash: adminHash,
      role: 'admin',
      companyName: 'Pryysm Inc',
      country: 'UAE',
      industry: 'Technology',
    },
  })
  console.log('✓ Admin user created:', adminUser.email)

  const masterUser = await prisma.user.create({
    data: {
      email: 'master@prysm.com',
      name: 'Master Admin',
      passwordHash: masterHash,
      role: 'master',
      companyName: 'Pryysm Global',
      country: 'UAE',
      industry: 'Management',
    },
  })
  console.log('✓ Master user created:', masterUser.email)

  // Seed printers
  console.log('🖨️  Creating printers...')
  const p1 = await prisma.printer.create({ 
    data: { 
      name: 'Printer A', 
      status: 'idle', 
      location: 'Garage' 
    } 
  })
  console.log('✓ Printer A created')

  const p2 = await prisma.printer.create({ 
    data: { 
      name: 'Printer B', 
      status: 'printing', 
      location: 'Workshop' 
    } 
  })
  console.log('✓ Printer B created')

  // Seed materials
  console.log('📦 Creating materials...')
  const m1 = await prisma.material.create({ 
    data: { 
      name: 'PLA Black', 
      type: 'PLA', 
      color: 'black', 
      quantity: 150 
    } 
  })
  console.log('✓ PLA Black created')

  const m2 = await prisma.material.create({ 
    data: { 
      name: 'PLA White', 
      type: 'PLA', 
      color: 'white', 
      quantity: 200 
    } 
  })
  console.log('✓ PLA White created')

  // Seed print jobs
  console.log('⚙️  Creating print jobs...')
  await prisma.printJob.create({ 
    data: { 
      name: 'Test Print 1', 
      status: 'queued', 
      printerId: p1.id, 
      materialId: m1.id, 
      fileUrl: '' 
    } 
  })
  console.log('✓ Test Print 1 created')

  await prisma.printJob.create({ 
    data: { 
      name: 'Widget Case', 
      status: 'printing', 
      printerId: p2.id, 
      materialId: m2.id, 
      fileUrl: '' 
    } 
  })
  console.log('✓ Widget Case created')

  console.log('✅ Seeding complete!')
}

main()
  .catch(e => { 
    console.error('❌ Seeding error:', e)
    process.exit(1) 
  })
  .finally(async () => await prisma.$disconnect())

