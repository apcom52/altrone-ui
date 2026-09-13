# Заметки по рефакторингу — components/textarea

---

## Textarea.tsx

### `forwardRef` вместо React 19 — нарушение соглашения проекта

```tsx
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => { ... }
);
```

По правилам CLAUDE.md `forwardRef` не используется — `ref` принимается как обычный проп.

### `cls` применяется дважды к разным элементам

```tsx
const cls = clsx(s.Textarea, inputStyles.Input, { ... }, textareaConfig.className, className);

return (
  <TextInput
    className={cls}               // ← класс передаётся в обёртку TextInput
    ...
    Component={<textarea className={cls} ref={ref} />}  // ← и одновременно в сам textarea
  />
);
```

Один и тот же набор классов, включая `.Input` из textInput-стилей, накладывается и на `TextInput`-обёртку, и на внутренний `<textarea>`. Стили дублируются — это может давать неожиданные визуальные эффекты. Классы для `<textarea>` и для обёртки должны быть разными.

### `children` деструктурируется, но нигде не используется

```tsx
const Textarea = forwardRef<...>(({ className, style, name, invalid, disabled, size, children, readOnly, ...restProps }, ref) => {
  // children не используется в JSX
```

`children` извлечён из пропсов (и, следовательно, не попадёт в `restProps`), но ни разу не рендерится. Потребитель не может передать дочерние элементы — они будут молча проигнорированы.

---

## textarea.module.scss

### `.WithIslands` определён, но никогда не применяется

```scss
.WithIslands {
  padding-bottom: calc(var(--text-input-action-island-size) + 8px);
}
```

Класс существует в SCSS, но `Textarea.tsx` его не добавляет ни при каких условиях. Мёртвый CSS.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Textarea.tsx:10` | `forwardRef` вместо React 19 ref-как-проп |
| 🟠 Высокий | `Textarea.tsx:41–68` | `cls` применяется к обёртке `TextInput` и к `<textarea>` одновременно — дублирование классов |
| 🟡 Средний | `Textarea.tsx:19` | `children` деструктурируется, но не рендерится — молча игнорируется |
| 🟢 Низкий | `textarea.module.scss:12–14` | `.WithIslands` — мёртвый CSS, никогда не применяется |
