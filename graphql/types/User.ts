import {
  objectType,
  extendType,
  stringArg,
  booleanArg,
  nonNull,
} from 'nexus';
import { TodoList } from './TodoList';

// User object type
export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.string('email');
    t.string('password');
    t.nonNull.list.field('todoList', {
      type: TodoList,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .todoList();
      },
    });
  },
});

// Query for many users
export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user.findMany();
      },
    });
  },
});

// Query for user
export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            id: ctx.userId,
          },
        });
      },
    });
  },
});