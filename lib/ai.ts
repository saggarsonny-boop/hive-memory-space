import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface MemoryAnalysis {
  title: string
  meaning: string
  summary: string
  tags: string[]
}

export async function extractMeaning(content: string): Promise<MemoryAnalysis> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Analyse this memory/note and return a JSON object with these fields:
- title: short descriptive title (max 60 chars)
- meaning: what this memory means or why it matters (1-2 sentences)
- summary: concise summary (1 sentence)
- tags: array of 3-8 relevant tags (lowercase, no spaces, use hyphens)

Memory:
${content}

Return only valid JSON, no markdown.`,
    }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  try {
    return JSON.parse(text) as MemoryAnalysis
  } catch {
    return {
      title: content.slice(0, 60),
      meaning: content,
      summary: content.slice(0, 100),
      tags: [],
    }
  }
}

export async function synthesiseResponse(
  query: string,
  memories: Array<{ content: string | null; meaning: string | null; similarity: number }>
): Promise<string> {
  const context = memories
    .map((m, i) => `[${i + 1}] (relevance: ${Math.round(m.similarity * 100)}%)\n${m.meaning || m.content || ''}`)
    .join('\n\n')

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `The user asked: "${query}"

Here are relevant memories from their personal knowledge base:

${context}

Answer their question based on these memories. Be specific and reference the memories. If the memories don't contain relevant information, say so clearly.`,
    }],
  })

  return message.content[0].type === 'text' ? message.content[0].text : 'No answer could be generated.'
}
