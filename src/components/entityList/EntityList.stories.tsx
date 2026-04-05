import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { EntityList } from './EntityList.tsx';
import {
  AlertCircle,
  AlertTriangle,
  Archive,
  ArrowDown,
  Bug,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Download,
  Ellipsis,
  Eye,
  FileImage,
  FileText,
  FileVideo,
  FolderOpen,
  Lock,
  MessageSquare,
  Music,
  Pencil,
  Trash,
  XCircle,
} from 'lucide-react';
import { Button } from 'components/button/Button.tsx';
import { Dropdown } from 'components/dropdown/index.ts';
import { Label } from 'components/label/Label.tsx';
import { Checkbox } from 'components/checkbox/index.ts';
import { useState } from 'react';

const story: Meta<typeof EntityList> = {
  title: 'Components/Display/EntityList',
  component: EntityList,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const EmptyStory: StoryObj<typeof Flex> = {
  name: 'Using EntityList',
  render: () => {
    const [selectable, setSelectable] = useState(false);

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Using standard EntityList
        </Text>
        <Checkbox checked={selectable} onChange={setSelectable}>Selectable mode</Checkbox>
        <EntityList selectable={selectable}>
          <EntityList.Item
            title="Анна Петрова"
            icon={<FileText />}
            subtitle="Менеджер проектов · anna.p@company.ru"
            meta="Последняя активность: 2 ч назад"
          />
          <EntityList.Item
            title="Дмитрий Козлов"
            subtitle="Frontend-разработчик · d.kozlov@dev.io"
            meta="В проекте «Портал» · 3 задачи"
          >
            <Button icon={<Eye />} showLabel={false} label="Посмотреть" />
            <Dropdown content={
              <Dropdown.Menu>
                <Dropdown.Action label="Edit" />
                <Dropdown.Action label="Copy" />
                <Dropdown.Action danger label="Remove" icon={<Trash />} />
              </Dropdown.Menu>
            }>
              <Button icon={<Ellipsis />} showLabel={false} label="Actions" />
            </Dropdown>
          </EntityList.Item>
          <EntityList.Item
            title="Елена Соколова"
            subtitle="UX-дизайнер · elena.s@design.studio"
            meta="Черновик макетов: 5"
            onClick={() => alert('clicked')}
          />
          <EntityList.Item
            title="Заказ #2847"
            subtitle="ООО «Технопром» · 12 450 ₽"
            meta="Ожидает оплаты · до 10.02.2025"
          />
          <EntityList.Item
            title="Проект «Альфа»"
            subtitle="Веб-платформа для клиентов"
            meta="Прогресс: 67% · 4 участника"
          >
            <Label color="danger" variant="soft">Checking</Label>
          </EntityList.Item>
          <EntityList.Item
            title="Маргарита Волкова"
            subtitle="Бэкенд-разработчик · m.volkova@api.dev"
            meta="Спринт 12 · 8 коммитов"
          />
          <EntityList.Item
            title="Склад «Центральный»"
            subtitle="г. Москва, ул. Складская, 15"
            meta="Остаток: 1 247 позиций · 3 приёмки сегодня"
            onClick={() => alert('clicked')}
            disabled
          />
        </EntityList>
      </Flex>
    );
  },
};

// ─── Story 1: File Manager ────────────────────────────────────────────────────

type FileItem = {
  id: string;
  name: string;
  subtitle: string;
  meta: string;
  icon: React.ReactNode;
  kind: 'folder' | 'document' | 'image' | 'video' | 'audio' | 'archive';
  locked?: boolean;
  modified?: string;
};

