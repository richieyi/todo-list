import { PrismaClient } from '@prisma/client';
import { decodeAuthHeader } from '../utils/auth';
import prisma from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
  userId?: string;
};
export async function createContext({
  req,
}: {
  req: any;
}): Promise<Context> {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
  };
}
