# Заметки по рефакторингу — components/autocompleteInput

---

## AutocompleteInput.tsx

### `forwardRef` — нарушение React 19 / CLAUDE.md

CLAUDE.md явно запрещает использование `forwardRef`. `AutocompleteInput` должен принимать `ref` как обычный проп и пробрасывать его в корневой DOM-элемент.

### Баг: `isDataLoading` остаётся `true` после ошибки

```ts
// line 70–86
try {
  setIsDataLoading(true);
  const _suggestions = await getSuggestions(...);
  setIsDataLoading(false);   // сбрасывается только при успехе
  // ...
} catch (err) {
  console.error(err);         // isDataLoading так и остаётся true
}
```

После любой ошибки в `getSuggestions` индикатор загрузки будет отображаться вечно. Нужен `finally { setIsDataLoading(false) }` или явный `setIsDataLoading(false)` в `catch`.

### Баг: отсутствует `key` у элементов `renderSuggestion`

```ts
// line 101–107
if (renderSuggestion) {
  return renderSuggestion({
    inputValue: restProps.value || '',
    label: suggestion,
    onClick: () => selectSuggestion(suggestion),
    // key не передаётся!
  });
}
return <Dropdown.Action {...itemProps} />;  // itemProps содержит keyProp
```

При кастомном рендере React не получает `key` для элементов списка, что вызывает предупреждения и снижает производительность reconciliation.

### `selectSuggestion` обходит React через нативный DOM

```ts
// line 46–57
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value',
)?.set;
nativeInputValueSetter?.call(dropdownRef.current?.childrenNode, value);

const event = new Event('change', { bubbles: true });
dropdownRef.current?.childrenNode?.dispatchEvent(event);
```

Вместо вызова `onChange` из пропсов — прямая манипуляция DOM через нативный setter и ручной `Event`. Это:
- небезопасно в SSR-среде (доступ к `window`)
- хрупко: зависит от внутренней структуры `dropdownRef.current?.childrenNode`
- обходит React synthetic event систему, что может нарушить работу других обработчиков

Правильный подход — принять `onChange` и вызвать его напрямую, либо использовать controlled/uncontrolled ref API.

### `getSuggestions` может вызывать бесконечный re-run эффекта

```ts
useDebouncedEffect(
  async () => { ... },
  [restProps.value, getSuggestions],  // ← getSuggestions в deps
  300,
);
```

Если потребитель не мемоизирует `getSuggestions` (`useCallback`), при каждом ре-рендере создаётся новая функция, эффект запускается снова. Документировать требование или использовать `useRef` для стабилизации.

### Потенциальная гонка состояний с `suggestionWasSelected`

```ts
// line 65–68 — проверяем флаг
if (suggestionWasSelected.current) {
  suggestionWasSelected.current = false;
  return;
}

// line 81 — сбрасываем повторно уже после setSuggestions
suggestionWasSelected.current = false;
```

Флаг сбрасывается дважды в одном запуске эффекта. Если между `openPopup()` и `suggestionWasSelected.current = false` (line 81) пользователь успеет выбрать подсказку, флаг сбросится раньше, чем нужно, и следующий эффект не пропустит запрос.

### Конфиг `showControls` имеет приоритет над пропсом

```ts
// line 27–28
const isControlsVisible = autocompleteInputConfig.showControls ?? showControls;
```

Если конфиг задал `showControls`, он перекроет проп. Во всех остальных компонентах пропс имеет приоритет над конфигом. Это нарушает единообразие поведения.

### Подсказки только строкового типа

```ts
const [suggestions, setSuggestions] = useState<string[]>([]);
```

API `getSuggestions` возвращает только `string[]`. При кастомном `renderSuggestion` потребителю может понадобиться передавать объекты (например, `{ id, label }`) для корректного `onClick`. Текущая архитектура это не позволяет.

---

## AutocompleteInput.types.ts

### `React.JSX.Element` вместо `ReactElement`

```ts
renderSuggestion?: (context: ...) => React.JSX.Element;
```

`React.JSX.Element` — нестандартный способ обращения. Конвенция в codebase — `ReactElement` из прямого импорта.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `AutocompleteInput.tsx` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп |
| 🔴 Критический | `AutocompleteInput.tsx:84–86` | `isDataLoading` не сбрасывается при ошибке — бесконечный спиннер |
| 🔴 Критический | `AutocompleteInput.tsx:46–57` | `selectSuggestion` использует нативный DOM-хак вместо `onChange` — SSR-небезопасно |
| 🟠 Высокий | `AutocompleteInput.tsx:101–107` | `renderSuggestion` не получает `key` — предупреждения React и проблемы с reconciliation |
| 🟠 Высокий | `AutocompleteInput.tsx:88` | `getSuggestions` в deps эффекта — риск бесконечного цикла без мемоизации у потребителя |
| 🟡 Средний | `AutocompleteInput.tsx:27–28` | Конфиг `showControls` перекрывает проп — нарушение единообразия приоритетов |
| 🟡 Средний | `AutocompleteInput.tsx:65–81` | Гонка состояний: `suggestionWasSelected` сбрасывается дважды в одном эффекте |
| 🟡 Средний | `AutocompleteInput.tsx` | Только `string[]` для подсказок — нет возможности передавать объекты в `renderSuggestion` |
| 🟢 Низкий | `AutocompleteInput.types.ts:20` | `React.JSX.Element` — нестандартная запись, лучше `ReactElement` |
