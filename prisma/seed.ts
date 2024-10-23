import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert roles
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const konseliRole = await prisma.role.upsert({
    where: { name: 'konseli' },
    update: {},
    create: {
      name: 'konseli',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const konselorRole = await prisma.role.upsert({
    where: { name: 'konselor' },
    update: {},
    create: {
      name: 'konselor',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const timRole = await prisma.role.upsert({
    where: { name: 'tim konseling' },
    update: {},
    create: {
      name: 'tim konseling',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pimpinanRole = await prisma.role.upsert({
    where: { name: 'pimpinan' },
    update: {},
    create: {
      name: 'pimpinan',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
