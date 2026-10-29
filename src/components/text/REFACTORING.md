# Заметки по рефакторингу — components/text

---

## Text.tsx

### Критический баг: хук вызывается условно — нарушение Rules of Hooks

```ts
// line 29
const textSize = (size ? size : useTextSize()) || 3;
```

`useTextSize()` вызывается только когда `size` falsy. Это прямое нарушение [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks): хуки должны вызываться безусловно, на верхнем уровне компонента. В React strict mode это выбросит ошибку, а в обычном режиме приведёт к непредсказуемому поведению при изменении `size` между рендерами.

Исправление:
```ts
const contextSize = useTextSize();
const textSize = size ?? contextSize;
```

### Баг: `href` передаётся во все теги независимо от контекста

```ts
// line 79–89
return createElement(tagName, {
  ...
  href,          // передаётся всегда
  ...restProps,
});
```

Когда `tagName` равен `p`, `span`, `ol`, `ul` или `li`, `href` всё равно попадает в DOM-атрибуты. React выдаст предупреждение об неизвестном атрибуте, а HTML-валидатор сообщит об ошибке.

Исправление: передавать `href` только при `tagName === 'a'`.

### Конфликтующие пропсы не проверяются

Компонент допускает семантически некорректные комбинации без предупреждений:

- `block={true}` + `href="..."` — рендерится `<p href="...">`, что невалидный HTML
- `list="numeric"` + `block={true}` — `block` побеждает в `if`-цепочке, получается `<p>` вместо `<ol>`
- `code={true}` + `kbd={true}` — оба класса применяются одновременно, стили конфликтуют
- `item={true}` без родительского `<ol>`/`<ul>` — `<li>` вне списка

В режиме разработки стоит добавить `console.warn` для явно некорректных сочетаний.

### `size = undefined` как явное дефолтное значение

```ts
// line 11
size = undefined,
```

Явное `= undefined` как дефолт избыточно — проп и так будет `undefined` если не передан. Это создаёт ложное впечатление, что автор намеренно разграничивает "не передан" и `undefined`, хотя в данном случае разницы нет.

### `createElement` вместо JSX без очевидной причины

```ts
return createElement(tagName, {
  className: cls,
  style: styles,
  children: (...),
  href,
  ...restProps,
});
```

Использование `createElement` напрямую снижает читаемость и лишает TypeScript возможности проверять корректность пропсов для конкретного тега. Стандартный паттерн для динамических тегов:

```tsx
const Tag = tagName as keyof JSX.IntrinsicElements;
return <Tag className={cls} style={styles} {...restProps}>{...}</Tag>;
```

---

## Text.types.ts

### `React` не импортирован

```ts
// line 1
export interface TextProps extends React.HTMLAttributes<HTMLDivElement>
```

`React` нигде не импортирован. Работает только если типы React доступны глобально через `tsconfig`.

### Тип расширяет `HTMLDivElement`, но компонент рендерится как разные теги

`React.HTMLAttributes<HTMLDivElement>` не включает атрибуты, специфичные для других тегов:

- Для `<a>`: нет `target`, `rel`, `download` — они есть только в `AnchorHTMLAttributes`
- Для `<ol>`: нет `reversed`, `start`, `type` — только в `OlHTMLAttributes`

При этом `...restProps` всё равно пробросит эти атрибуты в DOM, но TypeScript не будет их проверять и не подскажет их в автодополнении.

---

## Text.context.ts

### Дефолтное значение контекста не совпадает с фолбэком в компоненте

```ts
// Text.context.ts — line 3
export const TextSizeContext = createContext<number>(4);  // дефолт = 4

// Text.tsx — line 29
const textSize = (size ? size : useTextSize()) || 3;     // фолбэк = 3
```

Если провайдер отсутствует, `useTextSize()` вернёт `4` (дефолт контекста), и `|| 3` никогда не сработает — это мёртвый код. Если намерение было "дефолтный размер = 3", то и контекст должен инициализироваться значением `3`. Если "дефолт = 4" — фолбэк `|| 3` нужно убрать.

---

## text.module.scss

### Тёмная тема через атрибут, а не через класс `.AltroneDark` — нарушение конвенции

```scss
/* Используется в компоненте */
:global([data-altrone-root='true'][data-altrone-theme='dark']) {
  ...
}
```

CLAUDE.md явно предписывает:
> Dark mode is toggled by adding `.AltroneDark` to `<html>`. Component styles should use `:global(.AltroneDark) &` for dark overrides.

Все остальные компоненты должны использовать `:global(.AltroneDark) &`, а здесь применяется атрибут на корневом элементе. Это создаёт несогласованность: если механизм переключения темы изменится, этот компонент потребует отдельного обновления.

### Захардкоженные значения вместо CSS-переменных

```scss
/* line 91 */
.List {
  padding-left: 24px;     /* должна быть CSS-переменная */
}

/* line 116, 141 */
.Highlighted {
  border-radius: 8px;     /* должна быть CSS-переменная */
}

.Code {
  border-radius: 8px;     /* должна быть CSS-переменная */
}
```

CLAUDE.md запрещает хардкодить стилевые значения. Нужно использовать переменные из дизайн-системы (например `var(--border-radius-sm)`, `var(--m-gap)` или аналогичные).

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Text.tsx:29` | Условный вызов хука `useTextSize()` — нарушение Rules of Hooks |
| 🟠 Высокий | `Text.tsx:87` | `href` передаётся во все теги, включая `p`, `span`, `ol` |
| 🟠 Высокий | `text.module.scss:10–16` | Тёмная тема через атрибут вместо класса `.AltroneDark` — нарушение конвенции |
| 🟡 Средний | `Text.tsx` | Конфликтующие пропсы не валидируются (`block+href`, `code+kbd` и др.) |
| 🟡 Средний | `Text.types.ts:1` | Тип расширяет `HTMLDivElement`, хотя компонент рендерится как `a`, `ol`, `ul`, `li` |
| 🟡 Средний | `text.module.scss:91,116,141` | Захардкоженные `24px` и `8px` вместо CSS-переменных |
| 🟢 Низкий | `Text.context.ts:3` | Дефолт контекста `4` не совпадает с фолбэком `\|\| 3` в компоненте — мёртвый код |
| 🟢 Низкий | `Text.tsx:79` | `createElement` вместо JSX снижает читаемость и типобезопасность |
| 🟢 Низкий | `Text.tsx:11` | `size = undefined` — явный дефолт `undefined` избыточен |
| 🟠 Высокий | `Text.tsx` | `ref` не пробрасывается — компонент не принимает `ref` в пропсах, нарушение обязательного требования CLAUDE.md |
| 🟢 Низкий | `Text.types.ts:1` | `React` не импортирован явно |
