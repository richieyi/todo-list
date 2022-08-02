import { PrismaClient } from '@prisma/client';
import { decodeAuthHeader, decodeCookie } from '../utils/auth';
import prisma from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
  userId?: string;
  res: any;
};
export async function createContext({
  req,
  res,
}: {
  req: any;
  res: any;
}): Promise<Context> {
  // const token =
  //   req && req.headers.authorization
  //     ? decodeAuthHeader(req.headers.authorization)
  //     : null;
  const token = req.cookies['token']
    ? decodeCookie(req.cookies['token'])
    : null;

  return {
    prisma,
    userId: token?.userId,
    res,
  };
}
