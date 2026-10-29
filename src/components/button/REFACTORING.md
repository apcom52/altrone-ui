# Заметки по рефакторингу — components/button

---

## Button.tsx

### Баг: `asChild` задекларирован, но логика не реализована

`asChild` деструктурируется из пропсов и есть в типах, но нигде не используется — компонент всегда рендерится как `<motion.button>`. В паттерне `asChild` должен происходить рендер дочернего элемента вместо корневого тега. Аналогичная реализация есть в `Breadcrumbs.Item`.

### Баг: `children` деструктурируется, но не рендерится

```ts
// line 28 — деструктурируется...
children,
// ...и больше нигде не используется
```

Всё содержимое кнопки собирается в `buttonContent` через `label`, `icon` и т.д. Если передать `children`, они молча проигнорируются. Нужно либо убрать проп из типов, либо реализовать рендер через `asChild`.

### Баг: опечатка `'successed'` вместо `'succeeded'`

```ts
// Button.types.ts — line 15
state?: 'idle' | 'loading' | 'successed' | 'failed';

// Button.tsx — line 81
{state === 'successed' && <ButtonSuccessIcon />}
```

Слово написано с ошибкой в обоих местах. Это часть публичного API — исправление потребует мажорного изменения.

### `title={label}` выставляется всегда, даже когда лейбл видим

```ts
// line 95
title={label}
```

Атрибут `title` используется для всплывающей подсказки у иконочных кнопок (`showLabel={false}`). Когда текст кнопки уже виден, `title` создаёт избыточный тултип при наведении. Нужно передавать только при `!showLabel`.

### `rainbowEffect` из конфига не реализован

В `ConsumerConfigurationContext` есть `button.rainbowEffect?: boolean`, но в `Button.tsx` это значение нигде не читается и не применяется. Конфиг-опция — мёртвый код.

### Логика `isSingleIcon` некорректна

```ts
// line 34
const isSingleIcon = !showLabel && (icon || !additionalIcon);
```

`!additionalIcon` означает «нет дополнительной иконки». Когда `showLabel=false` и нет ни `icon`, ни `additionalIcon`, `isSingleIcon` будет `true` (потому что `!additionalIcon` = `true`). Кнопка без какого-либо контента получит класс `.SingleIcon`. Вероятно, правильная логика: `!showLabel && !!icon && !additionalIcon`.

### Кнопка не блокируется во время `state='loading'`

Во время загрузки контент скрывается через `opacity: 0`, но кнопка остаётся кликабельной. Нет ни `disabled`, ни `aria-disabled`, ни `pointer-events: none`. Повторный клик при уже идущем запросе возможен.

---

## Button.types.ts

### `React` не импортирован

```ts
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>
```

`React` нигде не импортирован.

### `JSX.Element` устарел

```ts
badge?: number | string | JSX.Element;
```

`JSX.Element` — устаревший алиас. Следует использовать `React.ReactElement`.

---

## button.module.scss

### Тёмная тема через `[data-altrone-theme='dark']` вместо `.AltroneDark`

```scss
:global([data-altrone-theme='dark']) {
  .Primary { ... }
  .Selected { ... }
}
```

Нарушение конвенции из CLAUDE.md — должно быть `:global(.AltroneDark) &`.

### `position: relative` задублирован в `.ButtonContent`

```scss
/* lines 72 и 75 — одинаковое свойство дважды */
.ButtonContent {
  position: relative;
  ...
  position: relative;
}
```

### `color(display-p3 1 1 1)` без фолбэка в `.Selected`

```scss
.Selected {
  --button-background-color: color(display-p3 1 1 1);
```

Функция `color(display-p3)` — расширенное цветовое пространство, не поддерживается в старых браузерах. Нет фолбэка для обычного sRGB (`#ffffff` или `white`).

### Захардкоженные значения

- `rgba(255, 255, 255, 0.75)` в `.Primary:disabled` — вместо CSS-переменной
- `--button-text-color: black` в тёмном режиме — цвет по имени вместо переменной
- `font-weight: 500` и `font-weight: 600` — вместо `var(--text-weight-medium)` и `var(--text-weight-bold)`
- `--button-vertical-padding: 3px`, `--button-horizontal-padding: 6px` в `.Mini` — вне spacing-токенов

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Button.tsx:27–28` | `asChild` и `children` объявлены, но не реализованы |
| 🟠 Высокий | `Button.tsx:81` / `types:15` | Опечатка `'successed'` в публичном API |
| 🟠 Высокий | `Button.tsx` | Нет блокировки кнопки во время `state='loading'` |
| 🟠 Высокий | `button.module.scss:196,296` | Тёмная тема через атрибут вместо класса `.AltroneDark` |
| 🟡 Средний | `Button.tsx:95` | `title` выставляется всегда, включая видимый лейбл |
| 🟡 Средний | `Button.tsx:34` | Некорректная логика `isSingleIcon` |
| 🟡 Средний | `button.module.scss:181` | `color(display-p3 1 1 1)` без sRGB-фолбэка |
| 🟡 Средний | `Button.tsx` + `context.ts` | `rainbowEffect` в конфиге не реализован |
| 🟢 Низкий | `button.module.scss:72,75` | `position: relative` задублирован в `.ButtonContent` |
| 🟢 Низкий | `button.module.scss` | Захардкоженные цвета и font-weight вместо CSS-переменных |
| 🟢 Низкий | `Button.types.ts:18` | `JSX.Element` устарел |
| 🟢 Низкий | `Button.types.ts:1` | `React` не импортирован явно |
