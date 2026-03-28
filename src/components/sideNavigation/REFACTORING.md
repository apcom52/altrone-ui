# Заметки по рефакторингу — components/sideNavigation

---

## SideNavigation.tsx

### `SideNavigationProps extends HTMLAttributes<HTMLDivElement>` — неверный базовый тип

```ts
export interface SideNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
```

Компонент рендерит `<nav>`, а не `<div>`. Базовый тип должен быть `React.HTMLAttributes<HTMLElement>`. Потребители, ориентируясь на тип, могут предположить рендер `<div>`.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## components/Item.tsx

### `aria-selected` на `<a>` — неверный ARIA-атрибут

```tsx
<a href={href} aria-selected={isSelected} ...>
```

`aria-selected` предназначен для элементов с ролями `tab`, `option`, `treeitem`, `gridcell` и пр. На обычных ссылках он недействителен и будет проигнорирован скринридером. Для указания текущей страницы в навигации используется `aria-current="page"`:

```tsx
<a href={href} aria-current={isSelected ? 'page' : undefined} ...>
```

### `String(sideNavigationConfig.selectedItemClassName)` даёт класс `"undefined"`

```tsx
[String(sideNavigationConfig.selectedItemClassName)]:
  sideNavigationConfig.selectedItemClassName && isSelected,
```

Если `selectedItemClassName` не задан в конфиге, `String(undefined)` = `"undefined"` — добавляется CSS-класс с таким именем. Та же проблема, что и в `BottomNavigation.Item`.

### `observeNewSelector` отсутствует в deps `useEffect`

```ts
useEffect(() => {
  observeNewSelector(href);
}, [href]);  // ← observeNewSelector не включён
```

`observeNewSelector` из `useScrollSpy()` отсутствует в массиве зависимостей. Если функция нестабильна по ссылке, `useEffect` будет использовать устаревшую версию.

### `SideNavigationItemProps extends HTMLAttributes<HTMLAnchorElement>` — корневой элемент `<li>`, не `<a>`

```ts
export interface SideNavigationItemProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
```

Корневой элемент `Item` — `<li>`. `<a>` — вложенный элемент. Пропсы из `HTMLAttributes<HTMLAnchorElement>` (например, `href`, `download`) спредятся на `<a>`, что корректно, но тип базового контейнера вводит в заблуждение.

---

## sideNavigation.module.scss

### `.Title` использует захардкоженные значения вместо миксина

```scss
.Title {
  font-weight: 500;   /* вместо var(--text-weight-medium) */
  line-height: 20px;  /* захардкожено */
  font-size: var(--side-navigation-item-text-size);
}
```

Типографика должна задаваться через `@include label` или `@include paragraph`, а не хардкодом.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `components/Item.tsx:34` | `aria-selected` на `<a>` — неверный ARIA, нужен `aria-current="page"` |
| 🟠 Высокий | `components/Item.tsx:24–25` | `String(selectedItemClassName)` даёт CSS-класс `"undefined"` |
| 🟡 Средний | `SideNavigation.types.ts:1` | `HTMLAttributes<HTMLDivElement>` — компонент рендерит `<nav>` |
| 🟡 Средний | `components/Item.tsx:14–16` | `observeNewSelector` отсутствует в deps `useEffect` |
| 🟡 Средний | `SideNavigation.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `SideNavigation.types.ts` | `React` не импортирован |
| 🟢 Низкий | `sideNavigation.module.scss:19–20` | `font-weight: 500; line-height: 20px` — захардкоженная типографика |
