import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { insertMemory, updateMemoryAI } from '@/lib/db'
import { uploadBlob } from '@/lib/blob'
import { extractMeaning } from '@/lib/ai'
import { storeEmbedding } from '@/lib/embeddings'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = session.user.id
  const contentType = req.headers.get('content-type') ?? ''

  let memoryId: string
  let textForEmbedding: string

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    const file = form.get('file') as File | null
    const title = form.get('title') as string | undefined

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const { url, pathname } = await uploadBlob(buffer, file.name, file.type)

    memoryId = await insertMemory(userId, {
      title: title || file.name,
      blobUrl: url,
      blobKey: pathname,
      mimeType: file.type,
      fileSizeBytes: file.size,
    })

    textForEmbedding = title || file.name
  } else {
    const body = await req.json() as { text?: string; title?: string }
    if (!body.text) return NextResponse.json({ error: 'No text provided' }, { status: 400 })

    memoryId = await insertMemory(userId, {
      title: body.title,
      content: body.text,
    })

    textForEmbedding = body.text
  }

  // AI enrichment + embedding (async-ish but awaited for simplicity in v1)
  const analysis = await extractMeaning(textForEmbedding)
  await updateMemoryAI(memoryId, analysis)
  await storeEmbedding(memoryId, textForEmbedding)

  return NextResponse.json({ memoryId, ...analysis })
}
