# Заметки по рефакторингу — components/modal

Статус: **выполнено** (рефакторинг на React 19, session 2026-09-06).

---

## Modal.tsx — исправлено

| Было | Стало |
|---|---|
| `AnimatePresence.onExitComplete={onCloseHandler}` — `onClose`/`hide` вызывались дважды | `AnimatePresence` оборачивает условный рендер (`{opened && …}`), `onExitComplete` убран. `handleClose` вызывается один раз. |
| `onKeyboardHandler` — stale closure, не в deps `useEffect` | Обработчик Escape объявлен внутри эффекта, `handleClose` обёрнут в `useCallback`, deps — `[opened, handleClose]`. |
| `role="dialog"` и `aria-modal="true"` на разных элементах | Оба на `.ModalContent`. `aria-labelledby` ставится только при наличии `title`. |
| `document.querySelector` во время рендера — SSR-небезопасно | `getPortalRoot()` с гвардом `typeof window`. |
| `FocusTrap` снаружи `createPortal` | Весь `modalContent` (вместе с `FocusTrap`) рендерится внутри портала. |
| `forwardRef` + `memo` | React 19: `ref` — обычный проп, проброшен на корневой элемент (`.Backdrop`). |
| `cloneNode(child, { onClick: show })` — затирал собственный `onClick` триггера | Собственный `onClick` вызывается перед `open()`. |
| Плоские анимации, шли «от центра» | `transform-origin: top center`. Появление: панель падает сверху (`y` −48 → 0) с overshoot `backOut`. Закрытие: keyframes «провис вниз → уход вверх с уменьшением». `opacity` панели не анимируется (иначе рвётся `backdrop-filter`). |
| `MotionConfig reducedMotion="user"` не глушил fade подложки (глушит только transform/layout) | При `useReducedMotionConfig()` вообще не передаём `initial`/`animate`/`exit` — `AnimatePresence` монтирует/размонтирует без перехода. |
| Пустой блок футера всё равно рендерился | Футер (и блок `leftActions`) рендерятся только при наличии содержимого. |
| `FocusTrap` гасил клики вне ловушки → клик по подложке не закрывал модалку | `focusTrapOptions.allowOutsideClick: true`. |
| Закрытие по клику определялось через `event.target.closest('[aria-modal]')` → закрывало при выборе опции в `Select` (меню в портале «снаружи» `.ModalContent` по DOM) | Закрываем только когда `event.target === event.currentTarget` (клик прямо по подложке). |

## modal.module.scss — исправлено

- `offset: 0` (несуществующее свойство) — удалено.
- `backdrop-filter: blur(32px) saturate(180%)` → `var(--glass-effects)`.
- `border-radius: 24px` → `var(--modal-border-radius)` (= `var(--radius-xl)`).
- `padding: 8px` → `var(--modal-padding)` (= `var(--space-content)`); `.Close` позиционируется от того же токена.
- `.Title` — типографика через токены `--text-size-5` / `--text-weight-bold` / `--line-height-8`.
- `.Content` — вместо легаси-миксина `@include paragraph` (`--paragraphFontSize`) токены `--text-size-4` / `--line-height-4`.
- `@import 'src/global/mixins'` удалён.

## Осталось открытым

- `docs/content/ru/modal.md` и `mcp/docs/Modal.md` указывают `showCancelButton` по умолчанию `false`, в коде — `true`. Смена дефолта — заметное для потребителей поведение, требует отдельного решения, здесь не трогалось.
