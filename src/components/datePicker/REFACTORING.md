# Заметки по рефакторингу — components/datePicker

---

## DatePicker.tsx

### `dayjs.locale(ruLocale)` устанавливает глобальную локаль

```ts
// DatePicker.tsx — строка 8
import ruLocale from 'dayjs/locale/ru.js';
dayjs.locale(ruLocale);
```

Вызов `dayjs.locale()` на глобальном синглтоне меняет локаль по умолчанию для всего приложения. Любой код, использующий `dayjs()` без явного `.locale()`, получит русскую локаль. Это побочный эффект импорта модуля — SSR-небезопасно и конфликтует с локализацией остального приложения. Нужно передавать локаль явно через `.locale()` при форматировании дат, не мутируя глобальный инстанс.

---

## inner/generatePicker.tsx

### `useEffect` принудительно вызывает `onChange` при выходе `value` за границы

```ts
useEffect(() => {
  if (minDate && maxDate && value && !value.isBetween(minDate, maxDate, '[]')) {
    onChange?.(minDate);  // ← изменяет контролируемое значение без взаимодействия пользователя
  }
}, [value, minDate, maxDate, onChange]);
```

Эффект вызывает `onChange` при изменении `minDate`/`maxDate`, что означает, что изменение ограничений автоматически перезаписывает текущее значение. Это ломает ожидаемое поведение контролируемого компонента: потребитель должен сам решать, что делать, если значение вышло за границы. Кроме того, если `onChange` обновляет `minDate`, возможен бесконечный цикл.

### `warningOnce` вызывается дважды для одного условия

```ts
useEffect(() => {
  warningOnce(!(minDate && maxDate && minDate.isSameOrAfter(maxDate)), '...');
  warningOnce(!(minDate && maxDate && maxDate.isBefore(minDate)), '...');
}, [minDate, maxDate]);
```

Оба условия проверяют одно и то же (`minDate >= maxDate`), только сформулированы с разных сторон. Второй вызов — дублирование.

### `dayjsInstance` импортируется из `../../calendar/Calendar.tsx`

```ts
import { dayjsInstance as dayjs } from '../../calendar/Calendar.tsx';
```

`generatePicker` импортирует внутренний экспорт из другого компонента (`Calendar`). Это нарушение инкапсуляции и создаёт скрытую связь между `datePicker` и `calendar`. Общий экземпляр `dayjs` следует вынести в `utils/` или `shared/`.

### `onChange={() => null}` на TextInput — вводит в заблуждение

```tsx
<TextInput
  onChange={() => null}
  ...
/>
```

Такой же антипаттерн, что и в других компонентах — ложное ощущение управляемости TextInput.

### `role="textbox"` на TextInput — избыточная роль

```tsx
<TextInput role="textbox" ...>
```

`<input type="text">` уже имеет неявную роль `textbox`. Явное добавление — избыточно.

### `hoveredDate` и `setHoveredDate` захардкожены в контексте

```ts
const datePickerViewContext = useMemo(() => ({
  ...
  hoveredDate: undefined,   // ← всегда undefined
  setHoveredDate: () => null, // ← no-op
}), [...]);
```

Функциональность hover-даты объявлена в `DatePickerViewContextType`, но не реализована в `generatePicker`. Потребители контекста, рассчитывающие на эти значения, получат пустышку.

### `onChange` не принимает событие

```ts
onChange?: (value?: ValueType) => void;
```

По правилам CLAUDE.md все колбэки должны принимать нативный DOM-event последним аргументом.

### `ref` не пробрасывается

Компонент возвращает обёрточный `<div className={s.DatePickerWrapper}>`. `ref` не принимается и не пробрасывается ни на обёртку, ни на TextInput.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `DatePicker.tsx:8` | `dayjs.locale(ruLocale)` — глобальная мутация локали при импорте модуля |
| 🔴 Критический | `inner/generatePicker.tsx:61–70` | `useEffect` принудительно вызывает `onChange` при изменении `minDate`/`maxDate` — риск бесконечного цикла |
| 🟠 Высокий | `inner/generatePicker.tsx:2` | `dayjsInstance` импортируется из внутренностей `calendar` — нарушение инкапсуляции |
| 🟠 Высокий | `DatePicker.types.ts:12` | `onChange` не принимает DOM-event — нарушение соглашения проекта |
| 🟡 Средний | `inner/generatePicker.tsx:129–138` | `hoveredDate`/`setHoveredDate` захардкожены как пустышки — функциональность не реализована |
| 🟡 Средний | `inner/generatePicker.tsx:50–58` | `warningOnce` вызывается дважды для одного условия — дублирование |
| 🟡 Средний | `inner/generatePicker.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `inner/generatePicker.tsx:172` | `onChange={() => null}` на TextInput — вводит в заблуждение |
| 🟢 Низкий | `inner/generatePicker.tsx:177` | `role="textbox"` на TextInput — избыточная роль |
