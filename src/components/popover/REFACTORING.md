# Заметки по рефакторингу — components/popover

---

## Popover.tsx

### `forwardRef` — нарушение React 19 / CLAUDE.md

CLAUDE.md явно запрещает использование `forwardRef`. `Popover` должен принимать `ref` как обычный проп и пробрасывать его в корневой DOM-элемент.

### `document.querySelector` вызывается прямо в JSX на каждый рендер

```tsx
// line ~90
<FloatingPortal root={document.querySelector('[data-altrone-root]') as HTMLElement}>
```

`document.querySelector` выполняется при каждом рендере компонента — это синхронный поиск в DOM. Если дерево большое, это заметная лишняя работа. Следует вынести в `useRef` или `useMemo`:

```ts
const portalRoot = useMemo(
  () => document.querySelector('[data-altrone-root]') as HTMLElement,
  [],
);
```

### Дебаг-атрибут `data-test="test"` оставлен в продовом коде

```tsx
<FloatingPortal ... data-test="test">
```

Левый атрибут, очевидно, забытый после отладки. Нужно удалить.

### `contentRef` присваивается в двух местах

```tsx
// ref callback на motion.div
ref={(node) => { contentRef.current = node; ... }}

// отдельное присваивание на вложенном div
ref={contentRef ? contentRef : undefined}
```

`contentRef` сначала заполняется через callback-ref на `motion.div`, а затем снова (условно) передаётся как `ref` на вложенный `div`. Это дублирование создаёт неоднозначность: в итоге `contentRef` будет указывать на внутренний `div`, а не на `motion.div`. Нужно решить, на какой элемент должен ссылаться `contentRef`, и присваивать его только один раз.

### `role="region"` на плавающем элементе — слишком широкая семантика

```tsx
<motion.div role="region" ...>
```

`role="region"` предназначен для крупных секций страницы с именованным `aria-label`. Для попапа/поповера правильнее использовать `role="dialog"` (если попап требует взаимодействия) или вообще не задавать роль, оставив её на усмотрение конкретного потребителя (Dropdown, Tooltip и пр.). Текущее значение вводит скринридеры в заблуждение.

### `useImperativeHandle` — deps не содержат всех зависимостей

```ts
useImperativeHandle(ref, () => ({
  hide,
  open,
  childrenNode: referenceRef.current,
}), []);  // пустой массив зависимостей
```

`hide` и `open` — функции, возвращаемые `useFloating`, которые могут меняться. `referenceRef.current` — мутабельный ref, изменения которого не отслеживаются. Хотя на практике эти значения стабильны, явно пустой `[]` скрывает намерение и может сломаться при изменении реализации `useFloating`.

### `FloatingList` без `elementsRef` — возможная ошибка навигации клавиатурой

```tsx
<FloatingList>
  {children}
</FloatingList>
```

`FloatingList` используется совместно с `useListNavigation`, но `elementsRef` не передан в `FloatingList`. По документации `@floating-ui/react` `elementsRef` необходим для корректного отслеживания элементов списка при навигации стрелками.

---

## Popover.types.ts

### `PopoverChildrenContext` и `PopoverContentContext` — избыточные контексты

Два отдельных контекста передают данные в `children` и в контент попапа. Если данные одинаковые, можно обойтись одним контекстом. Если разные — нужно явно документировать, что в каком контексте.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Popover.tsx` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп |
| 🔴 Критический | `Popover.tsx` | `contentRef` присваивается в двух местах — неоднозначный целевой элемент |
| 🟠 Высокий | `Popover.tsx` | `role="region"` — неверная ARIA-семантика для попапа |
| 🟠 Высокий | `Popover.tsx` | `FloatingList` без `elementsRef` — клавиатурная навигация может работать некорректно |
| 🟡 Средний | `Popover.tsx` | `document.querySelector` в JSX на каждый рендер — вынести в `useMemo` |
| 🟡 Средний | `Popover.tsx` | `useImperativeHandle` с пустыми `[]` deps — скрытые зависимости |
| 🟢 Низкий | `Popover.tsx` | `data-test="test"` — дебаг-атрибут в продовом коде |
