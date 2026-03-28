# Заметки по рефакторингу — components/message

---

## Message.tsx

### `useEffect` для предупреждения об устаревшем пропе — избыточно

```tsx
// line 44–48
useEffect(() => {
  if (role) {
    GlobalUtils.deprecatedMessage('Message', 'role', 'severity', '4.0');
  }
}, [role]);
```

`useEffect` для вывода предупреждения в dev-режиме не нужен — это создаёт подписку и добавляет работу для React. Достаточно условной проверки прямо в теле компонента:
```ts
if (role) GlobalUtils.deprecatedMessage(...);
```

### `ariaRole='alert'` по умолчанию — слишком агрессивно

```ts
// line 18
ariaRole = 'alert',
```

ARIA `alert` вызывает немедленное объявление через скринридер при появлении элемента. Для информационных сообщений (тип `primary`) это раздражает пользователей. Дефолтом должен быть `'status'` или `undefined`, с `'alert'` только для `severity='danger'`.

### Коллизия имён: проп `role` совпадает с HTML-атрибутом `role`

```ts
// Message.types.ts
role?: Role;        // устаревший проп (тип severity)
ariaRole?: string;  // настоящий HTML role
```

`MessageProps extends HTMLProps<HTMLDivElement>`, который включает `role?: string`. Пользовательский проп `role?: Role` перекрывает HTML-атрибут, что создаёт неочевидную коллизию типов. Устаревший проп лучше было бы назвать иначе с самого начала.

### `JSX.Element` вместо `ReactElement` в типах

```ts
// Message.types.ts
header?: string | JSX.Element;
actions?: JSX.Element[];
```

`JSX.Element` — устаревший алиас. Следует использовать `ReactElement` из прямого импорта.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `Message.tsx:18` | `ariaRole='alert'` по умолчанию — немедленно объявляется скринридером для любого сообщения |
| 🟡 Средний | `Message.tsx:44–48` | `useEffect` для deprecation warning — проще и эффективнее сделать inline-проверку |
| 🟡 Средний | `Message.types.ts:8` | Коллизия `role?: Role` с HTML-атрибутом `role` из `HTMLProps` |
| 🟢 Низкий | `Message.types.ts:7,11` | `JSX.Element` устарел — заменить на `ReactElement` |
