import type { MouseEventHandler, ReactElement, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Form,
  Label,
  Message,
  Modal,
  NavigationList,
  NumberInput,
  Progress,
  Radio,
  Screen,
  Select,
  showAlert,
  showConfirm,
  Switcher,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Toolbar,
} from 'components';
import {
  AlertTriangle,
  Archive,
  Bell,
  CalendarDays,
  Check,
  GripVertical,
  Hash,
  LayoutGrid,
  ListChecks,
  MessageSquare,
  Paperclip,
  Plus,
  Settings,
  SlidersHorizontal,
  Tag,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import { screenMeta, useDemoSidebar } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Kanban',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/* ------------------------------------------------------------------ *
 * Domain model
 * ------------------------------------------------------------------ */

type Priority = 'urgent' | 'high' | 'medium' | 'low';

/** Column accents and card covers — the categorical hues `Box` understands. */
type Hue =
  'blue' | 'purple' | 'amber' | 'teal' | 'green' | 'pink' | 'brown' | 'indigo';

/** The subset of `Label`'s palette this board offers for labels. */
type LabelColor =
  'blue' | 'purple' | 'amber' | 'teal' | 'pink' | 'red' | 'indigo' | 'brown';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface LabelDef {
  id: string;
  name: string;
  color: LabelColor;
}

interface ColumnDef {
  id: string;
  name: string;
  hue: Hue;
  /** `0` means no limit. */
  wipLimit: number;
  visible: boolean;
}

interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

interface Comment {
  id: string;
  authorId: string;
  text: string;
  time: string;
}

interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  labelIds: string[];
  assigneeIds: string[];
  priority: Priority;
  subtasks: Subtask[];
  comments: Comment[];
  attachments: number;
  due: string;
  coverHue?: Hue;
}

const PRIORITY: Record<
  Priority,
  { label: string; color: LabelColor | 'default'; variant: 'solid' | 'soft' }
> = {
  urgent: { label: 'Urgent', color: 'red', variant: 'solid' },
  high: { label: 'High', color: 'amber', variant: 'soft' },
  medium: { label: 'Medium', color: 'blue', variant: 'soft' },
  low: { label: 'Low', color: 'default', variant: 'soft' },
};

const PRIORITY_ORDER: Priority[] = ['urgent', 'high', 'medium', 'low'];
const PRIORITY_OPTIONS = PRIORITY_ORDER.map((p) => ({
  value: p,
  label: PRIORITY[p].label,
}));

const LABEL_COLOR_OPTIONS: { value: LabelColor; label: string }[] = (
  ['blue', 'purple', 'amber', 'teal', 'pink', 'red', 'indigo', 'brown'] as const
).map((c) => ({ value: c, label: c[0].toUpperCase() + c.slice(1) }));

const ROLE_OPTIONS = ['Owner', 'Admin', 'Member', 'Viewer'].map((r) => ({
  value: r,
  label: r,
}));

/* ------------------------------------------------------------------ *
 * Seed data
 * ------------------------------------------------------------------ */

const SEED_MEMBERS: Member[] = [
  { id: 'u1', firstName: 'Maya', lastName: 'Chen', role: 'Owner' },
  { id: 'u2', firstName: 'Diego', lastName: 'Santos', role: 'Admin' },
  { id: 'u3', firstName: 'Priya', lastName: 'Raman', role: 'Member' },
  { id: 'u4', firstName: 'Tom', lastName: 'Becker', role: 'Member' },
  { id: 'u5', firstName: 'Lena', lastName: 'Hart', role: 'Viewer' },
];

const SEED_LABELS: LabelDef[] = [
  { id: 'l1', name: 'Bug', color: 'red' },
  { id: 'l2', name: 'Feature', color: 'blue' },
  { id: 'l3', name: 'Design', color: 'purple' },
  { id: 'l4', name: 'Research', color: 'amber' },
  { id: 'l5', name: 'Infra', color: 'teal' },
  { id: 'l6', name: 'Docs', color: 'brown' },
];

const SEED_COLUMNS: ColumnDef[] = [
  { id: 'c1', name: 'Backlog', hue: 'brown', wipLimit: 0, visible: true },
  { id: 'c2', name: 'Ready', hue: 'blue', wipLimit: 6, visible: true },
  { id: 'c3', name: 'In progress', hue: 'amber', wipLimit: 3, visible: true },
  { id: 'c4', name: 'In review', hue: 'purple', wipLimit: 3, visible: true },
  { id: 'c5', name: 'QA', hue: 'teal', wipLimit: 3, visible: true },
  { id: 'c6', name: 'Done', hue: 'green', wipLimit: 0, visible: true },
];

