# Phase 2 Context: Intelligence Enhancement

## Vision
Enhance the intelligence phase to include API key management for LLM providers and auto-detection of local LLMs, while building the data sensitivity classifier and LLM router as per the roadmap. This phase focuses on the core intelligence capabilities that enable Baniya to route LLM requests based on data sensitivity.

## User Requirements
- Implement data sensitivity classifier with patterns for Indian PII (Aadhaar, PAN, phone, email, etc.) as specified in context.md
- Build LLM router that can route requests to local providers (Ollama, LM Studio) and cloud providers (OpenAI, Anthropic, Google Gemini)
- Allow the LLM router to be configured with API keys for cloud providers via environment variables (to be managed by server in phase 4)
- Implement auto-detection of local LLMs (Ollama on port 11434, LM Studio on port 1234) with 30-second caching
- Implement the sanitizer for hybrid routing that replaces PII with typed placeholders (e.g., [EMAIL_1]) and maintains a reversible map
- Implement cost estimation using the token price table from context.md
- Implement routing logic: critical/private → local, internal/mixed → hybrid, public → cloud
- Enforce hard block: critical data cannot be routed to cloud (BANIYA_BLOCK_CLOUD_FOR=critical)
- Create provider status endpoint to report availability of local LLMs and configured cloud providers

## Deferred Ideas
- Saving API keys to the server with a database model and API for management (to be built in phase 4)
- Creating multiple nodes from a single node template or factory (to be considered in phase 3 or 5)
- Advanced API key features like encryption, rotation, and usage tracking (to be built in phase 4)

## Claude's Discretion
- Exact implementation of the sanitizer placeholder generation and map storage (in-memory only)
- Specific caching mechanism for local provider availability (implementation details)
- Error handling and retry logic for unavailable local LLMs
- The exact format and naming of environment variables for API keys (consistent with context.md)
- Structure of the LLM router's internal configuration and provider adapters
- Implementation of cost estimation utility (whether as a class or set of functions)
- Whether to implement provider adapters as separate classes or functions within the router