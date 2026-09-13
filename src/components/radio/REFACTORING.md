# Заметки по рефакторингу — components/radio

---

## Сводная таблица

| Приоритет | Файл | Проблема | Статус |
|---|---|---|---|
| 🟠 Высокий | `Radio.tsx` + `components/Item.tsx` | `ref` не пробрасывается — нарушение CLAUDE.md | ✅ Исправлено |
| 🟠 Высокий | `components/Item.tsx:47` | `role="radio"` на `<label>` — дублирует роль вложенного `<input>` | ✅ Исправлено — убраны `role` и `aria-checked` |
| 🟠 Высокий | `components/Item.tsx:50` | `tabIndex` проверяет `disabled` вместо `itemDisabled` — элемент остаётся фокусируемым при `Radio disabled` | ✅ Исправлено |
| 🟡 Средний | `Radio.types.ts:23` | `children` не допускает `null`/`false` — нельзя условно рендерить `Radio.Item` | ✅ Исправлено — `(ReactElement \| null \| false)[] \| null \| false` |
| 🟡 Средний | `Radio.types.ts:9` | `RadioContext.value: string` — нет поддержки числовых значений | ✅ Исправлено — `string \| number` |
| 🟢 Низкий | `Radio.types.ts:22` | `onChange` обязателен — нельзя использовать uncontrolled | ℹ️ Намеренно оставлено |
