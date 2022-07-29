import { objectType, extendType, nonNull, stringArg } from 'nexus';
import { Todo } from './Todo';

// TodoList object type
export const TodoList = objectType({
  name: 'TodoList',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.nonNull.list.field('todos', {
      type: Todo,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.todoList
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .todos();
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

export const CreateTodoListMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTodoList', {
      type: TodoList,
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_parents, args, ctx) {
        return await ctx.prisma.todoList.create({
          data: {
            name: args.name,
          },
        });
      },
    });
  },
});
