# Аудит ошибок типизации — `core`

Дата: 2026-10-15. Команда: `tsc --noEmit -p tsconfig.json` (строгий режим, `noUnusedLocals`, `noUnusedParameters`) плюс отдельный прогон с теми же настройками по файлам, которые в `tsconfig.json` не входят: `vitest/`, `vite.config.ts`.

> **Статус (2026-10-16): все ошибки исправлены.** `tsc -p tsconfig.json` и `tsc -p tsconfig.node.json` — 0 ошибок, Vitest — 65 файлов / 410 тестов зелёные. Ниже — исходный список на момент аудита.

**Всего ошибок: 202.**

## Сводка

| Категория | Ошибок | Простых (1) | Средних (2) | Сложных (3) |
|---|---|---|---|---|
| Критические ошибки | 7 | 4 | 3 | 0 |
| Некритические ошибки (код библиотеки) | 8 | 5 | 3 | 0 |
| Ошибки в дополнительных файлах | 187 | 58 | 71 | 58 |
| **Итого** | **202** | 67 | 77 | 58 |

## Критерии

- **Критическая** — ошибка в публичном коде библиотеки (`src/**`, кроме stories), которая ломает сборку (в том числе на Linux) или делает невалидными публичные типы в `.d.ts`, которые получает клиент.
- **Некритическая** — ошибка внутри реализации библиотеки: в `.d.ts` не попадает и клиента не затрагивает, но `tsc` не проходит.
- **В доп. файлах** — тесты (`vitest/`), stories (`*.stories.tsx`, `stories/`), `src/global/storybook`, конфиги сборки. В бандл не попадают.
- **Сложность**: 1 — механическая правка в 1–2 строки; 2 — нужно разобраться в типах/API, правка в нескольких местах или переписывание теста; 3 — требует переписать файл целиком или принять решение по API.

## Примечания

- `npm run build` (Vite) не запускался. `vite-plugin-dts` по умолчанию не прерывает сборку на ошибках типов, поэтому «критичность» оценена по влиянию на `.d.ts` и на сборку в case-sensitive среде.
- ESLint не запускался — только `tsc`.
- Cypress-тесты удалены (2026-10-16), их ошибки из отчёта исключены.
- Ошибки `import.meta.env` при прогоне вспомогательного конфига — артефакт (не подхватился `src/vite-env.d.ts`), в основной конфигурации их нет, в список не включены.
- Тест-файлы `vitest/` не входят в `tsconfig.json` (`include: ["src"]`), поэтому `tsc` их никогда не проверял — отсюда накопившиеся ~190 ошибок.

## Группы причин

