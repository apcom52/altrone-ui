# Заметки по рефакторингу — components/pagination

---

## Pagination.tsx

### `useEffect` вызывает `setPage(1)` при выходе `currentPage` за пределы — неконтролируемый сброс

```ts
useEffect(() => {
  if (currentPage < 1 || currentPage > totalPages) {
    setPage(1);  // ← изменяет контролируемое состояние без взаимодействия пользователя
  }
}, [currentPage, totalPages, setPage]);
```

Компонент самостоятельно сбрасывает страницу при несоответствии значений. Это нарушает принцип controlled-компонента: потребитель должен сам решать, что делать при невалидной странице. Кроме того, если `setPage` обновляет `totalPages` через запрос данных, возможна цепочка обновлений. Следует выдавать предупреждение или вообще убрать эффект.

### Захардкоженные строки — нарушение локализации

```tsx
label={'Previous page'}   // line 83
label={'Next page'}       // line 133
aria-label="Pagination Navigation"  // line 72
```

Три пользовательских строки не используют `useLocalization()`. При смене языка они останутся на английском.

### Имя пропса `setPage` нарушает соглашение об именовании колбэков

```ts
setPage: (page: number) => void;
```

По соглашению проекта (и React-стандарту) колбэки-обработчики событий называются `onXxx`. Имя `setPage` напоминает стейт-сеттер из `useState`, что вводит в заблуждение. Следует переименовать в `onPageChange`.

### `onPageChange` / `setPage` не принимает событие

По правилам CLAUDE.md все колбэки должны принимать нативный DOM-event последним аргументом.

### `navigateToPage` не в `useCallback` — новая функция при каждом рендере

```ts
const navigateToPage = () => { ... };
```

Передаётся в обработчик `onClick` внутри `Popover content`. Создаётся заново на каждый рендер.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## Pagination.types.ts

### `React` не импортирован

```ts
// нет импорта
export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement>
```

---

## pagination.module.scss

### `transition` определён дважды в `.CurrentPage` — второй перекрывает первый

```scss
.CurrentPage {
  transition: background-color 0.2s ease;  /* line 27 — перекрывается */
  ...
  transition: color 0.2s ease;             /* line 37 — остаётся */
}
```

Первый `transition` (для `background-color`) никогда не применится — он перекрыт вторым правилом. Вероятно, хотелось `transition: background-color 0.2s ease, color 0.2s ease`.

### `.Disabled` определён, но никогда не применяется

```scss
.Disabled {
  color: var(--disabled-text-color);
}
```

Компонент не добавляет класс `.Disabled` ни при каких условиях. Мёртвый CSS.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Pagination.tsx:26–35` | `useEffect` сбрасывает страницу принудительно — нарушение controlled-компонента |
| 🟠 Высокий | `Pagination.tsx:72,83,133` | Три захардкоженных строки — нарушение локализации |
| 🟠 Высокий | `Pagination.types.ts:4` | Проп `setPage` должен называться `onPageChange` по соглашению |
| 🟡 Средний | `Pagination.types.ts:4` | `setPage` не принимает DOM-event — нарушение соглашения проекта |
| 🟡 Средний | `Pagination.tsx:56–67` | `navigateToPage` не в `useCallback` |
| 🟡 Средний | `Pagination.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `pagination.module.scss:27,37` | Двойной `transition` — первый перекрывается вторым |
| 🟢 Низкий | `pagination.module.scss:45–47` | `.Disabled` никогда не применяется — мёртвый CSS |
| 🟢 Низкий | `Pagination.types.ts` | `React` не импортирован |
