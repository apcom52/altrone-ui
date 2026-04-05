# Заметки по рефакторингу — components/spoiler

---

## Spoiler.types.ts

### `React` не импортирован

```ts
// Spoiler.types.ts:1
export interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
```

`React` используется как пространство имён, но импорт отсутствует.

### `ref` не объявлен в типах

По правилам React 19 и проекта `ref` должен быть явным пропом. В `SpoilerProps` его нет.

---

## Spoiler.tsx

### Устаревший импорт `framer-motion` вместо `motion/react`

```tsx
// Spoiler.tsx:8
import { AnimatePresence, motion } from 'framer-motion';
```

Проект использует пакет `motion/react`. `framer-motion` — устаревший алиас.

### `onToggle` деструктурируется, но не объявлен в типах и молча игнорируется

```tsx
// Spoiler.tsx:17
onToggle,
```

`onToggle` не объявлен в `SpoilerProps` (TypeScript примет это через `React.HTMLAttributes`, только если такое свойство там есть). Главное — внутри компонента `onToggle` не вызывается при переключении, что делает подписку на событие toggle невозможной. Это баг: потребитель не может получить обратный вызов при открытии/закрытии.

### `ref` не принимается и не пробрасывается

Компонент рендерит `<div>` как корень, но `ref` не принимается и не передаётся.

---

## spoiler.module.scss

### `@import 'src/global/mixins'` и использование миксинов

```scss
// spoiler.module.scss:1
@import 'src/global/mixins';

// spoiler.module.scss:35–36
@include no-selection;
@include focus;
```

По соглашению проекта импорты в SCSS — устаревший паттерн. `@include no-selection` и `@include focus` — типографические миксины, которые нужно заменить прямыми CSS-правилами.

### Захардкоженные значения типографики

```scss
// spoiler.module.scss:6
--spoiler-text-size: 14px;       // ← должно быть var(--text-size-3)

// spoiler.module.scss:32
font-weight: 600;                  // ← должно быть var(--text-weight-bold)

// spoiler.module.scss:33
line-height: 32px;                 // ← должно быть CSS-переменная

// spoiler.module.scss:47
font-size: 18px;                   // ← размер иконки, должно быть через переменную или inherit
```

Все значения должны использовать CSS-переменные из дизайн-системы.

### Мёртвый CSS: `&::-webkit-details-marker`

```scss
// spoiler.module.scss:38–40
&::-webkit-details-marker {
  display: none;
}
```

Псевдо-элемент `::-webkit-details-marker` существует только у элемента `<details>`. Компонент использует `<div>` — это правило никогда не применится.

### Класс `.Opened` объявлен в `clsx`, но не определён в SCSS

```tsx
// Spoiler.tsx:27
[s.Opened]: opened,
```

В `spoiler.module.scss` нет класса `.Opened`. Он будет `undefined` — clsx молча проигнорирует. Мёртвый код на стороне JS.

---

## Spoiler.stories.tsx

### Пустая функция `play` с закомментированным кодом

```tsx
play: () => {
  // const canvas = within(canvasElement);
},
```

Функция `play` объявлена, но ничего не делает. Закомментированный код внутри лишний.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Spoiler.tsx:8` | `framer-motion` → `motion/react` |
| 🟠 Высокий | `Spoiler.tsx:17` | `onToggle` не вызывается — подписка на toggle недоступна потребителю |
| 🟠 Высокий | `Spoiler.tsx` | `ref` не принимается и не пробрасывается |
| 🟠 Высокий | `Spoiler.types.ts:1` | `React` не импортирован |
| 🟡 Средний | `spoiler.module.scss:1,35–36` | `@import` и `@include` миксины |
| 🟡 Средний | `spoiler.module.scss:6` | `--spoiler-text-size: 14px` → `var(--text-size-3)` |
| 🟡 Средний | `spoiler.module.scss:32` | `font-weight: 600` → `var(--text-weight-bold)` |
| 🟡 Средний | `spoiler.module.scss:33` | `line-height: 32px` → CSS-переменная |
| 🟡 Средний | `spoiler.module.scss:47` | `font-size: 18px` → CSS-переменная |
| 🟢 Низкий | `spoiler.module.scss:38–40` | `&::-webkit-details-marker` — мёртвый CSS для `<details>` |
| 🟢 Низкий | `Spoiler.tsx:27` | `s.Opened` — класс не определён в SCSS |
| 🟢 Низкий | `Spoiler.stories.tsx:65–67` | Пустая функция `play` с закомментированным кодом |
