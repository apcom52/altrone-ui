# Заметки по рефакторингу — components/skeleton

---

## Skeleton.tsx

### `layout` на каждом Skeleton — избыточные layout-анимации

```tsx
<motion.div className={s.Skeleton} style={styles} layout {...restProps} />
```

Проп `layout` активирует FLIP-анимации Framer Motion: при изменении позиции или размера элемент плавно перемещается. Для скелетона-заглушки это нецелесообразно — скелетон статичен. Кроме того, `layout` вызывает измерения DOM на каждый рендер, что создаёт ненужную нагрузку при рендере многих скелетонов. Следует убрать `layout` или сделать его опциональным пропом.

### Нет ARIA-разметки для состояния загрузки

Компонент не несёт никакой ARIA-информации. Для скринридеров скелетон неотличим от обычного `<div>`. Рекомендуется добавить `role="status"` или `aria-busy="true"` в зависимости от контекста использования, либо задокументировать, что обёртка должна это обеспечивать.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

### `useConfiguration` не вызывается

Skeleton — единственный из визуальных компонентов, не читающий конфиг через `useConfiguration()`. Потребитель не может задать `className`/`style` через глобальный конфиг.

---

## Skeleton.types.ts

### `React` не импортирован

```ts
// нет импорта
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>
```

---

## skeleton.module.scss

### Нет поддержки `prefers-reduced-motion`

```scss
.Skeleton {
  animation: skeleton-animate 3s ease-in-out infinite;
}
```

Анимация воспроизводится постоянно, игнорируя системные настройки пользователя. Следует добавить:

```scss
@media (prefers-reduced-motion: reduce) {
  .Skeleton {
    animation: none;
  }
}
```

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `skeleton.module.scss` | Нет `prefers-reduced-motion` — анимация нарушает системные настройки доступности |
| 🟡 Средний | `Skeleton.tsx:31` | `layout` на каждом скелетоне — ненужные FLIP-измерения при рендере |
| 🟡 Средний | `Skeleton.tsx` | Нет ARIA-разметки для состояния загрузки |
| 🟡 Средний | `Skeleton.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `Skeleton.tsx` | `useConfiguration` не используется — конфиг недоступен |
| 🟢 Низкий | `Skeleton.types.ts` | `React` не импортирован |
