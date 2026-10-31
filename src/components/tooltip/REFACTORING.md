# Заметки по рефакторингу — components/tooltip

---

## Tooltip.tsx

### `forwardRef` — нарушение React 19 / CLAUDE.md; плюс неверный порядок обёрток с `memo`

```tsx
export const Tooltip = memo(forwardRef<HTMLElement, TooltipTypes>((...) => { ... }));
```

CLAUDE.md явно запрещает `forwardRef`. `Tooltip` должен принимать `ref` как обычный проп. Дополнительно: текущий порядок обёрток `memo(forwardRef(...))` неверен — правильный порядок `forwardRef(memo(...))`. Когда `memo` снаружи, React присваивает `displayName` от `memo`, что затрудняет отладку в DevTools.

### `role="tooltip"` на дочернем элементе — неверное расположение роли

```tsx
// клонируется дочерний элемент
cloneElement(child, {
  role: 'tooltip',
  'aria-label': String(content),
  ...
})
```

`role="tooltip"` по спецификации WAI-ARIA должен быть на самом всплывающем элементе-подсказке, а не на триггере. На триггере должен быть `aria-describedby`, ссылающийся на id тултипа. Текущая реализация приписывает роль тултипа к кнопке/ссылке, на которую наводят курсор, что является семантической ошибкой.

### `aria-label={String(content)}` на триггере — некорректное значение

```tsx
'aria-label': String(content),
```

Если `content` — это `ReactElement` (а не строка), `String(ReactElement)` вернёт `"[object Object]"`. Скринридер озвучит буквально `«object Object»` вместо текста подсказки. Нужно либо ограничить `content` строковым типом, либо передавать `aria-describedby` на id рендеренного тултипа.

### Отсутствует `AnimatePresence` — анимация закрытия не работает

```tsx
// motion.div рендерится/демонтируется без AnimatePresence
{isOpen && (
  <motion.div exit={{ opacity: 0 }} ...>
    {content}
  </motion.div>
)}
```

Без `AnimatePresence` Framer Motion не отслеживает демонтаж компонента, поэтому `exit`-анимация никогда не воспроизводится. Нужно обернуть условный рендер в `<AnimatePresence>`.

### `document.querySelector` вызывается в JSX на каждый рендер

```tsx
<FloatingPortal root={document.querySelector('[data-altrone-root]') as HTMLElement}>
```

Та же проблема, что и в `Popover.tsx` — синхронный поиск в DOM при каждом рендере. Следует вынести в `useMemo` или `useRef`.

### `FloatingArrow ref={arrowRef as any}` — типовой костыль

```tsx
<FloatingArrow ref={arrowRef as any} context={context} />
```

Приведение `as any` скрывает несоответствие типов. Нужно явно типизировать `arrowRef` согласно ожидаемому типу у `FloatingArrow` из `@floating-ui/react` — обычно `RefObject<SVGSVGElement>`.

### Комментарий на русском языке в исходном коде

```tsx
// Передаем ref наружу для правильной работы с Popover
```

Комментарии в исходном коде библиотеки должны быть на английском языке (или вовсе отсутствовать, если код самодокументирован). Русский комментарий усложняет поддержку для разработчиков, не владеющих языком.

---

## Tooltip.types.ts

### Интерфейс назван `TooltipTypes` вместо `TooltipProps`

```ts
export interface TooltipTypes { ... }
```

По соглашению всего проекта интерфейсы пропсов называются `<ComponentName>Props`. `TooltipTypes` нарушает это соглашение и вводит в заблуждение — звучит как пространство имён типов, а не как интерфейс пропсов.

### `JSX.Element` вместо `ReactElement`

```ts
content?: JSX.Element | string;
```

Следует использовать `ReactElement` из `'react'`, как принято во всей кодовой базе.

### `React` не импортирован в файле типов

```ts
// нет импорта React
export interface TooltipTypes {
  content?: JSX.Element | string;
}
```

`JSX.Element` требует глобального пространства JSX или импорта `React`. После замены на `ReactElement` нужно добавить явный импорт `import type { ReactElement } from 'react'`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Tooltip.tsx` | `role="tooltip"` на триггере вместо всплывающего элемента — грубая ARIA-ошибка |
| 🔴 Критический | `Tooltip.tsx` | `aria-label={String(content)}` — `"[object Object]"` для ReactElement-контента |
| 🟠 Высокий | `Tooltip.tsx` | Отсутствует `AnimatePresence` — `exit`-анимация никогда не воспроизводится |
| 🔴 Критический | `Tooltip.tsx` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп; порядок `memo(forwardRef(...))` также неверен |
| 🟡 Средний | `Tooltip.tsx` | `document.querySelector` в JSX на каждый рендер — вынести в `useMemo` |
| 🟡 Средний | `Tooltip.tsx` | `FloatingArrow ref={arrowRef as any}` — типовой костыль, скрывает реальный тип |
| 🟡 Средний | `Tooltip.types.ts` | Интерфейс назван `TooltipTypes` вместо `TooltipProps` — нарушение соглашения |
| 🟢 Низкий | `Tooltip.tsx` | Русскоязычный комментарий в исходном коде |
| 🟢 Низкий | `Tooltip.types.ts` | `JSX.Element` вместо `ReactElement` + отсутствует импорт `React` |
