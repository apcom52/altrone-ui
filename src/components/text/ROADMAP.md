# Roadmap — components/text

---

## Отсутствующие функции

### `truncate` и `lineClamp` — обрезка текста

Нет поддержки обрезки текста с многоточием. Для UI с фиксированной шириной это частая потребность.

```tsx
<Text truncate>Длинный текст, который не должен переноситься...</Text>
<Text lineClamp={3}>Текст, ограниченный тремя строками...</Text>
```

`truncate` → `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`
`lineClamp={n}` → `-webkit-line-clamp: n; overflow: hidden; display: -webkit-box`

---

### `align` — выравнивание текста

Нет управления горизонтальным выравниванием. Актуально для `block={true}`.

```tsx
<Text block align="center">Заголовок по центру</Text>
<Text block align="justify">Выровненный абзац</Text>
```

Значения: `'left' | 'center' | 'right' | 'justify'`

---

### `color` — цвет текста из дизайн-системы

Нет способа задать семантический цвет через проп. Сейчас только через `style={{ color: '...' }}`.

```tsx
<Text color="danger">Ошибка</Text>
<Text color="success">Успех</Text>
<Text color="muted">Вспомогательный текст</Text>
```

Значения должны ссылаться на CSS-переменные дизайн-системы (`--danger-11`, `--success-11`, `--text-2` и т.д.), а не принимать произвольные строки.

---

### `highlighted` color variant — цвет подсветки

Сейчас `highlighted` поддерживает только один цвет (accent). Нет варианта для предупреждений, ошибок, успеха.

```tsx
<Text highlighted>accent (сейчас)</Text>
<Text highlighted="warning">предупреждение</Text>
<Text highlighted="danger">ошибка</Text>
<Text highlighted="success">успех</Text>
```

---

### `nowrap` — запрет переноса строк

```tsx
<Text nowrap>Текст в одну строку</Text>
```

→ `white-space: nowrap`

---

### `sub` и `sup` — индексы

Нет поддержки нижнего и верхнего индекса.

```tsx
<Text sub>2</Text>  {/* H₂O */}
<Text sup>2</Text>  {/* E=mc² */}
```

→ теги `<sub>` и `<sup>`

---

### `mark` — поисковое выделение

Семантически отличается от `highlighted`: `highlighted` — это дизайнерское выделение, `mark` — результат поиска/сопоставления.

```tsx
<Text mark>найденное слово</Text>
```

→ тег `<mark>`

---

### `abbr` — аббревиатуры

```tsx
<Text abbr="HyperText Markup Language">HTML</Text>
```

→ тег `<abbr title="...">` с подчёркиванием пунктиром и `cursor: help`

---

### `external` — удобный проп для внешних ссылок

Сейчас для открытия ссылки в новой вкладке нужно вручную указывать `target` и `rel`:

```tsx
<Text href="https://example.com" target="_blank" rel="noopener noreferrer">Ссылка</Text>
```

Проп `external` должен делать это автоматически:

```tsx
<Text href="https://example.com" external>Ссылка</Text>
```

→ автоматически добавляет `target="_blank" rel="noopener noreferrer"`

---

### Семантические заголовки `h1`–`h6`

Сейчас `block={true}` рендерит только `<p>`. Нет способа получить `<h1>`–`<h6>` для семантической разметки страницы.

```tsx
<Text as="h1" size={8} weight="bold">Заголовок страницы</Text>
```

Либо через отдельный проп `heading={1}` → `<h1>`, либо через полиморфный `as`.

---

### `as` — полиморфный тег

Нет возможности задать произвольный тег или компонент. Нужно для интеграции с роутерами.

```tsx
<Text as={RouterLink} href="/about">О нас</Text>
<Text as="span" block>Параграф через span</Text>
```

Реализация через полиморфный generic аналогична паттерну Radix `asChild` или `as`-пропу.

---

## Архитектурные улучшения

### Namespace sub-components: `Text.List` и `Text.Item`

Паттерн проекта предписывает namespace export для составных компонентов (`CLAUDE.md`). Список и его элемент — составной компонент, но сейчас всё реализовано через один `Text` с пропсами.

```tsx
// Сейчас
<Text list="numeric">
  <Text item>Пункт</Text>
</Text>

// Предлагается
<Text.List type="numeric">
  <Text.Item>Пункт</Text.Item>
</Text.List>
```

`Text.List` управляет контекстом списка, `Text.Item` — `<li>` с правильным отступом. Это позволяет добавлять логику (например, иконки для `marked`) без перегрузки основного `Text`.

---

### Runtime-предупреждения о конфликтующих пропсах

TypeScript запрещает передавать конфликтующие пропсы при наличии типов, но не защищает при использовании через `as any` или из JavaScript. Нужен `console.warn` в `import.meta.env.DEV`:

- `block` + `href` → рендерится `<p href="...">`, невалидный HTML
- `code` + `kbd` → стили конфликтуют
- `underline` + `deleted` → два декоративных декорирования одновременно
- `item` без родительского `list` → `<li>` вне `<ol>`/`<ul>`

---

### `TextSizeContext` не сбрасывается при смене контейнера

При вложенном использовании размер наследуется через контекст:

```tsx
<Text size={6}>           {/* устанавливает contextSize = 6 */}
  <Text list="numeric">   {/* наследует contextSize = 6 */}
    <Text item>           {/* тоже получает size = 6 */}
```

Элементы списка получают `size=6`, хотя ожидался сброс к дефолту. Контейнерные варианты (`list`, `block`) должны сбрасывать контекст или не передавать его дальше.

---

## Качество кода

### Отсутствуют unit-тесты (`Text.test.tsx`)

Нет файла тестов. Минимальный набор:
- рендерится нужный тег для каждого варианта (`block` → `p`, `list` → `ol`/`ul` и т.д.)
- `href` передаётся только на `<a>`
- `ref` корректно пробрасывается на DOM-элемент
- размер из `TextSizeContext` применяется при отсутствии явного `size`
- CSS-классы применяются корректно для каждого визуального пропа

---

### `Text.types.ts` не экспортирует все интерфейсы из `index.ts`

`index.ts` экспортирует только `Text`, но не `TextProps` и варианты (`TextBlockProps`, `TextLinkProps` и т.д.). Потребители, которые хотят типизировать пропсы, не смогут их импортировать.

```ts
// index.ts — нужно добавить:
export type {
  TextProps,
  TextBlockProps,
  TextNumericListProps,
  TextMarkedListProps,
  TextItemProps,
  TextLinkProps,
  TextDefaultProps,
} from './Text.types.ts';
```
