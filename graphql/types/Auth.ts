import { objectType, extendType, nonNull, stringArg } from 'nexus';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { User } from './User';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.field('user', {
      type: User,
    });
  },
});

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('logout', {
      type: AuthPayload,
      async resolve(_parent, _args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.userId },
        });

        const token = jwt.sign(
          { userId: user?.id },
          process.env.APP_SECRET as string
        );
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/',
          })
        );

        return {
          token,
          user,
        };
      },
    });
    t.nonNull.field('login', {
      type: AuthPayload,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: { email: args.email },
        });

        const isCorrectPassword = await bcrypt.compare(
          args.password,
          user?.password || ''
        );
        if (!user || !isCorrectPassword) {
          throw new Error('Invalid user or password');
        }

        const token = jwt.sign(
          { userId: user.id },
          process.env.APP_SECRET as string
        );
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60, // 1 hr
            sameSite: 'strict',
            path: '/',
          })
        );

        return {
          token,
          user,
        };
      },
    });
    t.nonNull.field('signUp', {
      type: AuthPayload,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const { email, name } = args;
        const password = await bcrypt.hash(args.password, 10);

        const user = await ctx.prisma.user.create({
          data: { email, name, password },
        });

        const token = jwt.sign(
          { userId: user.id },
          process.env.APP_SECRET as string
        );
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60, // 1 hr
            sameSite: 'strict',
            path: '/',
          })
        );

        return {
          token,
          user,
        };
      },
    });
  },
});
