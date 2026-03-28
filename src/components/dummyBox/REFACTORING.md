# Заметки по рефакторингу — components/dummyBox

---

## DummyBox.tsx

### `memo` без типового параметра

```tsx
export const DummyBox = memo((props: DummyBoxProps) => { ... });
```

По соглашению проекта используется `memo<Props>(...)`. Без типового параметра TypeScript инферирует тип из аргументов, что работает, но менее явно и непоследовательно с остальными компонентами.

### `ref` не пробрасывается

Компонент не принимает `ref` в пропсах.

### `style` перезаписывает `dummyBoxConfig.style` для геометрических пропсов

```ts
const styles = {
  ...dummyBoxConfig.style,
  ...style,           // ← потребитель может перекрыть width/height из конфига
  width,              // ← но width из пропса всегда идёт последним и перекрывает style
  minWidth: width,
  height,
  minHeight: height,
  borderRadius: radius,
};
```

Если потребитель передаёт `style={{ width: '50%' }}`, оно будет перекрыто `width` из пропса. Порядок мерджа неочевиден: геометрические пропсы имеют наивысший приоритет, но это не задокументировано.

---

## DummyBox.types.ts

### `React` не импортирован, но используется как глобальный namespace

```ts
// нет импорта React
export interface DummyBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
```

---

## Сводная таблица

| Приоритет | Файл | Проблема |
|---|---|---|
| 🟡 Средний | `DummyBox.tsx` | `ref` не пробрасывается |
| 🟢 Низкий | `DummyBox.tsx:7` | `memo` без типового параметра — непоследовательно с остальными компонентами |
| 🟢 Низкий | `DummyBox.tsx:21–29` | Геометрические пропсы всегда перекрывают `style` — неочевидный приоритет |
| 🟢 Низкий | `DummyBox.types.ts` | `React` не импортирован — используется глобальный namespace |