const SEED_TASKS: Task[] = [
  {
    id: 't1',
    columnId: 'c1',
    title: 'Dark-theme audit for DataTable',
    description:
      'Header, filter row and sticky column shadows read poorly on the dark surface. Map every hard-coded colour onto a role token.',
    labelIds: ['l1', 'l5'],
    assigneeIds: ['u4'],
    priority: 'medium',
    subtasks: [],
    comments: [],
    attachments: 0,
    due: 'No date',
  },
  {
    id: 't2',
    columnId: 'c1',
    title: 'Spike: virtualised board columns',
    description:
      'A column with 200+ cards drops frames on scroll. Prototype windowing and measure the win.',
    labelIds: ['l4'],
    assigneeIds: ['u2'],
    priority: 'low',
    subtasks: [],
    comments: [],
    attachments: 0,
    due: 'No date',
    coverHue: 'teal',
  },
  {
    id: 't3',
    columnId: 'c1',
    title: 'Write the v4 token migration guide',
    description:
      'Spacing, radius and typography tokens are being renamed. Draft the before/after table and the codemod notes.',
    labelIds: ['l6'],
    assigneeIds: ['u3'],
    priority: 'medium',
    subtasks: [],
    comments: [],
    attachments: 1,
    due: 'Sep 20',
  },
  {
    id: 't4',
    columnId: 'c1',
    title: 'Keyboard drag-and-drop for cards',
    description:
      'Space to lift, arrows to move between columns, space to drop. Announce the move over aria-live.',
    labelIds: ['l2', 'l3'],
    assigneeIds: [],
    priority: 'low',
    subtasks: [],
    comments: [],
    attachments: 0,
    due: 'No date',
  },
  {
    id: 't5',
    columnId: 'c2',
    title: 'Concentric radius on nested Box',
    description:
      'A Box inside a rounded scope should derive its own radius from the parent minus the gap.',
    labelIds: ['l2'],
    assigneeIds: ['u1'],
    priority: 'high',
    subtasks: [
      { id: 't5s1', title: 'clamp() floor at --radius-mini', done: true },
      { id: 't5s2', title: 'Playground story', done: false },
    ],
    comments: [],
    attachments: 0,
    due: 'Sep 12',
    coverHue: 'purple',
  },
  {
    id: 't6',
    columnId: 'c2',
    title: 'Fix focus return when the sidebar closes',
    description:
      'Closing the overlay sidebar with Escape drops focus to the body instead of the toggle that opened it.',
    labelIds: ['l1'],
    assigneeIds: ['u4'],
    priority: 'high',
    subtasks: [],
    comments: [],
    attachments: 0,
    due: 'Sep 10',
  },
  {
    id: 't7',
    columnId: 'c2',
    title: 'Reduced-motion pass on Skeleton',
    description:
      'The shimmer is decorative — stop it under prefers-reduced-motion and leave a static placeholder.',
    labelIds: ['l3'],
    assigneeIds: ['u3'],
    priority: 'medium',
    subtasks: [],
    comments: [],
    attachments: 0,
    due: 'Sep 14',
  },
  {
    id: 't8',
    columnId: 'c3',
    title: 'Redesign the onboarding flow',
    description:
      'Cut the five-step wizard down to three by merging the workspace and invite steps.',
    labelIds: ['l3', 'l2'],
    assigneeIds: ['u1', 'u3'],
    priority: 'high',
    subtasks: [
      { id: 't8s1', title: 'Audit funnel drop-off', done: true },
      { id: 't8s2', title: 'Wireframe the 3-step version', done: true },
      { id: 't8s3', title: 'Prototype in Figma', done: false },
      { id: 't8s4', title: 'Dev handoff', done: false },
    ],
    comments: [
      {
        id: 't8c1',
        authorId: 'u2',
        text: 'Steps 2 and 3 can share a layout — less to build.',
        time: '2h ago',
      },
    ],
    attachments: 3,
    due: 'Sep 12',
    coverHue: 'purple',
  },
  {
    id: 't9',
    columnId: 'c3',
    title: 'Elevation: dark-theme shadow strength',
    description:
      'Shadows are built on --black-aN and vanish on dark. Shift the outline and blur layers up the alpha scale.',
    labelIds: ['l3', 'l5'],
    assigneeIds: ['u2'],
    priority: 'medium',
    subtasks: [
      { id: 't9s1', title: 'Shift blur ~6 steps', done: true },
      { id: 't9s2', title: 'Shift outline ~3 steps', done: false },
      { id: 't9s3', title: 'Screenshot review', done: false },
    ],
    comments: [],
    attachments: 0,
    due: 'Sep 11',
  },
  {
    id: 't10',
    columnId: 'c3',
    title: 'Container-query hook for the split view',
    description:
      'List/detail should collapse to one panel based on its own width, not the viewport.',
    labelIds: ['l2'],
    assigneeIds: ['u4'],
    priority: 'high',
    subtasks: [
      { id: 't10s1', title: 'useElementSize via ResizeObserver', done: false },
      { id: 't10s2', title: 'SSR-safe default', done: false },
    ],
    comments: [
      {
        id: 't10c1',
        authorId: 'u1',
        text: 'Keep it in Q3 scope — the split view depends on it.',
        time: 'Yesterday',
      },
      {
        id: 't10c2',
        authorId: 'u4',
        text: 'Following the useMediaMatch pattern, should be small.',
        time: '4h ago',
      },
    ],
    attachments: 0,
    due: 'Overdue',
  },
  {
    id: 't11',
    columnId: 'c3',
    title: 'Toast stacking animation jitter',
    description:
      'When three toasts land in quick succession the stack jumps a few pixels before settling.',
    labelIds: ['l1'],
    assigneeIds: ['u3'],
    priority: 'urgent',
    subtasks: [],
    comments: [
      {
        id: 't11c1',
        authorId: 'u3',
        text: 'Looks like a layout measurement happening before the enter transition.',
        time: '1h ago',
      },
    ],
    attachments: 0,
    due: 'Overdue',
    coverHue: 'pink',
  },
  {
    id: 't12',
    columnId: 'c4',
    title: 'Namespace exports for Toolbar',
    description:
      'Toolbar has sub-components but is still exported flat. Wrap it with Object.assign.',
    labelIds: ['l2'],
    assigneeIds: ['u2'],
    priority: 'medium',
    subtasks: [{ id: 't12s1', title: 'Update the barrel', done: true }],
    comments: [],
    attachments: 0,
    due: 'Sep 9',
  },
  {
    id: 't13',
    columnId: 'c4',
    title: 'Docs: Screen presets gallery',
    description:
      'One page that links every Screen example story with a one-line note on the layout it reaches for.',
    labelIds: ['l6', 'l3'],
    assigneeIds: ['u5'],
    priority: 'low',
    subtasks: [],
    comments: [
      {
        id: 't13c1',
        authorId: 'u5',
        text: 'Draft is up for review.',
        time: 'Mon',
      },
    ],
    attachments: 1,
    due: 'Sep 15',
    coverHue: 'amber',
  },
  {
    id: 't14',
    columnId: 'c5',
    title: 'Cypress: sidebar overlay on mobile',
    description:
      'Cover the scrim dismiss, Escape dismiss and the focus-return path in a component test.',
    labelIds: ['l1', 'l5'],
    assigneeIds: ['u4'],
    priority: 'high',
    subtasks: [
      { id: 't14s1', title: 'Scrim click closes', done: true },
      { id: 't14s2', title: 'Escape closes', done: true },
      { id: 't14s3', title: 'Focus returns to toggle', done: false },
    ],
    comments: [],
    attachments: 0,
    due: 'Sep 13',
  },
  {
    id: 't15',
    columnId: 'c6',
    title: 'Spacing semantic roles — first pass',
    description:
      'Non-control roles shipped as aliases over the primitive scale. NavigationList and Tabs.Item migrated as a zero-diff proof.',
    labelIds: ['l5'],
    assigneeIds: ['u1'],
    priority: 'medium',
    subtasks: [
      { id: 't15s1', title: '--space-inline / stack / content', done: true },
      { id: 't15s2', title: '--space-section', done: true },
      { id: 't15s3', title: 'Spacing.stories.tsx', done: true },
      { id: 't15s4', title: 'Migrate two components', done: true },
    ],
    comments: [
      {
        id: 't15c1',
        authorId: 'u1',
        text: 'The remaining ~100 hard-coded spots are per-component design review, not a rename.',
        time: 'Fri',
      },
    ],
    attachments: 0,
    due: 'Shipped',
  },
  {
    id: 't16',
    columnId: 'c6',
    title: 'Green colour scale ported from Radix',
    description:
      'success now has a full 12-step scale. As a side effect green became a selectable accent.',
    labelIds: ['l3'],
    assigneeIds: ['u2'],
    priority: 'low',
    subtasks: [
      { id: 't16s1', title: 'Port _green.scss', done: true },
      { id: 't16s2', title: 'Wire status roles', done: true },
    ],
    comments: [],
    attachments: 0,
    due: 'Shipped',
    coverHue: 'green',
  },
];

/* ------------------------------------------------------------------ *
 * Small presentational helpers
 * ------------------------------------------------------------------ */

const AssigneeStack = ({
  ids,
  members,
}: {
  ids: string[];
  members: Member[];
}) => (
  <Flex align="center">
    {ids.map((id, i) => {
      const member = members.find((m) => m.id === id);
      if (!member) {
        return null;
      }

      return (
        <Flex key={id} style={{ marginLeft: i === 0 ? 0 : -6 }}>
          <Avatar
            firstName={member.firstName}
            lastName={member.lastName}
            size="mini"
          />
        </Flex>
      );
    })}
  </Flex>
);

