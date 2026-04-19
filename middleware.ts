export { auth as default } from '@/lib/auth'

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
