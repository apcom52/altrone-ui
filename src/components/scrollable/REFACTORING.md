# Заметки по рефакторингу — components/scrollable

---

## Scrollable.tsx

### Большинство задекларированных пропсов не используются

```tsx
({
  direction = 'vertical',  // не используется
  offset = 0,              // не используется
  maxWidth,                // не используется
  maxHeight,               // не используется
  showShadows = true,      // не используется
  onScroll,                // не используется
  ...
})
```

Пять пропсов (`direction`, `offset`, `maxWidth`, `maxHeight`, `showShadows`) задекларированы в типах, деструктурируются, но никогда не применяются в рендере. Компонент всегда скроллируется вертикально, без теней и без ограничений размера. Функциональность либо не реализована, либо была удалена, а сигнатура не обновлена.

### `useImperativeHandle` без массива зависимостей

```ts
useImperativeHandle(ref, () => {
  const instance = scrollableRef.current?.osInstance() as HTMLDivElement;
  return instance?.elements().viewport ?? null;
});
// нет третьего аргумента []
```

Без массива deps хэндлер пересоздаётся при каждом рендере. Следует передать `[]` или `[scrollableRef]`.

### Тема скроллбара `os-theme-dark` захардкожена

```tsx
options={{
  scrollbars: { theme: 'os-theme-dark', ... }
}}
```

Тёмная тема скроллбара применяется независимо от темы приложения. Следует переключать тему динамически в зависимости от `AltroneDark` или использовать кастомную CSS-тему.

### `scrollableRef` без типового параметра

```ts
const scrollableRef = useRef(null);
```

Без явного типа ref инферируется как `MutableRefObject<null>`, что не соответствует ожидаемому типу `OverlayScrollbarsComponent`. Нужен `useRef<OverlayScrollbarsComponentRef>(null)`.

---

## scrollable.module.scss

### Вложенный `:global(.AltroneDark)` внутри `:global(:root)` — неверный селектор

```scss
:global(:root) {
  --scrollbarShadowColor: rgba(0, 0, 0, 0.1);

  :global(.AltroneDark) {           // ← вложен
    --scrollbarShadowColor: rgba(255, 255, 255, 0.2);
  }
}
```

Сгенерированный CSS-селектор: `:root .AltroneDark { ... }` — это потомок `.AltroneDark` внутри `:root`. Поскольку `.AltroneDark` добавляется на `<html>` (который и есть `:root`), элемент никогда не будет одновременно предком и потомком самого себя. Тёмная тема переменная **никогда не применяется**. Нужно вынести в отдельное правило:

```scss
:global(.AltroneDark) {
  --scrollbarShadowColor: rgba(255, 255, 255, 0.2);
}
```

### `.Content`, `.Shadow`, `.EndShadow`, `.Horizontal` — мёртвые CSS-классы

Ни один из этих классов не применяется в `Scrollable.tsx`. `.Content` с `overflow-y: overlay` (устаревшее свойство) также никогда не используется. Весь этот код — остаток нереализованной или удалённой функциональности.

### `overflow-y: overlay` — устаревшее значение

```scss
.Content {
  overflow-y: auto;
  overflow-y: overlay;  // deprecated
}
```

`overflow-y: overlay` удалён из спецификации и не поддерживается в новых браузерах.

---

## Scrollable.types.ts

### `React` не импортирован

```ts
// нет импорта
export interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement>
```

### Неиспользуемые пропсы в публичном API

`direction`, `offset`, `maxWidth`, `maxHeight`, `showShadows` объявлены в публичном интерфейсе, создавая у потребителей ложные ожидания реализованной функциональности.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `scrollable.module.scss:6–8` | Тёмная тема никогда не применяется — неверный вложенный CSS-селектор |
| 🟠 Высокий | `Scrollable.tsx:15–20` | 5 пропсов объявлены и деструктурируются, но не реализованы |
| 🟡 Средний | `Scrollable.tsx:26–29` | `useImperativeHandle` без deps — хэндлер пересоздаётся при каждом рендере |
| 🟡 Средний | `Scrollable.tsx:48` | Тема скроллбара `os-theme-dark` захардкожена — не реагирует на тему приложения |
| 🟡 Средний | `scrollable.module.scss:20–26` | `.Content`, `.Shadow`, `.EndShadow`, `.Horizontal` — мёртвые CSS-классы |
| 🟢 Низкий | `Scrollable.tsx:24` | `useRef(null)` без типового параметра |
| 🟢 Низкий | `scrollable.module.scss:23` | `overflow-y: overlay` — устаревшее CSS-значение |
| 🟢 Низкий | `Scrollable.types.ts` | `React` не импортирован |
