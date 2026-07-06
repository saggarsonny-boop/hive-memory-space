'use client'
import { useState, useRef, type FormEvent } from 'react'

type Tab = 'text' | 'file'

export default function UploadBox({ onUploaded }: { onUploaded?: () => void }) {
  const [tab, setTab] = useState<Tab>('text')
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function submitText(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, title: title || undefined }),
    })
    setText('')
    setTitle('')
    setSuccess(true)
    setLoading(false)
    setTimeout(() => setSuccess(false), 2000)
    onUploaded?.()
  }

  async function submitFile() {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setLoading(true)
    const form = new FormData()
    form.append('file', file)
    if (title) form.append('title', title)
    await fetch('/api/upload', { method: 'POST', body: form })
    setTitle('')
    if (fileRef.current) fileRef.current.value = ''
    setSuccess(true)
    setLoading(false)
    setTimeout(() => setSuccess(false), 2000)
    onUploaded?.()
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <div className="flex gap-1 mb-4">
        {(['text', 'file'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t ? 'bg-amber-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {t === 'text' ? 'Text' : 'File'}
          </button>
        ))}
      </div>

      {tab === 'text' ? (
        <form onSubmit={submitText} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/50"
          />
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write a memory, note, or anything you want to remember…"
            rows={4}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/50 resize-none"
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="w-full bg-amber-400 text-zinc-950 font-bold py-2.5 rounded-lg text-sm disabled:opacity-40 hover:bg-amber-300 transition-colors"
          >
            {loading ? 'Saving…' : success ? 'Saved ✓' : 'Save memory'}
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/50"
          />
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-amber-400/40 transition-colors">
            <span className="text-zinc-600 text-sm">Drop file or click to browse</span>
            <input ref={fileRef} type="file" className="hidden" onChange={submitFile} />
          </label>
          {loading && <p className="text-xs text-zinc-500 text-center">Uploading…</p>}
          {success && <p className="text-xs text-amber-400 text-center">Saved ✓</p>}
        </div>
      )}
    </div>
  )
}



<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>
