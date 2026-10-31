# Заметки по рефакторингу — components/filePicker

---

## FilePicker.tsx

### Баг: `String(url)` вместо `String(name)` в контексте удаления файла

```ts
// line 92
const deleteContext = {
  url: String(url),
  name: String(url),   // ← копируется url вместо name
  pickerItem: old[0],
};
```

В поле `name` записывается значение `url`. При отправке запроса на удаление сервер получит неверный ключ файла в теле запроса. Правильно: `name: String(name)`.

### Async побочный эффект внутри функции-обновления `setFileList`

```ts
setFileList((old) => {
  if (old.length && autoUpload) {
    // ← async вызов внутри updater!
    void removeFileFn(deleteContext) || void deleteFileRequest(deleteContext);
  }
  return [...];
});
```

Функция-обновитель `setState` должна быть чистой и синхронной. Вызов `void removeFileFn(...)` или `void deleteFileRequest(...)` внутри — антипаттерн: в strict mode React вызывает updater дважды, что приведёт к двум запросам удаления. Вызов нужно вынести за пределы `setFileList`.

### Компонент только uncontrolled — нет `value` и `onChange`

```ts
// FilePicker.types.ts
export interface FilePickerProps extends Omit<..., 'value' | 'defaultValue' | 'onChange'> {
  defaultValue?: FileItem[];
  // value и onChange полностью отсутствуют
}
```

Список файлов хранится во внутреннем состоянии. Потребитель не может:
- передать текущий список файлов извне (управляемый режим)
- получать уведомления при изменении списка (например, для валидации формы)

Это фундаментальное ограничение для любого form-компонента.

### `ref` не принимается и не пробрасывается

`FilePicker` не принимает `ref` в пропсах. По требованиям проекта каждый компонент обязан пробрасывать `ref` на корневой DOM-элемент.

### `fileList.map?.()` — ненужная опциональная цепочка

```tsx
{fileList.map?.((item) => { ... })}
```

`fileList` инициализируется как `[]` и всегда является массивом — `Array.prototype.map` никогда не будет `undefined`. Опциональная цепочка скрывает потенциальные ошибки типизации и вводит в заблуждение.

### `onChangeFileInput` — async-функция не обёрнута в `useCallback`

```ts
const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => { ... };
```

Пересоздаётся при каждом рендере. Хотя в данном случае это передаётся только на `<input>` и не является критической проблемой, следует обернуть в `useCallback` для единообразия с остальными обработчиками.

---

## inner/File.tsx

### `uploadFile` — stale closure, `file` отсутствует в deps

```ts
const uploadFile = useCallback(async (context: FilePickerUploadContext) => {
  if (file) {   // ← file из замыкания
    ...
  }
}, []);   // ← пустой массив deps
```

`file` используется внутри, но не указан в зависимостях. Если `file` изменится (пересоздастся объект `File`), `uploadFile` будет использовать устаревшую ссылку.

### `XMLHttpRequest` — браузерный API, SSR-небезопасен

```ts
const uploadFile = useCallback(async (context) => {
  const request = new XMLHttpRequest();
  ...
}, []);
```

`XMLHttpRequest` доступен только в браузере. При SSR-рендере компонент зависнет или выдаст ошибку. Нужно добавить комментарий `// SSR: requires client` или заменить на `fetch`.

### `method = 'GET'` по умолчанию — неверное дефолтное значение для загрузки файлов

```ts
const { method = 'GET', ... } = useFilePickerContext();
```

HTTP-загрузка файлов выполняется методом `POST` (или `PUT`). `GET` с телом запроса нарушает HTTP-спецификацию и большинство серверов его отклонят. Дефолт должен быть `'POST'`.

### `ProgressEvent<any>` — избегаемый `any`

```ts
request.onload = (e: ProgressEvent<any>) => { ... };
```

Тип события можно уточнить: `ProgressEvent<XMLHttpRequestEventTarget>` или просто воспользоваться инференцией через `request.onload = function() { ... }` и `this.status`.

---

## FilePicker.utils.ts

### `deleteFileRequest` не проверяет статус ответа

```ts
export async function deleteFileRequest(context: FilePickerRemoveContext) {
  await fetch(context.url, {
    method: 'DELETE',
    body: JSON.stringify({ ... }),
  });
  // статус ответа не проверяется
}
```

Если сервер вернёт 404 или 500, функция завершится успешно без ошибки. Вызывающий код (`onRemoveClick`, `onChangeFileInput`) решит, что удаление прошло успешно, и уберёт файл из UI. Нужно проверять `response.ok` и бросать ошибку при неуспешном статусе.

---

## FilePicker.types.ts

### `FileItem.id` опциональный — но используется как обязательный внутри компонента

```ts
export type FileItem = AnyObject & Partial<{
  id: string;         // ← Partial делает id необязательным
  filename: string;
  file: File;
}>;
```

Компонент генерирует `id` через `GlobalUtils.uuid()` при добавлении файла, и использует `id` для удаления (`old.filter(file => file.id !== item.id)`). Если потребитель передаёт `defaultValue` без `id`, фильтрация по `id` вернёт пустой массив вместо удаления нужного файла. Лучше разделить внешний тип и внутренний (`FileItem` как входной, `InternalFileItem` с обязательным `id` для состояния).

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `FilePicker.tsx:92` | `name: String(url)` — опечатка, должно быть `String(name)` |
| 🔴 Критический | `FilePicker.tsx:88–101` | Async побочный эффект внутри `setFileList` updater — двойной запрос в StrictMode |
| 🟠 Высокий | `FilePicker.tsx` | Только uncontrolled-режим — нет `value`/`onChange` для управляемого использования |
| 🟠 Высокий | `inner/File.tsx:92–124` | `uploadFile` — пустые `[]` deps, `file` не включён — stale closure |
| 🟠 Высокий | `inner/File.tsx:94` | `XMLHttpRequest` — SSR-небезопасен, не задокументирован |
| 🟠 Высокий | `FilePicker.utils.ts:3–11` | `deleteFileRequest` игнорирует HTTP-статус ответа — ошибки сервера маскируются |
| 🟡 Средний | `FilePicker.tsx` | `ref` не принимается и не пробрасывается |
| 🟡 Средний | `inner/File.tsx:27` | `method = 'GET'` по умолчанию — неверный HTTP-метод для загрузки файлов |
| 🟡 Средний | `FilePicker.types.ts:3–8` | `FileItem.id` опциональный, но обязательно используется в логике удаления |
| 🟢 Низкий | `FilePicker.tsx:147` | `fileList.map?.()` — ненужная опциональная цепочка на гарантированном массиве |
| 🟢 Низкий | `FilePicker.tsx:71` | `onChangeFileInput` не обёрнут в `useCallback` |
| 🟢 Низкий | `inner/File.tsx:110` | `ProgressEvent<any>` — можно уточнить тип |
