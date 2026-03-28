# Заметки по рефакторингу — components/drawer

---

## Drawer.tsx

### `document.querySelector` вызывается во время рендера — SSR-небезопасно

```ts
// line 69–70
const altroneRoot =
  document.querySelector('[data-altrone-root="true"]') || document.body;
```

`document` недоступен на сервере. Этот вызов происходит при каждом рендере (не в `useEffect`), что приводит к ошибке в SSR-окружении. Нужно обернуть в `useEffect` или использовать lazy-инициализацию через `useRef`.

### `cloneElement` перезаписывает существующий `onClick` дочернего элемента

```tsx
{cloneElement(children, {
  onClick: () => setIsOpen(true),
})}
```

Если `children` уже имеет `onClick`, он будет полностью заменён. Кнопка-триггер лишится своего собственного обработчика. Нужно объединять обработчики:

```ts
onClick: (e) => {
  children.props.onClick?.(e);
  setIsOpen(true);
}
```

### `handleDone` не закрывает drawer при `void`-возврате из `onDone`

```ts
const handleDone = async () => {
  const result = await onDone?.();
  stopLoading();
  if (result === false) return;
  if (result) {          // ← undefined (void) — falsy, drawer не закроется
    handleClose();
  }
};
```

По типу `onDone?: () => Promise<boolean | void>` возврат `void` (нет `return`) должен означать «закрыть drawer». Но `void` приводится к `undefined`, которое falsy — `if (result)` не сработает. Нужно изменить логику на `if (result !== false) { handleClose(); }`.

### Строка `"Done"` захардкожена — не использует локализацию

```tsx
<Button label="Done" .../>
```

По правилам CLAUDE.md пользовательские строки должны приходить из `useLocalization()`. Других захардкоженных строк в кодовой базе нет.

### `HTMLAttributes` из `DrawerProps` фактически не используются

```ts
export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>
```

Компонент не рендерит корневой элемент-контейнер, который получал бы `{...rest}`. Все атрибуты из `HTMLAttributes` (кроме `className` и `style`, использующихся в `.Drawer`) тихо игнорируются. Это вводит потребителей в заблуждение.

### `useConfiguration` не используется — конфиг игнорируется

Drawer не вызывает `useConfiguration()`. Потребитель не может переопределить стили через глобальный конфиг.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

---

## drawer.module.scss

### `.DrawerTitle` использует сырые CSS-переменные вместо typography-миксина

```scss
.DrawerTitle {
  font-size: var(--text-size-4);
  font-weight: var(--text-weight-bold);
  line-height: var(--text-line-height-4);
}
```

По соглашению проекта типографика задаётся через SCSS-миксины (`@include heading`, `@include subheader` и пр.), а не через прямое обращение к CSS-переменным.

### Статическая ширина в CSS не совпадает с дефолтом из JS

```scss
.Drawer {
  width: 300px;  // CSS-дефолт
}
```

```tsx
width = 400,  // JS-дефолт из пропсов
```

При рендере к `.Drawer` применяется `style={{ width: '400px' }}` из пропсов, что перекрывает CSS-значение `300px`. CSS-значение никогда не применяется — это мёртвый код, вводящий в заблуждение.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Drawer.tsx:70` | `document.querySelector` во время рендера — SSR-небезопасно |
| 🔴 Критический | `Drawer.tsx:74–76` | `cloneElement` перезаписывает `onClick` триггера — существующий обработчик теряется |
| 🟠 Высокий | `Drawer.tsx:52–58` | `handleDone` не закрывает drawer при `void`-возврате из `onDone` |
| 🟠 Высокий | `Drawer.tsx:113` | `"Done"` захардкожен — не использует `useLocalization()` |
| 🟡 Средний | `Drawer.tsx` | `useConfiguration` не используется — конфиг игнорируется |
| 🟡 Средний | `Drawer.tsx` | `ref` не пробрасывается |
| 🟡 Средний | `DrawerProps` | `HTMLAttributes` фактически не применяются — вводят потребителей в заблуждение |
| 🟢 Низкий | `drawer.module.scss:67–70` | Typography без `@include` миксина — нарушение соглашения проекта |
| 🟢 Низкий | `drawer.module.scss:32` | `width: 300px` в CSS никогда не применяется — JS-дефолт `400px` всегда перекрывает |
