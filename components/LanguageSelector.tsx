'use client'
import { useState, useEffect } from 'react'

const LANG_KEY = 'hive_lang'
const LANGS = [
  { code: 'en', label: 'EN' }, { code: 'es', label: 'ES' }, { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' }, { code: 'zh', label: 'ZH' }, { code: 'de', label: 'DE' },
  { code: 'ja', label: 'JA' }, { code: 'pt', label: 'PT' }, { code: 'hi', label: 'HI' },
]

export function getLang(): string {
  if (typeof window === 'undefined') return 'en'
  return localStorage.getItem(LANG_KEY) ?? 'en'
}

export default function LanguageSelector() {
  const [lang, setLang] = useState('en')
  const [open, setOpen] = useState(false)

  useEffect(() => { setLang(getLang()) }, [])

  function select(code: string) {
    localStorage.setItem(LANG_KEY, code)
    setLang(code)
    setOpen(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        {lang.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-xl p-2 grid grid-cols-3 gap-1 shadow-xl min-w-[120px]">
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => select(l.code)}
              className={`text-xs px-2 py-1 rounded-lg transition-colors ${lang === l.code ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
