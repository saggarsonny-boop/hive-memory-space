import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getMemory } from '@/lib/db'
import Link from 'next/link'

export default async function MemoryPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/')

  const { id } = await params
  const memory = await getMemory(id, session.user.id)
  if (!memory) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-xs text-zinc-500 hover:text-zinc-400 mb-6 inline-flex items-center gap-1">
          ← Back
        </Link>

        <article className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-5">
          <h1 className="text-xl font-bold text-zinc-100">{memory.title ?? 'Untitled'}</h1>

          <div className="text-xs text-zinc-500">
            {new Date(memory.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>

          {memory.content && (
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{memory.content}</p>
          )}

          {memory.blob_url && (
            <a
              href={`/api/files/${memory.id}`}
              className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-amber-400/20 transition-colors"
            >
              📎 Download file
            </a>
          )}

          {memory.meaning && (
            <div className="border-t border-zinc-800 pt-4">
              <div className="text-xs text-zinc-600 uppercase tracking-widest mb-2">Meaning</div>
              <p className="text-zinc-400 text-sm leading-relaxed">{memory.meaning}</p>
            </div>
          )}

          {memory.summary && (
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-widest mb-2">Summary</div>
              <p className="text-zinc-400 text-sm">{memory.summary}</p>
            </div>
          )}

          {memory.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {memory.tags.map(tag => (
                <span key={tag} className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </article>
      </div>
    </main>
  )
}
