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
