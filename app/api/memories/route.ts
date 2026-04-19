import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { listMemories } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '20')
  const offset = (page - 1) * limit

  const memories = await listMemories(session.user.id, limit, offset)
  return NextResponse.json({ memories, page, limit })
}
