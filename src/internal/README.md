# src/internal

Components used only by other components in the library. They follow the same
folder layout as `src/components/*` (see `.claude/rules/components.md`) but are
**not** re-exported from `src/components/index.ts`, so they are not part of the
public `altrone-ui` API and have no `mcp/docs` page.

Import them with the `internal/*` bare specifier (resolved via `baseUrl: ./src`),
e.g. `import { Badge } from 'internal/badge'`.

Move a component here when it exists purely to be composed by other components
and exposing it publicly would only add doc/support surface for no consumer gain.
