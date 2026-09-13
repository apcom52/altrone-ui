# ROADMAP — components/application

---

## 🔴 Critical / Bugs

### `setTheme` принимает `'auto'` — нарушает инвариант состояния
`ThemeContextType.setTheme` объявлен как `(theme: Theme) => void`, то есть принимает `'auto'`.
Если потребитель вызовет `setTheme('auto')`, внутреннее состояние станет `'auto'`, что обойдёт
`resolveInitialTheme` и сломает `data-altrone-theme` на элементе. Состояние всегда должно быть
`'light' | 'dark'` — сеттер должен это отражать.

```ts
// useTheme.ts — исправить тип
setTheme: (theme: Exclude<Theme, 'auto'>) => void;

// AltroneApplication.tsx — в useEffect обрабатывать 'auto' при смене пропа
```

### `useEffect` для `html.classList.toggle` — может давать FOUC
`useEffect` срабатывает после paint. При первом рендере `<html>` на долю кадра может не иметь
`AltroneDark`, если инициализация стейта уже правильная. Нужен `useLayoutEffect`.

```ts
// AltroneApplication.tsx — строка ~54
useLayoutEffect(() => {
  document.querySelector('html')?.classList.toggle('AltroneDark', theme === 'dark');
}, [theme]);
```

---

## 🟠 High — Технический долг

### Дублирование систем отступов
В проекте параллельно живут два набора переменных отступов:
- `_spacing.scss`: `--spacing-1..9` (4px, 8px, 12px, …, 64px) — определены на `:root`
- `altroneApplication.module.scss`: `--narrow-gap`, `--xs-gap`, `--s-gap`, `--gap`, `--l-gap`,
  `--xl-gap`, `--xxl-gap` — определены на `[data-altrone-root]`

Это приводит к путанице: непонятно, какой набор использовать в компонентах. Нужно унифицировать
в одну систему (предпочтительно `--spacing-*` как более предсказуемую).

### Устаревший блок `.AltroneDark` в `altroneApplication.module.scss`
Блок `:global(.AltroneDark)` (строки 185–239) содержит ~30 переменных на старых именах
(`--headingTextColor`, `--appBackground`, `--default-*`, `--primary-*`), которые больше нигде
не определены. Это мёртвый CSS. Тёмная тема сейчас работает через `[data-altrone-theme='dark']`
в каждом цветовом файле.

Блок нужно удалить, а необходимые переменные (`--translucent-background-*`, `--glass-*`,
`--buttonShadow` для тёмной темы) перенести в `[data-altrone-root][data-altrone-theme='dark']`.

### Несогласованный селектор тёмной темы
Цветовые файлы (`_blue.scss`, `_common.scss` и т.д.) используют `[data-altrone-theme='dark']`,
а `altroneApplication.module.scss` — `:global(.AltroneDark)`. Нужно выбрать один подход и
придерживаться его везде. Рекомендуется `[data-altrone-theme='dark']` (data-атрибут более
семантичен и не загрязняет classList).

### Legacy `@import` вместо `@use`
```scss
// altroneApplication.module.scss, строка 21
@import 'src/global/mixins'; // ← legacy, deprecated в Dart Sass
```
Все остальные подключения уже через `@use`. Это одно исключение нужно привести к единому стилю.

### `ThemeContext` — дефолтное значение `theme: 'auto'`
```ts
// useTheme.ts, строка 10
export const ThemeContext = createContext<ThemeContextType>({ theme: 'auto', ... });
```
Компоненты, использующие `useAltroneTheme()` вне `AltroneApplication`, получают `'auto'` — значение,
которое никогда не приходит из реального состояния. Безопасный дефолт — `'light'`.

---

## 🟡 Medium — Улучшения API

### `onThemeChange` callback
Нет возможности реагировать на смену темы извне без подписки на `ThemeContext`. Добавить проп:
```ts
onThemeChange?: (theme: 'light' | 'dark') => void;
```
Полезно для персистентности темы в `localStorage` / серверном стейте.

