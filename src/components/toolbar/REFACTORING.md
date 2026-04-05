# Заметки по рефакторингу — components/toolbar

---

## Toolbar.types.ts

### `React` не импортирован

```ts
// Toolbar.types.ts:4
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
```

`React` используется как пространство имён для типов без импорта.

### `ref` не объявлен ни в одном интерфейсе

Ни `ToolbarProps`, ни `ToolbarActionProps`, ни `ToolbarGroupProps` (и другие) не объявляют `ref` — нарушение соглашения React 19.

---

## Toolbar.tsx

### `ref` не принимается

Компонент принимает `{...restProps}` и рендерит корневой `<div>`, но `ref` не объявлен в типах и не пробрасывается явно.

---

## components/Action.tsx

### `ref` деструктурируется, но не используется явно

```tsx
// Action.tsx:8
const { showLabel = true, kbd, ref } = props;
```

`ref` деструктурируется для чтения, но затем `<Button {...props} variant="text" />` спредит `props` вместе с `ref`. Деструктуризация создаёт ложное впечатление, что `ref` обрабатывается явно. Достаточно просто передать `{...props}` — явная деструктуризация только запутывает.

### Нет `memo`

`Action` не обёрнут в `memo`.

### Чрезмерный `useMemo` для простого маппинга

```tsx
// Action.tsx:11–21
const toolbarPlacement = useMemo(() => {
  if (placement.startsWith('top')) return 'bottom';
  else if (placement.startsWith('left')) return 'right';
  else if (placement.startsWith('right')) return 'left';
  return 'top';
}, [placement]);
```

4-ветковый маппинг строк не требует мемоизации — стоимость `useMemo` превышает выгоду. Достаточно обычной переменной или объекта-маппинга.

---

## components/Group.tsx

### `weight` принимается, но не применяется

```tsx
// Group.tsx:11
weight = 1,
```

Проп `weight` принимается и предположительно должен задавать `flex: ${weight}` для изменения пропорций группы. Но в JSX нет `style={{ flex: weight }}` и в SCSS нет соответствующего CSS-переменного механизма — проп игнорируется.

### `toolbarConfig.className` применяется к `Group`, хотя нужна конфигурация для группы

```tsx
const cls = clsx(s.Group, ..., toolbarConfig.className);
```

`toolbarConfig` — конфигурация всего `Toolbar`, а не его `Group`. Нужно использовать `toolbarConfig.group?.className` или отдельную конфигурационную секцию для `Group`.

---

## components/Title.tsx

### Нет `memo`

`Title` не обёрнут в `memo`.

---

## components/action.module.scss

### `@import 'src/global/mixins'` и использование `@include`

```scss
// action.module.scss:1
@import 'src/global/mixins';

// action.module.scss:19–21
@include no-appearance;
@include no-selection;
@include focus;

// action.module.scss:34
@include disabled;

// action.module.scss:57
@include label;
```

По соглашению проекта импорты SCSS и миксины — устаревший паттерн. `@include label` переопределяет типографику через миксин — нужно заменить прямыми CSS-переменными (`var(--text-size-*)`, `var(--text-weight-*)`, `var(--text-line-height-*)`).

### CSS-переменные для кнопки действия не определены

```scss
// action.module.scss:4
--textColor: var(--toolbarActionTextColor);

// action.module.scss:24–25
--textColor: var(--toolbarActionHoveredTextColor);
--iconBg: var(--toolbarActionHoveredBackgroundColor);
```

`--toolbarActionTextColor`, `--toolbarActionHoveredTextColor`, `--toolbarActionHoveredBackgroundColor`, `--toolbarActionPressedTextColor`, `--toolbarActionPressedBackgroundColor` — ни одна из этих переменных не определена ни в `toolbar.module.scss`, ни где-либо ещё. Компонент падает на дефолтные браузерные значения.

---

## toolbar.module.scss

### `@import 'src/global/mixins'`

```scss
// toolbar.module.scss:1
@import 'src/global/mixins';
```

Файл миксины не используются (нет `@include`), но импорт присутствует — мёртвый импорт.

### `.Fixed` использует `position: absolute` вместо `fixed`

```scss
// toolbar.module.scss:16
.Fixed {
  position: absolute;
}
```

Класс называется `.Fixed`, но применяет `position: absolute`. Семантически ожидается `position: fixed`. Если поведение намеренное — класс нужно переименовать.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Toolbar.types.ts:4` | `React` не импортирован |
| 🟠 Высокий | `Toolbar.tsx`, `Action.tsx`, `Group.tsx`, `Title.tsx` | `ref` не принимается и не пробрасывается |
| 🟠 Высокий | `components/action.module.scss:4,24–25` | CSS-переменные `--toolbarAction*` нигде не определены |
| 🟠 Высокий | `components/action.module.scss:1,19–21,34,57` | `@import` и несколько `@include` миксинов |
| 🟡 Средний | `components/Group.tsx:11` | `weight` принимается, но не применяется к стилям |
| 🟡 Средний | `components/Group.tsx:27` | `toolbarConfig.className` для всего toolbar применяется к Group |
| 🟡 Средний | `components/Action.tsx` | Нет `memo` |
| 🟡 Средний | `components/Title.tsx` | Нет `memo` |
| 🟡 Средний | `components/Action.tsx:11–21` | `useMemo` для простого строкового маппинга — излишне |
| 🟢 Низкий | `toolbar.module.scss:1` | `@import 'src/global/mixins'` — миксины не используются |
| 🟢 Низкий | `toolbar.module.scss:16` | `.Fixed { position: absolute }` — семантически неверное имя |
| 🟢 Низкий | `components/Action.tsx:8` | Деструктуризация `ref` без явной цели — запутывает |
