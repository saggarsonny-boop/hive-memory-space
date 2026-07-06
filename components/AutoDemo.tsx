'use client'
import { useState, useEffect } from 'react'

const DEMO_KEY = 'hive_demo_hivememoryspace'
const DEMO_QUERY = 'What do I know about the Paris trip?'
const DEMO_RESPONSE = `You have 3 memories about Paris:\n\n• "Met Sarah at the design conference — she knows the best hidden cafés near République"\n• "The Louvre takes a full day minimum, go early to beat crowds"\n• "Hotel tip: stay in the Marais for walkability"\n\nYou noted that Sarah was particularly helpful with local recommendations.`

export default function AutoDemo() {
  const [visible, setVisible] = useState(false)
  const [typed, setTyped] = useState('')
  const [showResponse, setShowResponse] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DEMO_KEY)) return
    setVisible(true)
    let i = 0
    const interval = setInterval(() => {
      if (i <= DEMO_QUERY.length) {
        setTyped(DEMO_QUERY.slice(0, i))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowResponse(true), 500)
        setTimeout(() => {
          setVisible(false)
          localStorage.setItem(DEMO_KEY, '1')
        }, 8000)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 px-4 pointer-events-none">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-2xl pointer-events-auto">
        <div className="text-xs text-zinc-600 uppercase tracking-widest mb-3">Live demo</div>
        <div className="bg-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 mb-3 min-h-[40px]">
          {typed}<span className="animate-pulse">|</span>
        </div>
        {showResponse && (
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-3 text-sm text-amber-100 whitespace-pre-line leading-relaxed">
            {DEMO_RESPONSE}
          </div>
        )}
      </div>
    </div>
  )
}



<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>
