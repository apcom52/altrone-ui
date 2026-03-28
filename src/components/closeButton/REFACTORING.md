# Заметки по рефакторингу — components/closeButton

---

## CloseButton.tsx

### Отсутствуют обязательные файлы по структуре компонента

Согласно CLAUDE.md, каждый компонент должен иметь:
- `CloseButton.types.ts` — отсутствует, типы прописаны inline
- `CloseButton.stories.tsx` — отсутствует
- `CloseButton.test.tsx` — отсутствует

Это единственный компонент в библиотеке без файла типов.

### Типы прописаны inline вместо файла типов

```ts
// CloseButton.tsx — line 12
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
```

Пропсы описаны прямо в сигнатуре компонента. Нет возможности переиспользовать тип или расширить его без изменения самого компонента.

### Несоответствие типов пропсов между `CloseButton` и `Button`

`CloseButton` принимает `React.ButtonHTMLAttributes<HTMLButtonElement>` и прокидывает `...props` в `Button`. Но `Button` ожидает `ButtonProps` — интерфейс с обязательным `label: string`. Если кто-то попытается передать `CloseButton` проп, который конфликтует с внутренними пропсами `Button` (например, `label`, `icon`, `showLabel`), поведение будет непредсказуемым: пользовательский `label` перетрётся до вычисления `cls`, если `...props` идёт после.

### `title` и `aria-label` содержат одно и то же значение

```tsx
aria-label={t('closeButton.ariaLabel')}
title={t('closeButton.ariaLabel')}
label={t('closeButton.ariaLabel')}
```

`title` и `aria-label` дублируют друг друга. Скринридеры читают `aria-label` и игнорируют `title`, а `title` создаёт лишний тултип при наведении. Достаточно оставить только `aria-label`.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟠 Высокий | `CloseButton.tsx` | `ref` не пробрасывается — компонент не принимает `ref` в пропсах; `Button` умеет принимать ref, но до него этот ref не доходит |
| 🟠 Высокий | — | Отсутствует `CloseButton.types.ts`, `CloseButton.stories.tsx` |
| 🟡 Средний | `CloseButton.tsx:12` | Типы пропсов inline вместо отдельного файла |
| 🟡 Средний | `CloseButton.tsx` | Несоответствие типов: `ButtonHTMLAttributes` vs `ButtonProps` |
| 🟢 Низкий | `CloseButton.tsx:29–31` | `title` дублирует `aria-label` — избыточно |
