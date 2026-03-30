# Altrone UI — Project Guide for Claude

## What is this project

A React UI component library (TypeScript + Vite). Consumers wrap their app in
`<AltroneApplication>` and use components from the library directly.

---

## Stack

| Tool         | Version | Notes                                            |
| ------------ | ------- | ------------------------------------------------ |
| React        | 19      | functional components + hooks only               |
| TypeScript   | 5.4     | strict mode                                      |
| SCSS Modules | —       | one `.module.scss` per component                 |
| Vite         | 5       | also used as library bundler (`vite-plugin-dts`) |
| Storybook    | 8       | stories live next to the component               |
| Vitest       | 1       | unit tests                                       |
| Cypress      | 14      | visual regression tests                          |

---

## Folder structure

```
src/
  components/          # all UI components (one folder per component)
    application/       # <AltroneApplication> — root provider (theme, locale, config, toasts)
    configuration/     # <Configuration> + useConfiguration() — global style overrides
    <ComponentName>/   # each component follows the same layout (see below)
  locales/             # i18n dictionaries: en, ru, fr, ge, sp
  utils/               # shared hooks and helpers
  global/              # SCSS variables, mixins, Storybook decorator
  types/               # shared TypeScript types (BasicComponentStyleConfig, etc.)
```

### Component folder layout

Every component folder follows this exact structure — **do not deviate**:

```
ComponentName/
  ComponentName.tsx          # main component (exported via namespace pattern)
  ComponentName.types.ts     # all Props interfaces for this component
  ComponentName.context.ts   # React context (only if needed)
  componentName.module.scss  # styles (camelCase filename)
  ComponentName.stories.tsx  # Storybook stories
  ComponentName.test.tsx     # Vitest unit tests (if applicable)
  index.ts                   # public exports
  components/                # sub-components (same layout, recursively)
    index.ts
```

---

## Key patterns

### 1. Namespace export

All components with sub-components are exported as a namespace object:

```ts
// ComponentName.tsx
const ComponentNameBase = memo<ComponentNameProps>(({ ... }) => { ... });

export const ComponentName = Object.assign(ComponentNameBase, {
  SubComponent: SubComponent,
});
```

```ts
// index.ts
export { ComponentName } from './ComponentName';
```

### 2. useConfiguration — global style overrides

Every component reads its config slice via `useConfiguration()`. Consumers can
override `className`, `style`, and extra component-specific props by passing a
`config` prop to `<AltroneApplication>`.

```ts
const { button: buttonConfig = {} } = useConfiguration();
const cls = clsx(s.Button, className, buttonConfig.className);
const styles = { ...buttonConfig.style, ...style };
```

**Always merge consumer config last** so it overrides internal defaults.
`ComponentConfiguration<ExtraProps>` is the generic type for all config slices.

### 3. CSS variables for theming

All colors and typography are CSS custom properties defined in
`src/components/application/altroneApplication.module.scss`.
Never use hardcoded color values. Example variables:
Some variables are legacy. Like `--primary-500`, `--danger-500`, `--paragraphFontSize`. Don't use them. Also avoid using imports in scss file. This is also legacy style.
Use css variables from application/colors and application/styles and application/altroneApplication.module.scss. Also every component can have own css variables from <component>/<component>.module.scss. Avoid to create special variables inside of every subcomponent. We need to place them inside of main <component>/<component>.module.scss

Dark mode is toggled by adding `data-altrone-theme`

### 5. Localization

Text strings come from `useLocalization()`. Never hardcode user-visible strings.

```ts
const t = useLocalization();
<span>{t('componentName.label')}</span>
```

Add new keys to all five dictionaries: `en`, `ru`, `fr`, `ge`, `sp` in
`src/locales/`.

### 6. AltroneApplication — root provider tree

`<AltroneApplication>` renders providers in this order (innermost first):

```
ThemeContext → AltroneLocalization → Configuration → RainbowEffect → Toast → children
```

