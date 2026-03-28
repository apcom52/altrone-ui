# Заметки по рефакторингу — components/grid

---

## Grid.tsx

### CSS-переменная `--child-columns` устанавливается, но нигде не используется

```ts
const styles = {
  ...gridConfig.style,
  ...style,
  '--child-columns': Children.count(children),
};
```

`Children.count(children)` вычисляется на каждом рендере и записывается в CSS-переменную `--child-columns`. Однако ни `styles.module.scss`, ни `column.module.scss` эту переменную не используют. Это мёртвый код с ненужными вычислениями.

### Проп `wrap` принимается, но не применяется

```ts
const { children, wrap = true, className, style, ...restProps } = props;
// wrap нигде не используется дальше
```

В SCSS есть класс `.Wrap { flex-wrap: wrap; }`, но он никогда не добавляется — ни при `wrap=true`, ни при `wrap=false`. Поведение `flex-wrap` не контролируется пропом.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## components/Column.tsx

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

### `[s.Offset]: offset` — класс не добавляется при `offset=0`, но `--column-offset: 0` всё равно устанавливается

```ts
const cls = clsx(s.Column, {
  [s.Offset]: offset,  // ← при offset=0 класс не добавляется
});
const styles = {
  '--column-offset': offset,  // ← CSS-переменная устанавливается всегда
};
```

Без класса `.Offset` CSS-правило `margin-left: calc(var(--column-offset) / 12 * 100%)` не применяется — переменная устанавливается впустую. Это безвредно, но непоследовательно.

---

## Grid.types.ts

### `GridProps extends React.HTMLProps<HTMLDivElement>` вместо `HTMLAttributes`

```ts
export interface GridProps extends React.HTMLProps<HTMLDivElement> {}
```

Все остальные компоненты используют `React.HTMLAttributes<HTMLDivElement>`. `HTMLProps` включает дополнительные поля, в том числе `ref` — что расходится с подходом «ref как обычный проп» из React 19. Следует использовать `HTMLAttributes`.

### `React` не импортирован

`React.HTMLProps` и `React.HTMLAttributes` используются без явного импорта.

---

## styles.module.scss

### `.Wrap` определён, но никогда не применяется

```scss
.Wrap {
  flex-wrap: wrap;
}
```

Класс `.Wrap` существует, но `Grid.tsx` его не добавляет (см. выше). Мёртвый CSS.

### `--column-spacing` и `--row-spacing` определены, но не используются

```scss
--column-spacing: var(--gap);
--row-spacing: var(--gap);
```

Два CSS-токена объявлены в сетке, но ни один из них не используется ни в `styles.module.scss`, ни в `column.module.scss`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Grid.tsx:9,17` | Проп `wrap` принимается, но не применяется — поведение `flex-wrap` не контролируется |
| 🟡 Средний | `Grid.tsx:17` | `--child-columns` вычисляется и устанавливается, но нигде не используется |
| 🟡 Средний | `Grid.tsx` | `ref` не пробрасывается |
| 🟡 Средний | `components/Column.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `Grid.types.ts:1` | `HTMLProps` вместо `HTMLAttributes` — несоответствие соглашению проекта |
| 🟢 Низкий | `Grid.types.ts` | `React` не импортирован |
| 🟢 Низкий | `styles.module.scss:11–13` | `.Wrap` — мёртвый CSS, никогда не применяется |
| 🟢 Низкий | `styles.module.scss:2–3` | `--column-spacing`, `--row-spacing` — объявлены, но нигде не используются |
