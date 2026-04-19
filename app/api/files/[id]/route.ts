import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getMemory } from '@/lib/db'
import { streamBlobContent } from '@/lib/blob'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 })

  const { id } = await params
  const memory = await getMemory(id, session.user.id)

  if (!memory) return new NextResponse('Not found', { status: 404 })
  if (memory.user_id !== session.user.id) return new NextResponse('Forbidden', { status: 403 })
  if (!memory.blob_url) return new NextResponse('No file', { status: 404 })

  const blobResponse = await streamBlobContent(memory.blob_url)
  return new NextResponse(blobResponse.body, {
    headers: {
      'Content-Type': memory.mime_type ?? 'application/octet-stream',
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
