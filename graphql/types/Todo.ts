import {
  objectType,
  extendType,
  stringArg,
  booleanArg,
  nonNull,
} from 'nexus';

// Todo object type
export const Todo = objectType({
  name: 'Todo',
  definition(t) {
    t.string('id');
    t.string('name');
    t.boolean('completed');
    t.string('todoListId');
    // t.list.field('todos', {
    //   type: 'Todo',
    //   async resolve(_parent, _args, ctx) {
    //     return await ctx.prisma.todo.findMany({
    //       where: {
    //         todoListId: args.todoListId,
    //       },
    //     });
    //   },
    // });
  },
});

// Query for many todos
export const TodosQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('todos', {
      type: Todo,
      args: { todoListId: nonNull(stringArg()) },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.todo.findMany({
          where: {
            todoListId: args.todoListId,
          },
        });
      },
    });
  },
});

// Mutation to create todo
export const CreateTodoMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTodo', {
      type: Todo,
      args: {
        name: nonNull(stringArg()),
        todoListId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.todo.create({
          data: {
            name: args.name,
            completed: false,
            todoListId: args.todoListId,
          },
        });
      },
    });
  },
});

// Mutation to update todo
export const UpdateTodoMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateTodo', {
      type: Todo,
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
        completed: nonNull(booleanArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.todo.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name,
            completed: args.completed,
          },
        });
      },
    });
  },
});

// Mutation to delete todo
export const DeleteTodoMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteTodo', {
      type: Todo,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.todo.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