| Группа | Категория | Сложность | Ошибок | Причина | Как исправить |
|---|---|---|---|---|---|
| G1 | A+C | 1 | 7 | **Регистр имён `textArea` / `Textarea`.** В git папка `textarea/`, файлы `Textarea.tsx`, `Textarea.types.ts`, `Textarea.stories.tsx`, а импорты ссылаются на `textArea/`, `TextArea.tsx`, `TextArea.types.ts`. На macOS (регистронезависимая ФС) это работает, на Linux (CI, Docker) сборка упадёт с «module not found». Затрагивает также `src/components/index.ts:63` (`./textArea`) и `Form.stories.tsx:11`, которые tsc не репортит, но они из той же группы. | Переименовать в git (`git mv`) файлы и пути к единому регистру и поправить все импорты. |
| G2 | A | 2 | 1 | **`AutocompleteInputProps.onSelect` конфликтует с `TextInputProps.onSelect`.** Интерфейс наследует `TextInputProps` (нативный `onSelect: ReactEventHandler`), но переопределяет `onSelect` другой сигнатурой. Публичный тип невалиден — клиенты без `skipLibCheck` получат ошибку в `.d.ts`. | `extends Omit<TextInputProps, 'onSelect'>`. |
| G3 | A | 2 | 2 | **`DropdownProps.children` несовместим с `PopoverProps.children`.** `Popover.children` — `RenderFunction<ReactElement, …>`, `Dropdown` переопределяет на `RenderFunction<ReactNode, …>`. Расширение типа аргумента не проходит проверку наследования, плюс то же несоответствие в `<Popover>` внутри `Dropdown.tsx`. | Привести `children` к `ReactElement` в `DropdownProps` либо `Omit<PopoverProps, 'children'>` и согласовать тип с `Popover`. |
| G4 | A | 1 | 1 | **`FilePickerProps.defaultValue` конфликтует с `HTMLAttributes`.** Интерфейс наследует `HTMLAttributes<HTMLDivElement>` (`defaultValue: string \| number \| string[]`), а объявляет `FileItem[]`. Публичный тип невалиден. | Добавить `'defaultValue'` в `Omit<…, 'onChange'>`. |
| G9 | B | 1 | 1 | **Неиспользуемый импорт.** `useReducedMotionConfig` импортирован, но не используется (`noUnusedLocals`). | Удалить импорт. |
| G10 | B | 1 | 1 | **CSS-переменная в `style`.** `'--toolbar-inset'` не входит в `CSSProperties`. | Привести: `{ '--toolbar-inset': '8px' } as CSSProperties` (или общий тип для CSS-переменных). |
| G11 | B | 2 | 1 | **`NumericFormat` получает `defaultValue` от `HTMLAttributes`.** `restProps` содержит `defaultValue: string \| number \| readonly string[]`, а `NumericFormat` принимает `string \| number \| null`. | Вычистить/сузить `defaultValue` из `restProps` перед передачей. |
| G12 | B | 2 | 2 | **`motion.div` получает HTML-пропсы.** `restProps` типизированы как `HTMLAttributes<HTMLDivElement>`, а `motion.div` ожидает `HTMLMotionProps<'div'>` — конфликт `onDrag*`, `onAnimationStart` и др. | Типизировать пропсы через `HTMLMotionProps<'div'>` либо исключить конфликтующие обработчики. |
| G13 | B | 1 | 3 | **`element.props` имеет тип `unknown`.** После `isValidElement(element)` без дженерика `props` — `unknown` (React 19 types). | `isValidElement<{ children?: ReactNode }>(element)`. |
| G7 | C | 2 | 2 | **`onSelect` отсутствует в `AutocompleteRenderSuggestionContext`.** Истории деструктурируют `onSelect` из контекста `renderSuggestion`, но `AutocompleteInput.tsx:160` передаёт только `{ inputValue, suggestion }`. Это не только тип — в рантайме `onSelect` будет `undefined`. | Либо добавить `onSelect` в контекст и передавать его, либо убрать из историй. |
| G8 | C | 1 | 1 | **`customLabels.path` не существует в `Partial<Localization>`.** Декоратор Storybook передаёт ключ, которого нет в словаре локализации. Файл исключён из `tsconfig`, но подтягивается через импорт. | Удалить заглушку или добавить ключ в тип. |
| G13b | C | 1 | 4 | **`unknown` в тесте утилиты Children.** `(layout as ReactElement).props` — `unknown` (React 19 types). | `as ReactElement<{ children?: ReactNode }>`. |
| G14 | C | 2 | 15 | **Удалённая `config`/`Configuration`.** Тесты используют `Configuration` и проп `config` у `Application`, удалённые как dead code (см. `configuration.md`). | Удалить кейсы `check that X configuration works` либо переписать на `className`/`style`. |
| G15 | C | 1 | 39 | **Неиспользуемый импорт `React`/прочего.** `noUnusedLocals` + `jsx: react-jsx` — `import React` не нужен. | Удалить импорты (автофикс ESLint/IDE). |
| G16 | C | 2 | 5 | **Тест/импорт удалённого компонента.** `Icon`, `Empty`, `List` больше не экспортируются из библиотеки. | Удалить тест либо перенести на актуальный компонент. |
| G17 | C | 1 | 4 | **`vi` не определён глобально.** `vite.config.ts` включает `globals: true`, но в `tsconfig.json` `types` нет `vitest/globals`. | Добавить `vitest/globals` в `types` либо `import { vi } from 'vitest'`. |
| G18 | C | 3 | 58 | **`Text.*` подкомпоненты удалены.** В `vitest/text.test.tsx` используются `Text.Section/ScreenName/Heading/Paragraph/Inline/List/ListItem/Link/Code/Keyboard`, которых в `Text` больше нет. Весь файл тестирует прежний API. | Переписать тесты под текущий `Text` (пропсы `code`, `kbd`, …). |
| G20 | C | 1 | 1 | **`test.resolve` не существует в `InlineConfig`.** Ключ `resolve` внутри `test` не поддерживается типами установленной версии vitest, алиасы в тестах могут не применяться. | Перенести алиасы в верхний `resolve` (уже настроен `tsconfigPaths`). |
| G23 | C | 2 | 15 | **`renderFunc` удалён.** Заменён на `asChild`. Из-за этого параметры колбэка стали `implicit any`. | Переписать на `asChild`. |
| G24 | C | 2 | 3 | **`tagName` у Flex/Grid удалён.** Проп убран из API. | Использовать `asChild` или удалить кейс. |
| G25 | C | 2 | 3 | **`leftIcon`/`rightIcon` у Button удалены.** Пропсы переименованы/удалены. | Использовать `icon`. |
| G26 | C | 1 | 5 | **`label` обязателен в `ButtonProps`.** Тесты рендерят `<Button />` без `label`. | Передать `label`. |
| G27 | C | 2 | 6 | **`ToolbarVariant` — значения `floating`/`glass` удалены.** Тесты используют устаревшие варианты. | Использовать актуальные варианты: `plain` / `grouped` / `solid`. |
| G28 | C | 2 | 17 | **`Popover.content`/`children` типизированы как render-функции.** Тесты передают строку/`null`/несколько детей. | Передавать функцию/единственный элемент. |
| G29 | C | 2 | 5 | **Прочие несоответствия типов в тестах.** `columns` в `dataTable.test` (`type: 'select'` → `never`), `.name` на `object`, `ReactElement<unknown>` в breadcrumbs и `ColorPicker.cy` (`string \| undefined`). | Разбирать по месту: типы `columns`/данных и приведение типов. |

