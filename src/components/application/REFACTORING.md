# Refactoring Notes — components/application

---

## AltroneApplication.tsx

### Bug: Flash of wrong theme on first render
State is initialized as `'auto'`, `useEffect` fires after mount. On the first render `data-altrone-theme` will be `'auto'` and `AltroneDark` class won't be applied even if `initialTheme='dark'`. Causes FOUC.

```ts
// line 32 — initialTheme is ignored during state initialization
const [theme, setTheme] = useState<Theme>('auto');
```

Fix: initialize state using a lazy initializer that reads `initialTheme` and `window.matchMedia` synchronously.

### Bug: `tagName` prop is declared but never used
```ts
// line 23 — destructured...
tagName = 'div',
// ...but never passed anywhere
<Screen ...>  // tagName is not forwarded
```

Either remove the prop from types or forward it to `Screen`.

### Provider tree doesn't match CLAUDE.md documentation
CLAUDE.md describes: `ThemeContext → AltroneLocalization → Configuration → RainbowEffect → Toast → children`

Actual code:
- `RainbowEffect` is missing from the tree
- `DialogProvider` is added but not documented

### `AltroneDark` class is applied twice
The class is added both to the `html` element via `document.querySelector('html')?.classList.toggle(...)` (line 47) and via `clsx` directly on the component element (line 67). If intentional — should be commented.

---

## AltroneApplication.types.ts

### Bug: `Language` type doesn't match the implementation
```ts
// types.ts — line 17
export type Language = 'en' | 'ru';

// useLocalization.tsx — line 35
const DICTIONARIES = { en, ru, fr, ge, sp };
```

French, German, and Spanish are supported in the implementation but inaccessible via the public type. This is a public API surface issue.

### `customLabels` loses type safety
```ts
customLabels?: Record<string, any>;  // types.ts
// vs
customLabels: Partial<Localization>; // useLocalization.tsx, LocalizationProps
```

Should use `Partial<Localization>` consistently.

### `React` is not explicitly imported
```ts
export interface AltroneApplicationProps extends React.HTMLAttributes<HTMLDivElement>
```

`React` is not imported. Works only if React types are globally available via `tsconfig`.

---

## useLocalization.tsx

### `translationOptions` violates naming convention
```ts
type translationOptions = { ... }  // line 22
```

TypeScript convention for types/interfaces is PascalCase: `TranslationOptions`.

### `language.toLowerCase()` is called twice
Once in `AltroneLocalization` (line 49) and again in `useLocalization` (line 72). The context already stores a lowercase string, the second call is redundant.

### `LocalizationContextType.dictionary` is weakly typed
```ts
dictionary: Record<string, any>  // line 19
```

Could use `Localization` from `locales` for full type safety.

---

## RainbowEffect.tsx

### Critical Bug: `findIndex` used as a boolean check — logic is inverted (line 216–219)
```ts
Array.from(entity.removedNodes).findIndex(
  (node) => node === currentElementRef.current,
)
```

`findIndex` returns `-1` when the element is **not found**, and `-1` is truthy in JavaScript. So `removeRainbow()` is called when the element has **not** been removed from the DOM. Fix:

```ts
Array.from(entity.removedNodes).includes(currentElementRef.current!)
```

### Bug: Empty deps arrays in `useCallback` — stale closures
Multiple `useCallback` hooks have empty `[]` dependency arrays but capture external values:

- `onMouseEnter` (line 56): captures `setElement`, `setCursor`, `userOnMouseEnter`, `opacity`, `blur`
- `onMouseMove` (line 81): captures `setCursor`, `userOnMouseMove`
- `onMouseLeave` (line 94): captures `removeRainbow`, `userOnMouseLeave`
- `onWheel` (line 99): captures `onMouseMove`, `userOnWheel`
- `onFocus` (line 104): captures `onMouseLeave`, `userOnFocus`

If `opacity`, `blur`, or user callbacks change, the handlers won't update.

### Performance: `useMutationObserver` on `document.body`
```ts
useMutationObserver(document.body, mutationObserverCallback, mutationOptions);
```

With `{ subtree: true, childList: true }` this subscribes to **all** DOM mutations on the page. For large apps this is expensive. Consider observing only the root container, or replacing with `ResizeObserver`/`IntersectionObserver`.

### 8 separate `useState` calls cause cascaded re-renders
In `setElement` (line 162–180), 7 state variables are updated consecutively. React 18 batches these automatically, but consolidating into a `useReducer` or a single state object would make the logic cleaner and more maintainable.

---

## Issue Summary

| Priority | File | Issue |
|---|---|---|
| 🔴 Critical | `RainbowEffect.tsx:216` | `findIndex` as boolean — inverted logic, `removeRainbow` fires when element is NOT removed |
| 🔴 Critical | `RainbowEffect.tsx:56,81,94,99,104` | Stale closures in `useCallback` due to empty deps |
| 🟠 High | `AltroneApplication.types.ts:17` | `Language` type missing `'fr' \| 'ge' \| 'sp'` |
| 🟠 High | `AltroneApplication.tsx:32` | FOUC due to `useState('auto')` ignoring `initialTheme` |
| 🟠 High | `AltroneApplication.tsx:23` | `tagName` prop declared but never used |
| 🟡 Medium | `AltroneApplication.types.ts:25` | `customLabels: Record<string,any>` instead of `Partial<Localization>` |
| 🟡 Medium | `RainbowEffect.tsx:231` | `useMutationObserver` on entire `document.body` |
| 🟡 Medium | `AltroneApplication.tsx` | Provider tree differs from CLAUDE.md: `RainbowEffect` missing, `DialogProvider` undocumented |
| 🟠 High | `AltroneApplication.tsx:9` | `motion` imported from `motion/react` but never used — dead import |
| 🟢 Low | `useLocalization.tsx:22` | Type `translationOptions` with lowercase name |
| 🟢 Low | `useLocalization.tsx:72` | Redundant `.toLowerCase()` call |
