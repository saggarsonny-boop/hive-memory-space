'use client'
import { useState, useEffect } from 'react'
import MemoryCard from './MemoryCard'
import type { Memory } from '@/lib/db'

export default function MemoryList() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/memories')
      .then(r => r.json())
      .then(d => { setMemories((d as { memories: Memory[] }).memories ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-zinc-600 text-sm text-center py-8">Loading memories…</div>
  if (memories.length === 0) return (
    <div className="text-center py-12">
      <div className="text-4xl mb-3">🧠</div>
      <p className="text-zinc-600 text-sm">No memories yet. Add your first one above.</p>
    </div>
  )

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-600 uppercase tracking-widest">{memories.length} memories</p>
      {memories.map(m => <MemoryCard key={m.id} memory={m} />)}
    </div>
  )
}



<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>
