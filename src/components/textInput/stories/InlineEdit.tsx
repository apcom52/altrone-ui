import { useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { Checkbox, Flex, Text } from 'components';
import { TextInput } from '../TextInput.tsx';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

const INITIAL: Task[] = [
  { id: 1, title: 'Draft the migration plan', done: true },
  { id: 2, title: 'Remove the number-input spinner', done: true },
  { id: 3, title: 'Rewrite the form-component stories', done: false },
  { id: 4, title: 'Ship v4 beta', done: false },
];

export const InlineEdit = () => {
  const [tasks, setTasks] = useState(INITIAL);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setDraft(task.title);
    requestAnimationFrame(() => inputRef.current?.select());
  };

  const commit = () => {
    if (editingId == null) return;
    const next = draft.trim();
    if (next) {
      setTasks((ts) =>
        ts.map((t) => (t.id === editingId ? { ...t, title: next } : t)),
      );
    }
    setEditingId(null);
  };

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 460 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Editing a value in place
        </Text>
        <Text block>
          The label is plain text until you click it, then a{' '}
          <Text code>transparent</Text> field with the caret already placed
          (<Text code>inputRef</Text>). <Text kbd size={1}>Enter</Text> or blur
          commits, <Text kbd size={1}>Esc</Text> reverts.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="none">
        {tasks.map((task) => (
          <Flex
            key={task.id}
            direction="horizontal"
            gap="s"
            align="center"
            style={{
              padding: '6px 0',
              borderTop: '1px solid var(--border-a1)',
            }}
          >
            <Checkbox
              checked={task.done}
              onChange={() =>
                setTasks((ts) =>
                  ts.map((t) =>
                    t.id === task.id ? { ...t, done: !t.done } : t,
                  ),
                )
              }
            />
            {editingId === task.id ? (
              <TextInput
                inputRef={inputRef}
                value={draft}
                onChange={setDraft}
                variant="transparent"
                onBlur={commit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commit();
                  if (e.key === 'Escape') setEditingId(null);
                }}
              />
            ) : (
              <Text
                asChild
                size={3}
                color={task.done ? 'muted' : undefined}
                deleted={task.done}
              >
                <button
                  type="button"
                  onClick={() => startEdit(task)}
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '4px 0',
                    cursor: 'text',
                  }}
                >
                  {task.title}
                </button>
              </Text>
            )}
            {editingId !== task.id && (
              <Pencil
                size={13}
                style={{ color: 'var(--text-2)', opacity: 0.5 }}
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
