# Заметки по рефакторингу — components/colorPicker

---

## ColorPicker.tsx

### Баг: `readonly` в типах не совпадает с `readOnly` при деструктуризации

```ts
// ColorPicker.types.ts — line 35
readonly?: boolean;

// ColorPicker.tsx — line 36
readOnly = false,   // ← camelCase, а в пропсах lowercase
```

Проп объявлен как `readonly` (lowercase), но деструктурируется как `readOnly` (camelCase). В результате переданный `readonly={true}` никогда не применится — компонент всегда использует дефолт `false`. Поле ввода будет кликабельным даже если потребитель явно передал `readOnly`.

### `handleChange` не включает `value` в зависимости

```ts
const handleChange = useCallback(
  (color?: string) => {
    onChange(typeof color === 'string' ? color.toLowerCase() : value);  // ← value
  },
  [onChange]  // ← value отсутствует
);
```

Если `color` не передан (или не является строкой), колбэк обращается к `value` из замыкания. Если `value` изменится между рендерами, `handleChange` будет использовать устаревшее значение.

### `transparent` читается напрямую из `props` после деструктуризации

```tsx
// line 97
transparent={props.transparent}
```

`transparent` можно было включить в деструктуризацию вместе с остальными пропсами. Прямое обращение к `props` после деструктуризации — непоследовательный стиль.

### `onChange` не принимает событие — нарушение соглашения проекта

```ts
// ColorPicker.types.ts
onChange: (value?: string) => void;
```

По правилам CLAUDE.md все колбэки должны принимать нативный DOM-event последним аргументом. Здесь событие отсутствует полностью.

### `ref` не пробрасывается

`ColorPicker` не принимает `ref` в пропсах и не передаёт его на корневой элемент (`Popover`/`TextInput`). По требованиям проекта каждый компонент обязан пробрасывать `ref`.

---

## inner/ColorPickerContent.tsx

### `handleBlur` содержит мёртвые зависимости

```ts
const handleBlur = useCallback<FocusEventHandler>(
  (e) => {
    // hexR, hexG, hexB внутри не используются
  },
  [hexR, hexG, hexB, onChange]  // ← hexR, hexG, hexB лишние
);
```

`hexR`, `hexG`, `hexB` внутри обработчика не используются — функция читает только `e.target.value` и вызывает `onChange`. Три лишних зависимости приводят к пересозданию колбэка при каждом изменении цвета.

### `_allowPalette` — избыточная проверка

```ts
const _allowPalette = typeof allowPalette === 'boolean' ? allowPalette : true;
```

`allowPalette` уже типизирован как `boolean | undefined`. Достаточно `allowPalette ?? true`.

---

## inner/ColorPreset.tsx

### `aria-valuetext` на `<button>` — некорректный ARIA-атрибут

```tsx
<button aria-valuetext={value} ...>
```

`aria-valuetext` предназначен для элементов с `role="range"` (ползунки, спиннеры). На `<button>` этот атрибут не имеет смысла и будет проигнорирован скринридером. Для описания цвета следует использовать `aria-label`.

### Инлайн-функция в `onClick` на каждый рендер

```tsx
onClick={() => {
  props.onChange(value);
}}
```

Новая стрелочная функция создаётся при каждом рендере. Следует вынести в `useCallback`.

### Отсутствует `type="button"`

`<button>` без явного `type` по умолчанию имеет `type="submit"`. Если `ColorPreset` окажется внутри `<form>`, клик по пресету отправит форму. Нужно добавить `type="button"`.

---

## ColorPicker.types.ts

### `React` не импортирован, но `React.InputHTMLAttributes` используется

```ts
// нет импорта React
export interface ColorPickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, ...>
```

Код работает только если `React` доступен глобально (через tsconfig `jsx: react`). В строгом режиме нужен явный `import type React from 'react'` или замена на `InputHTMLAttributes` из именованного импорта.

---

## styles.module.scss

### Захардкоженный `rgba` вместо CSS-переменной

```scss
.ColorPreview {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
}
```

Вместо `rgba(0, 0, 0, 0.2)` следует использовать CSS-переменную для цвета рамки, чтобы тёмная тема могла переопределить значение.

---

## inner/colorPickerContent.module.scss

### `width: 312px` — захардкоженная ширина попапа

```scss
.ColorPicker {
  width: 312px;
}
```

Фиксированная ширина без CSS-переменной. При разных размерах экрана или изменении дизайна придётся менять число вручную.

### `width: 100% !important` — избыточный `!important`

```scss
.Palette {
  width: 100% !important;
}
```

Если `react-colorful` задаёт ширину через inline-стили, `!important` на классе не поможет — inline перекрывает класс независимо от `!important`. Если `react-colorful` задаёт ширину через класс, достаточно обычного переопределения с достаточной специфичностью.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `ColorPicker.types.ts:35` + `ColorPicker.tsx:36` | `readonly` vs `readOnly` — несоответствие имени пропса, `readOnly` всегда `false` |
| 🟠 Высокий | `ColorPicker.tsx:43–48` | `value` отсутствует в deps `handleChange` — stale closure |
| 🟠 Высокий | `ColorPicker.types.ts:27` | `onChange` не принимает DOM-event — нарушение соглашения проекта |
| 🟠 Высокий | `ColorPicker.tsx` | `ref` не принимается и не пробрасывается |
| 🟡 Средний | `ColorPickerContent.tsx:60–76` | `hexR, hexG, hexB` — мёртвые зависимости в `handleBlur` |
| 🟡 Средний | `ColorPreset.tsx:25` | `aria-valuetext` — некорректный ARIA-атрибут на `<button>` |
| 🟡 Средний | `ColorPreset.tsx:27–29` | Инлайн `onClick` создаётся на каждый рендер |
| 🟡 Средний | `ColorPreset.tsx:22` | Отсутствует `type="button"` — риск нечаянной отправки формы |
| 🟢 Низкий | `ColorPicker.types.ts` | `React` не импортирован, но используется как глобальный |
| 🟢 Низкий | `ColorPicker.tsx:97` | `props.transparent` вместо деструктуризации |
| 🟢 Низкий | `styles.module.scss:14` | `rgba(0,0,0,0.2)` — захардкоженный цвет вместо CSS-переменной |
| 🟢 Низкий | `colorPickerContent.module.scss:2` | `width: 312px` — захардкоженная ширина попапа |
| 🟢 Низкий | `colorPickerContent.module.scss:6` | `width: 100% !important` — избыточный `!important` |
