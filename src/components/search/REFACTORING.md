# Заметки по рефакторингу — components/search

---

## Search.tsx

### `forwardRef` — нарушение React 19 / CLAUDE.md

CLAUDE.md явно запрещает использование `forwardRef`. `Search` должен принимать `ref` как обычный проп и пробрасывать его в корневой DOM-элемент.

### `onClearClick` использует нативный DOM-хак — наследует проблему из AutocompleteInput

```ts
// line 62–72
const onClearClick = () => {
  if (textInputRef.current) {
    DOMUtils.triggerEvent({
      element: textInputRef.current?.childrenNode as HTMLElement,
      value: '',
      eventType: 'change',
      senderObject: window.HTMLInputElement.prototype,
      propertyName: 'value',
    });
  }
};
```

Очистка поля реализована через нативный DOM-setter и ручной `Event` вместо вызова `onChange` из пропсов. Помимо хрупкости и SSR-небезопасности, `textInputRef.current?.childrenNode` — это внутренний API `PopoverRef`, который может измениться. Правильный подход — принимать `onChange` и вызывать его с пустой строкой.

### `haveValue` — труднопредсказуемая truthy-проверка

```ts
// line 34
const haveValue = restProps.value;
```

Переменная используется в нескольких местах как условие рендера. `value` может быть `''` (пусто) или `undefined`. Для `''` поиск-иконка и дочерние элементы скроются, что и является нужным поведением, — но это неочевидно. Явная проверка `Boolean(restProps.value)` сделала бы намерение понятным.

### Поисковая иконка отсутствует при непустом значении в области `left`

```tsx
// line 91–93
{haveValue && (
  <TextInput.IconIsland icon={<SearchIcon />} placement="left" />
)}
```

Когда есть значение, иконка поиска добавляется слева, но это место занимает пространство без ясной цели (пользователь уже видит поле с текстом). При этом `SearchIcon` также используется в placeholder'е для пустого состояния. Дублирование иконки создаёт путаницу в логике.

---

## search.module.scss

### `z-index: 1001` — магическое число

```scss
// line 44
.Placeholder {
  z-index: 1001;
}
```

Произвольное значение `z-index` без CSS-переменной. Непонятно, над чем именно нужно быть выше и почему именно 1001.

### Захардкоженные размеры вместо CSS-переменных

```scss
/* line 51 */
max-width: calc(100% - 18px);   /* магическое число — размер иконки */

/* line 63–65 */
.PlaceholderIcon {
  font-size: 18px;
  height: 18px;
  width: 18px;
}
```

`18px` — размер иконки-placeholder'а — используется трижды: в `PlaceholderIcon` и в `calc()` у `PlaceholderText`. Если размер иконки изменится, нужно будет обновить три места. Следует вынести в CSS-переменную.

### `width: 80%; left: 10%` — хрупкое позиционирование

```scss
// line 33–34
.Placeholder {
  width: 80%;
  left: 10%;
}
```

Placeholder центрируется через `width: 80%` + `left: 10%` вместо более надёжного flexbox-выравнивания родителя или `transform: translateX(-50%)`. При наличии островов (islands) слева/справа placeholder перекроет их или будет перекрыт ими.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Search.tsx` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп |
| 🔴 Критический | `Search.tsx:62–72` | `onClearClick` использует нативный DOM-хак — SSR-небезопасно и хрупко |
| 🟡 Средний | `search.module.scss:33–34` | `width: 80%; left: 10%` — хрупкое позиционирование, несовместимо с islands |
| 🟡 Средний | `search.module.scss:44` | `z-index: 1001` — магическое число без CSS-переменной |
| 🟡 Средний | `Search.tsx:91–93` | Иконка поиска при непустом значении дублирует placeholder-иконку без явной цели |
| 🟢 Низкий | `Search.tsx:34` | `haveValue` — неявная truthy-проверка, лучше `Boolean(...)` |
| 🟢 Низкий | `search.module.scss:51,63–65` | `18px` захардкожен в трёх местах — вынести в CSS-переменную |
