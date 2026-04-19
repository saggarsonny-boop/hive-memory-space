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
