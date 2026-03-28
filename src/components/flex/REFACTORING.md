# Заметки по рефакторингу — components/flex

---

## Flex.tsx

### `gap` задаётся через inline-стиль с захардкоженными пикселями вместо CSS-переменных

```ts
const gapValues: Record<Gap, number> = {
  none: 0, xxs: 2, xs: 4, s: 6, m: 8, l: 12, xl: 24, xxl: 32,
};
// ...
style: { gap: `${gapValues[gap]}px` }
```

Значения отступов дублируют spacing-токены, уже определённые в CSS-переменных проекта (`--xs-gap`, `--s-gap`, `--m-gap` и пр.). При изменении дизайн-системы нужно будет обновлять и JavaScript-объект, и CSS-переменные. Следует использовать:

```ts
gap: `var(--${gap}-gap)`
```

### `tagName` типизирован как `string` — нет безопасности для HTML-тегов

```ts
tagName?: string;
```

`createElement` принимает любую строку, но TypeScript не проверит корректность имени тега и не выведет правильные атрибуты. Следует использовать `keyof React.JSX.IntrinsicElements` или `ElementType`.

### `FlexProps extends HTMLAttributes<HTMLDivElement>`, но может рендерить любой элемент

При `tagName="ul"` пропсы из `HTMLAttributes<HTMLDivElement>` (например, `onMouseDown`) будут присвоены `<ul>`, что создаёт несоответствие типов. Тип пропсов должен зависеть от `tagName`.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## flex.module.scss

### `.Flex_horizontal` определён дважды

```scss
/* line 7–9 */
.Flex_horizontal { flex-direction: row; }

/* line 39–41 */
.Flex_horizontal { flex-direction: row; }
```

Точное дублирование CSS-правила — мёртвый код.

### `.Flex_disableInnerMargins` использует `!important` на всех дочерних элементах

```scss
.Flex_disableInnerMargins > * {
  margin: 0 !important;
}
```

Агрессивный `!important` сбрасывает `margin` у всех прямых дочерних элементов — включая компоненты, которые полагаются на собственные отступы. Это ломает компоненты с внутренней логикой расположения.

---

## Flex.types.ts

### `React` не импортирован

```ts
// нет импорта
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement>
```

### `justify?: Align` — семантически некорректный тип

Тип `Align` используется и для `align-items`, и для `justify-content`. CSS-свойство `justify-content` принимает дополнительные значения (`space-between`, `space-around`), которых нет в `Align`. Стоит разделить типы или использовать отдельный `Justify`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Flex.tsx:8–17,56` | `gap` использует захардкоженные пиксели вместо CSS-переменных проекта |
| 🟠 Высокий | `flex.module.scss:43–45` | `margin: 0 !important` на всех дочерних элементах — ломает компоненты с собственными отступами |
| 🟡 Средний | `Flex.types.ts:4` | `tagName?: string` — нет типобезопасности, следует `keyof JSX.IntrinsicElements` |
| 🟡 Средний | `Flex.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `flex.module.scss:7,39` | `.Flex_horizontal` определён дважды — дублирование |
| 🟢 Низкий | `Flex.types.ts` | `React` не импортирован; `justify?: Align` — семантически некорректный тип |
