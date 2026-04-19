import OpenAI from 'openai'
import { updateMemoryEmbedding } from './db'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function embedText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

export async function embedQuery(query: string): Promise<number[]> {
  return embedText(query)
}

export async function storeEmbedding(memoryId: string, text: string): Promise<void> {
  const embedding = await embedText(text)
  await updateMemoryEmbedding(memoryId, embedding)
}
