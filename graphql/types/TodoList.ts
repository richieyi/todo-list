import { objectType, extendType, nonNull, stringArg } from 'nexus';
import { Todo } from './Todo';

// TodoList object type
export const TodoList = objectType({
  name: 'TodoList',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.string('userId');
    t.nonNull.list.field('todos', {
      type: Todo,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.todoList
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .todos();
      },
    });
  },
});

// Query for todo lists
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
        userId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.todoList.create({
          data: {
            name: args.name,
            userId: args.userId,
          },
        });
      },
    });
  },
});

export const UpdateTodoListMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateTodoList', {
      type: TodoList,
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.todoList.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name,
          },
        });
      },
    });
  },
});

export const DeleteTodoListMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteTodoList', {
      type: TodoList,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        await ctx.prisma.todo.deleteMany({
          where: {
            todoListId: args.id,
          },
        });

        return await ctx.prisma.todoList.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});