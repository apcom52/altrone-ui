# Заметки по рефакторингу — components/range

---

## Range.tsx

### Баг: утечка памяти при перетаскивании — `removeEventListener` может не найти обработчик

```ts
const handlePointerDown = useCallback(
  (event) => {
    document.addEventListener('pointermove', handlePointerMove);  // ← текущая ссылка
    document.addEventListener('pointerup', handlePointerUp);
  },
  [calculateValue, onChange]
);

const handlePointerUp = useCallback(() => {
  document.removeEventListener('pointermove', handlePointerMove);  // ← может быть другая ссылка
  document.removeEventListener('pointerup', handlePointerUp);
}, [onValueCommit]);
```

Если между событиями `pointerdown` и `pointerup` произойдёт ре-рендер (например, изменится `onChange` или `min/max/step`), `handlePointerMove` и `handlePointerUp` получат новые ссылки через `useCallback`. `handlePointerUp` при этом попытается снять обработчик с новой ссылкой, а не с той, что была зарегистрирована. Слушатель на `document` останется навсегда.

Правильное решение — хранить ссылки на обработчики в `useRef` или использовать один `useEffect` с очисткой через `AbortController`.

### `RangeProps` расширяет `InputHTMLAttributes<HTMLInputElement>`, но рендерит `<div>`

```ts
export interface RangeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>
```

Корневой элемент компонента — `motion.div`, а не `<input>`. Потребитель, опираясь на тип, может передать `onInput`, `onInvalid`, `form` и другие атрибуты, специфичные для `<input>`, которые не имеют смысла на `<div>` и не попадут в DOM. Правильно расширять `HTMLAttributes<HTMLDivElement>` или `React.ComponentPropsWithoutRef<'div'>`.

### `ref` не принимается и не пробрасывается

`Range` не принимает `ref` в пропсах. По требованиям проекта каждый компонент обязан пробрасывать `ref` на корневой DOM-элемент.

### `onChange` и `onValueCommit` не принимают событие

```ts
onChange: (value: number) => void;
onValueCommit?: (value: number) => void;
```

По правилам CLAUDE.md все колбэки должны принимать нативный DOM-event последним аргументом. Здесь событие отсутствует.

### `isFocused` ref — избыточная защита

```ts
const isFocused = useRef(false);

const handleKeyDown = useCallback(
  (event) => {
    if (!isFocused.current) return;  // ← onKeyDown не срабатывает без фокуса
    ...
  },
  [...]
);
```

`onKeyDown` браузер диспатчит только на сфокусированный элемент, поэтому проверка `if (!isFocused.current)` никогда не выполнится. `isFocused` ref, соответствующие `onFocus`/`onBlur` обработчики — мёртвый код.

### `value` в зависимостях `calculateValue` — лишняя зависимость

```ts
const calculateValue = useCallback(
  (clientX, clientY) => {
    if (!trackRef.current) return value;  // ← единственное использование value
    ...
  },
  [min, max, step, value, direction]
);
```

`value` используется только как fallback при `!trackRef.current`. Эту ветку можно переписать как `return null` / `return min`, убрав `value` из deps и тем самым стабилизировав ссылку на `calculateValue`.

---

## range.module.scss

### `overflow: 0` — невалидное CSS-значение

```scss
.Input {
  overflow: 0;  // ← невалидно
}
```

Свойство `overflow` принимает ключевые слова (`hidden`, `visible`, `auto`, `scroll`), но не числа. Браузер проигнорирует это правило. Нужно `overflow: hidden`.

### `.Large` переопределяет `--range-height` тем же значением, что и дефолт

```scss
:global([data-altrone-root='true']) {
  --range-height: 32px;  // ← дефолт
}

.Large {
  --range-height: 32px;  // ← то же значение
}
```

Модификатор `.Large` ничего не меняет по сравнению с базовым стилем. Либо дефолтный размер должен быть другим (например `m`), либо `.Large` должен устанавливать большее значение.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Range.tsx:99–120` | Утечка памяти: `removeEventListener` может не найти зарегистрированный обработчик при ре-рендере во время drag |
| 🟠 Высокий | `Range.types.ts:4–8` | `RangeProps extends InputHTMLAttributes<HTMLInputElement>` — тип не соответствует рендеру `<div>` |
| 🟠 Высокий | `Range.tsx` | `ref` не принимается и не пробрасывается |
| 🟠 Высокий | `Range.types.ts:10–11` | `onChange` и `onValueCommit` не принимают DOM-event — нарушение соглашения проекта |
| 🟡 Средний | `Range.tsx:35–36,181–182` | `isFocused` ref и связанные обработчики — мёртвый код |
| 🟡 Средний | `Range.tsx:69–89` | `value` в deps `calculateValue` — лишняя зависимость, дестабилизирует ссылку |
| 🟢 Низкий | `range.module.scss:67` | `overflow: 0` — невалидное CSS-значение, правило игнорируется |
| 🟢 Низкий | `range.module.scss:113–114` | `.Large` задаёт `--range-height: 32px` — то же значение, что и дефолт |
