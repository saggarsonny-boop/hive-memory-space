import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { searchByVector } from '@/lib/db'
import { embedQuery } from '@/lib/embeddings'
import { synthesiseResponse } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { query } = await req.json() as { query?: string }
  if (!query) return NextResponse.json({ error: 'query required' }, { status: 400 })

  const queryEmbedding = await embedQuery(query)
  const memories = await searchByVector(session.user.id, queryEmbedding, 5)

  if (memories.length === 0) {
    return NextResponse.json({ answer: "I couldn't find any relevant memories for that query.", sources: [] })
  }

  const answer = await synthesiseResponse(query, memories)
  return NextResponse.json({ answer, sources: memories })
}
