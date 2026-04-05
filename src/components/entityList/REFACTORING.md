# Заметки по рефакторингу — components/entityList

---

## EntityList.types.ts

### `React` не импортирован

```ts
// EntityList.types.ts:3
export interface EntityListProps extends React.HTMLAttributes<HTMLDivElement> {
```

`React` используется как пространство имён, но импорт отсутствует.

### `ref` не объявлен

В `EntityListProps` и `EntityListItemProps` нет `ref` — нарушение соглашения React 19.

### `islands` объявлен, но нигде не используется

```ts
islands?: ReactNode[];
```

Проп объявлен в типах, но `Item.tsx` его не деструктурирует и не рендерит. Мёртвый тип.

### `onSelect` — отсутствует `event` как последний аргумент

```ts
onSelect?: (checked: boolean) => void;
```

По правилам проекта (CLAUDE.md) все callback-пропы должны принимать `event` последним аргументом:

```ts
onSelect?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
```

---

## EntityList.tsx

### Контекстное значение не мемоизировано

```tsx
<EntityListSelectableContext value={selectable}>
```

При каждом рендере родителя значение контекста пересоздаётся. Нужно `useMemo` или вынести значение.

### `ref` не принимается и не пробрасывается

Компонент не передаёт `ref` в корневой `<div>`.

---

## components/Item.tsx

### `Item` и `ItemContent` не обёрнуты в `memo`

Оба компонента без `memo`, что может приводить к лишним рендерам.

### `ref` не принимается и не пробрасывается

`Item` рендерит `<div>` как корень, но `ref` не принимается.

### Двойной рендер `children` при `asChild=true`

```tsx
// Item.tsx:61–71
{asChild && childrenWithContent ? (
  <Slot<AnyObject> className={s.Header}>
    {childrenWithContent}
  </Slot>
) : (
  content
)}
<div className={s.Panel}>
  {meta && <div className={s.Meta}>{meta}</div>}
  {children}  {/* ← children рендерится здесь ВСЕГДА, в том числе при asChild */}
</div>
```

При `asChild=true` `children` передаётся в `cloneWithRef`, а затем ещё раз рендерится в `.Panel`. Содержимое дублируется.

### Смешанный `asChild`: `cloneWithRef` + `Slot`

Остальные компоненты библиотеки реализуют `asChild` только через `Slot`. Здесь используется `cloneWithRef` для добавления `children` в элемент, а затем `Slot` — нестандартный подход, сложный для поддержки.

---

## components/item.module.scss

### `flex: 1 !important` в `.Header`

```scss
.Header {
  flex: 1 !important;
}
```

`!important` — признак конфликта специфичности, особенно в связке с `asChild`, где внешний элемент может иметь собственные `flex` стили.

### Неправильные имена переменных `line-height`

```scss
line-height: var(--line-height-4);  // .Title:28
line-height: var(--line-height-4);  // .Subtitle:46
line-height: var(--line-height-3);  // .Meta:68
```

Переменные `--line-height-*` не существуют. Правильный паттерн: `--text-line-height-*`.

### Пустой класс `.Checkbox`

```scss
.Checkbox {}
```

Мёртвый CSS без стилей.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `EntityList.types.ts:3` | `React` не импортирован |
| 🟠 Высокий | `components/Item.tsx:61–71` | Двойной рендер `children` при `asChild=true` |
| 🟠 Высокий | `EntityList.tsx`, `Item.tsx` | `ref` не принимается и не пробрасывается |
| 🟠 Высокий | `components/Item.tsx:24` | `Item` не обёрнут в `memo` |
| 🟡 Средний | `EntityList.types.ts:14` | `onSelect` — нет `event` как последнего аргумента |
| 🟡 Средний | `EntityList.types.ts:12` | `islands` объявлен, но нигде не используется |
| 🟡 Средний | `components/Item.tsx:12` | `ItemContent` не обёрнут в `memo` |
| 🟡 Средний | `components/Item.tsx:52–64` | Смешанная логика `asChild`: `cloneWithRef` + `Slot` |
| 🟡 Средний | `components/item.module.scss:28,46,68` | `--line-height-*` → `--text-line-height-*` |
| 🟡 Средний | `components/item.module.scss:17` | `flex: 1 !important` — специфичность |
| 🟢 Низкий | `EntityList.tsx` | Значение контекста не мемоизировано |
| 🟢 Низкий | `components/item.module.scss:11` | Пустой класс `.Checkbox {}` |
