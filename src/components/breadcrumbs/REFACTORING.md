# Заметки по рефакторингу — components/breadcrumbs

---

## Breadcrumbs.tsx

### Неиспользуемые импорты

```ts
// line 2–7
import {
  Children,       // не используется
  cloneElement,   // не используется
  isValidElement, // не используется
  memo,
  ReactElement,
} from 'react';
```

```ts
// line 13
import { Flex } from 'components/flex/Flex.tsx'; // не используется
```

Четыре импорта — мёртвый код, вероятно остатки предыдущей реализации.

---

## Breadcrumbs.types.ts

### `React` не импортирован

```ts
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement>
export interface BreadcrumbsItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
```

`React` нигде не импортирован.

### Типы расширяют `HTMLDivElement`, хотя компоненты рендерятся как другие элементы

- `BreadcrumbsProps extends HTMLAttributes<HTMLDivElement>`, но `Breadcrumbs` рендерится как `<nav>`
- `BreadcrumbsItemProps extends HTMLAttributes<HTMLDivElement>`, но `Item` рендерится как `<li>` (и как произвольный элемент при `asChild`)

Это приводит к тому, что специфичные для `<nav>` и `<li>` атрибуты недоступны в автодополнении.

### `onClick` в `BreadcrumbsItemProps` сужает тип родителя

```ts
// Breadcrumbs.types.ts — line 14
onClick?: () => void;

// Из React.HTMLAttributes<HTMLDivElement>:
// onClick?: MouseEventHandler<HTMLDivElement>  // принимает MouseEvent
```

Переопределение убирает параметр `event` из сигнатуры. Это делает `BreadcrumbsItemProps.onClick` несовместимым с типом `MouseEventHandler` — передать обработчик, которому нужен `event`, не получится.

---

## components/Item.tsx

### Разделитель всегда в DOM, включая последний элемент

```tsx
// line 58 — рендерится для каждого Item
<div className={s.Separator}><ChevronRight /></div>
```

Видимость разделителя скрывается через CSS (`:last-child .Separator { display: none }`), но элемент всегда присутствует в DOM. Лучше использовать условный рендер, чтобы не создавать лишних узлов.

### `onClick` теряется при `asChild`

При `asChild={true}` пропс `onClick` деструктурируется из `props`, но в ветку `asChild` не попадает — он уходит в `...restProps`, который используется только в ветке `!asChild`:

```tsx
const { className, current, asChild, children, label, icon, onClick, ...restProps } = props;

// asChild-ветка использует только className
<Slot ref={ref} className={cls}>...</Slot>

// non-asChild ветка получает onClick через restProps
<div ref={ref} onClick={onClick} className={cls} {...restProps}>
```

Если передать `onClick` вместе с `asChild={true}`, событие не будет обработано.

### Тип `ref` не совпадает с реальным элементом при `asChild`

```ts
export const Item = forwardRef<HTMLDivElement, BreadcrumbsItemProps>(...)
```

При `asChild={true}` `ref` передаётся в `Slot`, который рендерит дочерний элемент. Реальный DOM-узел может быть `<a>`, `<button>` или любым другим — но TypeScript говорит, что это всегда `HTMLDivElement`.

---

## breadcrumbs.module.scss

### Дублирование стилей `.Breadcrumbs` и `.List`

```scss
.Breadcrumbs {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--l-gap);   /* те же стили */
}

.List {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--l-gap);   /* что и тут */
}
```

Оба класса имеют идентичный набор свойств. Обёртка `.Breadcrumbs` добавляет только семантику `<nav>` без визуального смысла.

### Нет стилей тёмной темы

Компонент не меняет внешний вид в тёмном режиме. Хотя цвета приходят через CSS-переменные, нет ни одного переопределения под `.AltroneDark`.

### Захардкоженные значения в `item.module.scss`

- `font-size: 16px` и `height: 16px` в `.Separator` — вместо CSS-переменных
- `--breadcrumbs-text-size: 14px` и `--breadcrumbs-icon-size: 16px` в корневых стилях — вне типографической шкалы

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Breadcrumbs.tsx` | `ref` не пробрасывается в `BreadcrumbsComponent` — нарушение CLAUDE.md |
| 🟠 Высокий | `components/Item.tsx:20` | `forwardRef` вместо React 19 ref-как-проп — нарушение CLAUDE.md |
| 🟠 Высокий | `components/Item.tsx:38–57` | `onClick` теряется при `asChild={true}` |
| 🟠 Высокий | `Breadcrumbs.tsx:2–13` | Четыре неиспользуемых импорта |
| 🟡 Средний | `Breadcrumbs.types.ts:14` | `onClick` сужает тип — `MouseEvent` недоступен |
| 🟡 Средний | `Breadcrumbs.types.ts` | Типы расширяют `HTMLDivElement`, хотя рендерятся `<nav>` и `<li>` |
| 🟡 Средний | `components/Item.tsx:43` | Тип `ref` — `HTMLDivElement`, но при `asChild` элемент произвольный |
| 🟡 Средний | `components/Item.tsx:58` | Разделитель всегда в DOM, последний скрыт через CSS |
| 🟢 Низкий | `breadcrumbs.module.scss` | `.Breadcrumbs` и `.List` имеют идентичные стили |
| 🟢 Низкий | `breadcrumbs.module.scss` | Нет стилей тёмной темы |
| 🟢 Низкий | `item.module.scss:72–74` | Захардкоженные `16px` в `.Separator` |
| 🟢 Низкий | `Breadcrumbs.types.ts:1` | `React` не импортирован явно |
