# Заметки по рефакторингу — components/label

---

## Label.types.ts

### `React` не импортирован

```ts
// Label.types.ts:3
export interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
```

`React` используется как пространство имён для типов, но импорт отсутствует.

### `ref` не объявлен в типах

После перехода на React 19 `ref` должен быть явным пропом. В `LabelProps` его нет.

---

## Label.tsx

### Нет `memo`

Компонент не обёрнут в `memo`, хотя это стандарт для всех компонентов библиотеки.

### `ref` не принимается и не пробрасывается

Компонент рендерит `<div>`, но не принимает `ref` и не пробрасывает его — нарушение соглашения проекта.

### `useConfiguration` не вызывается

Компонент не читает глобальную конфигурацию через `useConfiguration()` — переопределение `className` и `style` потребителем невозможно.

### Несуществующие CSS-классы в `clsx`

```tsx
const cls = clsx(s.Label, {
  [s.Solid]: variant === 'solid',   // ← класс .Solid не существует в SCSS
  [s.Rounded]: rounding === 'rounded', // ← класс .Rounded не существует в SCSS
  ...
});
```

В CSS-модуле нет классов `.Solid` и `.Rounded` — они будут `undefined`, что clsx молча проигнорирует. Это мёртвый код.

---

## styles.module.scss

### Неправильные имена переменных для `line-height`

```scss
line-height: var(--line-height-3);
line-height: var(--line-height-4);
```

Паттерн `--line-height-*` — не существующие переменные. Правильный вариант: `--text-line-height-3`, `--text-line-height-4` (из `_text.scss`).

### `.Pill` использует `!important`

```scss
.Pill {
  border-radius: 9999px !important;
}
```

`!important` — признак конфликта специфичности. Размерные классы (`.Mini`, `.Small` и т.д.) переопределяют `border-radius`, поэтому пришлось добавить `!important`. Правильное решение: размерные классы должны применять `border-radius` через CSS-переменную, которую `.Pill` просто перезаписывает.

### Одинаковый `padding` у `.Large` и `.XLarge`

```scss
.Large  { padding: 4px 8px; }
.XLarge { padding: 4px 8px; }  // ← идентично Large
```

Вероятно, `.XLarge` должен иметь увеличенный `padding` (например, `6px 12px`).

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Label.types.ts:3` | `React` не импортирован |
| 🟠 Высокий | `Label.tsx` | `ref` не принимается и не пробрасывается |
| 🟠 Высокий | `Label.tsx` | `useConfiguration` не используется |
| 🟠 Высокий | `Label.tsx` | Нет `memo` |
| 🟡 Средний | `Label.tsx:6–28` | `s.Solid` и `s.Rounded` — несуществующие CSS Module ключи |
| 🟡 Средний | `styles.module.scss:18,124,132,140,148` | `--line-height-*` → должны быть `--text-line-height-*` |
| 🟡 Средний | `styles.module.scss:117` | `.Pill` использует `!important` — специфичность |
| 🟢 Низкий | `styles.module.scss:144–145` | `.XLarge` padding идентичен `.Large` — вероятно, баг |
