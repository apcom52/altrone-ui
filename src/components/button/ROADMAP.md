# Button — Roadmap

Анализ текущего состояния компонента и направления развития.

---

## Что уже есть

- Варианты: `default`, `submit`, `text` (и `action` — в SCSS, но не в types)
- Размеры: `mini / s / m / l / xl`
- Состояния: `idle / loading / succeeded / failed`
- Флаги: `danger`, `selected`, `showLabel`
- Слоты: `icon`, `additionalIcon`, `badge`
- Анимация нажатия через Framer Motion (scale 0.95)
- Автоматический тултип когда `showLabel={false}`

---

## Пропущенные / недоделанные возможности

### 🔴 `action` вариант не задокументирован

Класс `.Action` есть в SCSS, но `'action'` отсутствует в `ButtonProps['variant']`.
Нужно либо добавить в тип и задать стили, либо удалить класс.

### 🔴 Нет компонента `ButtonGroup`

Нет никакого способа визуально сгруппировать несколько кнопок в единый контрол (тулбар, сегментированный переключатель). Это частый паттерн: редакторы текста, панели инструментов, переключатели режимов.

```tsx
<Button.Group>
  <Button label="Bold" icon={<Bold />} showLabel={false} />
  <Button label="Italic" icon={<Italic />} showLabel={false} />
  <Button label="Underline" icon={<Underline />} showLabel={false} />
</Button.Group>
```

### 🟠 Нет поддержки рендера как `<a>` / `asChild`

Кнопка всегда рендерится как `<motion.button>`. Паттерн `asChild` (уже объявлен в рефакторинг-заметках, но не реализован) позволил бы использовать кнопку как ссылку:

```tsx
<Button asChild label="Открыть профиль" icon={<User />}>
  <a href="/profile" />
</Button>
```

Альтернатива — проп `href` / `as`, но `asChild` предпочтительнее для совместимости с роутерами (`react-router`, `next/link`).

### 🟠 Нет режима `fullWidth`

Кнопка всегда `width: fit-content`. Нет возможности растянуть её на всю ширину контейнера без внешних CSS-обёрток.

```tsx
<Button fullWidth label="Войти" variant="submit" />
```

### 🟠 `rainbowEffect` не реализован

Опция `button.rainbowEffect` присутствует в `ConsumerConfigurationContext`, но в `Button.tsx` не читается и не применяется.

### 🟡 Нет `shape` проп

Сейчас форма кнопки фиксирована: скруглённые края (`--button-rounding`). Нет возможности явно задать:
- `rounded` — текущий вид (по умолчанию)
- `square` — прямоугольник с маленькими скруглениями
- `circle` — идеальный круг (для иконочных кнопок)

### 🟡 Нет `shortcut` проп

Многие UI-системы показывают клавиатурный шорткат прямо в кнопке. Сейчас единственный способ — добавить что-то через `additionalIcon`, что семантически неверно.

```tsx
<Button label="Сохранить" shortcut="⌘S" />
// рендерит: [Сохранить  ⌘S]
```

### 🟡 Нет управления `aria-label`

Когда `showLabel={false}`, доступность обеспечивается только через `title`. Нужно автоматически проставлять `aria-label={label}` в этом режиме. Сейчас скринридер видит кнопку без текстовой метки.

### 🟡 Нет поддержки `progress` стейта

Кроме `loading` (спиннер), нет `progress` — состояния с процентным индикатором (например, загрузка файла). Полезно для кнопок, инициирующих долгие операции с известным прогрессом.

```tsx
<Button state="progress" progress={42} label="Загрузка файла" />
```

### 🟡 Нет async-обёртки для `onClick`

Нет хука / проп для автоматического управления состоянием: передал async-функцию — кнопка сама переходит в `loading`, а по завершении в `succeeded` / `failed`.

```tsx
<Button
  label="Сохранить"
  onAsyncClick={async () => {
    await saveData();
  }}
/>
```

### 🟢 Нет `color` / `accent` проп

Сейчас кастомный цвет акцента — только через `danger`. Нет возможности задать произвольный цветовой акцент на конкретную кнопку без CSS-overrides:

```tsx
<Button label="Успех" color="green" />
<Button label="Предупреждение" color="orange" />
```

### 🟢 Нет `tooltip` проп для переопределения тултипа

Сейчас тултип у иконочных кнопок всегда равен `label`. Нет способа задать другой текст тултипа:

```tsx
<Button label="X" showLabel={false} icon={<X />} tooltip="Закрыть без сохранения" />
```

### 🟢 Нет `counter` варианта `badge`

`badge` принимает любой контент. Но нет встроенной логики «99+» — когда число превышает порог, значок должен усекаться. Это стандартное поведение, которое каждый потребитель сейчас реализует самостоятельно.

```tsx
<Button badge={1234} maxBadgeCount={99} label="Уведомления" />
// показывает: [Уведомления  99+]
```

---

## Новые под-компоненты

### `Button.Group`

Контейнер, который:
- Визуально объединяет кнопки (убирает отступы, сливает границы)
- Опционально работает как radio-группа (`selectionMode="single"`)
- Поддерживает `direction="horizontal" | "vertical"`

### `Button.Split` (SplitButton)

Кнопка с отдельной областью для дропдауна — основное действие + стрелка открывают разные вещи:

```tsx
<Button.Split
  label="Создать задачу"
  onMainClick={createTask}
  dropdown={<SomeMenu />}
/>
```

---

## Улучшения доступности (a11y)

| Сейчас | Нужно |
|--------|-------|
| `title={label}` всегда | `title` только при `!showLabel` |
| Нет `aria-label` | `aria-label={label}` при `showLabel={false}` |
| `disabled` при loading | `aria-disabled` + `aria-busy` при `state='loading'` |
| Нет `aria-pressed` | `aria-pressed={selected}` для toggle-кнопок |
| Нет `role="group"` | Нужен для `ButtonGroup` |

---

## Приоритизация

| Приоритет | Задача |
|-----------|--------|
| 🔴 Высокий | `action` вариант — задокументировать или удалить |
| 🔴 Высокий | `ButtonGroup` под-компонент |
| 🟠 Средний | `asChild` / `href` поддержка |
| 🟠 Средний | `fullWidth` проп |
| 🟠 Средний | `rainbowEffect` реализация |
| 🟠 Средний | a11y: `aria-label`, `aria-pressed`, `aria-busy` |
| 🟡 Низкий | `shape` проп |
| 🟡 Низкий | `shortcut` проп |
| 🟡 Низкий | `progress` стейт |
| 🟡 Низкий | async `onClick` обёртка |
| 🟢 Опционально | `color` / `accent` проп |
| 🟢 Опционально | `tooltip` переопределение |
| 🟢 Опционально | `maxBadgeCount` для badge |
| 🟢 Опционально | `Button.Split` |