## 1. Критические ошибки (7)

| # | Файл | Код | Сложность | Группа | Сообщение |
|---|---|---|---|---|---|
| A1 | `src/components/autocompleteInput/AutocompleteInput.types.ts:17:18` | TS2430 | 2 | G2 | Interface 'AutocompleteInputProps<T>' incorrectly extends interface 'TextInputProps'. |
| A2 | `src/components/dialog/DialogProvider.tsx:12:26` | TS1261 | 1 | G1 | Already included file name 'src/components/textArea/index.ts' differs from file name 'src/components/textarea/index.ts' only in casing. |
| A3 | `src/components/dropdown/Dropdown.tsx:58:7` | TS2322 | 2 | G3 | Type 'RenderFunction<ReactNode, PopoverChildrenContext>' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverC… |
| A4 | `src/components/dropdown/Dropdown.types.ts:90:18` | TS2430 | 2 | G3 | Interface 'DropdownProps' incorrectly extends interface 'PopoverProps'. |
| A5 | `src/components/filePicker/FilePicker.types.ts:43:18` | TS2430 | 1 | G4 | Interface 'FilePickerProps' incorrectly extends interface 'Omit<HTMLAttributes<HTMLDivElement>, "onChange">'. |
| A6 | `src/components/textArea/TextArea.tsx:1:31` | TS1261 | 1 | G1 | Already included file name 'src/components/textArea/TextArea.types.ts' differs from file name 'src/components/textarea/Textarea.types.ts' only in casing. |
| A7 | `src/components/textArea/index.ts:1:26` | TS1261 | 1 | G1 | Already included file name 'src/components/textArea/TextArea.tsx' differs from file name 'src/components/textarea/Textarea.tsx' only in casing. |

## 2. Некритические ошибки (код библиотеки) (8)

| # | Файл | Код | Сложность | Группа | Сообщение |
|---|---|---|---|---|---|
| B1 | `src/components/button/Button.tsx:5:35` | TS6133 | 1 | G9 | 'useReducedMotionConfig' is declared but its value is never read. |
| B2 | `src/components/dataTable/inner/Header.tsx:61:41` | TS2353 | 1 | G10 | Object literal may only specify known properties, and ''--toolbar-inset'' does not exist in type 'Properties<string \| number, string & {}>'. |
| B3 | `src/components/numberInput/NumberInput.tsx:101:8` | TS2322 | 2 | G11 | Type '{ color?: string \| undefined; defaultChecked?: boolean \| undefined; defaultValue?: string \| number \| readonly string[] \| undefined; suppressContentEditableWarnin… |
| B4 | `src/components/toolbar/components/Group.tsx:40:8` | TS2322 | 2 | G12 | Type '{ children: ReactNode; defaultChecked?: boolean \| undefined; defaultValue?: string \| number \| readonly string[] \| undefined; suppressContentEditableWarning?: boo… |
| B5 | `src/components/toolbar/components/Title.tsx:28:8` | TS2322 | 2 | G12 | Type '{ children: (false \| Element \| ReactElement<{ className?: string \| undefined; 'aria-hidden'?: boolean \| undefined; }, string \| JSXElementConstructor<any>>)[]; ..… |
| B6 | `src/utils/Children.ts:46:25` | TS18046 | 1 | G13 | 'element.props' is of type 'unknown'. |
| B7 | `src/utils/Children.ts:49:37` | TS18046 | 1 | G13 | 'element.props' is of type 'unknown'. |
| B8 | `src/utils/DOMUtils.ts:78:22` | TS18046 | 1 | G13 | 'element.props' is of type 'unknown'. |

## 3. Ошибки в дополнительных файлах (187)

