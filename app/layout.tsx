import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HiveMemorySpace',
  description: 'Your memory, organised by meaning.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  )
}
