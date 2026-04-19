import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getMemory } from '@/lib/db'
import { storeEmbedding } from '@/lib/embeddings'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { memoryId } = await req.json() as { memoryId?: string }
  if (!memoryId) return NextResponse.json({ error: 'memoryId required' }, { status: 400 })

  const memory = await getMemory(memoryId, session.user.id)
  if (!memory) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const text = memory.content || memory.meaning || memory.title || ''
  if (!text) return NextResponse.json({ error: 'No text to embed' }, { status: 400 })

  await storeEmbedding(memoryId, text)
  return NextResponse.json({ ok: true })
}
