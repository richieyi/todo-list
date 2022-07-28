import { PrismaClient } from '@prisma/client';
import { data } from '../data';
const prisma = new PrismaClient();

async function main() {
  await prisma.todoList.create({
    data: {
      id: '1',
      name: 'Shopping List',
    },
  });

  await prisma.task.createMany({
    data: data,
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
