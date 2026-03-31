# DataGrid — Roadmap новых функций

---

## Ближайшие задачи (low effort, high value)

### 1. `copyable` — кнопка копирования в режиме чтения

Добавить поле `copyable?: boolean` в `DataGridBaseField`. В режиме `read` рядом со значением появляется иконка копирования. По клику — значение уходит в буфер обмена, иконка меняется на галочку на 1–2 секунды.

```ts
{ accessor: 'email', type: 'string', copyable: true }
```

---

### 2. `defaultOpen` на группах

Сейчас `<Spoiler>` открывается всегда (`openedByDefault` захардкожен в `true`). Нужно вынести в `DataGridGroupType`:

```ts
type DataGridGroupType = {
  name: string;
  title?: string;
  visible?: boolean;
  defaultOpen?: boolean; // default: true
};
```

---

### 3. `labelWidth` — настройка ширины колонки с лейблами

Сейчас ширина лейбла захардкожена через CSS (`max-width: 25%, min-width: 100px`). Нужен проп на уровне DataGrid:

```ts
labelWidth?: number | string; // например: 160, '30%', '12rem'
```

Передаётся CSS-переменной `--data-grid-label-width` и применяется в `field.module.scss`.

---

### 4. `autoSave` — автосохранение без тулбара

Если `autoSave={true}`, DataGrid не рендерит тулбар и всегда находится в режиме `edit`. Каждое изменение поля немедленно вызывает `onChange`. Полезно для форм настроек, где нет явного «Сохранить».

```ts
autoSave?: boolean; // если true — showToolbar игнорируется, mode всегда 'edit'
```

---

## Средний срок (значимые изменения)

### 5. Валидация полей

Добавить `validate` в `DataGridBaseField`:

```ts
validate?: (value: unknown) => string | undefined;
// или массив правил:
rules?: Array<{ test: (value: unknown) => boolean; message: string }>;
```

Ошибка отображается под полем в режиме `edit`. Тулбар блокирует кнопку «Готово», если есть невалидные поля. Добавить колбэк на DataGrid:

```ts
onValidationChange?: (errors: Record<string, string>) => void;
```

---

### 6. Отслеживание изменений (dirty tracking)

DataGrid запоминает значения при входе в режим `edit` и визуально отмечает изменённые поля (точка или иконка рядом с лейблом). Добавить:

```ts
// на DataGrid:
onDiscard?: () => void; // кнопка «Отмена» в тулбаре — сбрасывает к снимку
showDirtyMarkers?: boolean; // default: true
```

Тулбар получает вторую кнопку «Отмена», которая возвращает `data` к состоянию на момент входа в `edit` и переключает режим в `read`.

---

### 7. Инлайн-редактирование (per-field edit mode)

Альтернативный режим работы: вместо переключения всего грида в `edit`, каждое поле имеет иконку-карандаш в режиме `read`. При клике — только это поле переходит в редактируемое состояние. Остальные остаются в `read`.

```ts
inlineEdit?: boolean; // включить режим inline-редактирования
```

В этом режиме `onChangeMode` и глобальный тулбар не используются.

---

### 8. Новый тип поля: `tags`

`type: 'tags'` — редактирование массива строк через компонент `Tags`. В режиме `read` — теги отображаются как `<Tag>` компоненты.

```ts
type DataGridTagsField = DataGridBaseField & {
  type: 'tags';
  maxItems?: number;
  allowDuplicates?: boolean;
};
```

---

### 9. Новый тип поля: `image`

`type: 'image'` — отображение и загрузка изображения. В режиме `read` — превью с заданными размерами. В режиме `edit` — FilePicker с `accept="image/*"` или поле ввода URL.

```ts
type DataGridImageField = DataGridBaseField & {
  type: 'image';
  width?: number;
  height?: number;
  editMode?: 'upload' | 'url'; // default: 'url'
  uploadFn?: FilePickerUploadContext; // если editMode = 'upload'
};
```

---

### 10. Поиск по полям

Проп `searchable` добавляет строку поиска над полями. Фильтрует список по `label` и строковому представлению значения.

```ts
searchable?: boolean;
searchPlaceholder?: string;
```

---

## Долгосрочные задачи (крупные фичи)

### 11. Режим сравнения (diff mode)

Проп `compareWith` принимает «исходный» объект данных. DataGrid рендерит поля в два столбца: было / стало. Изменённые поля подсвечиваются.

```ts
compareWith?: T; // снимок предыдущего состояния
diffClassName?: string; // CSS-класс для изменённых полей
```

Полезно для экранов «история изменений» и «подтверждение правок».

---

### 12. Производные поля (`computed`)

`type: 'computed'` — поле, значение которого вычисляется из других полей. Всегда read-only. `editable` игнорируется.

```ts
type DataGridComputedField<T extends object = Record<string, unknown>> =
  DataGridBaseField & {
    type: 'computed';
    compute: (data: T) => React.ReactNode;
  };
```

```ts
{
  accessor: 'fullName',
  type: 'computed',
  compute: (data) => `${data.firstName} ${data.lastName}`,
}
```

---

### 13. Клавиатурные сокращения

Добавить `keyboardShortcuts?: boolean` (default: `true`). Поддерживать:

| Сочетание | Действие |
|---|---|
| `E` / `F2` | Войти в режим `edit` (если фокус на DataGrid) |
| `Escape` | Отмена / выход в `read` (вызов `onDiscard` если есть изменения) |
| `Cmd+S` / `Ctrl+S` | Сохранить (вызов `onChangeMode('read')`) |

---

### 14. История изменений поля

`history` в `DataGridBaseField` — массив предыдущих значений с метаданными. Рядом с полем появляется иконка часов; по клику — Popover со списком изменений.

```ts
type FieldHistoryEntry = {
  value: unknown;
  changedAt: Date;
  changedBy?: string;
};

// в DataGridBaseField:
history?: FieldHistoryEntry[];
showHistory?: boolean;
```

---

## Сводная таблица

| # | Функция | Сложность | Ценность |
|---|---|---|---|
| 1 | `copyable` | 🟢 Низкая | 🔥 Высокая |
| 2 | `defaultOpen` на группах | 🟢 Низкая | 🔥 Высокая |
| 3 | `labelWidth` | 🟢 Низкая | 🟡 Средняя |
| 4 | `autoSave` | 🟢 Низкая | 🔥 Высокая |
| 5 | Валидация | 🟡 Средняя | 🔥 Высокая |
| 6 | Dirty tracking + Отмена | 🟡 Средняя | 🔥 Высокая |
| 7 | Инлайн-редактирование | 🟡 Средняя | 🟡 Средняя |
| 8 | Тип `tags` | 🟡 Средняя | 🟡 Средняя |
| 9 | Тип `image` | 🟡 Средняя | 🟡 Средняя |
| 10 | Поиск по полям | 🟡 Средняя | 🟡 Средняя |
| 11 | Diff mode | 🔴 Высокая | 🟡 Средняя |
| 12 | Производные поля | 🟡 Средняя | 🟡 Средняя |
| 13 | Клавиатурные сокращения | 🟡 Средняя | 🟡 Средняя |
| 14 | История изменений | 🔴 Высокая | 🟢 Низкая |
