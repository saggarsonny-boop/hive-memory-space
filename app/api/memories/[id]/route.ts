import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getMemory, deleteMemory } from '@/lib/db'
import { deleteBlobByUrl } from '@/lib/blob'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const memory = await getMemory(id, session.user.id)
  if (!memory) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(memory)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const memory = await getMemory(id, session.user.id)
  if (!memory) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (memory.blob_url) {
    await deleteBlobByUrl(memory.blob_url)
  }

  await deleteMemory(id, session.user.id)
  return NextResponse.json({ ok: true })
}
