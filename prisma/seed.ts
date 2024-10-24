import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert roles
  await prisma.role.upsert({
    where: { name: 'konseli' },
    update: {},
    create: {
      name: 'konseli',
    },
  });

  await prisma.role.upsert({
    where: { name: 'konselor' },
    update: {},
    create: {
      name: 'konselor',
    },
  });

  await prisma.role.upsert({
    where: { name: 'tim konseling' },
    update: {},
    create: {
      name: 'tim konseling',
    },
  });

  await prisma.role.upsert({
    where: { name: 'pimpinan' },
    update: {},
    create: {
      name: 'pimpinan',
    },
  });

  // Insert jam slots
  const jamList = [
    { waktu: '09:00-10:00' },
    { waktu: '10:00-11:00' },
    { waktu: '11:00-12:00' },
    { waktu: '13:00-14:00' },
    { waktu: '14:00-15:00' },
  ];

  for (const jam of jamList) {
    await prisma.jam.upsert({
      where: { waktu: jam.waktu },
      update: {}, // Jika sudah ada, tidak perlu mengubah apa-apa
      create: {
        waktu: jam.waktu,
      },
    });
  }

  console.log('Seeder selesai dijalankan untuk role dan jam!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