const FILES: FileItem[] = [
  {
    id: 'f1',
    name: 'Design Assets',
    subtitle: 'Folder · 38 items',
    meta: 'Modified 10 min ago · 1.2 GB',
    icon: <FolderOpen />,
    kind: 'folder',
  },
  {
    id: 'f2',
    name: 'Sprint 24 Recordings',
    subtitle: 'Folder · 6 items',
    meta: 'Modified yesterday · 4.7 GB',
    icon: <FolderOpen />,
    kind: 'folder',
  },
  {
    id: 'f3',
    name: 'Product Requirements v3.docx',
    subtitle: 'Word document · Shared with team',
    meta: 'Modified 2 days ago · 84 KB',
    icon: <FileText />,
    kind: 'document',
  },
  {
    id: 'f4',
    name: 'Homepage Redesign — Final.fig',
    subtitle: 'Figma export · Last edited by Elena',
    meta: 'Modified 3 days ago · 22 MB',
    icon: <FileImage />,
    kind: 'image',
  },
  {
    id: 'f5',
    name: 'Q1 2025 Presentation.pptx',
    subtitle: 'PowerPoint · Read-only access',
    meta: 'Modified 1 week ago · 14 MB',
    icon: <FileText />,
    kind: 'document',
  },
  {
    id: 'f6',
    name: 'Onboarding Demo v2.mp4',
    subtitle: 'Video · 1920×1080',
    meta: 'Modified 2 weeks ago · 310 MB',
    icon: <FileVideo />,
    kind: 'video',
  },
  {
    id: 'f7',
    name: 'Brand Kit 2025.zip',
    subtitle: 'Archive · Logos, fonts, color swatches',
    meta: 'Modified 1 month ago · 88 MB',
    icon: <Archive />,
    kind: 'archive',
  },
  {
    id: 'f8',
    name: 'UI Sound Effects.mp3',
    subtitle: 'Audio · 14 tracks',
    meta: 'Modified 2 months ago · 6.4 MB',
    icon: <Music />,
    kind: 'audio',
  },
  {
    id: 'f9',
    name: 'server-backup-2024.tar.gz',
    subtitle: 'System archive · Protected',
    meta: 'Modified 6 months ago · 2.1 GB',
    icon: <Lock />,
    kind: 'archive',
    locked: true,
  },
];

const KIND_LABEL: Record<FileItem['kind'], { label: string; color: React.ComponentProps<typeof Label>['color'] }> = {
  folder:   { label: 'Folder',   color: 'blue' },
  document: { label: 'Document', color: 'indigo' },
  image:    { label: 'Image',    color: 'pink' },
  video:    { label: 'Video',    color: 'purple' },
  audio:    { label: 'Audio',    color: 'teal' },
  archive:  { label: 'Archive',  color: 'amber' },
};

export const FileManagerStory: StoryObj<typeof Flex> = {
  name: 'File Manager',
  render: () => {
    const [selectable, setSelectable] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);

    const handleSelect = (id: string, checked: boolean) => {
      setSelectedCount((n) => checked ? n + 1 : n - 1);
    };

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>Project Storage</Text>
          <Text color="secondary" block>altrone-ui / design-system / assets</Text>
        </Flex>

        <Flex gap="m" align="center">
          <Checkbox
            checked={selectable}
            onChange={(v) => { setSelectable(v); setSelectedCount(0); }}
          >
            Select files
          </Checkbox>
          {selectable && selectedCount > 0 && (
            <>
              <Text color="secondary">{selectedCount} selected</Text>
              <Button size="s" label="Download selected" icon={<Download />} />
              <Button size="s" label="Delete" icon={<Trash />} />
            </>
          )}
        </Flex>

        <EntityList selectable={selectable}>
          {FILES.map((file) => {
            const { label, color } = KIND_LABEL[file.kind];

            if (file.locked) {
              return (
                <EntityList.Item
                  key={file.id}
                  title={file.name}
                  subtitle={file.subtitle}
                  meta={file.meta}
                  icon={file.icon}
                  disabled
                >
                  <Label variant="soft" color="default">Locked</Label>
                </EntityList.Item>
              );
            }

            if (file.kind === 'folder') {
              return (
                <EntityList.Item
                  key={file.id}
                  title={file.name}
                  subtitle={file.subtitle}
                  meta={file.meta}
                  icon={file.icon}
                  onSelect={(checked, e) => handleSelect(file.id, checked)}
                  asChild
                >
                  <button onClick={() => alert(`Opening folder: ${file.name}`)} />
                </EntityList.Item>
              );
            }

            return (
              <EntityList.Item
                key={file.id}
                title={file.name}
                subtitle={file.subtitle}
                meta={file.meta}
                icon={file.icon}
                onSelect={(checked, e) => handleSelect(file.id, checked)}
              >
                <Label variant="soft" color={color} size="s">{label}</Label>
                <Button
                  icon={<Download />}
                  showLabel={false}
                  label="Download"
                  size="s"
                  onClick={() => alert(`Downloading ${file.name}`)}
                />
                <Dropdown
                  content={
                    <Dropdown.Menu>
                      <Dropdown.Action label="Rename" icon={<Pencil />} />
                      <Dropdown.Action label="Copy link" icon={<ChevronRight />} />
                      <Dropdown.Action danger label="Delete" icon={<Trash />} />
                    </Dropdown.Menu>
                  }
                >
                  <Button icon={<Ellipsis />} showLabel={false} label="More actions" size="s" />
                </Dropdown>
              </EntityList.Item>
            );
          })}
        </EntityList>
      </Flex>
    );
  },
};

