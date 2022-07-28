import { objectType, extendType } from 'nexus';
import { Task } from './Task';

// TodoList object type
export const TodoList = objectType({
  name: 'TodoList',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.nonNull.list.field('tasks', {
      type: Task,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.todoList
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .tasks();
      },
    });
  },
});

// Query for many todo lists
export const TodoListsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('todoLists', {
      type: TodoList,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.todoList.findMany();
      },
    });
  },
});
