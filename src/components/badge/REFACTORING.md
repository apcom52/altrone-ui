# Заметки по рефакторингу — components/badge

---

## index.ts

### Критический баг: экспортируется `Avatar` вместо `Badge`

```ts
// line 1
export { Avatar } from './Badge.tsx';
```

Файл экспортирует несуществующий именованный экспорт `Avatar` из `Badge.tsx`, тогда как сам компонент объявлен как `export const Badge`. Импорт через `index.ts` вернёт `undefined`. Все компоненты, которые используют `Badge`, обходят эту ошибку, импортируя напрямую из файла:

```ts
import { Badge } from 'components/badge/Badge.tsx';  // прямой импорт
```

Кроме того, `Badge` вообще отсутствует в `src/components/index.ts` — компонент недоступен потребителям библиотеки через публичный API.

---

## Badge.tsx

### Отсутствует интеграция с `useConfiguration`

Все остальные компоненты читают свой конфиг-слайс через `useConfiguration()` и мержат `className`/`style`. `Badge` этого не делает, хотя в конфигурационном контексте у нескольких компонентов есть `badgeClassName`:

```ts
// AltroneConfiguration.context.ts
button?: ComponentConfiguration<{
  badgeClassName?: string;
}>;
```

У самого `Badge` нет своего слайса в `ConsumerConfigurationContext` — ни `badge?: ComponentConfiguration`, ни использования переданного `badgeClassName`. Конфигурирование бейджа возможно только через пропсы на каждом месте использования.

### Семантика: `<div>` для строчного элемента

`Badge` рендерится как `<div>` — блочный элемент. Бейдж по природе является строчным элементом (счётчик, метка), поэтому семантически более корректен `<span>`. Использование `<div>` внутри `<button>`, `<a>` или `<li>` может нарушать HTML-валидацию.

### Нет атрибутов доступности

Бейджи часто несут числовое значение (счётчик уведомлений), но компонент не имеет ни `aria-label`, ни `role`. Для пользователей скринридеров содержимое бейджа может быть недоступно или прочитано без контекста.

---

## Badge.types.ts

### `React` не импортирован

```ts
// line 1
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>
```

`React` нигде не импортирован. Работает только если типы React глобально доступны через `tsconfig`.

### `JSX.Element` устарел, тип `children` слишком ограничен

```ts
children: string | number | JSX.Element;
```

`JSX.Element` — устаревший алиас, в новых версиях React рекомендуется `React.ReactElement`. Кроме того, объединение `string | number | JSX.Element` исключает `null`, `undefined`, массивы — то есть стандартные случаи `ReactNode`. Если задача — ограничить содержимое бейджа примитивами (что семантически оправдано), это стоит задокументировать явным комментарием.

---

## badge.module.scss

### CSS-переменные определены в `:root` вместо `[data-altrone-root]`

```scss
/* line 3–9 */
:root {
  --badge-radius: 4px;
  --badge-vertical-padding: 0;
  --badge-horizontal-padding: var(--xs-gap);
  --badge-height: 16px;
  --badge-font-size: 8px;
}
```

Другие компоненты (например `text.module.scss`) определяют свои переменные внутри `:global([data-altrone-root='true'])`. Определение в `:root` засоряет глобальное пространство имён CSS и может вступить в конфликт с переменными хост-приложения.

### Миксин `small-label` сразу переопределяется

```scss
/* line 19–21 */
@include small-label;              /* устанавливает font-size: var(--smallLabelFontSize) */
font-size: var(--badge-font-size); /* сразу перезаписывает его значением 8px */
line-height: var(--badge-height);  /* перезаписывает line-height из миксина */
```

От миксина `small-label` реально используется только `font-family` и `font-weight` — остальные свойства немедленно перекрываются. Либо нужно использовать миксин полностью, либо не использовать его и прописать нужные свойства явно.

### Нет цвета текста и фона — компонент визуально не определён

В `.Badge` отсутствуют `color` и `background`. Бейдж наследует цвет от родителя, что делает его внешний вид полностью непредсказуемым. Нет ни светлой темы, ни тёмной — компонент не имеет собственного визуального стиля.

### Нет стилей тёмной темы

Отсутствует секция для тёмного режима. В отличие от `text.module.scss`, где есть блок для `[data-altrone-theme='dark']`, `Badge` никак не адаптируется к смене темы.

### Захардкоженные значения

- `--badge-radius: 4px` — вместо CSS-переменной из дизайн-системы
- `--badge-height: 16px` — вместо spacing/size токена
- `--badge-font-size: 8px` — вне типографической шкалы, не совпадает с `--smallLabelFontSize`

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `index.ts:1` | Экспортируется `Avatar` вместо `Badge` — публичный API сломан |
| 🔴 Критический | `index.ts` + `components/index.ts` | `Badge` отсутствует в публичном экспорте библиотеки |
| 🟠 Высокий | `badge.module.scss` | Нет `color` и `background` — компонент визуально не определён |
| 🟠 Высокий | `badge.module.scss` | Нет стилей тёмной темы |
| 🟠 Высокий | `badge.module.scss:3` | CSS-переменные в `:root` вместо `[data-altrone-root]` |
| 🟠 Высокий | `Badge.tsx` | `ref` не пробрасывается — нарушение обязательного требования CLAUDE.md |
| 🟡 Средний | `Badge.tsx` | Нет `useConfiguration` — компонент не поддерживает глобальный конфиг |
| 🟡 Средний | `Badge.tsx:12` | `<div>` вместо `<span>` — нарушение семантики HTML |
| 🟡 Средний | `badge.module.scss:19–21` | `@include small-label` немедленно перекрывается своими же свойствами |
| 🟡 Средний | `Badge.tsx` | Нет `aria-label` / `role` — недоступен для скринридеров |
| 🟢 Низкий | `Badge.types.ts:1` | `React` не импортирован явно |
| 🟢 Низкий | `Badge.types.ts:2` | `JSX.Element` устарел, стоит использовать `React.ReactElement` |
| 🟢 Низкий | `badge.module.scss` | Захардкоженные значения `4px`, `16px`, `8px` вместо CSS-переменных |
