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



<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>