### Экспорт `Accent`, `Theme`, `Language` типов из `index.ts`
Потребитель, принимающий тему или акцент в своём компоненте, вынужден объявлять тип вручную.
Нужно добавить `export type { Theme, Accent, Language }` в `index.ts`.

### `useBreakpoint()` hook
Breakpoint CSS-переменные (`--breakpoint-xs..xl`) определены, но нет JS-хука для реактивного
использования в коде. Хук позволил бы писать адаптивную логику без `window.matchMedia` вручную:
```ts
const { isMobile, isTablet } = useBreakpoint();
```

### Персистентность темы через `localStorage`
Сейчас при перезагрузке страницы тема сбрасывается в `auto` / `initialTheme`. Можно добавить
опцию `persistTheme?: boolean` — при включении тема сохраняется в `localStorage` и читается при
инициализации как часть `resolveInitialTheme`.

### Поддержка кастомизации токенов через `config`
Сейчас `config` позволяет только переопределять `className`/`style` компонентов. Можно добавить
`config.tokens` — объект с переопределениями CSS-переменных, который применяется инлайн на
корневой элемент:
```ts
config={{ tokens: { '--controlRounding': '12px', '--gap': '10px' } }}
```

---

## 🟢 Low — Мелкие улучшения

### Опциональная загрузка шрифтов
Шрифты Inter и JetBrains Mono всегда загружаются через импорты в компоненте. Если потребитель
уже подключает Inter самостоятельно — происходит двойная загрузка. Стоит добавить проп
`loadFonts?: boolean` (по умолчанию `true`) для отключения встроенной загрузки.

### RTL-поддержка
Нет пропа `dir` и нет RTL-адаптации в стилях. При добавлении RTL-языков (арабский, иврит)
компоновка сломается. Минимальный шаг — проп `dir?: 'ltr' | 'rtl'`, который пробрасывается
на корневой элемент.

### Более строгая типизация `TranslationOptions.vars`
```ts
vars?: Record<string, any>; // useLocalization.tsx
```
Может быть заменён на `Record<string, string | number>` — переменные в шаблонах всегда
примитивы, `any` избыточен.

### `AltroneLocalization` — экспорт публичного типа
`LocalizationProps` и `LocalizationContextType` — приватные интерфейсы. Если потребитель захочет
типизировать словарь или пропы — нет доступа. Стоит рассмотреть экспорт хотя бы
`TranslationOptions`.

---

## Issue Summary

| Priority | Issue |
|---|---|
| 🔴 Critical | `setTheme` принимает `'auto'` — нарушает инвариант `'light' \| 'dark'` |
| 🔴 Critical | `useEffect` для `html.classList` — заменить на `useLayoutEffect` |
| 🟠 High | Два параллельных набора переменных отступов (`--spacing-*` и `--gap`, `--xs-gap` и др.) |
| 🟠 High | Блок `.AltroneDark` — мёртвый CSS с legacy-переменными, удалить |
| 🟠 High | Несогласованный селектор тёмной темы: `.AltroneDark` vs `[data-altrone-theme='dark']` |
| 🟠 High | `@import 'src/global/mixins'` — legacy, заменить на `@use` |
| 🟠 High | `ThemeContext` дефолт `theme: 'auto'` — безопасный дефолт `'light'` |
| 🟡 Medium | Добавить `onThemeChange` callback |
| 🟡 Medium | Экспортировать `Theme`, `Accent`, `Language` типы из `index.ts` |
| 🟡 Medium | `useBreakpoint()` hook для реактивной адаптивной логики |
| 🟡 Medium | `persistTheme?: boolean` для сохранения темы в `localStorage` |
| 🟡 Medium | `config.tokens` для переопределения CSS-переменных |
| 🟢 Low | `loadFonts?: boolean` — опциональная загрузка Inter / JetBrains Mono |
| 🟢 Low | RTL: проп `dir` и базовая адаптация стилей |
| 🟢 Low | `vars: Record<string, any>` → `Record<string, string \| number>` |
