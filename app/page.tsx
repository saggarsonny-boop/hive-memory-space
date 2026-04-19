'use client'
import { signIn } from 'next-auth/react'
import AutoDemo from '@/components/AutoDemo'
import FirstVisitCard from '@/components/FirstVisitCard'
import LanguageSelector from '@/components/LanguageSelector'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-start px-4 py-12">
      <AutoDemo />
      <FirstVisitCard />
      <LanguageSelector />

      <div className="w-full max-w-xl text-center mt-8">
        <div className="mb-6">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">HiveMemorySpace</span>
        </div>
        <h1 className="text-4xl font-bold text-zinc-100 mb-4 leading-tight">
          Your memory,<br />
          <span className="text-amber-400">organised by meaning.</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto">
          Store notes, files, and thoughts. Search by meaning, not keywords. AI understands context.
        </p>

        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full max-w-xs mx-auto flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold py-3 px-8 rounded-xl transition-colors text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
          </svg>
          Continue with Google
        </button>

        <div className="mt-16 grid grid-cols-3 gap-6 text-left">
          {[
            { icon: '🧠', title: 'Store anything', desc: 'Text, notes, files — all searchable.' },
            { icon: '🔍', title: 'Search by meaning', desc: 'Ask questions, get relevant memories back.' },
            { icon: '✨', title: 'AI understands', desc: 'Claude extracts meaning and context automatically.' },
          ].map(f => (
            <div key={f.title} className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-semibold text-zinc-100 text-sm mb-1">{f.title}</div>
              <div className="text-zinc-500 text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        <footer className="mt-16 text-xs text-zinc-700">
          No ads. No investors. No agenda. · <a href="https://hive.baby" className="text-zinc-600 hover:text-zinc-500">hive.baby</a>
        </footer>
      </div>
    </main>
  )
}
