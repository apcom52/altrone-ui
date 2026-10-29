# AGENTS.md — altrone-ui (core)

## Workspace instructions

Explicitly read ../AGENTS.md before working here and follow its workspace-wide rules. A session launched in this independent Git repository may not automatically discover parent instructions or skills. Shared rules are in ../.agents/rules/ and shared skills in ../.agents/skills/. Read the relevant SKILL.md explicitly if the skill is unavailable in the selector.

## Overview

`altrone-ui` — the component library published to npm as `altrone-ui`. This is the source of truth for every UI component used across the workspace (consumed by `docs/`, and by external apps). Consumers wrap their app in `<Application>` and use components from the library directly.

## Stack

| Tool         | Version | Notes                                            |
| ------------ | ------- | ------------------------------------------------ |
| React        | 19      | functional components + hooks only               |
| TypeScript   | 5.4     | strict mode                                      |
| SCSS Modules | —       | one `.module.scss` per component                 |
| Vite         | 5       | also used as library bundler (`vite-plugin-dts`) |
| Storybook    | 8       | stories live next to the component                |
| Vitest       | 1       | unit tests                                        |

## Structure

```
src/
  components/          # all UI components (one folder per component, see rules/components.md)
    application/        # <Application> — root provider (theme, locale, dialogs, toasts)
    <ComponentName>/     # each component follows the same layout (see rules/components.md)
  locales/              # i18n dictionaries: en, ru, fr, ge, sp
  utils/                # shared hooks and helpers
  global/               # SCSS variables, mixins, Storybook decorator
  types/                # shared TypeScript types (BasicComponentStyleConfig, etc.)
```

## Commands

```bash
npm run storybook          # component dev environment
npm run build               # library build (vite build)
npm run test:unit           # Vitest
npm run test:pre-release    # unit tests
npm run lint                 # ESLint
```

## Rules

Before work, explicitly read the applicable rule files below; these links are not automatic imports. For code changes always read typescript, comments, and communication. Paths are relative to this AGENTS.md.

- [typescript](../.agents/rules/typescript.md)
- [comments](../.agents/rules/comments.md)
- [communication](../.agents/rules/communication.md)
- [changelog](../.agents/rules/changelog.md)
- [components](../.agents/rules/components.md)
- [testing](../.agents/rules/testing.md)
- [storybook](../.agents/rules/storybook.md)
- [ref-forwarding](../.agents/rules/ref-forwarding.md)
- [ssr](../.agents/rules/ssr.md)
- [event-handlers](../.agents/rules/event-handlers.md)
- [namespace-exports](../.agents/rules/namespace-exports.md)
- [theming](../.agents/rules/theming.md)
- [localization](../.agents/rules/localization.md)
- [application-provider](../.agents/rules/application-provider.md)
- [configuration](../.agents/rules/configuration.md)
- [new-component-checklist](../.agents/rules/new-component-checklist.md)
- [sync-core-docs-mcp](../.agents/rules/sync-core-docs-mcp.md)
- [imperative-apis](../.agents/rules/imperative-apis.md)
- [target-architecture-status](../.agents/rules/target-architecture-status.md)
- Missing source rule: `../.agents/rules/application-screen.md`. Do not invent its contents; consult the workspace `core/ARCHITECTURE-V4.md` when needed.
- Missing source rule: `../.agents/rules/box.md`. Do not invent its contents; consult the workspace `core/ARCHITECTURE-V4.md` when needed.
- [radius](../.agents/rules/radius.md)
- [spacing](../.agents/rules/spacing.md)
- [typography](../.agents/rules/typography.md)
- [elevation](../.agents/rules/elevation.md)
- [color](../.agents/rules/color.md)
- [motion](../.agents/rules/motion.md)
- [dark-theme](../.agents/rules/dark-theme.md)
- [responsiveness](../.agents/rules/responsiveness.md)
- [accessibility](../.agents/rules/accessibility.md)
- [rejected](../.agents/rules/rejected.md)