| # | Файл | Код | Сложность | Группа | Сообщение |
|---|---|---|---|---|---|
| C1 | `src/components/search/stories/DocsSearch.tsx:42:3` | TS2339 | 2 | G7 | Property 'onSelect' does not exist on type 'AutocompleteRenderSuggestionContext<Doc>'. |
| C2 | `src/components/search/stories/GlobalSearch.tsx:53:3` | TS2339 | 2 | G7 | Property 'onSelect' does not exist on type 'AutocompleteRenderSuggestionContext<Hit>'. |
| C3 | `src/components/textarea/stories/Announcement.tsx:3:26` | TS1149 | 1 | G1 | File name 'src/components/textarea/TextArea.tsx' differs from already included file name 'src/components/textArea/TextArea.tsx' only in casing. |
| C4 | `src/components/textarea/stories/CommentComposer.tsx:3:26` | TS1149 | 1 | G1 | File name 'src/components/textarea/TextArea.tsx' differs from already included file name 'src/components/textArea/TextArea.tsx' only in casing. |
| C5 | `src/components/textarea/stories/ProfileBio.tsx:3:26` | TS1149 | 1 | G1 | File name 'src/components/textarea/TextArea.tsx' differs from already included file name 'src/components/textArea/TextArea.tsx' only in casing. |
| C6 | `src/components/textarea/stories/SnippetEditor.tsx:3:26` | TS1149 | 1 | G1 | File name 'src/components/textarea/TextArea.tsx' differs from already included file name 'src/components/textArea/TextArea.tsx' only in casing. |
| C7 | `src/global/storybook/StorybookDecorator.tsx:46:9` | TS2353 | 1 | G8 | Object literal may only specify known properties, and 'path' does not exist in type 'Partial<Localization>'. |
| C8 | `vite.config.ts:80:5` | TS2769 | 1 | G20 | No overload matches this call. |
| C9 | `vitest/application.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C10 | `vitest/autocompleteInput.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C11 | `vitest/autocompleteInput.test.tsx:7:3` | TS2305 | 2 | G14 | Module '"../src"' has no exported member 'Configuration'. |
| C12 | `vitest/avatar.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C13 | `vitest/bottomNavigation.test.tsx:109:11` | TS2322 | 2 | G23 | Type '{ label: string; icon: Element; renderFunc: (ref: any, props: any) => Element; }' is not assignable to type 'IntrinsicAttributes & BottomNavigationLinkProps'. |
| C14 | `vitest/bottomNavigation.test.tsx:109:24` | TS7006 | 2 | G23 | Parameter 'ref' implicitly has an 'any' type. |
| C15 | `vitest/bottomNavigation.test.tsx:109:29` | TS7006 | 2 | G23 | Parameter 'props' implicitly has an 'any' type. |
| C16 | `vitest/breadcrumbs.test.tsx:70:11` | TS2322 | 2 | G29 | Type 'ReactElement<unknown, string \| JSXElementConstructor<any>>' is not assignable to type 'ReactElement<AnyObject, string \| JSXElementConstructor<any>>'. |
| C17 | `vitest/button.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C18 | `vitest/button.test.tsx:4:31` | TS2305 | 2 | G16 | Module '"../src"' has no exported member 'Icon'. |
| C19 | `vitest/button.test.tsx:10:17` | TS2322 | 2 | G25 | Type '{ leftIcon: Element; "data-testid": string; }' is not assignable to type 'IntrinsicAttributes & ButtonProps'. |
| C20 | `vitest/button.test.tsx:22:11` | TS2322 | 2 | G25 | Type '{ leftIcon: Element; rightIcon: Element; label: string; "data-testid": string; }' is not assignable to type 'IntrinsicAttributes & ButtonProps'. |
| C21 | `vitest/button.test.tsx:45:11` | TS2322 | 2 | G25 | Type '{ leftIcon: Element; "data-testid": string; onClick: Mock<any, any>; }' is not assignable to type 'IntrinsicAttributes & ButtonProps'. |
| C22 | `vitest/button.test.tsx:58:8` | TS2741 | 1 | G26 | Property 'label' is missing in type '{ "data-testid": string; className: string; style: { color: "rgb(0, 0, 255)"; }; }' but required in type 'ButtonProps'. |
| C23 | `vitest/button.test.tsx:73:9` | TS2322 | 2 | G14 | Type '{ children: Element; config: { button: { className: string; style: { color: string; }; }; }; }' is not assignable to type 'IntrinsicAttributes & ApplicationProps'. |
| C24 | `vitest/button.test.tsx:77:10` | TS2741 | 1 | G26 | Property 'label' is missing in type '{ "data-testid": string; }' but required in type 'ButtonProps'. |
| C25 | `vitest/checkbox.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C26 | `vitest/closeButton.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C27 | `vitest/closeButton.test.tsx:46:9` | TS2322 | 2 | G14 | Type '{ children: Element; config: { closeButton: { className: string; style: { color: string; }; }; }; }' is not assignable to type 'IntrinsicAttributes & Application… |
| C28 | `vitest/colorPicker.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C29 | `vitest/colorPicker.test.tsx:2:34` | TS6133 | 1 | G15 | 'vitest' is declared but its value is never read. |
| C30 | `vitest/colorPicker.test.tsx:6:3` | TS6133 | 1 | G15 | 'Button' is declared but its value is never read. |
| C31 | `vitest/colorPicker.test.tsx:8:3` | TS2305 | 2 | G14 | Module '"../src/components"' has no exported member 'Configuration'. |
| C32 | `vitest/colorPicker.test.tsx:9:3` | TS6133 | 1 | G15 | 'Dropdown' is declared but its value is never read. |
| C33 | `vitest/colorPicker.test.tsx:87:9` | TS2322 | 2 | G23 | Type '{ "data-testid": string; value: string; onChange: Mock<any, any>; renderFunc: ({ value, opened }: { value: any; opened: any; }) => Element; }' is not assignable … |
| C34 | `vitest/colorPicker.test.tsx:87:24` | TS7031 | 2 | G23 | Binding element 'value' implicitly has an 'any' type. |
| C35 | `vitest/colorPicker.test.tsx:87:31` | TS7031 | 2 | G23 | Binding element 'opened' implicitly has an 'any' type. |
| C36 | `vitest/dataTable.test.tsx:31:18` | TS2322 | 2 | G14 | Type '{ children: Element; config: { locale: { locale: string; }; }; }' is not assignable to type 'IntrinsicAttributes & ApplicationProps'. |
| C37 | `vitest/dataTable.test.tsx:37:13` | TS2322 | 2 | G29 | Type 'string' is not assignable to type 'never'. |
| C38 | `vitest/dataTable.test.tsx:38:13` | TS2322 | 2 | G29 | Type 'string' is not assignable to type 'never'. |
| C39 | `vitest/dataTable.test.tsx:39:13` | TS2322 | 2 | G29 | Type 'string' is not assignable to type 'never'. |
| C40 | `vitest/dataTable.test.tsx:202:30` | TS2339 | 2 | G29 | Property 'name' does not exist on type 'object'. |
| C41 | `vitest/dataTable.test.tsx:222:20` | TS2322 | 2 | G14 | Type '{ children: Element; config: { locale: { locale: string; }; }; }' is not assignable to type 'IntrinsicAttributes & ApplicationProps'. |
| C42 | `vitest/dataTable.test.tsx:263:20` | TS2322 | 2 | G14 | Type '{ children: Element; config: { locale: { locale: string; }; }; }' is not assignable to type 'IntrinsicAttributes & ApplicationProps'. |
| C43 | `vitest/datePicker.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C44 | `vitest/datePicker.test.tsx:5:3` | TS2305 | 2 | G14 | Module '"../src/components"' has no exported member 'Configuration'. |
| C45 | `vitest/datePicker.test.tsx:144:11` | TS2322 | 2 | G23 | Type '{ value: Dayjs; onChange: Mock<any, any>; renderFunc: ({ displayValue }: { displayValue: any; }) => Element; }' is not assignable to type 'IntrinsicAttributes & … |
| C46 | `vitest/datePicker.test.tsx:144:26` | TS7031 | 2 | G23 | Binding element 'displayValue' implicitly has an 'any' type. |
| C47 | `vitest/divider.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C48 | `vitest/dropdown.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C49 | `vitest/dropdown.test.tsx:4:18` | TS2305 | 2 | G14 | Module '"../src/components"' has no exported member 'Configuration'. |
| C50 | `vitest/dropdown.test.tsx:158:12` | TS2741 | 1 | G26 | Property 'label' is missing in type '{}' but required in type 'ButtonProps'. |
| C51 | `vitest/empty.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C52 | `vitest/empty.test.tsx:4:10` | TS2305 | 2 | G16 | Module '"../src/components"' has no exported member 'Empty'. |
| C53 | `vitest/flex.test.tsx:18:13` | TS2322 | 2 | G24 | Type '{ children: Element; tagName: string; "data-testid": string; }' is not assignable to type 'IntrinsicAttributes & FlexProps'. |
| C54 | `vitest/form.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C55 | `vitest/form.test.tsx:177:22` | TS2304 | 1 | G17 | Cannot find name 'vi'. |
| C56 | `vitest/grid.test.tsx:76:13` | TS2322 | 2 | G24 | Type '{ children: Element; tagName: string; "data-testid": string; }' is not assignable to type 'IntrinsicAttributes & GridProps'. |
| C57 | `vitest/grid.test.tsx:77:22` | TS2322 | 2 | G24 | Type '{ tagName: string; "data-testid": string; }' is not assignable to type 'IntrinsicAttributes & GridColumnProps'. |
| C58 | `vitest/icon.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C59 | `vitest/icon.test.tsx:4:23` | TS2305 | 2 | G16 | Module '"../src"' has no exported member 'Icon'. |
| C60 | `vitest/icon.test.tsx:37:9` | TS2322 | 2 | G14 | Type '{ children: Element; config: { icon: { className: string; style: { color: string; }; }; }; }' is not assignable to type 'IntrinsicAttributes & ApplicationProps'. |
| C61 | `vitest/label.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C62 | `vitest/list.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C63 | `vitest/list.test.tsx:4:23` | TS2305 | 2 | G14 | Module '"../src/components"' has no exported member 'Configuration'. |
| C64 | `vitest/list.test.tsx:4:38` | TS2305 | 2 | G16 | Module '"../src/components"' has no exported member 'List'. |
| C65 | `vitest/list.test.tsx:19:24` | TS7031 | 2 | G23 | Binding element 'item' implicitly has an 'any' type. |
| C66 | `vitest/list.test.tsx:19:30` | TS7031 | 2 | G23 | Binding element 'currentIndex' implicitly has an 'any' type. |
| C67 | `vitest/list.test.tsx:34:24` | TS7031 | 2 | G23 | Binding element 'item' implicitly has an 'any' type. |
| C68 | `vitest/list.test.tsx:34:30` | TS7031 | 2 | G23 | Binding element 'currentIndex' implicitly has an 'any' type. |
| C69 | `vitest/list.test.tsx:37:22` | TS7031 | 2 | G23 | Binding element 'currentIndex' implicitly has an 'any' type. |
| C70 | `vitest/list.test.tsx:50:24` | TS7031 | 2 | G23 | Binding element 'item' implicitly has an 'any' type. |
| C71 | `vitest/list.test.tsx:50:30` | TS7031 | 2 | G23 | Binding element 'currentIndex' implicitly has an 'any' type. |
| C72 | `vitest/loading.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C73 | `vitest/modal.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C74 | `vitest/navigationList.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C75 | `vitest/numberInput.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C76 | `vitest/override.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C77 | `vitest/pagination.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C78 | `vitest/passwordInput.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C79 | `vitest/passwordInput.test.tsx:6:3` | TS2305 | 2 | G14 | Module '"../src"' has no exported member 'Configuration'. |
| C80 | `vitest/popover.test.tsx:54:11` | TS2322 | 2 | G28 | Type 'string' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C81 | `vitest/popover.test.tsx:85:18` | TS2741 | 1 | G26 | Property 'label' is missing in type '{ "data-testid": string; tabIndex: number; }' but required in type 'ButtonProps'. |
| C82 | `vitest/popover.test.tsx:91:18` | TS2322 | 2 | G28 | Type 'string' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C83 | `vitest/popover.test.tsx:92:12` | TS2741 | 1 | G26 | Property 'label' is missing in type '{ "data-testid": string; }' but required in type 'ButtonProps'. |
| C84 | `vitest/popover.test.tsx:111:18` | TS2322 | 2 | G28 | Type 'string' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C85 | `vitest/popover.test.tsx:125:35` | TS2322 | 2 | G28 | Type 'string' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C86 | `vitest/popover.test.tsx:145:44` | TS2322 | 2 | G28 | Type 'string' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C87 | `vitest/popover.test.tsx:208:53` | TS2322 | 2 | G28 | Type 'string' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C88 | `vitest/popover.test.tsx:237:11` | TS2322 | 2 | G28 | Type 'string' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C89 | `vitest/radio.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C90 | `vitest/screen.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C91 | `vitest/search.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C92 | `vitest/search.test.tsx:4:23` | TS2305 | 2 | G14 | Module '"../src"' has no exported member 'Configuration'. |
| C93 | `vitest/search.test.tsx:37:5` | TS2304 | 1 | G17 | Cannot find name 'vi'. |
| C94 | `vitest/search.test.tsx:50:13` | TS2304 | 1 | G17 | Cannot find name 'vi'. |
| C95 | `vitest/search.test.tsx:57:5` | TS2304 | 1 | G17 | Cannot find name 'vi'. |
| C96 | `vitest/sideNavigation.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C97 | `vitest/skeleton.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C98 | `vitest/slider.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C99 | `vitest/switch.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C100 | `vitest/tabs.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C101 | `vitest/text.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C102 | `vitest/text.test.tsx:21:13` | TS2339 | 3 | G18 | Property 'Section' does not exist on type 'MemoExoticComponent<…>'. |
| C103 | `vitest/text.test.tsx:23:14` | TS2339 | 3 | G18 | Property 'Section' does not exist on type 'MemoExoticComponent<…>'. |
| C104 | `vitest/text.test.tsx:33:13` | TS2339 | 3 | G18 | Property 'ScreenName' does not exist on type 'MemoExoticComponent<…>'. |
| C105 | `vitest/text.test.tsx:35:14` | TS2339 | 3 | G18 | Property 'ScreenName' does not exist on type 'MemoExoticComponent<…>'. |
| C106 | `vitest/text.test.tsx:46:13` | TS2339 | 3 | G18 | Property 'ScreenName' does not exist on type 'MemoExoticComponent<…>'. |
| C107 | `vitest/text.test.tsx:48:14` | TS2339 | 3 | G18 | Property 'ScreenName' does not exist on type 'MemoExoticComponent<…>'. |
| C108 | `vitest/text.test.tsx:60:15` | TS2339 | 3 | G18 | Property 'Heading' does not exist on type 'MemoExoticComponent<…>'. |
| C109 | `vitest/text.test.tsx:62:16` | TS2339 | 3 | G18 | Property 'Heading' does not exist on type 'MemoExoticComponent<…>'. |
| C110 | `vitest/text.test.tsx:63:15` | TS2339 | 3 | G18 | Property 'Heading' does not exist on type 'MemoExoticComponent<…>'. |
| C111 | `vitest/text.test.tsx:65:16` | TS2339 | 3 | G18 | Property 'Heading' does not exist on type 'MemoExoticComponent<…>'. |
| C112 | `vitest/text.test.tsx:81:15` | TS2339 | 3 | G18 | Property 'Paragraph' does not exist on type 'MemoExoticComponent<…>'. |
| C113 | `vitest/text.test.tsx:83:16` | TS2339 | 3 | G18 | Property 'Paragraph' does not exist on type 'MemoExoticComponent<…>'. |
| C114 | `vitest/text.test.tsx:96:15` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C115 | `vitest/text.test.tsx:98:16` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C116 | `vitest/text.test.tsx:99:15` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C117 | `vitest/text.test.tsx:99:50` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C118 | `vitest/text.test.tsx:100:15` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C119 | `vitest/text.test.tsx:100:57` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C120 | `vitest/text.test.tsx:101:15` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C121 | `vitest/text.test.tsx:101:52` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C122 | `vitest/text.test.tsx:102:15` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C123 | `vitest/text.test.tsx:102:60` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C124 | `vitest/text.test.tsx:127:15` | TS2339 | 3 | G18 | Property 'Code' does not exist on type 'MemoExoticComponent<…>'. |
| C125 | `vitest/text.test.tsx:129:16` | TS2339 | 3 | G18 | Property 'Code' does not exist on type 'MemoExoticComponent<…>'. |
| C126 | `vitest/text.test.tsx:142:15` | TS2339 | 3 | G18 | Property 'Keyboard' does not exist on type 'MemoExoticComponent<…>'. |
| C127 | `vitest/text.test.tsx:144:16` | TS2339 | 3 | G18 | Property 'Keyboard' does not exist on type 'MemoExoticComponent<…>'. |
| C128 | `vitest/text.test.tsx:157:15` | TS2339 | 3 | G18 | Property 'List' does not exist on type 'MemoExoticComponent<…>'. |
| C129 | `vitest/text.test.tsx:163:17` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C130 | `vitest/text.test.tsx:169:18` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C131 | `vitest/text.test.tsx:170:17` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C132 | `vitest/text.test.tsx:170:39` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C133 | `vitest/text.test.tsx:171:16` | TS2339 | 3 | G18 | Property 'List' does not exist on type 'MemoExoticComponent<…>'. |
| C134 | `vitest/text.test.tsx:172:15` | TS2339 | 3 | G18 | Property 'List' does not exist on type 'MemoExoticComponent<…>'. |
| C135 | `vitest/text.test.tsx:173:17` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C136 | `vitest/text.test.tsx:173:39` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C137 | `vitest/text.test.tsx:174:17` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C138 | `vitest/text.test.tsx:174:39` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C139 | `vitest/text.test.tsx:175:16` | TS2339 | 3 | G18 | Property 'List' does not exist on type 'MemoExoticComponent<…>'. |
| C140 | `vitest/text.test.tsx:196:9` | TS2322 | 2 | G14 | Type '{ children: Element; config: { text: { section: { className: string; style: { color: string; }; }; screenName: { className: string; style: { color: string; }; };… |
| C141 | `vitest/text.test.tsx:215:17` | TS2339 | 3 | G18 | Property 'ScreenName' does not exist on type 'MemoExoticComponent<…>'. |
| C142 | `vitest/text.test.tsx:215:67` | TS2339 | 3 | G18 | Property 'ScreenName' does not exist on type 'MemoExoticComponent<…>'. |
| C143 | `vitest/text.test.tsx:216:17` | TS2339 | 3 | G18 | Property 'Section' does not exist on type 'MemoExoticComponent<…>'. |
| C144 | `vitest/text.test.tsx:216:61` | TS2339 | 3 | G18 | Property 'Section' does not exist on type 'MemoExoticComponent<…>'. |
| C145 | `vitest/text.test.tsx:217:17` | TS2339 | 3 | G18 | Property 'Heading' does not exist on type 'MemoExoticComponent<…>'. |
| C146 | `vitest/text.test.tsx:217:61` | TS2339 | 3 | G18 | Property 'Heading' does not exist on type 'MemoExoticComponent<…>'. |
| C147 | `vitest/text.test.tsx:218:17` | TS2339 | 3 | G18 | Property 'Paragraph' does not exist on type 'MemoExoticComponent<…>'. |
| C148 | `vitest/text.test.tsx:218:65` | TS2339 | 3 | G18 | Property 'Paragraph' does not exist on type 'MemoExoticComponent<…>'. |
| C149 | `vitest/text.test.tsx:219:17` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C150 | `vitest/text.test.tsx:219:59` | TS2339 | 3 | G18 | Property 'Inline' does not exist on type 'MemoExoticComponent<…>'. |
| C151 | `vitest/text.test.tsx:220:17` | TS2339 | 3 | G18 | Property 'List' does not exist on type 'MemoExoticComponent<…>'. |
| C152 | `vitest/text.test.tsx:220:55` | TS2339 | 3 | G18 | Property 'List' does not exist on type 'MemoExoticComponent<…>'. |
| C153 | `vitest/text.test.tsx:221:17` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C154 | `vitest/text.test.tsx:221:63` | TS2339 | 3 | G18 | Property 'ListItem' does not exist on type 'MemoExoticComponent<…>'. |
| C155 | `vitest/text.test.tsx:222:17` | TS2339 | 3 | G18 | Property 'Link' does not exist on type 'MemoExoticComponent<…>'. |
| C156 | `vitest/text.test.tsx:222:55` | TS2339 | 3 | G18 | Property 'Link' does not exist on type 'MemoExoticComponent<…>'. |
| C157 | `vitest/text.test.tsx:223:17` | TS2339 | 3 | G18 | Property 'Code' does not exist on type 'MemoExoticComponent<…>'. |
| C158 | `vitest/text.test.tsx:223:55` | TS2339 | 3 | G18 | Property 'Code' does not exist on type 'MemoExoticComponent<…>'. |
| C159 | `vitest/text.test.tsx:224:17` | TS2339 | 3 | G18 | Property 'Keyboard' does not exist on type 'MemoExoticComponent<…>'. |
| C160 | `vitest/text.test.tsx:224:63` | TS2339 | 3 | G18 | Property 'Keyboard' does not exist on type 'MemoExoticComponent<…>'. |
| C161 | `vitest/textInput.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C162 | `vitest/textarea.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C163 | `vitest/textarea.test.tsx:4:10` | TS2305 | 2 | G14 | Module '"../src/components"' has no exported member 'Configuration'. |
| C164 | `vitest/toolbar.test.tsx:1:1` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C165 | `vitest/toolbar.test.tsx:3:10` | TS6133 | 1 | G15 | 'fireEvent' is declared but its value is never read. |
| C166 | `vitest/toolbar.test.tsx:112:18` | TS2322 | 2 | G27 | Type '"floating"' is not assignable to type 'ToolbarVariant \| undefined'. |
| C167 | `vitest/toolbar.test.tsx:126:18` | TS2322 | 2 | G27 | Type '"glass"' is not assignable to type 'ToolbarVariant \| undefined'. |
| C168 | `vitest/toolbar.test.tsx:139:18` | TS2322 | 2 | G27 | Type '"glass"' is not assignable to type 'ToolbarVariant \| undefined'. |
| C169 | `vitest/toolbar.test.tsx:148:18` | TS2322 | 2 | G27 | Type '"floating"' is not assignable to type 'ToolbarVariant \| undefined'. |
| C170 | `vitest/toolbar.test.tsx:169:46` | TS2322 | 2 | G27 | Type '"glass"' is not assignable to type 'ToolbarVariant \| undefined'. |
| C171 | `vitest/toolbar.test.tsx:177:18` | TS2322 | 2 | G27 | Type '"glass"' is not assignable to type 'ToolbarVariant \| undefined'. |
| C172 | `vitest/tooltip.test.tsx:1:8` | TS6133 | 1 | G15 | 'React' is declared but its value is never read. |
| C173 | `vitest/utils/children.test.tsx:30:22` | TS2571 | 1 | G13b | Object is of type 'unknown'. |
| C174 | `vitest/utils/children.test.tsx:43:22` | TS2571 | 1 | G13b | Object is of type 'unknown'. |
| C175 | `vitest/utils/children.test.tsx:49:22` | TS2571 | 1 | G13b | Object is of type 'unknown'. |
| C176 | `vitest/utils/children.test.tsx:60:22` | TS2571 | 1 | G13b | Object is of type 'unknown'. |
| C177 | `vitest/utils/domUtils.test.tsx:6:3` | TS2305 | 2 | G16 | Module '"../../src"' has no exported member 'Icon'. |
| C178 | `vitest/utils/domUtils.test.tsx:54:18` | TS2322 | 2 | G28 | Type 'null' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C179 | `vitest/utils/domUtils.test.tsx:63:10` | TS2746 | 2 | G28 | This JSX tag's 'children' prop expects a single child of type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverChildrenContext>', but… |
| C180 | `vitest/utils/domUtils.test.tsx:63:18` | TS2322 | 2 | G28 | Type 'null' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C181 | `vitest/utils/domUtils.test.tsx:76:10` | TS2746 | 2 | G28 | This JSX tag's 'children' prop expects a single child of type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverChildrenContext>', but… |
| C182 | `vitest/utils/domUtils.test.tsx:76:18` | TS2322 | 2 | G28 | Type 'null' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C183 | `vitest/utils/domUtils.test.tsx:89:10` | TS2746 | 2 | G28 | This JSX tag's 'children' prop expects a single child of type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverChildrenContext>', but… |
| C184 | `vitest/utils/domUtils.test.tsx:89:18` | TS2322 | 2 | G28 | Type 'null' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C185 | `vitest/utils/domUtils.test.tsx:102:10` | TS2746 | 2 | G28 | This JSX tag's 'children' prop expects a single child of type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverChildrenContext>', but… |
| C186 | `vitest/utils/domUtils.test.tsx:102:18` | TS2322 | 2 | G28 | Type 'null' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
| C187 | `vitest/utils/domUtils.test.tsx:115:18` | TS2322 | 2 | G28 | Type 'null' is not assignable to type 'RenderFunction<ReactElement<unknown, string \| JSXElementConstructor<any>>, PopoverContentContext>'. |
