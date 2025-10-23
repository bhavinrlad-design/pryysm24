import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')
  
  try {
    // Delete existing users and data to start fresh
    await prisma.printJob.deleteMany({})
    await prisma.material.deleteMany({})
    await prisma.printer.deleteMany({})
    await prisma.session.deleteMany({})
    await prisma.user.deleteMany({})
    
    console.log('✅ Cleared existing data')

    // Create demo users with bcryptjs hashing
    console.log('👤 Creating demo users...')
    
    // Hash passwords using bcryptjs (10 salt rounds)
    const demoHash = await bcrypt.hash('demo123', 10)
    const adminHash = await bcrypt.hash('AdminPassword123', 10)
    const masterHash = await bcrypt.hash('MasterPass123', 10)
    
    const user1 = await prisma.user.create({
      data: {
        email: 'demo@prysm.com',
        name: 'Demo User',
        passwordHash: demoHash,
        role: 'admin',
        companyName: '3D Prodigy Demo',
        numPrinters: '5',
        country: 'United States',
        industry: 'Manufacturing'
      }
    })
    
    const user2 = await prisma.user.create({
      data: {
        email: 'admin@prysm.com',
        name: 'Admin User',
        passwordHash: adminHash,
        role: 'admin',
        companyName: '3D Prodigy Inc',
        numPrinters: '10',
        country: 'United States',
        industry: '3D Printing'
      }
    })
    
    const user3 = await prisma.user.create({
      data: {
        email: 'LAD@admin.com',
        name: 'LAD',
        passwordHash: masterHash,
        role: 'master',
        companyName: 'Master Admin',
        numPrinters: '20',
        country: 'United States',
        industry: 'Management'
      }
    })
    
    console.log('✅ Created demo users:')
    console.log(`   - ${user1.email} / demo123`)
    console.log(`   - ${user2.email} / AdminPassword123`)
    console.log(`   - ${user3.email} / MasterPass123`)

    // Seed printers
    console.log('🖨️  Creating printers...')
    const p1 = await prisma.printer.create({ data: { name: 'Printer A', status: 'idle', location: 'Garage' } })
    const p2 = await prisma.printer.create({ data: { name: 'Printer B', status: 'printing', location: 'Workshop' } })
    console.log('✅ Created 2 printers')

    // Seed materials
    console.log('📦 Creating materials...')
    const m1 = await prisma.material.create({ data: { name: 'PLA Black', type: 'PLA', color: 'black', quantity: 150 } })
    const m2 = await prisma.material.create({ data: { name: 'PLA White', type: 'PLA', color: 'white', quantity: 200 } })
    console.log('✅ Created 2 materials')

    // Seed print jobs
    console.log('📋 Creating print jobs...')
    await prisma.printJob.create({ data: { name: 'Test Print 1', status: 'queued', printerId: p1.id, materialId: m1.id, fileUrl: '' } })
    await prisma.printJob.create({ data: { name: 'Widget Case', status: 'printing', printerId: p2.id, materialId: m2.id, fileUrl: '' } })
    console.log('✅ Created 2 print jobs')

    console.log('\n✅ Database seeded successfully!')
    console.log('\n🔐 Test Credentials:')
    console.log('   Email: demo@prysm.com')
    console.log('   Password: demo123')
    console.log('\n🔐 Admin Credentials:')
    console.log('   Email: admin@prysm.com')
    console.log('   Password: AdminPassword123')
    console.log('\n🔐 Master Credentials:')
    console.log('   Email: LAD@admin.com')
    console.log('   Password: MasterPass123')
    
  } catch (error) {
    console.error('❌ Seeding error:', error)
    throw error
  }
}

main()
  .catch(e => { 
    console.error('❌ Fatal error:', e)
    process.exit(1) 
  })
  .finally(async () => await prisma.$disconnect())