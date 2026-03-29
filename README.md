# Baniya

> Shrewd routing. Zero waste. Your data stays where it belongs.

Baniya is a visual AI pipeline builder. Users drag nodes onto a canvas, connect them with edges, and run workflows. The core differentiator is **automatic data sensitivity classification** — before every LLM call, Baniya reads the payload, detects PII, and routes the prompt to the cheapest model that is legally allowed to see that data. Private data stays local. Public data goes cloud. Every decision is logged.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3, TypeScript, Vite, Pinia, Vue Router |
| Canvas | @vue-flow/core |
| Charts | Chart.js |
| Backend | Node.js, Express.js, TypeScript |
| Auth | JWT, bcrypt |
| Database | PostgreSQL 16, TypeORM |
| Local LLMs | Ollama, LM Studio |
| Cloud LLMs | OpenAI, Anthropic, Gemini |
| Monorepo | pnpm workspaces |

## Quick Start

```bash
# Install dependencies
pnpm install

# Start PostgreSQL
docker compose up postgres -d

# Run dev servers
pnpm dev
```

## Project Structure

```
baniya/
├── packages/
│   ├── @baniya/types/            ← shared TypeScript interfaces
│   ├── @baniya/data-classifier/  ← PII detection engine
│   ├── @baniya/llm-router/       ← routing + provider adapters
│   ├── @baniya/audit-logger/     ← audit log writer + query API
│   ├── @baniya/workflow-engine/  ← DAG execution core
│   └── @baniya/nodes/            ← node type registry + metadata
└── apps/
    ├── server/                   ← Express API + WebSocket
    └── editor/                   ← Vue 3 canvas frontend
```

## License

MIT
