'use client'
import { useState, useEffect } from 'react'

const KEY = 'hive_welcomed_hivememoryspace'

export default function FirstVisitCard() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-sm mx-auto bg-zinc-900 border border-amber-400/30 rounded-2xl p-4 shadow-xl">
      <p className="text-sm text-zinc-300 mb-3">Store memories. Search by meaning.</p>
      <button
        onClick={() => { localStorage.setItem(KEY, '1'); setVisible(false) }}
        className="w-full bg-amber-400 text-zinc-950 text-sm font-bold py-2 rounded-lg hover:bg-amber-300 transition-colors"
      >
        Start remembering
      </button>
    </div>
  )
}
