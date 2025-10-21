import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // seed printers
  const p1 = await prisma.printer.create({ data: { name: 'Printer A', status: 'idle', location: 'Garage' } })
  const p2 = await prisma.printer.create({ data: { name: 'Printer B', status: 'printing', location: 'Workshop' } })
  // seed materials
  const m1 = await prisma.material.create({ data: { name: 'PLA Black', type: 'PLA', color: 'black', quantity: 150 } })
  const m2 = await prisma.material.create({ data: { name: 'PLA White', type: 'PLA', color: 'white', quantity: 200 } })
  // seed print jobs
  await prisma.printJob.create({ data: { name: 'Test Print 1', status: 'queued', printerId: p1.id, materialId: m1.id, fileUrl: '' } })
  await prisma.printJob.create({ data: { name: 'Widget Case', status: 'printing', printerId: p2.id, materialId: m2.id, fileUrl: '' } })
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => await prisma.$disconnect())
