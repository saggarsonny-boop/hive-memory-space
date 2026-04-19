---
engine: HiveMemorySpace
id: hivememoryspace
domain: hivememoryspace.hive.baby
status: building
tier: 2
schema: memory-intelligence
safety: standard
stack: [nextjs, typescript, tailwind, authjs, vercel-postgres, vercel-blob, openai, anthropic]
version: 1.0.0
---

# HiveMemorySpace

Semantic memory engine. Store anything. Search by meaning. AI understands context.

## GrapplerHook
- owner_check: memory.user_id === session.user.id enforced on every read/write/delete
- blob_privacy: never expose direct blob URLs — proxy via /api/files/[id] only
- embedding_model: text-embedding-3-small (OpenAI) — vector(1536)
- ai_model: claude-sonnet-4-6 (Anthropic) — meaning extraction + synthesis
- vector_search: cosine similarity, threshold 0.3, top 5

## No ads. No investors. No agenda.
