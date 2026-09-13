# Заметки по рефакторингу — components/progress

---

## Progress.tsx

### `aria-valuemin={0}` захардкожен — нет пропа `min`

```tsx
<div
  role="progressbar"
  aria-valuenow={value}
  aria-valuemax={max}
  aria-valuemin={0}   // ← всегда 0, нет пропа
```

Если потребителю нужен диапазон, начинающийся не с нуля (например, прогресс от 50 до 200), `aria-valuemin` будет ложным. Следует либо добавить проп `min`, либо явно задокументировать ограничение.

### Нет проверки на деление на ноль и выход за границы

```ts
const percentage = Math.round((value / max) * 100);
```

- Если `max === 0`, результат `NaN` — ширина `.Active` станет `NaN%`, ARIA-атрибуты получат `NaN`.
- Если `value > max`, `percentage > 100` — полоса выйдет за пределы контейнера (скрыто `overflow: hidden`, но `aria-valuenow > aria-valuemax` нарушает ARIA-спецификацию).
- Если `value < 0`, появится отрицательная ширина.

Нужны клампинг и защита от нуля:
```ts
const safeMax = max || 1;
const percentage = Math.min(100, Math.max(0, Math.round((value / safeMax) * 100)));
```

### `role="presentation"` скрывает текстовую метку от скринридера

```tsx
<div className={s.Label} role="presentation">
  {childrenElement}
```

`role="presentation"` убирает элемент из дерева доступности. Если `childrenElement` — это `"75%"` или пользовательский текст, скринридер его не озвучит. Пользователь с экранным ридером не получит текстовой информации о прогрессе, хотя `aria-valuenow` передаст число. Следует убрать `role="presentation"` с лейбла или использовать `aria-label` на `role="progressbar"`.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## Progress.types.ts

### `JSX.Element` в типе `children` — устаревший способ записи

```ts
children?: string | ReactElement | ((context: ProgressContext) => JSX.Element);
```

Следует использовать `ReactElement` из `'react'` для последовательности с остальной кодовой базой.

### `React` не импортирован

```ts
// нет импорта
export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
```

---

## progress.module.scss

### Захардкоженные значения в `.Progress` и `.Label`

```scss
.Progress {
  border-radius: 16px;
  height: 32px;
  padding: 4px 8px;
}

.Label {
  z-index: 1;       /* магическое число */
  font-size: 14px;  /* вместо мixin */
  font-weight: 500; /* вместо var(--text-weight-medium) */
}
```

- Типографика `.Label` должна задаваться через `@include label` или `@include paragraph`.
- `z-index: 1` — магическое число без CSS-переменной.
- Геометрические значения не используют CSS-токены.

### `@include small-label` — потенциально несуществующий миксин

```scss
.Small .Label {
  @include small-label;
}
```

В задокументированном списке миксинов проекта (`CLAUDE.md`) миксин `small-label` отсутствует. Доступные: `screen-name`, `title`, `heading`, `subheader`, `inner-header`, `big-paragraph`, `paragraph`, `sm-paragraph`, `code`, `group-heading`, `label-heading`, `label`. Следует проверить наличие и при необходимости заменить на `@include label` или `@include sm-paragraph`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Progress.tsx:41` | Нет защиты от `max=0` (деление на ноль → `NaN`) и выхода `value` за пределы |
| 🟠 Высокий | `Progress.tsx:72` | `role="presentation"` скрывает текстовую метку от скринридера |
| 🟠 Высокий | `Progress.tsx:61` | `aria-valuemin={0}` захардкожен — нет пропа `min` |
| 🟡 Средний | `Progress.tsx` | `ref` не пробрасывается |
| 🟡 Средний | `progress.module.scss:42` | `@include small-label` — вероятно несуществующий миксин |
| 🟢 Низкий | `Progress.types.ts:19` | `JSX.Element` вместо `ReactElement` |
| 🟢 Низкий | `Progress.types.ts` | `React` не импортирован |
| 🟢 Низкий | `progress.module.scss:32–33` | `font-size: 14px; font-weight: 500` — захардкоженная типографика, нужен миксин |
| 🟢 Низкий | `progress.module.scss:31` | `z-index: 1` — магическое число без CSS-переменной |
