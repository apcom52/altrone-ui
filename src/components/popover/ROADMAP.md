# Popover — Roadmap

## What's already there

- Placement: all `@floating-ui` positions + `auto`
- Triggers: `click`, `hover`, `focus`, combinations
- Focus trap with configurable `focusTrapTargets`
- `parentWidth` — match trigger element width
- Header with `title` + `showCloseButton`
- `listNavigation` with virtual focus and active index
- `overlap` mode — popover covers the trigger
- `openedByDefault`, `enabled`
- `onOpenChange` callback
- `ref` with imperative API (`openPopup`, `closePopup`, `actualPlacement`, etc.)
- Nested popovers with cascade close via context
- Children and content as render functions
- Framer Motion enter/exit animation

---

## 🔴 High priority

### Controlled mode (`open` prop)

Currently the open state is only uncontrolled (`openedByDefault`). Many real use cases require full control from the parent — e.g. opening a popover programmatically after an async operation.

```tsx
// Proposed API
<Popover open={isOpen} onOpenChange={setIsOpen} content={...}>
  <Button label="Open" />
</Popover>
```

- Add `open?: boolean` to `PopoverProps`
- When `open` is provided, treat as controlled: skip internal `setOpened`, only call `onOpenChange`
- `openedByDefault` stays as the uncontrolled initializer

---

### Configurable hover delay (`hoverDelay`)

Hover open/close delays are hardcoded at 500ms / 250ms. There is no way to adjust them per-instance.

```tsx
// Proposed API
<Popover trigger="hover" hoverDelay={{ open: 300, close: 100 }} content={...}>
```

- Add `hoverDelay?: { open?: number; close?: number }` to `PopoverProps`
- Default to `{ open: 500, close: 250 }` to preserve current behavior

---

### `onOpen` / `onClose` separate callbacks

`onOpenChange(bool)` is fine for simple cases, but separate callbacks are more ergonomic when the handler logic differs.

```tsx
// Proposed API
<Popover onOpen={() => fetchData()} onClose={() => clearState()} content={...}>
```

- Add `onOpen?: () => void` and `onClose?: () => void`
- Keep `onOpenChange` for backwards compatibility

---

## 🟠 Medium priority

### Backdrop / overlay

No way to render a backdrop behind the popover. Required for modal-style confirmations.

```tsx
// Proposed API
<Popover backdrop backdropClassName={s.Overlay} content={...}>
```

- Add `backdrop?: boolean` and `backdropClassName?: string`
- Render a `<div>` in the portal before the floating box when `backdrop` is true
- Clicking the backdrop triggers close

---

### `closeOnScroll`

There is no option to automatically close the popover when the user scrolls the page. Useful for hover popovers and tooltips.

```tsx
// Proposed API
<Popover trigger="hover" closeOnScroll content={...}>
```

- Add `closeOnScroll?: boolean` (default `false`)
- Inside a `useEffect`, attach a `scroll` listener on `window` (passive) that calls `hide()` when `opened && closeOnScroll`

---

### Configurable `offset`

The gap between the trigger and the popover is hardcoded to `4px`. No way to tighten or loosen it.

```tsx
// Proposed API
<Popover offset={12} content={...}>
```

- Add `offset?: number` to `PopoverProps`
- Pass it into `createMiddleware` instead of the hardcoded `4`
- `overlap` mode uses its own `-4` offset and should ignore this prop

---

### Footer slot

The header supports `title` + close button. There is no symmetrical footer for action buttons. Callers currently place buttons inside `content`, which mixes layout concerns.

```tsx
// Proposed API
<Popover
  title="Confirm action"
  footer={
    <Flex gap="s" justify="end">
      <Button label="Cancel" />
      <Button label="Confirm" variant="submit" />
    </Flex>
  }
  content={<Text>Are you sure?</Text>}
>
```

- Add `footer?: ReactElement | CustomRenderFunction<PopoverContentContext>` to `PopoverProps`
- Render `<div className={s.Footer}>` below `.Content` when `footer` is provided
- Style it symmetrically with the existing `.Header`

---

## 🟡 Low priority

### `zIndex` override

The portal renders at the end of `[data-altrone-root]`, but stacking context issues arise when popovers appear inside modals or drawers. A `zIndex` escape hatch covers those edge cases.

```tsx
<Popover zIndex={1200} content={...}>
```

---

### Animation customization (`animationDuration`, `animationEasing`)

Enter/exit duration and easing are hardcoded in the `motion.div`. Consumers building dense UIs (e.g. data tables) may want snappier transitions.

```tsx
<Popover animationDuration={{ enter: 0.2, exit: 0.1 }} content={...}>
```

---

### `keepMounted`

By default the floating content is unmounted when closed. `keepMounted` keeps it in the DOM (hidden) so that content with expensive initialization (charts, forms) does not remount on each open.

```tsx
<Popover keepMounted content={<HeavyChart />}>
```

- When `keepMounted={true}`, render `floatingBox` unconditionally and toggle visibility via CSS / `aria-hidden` instead of unmounting
