'use client'
import { useState, type FormEvent } from 'react'
import type { Memory } from '@/lib/db'

interface RetrieveResponse {
  answer: string
  sources: (Memory & { similarity: number })[]
}

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<RetrieveResponse | null>(null)
  const [loading, setLoading] = useState(false)

  async function search(e: FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    const res = await fetch('/api/retrieve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
    const data = await res.json() as RetrieveResponse
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <form onSubmit={search} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask about your memories…"
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/50 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-amber-400 text-zinc-950 font-bold px-5 py-3 rounded-xl text-sm disabled:opacity-40 hover:bg-amber-300 transition-colors"
        >
          {loading ? '…' : 'Ask'}
        </button>
      </form>

      {result && (
        <div className="space-y-3">
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-4">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-widest mb-2">Answer</div>
            <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line">{result.answer}</p>
          </div>
          {result.sources.length > 0 && (
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-widest mb-2">Sources</div>
              <div className="space-y-2">
                {result.sources.map(s => (
                  <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-400">
                    <span className="font-semibold text-zinc-300">{s.title ?? 'Untitled'}</span>
                    <span className="ml-2 text-zinc-600">{Math.round(s.similarity * 100)}% match</span>
                    {s.summary && <p className="mt-1 text-zinc-500">{s.summary}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
