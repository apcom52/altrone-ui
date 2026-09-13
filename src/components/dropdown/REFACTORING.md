# Заметки по рефакторингу — components/dropdown

---

## Dropdown.tsx

### `forwardRef` — нарушение React 19 / CLAUDE.md

CLAUDE.md явно запрещает использование `forwardRef`. `Dropdown` должен принимать `ref` как обычный проп.

### Критический баг: хуки вызываются внутри обычной функции (`dropdownActionRenderFunc`)

```ts
// примерная реализация
const dropdownActionRenderFunc = (item, index) => {
  const { dropdown: dropdownConfig } = useConfiguration();   // ← Rules of Hooks нарушены
  const hoverProps = useDropdownItemHover(...);               // ← хук в plain function
  return <DropdownAction {...} />;
};
```

Функция `dropdownActionRenderFunc` — это обычная колбэк-функция, а не компонент React. Вызов `useConfiguration()` и `useDropdownItemHover()` внутри неё нарушает **Rules of Hooks**: хуки должны вызываться только на верхнем уровне функции-компонента. React не может отследить порядок вызовов хуков в этом контексте, что может привести к непредсказуемым ошибкам рендеринга и краша при изменении условий.

### Контент попапа оборачивается в новую стрелочную функцию на каждый рендер

```tsx
// примерная строка
content={() => <DropdownMenu>{children}</DropdownMenu>}
```

Если `content` принимается как функция и передаётся дальше в `Popover`, при каждом рендере `Dropdown` создаётся новая ссылка на функцию. Если `Popover` или его внутренние компоненты сравнивают пропсы по ссылке (например, через `memo`), мемоизация не сработает. Следует использовать `useCallback` или вынести определение за пределы рендера.

### `DropdownActionProps.onClick` сужает тип из `ButtonHTMLAttributes`

```ts
// Dropdown.types.ts
onClick?: () => void;
```

`ButtonHTMLAttributes<HTMLElement>` определяет `onClick` как `MouseEventHandler<HTMLElement>`, то есть `(event: MouseEvent<HTMLElement>) => void`. Сужение до `() => void` означает, что потребитель не может получить объект события мыши. Это ограничение особенно заметно, если нужно вызвать `event.stopPropagation()` или `event.preventDefault()`.

---

## Dropdown.types.ts

### `JSX.Element` вместо `ReactElement`

```ts
icon?: JSX.Element;
```

В кодовой базе принято использовать `ReactElement` из прямого импорта `react`. `JSX.Element` — устаревший способ записи, требует глобального пространства имён JSX.

### `DropdownMenuProps` — отсутствует экспорт или использование

Если `DropdownMenuProps` не реэкспортируется из `index.ts`, потребители не могут типизировать свои компоненты-обёртки над `Dropdown.Menu`. Стоит проверить, экспортируются ли все нужные типы.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Dropdown.tsx` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп |
| 🔴 Критический | `Dropdown.tsx` | Хуки (`useConfiguration`, `useDropdownItemHover`) вызываются в plain-функции — нарушение Rules of Hooks |
| 🟠 Высокий | `Dropdown.types.ts` | `onClick` в `DropdownActionProps` сужает `MouseEventHandler` до `() => void` — нет доступа к `event` |
| 🟡 Средний | `Dropdown.tsx` | `content` оборачивается в новую функцию на каждый рендер — ломает мемоизацию |
| 🟢 Низкий | `Dropdown.types.ts` | `JSX.Element` вместо `ReactElement` — устаревшая запись |
| 🟢 Низкий | `Dropdown.types.ts` | Проверить экспорт всех публичных типов из `index.ts` |
