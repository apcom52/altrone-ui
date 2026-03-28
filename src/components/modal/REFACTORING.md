# Заметки по рефакторингу — components/modal

---

## Modal.tsx

### Баг: `onCloseHandler` вызывается дважды — через `AnimatePresence.onExitComplete`

```tsx
// line 68–71
const onCloseHandler = () => {
  hide();
  if (onClose) onClose();
};

// line 116
<AnimatePresence onExitComplete={onCloseHandler}>
```

`onCloseHandler` вызывается при инициации закрытия (клик на фон, Escape, кнопка «Отмена»), а затем снова по завершении exit-анимации через `onExitComplete`. В результате `hide()` и `onClose()` вызываются дважды.

### Баг: `onKeyboardHandler` — stale closure и отсутствие в deps

```ts
// line 92–96
const onKeyboardHandler = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onCloseHandler();  // onCloseHandler из closure
  }
};

// line 98–106
useEffect(() => {
  if (opened) {
    document.body.addEventListener('keydown', onKeyboardHandler);
  }
  return () => document.body.removeEventListener('keydown', onKeyboardHandler);
}, [opened]);  // ← onKeyboardHandler не в deps
```

`onKeyboardHandler` создаётся заново на каждом рендере и не включён в deps. Если `onClose` изменится пока модал открыт, обработчик Escape будет вызывать устаревшую версию. Нужно обернуть в `useCallback` с корректными deps.

### `role="dialog"` и `aria-modal="true"` на разных элементах

```tsx
// line 117–124 — role="dialog" на внешнем div
<div role="dialog" aria-labelledby={titleId} ...>
  ...
  // line 137 — aria-modal="true" на внутреннем div
  <div className={s.ModalContent} aria-modal="true">
```

По WAI-ARIA, `role="dialog"` и `aria-modal="true"` должны быть на одном элементе. Текущая структура означает, что скринридеры могут считать диалогом весь backdrop, а не только контентную область.

### `document.querySelector` выполняется на каждом рендере

```ts
// line 166–167
const altroneRoot =
  document.querySelector('[data-altrone-root="true"]') || document.body;
```

DOM-запрос выполняется синхронно при каждом рендере компонента, даже когда модал закрыт. Следует вынести в `useRef` или `useMemo`.

### `FocusTrap` оборачивает `AnimatePresence` снаружи `createPortal`

```tsx
// line 109–163
<FocusTrap>
  <AnimatePresence>
    ...
  </AnimatePresence>
</FocusTrap>

// line 176
createPortal(modalContent, altroneRoot)
```

`FocusTrap` настраивается до портала, но реальный DOM-узел находится в другом месте дерева. Ловушка фокуса может некорректно вычислять фокусируемые элементы, особенно при SSR и в тестовой среде.

---

## modal.module.scss

### `offset: 0` — несуществующее CSS-свойство

```scss
/* line 43 */
.ModalContent {
  offset: 0;
}
```

`offset` не является стандартным CSS-свойством (есть `offset-path` для Web Animations API, но не `offset: 0`). Это либо опечатка `inset: 0`, либо остаток после рефакторинга.

### `backdrop-filter` и `border-radius` захардкожены

```scss
backdrop-filter: blur(32px) saturate(180%);  /* не CSS-переменная */
border-radius: 24px;                          /* не CSS-переменная */
padding: 8px;                                 /* не CSS-переменная */
```

### Захардкоженные типографические значения в `.Title`

```scss
.Title {
  font-size: 16px;    /* не через типографический миксин */
  font-weight: 600;   /* вместо var(--text-weight-bold) */
  line-height: 32px;
}
```

CLAUDE.md предписывает использовать миксины для типографики.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Modal.tsx:116` | `AnimatePresence.onExitComplete={onCloseHandler}` — двойной вызов `onClose` |
| 🟠 Высокий | `Modal.tsx:92–106` | `onKeyboardHandler` stale closure и отсутствует в deps `useEffect` |
| 🟠 Высокий | `Modal.tsx:117,137` | `role="dialog"` и `aria-modal="true"` на разных элементах |
| 🟡 Средний | `Modal.tsx:166–167` | `document.querySelector` на каждом рендере — вынести в ref/memo |
| 🟡 Средний | `Modal.tsx:109–163` | `FocusTrap` снаружи `createPortal` — может некорректно вычислять фокус |
| 🟢 Низкий | `modal.module.scss:43` | `offset: 0` — несуществующее CSS-свойство |
| 🟢 Низкий | `modal.module.scss:55–62` | Типографика в `.Title` захардкожена вместо миксина |
| 🟢 Низкий | `modal.module.scss` | `backdrop-filter`, `border-radius`, `padding` захардкожены |
