import { Meta, StoryObj } from '@storybook/react';
import { Avatar, Flex, Progress, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Tabs } from './Tabs.tsx';
import { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  MessageSquare,
  Settings,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Clock,
  CheckCircle2,
  Circle,
} from 'lucide-react';

const story: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const TASKS = [
  {
    id: 1,
    title: 'Migrate auth service to OAuth 2.0',
    status: 'done',
    assignee: 'AK',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Design new onboarding flow',
    status: 'in-progress',
    assignee: 'MR',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Write API documentation for v3',
    status: 'in-progress',
    assignee: 'DS',
    priority: 'medium',
  },
  {
    id: 4,
    title: 'Fix memory leak in WebSocket handler',
    status: 'open',
    assignee: 'AK',
    priority: 'high',
  },
  {
    id: 5,
    title: 'Add dark mode support to dashboard',
    status: 'open',
    assignee: 'MR',
    priority: 'medium',
  },
  {
    id: 6,
    title: 'Set up E2E testing pipeline',
    status: 'open',
    assignee: 'DS',
    priority: 'low',
  },
  {
    id: 7,
    title: 'Optimise bundle size — remove lodash',
    status: 'done',
    assignee: 'PP',
    priority: 'medium',
  },
  {
    id: 8,
    title: 'Integrate Stripe billing',
    status: 'in-progress',
    assignee: 'PP',
    priority: 'high',
  },
];

const TEAM = [
  { key: 'AK', firstName: 'Alex', lastName: 'Kim', role: 'Tech Lead', tasks: 12, done: 9 },
  { key: 'MR', firstName: 'Maya', lastName: 'Reed', role: 'Product Designer', tasks: 8, done: 5 },
  { key: 'DS', firstName: 'Dan', lastName: 'Sousa', role: 'Backend Engineer', tasks: 10, done: 6 },
  { key: 'PP', firstName: 'Petra', lastName: 'Park', role: 'Frontend Engineer', tasks: 9, done: 7 },
];

const TEAM_BY_KEY = Object.fromEntries(TEAM.map((m) => [m.key, m]));

const DISCUSSIONS = [
  {
    id: 1,
    author: 'AK',
    title: 'Should we migrate to Bun for the build pipeline?',
    preview:
      'Ive been benchmarking Bun vs Node for our CI and the results are impressive — 3× faster installs and 40% faster test runs.',
    replies: 14,
    unread: true,
    time: '2h ago',
  },
  {
    id: 2,
    author: 'MR',
    title: 'New component API proposal — asChild pattern',
    preview:
      'Following Radix UI approach, Id like to propose adopting the asChild prop across all interactive components to support custom renderers.',
    replies: 7,
    unread: true,
    time: '5h ago',
  },
  {
    id: 3,
    author: 'PP',
    title: 'Release checklist for v3.0',
    preview:
      'Adding the final checklist before we cut the release branch. Please review and sign off on your sections by EOD Thursday.',
    replies: 22,
    unread: false,
    time: '1d ago',
  },
  {
    id: 4,
    author: 'DS',
    title: 'PostgreSQL connection pooling — lessons learned',
    preview:
      'After last weeks incident I did a deep dive into our pooling config. Heres what was wrong and how we fixed it.',
    replies: 9,
    unread: false,
    time: '2d ago',
  },
];

