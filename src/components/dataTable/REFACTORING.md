# Заметки по рефакторингу — components/dataTable

---

## DataTable.tsx

### `selectableMode` в `initialState` — нестандартное поле TanStack Table

```ts
initialState: {
  pagination: { ... },
  sorting: ...,
  ...(mode === 'select' ? { selectableMode: true } : {}),
},
```

`selectableMode` не является стандартным полем состояния TanStack Table. `initialState` принимает только типизированные поля (pagination, sorting, rowSelection и пр.). Передача произвольных полей в `initialState` будет проигнорирована TypeScript'ом (если тип расширяется через `declare module`) или TypeScript выдаст ошибку. Это пустая операция.

### `useEffect` мутирует состояние таблицы напрямую

```ts
useEffect(() => {
  if (mode === 'select') {
    table.setState((old) => ({
      ...old,
      selectableMode: true,
    }));
  }
}, [mode]);
```

`table.setState` — внутренний API TanStack Table для замены всего состояния. Использование его для передачи произвольного кастомного поля (`selectableMode`) является антипаттерном. Для передачи пользовательских данных TanStack Table предоставляет `meta`:

```ts
meta: { mode },
```

Именно через `meta` можно получить `mode` в рендерерах ячеек.

### `props.columns` читается дважды — через деструктуризацию и напрямую

```ts
const { ..., columns, ... } = props;
// ...
props.columns.filter((column) => column.filterable)  // ← props.columns вместо columns
```

Непоследовательно: `columns` уже деструктурирован, но в `dataTableHeaderVisible` useMemo используется `props.columns`. Это нарушение принципа однократного источника истины и может скрыть баг, если `columns` и `props.columns` когда-либо разойдутся.

### `motion.div` без анимационных пропсов

```tsx
<motion.div className={s.Wrapper}>
```

`motion.div` используется как обёртка без `initial`, `animate`, `exit` или `transition`. Это добавляет вес Framer Motion без какой-либо пользы. Следует заменить на обычный `<div>`.

### `children` передаётся через явный проп вместо JSX-дочернего элемента

```tsx
<Header children={children} onModeChange={onModeChange} />
```

Передача `children` как явного атрибута — устаревший паттерн. Следует:

```tsx
<Header onModeChange={onModeChange}>{children}</Header>
```

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## DataTable.types.ts

### `CellRenderer<T extends object = any>` — `any` как дефолт

```ts
export interface CellRenderer<T extends object = any> { ... }
```

Использование `any` в качестве дефолта снимает типобезопасность при использовании `CellRenderer` без явного параметра. Лучше `= object` или требовать явного указания типа.

### Комментарии на русском языке в публичных типах

```ts
// Базовый интерфейс колонки
// Специфичные опции для разных типов колонок
// Типы колонок с их специфичными опциями
```

Комментарии в публичных типах библиотеки должны быть на английском языке.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `DataTable.tsx:86–93` | `table.setState` для кастомного поля — антипаттерн, для этого есть `meta` |
| 🟠 Высокий | `DataTable.tsx:69` | `selectableMode` в `initialState` — нестандартное поле, игнорируется TanStack Table |
| 🟡 Средний | `DataTable.tsx:101–106` | `props.columns` вместо деструктурированного `columns` — непоследовательность |
| 🟡 Средний | `DataTable.tsx:110` | `motion.div` без анимации — лишний вес Framer Motion |
| 🟡 Средний | `DataTable.tsx:112` | `children` передаётся как явный атрибут вместо JSX-дочернего элемента |
| 🟡 Средний | `DataTable.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `DataTable.types.ts:320` | `CellRenderer<T = any>` — `any` как дефолт снимает типобезопасность |
| 🟢 Низкий | `DataTable.types.ts` | Комментарии на русском языке в публичных типах |
