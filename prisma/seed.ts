import { PrismaClient } from '@prisma/client';
import { todosData, todoListsData } from '../data';
const prisma = new PrismaClient();

async function main() {
  await prisma.todoList.createMany({
    data: todoListsData,
  });

  await prisma.todo.createMany({
    data: todosData,
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
