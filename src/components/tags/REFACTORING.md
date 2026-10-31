# Заметки по рефакторингу — components/tags

---

## Tags.tsx

### `ref` не пробрасывается

`Tags` делегирует рендер в `<Flex>`. Если `Flex` пробрасывает `ref` до DOM-элемента, то технически `ref` работает, но только косвенно. Компонент не принимает `ref` явно в пропсах и не декларирует его в типах — нарушение соглашения проекта.

### `memo` без явного дженерика

```ts
const Tags = memo<TagsProps>(({ ... }) => { ... });
```

Это нормально, но для единообразия с остальными компонентами библиотеки стоит убедиться, что тип явно указан.

---

## components/Item.tsx

### `forwardRef` вместо React 19 — нарушение соглашения проекта

```tsx
export const Item = forwardRef<HTMLAnchorElement, TagsItemProps>(
  (props, ref) => { ... }
);
```

По правилам CLAUDE.md `forwardRef` не используется — `ref` принимается как обычный проп.

### `tabIndex={0}` на `<a>` — избыточен

```tsx
<a ref={ref} tabIndex={0} {...restProps}>
```

Элемент `<a>` без атрибута `href` не является фокусируемым по умолчанию — в этом смысле `tabIndex={0}` оправдан. Однако элемент `<a>` без `href` семантически является не ссылкой, а интерактивным текстом; для тегов-меток корректнее использовать `<span>` или `<button>`. Если тег кликабелен, нужно `href` или `role="button"`.

### `useConfiguration` не вызывается в `Item`

`Item` не читает конфигурацию через `useConfiguration()` — нет поддержки глобальных переопределений стиля для дочернего элемента.

---

## Tags.types.ts

### `React` не импортирован

```ts
// нет импорта
export interface TagsProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface TagsItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {}
```

`React` используется в аннотациях, но не импортирован.

### `ref` не объявлен в `TagsItemProps`

После перехода на React 19 `ref` должен быть явным пропом в типе компонента.

---

## components/item.module.scss

### Захардкоженная типографика

```scss
.Item {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}
```

По соглашению проекта типографика задаётся через SCSS-миксины (`@include label`, `@include paragraph`). Следует использовать подходящий миксин вместо прямых значений.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `components/Item.tsx:18` | `forwardRef` вместо React 19 ref-как-проп |
| 🟡 Средний | `Tags.tsx` | `ref` не пробрасывается явно |
| 🟡 Средний | `components/Item.tsx` | `useConfiguration` не вызывается — переопределения стиля не поддерживаются |
| 🟢 Низкий | `Tags.types.ts` | `React` не импортирован |
| 🟢 Низкий | `Tags.types.ts` | `ref` не объявлен в `TagsItemProps` |
| 🟢 Низкий | `components/Item.tsx:12` | `tabIndex={0}` на `<a>` без `href` — семантически неверно, нужен `href` или смена тега |
| 🟢 Низкий | `components/item.module.scss:9–11` | `font-size: 14px; font-weight: 500; line-height: 24px` — захардкоженная типографика, нужен миксин |
