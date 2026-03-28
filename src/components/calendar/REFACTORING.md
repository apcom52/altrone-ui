# Заметки по рефакторингу — components/calendar

---

## Calendar.tsx

### `dayjs.extend()` мутирует глобальный синглтон на уровне модуля

```ts
// module level
dayjs.extend(IsBetween);
dayjs.extend(IsToday);
// ...7 расширений
```

Вызов `dayjs.extend()` при импорте модуля изменяет глобальный экземпляр `dayjs` для всего приложения. Если другой модуль загружается раньше и не ожидает этих плагинов — порядок имеет значение. Также тестирование компонента изолированно становится сложнее. Рекомендуется создавать собственный `dayjs`-инстанс через `dayjs.extend` на локальном объекте или документировать требование как peer-dependency.

### `dayjsInstance` экспортируется — утечка внутреннего API

```ts
export const dayjsInstance = dayjs;
```

`dayjsInstance` используется в `datePicker/inner/generatePicker.tsx` через прямой импорт из `Calendar.tsx`. Это создаёт скрытую зависимость между двумя несвязанными компонентами. Общий экземпляр dayjs следует вынести в `utils/` или `shared/`.

### Проп `firstDayOfWeek` объявлен, но не используется

```ts
// Calendar.types.ts — line 22
firstDayOfWeek?: 'monday' | 'sunday';
```

Проп присутствует в типах и в деструктуризации, но логика построения сетки календаря его не учитывает — неделя всегда начинается с воскресенья (дефолт `dayjs`). Это нарушение ожиданий потребителей.

### `calendarDates` useMemo не включает `localeConfig?.locale` в зависимости

```ts
const calendarDates = useMemo(() => {
  const monthLocale = month.locale(localeConfig?.locale ?? 'en-US');
  ...
}, [month]);  // ← localeConfig отсутствует
```

При изменении локали `calendarDates` не пересчитается. Стартовый день недели зависит от локали, поэтому это потенциальная ошибка расчёта сетки при смене языка.

### Неверный атрибут данных `data-another-month` — инвертированная логика

```tsx
// CalendarDate.tsx — line 22
data-another-month={!fromAnotherMonth}
```

Название атрибута говорит «другой месяц», а значение `!fromAnotherMonth` будет `true` именно для текущего месяца. Логика перевёрнута — атрибут лжёт.

### Диапазон курсора не работает в обратном направлении

```ts
const isCursorHighlighted =
  date.isSameOrAfter(selectedDates[0]) &&
  date.isSameOrBefore(cursorDate_dj)
```

При наведении курсора левее начальной даты подсветка не отображается. Нужно обрабатывать оба случая: `cursorDate > selectedDate` и `cursorDate < selectedDate`.

### Конец недели не включается в финальный цикл

```ts
while (currentDate.isBefore(endOfWeek)) {  // строгое сравнение
  result.push(currentDate);
  currentDate = currentDate.add(1, 'day');
}
```

`endOfWeek` — последний день недели (суббота). Условие `isBefore(endOfWeek)` исключает саму субботу из результата. Нужно `isBefore(endOfWeek) || currentDate.isSame(endOfWeek, 'day')`, либо `!currentDate.isAfter(endOfWeek)`.

### `onDateChange` не принимает событие

```ts
onDateChange?: (date: Dayjs) => void;
```

По правилам CLAUDE.md все колбэки должны принимать нативный DOM-event последним аргументом.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## calendar.module.scss

### `:global(:root)` вместо `:global([data-altrone-root='true'])`

```scss
:global(:root) {
  --calendarDateBackgroundColor: transparent;
  ...
}
```

По соглашению проекта CSS-переменные компонентов объявляются в `:global([data-altrone-root='true'])` для изоляции от глобального `:root`. Текущий подход может привести к конфликтам с переменными в других приложениях.

### Захардкоженные размеры

- `gap: 4px` в `.Calendar`
- `padding: 4px 8px; height: 34px` в `.Date`

Следует использовать CSS-переменные или spacing-токены.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Calendar.tsx:58–100` | `firstDayOfWeek` не реализован — проп обещает поведение, которого нет |
| 🔴 Критический | `CalendarDate.tsx:22` | `data-another-month={!fromAnotherMonth}` — инвертированная логика атрибута |
| 🟠 Высокий | `Calendar.tsx:16–22` | `dayjs.extend()` мутирует глобальный синглтон на уровне модуля |
| 🟠 Высокий | `Calendar.tsx:87–91` | Конец недели не включается в финальный цикл — крайний день обрезается |
| 🟠 Высокий | `Calendar.tsx:112–115` | Подсветка диапазона не работает в обратном направлении |
| 🟡 Средний | `Calendar.tsx:24` | `dayjsInstance` экспортируется — утечка внутреннего API в другие компоненты |
| 🟡 Средний | `Calendar.tsx:58,100` | `localeConfig` отсутствует в deps `calendarDates` |
| 🟡 Средний | `Calendar.types.ts:19` | `onDateChange` не принимает DOM-event — нарушение соглашения проекта |
| 🟡 Средний | `Calendar.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `calendar.module.scss:1` | `:global(:root)` вместо `[data-altrone-root='true']` |
| 🟢 Низкий | `calendar.module.scss` | Захардкоженные `gap: 4px`, `height: 34px` |
