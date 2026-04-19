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
- Engine: HiveMemorySpace
- Repo: hive-memory-space
- Domain: hivememoryspace.hive.baby
- Branches: dev (feature work), main (deployment)
- Auth: Auth.js v5 with Google OAuth
- Database: Vercel Postgres with pgvector
- Storage: Vercel Blob, private access only through authenticated file routes
- owner_check: memory.user_id === session.user.id enforced on every read/write/delete
- blob_privacy: never expose direct blob URLs — proxy via /api/files/[id] only
- embedding_model: text-embedding-3-small (OpenAI) — vector(1536)
- ai_model: claude-sonnet-4-6 (Anthropic) — meaning extraction + synthesis
- vector_search: cosine similarity, threshold 0.3, top 5
- File access policy: every file flows through /api/files/[id], verifies session, verifies ownership, then streams content

## No ads. No investors. No agenda.
