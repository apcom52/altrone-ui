# Заметки по рефакторингу — components/toasts

---

## Toast.tsx

### Критический: `console.log` в продакшн-коде

```ts
const sendGenericToast = useCallback((message: string, options?: ToastOptions) => {
  console.log('message', message);  // ← отладочный вывод
  ...
}, []);
```

Отладочный вывод остался в продакшн-коде и будет засорять консоль каждый раз при показе тоста.

### Критический: Незавершённая миграция с `react-toastify` на `sonner`

```ts
import 'react-toastify/dist/ReactToastify.css';  // ← CSS чужой библиотеки
...
import { toast, Toaster } from 'sonner';          // ← используется Sonner
```

Компонент импортирует CSS от `react-toastify`, хотя функциональность реализована через `sonner`. Стили от другой библиотеки будут загружены в бандл и могут конфликтовать с текущими стилями.

`toast.module.scss` содержит `:global(.Toastify__toast-body)` — CSS-класс из `react-toastify`, которого не существует при использовании `sonner`. Этот стиль никогда не применится.

### Критический: `sendNotification` передаёт react-toastify-опции в Sonner

```ts
toast(<Notification {...options} />, {
  autoClose: options.duration ? options.duration : false,  // react-toastify API
  pauseOnHover: true,                                       // react-toastify API
  className: s.Notification,
  closeButton: false,
  position: ...,
});
```

`autoClose` и `pauseOnHover` — это проп-имена из `react-toastify`. В Sonner они называются иначе: `duration` и `pauseWhenPageIsHidden`. Эти опции будут молча проигнорированы — уведомления не будут автоматически закрываться и не будут приостанавливаться при наведении.

### `sendSuccessToast` / `sendWarningToast` / `sendDangerToast` — тип не совпадает

```ts
const sendGenericToast = useCallback((message: string, options?: ToastOptions) => { ... }, []);

const sendSuccessToast = useCallback((message: string) => {
  sendGenericToast(message, 'success');  // ← строка вместо ToastOptions
}, []);
```

`sendGenericToast` ожидает второй аргумент типа `ToastOptions | undefined`, но вызывается со строкой `'success'`, `'warning'`, `'danger'`. TypeScript должен выдавать ошибку. Внутри `sendGenericToast` эти строки передаются как `options` без какого-либо использования — тип-несоответствие бессмысленно.

### Устаревшие зависимости в `useCallback` и `useMemo`

```ts
const sendGenericToast = useCallback((...) => { ... }, []);

const sendToast = useCallback((message, options) => {
  sendGenericToast(message, options);  // ← sendGenericToast не в deps
}, []);

const context = useMemo<ToastContextType>(() => ({
  toast: sendToast,
  success: sendSuccessToast,
  warning: sendWarningToast,
  danger: sendDangerToast,
  sendNotification,
}), [sendToast, sendNotification]);  // ← sendSuccessToast, sendWarningToast, sendDangerToast не в deps
```

`sendToast` не включает `sendGenericToast` в массив зависимостей. `context` не включает `sendSuccessToast`, `sendWarningToast`, `sendDangerToast`. Из-за пустых массивов все `useCallback` фактически стабильны при каждом рендере (ничего не захватывается из замыкания), поэтому практического эффекта нет, но это признак того, что правила хуков не соблюдались при написании.

### Нелативный импорт `Button`

```ts
import { Button } from 'components/button/Button.tsx';
```

Используется абсолютный путь вместо относительного `'../../button'`. Это нарушает соглашения проекта и может сломаться при изменении конфигурации Vite alias.

---

## inner/Notification.tsx

### Захардкоженная строка `"Show more"` — нарушение локализации

```tsx
<Button label="Show more" />
```

Пользовательская строка не проходит через `useLocalization()`. При смене языка она останется на английском.

### `<Button label="Show more" />` не связан с `action`

Кнопка рендерится рядом с `action`-элементом, но не вызывает никакого колбэка и не использует данные из `action`. Это выглядит как незавершённый UI — кнопка либо должна быть удалена, либо получить реальный обработчик.

---

## inner/ToastNotification.tsx

### `ToastIcons` определён, но нигде не используется

```ts
const ToastIcons: Record<Role, string> = {
  default: 'info',
  primary: 'info',
  success: 'done',
  danger: 'error',
  warning: 'warning',
};
```

Словарь иконок объявлен, но `ToastNotification` не принимает `role`-проп и не рендерит иконки. Мёртвый код.

### `clsx(s.Toast)` — бессмысленный вызов

```ts
const cls = clsx(s.Toast);
```

`clsx` с одним всегда-истинным аргументом ничего не делает. Следует просто использовать `s.Toast` напрямую.

### Нелативный импорт `Button`

```ts
import { Button } from 'components/button/Button.tsx';
```

Та же проблема, что и в `Toast.tsx`.

---

## Toast.types.ts

### `JSX.Element` вместо `ReactElement`

```ts
icon?: JSX.Element;
action?: JSX.Element;
```

Следует использовать `ReactElement` из `'react'` для единообразия с кодовой базой.

### `onClick` в `ToastOptions.action` не принимает DOM-событие

```ts
action?: {
  label: string;
  onClick: () => void;  // ← нет события
  danger?: boolean;
};
```

По соглашению CLAUDE.md все колбэки должны принимать нативный DOM-event последним аргументом: `onClick: (event: React.MouseEvent<HTMLButtonElement>) => void`.

### `closeToast` в `NotificationComponentProps` не принимает DOM-событие

```ts
closeToast?: () => void;
```

