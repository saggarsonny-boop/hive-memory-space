import { NextResponse } from 'next/server'

export default function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard(.*)',
    '/memory(.*)',
    '/api/upload(.*)',
    '/api/embed(.*)',
    '/api/retrieve(.*)',
    '/api/memories(.*)',
    '/api/files(.*)',
  ],
}
