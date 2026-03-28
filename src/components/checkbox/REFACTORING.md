# Заметки по рефакторингу — components/checkbox

---

## Checkbox.tsx

### Баг: `role="checkbox"` на `<label>` дублирует роль вложенного `<input>`

```tsx
// line 53
<label role="checkbox" aria-checked={...} ...>
  <input type="checkbox" ... />  // уже имеет роль checkbox
```

`<input type="checkbox">` уже несёт семантическую роль `checkbox`. Добавление `role="checkbox"` на `<label>` создаёт второй элемент с той же ролью — скринридеры объявят два чекбокса вместо одного. `<label>` имеет собственную роль и не нуждается в переопределении.

### `tabIndex={0}` + `onKeyDown` на `<label>` — двойная точка фокуса

```tsx
// line 57–58
tabIndex={0}
onKeyDown={onKeyDown}  // вызывает inputRef.current?.click()
```

Вложенный `<input>` уже является нативно фокусируемым элементом и обрабатывает Space/Enter нативно. `tabIndex={0}` на `<label>` создаёт вторую точку остановки при навигации по Tab. `onKeyDown` с вызовом `click()` дублирует браузерное поведение.

### `outline: none` без альтернативного индикатора фокуса

```scss
/* checkbox.module.scss — line 28 */
.Checkbox {
  outline: none;
}
```

Убирает индикатор фокуса без замены. Пользователи клавиатуры и ассистивных технологий не видят, на каком элементе находится фокус. Нужно либо стилизовать `:focus-visible`, либо убрать `outline: none`.

### Неверный тип generic в `CheckboxProps`

```ts
// Checkbox.types.ts — line 3–6
export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLLabelElement>,  // ← HTMLLabelElement — не элемент input
    'onChange' | 'type'
  >
```

`InputHTMLAttributes<HTMLLabelElement>` — неверная комбинация: атрибуты `<input>` применяются к типу `<label>`. Правильно: `React.LabelHTMLAttributes<HTMLLabelElement>`.

---

## checkbox.module.scss

### Нет индикатора `:focus-visible`

Нет секции для стилизации `:focus-visible` на `.Checkbox`. При этом `outline: none` убирает браузерный дефолт.

### Захардкоженные значения

- `gap: var(--gap)` — CSS-переменная без суффикса размера, скорее всего не определена
- `padding: 3px 4px` — вне spacing-токенов
- `height: 32px` — вне size-токенов
- `border-radius: 6px` / `8px` — вместо CSS-переменных
- `.Button` `width: 24px; height: 24px` — вне size-токенов
- `font-weight: 500; font-size: 14px` в `.Label` — вместо CSS-переменных
- `.Indetermination` `width: 10px; height: 10px; border-radius: 4px` — вне токенов

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Checkbox.tsx:53` | `role="checkbox"` на `<label>` — дублирует роль вложенного `<input>` |
| 🟠 Высокий | `checkbox.module.scss:28` | `outline: none` без `:focus-visible` — недоступен с клавиатуры |
| 🟠 Высокий | `Checkbox.types.ts:5` | `InputHTMLAttributes<HTMLLabelElement>` — неверная комбинация типов |
| 🟡 Средний | `Checkbox.tsx:57–58` | `tabIndex={0}` + `onKeyDown` создают дублирующую точку фокуса |
| 🟢 Низкий | `checkbox.module.scss` | `var(--gap)` без суффикса — скорее всего не определена |
| 🟢 Низкий | `checkbox.module.scss` | Многочисленные захардкоженные px-значения вместо CSS-токенов |
