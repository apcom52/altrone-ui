# Заметки по рефакторингу — components/navigationList

---

## components/Link.tsx

### `forwardRef` вместо React 19

```tsx
// Link.tsx:126
export const Link = forwardRef<HTMLAnchorElement, NavigationListLinkProps>(
  (props, ref) => { ... }
);
```

По правилам CLAUDE.md `forwardRef` не используется — `ref` принимается как обычный проп.

### Рендер вложенных ссылок закомментирован

```tsx
// Link.tsx:115–121
{/*{showChildren ? (
  <div className={listCls}>
    <NavigationListLevelContext.Provider value={level + 1}>
      {children}
    </NavigationListLevelContext.Provider>
  </div>
) : null}*/}
```

Функциональность вложенных ссылок полностью отключена. При этом переменная `showChildren` вычисляется, `listCls` формируется — весь этот код мёртв. Storybook-история `NavigationListWithNestedLinks` демонстрирует вложенность, которая не работает.

### Нарушение Rules of Hooks в `navigationListRenderFunc`

```tsx
// Link.tsx:47–124
const navigationListRenderFunc: RenderFuncProp<...> = (ref, props) => {
  const { navigationList: { link: linkConfig = {} } = {} } = useConfiguration();
  const navigationListId = useNavigationListId();
  const { value: hovered, enable: hover, disable: unhover } = useBoolean();
  ...
};
```

`navigationListRenderFunc` — обычная функция, а не React-компонент. Хуки (`useConfiguration`, `useNavigationListId`, `useBoolean`) в ней вызываются в нарушение Rules of Hooks. Это работает случайно — только потому что функция всегда вызывается напрямую из рендера компонента `Link`. Любой рефакторинг или условный вызов `renderFunc` сломает правила хуков.

### `renderFunc` паттерн нужно заменить на `asChild`

Аналогично другим компонентам библиотеки (Tabs, Select и др.) — `renderFunc` устарел, нужно заменить на `asChild` через `Slot`.

### `showIcon` вычисляется, но не используется

```tsx
// Link.tsx:69
const showIcon = icon && level < 2;
```

Переменная вычислена, но в `ItemContent` иконка рендерится через `{icon ? <div>...</div> : null}` без какого-либо учёта `level`. `showIcon` никогда не передаётся в `ItemContent`.

---

## components/GroupAction.tsx

### `forwardRef` вместо React 19

```tsx
// GroupAction.tsx:8
export const GroupAction = forwardRef<HTMLButtonElement, NavigationListGroupActionProps>(
  (props, ref) => { ... }
);
```

Аналогично `Link.tsx` — нужен React 19-стиль.

### Двойная передача `icon`

```tsx
// GroupAction.tsx:32–36
<Button
  {...restProps}
  icon={icon}       // ← icon как проп Button
  label={label}
  showLabel={false}
>
  <div className={s.Icon}>{icon}</div>  {/* ← icon ещё раз как children */}
</Button>
```

`icon` передаётся в Button дважды: как проп `icon` и как `children` с обёрткой. Один из вариантов лишний.

---

## components/Footer.tsx

### Импортирует чужой CSS-файл с неправильным расширением

```tsx
// Footer.tsx:2
import s from './header.module.css';
```

- Неверное имя файла: должен быть свой модуль, а не `header.module.css`.
- Неверное расширение: проект использует `.scss`, но тут `.css`.
- Внутри использует `s.Header` — класс из чужого файла.

---

## components/Header.tsx (Menu.tsx)

### Компонент-заглушка возвращает `null`

```tsx
export const Header = memo(() => {
  return null;
});
```

Компонент нереализован, экспортируется и присутствует в namespace `NavigationList`, но ничего не рендерит. Нужно либо реализовать, либо удалить.

---

## NavigationList.types.ts

### `NavigationListProps` наследует `HTMLDivElement`, но рендерит `<nav>`

```ts
export interface NavigationListProps extends React.HTMLAttributes<HTMLDivElement> {}
```

Компонент рендерит семантический `<nav>`, поэтому тип должен наследовать `React.HTMLAttributes<HTMLElement>`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `components/Link.tsx:47–124` | Хуки в обычной функции — нарушение Rules of Hooks |
| 🔴 Критический | `components/Link.tsx:115–121` | Вложенные ссылки закомментированы — функция не работает |
| 🟠 Высокий | `components/Link.tsx:126` | `forwardRef` вместо React 19 ref-как-проп |
| 🟠 Высокий | `components/GroupAction.tsx:8` | `forwardRef` вместо React 19 ref-как-проп |
| 🟠 Высокий | `components/Link.tsx` | `renderFunc` нужно заменить на `asChild` |
| 🟡 Средний | `components/Footer.tsx:2` | Импортирует `header.module.css` — неверное имя и расширение |
| 🟡 Средний | `components/GroupAction.tsx:32–36` | `icon` передаётся дважды: как проп и как children |
| 🟡 Средний | `components/Link.tsx:69` | `showIcon` вычисляется, но не используется |
| 🟡 Средний | `components/Header.tsx` | Компонент-заглушка, возвращает `null` |
| 🟢 Низкий | `NavigationList.types.ts` | `HTMLDivElement` вместо `HTMLElement` при рендере `<nav>` |
