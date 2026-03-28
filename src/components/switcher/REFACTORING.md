# Заметки по рефакторингу — components/switcher

---

## Switcher.tsx

### Баг: `role="checkbox"` неверен для переключателя

```tsx
// line 51
<label role="checkbox" aria-checked={checked} ...>
```

Переключатель (toggle switch) по WAI-ARIA должен использовать `role="switch"`, а не `role="checkbox"`. `role="checkbox"` сообщает скринридерам, что это обычный флажок, а не переключатель включено/выключено. Пользователи с ассистивными технологиями получают неверную семантику.

### Баг: `disabled` не передаётся во вложенный `<input>`

```tsx
// line 59–66
<input
  ref={inputRef}
  type="checkbox"
  onChange={onChangeHandler}
  checked={checked}
  name={name}
  className={s.Input}
  // ← disabled отсутствует
/>
```

В отличие от `Checkbox`, который корректно передаёт `disabled` в `<input>`, `Switcher` этого не делает. Нативный `<input>` остаётся активным — его можно переключить программно или через автоматизацию, даже когда компонент визуально выглядит отключённым.

### `tabIndex={0}` + `onKeyDown` — дублирование нативного поведения

Аналогично Checkbox: вложенный `<input>` нативно фокусируем и обрабатывает Space. `tabIndex={0}` на `<label>` создаёт вторую точку Tab-навигации, `onKeyDown` дублирует браузерное поведение.

### `<div className={s.Label}>` рендерится даже без `children`

```tsx
// line 70
<div className={s.Label}>{children}</div>
```

Пустой `<div>` всегда присутствует в DOM. Checkbox обрабатывает это корректно: `{children ? <div...> : null}`.

### `outline: none` без `:focus-visible` — нет индикатора фокуса

```scss
/* switcher.module.scss — line 27 */
.Switcher {
  outline: none;
}
```

Нет альтернативного стиля фокуса.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Switcher.tsx:51` | `role="checkbox"` вместо `role="switch"` — неверная семантика для переключателя |
| 🟠 Высокий | `Switcher.tsx:59–66` | `disabled` не передаётся во вложенный `<input>` |
| 🟠 Высокий | `switcher.module.scss:27` | `outline: none` без `:focus-visible` — недоступен с клавиатуры |
| 🟡 Средний | `Switcher.tsx:70` | Пустой `.Label` всегда в DOM при отсутствии `children` |
| 🟡 Средний | `Switcher.tsx:55–56` | `tabIndex={0}` + `onKeyDown` — дублирование нативного поведения `<input>` |
| 🟢 Низкий | `switcher.module.scss` | `var(--gap)` без суффикса — скорее всего не определена |
| 🟢 Низкий | `switcher.module.scss` | Захардкоженные `3px`, `4px`, `48px`, `24px`, `16px`, `8px`, `3px`, `20px` вместо токенов |
