# CLAUDE.md — altrone-ui (core)

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
| Cypress      | 14      | visual regression tests                           |

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
npm run test:e2e-chrome     # Cypress component tests (Chrome)
npm run test:e2e-firefox    # Cypress component tests (Firefox)
npm run test:pre-release    # unit + e2e-chrome + e2e-firefox
npm run lint                 # ESLint
```

## Rules

@../.claude/rules/typescript.md
@../.claude/rules/comments.md
@../.claude/rules/communication.md
@../.claude/rules/changelog.md
@../.claude/rules/components.md
@../.claude/rules/testing.md
@../.claude/rules/storybook.md
@../.claude/rules/ref-forwarding.md
@../.claude/rules/ssr.md
@../.claude/rules/event-handlers.md
@../.claude/rules/namespace-exports.md
@../.claude/rules/theming.md
@../.claude/rules/localization.md
@../.claude/rules/application-provider.md
@../.claude/rules/configuration.md
@../.claude/rules/new-component-checklist.md
@../.claude/rules/sync-core-docs-mcp.md
@../.claude/rules/target-architecture-status.md
@../.claude/rules/application-screen.md
@../.claude/rules/box.md
@../.claude/rules/radius.md
@../.claude/rules/spacing.md
@../.claude/rules/typography.md
@../.claude/rules/elevation.md
@../.claude/rules/color.md
@../.claude/rules/motion.md
@../.claude/rules/dark-theme.md
@../.claude/rules/responsiveness.md
@../.claude/rules/accessibility.md
@../.claude/rules/rejected.md
