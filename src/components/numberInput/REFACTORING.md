# Заметки по рефакторингу — components/numberInput

---

## NumberInput.tsx

### `forwardRef` — нарушение React 19 / CLAUDE.md

CLAUDE.md явно запрещает использование `forwardRef`. `NumberInput` должен принимать `ref` как обычный проп и пробрасывать его в `TextInput`.

### Баг: логика `disabledDown` некорректна

```ts
// line 188–191
disabledDown={Boolean(
  typeof min === 'number' && value && (value <= min || !value)
)}
```

Выражение `value && (value <= min || !value)` содержит противоречие: внешний `value &&` возвращает `false` когда `value` falsy, но тогда `!value` внутри никогда не вычислится. Подвыражение `|| !value` — мёртвый код.

Помимо этого, когда `value === 0` (ноль — допустимое значение для `min`), `value &&` даст `false`, и кнопка «вниз» не будет заблокирована, даже если `min === 0`. Корректная проверка:

```ts
disabledDown={typeof min === 'number' && value !== undefined && value <= min}
```

### Баг: `fixedDecimalScale` — несоответствие типа и дефолтного значения

```ts
// NumberInput.types.ts — line 15
fixedDecimalScale?: boolean;

// NumberInput.tsx — line 29
fixedDecimalScale = 0,   // ← дефолт — число, тип — boolean
```

`react-number-format` ожидает `fixedDecimalScale: boolean`. Дефолт `0` — это falsy-число, которое приведётся к `false`, но TypeScript не предупредит о несоответствии типов при передаче числа туда, где ожидается boolean.

### `||` вместо `??` при чтении конфига и локали

```ts
// line 75, 80, 85, 90
numberInputConfig.allowLeadingZeros || false
numberInputConfig.digitsAfterPoint || 2   // 0 → 2
localeConfig.numberGrouping || ' '        // '' → ' ' (нет разделителя → пробел)
localeConfig.numberDecimal || '.'
```

Оператор `||` обрабатывает `0`, `false` и `''` как отсутствие значения. Если `digitsAfterPoint: 0` задан в конфиге — будет использовано `2`. Если `numberGrouping: ''` (нет группировки) — будет пробел. Нужно использовать `??`.

### `onChange` в зависимостях `onAllowedCheck` не используется

```ts
// line 116–129
const onAllowedCheck = useCallback(
  ({ floatValue = 0 }) => {
    // onChange нигде внутри не вызывается
  },
  [min, max, onChange]  // ← onChange лишний в deps
);
```

### `spinnerChangeValue` не обёрнут в `useCallback`

```ts
// line 131
const spinnerChangeValue = (diff: number) => { ... };
```

Функция пересоздаётся на каждый рендер и передаётся в `<Spinner>`. `Spinner` обёрнут в `memo`, но из-за нестабильной ссылки мемоизация не работает.

### `size` пробрасывается в `Spinner` напрямую, а не `inputSize`

```tsx
// line 194
<Spinner ... size={size} />
```

Везде в компоненте используется `inputSize` (слияние пропса `size` и `formFieldSize`), но в `Spinner` передаётся raw `size`. При наследовании размера из формы (`formFieldSize`) спиннер будет отображаться в другом размере, чем само поле.

### `value=""` и `onChange={() => null}` передаются в `TextInput` без смысла

```tsx
<TextInput
  value=""
  onChange={() => null}
  ...
  Component={<NumericFormat ... />}
>
```

Когда передан `Component`, `TextInput` игнорирует `value` и `onChange`. Эти пропсы создают ложное впечатление, что `TextInput` управляет значением, и могут запутать при отладке.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `NumberInput.tsx` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп |
| 🔴 Критический | `NumberInput.tsx:188–191` | `disabledDown` — мёртвый код `\|\| !value` и некорректная проверка при `value === 0` |
| 🟠 Высокий | `NumberInput.tsx:75,80,85,90` | `\|\|` вместо `??` — нулевые и пустые значения конфига игнорируются |
| 🟠 Высокий | `NumberInput.types.ts:15` + `tsx:29` | `fixedDecimalScale: boolean` но дефолт `0` — несоответствие типов |
| 🟡 Средний | `NumberInput.tsx:194` | `size` вместо `inputSize` для Spinner — рассинхрон с полем при наследовании из формы |
| 🟡 Средний | `NumberInput.tsx:131` | `spinnerChangeValue` не в `useCallback` — ломает мемоизацию `Spinner` |
| 🟢 Низкий | `NumberInput.tsx:128` | `onChange` в deps `onAllowedCheck` — лишняя зависимость |
| 🟢 Низкий | `NumberInput.tsx:144–146` | `value=""` и `onChange={() => null}` в `TextInput` семантически вводят в заблуждение |
