import { PrismaClient } from '@prisma/client';
import { tasksData, todoListsData } from '../data';
const prisma = new PrismaClient();

async function main() {
  await prisma.todoList.createMany({
    data: todoListsData,
  });

  await prisma.task.createMany({
    data: tasksData,
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