Должно быть `(event: React.MouseEvent<HTMLButtonElement>) => void`.

---

## toast.module.scss

### `color` дублируется в `.Toast`

```scss
.Toast {
  color: var(--toast-text-color);   /* line 25 */
  box-shadow: ...;
  color: var(--toast-text-color);   /* line 27 — дублирует */
}
```

Свойство `color` задано дважды с одинаковым значением. Первое объявление перекрывается вторым.

### `--toast-text-size: 14px` — захардкоженное значение

```scss
--toast-text-size: 14px;
```

Пиксельный размер шрифта захардкожен вместо использования CSS-токена дизайн-системы.

### `.Wrapper` определён, но не используется

```scss
.Wrapper {
  z-index: var(--level-toast);
}
```

`Toast.tsx` не применяет класс `.Wrapper`. Мёртвый CSS.

### `:global(.Toastify__toast-body)` — класс из неиспользуемой библиотеки

```scss
:global(.Toastify__toast-body) {
  padding: 2px;
}
```

Этот класс принадлежит `react-toastify`, которая была заменена на `sonner`. При текущем стеке этот стиль никогда не применится.

---

## inner/notification.module.scss

### CSS-переменные в camelCase — нестандартное именование

```scss
color: var(--toastTextColor);
color: var(--toastNotificationBodyColor);
```

В проекте все CSS-переменные именуются в kebab-case (`--toast-text-color`). Переменные `--toastTextColor` и `--toastNotificationBodyColor` не определены в `altroneApplication.module.scss` — они всегда будут давать `initial` значение (т.е. текст не получит нужный цвет).

### `background: white` — захардкоженный цвет без поддержки тёмной темы

```scss
.Icon {
  background: white;
}
```

Не использует CSS-переменную. В тёмной теме фон иконки останется белым.

### `justify-self: flex-end` — недействительное свойство во flex-контексте

```scss
.Notification {
  justify-self: flex-end;
}
```

`justify-self` работает только в CSS Grid. Во flex-контейнере это свойство игнорируется. Вероятно, хотелось `margin-left: auto` или `align-self`.

---

## inner/toast.module.scss

### `font-weight: 500` захардкожен

```scss
.Toast {
  font-weight: 500;
}
```

Следует использовать `var(--text-weight-medium)`.

### `.Success`, `.Warning`, `.Danger` — мёртвые CSS-классы

```scss
.Success { color: var(--toast-success-text-color); }
.Warning { color: var(--toast-warning-text-color); }
.Danger  { color: var(--toast-danger-text-color);  }
```

`ToastNotification.tsx` не принимает `role`-проп и не добавляет эти классы. Мёртвый CSS.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Toast.tsx:27` | `console.log` — отладочный вывод в продакшн |
| 🔴 Критический | `Toast.tsx:1`, `toast.module.scss:29–31` | Импорт CSS `react-toastify` и класс `.Toastify__toast-body` при использовании `sonner` — незавершённая миграция |
| 🔴 Критический | `Toast.tsx:52–66` | `sendNotification` передаёт `autoClose`/`pauseOnHover` (react-toastify API) в Sonner — опции игнорируются, поведение сломано |
| 🟠 Высокий | `Toast.tsx:40–49` | `sendSuccessToast` и др. передают строку вместо `ToastOptions` в `sendGenericToast` — ошибка типов |
| 🟠 Высокий | `inner/notification.module.scss:9,45` | CSS-переменные `--toastTextColor`, `--toastNotificationBodyColor` не существуют в дизайн-системе — цвет не применяется |
| 🟠 Высокий | `inner/notification.module.scss:8` | `justify-self: flex-end` недействительно во flex-контейнере |
| 🟠 Высокий | `inner/Notification.tsx:23` | `<Button label="Show more" />` — захардкоженная строка, нарушение локализации |
| 🟠 Высокий | `inner/Notification.tsx:23` | Кнопка "Show more" не связана ни с каким обработчиком — нефункциональный UI |
| 🟡 Средний | `Toast.tsx:36–49` | Устаревшие зависимости в `useCallback`/`useMemo` (missing deps) |
| 🟡 Средний | `inner/notification.module.scss:27` | `background: white` — нет поддержки тёмной темы |
| 🟡 Средний | `Toast.tsx:13`, `inner/ToastNotification.tsx:6` | Нелативный импорт `Button` через `'components/button/Button.tsx'` |
| 🟡 Средний | `Toast.types.ts:9,10` | `onClick`/`closeToast` не принимают DOM-событие — нарушение соглашения |
| 🟢 Низкий | `inner/ToastNotification.tsx:8–14` | `ToastIcons` определён, но нигде не используется — мёртвый код |
| 🟢 Низкий | `inner/ToastNotification.tsx:20` | `clsx(s.Toast)` — бессмысленный вызов, просто `s.Toast` |
| 🟢 Низкий | `toast.module.scss:25,27` | `color` задан дважды с одинаковым значением |
| 🟢 Низкий | `toast.module.scss:7` | `--toast-text-size: 14px` — захардкоженный размер шрифта |
| 🟢 Низкий | `toast.module.scss:10–12` | `.Wrapper` — мёртвый CSS, никогда не применяется |
| 🟢 Низкий | `inner/toast.module.scss:6` | `font-weight: 500` — захардкожен, нужен `var(--text-weight-medium)` |
| 🟢 Низкий | `inner/toast.module.scss:26–36` | `.Success`, `.Warning`, `.Danger` — мёртвые CSS-классы |
| 🟢 Низкий | `Toast.types.ts:16,17` | `JSX.Element` вместо `ReactElement` |
