# Заметки по рефакторингу — components/loading

---

## Loading.tsx

### Баг: `strokeWidth + 'px'` приводит к невалидному SVG-атрибуту

```tsx
// line 46, 55
strokeWidth={strokeWidth + 'px'}
```

Если передать `strokeWidth="2px"`, результат — строка `"2pxpx"`, что является невалидным значением SVG-атрибута `stroke-width`. SVG принимает числовые значения без единиц или `px`. Суффикс `'px'` здесь избыточен — нужно передавать `strokeWidth` напрямую.

### Баг: CSS-переменная в фолбэке не совпадает с объявленной переменной

```ts
// Loading.tsx — line 18
const currentColor = color ?? loadingConfig.color ?? 'var(--loadingColor)';

// loading.module.scss — line 4
--loading-color: var(--text-2);  // kebab-case
```

Фолбэк ссылается на `--loadingColor` (camelCase), тогда как в стилях объявлена `--loading-color` (kebab-case). Это два разных CSS-свойства. Если `color` не передан и в конфиге нет значения, цвет не будет получен из дизайн-системы.

### `parseInt` без радикса и ограниченная поддержка единиц

```ts
// line 27–28
const numericSize = parseInt(size);
const numericStroke = parseInt(strokeWidth);
```

- Отсутствует второй аргумент радикса (`parseInt(size, 10)`)
- `parseInt` отсекает всё после цифр: `'100%'` → `100`, `'2em'` → `2`. SVG `viewBox` и `r` будут рассчитаны неверно. Фактически поддерживаются только px-значения, но тип `size?: string` это не выражает

### `.Background` круг всегда невидим — мёртвый SVG

```scss
/* loading.module.scss — line 31–36 */
.Background {
  opacity: 0;  /* всегда 0 */
}
```

Фоновый трек спиннера никогда не отображается. Элемент присутствует в DOM и расходует ресурсы рендеринга SVG.

### Нет атрибутов доступности

Компонент не имеет ни `role="status"`, ни `aria-label`. Для скринридеров спиннер абсолютно невидим — пользователи не получают сообщения о состоянии загрузки.

---

## Loading.types.ts

### `React` не импортирован

```ts
export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement>
```

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Loading.tsx:46,55` | `strokeWidth + 'px'` — невалидный SVG при передаче значения с единицами |
| 🔴 Критический | `Loading.tsx:18` | `--loadingColor` не совпадает с `--loading-color` — цвет из темы не применяется |
| 🟠 Высокий | `Loading.tsx` | Нет `role="status"` и `aria-label` — невидим для скринридеров |
| 🟡 Средний | `Loading.tsx:27–28` | `parseInt` без радикса; поддерживаются только px, но тип `string` это не выражает |
| 🟡 Средний | `loading.module.scss:31–36` | `.Background` с `opacity: 0` — мёртвый SVG-элемент |
| 🟢 Низкий | `Loading.types.ts:1` | `React` не импортирован явно |
