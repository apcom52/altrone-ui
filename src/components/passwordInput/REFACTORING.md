# Заметки по рефакторингу — components/passwordInput

---

## PasswordInput.tsx

### `forwardRef` — нарушение React 19 / CLAUDE.md

CLAUDE.md явно запрещает использование `forwardRef`. `PasswordInput` должен принимать `ref` как обычный проп и пробрасывать его в `TextInput`.

### `type` state не типизирован

```ts
// line 27
const [type, setType] = useState('password');
```

Тип стейта инферится как `string`, хотя допустимы только два значения. Должно быть:

```ts
const [type, setType] = useState<'password' | 'text'>('password');
```

Без явного типа TypeScript не предупредит, если кто-то присвоит произвольную строку.

### Нет `aria-pressed` на кнопке показа пароля

```tsx
<TextInput.ActionIsland
  label={type === 'password' ? t('passwordInput.showPassword') : t('passwordInput.hidePassword')}
  showLabel={false}
  onClick={() => setType(type === 'password' ? 'text' : 'password')}
  icon={type === 'password' ? <Eye /> : <EyeOff />}
/>
```

Кнопка переключает состояние (показать / скрыть), но не передаёт `aria-pressed`. Скринридер сообщит только `label`, но не текущее состояние. Нужно добавить `aria-pressed={type !== 'password'}`.

### Порядок приоритета конфига и пропса `showControls`

```ts
// line 19–25
const needToShowControl =
  !readOnly &&
  (typeof showControls === 'boolean'
    ? showControls
    : typeof passwordInputConfig.showControls === 'boolean'
    ? passwordInputConfig.showControls
    : true);
```

Пропс имеет наивысший приоритет, затем конфиг — это корректная логика. Но выражение вложено глубоко и трудночитаемо. При добавлении новых условий риск ошибки высок.

### Стили мержатся в неверном порядке

```ts
// line 32–35
const styles = {
  ...passwordInputConfig.style,  // конфиг первым
  ...style,                      // пользователь перекрывает ← корректно
};
```

Порядок здесь правильный, в отличие от `TextInput`. Но стоит обратить внимание: `className` мержится так же (`clsx(passwordInputConfig.className, className)`), что тоже верно.

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🔴 Критический | `PasswordInput.tsx` | `forwardRef` запрещён в React 19 / CLAUDE.md — принять `ref` как обычный проп |
| 🟠 Высокий | `PasswordInput.tsx:56` | Нет `aria-pressed` на кнопке — скринридер не знает текущее состояние |
| 🟡 Средний | `PasswordInput.tsx:27` | `type` стейт не типизирован — инферируется как `string` |
| 🟢 Низкий | `PasswordInput.tsx:19–25` | Логика `needToShowControl` трудночитаема, сложно поддерживать |
