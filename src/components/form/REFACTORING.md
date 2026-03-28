# Заметки по рефакторингу — components/form

---

## Form.tsx

### `forwardRef` вместо React 19 — нарушение соглашения проекта

```tsx
const FormComponent = forwardRef<HTMLFormElement, FormProps<any>>(
  (props, ref) => { ... }
);
```

По правилам CLAUDE.md `forwardRef` не используется — `ref` принимается как обычный проп (React 19 style). Также использован `any` для обобщённого параметра формы.

### `action=""` захардкожен на форме

```tsx
<form action="" onSubmit={handleSubmit} ...>
```

`action=""` эквивалентен дефолтному поведению браузера (текущий URL). Это явное значение мешает потребителям использовать Server Actions через `<form action={serverAction}>`, поскольку `action=""` перекрывает проп `action` из `restProps`. Нужно убрать захардкоженный `action=""` и дать потребителю управлять этим полем.

### Несоответствие типов `errorMessages` между `FormProps` и `FormContextType`

```ts
// FormProps
errorMessages?: Record<keyof FormState | string, string | undefined | null>;

// FormContextType
errorMessages?: Record<string, string | undefined | boolean | null>;
```

Контекст допускает `boolean` в значениях, которого нет в типе пропса. Такое расхождение создаёт невалидное состояние при передаче `errorMessages` из пропса в контекст.

---

## components/Field.tsx

### `FormFieldContext` создан внутри компонентного файла — нарушение структуры проекта

```ts
// Field.tsx — line 9
const FormFieldContext = createContext<FormFieldContextType>({ ... });
export const useFormField = () => useContext(FormFieldContext);
```

По соглашению проекта контексты хранятся в отдельном файле `*.context.ts`. `FormFieldContext` и `useFormField` должны находиться в `Field.context.ts`.

### `<Tooltip content={hintText} />` без дочернего элемента

```tsx
const hintElement = hintText?.trim() ? (
  <Tooltip childrenClassName={s.HintIcon} content={hintText} />
) : null;
```

`Tooltip` оборачивает дочерний элемент через `cloneElement`. Если `children` не передан, компонент, скорее всего, рендерит пустышку или бросает ошибку. Нужно передать иконку подсказки как `children` тултипа.

---

## components/field.module.scss

### Захардкоженные значения вместо CSS-переменных и миксинов

```scss
.Label {
  font-weight: 500;  /* вместо var(--text-weight-medium) */
  font-size: 14px;   /* вместо мixin */
}

.ErrorMessage {
  font-weight: 450;  /* нестандартный вес, может не поддерживаться шрифтом */
  font-size: 12px;
}

.Description {
  font-weight: 450;
  font-size: 12px;
}
```

По соглашению проекта типографика задаётся через SCSS-миксины (`@include label`, `@include sm-paragraph`), а не хардкодом. `font-weight: 450` — нестандартное значение, не имеющее гарантированного отображения в большинстве шрифтов.

### `!important` в `.HintIcon`

```scss
.HintIcon {
  width: 18px !important;
  height: 18px !important;
}
```

Использование `!important` для размеров иконки подсказки — признак конфликта специфичности, который нужно решить структурно, а не через `!important`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Form.tsx:1,10` | `forwardRef` вместо React 19 ref-как-проп; `any` для generic |
| 🟠 Высокий | `Form.tsx:50` | `action=""` перекрывает проп — нельзя использовать Server Actions |
| 🟠 Высокий | `components/Field.tsx:40–41` | `<Tooltip>` без дочернего элемента — вероятна ошибка рендера |
| 🟡 Средний | `Form.types.ts:6,25` | Несоответствие типов `errorMessages` между `FormProps` и `FormContextType` |
| 🟡 Средний | `components/Field.tsx:9–15` | `FormFieldContext` создан внутри компонентного файла — нарушение структуры |
| 🟢 Низкий | `components/field.module.scss:22–23` | Захардкоженные `font-weight: 500`, `font-size: 14px` — нарушение соглашения |
| 🟢 Низкий | `components/field.module.scss:40–41,47–48` | `font-weight: 450` — нестандартный вес шрифта |
| 🟢 Низкий | `components/field.module.scss:29–30` | `width/height: 18px !important` — конфликт специфичности |
