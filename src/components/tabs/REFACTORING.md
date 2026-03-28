# Заметки по рефакторингу — components/tabs

---

## Tabs.tsx

### Опечатка в имени namespace-переменной: `TagsNamespace` вместо `TabsNamespace`

```ts
const TagsNamespace = Object.assign(Tabs, { Item });
export { TagsNamespace as Tabs };
```

`Tags` вместо `Tabs` — опечатка. Не влияет на экспортируемое имя, но путает при навигации по коду.

### `AnimatePresence mode="wait"` внутри `role="tablist"` — семантически неверно

```tsx
<div role="tablist" ...>
  <LayoutGroup>
    <AnimatePresence mode="wait">{children}</AnimatePresence>
  </LayoutGroup>
</div>
```

Вкладки `tablist` должны быть видны **все одновременно** — пользователь выбирает среди них. `AnimatePresence` с `mode="wait"` означает, что при изменении набора вкладок старые сначала исчезают, потом появляются новые. Это некорректное поведение: вкладки не должны анимированно заменять друг друга как страницы. `AnimatePresence` здесь создаёт ложную семантику.

### `containerRef` создаётся, но нигде не используется

```ts
const containerRef = useRef<HTMLDivElement>(null);
// ...
<div role="tablist" ref={containerRef} ...>
```

`containerRef` присваивается элементу, но не передаётся потребителю и не используется внутри компонента. Мёртвый код.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## components/Item.tsx

### Критический: хуки в обычной функции — нарушение Rules of Hooks

```ts
const tabItemRenderFunc: RenderFuncProp<HTMLAnchorElement, TabsItemProps> = (
  ref,
  props
) => {
  useConfiguration();        // ← хук в обычной функции
  useAnimationControls();    // ← хук в обычной функции
  ...
};
```

`tabItemRenderFunc` — это модульная функция, не компонент (не начинается с заглавной буквы, не используется как JSX-тег). Вызов хуков внутри неё нарушает правила хуков React. Это работает случайно — функция всегда вызывается напрямую в теле компонента `Item`, что помещает хуки в правильный контекст. Однако React Hooks Linter будет выдавать предупреждения, а рефакторинг легко сломает это поведение. Следует превратить `tabItemRenderFunc` в полноценный компонент.

### `layoutId="tabs-backdrop"` — статический ID при нескольких экземплярах Tabs

```tsx
<motion.div layoutId="tabs-backdrop" ...>
```

Если на странице несколько компонентов `Tabs`, все они используют одинаковый `layoutId`. Framer Motion будет анимировать backdrop как один элемент, перемещая его между разными экземплярами. Следует генерировать уникальный ID через `useId()` на уровне родительского `Tabs`.

### `forwardRef` вместо React 19 — нарушение соглашения проекта

```tsx
export const Item = forwardRef<HTMLAnchorElement, TabsItemProps>(
  (props, ref) => { ... }
);
```

По правилам CLAUDE.md `forwardRef` не используется — `ref` принимается как обычный проп.

### `String(tabsItemConfig.selectedClassName)` даёт класс `"undefined"`

```tsx
[String(tabsItemConfig.selectedClassName)]:
  tabsItemConfig.selectedClassName && props.selected,
```

Если `selectedClassName` не задан, `String(undefined)` = `"undefined"` добавляется как CSS-класс.

### Смешение `framer-motion` и `motion/react`

```ts
// Item.tsx
import { motion, useAnimationControls } from 'framer-motion';

// Tabs.tsx
import { LayoutGroup, AnimatePresence } from 'motion/react';
```

В одном компоненте используются два разных пакета для анимации. Следует использовать один и тот же.

---

## Tabs.types.ts

### `React` не импортирован

```ts
// нет импорта
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}
```

### `JSX.Element` вместо `ReactElement`

```ts
icon?: JSX.Element;
badge?: string | number | JSX.Element;
```

---

## tabs.module.scss / item.module.scss

### Опечатки в именах CSS-переменных: `bagde` вместо `badge`

```scss
--tabs-item-bagde-background-color: ...
--tabs-item-bagde-text-color: ...
```

Два CSS-токена содержат опечатку `bagde` вместо `badge`. Третий токен (`--tabs-item-badge-rounding`) написан верно — несоответствие внутри одной группы переменных.

### `.TabsUnderlay` определён, но никогда не применяется

```scss
.TabsUnderlay {
  position: absolute;
  ...
}
```

Класс определён в `tabs.module.scss`, но не используется в `Tabs.tsx`. Мёртвый CSS.

### `font-weight: 500` в `.Item` — захардкожено

```scss
.Item {
  font-weight: 500;
}
```

Следует использовать `var(--text-weight-medium)`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `components/Item.tsx:10–47` | Хуки вызываются в обычной функции — нарушение Rules of Hooks |
| 🟠 Высокий | `components/Item.tsx:33` | `layoutId="tabs-backdrop"` — статический ID, конфликт при нескольких экземплярах Tabs |
| 🟠 Высокий | `Tabs.tsx:31` | `AnimatePresence mode="wait"` в `tablist` — семантически некорректно, вкладки должны быть видны одновременно |
| 🟠 Высокий | `components/Item.tsx:49` | `forwardRef` вместо React 19 ref-как-проп |
| 🟡 Средний | `components/Item.tsx:59–61` | `String(selectedClassName)` даёт CSS-класс `"undefined"` |
| 🟡 Средний | `Tabs.tsx:12` | `containerRef` создан, но нигде не используется |
| 🟡 Средний | `Tabs.tsx` | `ref` не пробрасывается |
| 🟡 Средний | `components/Item.tsx:8` vs `Tabs.tsx:7` | Смешение `framer-motion` и `motion/react` в одном компоненте |
| 🟢 Низкий | `Tabs.tsx:38` | Опечатка `TagsNamespace` вместо `TabsNamespace` |
| 🟢 Низкий | `tabs.module.scss:10–11` | Опечатка `bagde` вместо `badge` в двух CSS-переменных |
| 🟢 Низкий | `tabs.module.scss:39–52` | `.TabsUnderlay` никогда не применяется — мёртвый CSS |
| 🟢 Низкий | `Tabs.types.ts` | `React` не импортирован; `JSX.Element` вместо `ReactElement` |
| 🟢 Низкий | `components/item.module.scss:14` | `font-weight: 500` — захардкоженный вес шрифта |