Do not add new global providers outside this chain without discussion.

---

## React 19 conventions

Use React 19 APIs wherever applicable. Specifically:

- **`ref` is now a regular prop** — do not use `forwardRef()`. Accept `ref`
  directly in the props destructuring:

  ```ts
  // ✅ React 19
  interface ButtonProps { ref?: React.Ref<HTMLButtonElement>; ... }
  const Button = ({ ref, ...props }: ButtonProps) => <button ref={ref} {...props} />;

  // ❌ React 18 legacy — never write this
  const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => ...);
  ```

- Use the `use()` hook for promise/context unwrapping where it simplifies code.
- Use `useOptimistic` and `useActionState` for form-related components where
  appropriate.
- Prefer native `<form action={...}>` Server Actions over manual submit handlers
  when the component is form-based.

---

## ref — every component must forward it

**Every component in the library must accept and forward a `ref`** to its
primary DOM element. This is non-negotiable — consumers use refs to attach
`Tooltip`, `Popover`, `Dropdown`, and other overlay components.

Complex chains must work transparently, for example:

```tsx
// This must work without any extra wiring:
<Dropdown
  trigger={
    <Tooltip content="Add item">
      <Button ref={someRef}>Click</Button>
    </Tooltip>
  }
>
  ...
</Dropdown>
```

Rules:

- Accept `ref` as a plain prop (React 19 style, no `forwardRef`).
- Always pass `ref` down to the **root DOM element**, not a wrapper div.
- If a component renders another Altrone component as its root, pass `ref`
  through to that component's `ref` prop.
- Never swallow or ignore a `ref` prop.

---

## SSR compatibility

Write all components to be SSR-safe by default:

- Never access `window`, `document`, or `navigator` at module level or during
  render — only inside `useEffect` or behind a `typeof window !== 'undefined'`
  guard.
- Never use browser-only APIs (`localStorage`, `matchMedia`, etc.) during
  initial render. Use `useEffect` to read them and set state.
- Mark components that are **impossible** to SSR (e.g. they require DOM
  measurements synchronously) with a comment:
  `// SSR: requires client — wrap in <ClientOnly> or lazy()`
- Prefer CSS for layout and visibility over JS-calculated dimensions where
  possible.

---

## Event handler signatures

All custom event handlers must pass the native DOM `event` object as the
**last argument**, after any semantic arguments:

```ts
// ✅ Correct
onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
onSelect: (item: OptionType, event: React.MouseEvent<HTMLElement>) => void;
onRangeChange: (from: Date, to: Date, event: React.ChangeEvent) => void;

// ❌ Wrong — event missing or not last
onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
onSelect: (item: OptionType) => void;
```

This applies to every callback prop in every component. No exceptions.

---

## What NOT to do

- Do not use class components.
- Do not use `forwardRef()` — accept `ref` as a plain prop (React 19).
- Do not access `window` / `document` during render or at module level.
- Do not create a component without forwarding `ref` to its root DOM element.
- Do not write event handlers where `event` is not the last argument.
- Do not use inline styles for colors or typography — use CSS vars + mixins.
- Do not export components without a namespace if they have sub-components.
- Do not hardcode locale strings in JSX.
- Do not modify `src/components/application/index.css` (auto-generated).
- Do not add logic inside `index.ts` files — they are re-exports only.

---

## Adding a new component — checklist

1. Create `src/components/ComponentName/` with the full folder layout above.
2. Define all props in `ComponentName.types.ts`, extending `BasicComponentStyleConfig`.
3. Add a config slice to `ConsumerConfigurationContext` in `AltroneConfiguration.context.ts`.
4. Read config in the component via `useConfiguration()` and merge styles.
5. Write SCSS using CSS vars and mixins only.
6. Add keys to all five locale files.
7. Export from `src/components/index.ts`.
8. Add a Storybook story with `StorybookDecorator`.

## code comments

always in English

## communication language

Always respond to the user in Russian. Code comments in English only.
