import * as jwt from 'jsonwebtoken';

export interface AuthTokenPayload {
  userId: string;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token found');
  }
  return jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;
}

export function decodeCookie(token: string) {
  return jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;
}
