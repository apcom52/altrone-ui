# Заметки по рефакторингу — components/empty

---

## Empty.tsx

### `aria-live="polite"` избыточен при `role="status"`

```tsx
<div role="status" aria-live="polite" ...>
```

`role="status"` по спецификации WAI-ARIA уже подразумевает `aria-live="polite"`. Явное дублирование атрибута избыточно, хотя и не вредно.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## Empty.types.ts

### `React` не импортирован, но используется как глобальный namespace

```ts
// нет импорта React
export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
```

`React.HTMLAttributes` и `React.ReactNode` используются без явного импорта.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟡 Средний | `Empty.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `Empty.tsx:28` | `aria-live="polite"` избыточен — `role="status"` уже его подразумевает |
| 🟢 Низкий | `Empty.types.ts` | `React` не импортирован — используется глобальный namespace |
