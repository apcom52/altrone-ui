# Заметки по рефакторингу — components/bottomNavigation

---

## BottomNavigation.tsx

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах. По требованиям проекта каждый компонент обязан пробрасывать `ref` на корневой DOM-элемент.

### `position: fixed` захардкожен в стилях — нельзя встроить в контейнер

```scss
.BottomNavigation {
  position: fixed;
  bottom: 8px;
  ...
}
```

`BottomNavigation` всегда занимает фиксированную позицию относительно viewport. Потребитель не может встроить его в конкретный контейнер, Storybook показывает его поверх всего. Такое поведение стоит либо сделать опциональным через проп, либо задокументировать явно.

---

## components/Item.tsx

### `forwardRef` вместо React 19 — нарушение соглашения проекта

```tsx
export const Item = forwardRef<HTMLAnchorElement, BottomNavigationItemProps>(
  (props, ref) => { ... }
);
```

По правилам CLAUDE.md `forwardRef` не используется — `ref` принимается как обычный проп (React 19 style).

### `String(selectedItemClassName)` даёт класс `"undefined"`

```tsx
[String(bottomNavigationConfig.selectedItemClassName)]:
  bottomNavigationConfig.selectedItemClassName && props.selected,
```

Если `selectedItemClassName` не задан, `String(undefined)` вернёт строку `"undefined"`, которая будет добавлена как CSS-класс. Правильная проверка:

```ts
...(bottomNavigationConfig.selectedItemClassName && props.selected
  ? { [bottomNavigationConfig.selectedItemClassName]: true }
  : {}),
```

### Badge закомментирован — незавершённая функциональность

```tsx
{/* {badge ? <Badge className={s.Badge}>{badge}</Badge> : null} */}
```

Проп `badge` объявлен в типах, принимается в пропсах, но рендер закомментирован. Это вводит в заблуждение потребителей. Нужно либо реализовать, либо удалить проп из типов.

### Русский эмодзи-комментарий в исходном коде

```tsx
// 🔥 Дополнительная анимация при каждом перемещении
```

Комментарии в исходниках библиотеки должны быть на английском языке.

---

## BottomNavigation.types.ts

### `React` не импортирован

```ts
// нет импорта
export interface BottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {}
```

`React` используется как глобальный namespace без импорта.

### `badge?: string | number | JSX.Element` — устаревший тип

`JSX.Element` следует заменить на `ReactElement` из именованного импорта `react`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `components/Item.tsx:44` | `forwardRef` вместо React 19 ref-как-проп — нарушение соглашения проекта |
| 🟠 Высокий | `components/Item.tsx:60–63` | `String(selectedItemClassName)` даёт CSS-класс `"undefined"` |
| 🟡 Средний | `bottomNavigation.module.scss` | `position: fixed` захардкожен — нельзя встроить в контейнер |
| 🟡 Средний | `components/Item.tsx:39` | Badge закомментирован, но проп объявлен в типах — незавершённая функциональность |
| 🟡 Средний | `BottomNavigation.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `BottomNavigation.types.ts` | `React` не импортирован; `JSX.Element` вместо `ReactElement` |
| 🟢 Низкий | `components/Item.tsx:29` | Русский комментарий в исходном коде |
