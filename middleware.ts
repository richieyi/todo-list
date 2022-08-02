import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('token');
  const path = req.url;
  const url = req.nextUrl.clone();

  url.pathname = '/login';

  // Redirect if user is not logged in
  if (!cookie && path.includes('/todos')) {
    return NextResponse.rewrite(url);
  }
}
