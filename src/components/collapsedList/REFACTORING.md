# Заметки по рефакторингу — components/collapsedList

---

## CollapsedList.tsx

### Баг: `transparent` — несуществующий проп `Button`

```tsx
// line 90–95
<Button
  transparent       // ← нет такого пропса в ButtonProps
  label={expandButtonLabelText}
  rightIcon={...}   // ← нет такого пропса в ButtonProps
  onClick={toggle}
/>
```

`ButtonProps` не содержит ни `transparent`, ни `rightIcon`. TypeScript должен был поймать это при строгой проверке. `transparent` пробросится как HTML-атрибут на `<button>` и вызовет React-предупреждение. Судя по контексту, нужны `variant="text"` вместо `transparent` и `additionalIcon` вместо `rightIcon`.

### Баг: `||` вместо `??` при чтении лимита из конфига

```ts
// line 33
const limitValue =
  typeof limit === 'number' ? limit : collapsedListConfig.limit || 5;
```

Если в конфиге задан `limit: 0` (скрыть все элементы изначально), `|| 5` вернёт `5` — нулевое значение некорректно обработается. Нужно использовать `?? 5`.

### `restElementsLength` может быть отрицательным

```ts
// line 40
const restElementsLength = safeArray.length - limitValue;
```

Если `limit` больше количества элементов, значение будет отрицательным. Кнопка раскрытия при этом не отображается (условие `restElementsLength > 0`), но значение передаётся в переменную перевода `count` — при случайном изменении логики отображения кнопки текст мог бы стать «Показать -3 ещё». Безопаснее: `Math.max(0, safeArray.length - limitValue)`.

### Внешний `<Flex>` имеет хардкодный `gap="m"`, не переопределяемый через пропсы

```tsx
// line 78–83
<Flex
  direction="vertical"
  gap="m"          // ← всегда m, не зависит от пропса gap
  ...
>
  <Flex direction="vertical" gap={gap}>   // ← gap пропс уходит сюда
```

Проп `gap` влияет только на расстояние между дочерними элементами, но не на отступ между списком и кнопкой «Показать ещё». Это может быть неочевидно для потребителей.

---

## CollapsedList.types.ts

### `React` не импортирован

```ts
export interface CollapsedListProps extends React.HTMLAttributes<HTMLDivElement>
```

`React` нигде не импортирован.

---

## collapsed-list.module.scss

### `var(--gap)` — неопределённая CSS-переменная

```scss
.CollapsedList {
  gap: var(--gap);
}
```

В дизайн-системе spacing-переменные именуются с суффиксом размера: `--xs-gap`, `--s-gap`, `--m-gap`, `--l-gap`. Переменная `--gap` без суффикса скорее всего не определена — gap будет `0` или унаследованным значением.

### `.Content` класс определён, но не используется

```scss
.Content {
  display: flex;
  flex-direction: column;
}
```

Класс `s.Content` нигде не применяется в `CollapsedList.tsx`. Мёртвый CSS.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `CollapsedList.tsx:90–95` | `transparent` и `rightIcon` — несуществующие пропсы `Button`, вызовут runtime-предупреждение |
| 🟠 Высокий | `CollapsedList.tsx` | `ref` не пробрасывается — нарушение CLAUDE.md |
| 🟠 Высокий | `CollapsedList.tsx:33` | `\|\|` вместо `??` — `limit: 0` из конфига игнорируется |
| 🟠 Высокий | `collapsed-list.module.scss:3` | `var(--gap)` — скорее всего не определена в дизайн-системе |
| 🟡 Средний | `CollapsedList.tsx:40` | `restElementsLength` может быть отрицательным |
| 🟡 Средний | `CollapsedList.tsx:78–88` | Внешний `gap="m"` хардкодный — проп `gap` не управляет всем отступом |
| 🟢 Низкий | `collapsed-list.module.scss:7–10` | `.Content` определён, но нигде не применяется |
| 🟢 Низкий | `CollapsedList.types.ts:11` | `React` не импортирован явно |
