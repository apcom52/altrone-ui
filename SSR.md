# SSR Compatibility Analysis

> Last updated: 2026-04-09

## Legend

- 🔴 **Client** — requires `'use client'` (uses hooks, browser APIs, motion, portals, etc.)
- 🟢 **Server** — pure static JSX, no hooks, SSR-safe
- 🟡 **Server\*** — no hooks, but uses `memo()` which is incompatible with React Server Components in Next.js App Router

---

## Components

| Component | File | Type | Reason |
|-----------|------|------|--------|
| **AltroneApplication** | `application/AltroneApplication.tsx` | 🔴 Client | `useState`, `useEffect`, `window.matchMedia`, `document` |
| **AutocompleteInput** | `autocompleteInput/AutocompleteInput.tsx` | 🔴 Client | `useState`, `useRef`, `useEffect`, DOM API |
| **Avatar** | `avatar/Avatar.tsx` | 🔴 Client | `useState`, `useRef`, `useEffect`, `window.getComputedStyle` |
| **Badge** | `badge/Badge.tsx` | 🟢 Server | Static JSX only, no hooks |
| **BottomNavigation** | `bottomNavigation/BottomNavigation.tsx` | 🔴 Client | `useId`, Context Provider |
| ↳ BottomNavigation.Item | `bottomNavigation/components/Item.tsx` | 🔴 Client | `useContext`, event handlers |
| **Breadcrumbs** | `breadcrumbs/Breadcrumbs.tsx` | 🔴 Client | `useConfiguration` (`useContext`) |
| ↳ Breadcrumbs.Item | `breadcrumbs/components/Item.tsx` | 🔴 Client | `useContext`, event handlers |
| **Button** | `button/Button.tsx` | 🔴 Client | `motion/react`, `useRef`, `useState` |
| **Calendar** | `calendar/Calendar.tsx` | 🔴 Client | `useState`, `useMemo`, `useCallback` |
| ↳ CalendarDate | `calendar/CalendarDate.tsx` | 🔴 Client | Event handlers with logic |
| **Checkbox** | `checkbox/Checkbox.tsx` | 🔴 Client | `useRef`, `onChange`/`onKeyDown` with logic |
| **CloseButton** | `closeButton/CloseButton.tsx` | 🔴 Client | `useLocalization` (`useContext`) |
| **CollapsedList** | `collapsedList/CollapsedList.tsx` | 🔴 Client | `useBoolean` (`useState`) |
| **ColorPicker** | `colorPicker/ColorPicker.tsx` | 🔴 Client | `useCallback`, `useState` |
| ↳ ColorPickerContent | `colorPicker/inner/ColorPickerContent.tsx` | 🔴 Client | `useState`, `useRef`, `useCallback` |
| **DataGrid** | `dataGrid/DataGrid.tsx` | 🔴 Client | `useMemo`, `useState`, `useCallback` |
| **DataTable** | `dataTable/DataTable.tsx` | 🔴 Client | `useEffect`, `useMemo`, `@tanstack/react-table`, `motion/react` |
| ↳ DataTable.Action | `dataTable/components/Action.tsx` | 🔴 Client | `useContext`, event handlers |
| ↳ DataTable.RowAction | `dataTable/components/RowAction.tsx` | 🔴 Client | `useContext`, event handlers |
| ↳ DataTable.RowActions | `dataTable/components/RowActions.tsx` | 🔴 Client | `useContext` |
| **DatePicker** | `datePicker/DatePicker.tsx` | 🔴 Client | `useState`, `useRef`, `motion/react` |
| ↳ DatePicker.RangePicker | `datePicker/components/RangePicker.tsx` | 🔴 Client | `useState`, `useCallback` |
| **Dialog** | `dialog/DialogProvider.tsx` | 🔴 Client | `useState`, `useEffect`, Context Provider |
| **Divider** | `divider/Divider.tsx` | 🟢 Server | Static JSX only |
| **Drawer** | `drawer/Drawer.tsx` | 🔴 Client | `useBoolean`, `motion/react`, `createPortal`, `window` |
| **Dropdown** | `dropdown/Dropdown.tsx` | 🔴 Client | `useCallback`, `useBoolean`, `@floating-ui/react` |
| ↳ Dropdown.Action | `dropdown/components/DropdownAction.tsx` | 🔴 Client | `useContext`, event handlers |
| ↳ Dropdown.Checkbox | `dropdown/components/DropdownCheckbox.tsx` | 🔴 Client | `useContext`, `useState` |
| ↳ Dropdown.ChildMenu | `dropdown/components/DropdownChildMenu.tsx` | 🔴 Client | `useContext`, `@floating-ui/react` |
| ↳ Dropdown.Menu | `dropdown/components/DropdownMenu.tsx` | 🔴 Client | `useContext` |
| ↳ Dropdown.RadioItem | `dropdown/components/DropdownRadioItem.tsx` | 🔴 Client | `useContext`, event handlers |
| ↳ Dropdown.RadioList | `dropdown/components/DropdownRadioList.tsx` | 🔴 Client | `useContext` |
| **DummyBox** | `dummyBox/DummyBox.tsx` | 🟢 Server | Static JSX only |
| **Empty** | `empty/Empty.tsx` | 🔴 Client | `useLocalization` (`useContext`) |
| **EntityList** | `entityList/index.tsx` | 🔴 Client | Context Provider, `useState` |
| **FilePicker** | `filePicker/FilePicker.tsx` | 🔴 Client | `useState`, `useRef`, `useCallback`, `useEffect`, DOM API |
| **Flex** | `flex/Flex.tsx` | 🟡 Server\* | No hooks — `memo()` only |
| **Label** | `label/Label.tsx` | 🟡 Server\* | No hooks — `memo()` only |
| **Loading** | `loading/Loading.tsx` | 🟡 Server\* | No hooks — `memo()` only |
| **Modal** | `modal/Modal.tsx` | 🔴 Client | `useEffect`, `useId`, `useBoolean`, `document.body`, `createPortal`, `motion/react` |
| **NavigationList** | `navigationList/NavigationList.tsx` | 🔴 Client | `useId`, Context Provider, `useCallback` |
| **NumberInput** | `numberInput/NumberInput.tsx` | 🔴 Client | `useRef`, `useCallback`, `useMemo`, `useFormField` |
| **PasswordInput** | `passwordInput/PasswordInput.tsx` | 🔴 Client | `useState`, `useShowControls` |
| **Radio** | `radio/Radio.tsx` | 🔴 Client | `useId`, Context Provider, `useCallback` |
| **Range** | `range/Range.tsx` | 🔴 Client | `useRef`, `useState`, `useEffect`, `motion/react` |
| **Screen** | `screen/Screen.tsx` | 🔴 Client | `useState`, `useMemo` |
| **Search** | `search/Search.tsx` | 🔴 Client | `useRef`, DOM API |
| **Skeleton** | `skeleton/Skeleton.tsx` | 🔴 Client | `motion/react` |
| **Spoiler** | `spoiler/Spoiler.tsx` | 🔴 Client | `useBoolean`, `motion/react` |
| **Switcher** | `switcher/Switcher.tsx` | 🔴 Client | `useRef`, `onChange`/`onKeyDown` with logic |
| **Tags** | `tags/Tags.tsx` | 🔴 Client | `useCallback`, `useMemo`, Context |
| **Text** | `text/Text.tsx` | 🟡 Server\* | No hooks — `memo()` only; size cascades via CSS |
| **TextInput** | `textInput/TextInput.tsx` | 🔴 Client | `useRef`, `useCallback`, `useResizeObserver`, `useBoolean` |
| **Textarea** | `textarea/Textarea.tsx` | 🔴 Client | `useFormField`, `useRef` |
| **Toast** | `toasts/Toast.tsx` | 🔴 Client | `useState`, `useCallback`, `motion/react`, Context Provider |
| **Toolbar** | `toolbar/Toolbar.tsx` | 🔴 Client | Context Provider |

---

## Summary

| Type | Count | Components |
|------|-------|------------|
| 🔴 Client | 46 | All components above marked red |
| 🟢 Server | 3 | `Badge`, `Divider`, `DummyBox` |
| 🟡 Server\* | 4 | `Flex`, `Label`, `Loading`, `Text` |

### Notes on 🟡 components

`Flex`, `Label`, `Loading`, `Text` have no hooks and no browser APIs. They are technically SSR-safe React code, but they use `memo()` which is **not allowed in React Server Components** (Next.js App Router). In a Next.js context, they must be treated as client components.

### Common client-side patterns

| Pattern | Components |
|---------|------------|
| `motion/react` | `Button`, `Range`, `Skeleton`, `Drawer`, `Modal`, `Spoiler`, `Toast`, `DataTable` |
| Context Provider | `AltroneApplication`, `BottomNavigation`, `Dialog`, `EntityList`, `NavigationList`, `Radio`, `Tags`, `Toast`, `Toolbar` |
| `createPortal` | `Modal`, `Drawer` |
| `window` / `document` | `AltroneApplication`, `Drawer`, `Modal`, `FilePicker`, `Search`, `AutocompleteInput` |
| `@floating-ui/react` | `Dropdown` |
