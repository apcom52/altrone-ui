import { StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { useState } from 'react';
import { DataTable } from '../DataTable.tsx';
import { Eye, Archive, Trash2 } from 'lucide-react';

type Task = {
  id: number;
  name: string;
  projectColor: string;
  status: string;
  priority: string;
  deadline: string;
  assignees: string[];
  progress: number;
  budget: number;
};

const TASKS: Task[] = [
  {
    id: 1,
    name: 'Auth service migration to OAuth 2.0',
    projectColor: '#6366f1',
    status: 'in-progress',
    priority: 'critical',
    deadline: '2025-03-28',
    assignees: ['alice', 'bob'],
    progress: 72,
    budget: 8000,
  },
  {
    id: 2,
    name: 'Design system token audit',
    projectColor: '#0ea5e9',
    status: 'review',
    priority: 'medium',
    deadline: '2025-04-10',
    assignees: ['carol'],
    progress: 90,
    budget: 2400,
  },
  {
    id: 3,
    name: 'Database query optimisation',
    projectColor: '#10b981',
    status: 'blocked',
    priority: 'high',
    deadline: '2025-04-05',
    assignees: ['dave'],
    progress: 40,
    budget: 3500,
  },
  {
    id: 4,
    name: 'Onboarding flow redesign',
    projectColor: '#f59e0b',
    status: 'planning',
    priority: 'medium',
    deadline: '2025-05-01',
    assignees: ['emma', 'carol'],
    progress: 10,
    budget: 6000,
  },
  {
    id: 5,
    name: 'Push notification pipeline',
    projectColor: '#6366f1',
    status: 'in-progress',
    priority: 'high',
    deadline: '2025-04-18',
    assignees: ['frank'],
    progress: 55,
    budget: 4200,
  },
  {
    id: 6,
    name: 'GDPR consent management',
    projectColor: '#ef4444',
    status: 'in-progress',
    priority: 'critical',
    deadline: '2025-04-01',
    assignees: ['alice', 'dave'],
    progress: 83,
    budget: 5500,
  },
  {
    id: 7,
    name: 'CI/CD pipeline upgrade',
    projectColor: '#10b981',
    status: 'done',
    priority: 'medium',
    deadline: '2025-03-20',
    assignees: ['bob'],
    progress: 100,
    budget: 1800,
  },
  {
    id: 8,
    name: 'Mobile app performance profiling',
    projectColor: '#ec4899',
    status: 'review',
    priority: 'high',
    deadline: '2025-04-22',
    assignees: ['grace', 'frank'],
    progress: 88,
    budget: 3000,
  },
  {
    id: 9,
    name: 'API rate limiter',
    projectColor: '#0ea5e9',
    status: 'done',
    priority: 'high',
    deadline: '2025-03-15',
    assignees: ['dave'],
    progress: 100,
    budget: 2200,
  },
  {
    id: 10,
    name: 'Error monitoring integration',
    projectColor: '#8b5cf6',
    status: 'in-progress',
    priority: 'medium',
    deadline: '2025-04-30',
    assignees: ['emma'],
    progress: 35,
    budget: 1500,
  },
  {
    id: 11,
    name: 'Dark mode for web app',
    projectColor: '#f59e0b',
    status: 'planning',
    priority: 'low',
    deadline: '2025-05-15',
    assignees: ['carol', 'grace'],
    progress: 5,
    budget: 3200,
  },
  {
    id: 12,
    name: 'Payment provider migration',
    projectColor: '#ef4444',
    status: 'blocked',
    priority: 'critical',
    deadline: '2025-04-12',
    assignees: ['alice', 'bob', 'dave'],
    progress: 25,
    budget: 12000,
  },
  {
    id: 13,
    name: 'Load testing — 10k concurrent users',
    projectColor: '#10b981',
    status: 'planning',
    priority: 'high',
    deadline: '2025-04-25',
    assignees: ['frank'],
    progress: 0,
    budget: 2800,
  },
  {
    id: 14,
    name: 'Accessibility audit (WCAG 2.2)',
    projectColor: '#0ea5e9',
    status: 'review',
    priority: 'medium',
    deadline: '2025-04-08',
    assignees: ['grace'],
    progress: 95,
    budget: 1600,
  },
  {
    id: 15,
    name: 'Offline mode — PWA',
    projectColor: '#6366f1',
    status: 'in-progress',
    priority: 'low',
    deadline: '2025-05-20',
    assignees: ['emma', 'bob'],
    progress: 48,
    budget: 5000,
  },
  {
    id: 16,
    name: 'Admin analytics dashboard',
    projectColor: '#8b5cf6',
    status: 'in-progress',
    priority: 'medium',
    deadline: '2025-04-20',
    assignees: ['carol', 'frank'],
    progress: 61,
    budget: 4500,
  },
  {
    id: 17,
    name: 'SSO integration — Okta',
    projectColor: '#ec4899',
    status: 'planning',
    priority: 'high',
    deadline: '2025-05-05',
    assignees: ['alice'],
    progress: 15,
    budget: 7000,
  },
  {
    id: 18,
    name: 'Batch email worker refactor',
    projectColor: '#f59e0b',
    status: 'done',
    priority: 'low',
    deadline: '2025-03-25',
    assignees: ['dave'],
    progress: 100,
    budget: 900,
  },
  {
    id: 19,
    name: 'Search indexing pipeline',
    projectColor: '#10b981',
    status: 'blocked',
    priority: 'high',
    deadline: '2025-04-03',
    assignees: ['bob', 'emma'],
    progress: 30,
    budget: 6200,
  },
  {
    id: 20,
    name: 'Two-factor auth (TOTP)',
    projectColor: '#6366f1',
    status: 'review',
    priority: 'critical',
    deadline: '2025-03-30',
    assignees: ['alice', 'grace'],
    progress: 97,
    budget: 3800,
  },
];

const TODAY = '2025-03-31';

const STATUS_STYLE: Record<string, [string, string, string]> = {
  planning: ['#f1f5f9', '#475569', 'Planning'],
  'in-progress': ['#eff6ff', '#1d4ed8', 'In Progress'],
  review: ['#faf5ff', '#7c3aed', 'Review'],
  done: ['#f0fdf4', '#15803d', 'Done'],
  blocked: ['#fef2f2', '#b91c1c', 'Blocked'],
};

const PRIORITY_STYLE: Record<string, [string, string, string]> = {
  critical: ['🔴', '#b91c1c', 'Critical'],
  high: ['🟠', '#c2410c', 'High'],
  medium: ['🟡', '#92400e', 'Medium'],
  low: ['🟢', '#15803d', 'Low'],
};

// Progress bar renderer
const ProgressBar = ({ value, status }: { value: number; status: string }) => {
  const color =
    status === 'blocked'
      ? '#ef4444'
      : status === 'done'
        ? '#22c55e'
        : '#6366f1';
  return (
    <Flex
      direction="horizontal"
      gap="xs"
      align="center"
      style={{ width: '100%' }}
    >
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 3,
          background: 'var(--border-1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            background: color,
            borderRadius: 3,
            transition: 'width 0.3s',
          }}
        />
      </div>
      <span
        style={{
          fontSize: 11,
          color: 'var(--text-1)',
          minWidth: 30,
          textAlign: 'right',
        }}
      >
        {value}%
      </span>
    </Flex>
  );
};

