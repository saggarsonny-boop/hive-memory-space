import { sql } from '@vercel/postgres'

export interface Memory {
  id: string
  user_id: string
  title: string | null
  content: string | null
  blob_url: string | null
  blob_key: string | null
  mime_type: string | null
  file_size_bytes: number | null
  meaning: string | null
  summary: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

export async function getMemory(id: string, userId: string): Promise<Memory | null> {
  const result = await sql<Memory>`
    SELECT * FROM memories WHERE id = ${id} AND user_id = ${userId}
  `
  return result.rows[0] ?? null
}

export async function listMemories(userId: string, limit = 20, offset = 0): Promise<Memory[]> {
  const result = await sql<Memory>`
    SELECT id, user_id, title, content, blob_url, blob_key, mime_type,
           file_size_bytes, meaning, summary, tags, created_at, updated_at
    FROM memories
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `
  return result.rows
}

export async function deleteMemory(id: string, userId: string): Promise<void> {
  await sql`DELETE FROM memories WHERE id = ${id} AND user_id = ${userId}`
}

export async function upsertUser(id: string, email: string, name?: string | null, image?: string | null): Promise<void> {
  await sql`
    INSERT INTO users (id, email, name, image)
    VALUES (${id}, ${email}, ${name ?? null}, ${image ?? null})
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, image = EXCLUDED.image
  `
}

export async function insertMemory(userId: string, data: {
  title?: string
  content?: string
  blobUrl?: string
  blobKey?: string
  mimeType?: string
  fileSizeBytes?: number
}): Promise<string> {
  const result = await sql<{ id: string }>`
    INSERT INTO memories (user_id, title, content, blob_url, blob_key, mime_type, file_size_bytes)
    VALUES (
      ${userId},
      ${data.title ?? null},
      ${data.content ?? null},
      ${data.blobUrl ?? null},
      ${data.blobKey ?? null},
      ${data.mimeType ?? null},
      ${data.fileSizeBytes ?? null}
    )
    RETURNING id
  `
  return result.rows[0].id
}

export async function updateMemoryAI(id: string, data: {
  meaning: string
  summary: string
  tags: string[]
  title?: string
}): Promise<void> {
  await sql`
    UPDATE memories SET
      meaning = ${data.meaning},
      summary = ${data.summary},
      tags = ${data.tags as unknown as string},
      title = COALESCE(${data.title ?? null}, title)
    WHERE id = ${id}
  `
}

export async function updateMemoryEmbedding(id: string, embedding: number[]): Promise<void> {
  const embeddingStr = `[${embedding.join(',')}]`
  await sql`UPDATE memories SET embedding = ${embeddingStr}::vector WHERE id = ${id}`
}

export async function searchByVector(userId: string, embedding: number[], limit = 5): Promise<Array<Memory & { similarity: number }>> {
  const embeddingStr = `[${embedding.join(',')}]`
  const result = await sql<Memory & { similarity: number }>`
    SELECT *, 1 - (embedding <=> ${embeddingStr}::vector) AS similarity
    FROM memories
    WHERE user_id = ${userId}
      AND embedding IS NOT NULL
      AND 1 - (embedding <=> ${embeddingStr}::vector) > 0.3
    ORDER BY embedding <=> ${embeddingStr}::vector
    LIMIT ${limit}
  `
  return result.rows
}
