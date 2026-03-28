# Заметки по рефакторингу — components/textInput

---

## TextInput.tsx

### `forwardRef` — нарушение React 19 / CLAUDE.md

```ts
// TextInput.tsx — line 31
const TextInputComponent = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => { ... }
);
```

CLAUDE.md явно запрещает `forwardRef`. В React 19 `ref` передаётся как обычный проп. `TextInput` должен принимать `ref` напрямую через деструктуризацию пропсов.

### Баг: неверная зависимость в `onBlurHandler`

```ts
// line 161–167
const onBlurHandler = useCallback(
  (e) => {
    onBlur?.(e);   // использует onBlur
    blur();
  },
  [onFocus]        // ← зависимость от onFocus вместо onBlur
);
```

Если `onBlur` изменится, хэндлер не обновится — stale closure. Вероятно, опечатка при копировании `onFocusHandler`.

### `rainbowEffect` деструктурируется, но не используется

```ts
// line 44 — есть в пропсах...
rainbowEffect,

// ...useRainbowEffect импортирован (line 13), но не вызывается
```

Проп задекларирован в типах, импорт хука есть, но вся функциональность rainbow-эффекта для TextInput не реализована. В конфиге тоже есть `textInput.rainbowEffect?: boolean` — мёртвый код.

### Неправильный порядок мерджа `styles` — конфиг перекрывает пользовательский `style`

```ts
// line 172–181
const styles = {
  ...style,              // пользовательский стиль идёт первым
  ...inputConfig.style,  // конфиг его перекрывает ← неверно
  paddingLeft: ...,
  paddingRight: ...,
};
```

Во всех остальных компонентах порядок обратный: `{ ...config.style, ...style }`. Здесь пользователь не может переопределить стиль через inline `style`, если в конфиге то же свойство задано.

### `inputValue` — избыточный алиас

```ts
// line 61
const inputValue = value;
```

Простой алиас без трансформации — лишняя переменная.

### `focused` читается, но нигде не используется

```ts
const { value: focused, enable: focus, disable: blur } = useBoolean(false);
```

`focused` деструктурируется, но не участвует ни в рендере, ни в логике. Если состояние фокуса нужно для чего-то в будущем — ок, но сейчас это мёртвый код.

### `Component.props` перекрывает все остальные пропсы при `cloneElement`

```ts
// line 185–197
inputElement = cloneElement(Component, {
  ref,
  value: inputValue,
  onChange: onChangeHandler,
  'aria-invalid': inputInvalid,
  ...restProps,
  ...Component.props,  // ← Component.props идёт последним и всё перекрывает
});
```

`...Component.props` распакован после `...restProps`, то есть оригинальные пропсы переданного `Component` имеют наивысший приоритет. Если `Component` уже имеет `onChange` — внутренний `onChangeHandler` будет проигнорирован. Это нарушает ожидаемое поведение контролируемого ввода.

---

## TextInput.types.ts

### `ActionIslandProps.onClick` сужает тип

```ts
// line 46
onClick?: () => void;
```

В `React.ButtonHTMLAttributes<HTMLElement>` `onClick` имеет тип `MouseEventHandler`, принимающий `MouseEvent`. Здесь сигнатура сужена до `() => void` — передать обработчик с параметром `event` не получится.

---

## textInput.module.scss

### `!important` в `.Invalid`

```scss
&.Invalid {
  --text-input-text-color: var(--danger-color) !important;
}
```

Использование `!important` для переопределения CSS-переменной не нужно — переменные имеют каскадный приоритет по месту объявления. `!important` на `--переменной` затрудняет дальнейшее переопределение.

### `outline: none` на focus-visible в `.Readonly`

```scss
.Readonly {
  &:focus-visible {
    outline: none;  // убирает индикатор фокуса
  }
}
```

Поле `readOnly` всё ещё может быть сфокусировано — например, для копирования. Скрытие `:focus-visible` нарушает доступность.

### Захардкоженные значения

- `padding: 6px 12px` в `.Input` — вне spacing-токенов
- `gap: 2px` в `.LeftIslands` / `.RightIslands` — вне spacing-токенов
- `padding-left: 4px; padding-right: 4px` в `.LeftIslands` / `.RightIslands`
- `font-weight: 500` в `.Input` — вместо `var(--text-weight-medium)`
- `--text-input-font-size: 14px` и аналоги — вне типографической шкалы

---

## components/ActionIsland.tsx

### Неверный тип `ref` в `forwardRef`

```ts
export const ActionIsland = forwardRef<
  HTMLMotionProps<'button'>,  // ← тип пропсов, а не элемента
  ActionIslandProps
>
```

Первый generic `forwardRef<T, P>` — это тип DOM-элемента (обычно `HTMLButtonElement`). `HTMLMotionProps<'button'>` — это тип пропсов Motion-компонента, а не элемента. Правильно: `forwardRef<HTMLButtonElement, ActionIslandProps>`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `TextInput.tsx:31` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп |
| 🔴 Критический | `components/ActionIsland.tsx` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп |
| 🔴 Критический | `TextInput.tsx:166` | `onBlurHandler` зависит от `onFocus` вместо `onBlur` — stale closure |
| 🟠 Высокий | `TextInput.tsx:185–197` | `Component.props` перекрывает `onChangeHandler` и другие внутренние пропсы |
| 🟠 Высокий | `TextInput.tsx:172–181` | Порядок мерджа стилей инвертирован — конфиг перекрывает пользовательский `style` |
| 🟠 Высокий | `components/ActionIsland.tsx:8–10` | Неверный generic в `forwardRef` — тип пропсов вместо типа элемента |
| 🟡 Средний | `TextInput.tsx:44` | `rainbowEffect` деструктурируется, но не реализован |
| 🟡 Средний | `TextInput.types.ts:46` | `onClick` в `ActionIslandProps` сужает тип, убирает `MouseEvent` |
| 🟡 Средний | `textInput.module.scss:70` | `!important` на CSS-переменной в `.Invalid` |
| 🟡 Средний | `textInput.module.scss:79–81` | `outline: none` при `:focus-visible` в `.Readonly` — нарушение доступности |
| 🟢 Низкий | `TextInput.tsx:61` | `inputValue` — избыточный алиас переменной |
| 🟢 Низкий | `TextInput.tsx:73` | `focused` деструктурируется, но нигде не используется |
| 🟢 Низкий | `textInput.module.scss` | Захардкоженные отступы и font-weight вместо CSS-переменных |
