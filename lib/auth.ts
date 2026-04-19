import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { sql } from '@vercel/postgres'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (!user.id || !user.email) return false
      await sql`
        INSERT INTO users (id, email, name, image)
        VALUES (${user.id}, ${user.email}, ${user.name ?? null}, ${user.image ?? null})
        ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, image = EXCLUDED.image
      `
      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      return token
    },
  },
  pages: {
    signIn: '/',
  },
})
