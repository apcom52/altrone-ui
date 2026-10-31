# Tooltip — Roadmap

---

## 🔴 Высокий приоритет

### 1. `delay` — настраиваемая задержка появления и скрытия

Сейчас задержки нет — тултип появляется мгновенно. Нужен проп `delay` для контроля паузы перед показом и скрытием.

```tsx
// число — одинаковая задержка для открытия и закрытия
<Tooltip content="Save file" delay={500}>
  <Button label="Save" />
</Tooltip>

// объект — раздельные задержки
<Tooltip content="Save file" delay={{ open: 600, close: 200 }}>
  <Button label="Save" />
</Tooltip>
```

**Зачем:** мгновенные тултипы раздражают при случайном наведении. Стандарт HIG — 500 мс на открытие.

---

### 2. `maxWidth` — ограничение ширины содержимого

Текущий CSS задаёт фиксированный `max-width: 300px`. Нужна возможность менять его через проп.

```tsx
<Tooltip content="A much longer description that needs more space" maxWidth={480}>
  <Button label="Details" />
</Tooltip>
```

---

### 3. Controlled open state — `open` + `onOpenChange`

Возможность управлять видимостью тултипа снаружи — для обучающих сценариев (onboarding), принудительного показа подсказки.

```tsx
<Tooltip
  content="Click here to get started"
  open={showHint}
  onOpenChange={setShowHint}
>
  <Button label="Start" />
</Tooltip>
```

---

## 🟠 Средний приоритет

### 4. `variant` — варианты оформления

Помимо тёмного тултипа (по умолчанию) нужны дополнительные варианты.

```tsx
<Tooltip content="Something went wrong" variant="danger">
  <Icon i="error" />
</Tooltip>

<Tooltip content="3 unread messages" variant="info">
  <Icon i="notifications" />
</Tooltip>
```

Варианты: `default` (текущий тёмный), `danger`, `warning`, `success`, `info`.

---

### 5. `rich` — расширенное содержимое с заголовком и действием

Режим «rich tooltip» по спецификации Material Design 3 и Fluent — с заголовком, описанием и опциональной кнопкой.

```tsx
<Tooltip
  rich
  content={{
    title: 'Keyboard shortcut',
    description: 'Press this combination to quickly save your work.',
    action: <Button label="Learn more" variant="text" />,
  }}
>
  <Icon i="keyboard" />
</Tooltip>
```

---

### 6. `triggerOn` — расширение списка триггеров

Сейчас тултип реагирует только на `hover` и `focus`. Нужна поддержка `click` для мобильных устройств.

```tsx
<Tooltip content="Tap to learn more" triggerOn={['hover', 'click']}>
  <Icon i="info" />
</Tooltip>
```

---

## 🟡 Низкий приоритет

### 7. `disableOnTouchDevice` — автоотключение на тач-устройствах

На мобильных устройствах hover-тултипы недостижимы, но могут мешать взаимодействию. Флаг для автоматического отключения.

```tsx
<Tooltip content="Edit row" disableOnTouchDevice>
  <Button icon={<Icon i="edit" />} label="Edit" showLabel={false} />
</Tooltip>
```

---

### 8. `arrow` — возможность скрыть стрелку

```tsx
<Tooltip content="Saved" arrow={false}>
  <Button label="Save" />
</Tooltip>
```

---

### 9. Группировка тултипов — единая задержка на всю группу

Если пользователь уже открыл один тултип в группе, следующие показываются без задержки (паттерн macOS Dock, GitHub toolbar).

```tsx
<TooltipGroup>
  <Tooltip content="Bold"><Button label="B" /></Tooltip>
  <Tooltip content="Italic"><Button label="I" /></Tooltip>
  <Tooltip content="Underline"><Button label="U" /></Tooltip>
</TooltipGroup>
```
