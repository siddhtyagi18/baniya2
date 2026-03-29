# Phase 3 Context: Engine Enhancement

## Vision
Enhance the engine phase to include workflow execution capabilities with DAG processing, node handlers, and support for creating multiple nodes from templates/configurations, while maintaining the core workflow execution model as specified in the context.md. This phase focuses on the core execution engine that powers Baniya's workflow capabilities.

## User Requirements
- Build workflow execution engine with DAG processing using topological sort (Kahn's algorithm)
- Implement parallel execution of nodes in the same tier using Promise.all
- Create node handler interface that supports all 20 node types specified in context.md
- Implement all 20 node types with their specific behaviors:
  * trigger.manual, trigger.webhook, trigger.schedule
  * ai.llm, ai.classify, ai.embed, ai.summarise, ai.extract, ai.rewrite, ai.translate, ai.moderate
  * logic.if, logic.switch, logic.merge, logic.loop, logic.wait
  * data.set, data.transform, data.filter, data.aggregate
  * output.response, output.log
- Build @baniya/nodes registry with metadata for all node types including display properties, config schemas, and colors
- Build @baniya/audit-logger entity with write and query capabilities for append-only audit log
- Support creating multiple nodes from a single configuration/template (e.g., AI nodes with different models/prompts)
- Ensure proper WebSocket event emission for execution monitoring
- Maintain compatibility with the data classifier and LLM router from Phase 2
- Ensure error handling: mark node as 'error' but continue other branches
- Support merged input from upstream nodes for each node execution

## Deferred Ideas
- Advanced execution features like pause/resume, step-through debugging
- Custom node marketplace or community contributions
- Advanced DAG visualization features beyond basic execution
- Persistent workflow state recovery after server restart

## Claude's Discretion
- Exact implementation of the DAG sorter and dispatcher (as long as it follows Kahn's algorithm)
- Specific structure of the node handler interface and execution context
- Implementation approach for the 20 node handlers (whether as separate files, classes, or functions)
- Structure of the nodes registry metadata (how config schemas, colors, etc. are stored)
- Implementation of the audit logger (whether as a class, service, or set of functions)
- Approach for supporting multiple nodes from single configuration (factory pattern, configuration-based, etc.)
- Specific WebSocket event structure beyond what's specified in context.md
- Error handling details and retry logic for failed nodes
- Whether to implement the engine as a class, service, or set of functions