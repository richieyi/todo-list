import { objectType, extendType } from 'nexus';
import { Task } from './Task';

export const TodoList = objectType({
  name: 'TodoList',
  definition(t) {
    t.string('id');
    t.string('name');
    t.list.field('tasks', {
      type: Task,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.todoList
          .findUnique({
            where: {
              id: _parent.id as string,
            },
          })
          .tasks();
      },
    });
  },
});

export const TodoListsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('todoLists', {
      type: TodoList,
      resolve(_parent, _args, ctx) {
        return ctx.prisma.todoList.findMany();
      },
    });
  },
});
