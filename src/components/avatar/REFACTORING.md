# Заметки по рефакторингу — components/avatar

---

## Avatar.tsx

### Баг: `getColorLuminance` не работает с CSS-переменными

```ts
// line 13 — дефолтное значение — строка CSS-переменной
color = 'var(--interactive-1)',

// line 39 — функция ожидает HEX-строку
const textColor =
  GlobalUtils.getColorLuminance(color) === 'dark'
    ? 'var(--white)'
    : 'var(--black)';
```

`getColorLuminance` парсит hex-строку: обрезает `#`, читает байты через `parseInt(..., 16)`. При передаче `'var(--interactive-1)'` все `parseInt` вернут `NaN`, яркость будет `NaN`, и `NaN < 128` вычислится в `false` → функция всегда вернёт `'light'`. Цвет текста будет `var(--black)` вне зависимости от реального фона. Баг проявляется при использовании дефолтного цвета или любого CSS-значения не в формате HEX.

### Нет фолбэка при ошибке загрузки `imageSrc`

```tsx
<img src={imageSrc} className={s.Image} alt={fullName} />
```

Если URL невалиден или изображение недоступно, отобразится стандартный broken image браузера. Нет обработчика `onError` для fallback к инициалам.

### `size` поддерживает только `'s'` и `'l'`

```ts
// Avatar.types.ts — size?: Size
// Size включает: 'mini' | 's' | 'm' | 'l' | 'xl'
```

```scss
/* avatar.module.scss — только два модификатора */
.Small { ... }  /* size === 's' */
.Large { ... }  /* size === 'l' */
```

При передаче `size='mini'`, `size='m'` или `size='xl'` не применяется ни один класс — аватар остаётся базового размера без каких-либо предупреждений. Тип обещает больше вариантов, чем реально поддерживается.

### Приоритет стилей в `styles` непоследователен

```ts
const styles = {
  backgroundColor: color,   // 1. пропс компонента
  ...avatarConfig.style,    // 2. конфиг переопределяет пропс
  ...style,                 // 3. inline style переопределяет конфиг
};
```

Если потребитель задал `avatar.style = { backgroundColor: 'red' }` в конфиге, он перекроет явный проп `color`. Ожидаемый порядок приоритета: конфиг → пропс `color` → inline `style`.

---

## Avatar.types.ts

### `React` не импортирован

```ts
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>
```

`React` нигде не импортирован.

---

## avatar.module.scss

### CSS-переменные не определены в `[data-altrone-root]`

Переменные (`--avatar-size`, `--avatar-letter-size`, `--avatar-image-size`) объявлены внутри `.Avatar`, а не в `:global([data-altrone-root='true'])` как в других компонентах. Это нормально для инкапсуляции, но несогласованно.

### Нет стилей тёмной темы

Отсутствует секция для тёмного режима. Псевдоэлемент `:after` с белым градиентом выглядит одинаково в светлой и тёмной теме.

### Захардкоженные значения

- `rgba(255, 255, 255, 0.4)` в `:after` — вместо CSS-переменной
- `margin: 2px` в `.Image` — вне spacing-токенов
- `font-weight: 500` в `.Letters` — вместо `var(--text-weight-medium)`
- `top: 0%` в `:after` — лишний `%` у нулевого значения

### Конфликт цвета текста в `.Letters`

```scss
.Letters {
  color: var(--default-900);  /* применяется из CSS */
}
```

```tsx
<span className={s.Letters} style={{ color: textColor }}> /* переопределяется inline */
```

`color` в классе полностью перекрывается inline-стилем. Переменная `var(--default-900)` либо не определена в дизайн-системе, либо её значение никогда не используется.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `Avatar.tsx:39` | `getColorLuminance` не работает с CSS-переменными — цвет текста всегда `black` при дефолтном `color` |
| 🟠 Высокий | `Avatar.tsx` | Нет `onError` фолбэка при битом `imageSrc` |
| 🟠 Высокий | `Avatar.types.ts` + `avatar.module.scss` | `size` обещает 5 вариантов, реализованы только `'s'` и `'l'` |
| 🟡 Средний | `Avatar.tsx:32–36` | Неверный порядок приоритета: конфиг перекрывает проп `color` |
| 🟡 Средний | `avatar.module.scss` | Нет стилей тёмной темы |
| 🟡 Средний | `avatar.module.scss:37` | `color: var(--default-900)` — переменная перекрывается inline и скорее всего не определена |
| 🟢 Низкий | `avatar.module.scss` | Захардкоженные `rgba`, `2px`, `font-weight: 500` |
| 🟠 Высокий | `Avatar.tsx` | `ref` не пробрасывается — нарушение обязательного требования CLAUDE.md |
| 🟢 Низкий | `Avatar.types.ts:3` | `React` не импортирован явно |
