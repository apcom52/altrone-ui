# Dropdown — Roadmap

---

## 🔴 Высокий приоритет

### 1. `Dropdown.Section` — заголовок группы

Сейчас для разделения пунктов используется только `<Divider>`. Нужен отдельный компонент-заголовок секции с текстом.

```tsx
<Dropdown.Menu>
  <Dropdown.Section label="File" />
  <Dropdown.Action label="New file" />
  <Dropdown.Action label="Open..." />
  <Dropdown.Section label="Edit" />
  <Dropdown.Action label="Copy" />
</Dropdown.Menu>
```

**Зачем:** стандартный паттерн в macOS/Windows контекстных меню, часто нужен в продуктовых интерфейсах.

---

### 2. Скроллируемое меню — `maxHeight` в `Dropdown.Menu`

При большом количестве пунктов меню выходит за пределы экрана. `Dropdown.Menu` должно поддерживать `maxHeight` с внутренним скроллом.

```tsx
<Dropdown.Menu maxHeight={300}>
  {/* много пунктов */}
</Dropdown.Menu>
```

---

### 3. Controlled open state — `open` + `onOpenChange`

Сейчас `Dropdown` полностью uncontrolled. Нужна возможность управлять состоянием открытия снаружи.

```tsx
<Dropdown open={isOpen} onOpenChange={setIsOpen} content={...}>
  <Button label="Open" />
</Dropdown>
```

**Зачем:** нужно для программного открытия (tour, onboarding, E2E-тесты).

---

## 🟠 Средний приоритет

### 4. Поиск внутри меню — `Dropdown.Search`

Поле ввода в начале меню, которое фильтрует `Dropdown.Action` по `label`.

```tsx
<Dropdown.Menu>
  <Dropdown.Search placeholder="Search actions..." />
  <Dropdown.Action label="Copy" />
  <Dropdown.Action label="Paste" />
  <Dropdown.Action label="Cut" />
</Dropdown.Menu>
```

**Зачем:** критично для меню с 10+ пунктами (выбор языка, выбор пользователя, список команд).

---

### 5. `Dropdown.Action` с async loading

Пропс `loading` на `Dropdown.Action` — блокирует клик и показывает спиннер вместо иконки пока идёт запрос.

```tsx
<Dropdown.Action
  label="Deploy to production"
  loading={isDeploying}
  onClick={handleDeploy}
/>
```

---

### 6. `Dropdown.Action` как ссылка — пропс `href`

Возможность рендерить `Dropdown.Action` как `<a>` для навигационных меню.

```tsx
<Dropdown.Action
  label="Open in new tab"
  href="/dashboard"
  target="_blank"
  icon={<Icon i="open_in_new" />}
/>
```

---

### 7. `Dropdown.Action` с описанием — пропс `description`

Двухстрочный пункт меню: основной `label` + пояснительный текст под ним.

```tsx
<Dropdown.Action
  label="Export as CSV"
  description="Download all rows as a spreadsheet"
  icon={<Icon i="download" />}
/>
```

---

## 🟡 Низкий приоритет

### 8. `closeOnSelect` — отключение автозакрытия

Пропс на `Dropdown.Action` или `Dropdown.Menu` для случаев, когда меню должно оставаться открытым после выбора пункта (например, мультивыбор через `Checkbox`).

```tsx
<Dropdown.Action label="Toggle option" closeOnSelect={false} />
```

---

### 9. Виртуализация длинных списков

Для меню с 100+ пунктами (выбор часового пояса, выбор страны) — интеграция виртуального скролла через `@tanstack/virtual`.

Актуально только совместно с пунктом **2** (maxHeight).

---

### 10. `Dropdown.Action` с аватаром

Пропс `avatar` помимо `icon` — для меню выбора пользователя, команды, воркспейса.

```tsx
<Dropdown.Action
  avatar={<Avatar src={user.photo} />}
  label={user.name}
  description={user.email}
/>
```
