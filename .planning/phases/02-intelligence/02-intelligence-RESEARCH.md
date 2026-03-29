# Research for Phase 2: Intelligence

## Phase Description
Implement data sensitivity classification and LLM routing capabilities.

## Key Findings from Context
- The data classifier must detect Indian PII patterns (Aadhaar, PAN, phone, email, bank account, etc.) and map to sensitivity levels.
- The LLM router must route requests based on sensitivity: critical/private -> local, internal/mixed -> hybrid, public -> cloud.
- Local providers: Ollama (port 11434) and LM Studio (port 1234) with health checks and 30-second caching.
- Cloud providers: OpenAI, Anthropic, Google Gemini with API keys from environment variables.
- Hybrid path: sanitize PII with placeholders, send to cloud, then reinject.
- Hard block: critical data cannot go to cloud (BANIYA_BLOCK_CLOUD_FOR=critical).
- Cost estimation using token prices from context.md.
- Provider status endpoint to report availability.

## Implementation Approach
1. Data Classifier:
   - Create `packages/@baniya/data-classifier/src/patterns/india-pii.ts` with regex patterns.
   - Create a classifier function that scans payloads recursively, returns highest sensitivity, detected patterns, confidence.
   - Confidence: 0.95 if no patterns, else min(0.7 + 0.1 * patterns.length, 0.99).
   - Must complete in under 50ms for payloads under 100KB.

2. LLM Router:
   - Create `packages/@baniya/llm-router/src/router.ts` with:
     - Local provider detection (Ollama, LM Studio) with caching.
     - Cloud provider initialization (OpenAI, Anthropic, Gemini) using API keys from env.
     - Sanitizer for hybrid routing (in-memory map of placeholders to originals).
     - Routing logic based on classification result.
     - Cost estimation using token prices.
     - Hard block for critical -> cloud.
   - Create provider adapters for each service (Ollama, LM Studio, OpenAI, Anthropic, Gemini) that conform to a common interface.

3. Provider Status:
   - Create endpoint to return status of all providers (local and cloud).

## Files to Create
- `packages/@baniya/data-classifier/package.json`
- `packages/@baniya/data-classifier/tsconfig.json`
- `packages/@baniya/data-classifier/src/patterns/india-pii.ts`
- `packages/@baniya/data-classifier/src/classifier.ts`
- `packages/@baniya/llm-router/package.json`
- `packages/@baniya/llm-router/tsconfig.json`
- `packages/@baniya/llm-router/src/router.ts`
- `packages/@baniya/llm-router/src/providers/` (adapters for each)
- `packages/@baniya/llm-router/src/sanitizer.ts`
- `packages/@baniya/llm-router/src/cost-estimator.ts`

## Dependencies
- `openai`, `@anthropic-ai/sdk`, `@google/generative-ai` for cloud providers.
- No dependencies for local providers (HTTP calls to localhost).

## Risks and Mitigations
- Local provider detection: cache for 30 seconds, handle timeouts and connection errors.
- Sanitizer: ensure map is cleared after re-injection to prevent memory leaks.
- Cost estimation: use exact token prices from context.md.
- Hard block: throw error if critical data attempted to route to cloud.

## Open Questions
- Exact format of environment variables for API keys (to be consistent with context.md: OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY).
- Whether to implement provider adapters as classes or functions.
- How to handle partial failures in hybrid routing (e.g., cloud call succeeds but reinjection fails).

## Conclusion
The intelligence phase requires building two core packages: data-classifier and llm-router. The data-classifier is self-contained. The llm-router depends on cloud provider SDKs and must implement caching, sanitization, and routing logic. Both must be thoroughly tested to ensure correctness and performance.