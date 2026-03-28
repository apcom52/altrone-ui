# Refactoring Notes — components/configuration

---

## Configuration.tsx

### Critical Bug: `shouldUpdate` is inverted — memoization is completely broken
```ts
// line 19–27
const memoedContextValue = useMemo(
  () => mergedContext,
  [parentContext, props],
  (prev, next) => isEqual(prev, next),  // ← BUG
);
```

`rc-util/useMemo` signature: `useMemo(getValue, condition, shouldUpdate)` where `shouldUpdate(prev, next)` returns `true` to **recalculate** the value.

Current code `isEqual(prev, next)` returns `true` when conditions are **equal** — so the cache is updated when nothing changed, and **not updated** when `parentContext`/`props` actually change. Components receive stale config after configuration updates.

Fix: `(prev, next) => !isEqual(prev, next)`.

### `merge` runs unconditionally on every render
```ts
// line 17 — called before useMemo, runs on every render
const mergedContext = merge({}, DEFAULT_CONFIGURATION, parentContext, props);
```

Even if the memoized value would not change, `merge` still performs a full deep merge on every render. The merge call should be moved inside the `getValue` callback.

### Non-standard `rc-util` dependency for a single function
`rc-util` is an internal Ant Design utility. Its only advantage over `React.useMemo` here is the custom comparator. After fixing the inverted `shouldUpdate`, this can be replaced with a standard React hook, removing the external dependency and the non-obvious behavior.

---

## AltroneConfiguration.context.ts

### Inconsistency: required fields inside `ExtraProps` where they should be optional
Several fields lack `?` inside `ExtraProps`, even though `ComponentConfiguration<T>` wraps everything in `Partial<...>`:

```ts
loading?: ComponentConfiguration<{
  color: string;         // ← required in ExtraProps
}>;
sideNavigation?: ComponentConfiguration<{
  titleClassName: string;           // ← required
  selectedItemClassName: string;    // ← required
}>;
toolbar?: ComponentConfiguration<{
  actionClassName: string;  // ← required
  groupClassName: string;   // ← required
}>;
// also: datePicker, bottomNavigation, photoViewer, tabs.item
```

They become optional at the config level via `Partial`, but if someone uses `ExtraProps` directly (e.g. to create a typed sub-config), the fields are required. This is a trap for future extension. Explicit `?` everywhere is clearer.

### Tight coupling to `CollapsedListProps`
```ts
// line 3
import { CollapsedListProps } from '../collapsedList/CollapsedList.types.ts';

// line 47
expandButtonLabel?: CollapsedListProps['expandButtonLabel'];
```

The configuration context imports a specific prop type from another component. If `CollapsedListProps` is renamed or restructured, it breaks the context too. Better to export the specific type as a standalone from `CollapsedList.types.ts` or inline the definition here.

### `DEFAULT_CONFIGURATION` is missing defaults for date/number formats
```ts
export const DEFAULT_CONFIGURATION: ConsumerConfigurationContext = {
  locale: {
    locale: 'en-US',
    // dateFormat, monthFormat, yearFormat, numberGrouping, numberDecimal — all missing
  },
};
```

`Locale` defines `dateFormat`, `monthFormat`, `yearFormat`, `numberGrouping`, `numberDecimal` but none have defaults. Components that rely on these may get `undefined` at runtime.

### `tabs.rainbowEffect` has no default value
```ts
tabs?: ComponentConfiguration<{
  rainbowEffect: boolean;  // no default here or in DEFAULT_CONFIGURATION
```

Unlike `button.rainbowEffect?: boolean`, this boolean flag has no explicit default anywhere, forcing every consumer to write `tabsConfig.rainbowEffect ?? false`.

### `ComponentConfiguration<{}>` — unsafe default generic
```ts
type ComponentConfiguration<ExtraProps extends object = {}> = ...
```

In strict TypeScript `{}` does not mean "empty object" — it means "any non-nullish type". Better to use `Record<string, never>` or omit the default entirely.

---

## Issue Summary

| Priority | File | Issue |
|---|---|---|
| 🔴 Critical | `Configuration.tsx:25` | `shouldUpdate` inverted — memoization returns stale values on config changes |
| 🟠 High | `Configuration.tsx:17` | `merge` outside the callback — runs on every render |
| 🟠 High | `Configuration.tsx:8` | `rc-util/useMemo` — non-standard dependency with non-obvious API |
| 🟡 Medium | `context.ts:3,47` | Tight coupling to `CollapsedListProps` via direct import |
| 🟡 Medium | `context.ts:5–9` | `DEFAULT_CONFIGURATION` missing defaults for date and number formats |
| 🟡 Medium | `context.ts` | Inconsistent `?` in ExtraProps (required fields where they should be optional) |
| 🟢 Low | `context.ts:139` | `tabs.rainbowEffect: boolean` without an explicit default |
| 🟢 Low | `context.ts:11` | `ExtraProps extends object = {}` — unsafe default generic |