const SettingRow = ({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) => (
  <Flex align="center" justify="between" gap="m">
    <Flex direction="vertical" gap="xxs" style={{ minWidth: 0 }}>
      <Text size={3} weight="medium" block>
        {title}
      </Text>
      {hint ? (
        <Text size={2} color="muted" block>
          {hint}
        </Text>
      ) : null}
    </Flex>
    {children}
  </Flex>
);

/* ------------------------------------------------------------------ *
 * Task creation + detail
 * ------------------------------------------------------------------ */

const NewTaskModal = ({
  columns,
  members,
  labels,
  defaultColumnId,
  defaultPriority,
  onCreate,
  children,
}: {
  columns: ColumnDef[];
  members: Member[];
  labels: LabelDef[];
  defaultColumnId?: string;
  defaultPriority: Priority;
  onCreate: (task: Omit<Task, 'id'>) => void;
  children: ReactElement<{ onClick?: MouseEventHandler }>;
}) => {
  const firstColumn = defaultColumnId ?? columns[0]?.id;
  const [title, setTitle] = useState('');
  const [columnId, setColumnId] = useState(firstColumn);
  const [priority, setPriority] = useState<Priority>(defaultPriority);
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [labelIds, setLabelIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const reset = () => {
    setTitle('');
    setColumnId(firstColumn);
    setPriority(defaultPriority);
    setAssigneeIds([]);
    setLabelIds([]);
    setError('');
  };

  return (
    <Modal
      title="New task"
      size="m"
      onClose={reset}
      content={
        <Form errorMessages={{ title: error }}>
          <Form.Field label="Title" name="title" required>
            <TextInput
              value={title}
              placeholder="What needs to happen?"
              onChange={(value) => {
                setTitle(value);
                setError('');
              }}
            />
          </Form.Field>
          <Form.Field label="Column" name="column">
            <Select
              value={columnId}
              options={columns.map((c) => ({ value: c.id, label: c.name }))}
              onChange={(value) => setColumnId(value as string)}
            />
          </Form.Field>
          <Form.Field label="Priority" name="priority">
            <Select
              value={priority}
              options={PRIORITY_OPTIONS}
              onChange={(value) => setPriority(value as Priority)}
            />
          </Form.Field>
          <Form.Field label="Assignees" name="assignees">
            <Select
              multiple
              value={assigneeIds}
              placeholder="Nobody yet"
              options={members.map((m) => ({
                value: m.id,
                label: `${m.firstName} ${m.lastName}`,
              }))}
              onChange={(value) => setAssigneeIds((value as string[]) ?? [])}
            />
          </Form.Field>
          <Form.Field label="Labels" name="labels">
            <Select
              multiple
              value={labelIds}
              placeholder="No labels"
              options={labels.map((l) => ({ value: l.id, label: l.name }))}
              onChange={(value) => setLabelIds((value as string[]) ?? [])}
            />
          </Form.Field>
        </Form>
      }
      actions={({ closeModal }) => (
        <Button
          label="Create task"
          variant="submit"
          icon={<Plus size={14} />}
          onClick={() => {
            if (!title.trim()) {
              setError('Give the task a title.');
              return;
            }

            onCreate({
              columnId: columnId ?? columns[0].id,
              title: title.trim(),
              description: '',
              labelIds,
              assigneeIds,
              priority,
              subtasks: [],
              comments: [],
              attachments: 0,
              due: 'No date',
            });
            reset();
            closeModal();
          }}
        />
      )}
    >
      {children}
    </Modal>
  );
};

const TaskDetailModal = ({
  task,
  members,
  labels,
  columns,
  onUpdate,
  onDelete,
  children,
}: {
  task: Task;
  members: Member[];
  labels: LabelDef[];
  columns: ColumnDef[];
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
  children: ReactElement<{ onClick?: MouseEventHandler }>;
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [newSubtask, setNewSubtask] = useState('');
  const [newComment, setNewComment] = useState('');

  const reset = () => {
    setTitle(task.title);
    setDescription(task.description);
    setNewSubtask('');
    setNewComment('');
  };

  const memberName = (id: string) => {
    const member = members.find((m) => m.id === id);
    return member ? `${member.firstName} ${member.lastName}` : 'Someone';
  };

  const doneCount = task.subtasks.filter((s) => s.done).length;

  const addSubtask = () => {
    if (!newSubtask.trim()) {
      return;
    }

    onUpdate(task.id, {
      subtasks: [
        ...task.subtasks,
        { id: `s${Date.now()}`, title: newSubtask.trim(), done: false },
      ],
    });
    setNewSubtask('');
  };

  const addComment = () => {
    if (!newComment.trim()) {
      return;
    }

    onUpdate(task.id, {
      comments: [
        ...task.comments,
        {
          id: `c${Date.now()}`,
          authorId: 'u1',
          text: newComment.trim(),
          time: 'Just now',
        },
      ],
    });
    setNewComment('');
  };

  return (
    <Modal
      title="Task"
      size="l"
      onClose={reset}
      content={
        <Flex gap="l" wrap align="start">
          <Flex
            direction="vertical"
            gap="m"
            style={{ flex: '2 1 320px', minWidth: 0 }}
          >
            <Form>
              <Form.Field label="Title">
                <TextInput value={title} onChange={setTitle} />
              </Form.Field>
              <Form.Field label="Description">
                <Textarea
                  value={description}
                  onChange={setDescription}
                  placeholder="Add more detail…"
                  style={{ minHeight: 120 }}
                />
              </Form.Field>
            </Form>

            <Divider />

            <Flex align="center" gap="s">
              <ListChecks size={16} />
              <Text size={4} weight="bold">
                Checklist
              </Text>
              <Text size={2} color="muted">
                {doneCount}/{task.subtasks.length}
              </Text>
            </Flex>
            {task.subtasks.length > 0 ? (
              <Progress
                value={Math.round((doneCount / task.subtasks.length) * 100)}
                aria-label={`Checklist ${doneCount} of ${task.subtasks.length}`}
                size="s"
              />
            ) : null}
            <Flex direction="vertical" gap="xs">
              {task.subtasks.map((subtask) => (
                <Flex key={subtask.id} align="center" justify="between" gap="s">
                  <Switcher
                    checked={subtask.done}
                    onChange={() =>
                      onUpdate(task.id, {
                        subtasks: task.subtasks.map((s) =>
                          s.id === subtask.id ? { ...s, done: !s.done } : s,
                        ),
                      })
                    }
                  >
                    <Text size={3} color={subtask.done ? 'muted' : undefined}>
                      {subtask.title}
                    </Text>
                  </Switcher>
                  <Button
                    label={`Remove ${subtask.title}`}
                    icon={<Trash2 />}
                    showLabel={false}
                    variant="text"
                    danger
                    size="s"
                    onClick={() =>
                      onUpdate(task.id, {
                        subtasks: task.subtasks.filter(
                          (s) => s.id !== subtask.id,
                        ),
                      })
                    }
                  />
                </Flex>
              ))}
            </Flex>
            <Flex gap="s">
              <TextInput
                value={newSubtask}
                onChange={setNewSubtask}
                placeholder="Add an item"
              />
              <Button
                label="Add checklist item"
                icon={<Plus />}
                showLabel={false}
                onClick={addSubtask}
              />
            </Flex>

            <Divider />

            <Flex align="center" gap="s">
              <MessageSquare size={16} />
              <Text size={4} weight="bold">
                Comments
              </Text>
            </Flex>
            <Flex direction="vertical" gap="s">
              {task.comments.length === 0 ? (
                <Text size={2} color="muted">
                  No comments yet.
                </Text>
              ) : (
                task.comments.map((comment) => {
                  const author = members.find((m) => m.id === comment.authorId);
                  return (
                    <Flex key={comment.id} gap="s">
                      <Avatar
                        firstName={author?.firstName ?? 'A'}
                        lastName={author?.lastName}
                        size="s"
                      />
                      <Flex
                        direction="vertical"
                        gap="xxs"
                        style={{ flex: 1, minWidth: 0 }}
                      >
                        <Flex align="center" gap="s">
                          <Text size={2} weight="medium">
                            {memberName(comment.authorId)}
                          </Text>
                          <Text size={2} color="muted">
                            {comment.time}
                          </Text>
                        </Flex>
                        <Text size={3} block>
                          {comment.text}
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })
              )}
            </Flex>
            <Flex gap="s">
              <TextInput
                value={newComment}
                onChange={setNewComment}
                placeholder="Write a comment…"
              />
              <Button
                label="Send comment"
                icon={<Plus />}
                showLabel={false}
                onClick={addComment}
              />
            </Flex>
          </Flex>

          <Flex
            direction="vertical"
            gap="m"
            style={{ flex: '1 1 220px', minWidth: 0 }}
          >
            <Form>
              <Form.Field label="Status">
                <Select
                  value={task.columnId}
                  options={columns.map((c) => ({ value: c.id, label: c.name }))}
                  onChange={(value) =>
                    onUpdate(task.id, { columnId: value as string })
                  }
                />
              </Form.Field>
              <Form.Field label="Priority">
                <Select
                  value={task.priority}
                  options={PRIORITY_OPTIONS}
                  onChange={(value) =>
                    onUpdate(task.id, { priority: value as Priority })
                  }
                />
              </Form.Field>
              <Form.Field label="Assignees">
                <Select
                  multiple
                  value={task.assigneeIds}
                  placeholder="Nobody yet"
                  options={members.map((m) => ({
                    value: m.id,
                    label: `${m.firstName} ${m.lastName}`,
                  }))}
                  onChange={(value) =>
                    onUpdate(task.id, {
                      assigneeIds: (value as string[]) ?? [],
                    })
                  }
                />
              </Form.Field>
              <Form.Field label="Labels">
                <Select
                  multiple
                  value={task.labelIds}
                  placeholder="No labels"
                  options={labels.map((l) => ({ value: l.id, label: l.name }))}
                  onChange={(value) =>
                    onUpdate(task.id, { labelIds: (value as string[]) ?? [] })
                  }
                />
              </Form.Field>
            </Form>
            <Box
              material="plate"
              shape="rounded"
              radius="12px"
              padding={{ x: 12, y: 10 }}
            >
              <Flex direction="vertical" gap="xxs">
                <Text size={2} color="muted">
                  Due date
                </Text>
                <Text
                  size={3}
                  weight="medium"
                  color={task.due === 'Overdue' ? 'danger' : undefined}
                >
                  {task.due}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      }
      actions={({ closeModal }) => (
        <Flex gap="s">
          <Button
            label="Save changes"
            variant="submit"
            icon={<Check size={14} />}
            onClick={() => {
              onUpdate(task.id, {
                title: title.trim() || task.title,
                description,
              });
              closeModal();
            }}
          />
          <Button
            label="Delete task"
            danger
            variant="text"
            icon={<Trash2 size={14} />}
            onClick={async () => {
              const confirmed = await showConfirm({
                title: 'Delete this task?',
                message: 'It will be removed from the board for everyone.',
                confirmText: 'Delete',
                rejectText: 'Keep',
                danger: true,
              });

              if (confirmed) {
                onDelete(task.id);
                closeModal();
              }
            }}
          />
        </Flex>
      )}
    >
      {children}
    </Modal>
  );
};

/* ------------------------------------------------------------------ *
 * Board
 * ------------------------------------------------------------------ */

const TaskCard = ({
  task,
  members,
  labels,
  columns,
  showCover,
  compact,
  onUpdate,
  onDelete,
}: {
  task: Task;
  members: Member[];
  labels: LabelDef[];
  columns: ColumnDef[];
  showCover: boolean;
  compact: boolean;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
}) => {
  const cardLabels = task.labelIds
    .map((id) => labels.find((l) => l.id === id))
    .filter((l): l is LabelDef => Boolean(l));
  const done = task.subtasks.filter((s) => s.done).length;
  const priority = PRIORITY[task.priority];

  return (
    <TaskDetailModal
      task={task}
      members={members}
      labels={labels}
      columns={columns}
      onUpdate={onUpdate}
      onDelete={onDelete}
    >
      <Box
        shape="rounded"
        material="plate"
        radius="12px"
        padding={compact ? { x: 12, y: 10 } : { x: 14, y: 12 }}
        pressable
        focusable
        role="button"
        tabIndex={0}
        style={{ width: '100%', cursor: 'pointer' }}
      >
        <Flex
          direction="vertical"
          gap={compact ? 'xs' : 's'}
          style={{ width: '100%', minWidth: 0 }}
        >
          {showCover && !compact && task.coverHue ? (
            <Box
              height={4}
              shape="pill"
              material="solid"
              color={task.coverHue}
              style={{ width: '100%' }}
            />
          ) : null}

          {cardLabels.length > 0 ? (
            <Flex gap="xs" wrap>
              {cardLabels.map((label) => (
                <Label
                  key={label.id}
                  size="mini"
                  variant="soft"
                  color={label.color}
                >
                  {label.name}
                </Label>
              ))}
            </Flex>
          ) : null}

          <Text size={3} weight="medium" block>
            {task.title}
          </Text>

          {!compact && task.subtasks.length > 0 ? (
            <Progress
              value={Math.round((done / task.subtasks.length) * 100)}
              aria-label={`Checklist ${done} of ${task.subtasks.length}`}
              size="mini"
            >
              {`${done}/${task.subtasks.length}`}
            </Progress>
          ) : null}

          <Flex align="center" gap="s" style={{ width: '100%', minWidth: 0 }}>
            <Label
              size="mini"
              variant={priority.variant}
              color={priority.color}
            >
              {priority.label}
            </Label>
            <Flex align="center" gap="xxs">
              <CalendarDays size={13} />
              <Text
                size={2}
                color={task.due === 'Overdue' ? 'danger' : 'muted'}
                nowrap
              >
                {task.due}
              </Text>
            </Flex>
            <Flex style={{ flex: 1 }} />
            {task.comments.length > 0 ? (
              <Flex align="center" gap="xxs">
                <MessageSquare size={13} />
                <Text size={2} color="muted">
                  {task.comments.length}
                </Text>
              </Flex>
            ) : null}
            {task.attachments > 0 ? (
              <Flex align="center" gap="xxs">
                <Paperclip size={13} />
                <Text size={2} color="muted">
                  {task.attachments}
                </Text>
              </Flex>
            ) : null}
            <AssigneeStack ids={task.assigneeIds} members={members} />
          </Flex>
        </Flex>
      </Box>
    </TaskDetailModal>
  );
};

const BoardColumn = ({
  column,
  cards,
  totalInColumn,
  members,
  labels,
  columns,
  defaultPriority,
  showCovers,
  compactCards,
  onCreate,
  onUpdate,
  onDelete,
}: {
  column: ColumnDef;
  cards: Task[];
  totalInColumn: number;
  members: Member[];
  labels: LabelDef[];
  columns: ColumnDef[];
  defaultPriority: Priority;
  showCovers: boolean;
  compactCards: boolean;
  onCreate: (task: Omit<Task, 'id'>) => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
}) => {
  const over = column.wipLimit > 0 && totalInColumn > column.wipLimit;

  return (
    <Flex direction="vertical" gap="s" style={{ width: 300, flexShrink: 0 }}>
      <Flex align="center" gap="s" style={{ paddingInline: 4 }}>
        <Box size={10} shape="circle" material="solid" color={column.hue} />
        <Text size={3} weight="bold">
          {column.name}
        </Text>
        <Label size="mini" variant="soft" color={over ? 'red' : 'default'}>
          {column.wipLimit > 0
            ? `${totalInColumn}/${column.wipLimit}`
            : String(totalInColumn)}
        </Label>
        <Flex style={{ flex: 1 }} />
        <NewTaskModal
          columns={columns}
          members={members}
          labels={labels}
          defaultColumnId={column.id}
          defaultPriority={defaultPriority}
          onCreate={onCreate}
        >
          <Button
            label={`Add a card to ${column.name}`}
            icon={<Plus />}
            showLabel={false}
            variant="text"
            size="s"
          />
        </NewTaskModal>
      </Flex>

      {over ? (
        <Flex align="center" gap="xs" style={{ paddingInline: 4 }}>
          <AlertTriangle size={13} />
          <Text size={2} color="danger">
            Over the WIP limit
          </Text>
        </Flex>
      ) : null}

      <Box
        material="translucent"
        shape="rounded"
        radius="16px"
        padding={8}
        style={{ flex: 1 }}
      >
        <Flex
          direction="vertical"
          gap="s"
          style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}
        >
          {cards.length === 0 ? (
            <Flex align="center" justify="center" style={{ padding: 16 }}>
              <Text size={2} color="muted">
                Nothing here
              </Text>
            </Flex>
          ) : (
            cards.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                members={members}
                labels={labels}
                columns={columns}
                showCover={showCovers}
                compact={compactCards}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

/* ------------------------------------------------------------------ *
 * Story
 * ------------------------------------------------------------------ */

/**
 * "Cadence" — a project board that has to bleed to the window edges and scroll
 * horizontally. The whole point of the layout: `Screen.Content` keeps its own
 * padding zeroed and becomes a vertical flex column — a fixed filter bar on
 * top, then a single child that owns `overflow-x: auto`. The column strip
 * inside it is `width: max-content`, so it grows past the viewport and the
 * board scrolls sideways while the header, sidebar, footer and filter bar stay
 * put. Each column additionally caps its card list and scrolls it vertically.
 *
 * The board is fully interactive on mock data: open any card for a detail
 * sheet (edit title/description, toggle checklist items, move it between
 * columns, reassign, relabel, comment, delete); "New task" and each column's
 * add button open a creation form; the filter bar narrows by text, assignee,
 * label and priority.
 *
 * The sidebar switches between the board and a real **Settings** screen — a
 * `Tabs` group over General, Columns, Labels, Members and Notifications
 * panels. Settings write back to the board live: renaming it updates the
 * header and the workspace list, WIP limits drive the per-column warning,
 * hiding a column drops it from the strip, deleting a label strips it from
 * every card, and the General toggles switch card covers and the compact
 * layout on and off.
 */
export const Kanban: StoryObj<typeof Screen> = {
  name: 'Kanban',
  render: () => {
    const sidebar = useDemoSidebar('md');

    const [view, setView] = useState<'board' | 'settings'>('board');
    const [settingsTab, setSettingsTab] = useState<
      'general' | 'columns' | 'labels' | 'members' | 'notifications'
    >('general');

    const [boardName, setBoardName] = useState('Sprint 42');
    const [columns, setColumns] = useState<ColumnDef[]>(SEED_COLUMNS);
    const [tasks, setTasks] = useState<Task[]>(SEED_TASKS);
    const [members, setMembers] = useState<Member[]>(SEED_MEMBERS);
    const [labels, setLabels] = useState<LabelDef[]>(SEED_LABELS);

    const [defaultPriority, setDefaultPriority] = useState<Priority>('medium');
    const [weekStart, setWeekStart] = useState('monday');
    const [showCovers, setShowCovers] = useState(true);
    const [compactCards, setCompactCards] = useState(false);
    const [notify, setNotify] = useState({
      assigned: true,
      moved: false,
      mention: true,
      dueSoon: true,
      digest: false,
    });

    const [query, setQuery] = useState('');
    const [assigneeFilter, setAssigneeFilter] = useState('all');
    const [labelFilter, setLabelFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    const [newLabelName, setNewLabelName] = useState('');
    const [newLabelColor, setNewLabelColor] = useState<LabelColor>('blue');
    const [inviteEmail, setInviteEmail] = useState('');

    /* --- mutations --- */

    const createTask = (task: Omit<Task, 'id'>) =>
      setTasks((prev) => [{ ...task, id: `t${Date.now()}` }, ...prev]);

    const updateTask = (id: string, patch: Partial<Task>) =>
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...patch } : task)),
      );

    const deleteTask = (id: string) =>
      setTasks((prev) => prev.filter((task) => task.id !== id));

    const patchColumn = (id: string, patch: Partial<ColumnDef>) =>
      setColumns((prev) =>
        prev.map((column) =>
          column.id === id ? { ...column, ...patch } : column,
        ),
      );

    const toggleColumnVisible = (id: string) =>
      setColumns((prev) => {
        const target = prev.find((column) => column.id === id);
        const visibleCount = prev.filter((column) => column.visible).length;
        if (target?.visible && visibleCount === 1) {
          return prev;
        }

        return prev.map((column) =>
          column.id === id ? { ...column, visible: !column.visible } : column,
        );
      });

    const addColumn = () =>
      setColumns((prev) => [
        ...prev,
        {
          id: `c${Date.now()}`,
          name: 'New column',
          hue: 'blue',
          wipLimit: 0,
          visible: true,
        },
      ]);

    const removeColumn = (id: string) =>
      setColumns((prev) => prev.filter((column) => column.id !== id));

    const addLabel = () => {
      if (!newLabelName.trim()) {
        return;
      }

      setLabels((prev) => [
        ...prev,
        {
          id: `l${Date.now()}`,
          name: newLabelName.trim(),
          color: newLabelColor,
        },
      ]);
      setNewLabelName('');
    };

    const removeLabel = (id: string) => {
      setLabels((prev) => prev.filter((label) => label.id !== id));
      setTasks((prev) =>
        prev.map((task) => ({
          ...task,
          labelIds: task.labelIds.filter((labelId) => labelId !== id),
        })),
      );
    };

    const removeMember = (id: string) => {
      setMembers((prev) => prev.filter((member) => member.id !== id));
      setTasks((prev) =>
        prev.map((task) => ({
          ...task,
          assigneeIds: task.assigneeIds.filter((memberId) => memberId !== id),
        })),
      );
    };

    /* --- derived --- */

    const visibleColumns = columns.filter((column) => column.visible);

    const matchesFilters = (task: Task) =>
      (query.trim() === '' ||
        task.title.toLowerCase().includes(query.trim().toLowerCase())) &&
      (assigneeFilter === 'all' || task.assigneeIds.includes(assigneeFilter)) &&
      (labelFilter === 'all' || task.labelIds.includes(labelFilter)) &&
      (priorityFilter === 'all' || task.priority === priorityFilter);

    const filtered = tasks.filter(matchesFilters);

    const demoBoard =
      (name: string) => (event: { preventDefault: () => void }) => {
        event.preventDefault();
        showAlert({
          title: name,
          message: 'This board is not part of the demo.',
        });
      };

    return (
      <Screen title={boardName}>
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            {sidebar.showToggle ? (
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={sidebar.collapsed}
                  onClick={sidebar.toggle}
                />
              </Toolbar.Group>
            ) : null}
            <Toolbar.Title
              label={view === 'settings' ? 'Board settings' : boardName}
            />
            <Toolbar.Separator />
            {view === 'board' ? (
              <Toolbar.Group>
                <NewTaskModal
                  columns={columns}
                  members={members}
                  labels={labels}
                  defaultPriority={defaultPriority}
                  onCreate={createTask}
                >
                  <Toolbar.Action label="New task" icon={<Plus />} />
                </NewTaskModal>
              </Toolbar.Group>
            ) : null}
            <Toolbar.Group>
              <Toolbar.SearchAction showLabel={false} />
              <Toolbar.Action
                label="Notifications"
                icon={<Bell />}
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Avatar firstName="Maya" lastName="Chen" />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>

        <Screen.Sidebar collapsed={sidebar.collapsed} onClose={sidebar.onClose}>
          <NavigationList>
            <NavigationList.Header>
              <Flex align="center" gap="s">
                <img
                  src="https://cdn.jim-nielsen.com/macos/512/doneit-kanban-board-to-do-2023-09-29.png?rf=1024"
                  width="28"
                  height="28"
                />
                <Text size={4} weight="bold" block>
                  Cadence
                </Text>
              </Flex>
            </NavigationList.Header>
            <NavigationList.Group title="Workspace">
              <NavigationList.Link
                href="#"
                icon={<LayoutGrid />}
                label="Board"
                selected={view === 'board'}
                onClick={(event) => {
                  event.preventDefault();
                  setView('board');
                  sidebar.onClose();
                }}
              />
              <NavigationList.Link
                href="#"
                icon={<Settings />}
                label="Settings"
                selected={view === 'settings'}
                onClick={(event) => {
                  event.preventDefault();
                  setView('settings');
                  sidebar.onClose();
                }}
              />
            </NavigationList.Group>
            <NavigationList.Group title="Boards">
              <NavigationList.Link
                href="#"
                icon={<Hash />}
                label={boardName}
                selected
                onClick={(event) => event.preventDefault()}
              />
              <NavigationList.Link
                href="#"
                icon={<Hash />}
                label="Marketing site"
                onClick={demoBoard('Marketing site')}
              />
              <NavigationList.Link
                href="#"
                icon={<Hash />}
                label="Mobile app"
                onClick={demoBoard('Mobile app')}
              />
            </NavigationList.Group>
            <NavigationList.Footer>
              <Flex align="center" gap="s">
                <Avatar firstName="Maya" lastName="Chen" size="m" />
                <Flex
                  direction="vertical"
                  gap="xs"
                  style={{ flex: 1, minWidth: 0 }}
                >
                  <Text size={3} block truncate>
                    Maya Chen
                  </Text>
                  <Text size={2} color="muted" block>
                    Owner
                  </Text>
                </Flex>
                <Button
                  icon={<Settings />}
                  showLabel={false}
                  label="Settings"
                  size="s"
                  onClick={() => {
                    setView('settings');
                    sidebar.onClose();
                  }}
                />
              </Flex>
            </NavigationList.Footer>
          </NavigationList>
        </Screen.Sidebar>

        <Screen.Content
          style={{
            paddingBottom: 0,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          {view === 'settings' ? (
            <Flex
              style={{ width: '100%', paddingBottom: 'var(--space-content)' }}
            >
              <Flex
                direction="vertical"
                gap="l"
                style={{ maxWidth: 720, width: '100%' }}
              >
                <Text size={7} weight="bold" block>
                  Board settings
                </Text>

                <Tabs>
                  <Tabs.Item
                    icon={<SlidersHorizontal size={14} />}
                    label="General"
                    selected={settingsTab === 'general'}
                    onClick={() => setSettingsTab('general')}
                  />
                  <Tabs.Item
                    icon={<LayoutGrid size={14} />}
                    label="Columns"
                    selected={settingsTab === 'columns'}
                    onClick={() => setSettingsTab('columns')}
                  />
                  <Tabs.Item
                    icon={<Tag size={14} />}
                    label="Labels"
                    selected={settingsTab === 'labels'}
                    onClick={() => setSettingsTab('labels')}
                  />
                  <Tabs.Item
                    icon={<Users size={14} />}
                    label="Members"
                    selected={settingsTab === 'members'}
                    onClick={() => setSettingsTab('members')}
                  />
                  <Tabs.Item
                    icon={<Bell size={14} />}
                    label="Notifications"
                    selected={settingsTab === 'notifications'}
                    onClick={() => setSettingsTab('notifications')}
                  />
                </Tabs>

                {settingsTab === 'general' ? (
                  <Flex direction="vertical" gap="m">
                    <Form>
                      <Form.Field label="Board name">
                        <TextInput value={boardName} onChange={setBoardName} />
                      </Form.Field>
                      <Form.Field label="Default priority for new cards">
                        <Select
                          value={defaultPriority}
                          options={PRIORITY_OPTIONS}
                          onChange={(value) =>
                            setDefaultPriority(value as Priority)
                          }
                        />
                      </Form.Field>
                      <Form.Field label="Week starts on">
                        <Radio
                          value={weekStart}
                          onChange={setWeekStart}
                          name="weekStart"
                          direction="horizontal"
                        >
                          <Radio.Item value="monday">Monday</Radio.Item>
                          <Radio.Item value="sunday">Sunday</Radio.Item>
                        </Radio>
                      </Form.Field>
                    </Form>
                    <Divider />
                    <SettingRow
                      title="Show cover colours on cards"
                      hint="A thin coloured strip along the top of each card."
                    >
                      <Switcher
                        checked={showCovers}
                        onChange={(value) => setShowCovers(value)}
                      />
                    </SettingRow>
                    <SettingRow
                      title="Compact card layout"
                      hint="Hide covers and checklist progress to fit more cards on screen."
                    >
                      <Switcher
                        checked={compactCards}
                        onChange={(value) => setCompactCards(value)}
                      />
                    </SettingRow>
                  </Flex>
                ) : null}

                {settingsTab === 'columns' ? (
                  <Flex direction="vertical" gap="m">
                    {columns.some(
                      (column) =>
                        column.wipLimit > 0 &&
                        tasks.filter((task) => task.columnId === column.id)
                          .length > column.wipLimit,
                    ) ? (
                      <Message
                        severity="warning"
                        header="Some columns are over their WIP limit"
                      >
                        <Text size={3}>
                          Lower the amount of work in progress, or raise the
                          limit if the team genuinely has the capacity.
                        </Text>
                      </Message>
                    ) : null}

                    {columns.map((column) => {
                      const count = tasks.filter(
                        (task) => task.columnId === column.id,
                      ).length;

                      return (
                        <Box
                          key={column.id}
                          material="plate"
                          shape="rounded"
                          radius="12px"
                          padding={{ x: 14, y: 12 }}
                        >
                          <Flex align="center" gap="m" wrap>
                            <GripVertical size={16} />
                            <Box
                              size={10}
                              shape="circle"
                              material="solid"
                              color={column.hue}
                            />
                            <Flex
                              direction="vertical"
                              style={{ width: 170, flexShrink: 0 }}
                            >
                              <TextInput
                                value={column.name}
                                onChange={(value) =>
                                  patchColumn(column.id, { name: value })
                                }
                              />
                            </Flex>
                            <Flex
                              direction="vertical"
                              gap="xxs"
                              style={{ width: 130, flexShrink: 0 }}
                            >
                              <Text size={2} color="muted">
                                WIP limit (0 = none)
                              </Text>
                              <NumberInput
                                value={column.wipLimit}
                                onChange={(value) =>
                                  patchColumn(column.id, {
                                    wipLimit: value ?? 0,
                                  })
                                }
                                min={0}
                                max={20}
                              />
                            </Flex>
                            <Flex style={{ flex: 1 }} />
                            <Text
                              size={2}
                              color={
                                column.wipLimit > 0 && count > column.wipLimit
                                  ? 'danger'
                                  : 'muted'
                              }
                              nowrap
                            >
                              {count} {count === 1 ? 'card' : 'cards'}
                            </Text>
                            <Switcher
                              checked={column.visible}
                              onChange={() => toggleColumnVisible(column.id)}
                            >
                              <Text size={2} color="muted">
                                Visible
                              </Text>
                            </Switcher>
                            <Button
                              label={`Remove ${column.name}`}
                              icon={<Trash2 />}
                              showLabel={false}
                              variant="text"
                              danger
                              size="s"
                              disabled={count > 0}
                              onClick={() => removeColumn(column.id)}
                            />
                          </Flex>
                        </Box>
                      );
                    })}
                    <Flex>
                      <Button
                        label="Add column"
                        icon={<Plus size={14} />}
                        onClick={addColumn}
                      />
                    </Flex>
                  </Flex>
                ) : null}

                {settingsTab === 'labels' ? (
                  <Flex direction="vertical" gap="m">
                    {labels.map((label) => (
                      <Box
                        key={label.id}
                        material="plate"
                        shape="rounded"
                        radius="12px"
                        padding={{ x: 14, y: 12 }}
                      >
                        <Flex align="center" gap="m" wrap>
                          <Box
                            size={18}
                            shape="rounded"
                            radius="6px"
                            material="solid"
                            color={label.color}
                          />
                          <Flex
                            direction="vertical"
                            style={{ width: 170, flexShrink: 0 }}
                          >
                            <TextInput
                              value={label.name}
                              onChange={(value) =>
                                setLabels((prev) =>
                                  prev.map((item) =>
                                    item.id === label.id
                                      ? { ...item, name: value }
                                      : item,
                                  ),
                                )
                              }
                            />
                          </Flex>
                          <Flex
                            direction="vertical"
                            style={{ width: 150, flexShrink: 0 }}
                          >
                            <Select
                              value={label.color}
                              parentWidth
                              options={LABEL_COLOR_OPTIONS}
                              onChange={(value) =>
                                setLabels((prev) =>
                                  prev.map((item) =>
                                    item.id === label.id
                                      ? { ...item, color: value as LabelColor }
                                      : item,
                                  ),
                                )
                              }
                            />
                          </Flex>
                          <Flex style={{ flex: 1 }} />
                          <Label size="mini" variant="soft" color={label.color}>
                            {label.name || 'Label'}
                          </Label>
                          <Button
                            label={`Remove ${label.name}`}
                            icon={<Trash2 />}
                            showLabel={false}
                            variant="text"
                            danger
                            size="s"
                            onClick={() => removeLabel(label.id)}
                          />
                        </Flex>
                      </Box>
                    ))}
                    <Divider />
                    <Flex align="end" gap="s" wrap>
                      <Flex
                        direction="vertical"
                        style={{ width: 200, flexShrink: 0 }}
                      >
                        <TextInput
                          value={newLabelName}
                          onChange={setNewLabelName}
                          placeholder="New label name"
                        />
                      </Flex>
                      <Flex
                        direction="vertical"
                        style={{ width: 150, flexShrink: 0 }}
                      >
                        <Select
                          value={newLabelColor}
                          parentWidth
                          options={LABEL_COLOR_OPTIONS}
                          onChange={(value) =>
                            setNewLabelColor(value as LabelColor)
                          }
                        />
                      </Flex>
                      <Button
                        label="Add label"
                        icon={<Plus size={14} />}
                        onClick={addLabel}
                      />
                    </Flex>
                  </Flex>
                ) : null}

                {settingsTab === 'members' ? (
                  <Flex direction="vertical" gap="m">
                    {members.map((member) => (
                      <Box
                        key={member.id}
                        material="plate"
                        shape="rounded"
                        radius="12px"
                        padding={{ x: 14, y: 12 }}
                      >
                        <Flex align="center" gap="m" wrap>
                          <Avatar
                            firstName={member.firstName}
                            lastName={member.lastName}
                          />
                          <Flex
                            direction="vertical"
                            gap="xxs"
                            style={{ flex: 1, minWidth: 120 }}
                          >
                            <Text size={3} weight="medium" block>
                              {member.firstName} {member.lastName}
                            </Text>
                            <Text size={2} color="muted" block>
                              {member.firstName.toLowerCase()}@cadence.app
                            </Text>
                          </Flex>
                          <Flex
                            direction="vertical"
                            style={{ width: 140, flexShrink: 0 }}
                          >
                            <Select
                              value={member.role}
                              parentWidth
                              options={ROLE_OPTIONS}
                              onChange={(value) =>
                                setMembers((prev) =>
                                  prev.map((item) =>
                                    item.id === member.id
                                      ? { ...item, role: value as string }
                                      : item,
                                  ),
                                )
                              }
                            />
                          </Flex>
                          <Button
                            label={`Remove ${member.firstName}`}
                            icon={<Trash2 />}
                            showLabel={false}
                            variant="text"
                            danger
                            size="s"
                            disabled={member.role === 'Owner'}
                            onClick={() => removeMember(member.id)}
                          />
                        </Flex>
                      </Box>
                    ))}
                    <Divider />
                    <Flex align="center" gap="s" wrap>
                      <Flex
                        direction="vertical"
                        style={{ width: 240, flexShrink: 0 }}
                      >
                        <TextInput
                          value={inviteEmail}
                          onChange={setInviteEmail}
                          placeholder="name@company.com"
                        />
                      </Flex>
                      <Button
                        label="Send invite"
                        icon={<UserPlus size={14} />}
                        onClick={() => {
                          if (!inviteEmail.trim()) {
                            return;
                          }

                          showAlert({
                            title: 'Invite sent',
                            message: `An invitation is on its way to ${inviteEmail.trim()}. This is a demo — no email is actually sent.`,
                          });
                          setInviteEmail('');
                        }}
                      />
                    </Flex>
                  </Flex>
                ) : null}

                {settingsTab === 'notifications' ? (
                  <Flex direction="vertical" gap="m">
                    <SettingRow
                      title="A card is assigned to me"
                      hint="Someone adds you as an assignee."
                    >
                      <Switcher
                        checked={notify.assigned}
                        onChange={(value) =>
                          setNotify((prev) => ({ ...prev, assigned: value }))
                        }
                      />
                    </SettingRow>
                    <SettingRow title="A card I follow changes column">
                      <Switcher
                        checked={notify.moved}
                        onChange={(value) =>
                          setNotify((prev) => ({ ...prev, moved: value }))
                        }
                      />
                    </SettingRow>
                    <SettingRow title="I'm mentioned in a comment">
                      <Switcher
                        checked={notify.mention}
                        onChange={(value) =>
                          setNotify((prev) => ({ ...prev, mention: value }))
                        }
                      />
                    </SettingRow>
                    <SettingRow
                      title="A card is due soon"
                      hint="24 hours before the due date."
                    >
                      <Switcher
                        checked={notify.dueSoon}
                        onChange={(value) =>
                          setNotify((prev) => ({ ...prev, dueSoon: value }))
                        }
                      />
                    </SettingRow>
                    <SettingRow
                      title="Weekly digest"
                      hint="A Monday summary of what shipped last week."
                    >
                      <Switcher
                        checked={notify.digest}
                        onChange={(value) =>
                          setNotify((prev) => ({ ...prev, digest: value }))
                        }
                      />
                    </SettingRow>
                  </Flex>
                ) : null}

                <Divider />

                <Box
                  material="outline"
                  tone="danger"
                  shape="rounded"
                  radius="12px"
                  padding={16}
                >
                  <Flex direction="vertical" gap="s">
                    <Text size={4} weight="bold" block>
                      Danger zone
                    </Text>
                    <Text size={2} color="muted" block>
                      Archiving hides the board for every member. You can
                      restore it from the workspace trash for 30 days.
                    </Text>
                    <Flex>
                      <Button
                        label="Archive this board"
                        danger
                        icon={<Archive size={14} />}
                        onClick={async () => {
                          const confirmed = await showConfirm({
                            title: `Archive ${boardName}?`,
                            message:
                              'Members lose access until the board is restored.',
                            confirmText: 'Archive',
                            rejectText: 'Cancel',
                            danger: true,
                          });

                          if (confirmed) {
                            showAlert({
                              title: 'Board archived',
                              message:
                                'This is a demo — nothing was actually archived.',
                            });
                          }
                        }}
                      />
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          ) : (
            <>
              <Flex align="center" gap="s" wrap style={{ paddingBottom: 12 }}>
                <Flex
                  direction="vertical"
                  style={{ width: 180, flexShrink: 0 }}
                >
                  <TextInput
                    value={query}
                    onChange={setQuery}
                    placeholder="Search cards"
                  />
                </Flex>
                <Flex
                  direction="vertical"
                  style={{ width: 170, flexShrink: 0 }}
                >
                  <Select
                    value={assigneeFilter}
                    parentWidth
                    options={[
                      { value: 'all', label: 'All assignees' },
                      ...members.map((member) => ({
                        value: member.id,
                        label: `${member.firstName} ${member.lastName}`,
                      })),
                    ]}
                    onChange={(value) => setAssigneeFilter(value as string)}
                  />
                </Flex>
                <Flex
                  direction="vertical"
                  style={{ width: 150, flexShrink: 0 }}
                >
                  <Select
                    value={labelFilter}
                    parentWidth
                    options={[
                      { value: 'all', label: 'All labels' },
                      ...labels.map((label) => ({
                        value: label.id,
                        label: label.name,
                      })),
                    ]}
                    onChange={(value) => setLabelFilter(value as string)}
                  />
                </Flex>
                <Flex
                  direction="vertical"
                  style={{ width: 150, flexShrink: 0 }}
                >
                  <Select
                    value={priorityFilter}
                    parentWidth
                    options={[
                      { value: 'all', label: 'All priorities' },
                      ...PRIORITY_OPTIONS,
                    ]}
                    onChange={(value) => setPriorityFilter(value as string)}
                  />
                </Flex>
                <Flex style={{ flex: 1 }} />
                <Text size={2} color="muted" nowrap>
                  {filtered.length} of {tasks.length} cards
                </Text>
              </Flex>

              <Flex
                style={{
                  flex: 1,
                  overflowX: 'auto',
                  overflowY: 'hidden',
                }}
              >
                <Flex
                  gap="m"
                  align="start"
                  style={{ paddingBlock: 4, width: 'max-content' }}
                >
                  {visibleColumns.map((column) => (
                    <BoardColumn
                      key={column.id}
                      column={column}
                      cards={filtered.filter(
                        (task) => task.columnId === column.id,
                      )}
                      totalInColumn={
                        tasks.filter((task) => task.columnId === column.id)
                          .length
                      }
                      members={members}
                      labels={labels}
                      columns={columns}
                      defaultPriority={defaultPriority}
                      showCovers={showCovers}
                      compactCards={compactCards}
                      onCreate={createTask}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}

                  <Box
                    material="hatch"
                    tone="neutral"
                    shape="rounded"
                    radius="16px"
                    pressable
                    focusable
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setView('settings');
                      setSettingsTab('columns');
                    }}
                    style={{
                      width: 300,
                      flexShrink: 0,
                      minHeight: 120,
                      cursor: 'pointer',
                    }}
                  >
                    <Flex
                      direction="vertical"
                      align="center"
                      justify="center"
                      gap="xs"
                      style={{ height: '100%', padding: 16 }}
                    >
                      <Plus size={18} />
                      <Text size={2} color="muted">
                        Add or edit columns
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </>
          )}
        </Screen.Content>

        <Screen.Footer>
          <Flex justify="between" align="center">
            <Text size={2} color="muted">
              {boardName} · {tasks.length} cards
            </Text>
            <Text size={2} color="muted">
              {members.length} members · synced just now
            </Text>
          </Flex>
        </Screen.Footer>
      </Screen>
    );
  },
};
