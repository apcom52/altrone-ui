# Заметки по рефакторингу — components/select

---

## Select.tsx

### `key={optionIndex}` — индекс массива как ключ

```tsx
filteredOptions.map((option, optionIndex) => (
  <Dropdown.Checkbox key={optionIndex} ... />
))
```

При поиске (`filteredOptions` меняется) React получает нестабильные ключи. Элементы с `key=0` в разных наборах — разные опции, что приводит к некорректному reconciliation. Следует использовать `key={option.value}`.

### `selectContext.expanded` всегда `false`

```ts
const selectContext: SelectContext = {
  expanded: false,  // ← захардкожено
  ...
};
```

Реальное состояние `opened` доступно только внутри render-функции `{({ opened }) => ...}`, но в `selectContext` передаётся `false`. Потребители `renderFunc` и `Component`, использующие `context.expanded`, никогда не увидят открытое состояние.

### `props.readonly` — несоответствие имени пропса

```tsx
readOnly={props.readonly ? props.readonly : !(searchable && searchMode)}
readonlyStyles={!props.readonly ? false : true}
```

В `SelectProps` проп объявлен как `readonly` (lowercase), обращение через `props.readonly` вместо деструктурированного `readonly`. Непоследовательно с остальными компонентами — там `readOnly` (camelCase). Кроме того, `readonlyStyles={!props.readonly ? false : true}` эквивалентно `readonlyStyles={Boolean(props.readonly)}`.

### `"Clear"` захардкожен — нарушение локализации

```tsx
<TextInput.ActionIsland label="Clear" ... />
```

Несмотря на `showLabel={false}`, `label` используется как `aria-label`. Значение должно приходить из `useLocalization()`.

### `onChange` не принимает событие

```ts
onChange: (value?: Value) => void;
```

По правилам CLAUDE.md все колбэки должны принимать нативный DOM-event последним аргументом.

### `ref` не пробрасывается

`SelectComponent` не принимает `ref` в пропсах.

### `String(value)` для hidden input — даёт `"undefined"`

```tsx
<input type="hidden" name={selectName} value={String(value)} />
```

Если `value` не задан, `String(undefined)` = `"undefined"`. Скрытый инпут отправит буквальную строку `"undefined"` в форме.

---

## useSelect.ts

### Поиск по `startsWith` — не находит совпадения в середине строки

```ts
item.label.toLowerCase().startsWith(userQuery.toLowerCase())
```

Пользователь, набравший `"ork"`, не найдёт `"New York"`. Типичное ожидание для поиска — `includes`, а не `startsWith`.

### `clearValue` — `value` в зависимостях, но не используется

```ts
const clearValue = useCallback(() => {
  if (multiple && Array.isArray(value)) {
    onChange([] as Value);
  } else {
    onChange(undefined);
  }
}, [onChange, value]);  // ← value нужен только для Array.isArray, не для самого значения
```

Стабильнее было бы хранить `multiple` как зависимость вместо `value`, но текущий код работает корректно.

---

## Select.types.ts

### `SelectContext.value?: any` — `any` тип

```ts
export type SelectContext = {
  value?: any;
  ...
};
```

Теряется типобезопасность для кастомных рендер-функций. Следует параметризовать: `SelectContext<Value>`.

---

## select.module.scss

### `:global(:root)` вместо `:global([data-altrone-root='true'])`

По соглашению проекта CSS-переменные компонентов объявляются в `:global([data-altrone-root='true'])`, а не в `:root`. Текущий подход загрязняет глобальное пространство CSS-переменных.

### `.SelectContainer`, `.SelectValue`, `.Placeholder` — мёртвые классы

Три класса определены в SCSS, но ни один из них не применяется в `Select.tsx`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Select.tsx:75` | `key={optionIndex}` — нестабильные ключи при фильтрации |
| 🟠 Высокий | `Select.tsx:97–104` | `selectContext.expanded` всегда `false` — `renderFunc` не видит открытое состояние |
| 🟠 Высокий | `Select.tsx:128` | `String(value)` в hidden input даёт `"undefined"` при пустом значении |
| 🟡 Средний | `Select.types.ts:35` | `onChange` не принимает DOM-event — нарушение соглашения |
| 🟡 Средний | `Select.tsx` | `ref` не пробрасывается |
| 🟡 Средний | `Select.tsx:177` | `"Clear"` захардкожен — нарушение локализации |
| 🟡 Средний | `Select.tsx:163–166` | `props.readonly` — непоследовательное имя пропса |
| 🟡 Средний | `useSelect.ts:62–64` | `startsWith` вместо `includes` — поиск только с начала строки |
| 🟢 Низкий | `Select.types.ts:13` | `SelectContext.value?: any` — теряется типобезопасность |
| 🟢 Низкий | `select.module.scss:3` | `:global(:root)` вместо `[data-altrone-root='true']` |
| 🟢 Низкий | `select.module.scss:31–54` | `.SelectContainer`, `.SelectValue`, `.Placeholder` — мёртвые CSS-классы |
