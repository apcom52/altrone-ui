# Заметки по рефакторингу — components/divider

---

## Divider.tsx

### `role="separator"` на `<hr>` — избыточная роль

```tsx
<hr role="separator" className={cls} style={styles} {...props} />
```

Элемент `<hr>` уже имеет неявную ARIA-роль `separator`. Явное дублирование избыточно и не несёт пользы. Следует убрать `role="separator"`.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## Divider.types.ts

### `React` не импортирован, но используется как глобальный namespace

```ts
// нет импорта React
export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLHRElement>, 'children'> {
```

---

## divider.module.scss

### `min-height: 1px` дублирует `height: 1px`

```scss
.Divider {
  height: 1px;
  min-height: 1px;  // ← избыточно
}
```

Когда `height` фиксирован в `1px`, `min-height: 1px` ничего не добавляет. Аналогично `min-width: 1px` при `width: calc(100% - var(--l-gap))` бессмысленен, поскольку `calc(100%)` заведомо больше.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟡 Средний | `Divider.tsx:25` | `role="separator"` избыточен — `<hr>` уже имеет эту роль |
| 🟡 Средний | `Divider.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `Divider.types.ts` | `React` не импортирован — используется глобальный namespace |
| 🟢 Низкий | `divider.module.scss:8–9` | `min-height: 1px` и `min-width: 1px` — избыточные правила |