const ACTIVITY = [
  {
    icon: <GitCommit size={14} />,
    text: 'Dan Sousa pushed 3 commits to',
    target: 'feat/billing',
    time: '1h ago',
  },
  {
    icon: <GitPullRequest size={14} />,
    text: 'Petra Park opened PR',
    target: '#42 Remove lodash',
    time: '3h ago',
  },
  {
    icon: <CheckCircle2 size={14} />,
    text: 'Alex Kim closed task',
    target: 'Migrate auth to OAuth 2.0',
    time: '5h ago',
  },
  {
    icon: <AlertCircle size={14} />,
    text: 'Maya Reed filed issue',
    target: '#18 Onboarding CTA misaligned on mobile',
    time: '1d ago',
  },
  {
    icon: <GitPullRequest size={14} />,
    text: 'Petra Park merged PR',
    target: '#39 Bundle optimisation',
    time: '1d ago',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const statusIcon = (status: string) => {
  if (status === 'done')
    return <CheckCircle2 size={14} color="var(--teal-9)" />;
  if (status === 'in-progress')
    return <Clock size={14} color="var(--amber-9)" />;
  return <Circle size={14} color="var(--gray-8)" />;
};

const priorityColor = (p: string) =>
  p === 'high'
    ? 'var(--red-9)'
    : p === 'medium'
      ? 'var(--amber-9)'
      : 'var(--gray-8)';

// ─── Story ────────────────────────────────────────────────────────────────────

export const TabsStory: StoryObj<typeof Tabs> = {
  name: 'Using Tabs',
  render: () => {
    const [mainTab, setMainTab] = useState<
      'overview' | 'tasks' | 'team' | 'discussions' | 'settings'
    >('overview');
    const [taskFilter, setTaskFilter] = useState<
      'all' | 'open' | 'in-progress' | 'done'
    >('all');

    const visibleTasks = TASKS.filter(
      (t) => taskFilter === 'all' || t.status === taskFilter,
    );

    const openCount = TASKS.filter((t) => t.status === 'open').length;
    const unreadCount = DISCUSSIONS.filter((d) => d.unread).length;

    return (
      <Flex
        direction="vertical"
        gap="xl"
        style={{ maxWidth: '780px', margin: '0 auto' }}
      >
        {/* Project header */}
        <Flex direction="vertical" gap="s">
          <Text size={7} weight="bold" block>
            Nebula Platform
          </Text>
          <Text block color="muted">
            Core infrastructure and product — Q2 2025 milestone
          </Text>
        </Flex>

        {/* Main tabs */}
        <Tabs>
          <Tabs.Item
            icon={<LayoutDashboard size={14} />}
            label="Overview"
            selected={mainTab === 'overview'}
            onClick={() => setMainTab('overview')}
          />
          <Tabs.Item
            icon={<CheckSquare size={14} />}
            label="Tasks"
            badge={openCount}
            selected={mainTab === 'tasks'}
            onClick={() => setMainTab('tasks')}
          />
          <Tabs.Item
            icon={<Users size={14} />}
            label="Team"
            selected={mainTab === 'team'}
            onClick={() => setMainTab('team')}
          />
          <Tabs.Item
            icon={<MessageSquare size={14} />}
            label="Discussions"
            badge={unreadCount || undefined}
            selected={mainTab === 'discussions'}
            onClick={() => setMainTab('discussions')}
          />
          <Tabs.Item
            icon={<Settings size={14} />}
            label="Settings"
            showLabel={false}
            selected={mainTab === 'settings'}
            onClick={() => setMainTab('settings')}
          />
        </Tabs>

        {/* ── Overview ── */}
        {mainTab === 'overview' && (
          <Flex direction="vertical" gap="xl">
            <Flex direction="horizontal" gap="l">
              {[
                { label: 'Total tasks', value: TASKS.length },
                {
                  label: 'In progress',
                  value: TASKS.filter((t) => t.status === 'in-progress').length,
                },
                {
                  label: 'Completed',
                  value: TASKS.filter((t) => t.status === 'done').length,
                },
                { label: 'Open', value: openCount },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-1)',
                    background: 'var(--background-2)',
                  }}
                >
                  <Text size={7} weight="bold" block>
                    {stat.value}
                  </Text>
                  <Text size={3} color="muted" block>
                    {stat.label}
                  </Text>
                </div>
              ))}
            </Flex>

            <Flex direction="vertical" gap="m">
              <Text size={5} weight="bold" block>
                Sprint progress
              </Text>
              <Progress
                value={TASKS.filter((t) => t.status === 'done').length}
                max={TASKS.length}
              >
                {({ value, max }) => `${value} of ${max} tasks done`}
              </Progress>
            </Flex>

            <Flex direction="vertical" gap="m">
              <Text size={5} weight="bold" block>
                Recent activity
              </Text>
              <Flex direction="vertical" gap="s">
                {ACTIVITY.map((item, i) => (
                  <Flex key={i} direction="horizontal" gap="m" align="center">
                    <span style={{ color: 'var(--text-1)', flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    <Text size={3} color="muted">
                      {item.text}
                    </Text>
                    <Text size={3} weight="medium">
                      {item.target}
                    </Text>
                    <Text
                      size={3}
                      color="muted"
                      style={{ marginLeft: 'auto', flexShrink: 0 }}
                    >
                      {item.time}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        )}

        {/* ── Tasks ── */}
        {mainTab === 'tasks' && (
          <Flex direction="vertical" gap="l">
            {/* Second Tabs instance — filter tabs */}
            <Tabs>
              <Tabs.Item
                label="All"
                selected={taskFilter === 'all'}
                onClick={() => setTaskFilter('all')}
              />
              <Tabs.Item
                label="Open"
                badge={openCount}
                selected={taskFilter === 'open'}
                onClick={() => setTaskFilter('open')}
              />
              <Tabs.Item
                label="In progress"
                selected={taskFilter === 'in-progress'}
                onClick={() => setTaskFilter('in-progress')}
              />
              <Tabs.Item
                label="Done"
                selected={taskFilter === 'done'}
                onClick={() => setTaskFilter('done')}
              />
            </Tabs>

            <Flex direction="vertical" gap="s">
              {visibleTasks.map((task) => (
                <Flex
                  key={task.id}
                  direction="horizontal"
                  gap="m"
                  align="center"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-1)',
                    background: 'var(--background-2)',
                  }}
                >
                  {statusIcon(task.status)}
                  <Text style={{ flex: 1 }}>{task.title}</Text>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: priorityColor(task.priority),
                      flexShrink: 0,
                    }}
                  />
                  <Avatar
                    size="s"
                    firstName={TEAM_BY_KEY[task.assignee]?.firstName ?? task.assignee}
                    lastName={TEAM_BY_KEY[task.assignee]?.lastName}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
        )}

        {/* ── Team ── */}
        {mainTab === 'team' && (
          <Flex direction="vertical" gap="m">
            {TEAM.map((member) => (
              <Flex
                key={member.key}
                direction="horizontal"
                gap="l"
                align="center"
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-1)',
                  background: 'var(--background-2)',
                }}
              >
                <Avatar firstName={member.firstName} lastName={member.lastName} />
                <Flex direction="vertical" gap="xxs" style={{ flex: 1 }}>
                  <Text weight="bold">{member.firstName} {member.lastName}</Text>
                  <Text size={3} color="muted">
                    {member.role}
                  </Text>
                </Flex>
                <Flex direction="vertical" gap="xxs" style={{ width: '160px' }}>
                  <Text size={3} color="muted">
                    {member.done} / {member.tasks} tasks done
                  </Text>
                  <Progress size="s" value={member.done} max={member.tasks} />
                </Flex>
              </Flex>
            ))}
          </Flex>
        )}

        {/* ── Discussions ── */}
        {mainTab === 'discussions' && (
          <Flex direction="vertical" gap="m">
            {DISCUSSIONS.map((d) => (
              <Flex
                key={d.id}
                direction="horizontal"
                gap="l"
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: `1px solid ${d.unread ? 'var(--accent-6)' : 'var(--border-1)'}`,
                  background: d.unread
                    ? 'var(--accent-2)'
                    : 'var(--background-2)',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  size="s"
                  firstName={TEAM_BY_KEY[d.author]?.firstName ?? d.author}
                  lastName={TEAM_BY_KEY[d.author]?.lastName}
                />
                <Flex
                  direction="vertical"
                  gap="xs"
                  style={{ flex: 1, minWidth: 0 }}
                >
                  <Flex direction="horizontal" gap="m" align="center">
                    <Text weight={d.unread ? 'bold' : 'regular'} truncate>
                      {d.title}
                    </Text>
                    {d.unread && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'var(--accent-9)',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Flex>
                  <Text size={3} color="muted" truncate>
                    {d.preview}
                  </Text>
                  <Flex direction="horizontal" gap="m">
                    <Text size={3} color="muted">
                      {d.replies} replies
                    </Text>
                    <Text size={3} color="muted">
                      {d.time}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        )}

        {/* ── Settings ── */}
        {mainTab === 'settings' && (
          <Flex direction="vertical" gap="l">
            <Text size={5} weight="bold" block>
              Project settings
            </Text>
            {[
              { label: 'Project name', value: 'Nebula Platform' },
              { label: 'Visibility', value: 'Private' },
              { label: 'Default branch', value: 'main' },
              { label: 'Sprint duration', value: '2 weeks' },
            ].map((row) => (
              <Flex
                key={row.label}
                direction="horizontal"
                align="center"
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-1)',
                  background: 'var(--background-2)',
                }}
              >
                <Text color="muted" style={{ width: '180px', flexShrink: 0 }}>
                  {row.label}
                </Text>
                <Text weight="medium">{row.value}</Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    );
  },
};

export default story;
