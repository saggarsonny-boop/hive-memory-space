import Link from 'next/link'
import type { Memory } from '@/lib/db'

export default function MemoryCard({ memory }: { memory: Memory }) {
  const excerpt = memory.summary || memory.content?.slice(0, 120) || 'No content'

  return (
    <Link href={`/memory/${memory.id}`} className="block bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-4 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-zinc-100 text-sm truncate mb-1">
            {memory.title ?? 'Untitled'}
          </h3>
          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{excerpt}</p>
        </div>
        <div className="text-zinc-700 text-xs whitespace-nowrap">
          {new Date(memory.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </div>
      </div>
      {memory.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {memory.tags.slice(0, 4).map(tag => (
            <span key={tag} className="bg-zinc-800 text-zinc-500 text-xs px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      )}
    </Link>
  )
}



<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>