export const ProjectTrackerStory: StoryObj<typeof Flex> = {
  name: 'Project Tracker — Progress & Priority',
  render: () => {
    const [tasks, setTasks] = useState(TASKS);

    const archive = (id: number) =>
      setTasks((prev) => prev.filter((t) => t.id !== id));

    return (
      <Flex direction="vertical" gap="l">
        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold">
            Sprint Board
          </Text>
          <Text style={{ color: 'var(--text-1)' }}>
            Deadlines before {TODAY} are shown in red. Sort by Deadline or
            Progress to prioritise work. Use row actions to archive completed
            tasks.
          </Text>
        </Flex>
        <DataTable
          data={tasks}
          rowsPerPage={10}
          selectable
          columns={[
            {
              accessor: 'name',
              label: 'Task',
              filterable: 'string',
              type: 'custom',
              options: {
                renderReadMode: ({ item }) => {
                  const t = item as Task;
                  return (
                    <Flex direction="horizontal" gap="s" align="center">
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: t.projectColor,
                          flexShrink: 0,
                        }}
                      />
                      <Text>{t.name}</Text>
                    </Flex>
                  );
                },
              },
            },
            {
              accessor: 'status',
              label: 'Status',
              type: 'custom',
              filterable: 'select',
              sortable: true,
              width: 130,
              options: {
                renderReadMode: ({ value }) => {
                  const s = String(value);
                  const [bg, color, label] = STATUS_STYLE[s] ?? [
                    '#f1f5f9',
                    '#475569',
                    s,
                  ];
                  return (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 20,
                        background: bg,
                        color,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </span>
                  );
                },
              },
            },
            {
              accessor: 'priority',
              label: 'Priority',
              type: 'custom',
              filterable: 'select',
              sortable: true,
              width: 110,
              options: {
                renderReadMode: ({ value }) => {
                  const p = String(value);
                  const [icon, color, label] = PRIORITY_STYLE[p] ?? [
                    '⚪',
                    '#64748b',
                    p,
                  ];
                  return (
                    <span style={{ fontSize: 13, color, fontWeight: 600 }}>
                      {icon} {label}
                    </span>
                  );
                },
              },
            },
            {
              accessor: 'deadline',
              label: 'Deadline',
              type: 'custom',
              filterable: 'date',
              sortable: true,
              width: 110,
              options: {
                renderReadMode: ({ value, item }) => {
                  const t = item as Task;
                  const overdue = t.status !== 'done' && String(value) < TODAY;
                  return (
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: overdue ? 700 : 400,
                        color: overdue ? '#b91c1c' : 'inherit',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {overdue ? '⚠ ' : ''}
                      {String(value)}
                    </span>
                  );
                },
              },
            },
            {
              accessor: 'assignees',
              label: 'Assignees',
              type: 'select',
              filterable: true,
              width: 150,
            },
            {
              accessor: 'progress',
              label: 'Progress',
              type: 'custom',
              sortable: true,
              filterable: 'number',
              width: 160,
              options: {
                renderReadMode: ({ value, item }) => (
                  <ProgressBar
                    value={value as number}
                    status={(item as Task).status}
                  />
                ),
              },
            },
            {
              accessor: 'budget',
              label: 'Budget',
              type: 'currency',
              sortable: true,
              filterable: true,
              width: 110,
              options: { currency: 'USD' },
            },
          ]}
          renderRowActions={({ row }) => {
            const task = row as Task;
            return (
              <DataTable.RowActions>
                <DataTable.RowAction
                  label="View"
                  icon={<Eye size={14} />}
                  showLabel={false}
                  onClick={() => {}}
                />
                {task.status === 'done' && (
                  <DataTable.RowAction
                    label="Archive"
                    icon={<Archive size={14} />}
                    collapsed
                    onClick={() => archive(task.id)}
                  />
                )}
                <DataTable.RowAction
                  label="Delete"
                  icon={<Trash2 size={14} />}
                  collapsed
                  danger
                  onClick={() => archive(task.id)}
                />
              </DataTable.RowActions>
            );
          }}
        >
          {({ selectableMode, selectedItems }) =>
            selectableMode && selectedItems.length > 0 ? (
              <DataTable.Action
                label={`Move ${selectedItems.length} to next sprint`}
                onClick={() => {}}
              />
            ) : null
          }
        </DataTable>
      </Flex>
    );
  },
};
