# Заметки по рефакторингу — components/radio

---

## components/Item.tsx

### Баг: `role="radio"` на `<label>` дублирует роль вложенного `<input>`

```tsx
// line 47
<label role="radio" aria-checked={itemChecked} ...>
  <input type="radio" ... />  // уже имеет роль radio
```

Аналогично Checkbox и Switcher: `<input type="radio">` уже несёт семантическую роль. Добавление `role="radio"` на `<label>` создаёт дублирование для скринридеров.

### Баг: `tabIndex` проверяет локальный `disabled`, игнорируя контекстный

```tsx
// line 50
tabIndex={disabled ? -1 : 0}
```

`itemDisabled = Boolean(radioDisabled || disabled)` объединяет оба источника отключения, но `tabIndex` использует только проп `disabled`. Если `<Radio disabled>` передаёт `radioDisabled=true` через контекст, каждый `Radio.Item` без собственного `disabled={true}` будет оставаться фокусируемым.

Правильно:
```tsx
tabIndex={itemDisabled ? -1 : 0}
```

### `RadioContext.value` — только строка

```ts
// Radio.types.ts
value: string;
```

Типичные паттерны radio-групп работают как со строками, так и с числами (идентификаторы). Ограничение `string` вынуждает потребителей приводить числовые значения к строке вручную.

### `RadioProps.children` не допускает условный рендер

```ts
// Radio.types.ts — line 23
children: ReactElement<RadioItemProps> | ReactElement<RadioItemProps>[];
```

`null` и `undefined` не входят в тип. Паттерн `{condition && <Radio.Item />}` вернёт `false | ReactElement`, что TypeScript отклонит. Это исключает условный рендер дочерних элементов.

---

## Radio.tsx

### `ref` не пробрасывается — нарушение CLAUDE.md

Ни `Radio` (обёртка-группа), ни `Radio.Item` не принимают и не пробрасывают `ref` в корневой DOM-элемент. По требованиям CLAUDE.md каждый компонент обязан поддерживать `ref`. Без него невозможно прикрепить `Tooltip`, `Popover` или `Dropdown` к элементам Radio.

### `onChange` в `RadioProps` — обязательный

```ts
onChange: (value: string, e: ChangeEvent) => void;
```

Radio нельзя использовать как uncontrolled компонент. Нет поддержки `defaultValue` + опционального `onChange`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Radio.tsx` + `components/Item.tsx` | `ref` не пробрасывается — нарушение CLAUDE.md |
| 🟠 Высокий | `components/Item.tsx:47` | `role="radio"` на `<label>` — дублирует роль вложенного `<input>` |
| 🟠 Высокий | `components/Item.tsx:50` | `tabIndex` проверяет `disabled`, а не `itemDisabled` — элемент остаётся фокусируемым при `Radio disabled` |
| 🟡 Средний | `Radio.types.ts:23` | `children` не допускает `null`/`false` — нельзя условно рендерить `Radio.Item` |
| 🟡 Средний | `Radio.types.ts:9` | `RadioContext.value: string` — нет поддержки числовых значений |
| 🟢 Низкий | `Radio.types.ts:22` | `onChange` обязателен — нельзя использовать uncontrolled |
