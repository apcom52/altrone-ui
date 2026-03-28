# Заметки по рефакторингу — components/dialog

---

## dialog.ts

### Глобальный синглтон несовместим с несколькими `DialogProvider`

```ts
// line 43–45
let openDialog: ... | null = null;

export const registerDialogHandler = (handler) => { openDialog = handler; };
export const unregisterDialogHandler = () => { openDialog = null; };
```

Мутабельная модульная переменная — глобальный синглтон. При наличии двух `DialogProvider` в дереве второй `registerDialogHandler` перезапишет первый. При unmount любого из них `unregisterDialogHandler` обнулит `openDialog` — второй провайдер перестанет получать диалоги. Паттерн также нарушает тестовую изоляцию: состояние между тестами не сбрасывается.

### `showAlert(options?)` — `options` необязателен, но содержит required-поля

```ts
// line 57
export const showAlert = (options?: AlertOptions): Promise<void>
// AlertOptions = { title: string; message: string; ... }
```

`showAlert()` без аргументов использует `{ title: '', message: '' }` — диалог открывается с пустыми строками без каких-либо предупреждений. Либо сделать `options` обязательным, либо добавить guard с информативной ошибкой.

### `showPrompt` защищается от `undefined` при обязательном `options`

```ts
// line 89–90
export const showPrompt = (options: PromptOptions): Promise<...>
// ...
const params = options || {};  // options — required, || {} избыточен
```

`options` объявлен обязательным, но тело функции защищается через `|| {}`. Это противоречие.

### Захардкоженный placeholder в `showPrompt`

```ts
// line 106
placeholder: params.placeholder ?? 'Input your value',
```

Дефолтный placeholder на английском, `useLocalization` недоступен на уровне модуля. При выборе любого языка кроме английского placeholder останется непереведённым.

---

## DialogProvider.tsx

### Все дефолтные строки захардкожены на английском

```tsx
label={dialog.okText || 'OK'}
label={dialog.confirmText || 'Confirm'}
label={dialog.rejectText || 'Cancel'}
label={dialog.cancelText || 'Cancel'}

const defaultTitle =
  dialog?.type === 'alert' ? 'Alert' :
  dialog?.type === 'confirm' ? 'Confirm' :
  dialog?.type === 'prompt' ? 'Prompt' : 'Alert';
```

`DialogProvider` — React-компонент, у него есть доступ к `useLocalization()`, но он не используется. При языке `ru` или другом все дефолтные лейблы кнопок и заголовки останутся на английском.

### `inputValue` типизирован как `unknown`

```ts
// line 20
const [inputValue, setInputValue] = useState<unknown>(null);
```

Везде используется с явными приведениями типов: `inputValue as string`, `inputValue as number`. Правильный тип: `string | number | null`.

### `handleConfirm` принимает параметр `result`, но игнорирует его для prompt

```ts
// line 31–41
const handleConfirm = (result: unknown) => {
  if (dialog.type === 'confirm') {
    dialog.resolve(Boolean(result));     // result используется
  } else if (dialog.type === 'prompt') {
    dialog.resolve(inputValue as ...);   // result игнорируется, берётся стейт
  } else if (dialog.type === 'alert') {
    dialog.resolve();                    // result не нужен
  }
};
```

Для `confirm` логика правильная. Для `prompt` и `alert` параметр `result` бессмысленен. Функция делает слишком много — лучше разделить на `confirmAlert`, `confirmConfirm`, `confirmPrompt`.

### `<div />` как trigger для `Modal` — семантический хак

```tsx
// line 150
<Modal openedByDefault={true} ...>
  <div />   // ← placeholder, никогда не виден
</Modal>
```

`Modal` требует `children` как trigger-элемент для открытия. `DialogProvider` обходит это, передавая пустой `<div />` и сразу открывая модал через `openedByDefault`. Это жёсткая связь с внутренней реализацией `Modal`. Диалог должен иметь собственный механизм отображения, не зависящий от Modal's trigger-паттерна.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `dialog.ts:43–55` | Глобальный синглтон `openDialog` — несовместим с несколькими провайдерами и тестами |
| 🟠 Высокий | `DialogProvider.tsx` | Все строки захардкожены на английском — `useLocalization` не используется |
| 🟠 Высокий | `DialogProvider.tsx:150` | `<div />` как placeholder trigger для `Modal` — семантический хак |
| 🟡 Средний | `DialogProvider.tsx:20` | `inputValue: unknown` с приведениями — использовать `string \| number \| null` |
| 🟡 Средний | `DialogProvider.tsx:31–41` | `handleConfirm` смешивает разную логику — параметр `result` для prompt бессмысленен |
| 🟡 Средний | `dialog.ts:57` | `showAlert(options?)` — необязательный аргумент с required-полями внутри |
| 🟢 Низкий | `dialog.ts:89,99` | `options || {}` при обязательном `options` — лишняя защита |
| 🟢 Низкий | `dialog.ts:106` | `'Input your value'` — захардкоженный placeholder без локализации |
