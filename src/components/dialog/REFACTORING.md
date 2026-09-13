# Заметки по рефакторингу — components/dialog

Статус: **выполнено** (session 2026-09-07).

---

## dialog.ts — исправлено

| Было | Стало |
|---|---|
| Глобальный синглтон `openDialog` — несовместим с несколькими провайдерами и тестами | Стек `handlers[]`: `register` кладёт, `unregister(handler)` снимает по ссылке, диалог получает верхний в стеке. |
| `showAlert(options?)` / `showConfirm(options?)` — необязательный аргумент с required-полями внутри | `options` обязателен у всех трёх функций. |
| `options \|\| {}` / `params = options \|\| {}` при обязательном аргументе | Убрано. |
| Захардкоженный `placeholder: 'Input your value'` на уровне модуля | Плейсхолдер по умолчанию берётся в `DialogProvider` из локали (`dialog.promptPlaceholder`); модуль плейсхолдер не подставляет. |

## DialogProvider.tsx — исправлено

| Было | Стало |
|---|---|
| Все дефолтные строки (`OK` / `Confirm` / `Cancel`, заголовки) захардкожены на английском | `useLocalization()` + блок `dialog.*` во всех пяти словарях. |
| `inputValue: unknown` с приведениями по месту | `promptValue: string \| number \| null`. |
| `handleConfirm(result)` — один обработчик для alert/confirm/prompt, для prompt/alert параметр бессмысленен | `accept()` / `cancel()`, ветвятся по `dialog.type`. |
| `<div />` как фиктивный trigger для `Modal` | `Modal` теперь без `children` (у него `children` стал необязательным). |
| `.AlertContent { margin-bottom: -12px }` — хак под футер, которого у диалога нет | Удалён. |

## Также

- `DialogProvider` и типы опций реэкспортированы из `components/dialog`
  (раньше `DialogProvider` был доступен только через `AltroneApplication`).
- `vitest/dialog.test.tsx` — новый: путь «провайдер не смонтирован», резолв
  `showConfirm` по кнопке, `null` при отмене prompt, локализованные лейблы.

## Осталось открытым

- Открытие второго диалога, пока не зарезолвен первый, заменяет текущий, и
  промис первого не резолвится (лик). Не трогалось — нужно решение (очередь
  или реджект предыдущего).
