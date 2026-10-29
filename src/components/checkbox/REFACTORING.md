# Заметки по рефакторингу — components/checkbox

---

## Сводная таблица

| Приоритет | Файл | Проблема | Статус |
|---|---|---|---|
| 🟠 Высокий | `Checkbox.tsx:53` | `role="checkbox"` на `<label>` — дублирует роль вложенного `<input>` | ✅ Исправлено |
| 🟠 Высокий | `checkbox.module.scss:28` | `outline: none` без `:focus-visible` — недоступен с клавиатуры | ✅ Исправлено |
| 🟠 Высокий | `Checkbox.types.ts:5` | `InputHTMLAttributes<HTMLLabelElement>` — неверная комбинация типов | ✅ Исправлено → `LabelHTMLAttributes` |
| 🟠 Высокий | `Checkbox.tsx` | Отсутствует `ref` — нарушение CLAUDE.md (каждый компонент обязан форвардить `ref`) | ✅ Исправлено |
| 🟡 Средний | `Checkbox.tsx:57–58` | `tabIndex={0}` + `onKeyDown` — оставлено намеренно: `.Input { display: none }`, без них чекбокс не доступен с клавиатуры | ℹ️ Оставлено |
| 🟢 Низкий | `checkbox.module.scss` | `var(--gap)` без суффикса — переменная определена (8px), ложная тревога | ✅ Неактуально |
| 🟢 Низкий | `checkbox.module.scss` | `font-weight: 500; font-size: 14px` в `.Label` — захардкожена типографика | ✅ Исправлено → `@include label` |
| 🟢 Низкий | `checkbox.module.scss` | `padding: 3px 4px; height: 32px` — вне spacing/size токенов | ⚠️ Остаётся |