// ─── Story 2: Issue Tracker ───────────────────────────────────────────────────

type IssueStatus = 'open' | 'in_progress' | 'blocked' | 'closed' | 'draft';
type IssuePriority = 'critical' | 'high' | 'medium' | 'low';

type Issue = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  assignee: string;
  sprint: string;
  status: IssueStatus;
  priority: IssuePriority;
  comments: number;
  archived?: boolean;
};

const ISSUES: Issue[] = [
  {
    id: 'i1', number: 1142,
    title: 'Auth token expires silently on mobile',
    subtitle: 'iOS 17 users lose session without redirect to login',
    assignee: 'D. Kozlov', sprint: 'Sprint 24',
    status: 'blocked', priority: 'critical', comments: 8,
  },
  {
    id: 'i2', number: 1138,
    title: 'Add keyboard navigation to Dropdown',
    subtitle: 'Arrow keys and Escape should control open/close state',
    assignee: 'A. Petrova', sprint: 'Sprint 24',
    status: 'in_progress', priority: 'high', comments: 3,
  },
  {
    id: 'i3', number: 1134,
    title: 'Dark mode flicker on initial load',
    subtitle: 'Theme applied after hydration causes a visible flash',
    assignee: 'E. Sokolova', sprint: 'Sprint 24',
    status: 'in_progress', priority: 'high', comments: 5,
  },
  {
    id: 'i4', number: 1129,
    title: 'Pagination resets on filter change',
    subtitle: 'Switching filter tab should not reset current page',
    assignee: 'M. Volkova', sprint: 'Sprint 23',
    status: 'open', priority: 'medium', comments: 1,
  },
  {
    id: 'i5', number: 1127,
    title: 'DatePicker locale support for `fr`',
    subtitle: 'Month/day names should follow French locale',
    assignee: 'O. Novikova', sprint: 'Sprint 23',
    status: 'open', priority: 'medium', comments: 0,
  },
  {
    id: 'i6', number: 1121,
    title: 'Tooltip arrow misaligned on `bottom-left`',
    subtitle: 'Arrow shifts 4px left when placement is bottom-left',
    assignee: 'unassigned', sprint: 'Backlog',
    status: 'draft', priority: 'low', comments: 0,
  },
  {
    id: 'i7', number: 1115,
    title: 'NumberInput allows chars on Android keyboard',
    subtitle: 'Virtual keyboard bypasses type=number restriction',
    assignee: 'D. Kozlov', sprint: 'Sprint 23',
    status: 'closed', priority: 'medium', comments: 4,
  },
  {
    id: 'i8', number: 1098,
    title: 'Fix SSR crash in Toast provider',
    subtitle: 'createPortal called during server render',
    assignee: 'A. Petrova', sprint: 'Sprint 22',
    status: 'closed', priority: 'high', comments: 11,
  },
  {
    id: 'i9', number: 982,
    title: 'Legacy renderFunc API in NavigationList',
    subtitle: 'Should be replaced with asChild pattern',
    assignee: 'archived', sprint: 'Sprint 18',
    status: 'open', priority: 'low', comments: 2,
    archived: true,
  },
];

const STATUS_CONFIG: Record<IssueStatus, { label: string; color: React.ComponentProps<typeof Label>['color']; icon: React.ReactNode }> = {
  open:        { label: 'Open',        color: 'blue',    icon: <Circle size={16} /> },
  in_progress: { label: 'In Progress', color: 'amber',   icon: <Clock size={16} /> },
  blocked:     { label: 'Blocked',     color: 'red',     icon: <XCircle size={16} /> },
  closed:      { label: 'Closed',      color: 'teal',    icon: <CheckCircle2 size={16} /> },
  draft:       { label: 'Draft',       color: 'default', icon: <Circle size={16} /> },
};

