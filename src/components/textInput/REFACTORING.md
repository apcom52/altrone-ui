# Заметки по рефакторингу — components/textInput

---

## TextInput.tsx

### `inputValue` — избыточный алиас

```ts
// line 57
const inputValue = value;
```

Простой алиас без трансформации — лишняя переменная.

---

## TextInput.types.ts

### `ActionIslandProps.onClick` сужает тип

```ts
// line 46
onClick?: () => void;
```

В `React.ButtonHTMLAttributes<HTMLElement>` `onClick` имеет тип `MouseEventHandler`, принимающий `MouseEvent`. Здесь сигнатура сужена до `() => void` — передать обработчик с параметром `event` не получится.

---

## textInput.module.scss

### `!important` в `.Invalid`

```scss
&.Invalid {
  --text-input-text-color: var(--danger-color) !important;
}
```

Использование `!important` для переопределения CSS-переменной не нужно — переменные имеют каскадный приоритет по месту объявления. `!important` на `--переменной` затрудняет дальнейшее переопределение.

### `outline: none` на focus-visible в `.Readonly`

```scss
.Readonly {
  &:focus-visible {
    outline: none;  // убирает индикатор фокуса
  }
}
```

Поле `readOnly` всё ещё может быть сфокусировано — например, для копирования. Скрытие `:focus-visible` нарушает доступность.

### Захардкоженные значения

- `padding: 6px 12px` в `.Input` — вне spacing-токенов
- `gap: 2px` в `.LeftIslands` / `.RightIslands` — вне spacing-токенов
- `padding-left: 4px; padding-right: 4px` в `.LeftIslands` / `.RightIslands`
- `font-weight: 500` в `.Input` — вместо `var(--text-weight-medium)`
- `--text-input-font-size: 14px` и аналоги — вне типографической шкалы

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟡 Средний | `TextInput.types.ts:46` | `onClick` в `ActionIslandProps` сужает тип, убирает `MouseEvent` |
| 🟡 Средний | `textInput.module.scss:70` | `!important` на CSS-переменной в `.Invalid` |
| 🟡 Средний | `textInput.module.scss:79–81` | `outline: none` при `:focus-visible` в `.Readonly` — нарушение доступности |
| 🟢 Низкий | `TextInput.tsx:57` | `inputValue` — избыточный алиас переменной |
| 🟢 Низкий | `textInput.module.scss` | Захардкоженные отступы и font-weight вместо CSS-переменных |

---

## Исправлено

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 | `TextInput.tsx` | `forwardRef` заменён на React 19 — `ref` принимается как обычный проп |
| 🔴 | `TextInput.tsx` | `onBlurHandler` зависел от `onFocus` вместо `onBlur` — stale closure устранён |
| 🔴 | `components/ActionIsland.tsx` | `forwardRef` заменён на React 19; неверный generic (`HTMLMotionProps` → `HTMLButtonElement`) исправлен |
| 🟠 | `TextInput.tsx` | `Component` заменён на `asChild` + `Slot`; `Component.props`-overwrite устранён |
| 🟠 | `TextInput.tsx` | Порядок мерджа стилей исправлен: `{ ...config.style, ...style }` |
| 🟡 | `TextInput.tsx` | `rainbowEffect` — мёртвый проп и импорт удалены |
| 🟢 | `TextInput.tsx` | `focused` больше не деструктурируется из `useBoolean` |
