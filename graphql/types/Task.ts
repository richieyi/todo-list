import {
  objectType,
  extendType,
  stringArg,
  booleanArg,
  nonNull,
} from 'nexus';

// Task object type
export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id');
    t.string('name');
    t.boolean('status');
    t.string('todoListId');
  },
});

// Query for many tasks
export const TasksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('tasks', {
      type: Task,
      args: { todoListId: nonNull(stringArg()) },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.task.findMany({
          where: {
            todoListId: args.todoListId,
          },
        });
      },
    });
  },
});

// Mutation to create task
export const CreateTaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTask', {
      type: Task,
      args: {
        name: nonNull(stringArg()),
        todoListId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.task.create({
          data: {
            name: args.name,
            status: false,
            todoListId: args.todoListId,
          },
        });
      },
    });
  },
});

// Mutation to update task
export const UpdateTaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateTask', {
      type: Task,
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
        status: nonNull(booleanArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.task.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name,
            status: args.status,
          },
        });
      },
    });
  },
});

// Mutation to delete task
export const DeleteTaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteTask', {
      type: Task,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.task.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