const PRIORITY_ICON: Record<IssuePriority, React.ReactNode> = {
  critical: <AlertCircle size={16} color="var(--red-9)" />,
  high:     <AlertTriangle size={16} color="var(--amber-9)" />,
  medium:   <Bug size={16} color="var(--blue-9)" />,
  low:      <ArrowDown size={16} color="var(--text-1)" />,
};

type IssueFilter = 'all' | IssueStatus;

export const IssueTrackerStory: StoryObj<typeof Flex> = {
  name: 'Issue Tracker',
  render: () => {
    const [selectable, setSelectable] = useState(false);
    const [filter, setFilter] = useState<IssueFilter>('all');
    const [selectedCount, setSelectedCount] = useState(0);

    const handleSelect = (_: boolean) => {
      setSelectedCount((n) => _ ? n + 1 : n - 1);
    };

    const visible = ISSUES.filter((issue) =>
      filter === 'all' || issue.status === filter,
    );

    const FILTERS: { key: IssueFilter; label: string }[] = [
      { key: 'all',        label: 'All' },
      { key: 'open',       label: 'Open' },
      { key: 'in_progress',label: 'In Progress' },
      { key: 'blocked',    label: 'Blocked' },
      { key: 'closed',     label: 'Closed' },
    ];

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 740 }}>
        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>Issues</Text>
          <Text color="secondary" block>altrone-ui · {ISSUES.length} total</Text>
        </Flex>

        <Flex gap="s" align="center" wrap>
          {FILTERS.map(({ key, label }) => (
            <Button
              key={key}
              label={label}
              size="s"
              onClick={() => { setFilter(key); setSelectedCount(0); }}
            />
          ))}
        </Flex>

        <Flex gap="m" align="center">
          <Checkbox
            checked={selectable}
            onChange={(v) => { setSelectable(v); setSelectedCount(0); }}
          >
            Bulk select
          </Checkbox>
          {selectable && selectedCount > 0 && (
            <>
              <Text color="secondary">{selectedCount} selected</Text>
              <Button size="s" label="Close issues" icon={<CheckCircle2 />} />
              <Button size="s" label="Delete" icon={<Trash />} />
            </>
          )}
        </Flex>

        <EntityList selectable={selectable}>
          {visible.map((issue) => {
            const { label, color, icon: statusIcon } = STATUS_CONFIG[issue.status];

            if (issue.archived) {
              return (
                <EntityList.Item
                  key={issue.id}
                  icon={PRIORITY_ICON[issue.priority]}
                  title={`#${issue.number} ${issue.title}`}
                  subtitle={issue.subtitle}
                  meta={`${issue.assignee} · archived`}
                  disabled
                >
                  <Label variant="soft" color="default" size="s">Archived</Label>
                </EntityList.Item>
              );
            }

            if (issue.status === 'closed') {
              return (
                <EntityList.Item
                  key={issue.id}
                  icon={PRIORITY_ICON[issue.priority]}
                  title={`#${issue.number} ${issue.title}`}
                  subtitle={issue.subtitle}
                  meta={`${issue.assignee} · ${issue.sprint}`}
                  onSelect={handleSelect}
                >
                  <Label variant="soft" color={color} size="s">{label}</Label>
                  <Button
                    icon={<Eye />}
                    showLabel={false}
                    label="View issue"
                    size="s"
                    onClick={() => alert(`Opening issue #${issue.number}`)}
                  />
                </EntityList.Item>
              );
            }

            return (
              <EntityList.Item
                key={issue.id}
                icon={PRIORITY_ICON[issue.priority]}
                title={`#${issue.number} ${issue.title}`}
                subtitle={issue.subtitle}
                meta={`${issue.assignee} · ${issue.sprint}`}
                onSelect={handleSelect}
                asChild
              >
                <button onClick={() => alert(`Opening issue #${issue.number}`)} />
              </EntityList.Item>
            );
          })}
        </EntityList>

        {visible.length === 0 && (
          <Text color="secondary" block align="center">No issues match this filter</Text>
        )}
      </Flex>
    );
  },
};

export default story;
