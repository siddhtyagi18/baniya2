# Research for Phase 3: Engine

## Phase Description
Build workflow execution engine with DAG processing and node handlers.

## Key Findings from Context
- DAG execution using topological sort (Kahn's algorithm)
- Nodes in same tier execute in parallel (Promise.all)
- Each node receives merged output of all upstream nodes as input
- On error: mark node as 'error', continue other branches
- Emit WebSocket events on every state change
- 20 specific node types with defined behaviors
- Node handler interface with execute function
- Audit log writer and query API
- Workflow engine core

## Implementation Approach
1. Workflow Engine Core:
   - Create `packages/@baniya/workflow-engine/src/executor.ts` with:
     - Topological sort implementation (Kahn's algorithm)
     - Tier-based parallel execution
     - Input merging from upstream nodes
     - Error handling (continue other branches)
     - WebSocket event emission
   - Create `packages/@baniya/workflow-engine/src/types.ts` for engine-specific types
   - Create `packages/@baniya/workflow-engine/src/workflow-engine.ts` as main entry point

2. Node Handlers:
   - Create `packages/@baniya/workflow-engine/src/handlers/` directory
   - Implement handler for each of the 20 node types
   - Each handler follows the NodeHandler interface
   - Handlers receive input, config, and context
   - Handlers return output structure (main, true, false, error)

3. Nodes Registry:
   - Create `packages/@baniya/nodes/src/registry.ts` with:
     - Metadata for all node types
     - Display properties (label, color, icon)
     - Config schemas for each node type
   - Create `packages/@baniya/nodes/src/node-types.ts` with constants
   - Create `packages/@baniya/nodes/src/index.ts` exporting the registry

4. Audit Logger:
   - Create `packages/@baniya/audit-logger/src/audit-logger.ts` with:
     - Write function to append audit entries
     - Query function to retrieve audit entries
     - Entity definition matching context.md
   - Create `packages/@baniya/audit-logger/src/types.ts` for audit-related types

5. Multiple Node Creation Support:
   - This will be implemented through the node configuration system
   - Nodes registry will support templates/configurations for creating similar nodes
   - AI nodes (llm, classify, etc.) can be instantiated with different configs
   - The workflow definition will contain the specific configuration for each node instance

## Files to Create
- Workflow Engine:
  - `packages/@baniya/workflow-engine/package.json`
  - `packages/@baniya/workflow-engine/tsconfig.json`
  - `packages/@baniya/workflow-engine/src/executor.ts`
  - `packages/@baniya/workflow-engine/src/types.ts`
  - `packages/@baniya/workflow-engine/src/handlers/` (20 handler files)
  - `packages/@baniya/workflow-engine/src/workflow-engine.ts`

- Nodes Registry:
  - `packages/@baniya/nodes/package.json`
  - `packages/@baniya/nodes/tsconfig.json`
  - `packages/@baniya/nodes/src/registry.ts`
  - `packages/@baniya/nodes/src/node-types.ts`
  - `packages/@baniya/nodes/src/index.ts`

- Audit Logger:
  - `packages/@baniya/audit-logger/package.json`
  - `packages/@baniya/audit-logger/tsconfig.json`
  - `packages/@baniya/audit-logger/src/audit-logger.ts`
  - `packages/@baniya/audit-logger/src/types.ts`

## Dependencies
- No external dependencies beyond @baniya/types for all engine packages
- Engine packages depend on each other: workflow-engine depends on types, nodes, audit-logger

## Risks and Mitigations
- DAG sorting: implement Kahn's algorithm correctly, handle circular dependencies
- Parallel execution: properly wait for all nodes in a tier before proceeding
- Input merging: correctly merge outputs from multiple upstream nodes
- Error handling: ensure errors don't break the entire execution
- WebSocket events: emit correct events at correct times
- Node handlers: ensure each of the 20 types behaves exactly as specified
- Audit logger: ensure append-only behavior, correct schema matching

## Open Questions
- Exact structure of the ExecutionContext passed to node handlers
- Whether to implement node handlers as classes or functions
- How to handle complex config schemas for nodes (especially expression-based ones)
- Whether to include utility functions for common node operations
- How to test the workflow engine effectively (unit tests vs integration tests)

## Conclusion
The engine phase requires building three core packages: workflow-engine, nodes, and audit-logger. The workflow-engine contains the DAG execution logic and node handlers. The nodes package provides the registry and metadata for all node types. The audit-logger handles persistence and querying of audit entries. All packages must work together to execute workflows correctly according to the specification.