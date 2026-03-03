# API Backend Dependencies

This document explains why each external dependency exists in the `api-backend` service.

## Runtime Dependencies (`dependencies`)

### `fastify`
- **Why we use it:** High-performance HTTP framework for building the backend API.
- **Where it is used:** Server bootstrap and route handling in `src/server.ts`.
- **Benefit:** Fast request handling, built-in logger support, and TypeScript-friendly APIs.

### `socket.io`
- **Why we use it:** Real-time communication channel between backend and browser clients.
- **Where it is used:** WebSocket server setup in `src/server.ts` and user-targeted push logic in `src/services/socket.service.ts`.
- **Benefit:** Reliable event-based messaging, reconnection handling, and typed event contracts.

### `zod`
- **Why we use it:** Runtime schema validation for incoming request payloads.
- **Where it is used:** Payload validation for realtime navigation endpoint in `src/server.ts`.
- **Benefit:** Prevents invalid data from entering business logic and improves error clarity.

## Development Dependencies (`devDependencies`)

### `typescript`
- **Why we use it:** Compile-time type safety across the backend codebase.
- **Where it is used:** Build step via `npm run build` using `tsconfig.json`.
- **Benefit:** Earlier bug detection and safer refactoring.

### `ts-node-dev`
- **Why we use it:** Fast local development loop for TypeScript files.
- **Where it is used:** `npm run dev` script (`ts-node-dev --respawn --transpile-only src/server.ts`).
- **Benefit:** Auto-restarts server on file changes without manual rebuild.

### `@types/node`
- **Why we use it:** Type definitions for Node.js runtime APIs.
- **Where it is used:** TypeScript compiler context (`types: ["node"]` in `tsconfig.json`).
- **Benefit:** Accurate typing and IntelliSense for Node globals and built-in modules.

## Quick Rules for Adding New Dependencies

Before adding a package:
1. Confirm there is no existing dependency that already solves the problem.
2. Prefer packages with active maintenance and strong TypeScript support.
3. Add one-line usage notes in this file after installation.
4. Keep runtime dependencies minimal to reduce security and deployment risk.
