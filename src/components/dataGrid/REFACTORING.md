# Заметки по рефакторингу — components/dataGrid

---

## DataGrid.tsx

### `console.log` в продовом коде — два штуки

```ts
// line 28
console.log(fields);
// line 67
console.log(groupedFields);
```

Дебаг-вывод оставлен в продовом компоненте. Нужно удалить.

### `groupedFields` useMemo с пустыми зависимостями — `fields` не отслеживается

```ts
const groupedFields = useMemo(() => {
  ...
  for (const field of fields) { ... }
}, []);  // ← fields не включён
```

При изменении `fields` (например, при смене видимости полей) перегруппировка не произойдёт — компонент отобразит устаревшие данные. Нужно добавить `fields` в deps.

### `groupedFields[group.name]` может быть `undefined` — потенциальный crash

```tsx
{groups?.map((group) => (
  ...
  {groupedFields[group.name].map((field) => (  // ← .map() на undefined
```

Если ни одно поле не имеет `group === group.name`, в `groupedFields` не будет записи для этой группы. Вызов `.map()` на `undefined` бросит ошибку. Нужна защита: `(groupedFields[group.name] ?? []).map(...)`.

### `useConfiguration` не вызывается — конфиг игнорируется

```ts
const cls = clsx(s.DataGrid, className);
const styles = { ...style };
```

В отличие от всех остальных компонентов, `DataGrid` не читает конфигурацию через `useConfiguration()`. Потребитель не может задать `className` и `style` через глобальный конфиг — только через пропсы.

### `data: object` — нет типобезопасности для accessor'ов

```ts
// DataGrid.types.ts
data: object;
```

Использование `object` вместо обобщённого `<T extends object>` означает, что TypeScript не может проверить корректность `data[field.accessor]`. Потребители не получают автодополнения и не видят ошибок при опечатке в `accessor`.

### `onChangeMode` обязательный — нельзя использовать компонент без режима редактирования

```ts
onChangeMode: (mode: DataGridModeType) => void;
```

Если потребителю нужен DataGrid только для чтения, он всё равно вынужден передавать `onChangeMode`. Следует сделать проп опциональным или предусмотреть дефолт.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## inner/Field.tsx

### Все подкомпоненты рендерятся в объекте — лишние React-элементы

```ts
const control: Record<string, React.ReactNode> = {
  string: <StringField {...props} mode={fieldMode} />,
  text: <TextField {...props} mode={fieldMode} />,
  ...  // 11 компонентов создаются при каждом рендере Field
};
```

Независимо от значения `type`, все 11 вариантов создают React-элементы при каждом рендере. Реально рендерится только один через `control[type]`. Остальные 10 создаются впустую. Следует использовать условный рендеринг или Map с фабриками:

```ts
const FieldComponent = FIELD_MAP[type];
return <FieldComponent {...props} />;
```

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `DataGrid.tsx:48` | `groupedFields` useMemo с `[]` deps — не обновляется при изменении `fields` |
| 🔴 Критический | `DataGrid.tsx:91` | `groupedFields[group.name].map` — crash при группе без полей |
| 🟠 Высокий | `DataGrid.tsx:28,67` | Два `console.log` в продовом коде |
| 🟠 Высокий | `DataGrid.tsx` | `useConfiguration` не используется — конфиг компонента игнорируется |
| 🟠 Высокий | `DataGrid.types.ts:106` | `data: object` — нет типобезопасности, нужен generic `<T extends object>` |
| 🟡 Средний | `DataGrid.types.ts:109` | `onChangeMode` обязательный — нельзя использовать только в режиме чтения |
| 🟡 Средний | `inner/Field.tsx:28–40` | Все 11 подкомпонентов создаются на каждый рендер — лишняя работа React |
| 🟡 Средний | `DataGrid.tsx` | `ref` не пробрасывается |
