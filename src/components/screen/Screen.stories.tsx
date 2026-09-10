import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Form,
  NavigationList,
  Result,
  Screen,
  Text,
  TextInput,
  Toolbar,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import {
  Bell,
  Calendar,
  Compass,
  Feather,
  FileText,
  Folder,
  Hash,
  Home,
  Inbox,
  LayoutGrid,
  Plus,
  Send,
  Settings,
  Star,
  Users,
} from 'lucide-react';
/**
 * `Screen` is a bare layout shell — a CSS grid with four zones
 * (`Screen.Header`, `Screen.Sidebar`, `Screen.Content`, `Screen.Footer`).
 * These stories are small application skeletons, each reaching for a
 * different layout approach the primitive supports.
 */
const story: Meta<typeof Screen> = {
  title: 'Components/Core/Screen',
  component: Screen,
  decorators: [StorybookDecorator],
  parameters: {
    /* StorybookDecorator drops its wrapper padding for `fullscreen` stories,
       so Screen bleeds to every canvas edge and its footer sticks to the
       bottom. */
    layout: 'fullscreen',
    chromatic: { modes: { light: allModes['light desktop'] } },
  },
};

export default story;

const Tile = ({
  children,
  h = 64,
}: {
  children?: React.ReactNode;
  h?: number;
}) => (
  <Flex
    align="center"
    style={{
      minHeight: h,
      padding: '10px 14px',
      borderRadius: 'var(--radius-m)',
      background: 'var(--accent-a3)',
    }}
  >
    <Text size={3}>{children}</Text>
  </Flex>
);

const Card = ({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) => (
  <Box material="plate" shape="rounded" radius="20px">
    <Flex direction="vertical" gap="xs">
      <Text size={2} color="muted">
        {title}
      </Text>
      <Text size={7} weight="bold">
        {value}
      </Text>
      <Text size={2} color="success">
        {hint}
      </Text>
    </Flex>
  </Box>
);

/* ─────────────────────────────────────────────────────────────
 * 1. Mail client — fixed full-width header, folder sidebar
 * ──────────────────────────────────────────────────────────── */

export const MailClient: StoryObj<typeof Screen> = {
  name: 'Mail client — header over sidebar',
  parameters: {
    docs: {
      description: {
        story:
          'The classic desktop app frame: a fixed, full-width glass header that runs edge to edge (it already paints the frosted bar), with the folder sidebar sitting on top of its leading corner. Fill it with a `Toolbar variant="floating" size="m"`.',
      },
    },
  },
  render: () => (
    <Screen title="Mail">
      <Screen.Header>
        <Toolbar variant="floating" size="m">
          <Toolbar.Logo>
            <img
              src="https://help.apple.com/assets/6940590395B73B67500DF914/69405904627DAC39E4013406/en_US/610a7e660092193773855879a591dc48.png"
              width={36}
              height={36}
            />
          </Toolbar.Logo>
          <Toolbar.Title label="Mail" />
          <Toolbar.Separator />
          <Toolbar.Group>
            <Toolbar.SearchAction showLabel={false} />
            <Toolbar.Action
              label="Notifications"
              icon={<Bell />}
              showLabel={false}
            />
          </Toolbar.Group>
          <Toolbar.Group>
            <Avatar firstName="Ada" lastName="Lovelace" />
          </Toolbar.Group>
        </Toolbar>
      </Screen.Header>
      <Screen.Sidebar>
        <NavigationList>
          <NavigationList.Group title="Mailboxes">
            <NavigationList.Link
              icon={<Inbox />}
              label="Inbox"
              badge={12}
              selected
            />
            <NavigationList.Link icon={<Star />} label="Starred" />
            <NavigationList.Link icon={<Send />} label="Sent" />
            <NavigationList.Link icon={<FileText />} label="Drafts" badge={3} />
          </NavigationList.Group>
          <NavigationList.Group title="Labels">
            <NavigationList.Link icon={<Hash />} label="Work" />
            <NavigationList.Link icon={<Hash />} label="Personal" />
          </NavigationList.Group>
        </NavigationList>
      </Screen.Sidebar>
      <Screen.Content>
        <Flex direction="vertical" gap="s">
          <Text size={6} weight="bold" block>
            Inbox
          </Text>
          {[
            'Design review notes',
            'Re: Q3 roadmap',
            'Your invoice is ready',
            'Welcome to the team!',
            'Lunch on Friday?',
          ].map((subject) => (
            <Tile key={subject} h={56}>
              {subject}
            </Tile>
          ))}
        </Flex>
      </Screen.Content>
    </Screen>
  ),
};

/* ─────────────────────────────────────────────────────────────
 * 2. Analytics — collapsible sidebar, card grid, status footer
 * ──────────────────────────────────────────────────────────── */

export const AnalyticsDashboard: StoryObj<typeof Screen> = {
  name: 'Dashboard — collapsible sidebar + footer',
  parameters: { chromatic: { disable: true } },
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Screen title="Analytics">
        <Screen.Header>
          <Toolbar variant="floating" size="m">
            <Toolbar.Group>
              <Toolbar.SidebarToggleAction
                collapsed={collapsed}
                onClick={() => setCollapsed((v) => !v)}
              />
            </Toolbar.Group>
            <Toolbar.Title label="Overview" />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.Action
                label="Range"
                icon={<Calendar />}
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action label="Add widget" icon={<Plus />} />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>
        <Screen.Sidebar
          collapsed={collapsed}
          onClose={() => setCollapsed(true)}
        >
          <NavigationList>
            <NavigationList.Group title="Reports">
              <NavigationList.Link icon={<Home />} label="Overview" selected />
              <NavigationList.Link icon={<Users />} label="Audience" />
              <NavigationList.Link icon={<LayoutGrid />} label="Behaviour" />
              <NavigationList.Link icon={<Compass />} label="Acquisition" />
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>
        <Screen.Content>
          <div
            style={{
              display: 'grid',
              gap: 'var(--space-section)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            }}
          >
            <Card title="Visitors" value="48.2k" hint="+12% WoW" />
            <Card title="Sign-ups" value="1,904" hint="+4% WoW" />
            <Card title="Revenue" value="$92.4k" hint="+18% WoW" />
            <Card title="Churn" value="1.1%" hint="−0.3pt WoW" />
          </div>
        </Screen.Content>
        <Screen.Footer>
          <Flex justify="between" align="center">
            <Text size={2} color="muted">
              Last synced 2 minutes ago
            </Text>
            <Text size={2} color="muted">
              4 data sources connected
            </Text>
          </Flex>
        </Screen.Footer>
      </Screen>
    );
  },
};

/* ─────────────────────────────────────────────────────────────
 * 3. Reader — no sidebar, chrome-light, centered column
 * ──────────────────────────────────────────────────────────── */

export const Reader: StoryObj<typeof Screen> = {
  name: 'Reader — chrome-light, size-constrained',
  parameters: {
    docs: {
      description: {
        story:
          'No sidebar, a minimal header, and `size="m"` to hold the text column to a comfortable measure. `Screen.Content` centres itself inside the grid.',
      },
    },
  },
  render: () => (
    <Screen title="The Timeless Way of Building" size="m">
      <Screen.Header>
        <Toolbar variant="floating" size="m">
          <Toolbar.Logo>
            <img
              src="https://help.apple.com/assets/67DB47E269E8D943E20D7C8C/67DB47E569E8D943E20D7C92/en_US/efdd967a11ce8c7e441948d3f26510ce.png"
              width={32}
              height={32}
            />
          </Toolbar.Logo>
          <Toolbar.Title label="Essays" />
          <Toolbar.Separator />
          <Toolbar.Action label="Subscribe" />
        </Toolbar>
      </Screen.Header>
      <Screen.Content>
        <Flex direction="vertical" gap="m">
          <Text size={8} weight="bold" block>
            The Timeless Way of Building
          </Text>
          <Text size={3} color="muted" block>
            12 min read · Christopher Alexander
          </Text>
          {[...Array(6)].map((_, i) => (
            <Text key={i} size={4} block>
              There is one timeless way of building. It is thousands of years
              old, and the same today as it has always been. The great
              traditional buildings of the past, the villages and tents and
              temples in which man feels at home, have always been made by
              people who were very close to the center of this way.
            </Text>
          ))}
        </Flex>
      </Screen.Content>
    </Screen>
  ),
};

/* ─────────────────────────────────────────────────────────────
 * 4. Kanban — header + sidebar + edge-to-edge scrolling board
 * ──────────────────────────────────────────────────────────── */

export const KanbanBoard: StoryObj<typeof Screen> = {
  name: 'Kanban — edge-to-edge content',
  parameters: {
    docs: {
      description: {
        story:
          'A board that has to bleed to the window edges and scroll horizontally: keep the zones, but zero out `Screen.Content`’s padding and let the board own the overflow.',
      },
    },
  },
  render: () => (
    <Screen title="Sprint board">
      <Screen.Header>
        <Toolbar variant="floating" size="m">
          <Toolbar.Title label="Sprint 24" />
          <Toolbar.Separator />
          <Toolbar.Action label="New task" icon={<Plus />} />
        </Toolbar>
      </Screen.Header>
      <Screen.Sidebar>
        <NavigationList>
          <NavigationList.Group title="Boards">
            <NavigationList.Link
              icon={<LayoutGrid />}
              label="Sprint 24"
              selected
            />
            <NavigationList.Link icon={<LayoutGrid />} label="Backlog" />
            <NavigationList.Link icon={<LayoutGrid />} label="Roadmap" />
          </NavigationList.Group>
        </NavigationList>
      </Screen.Sidebar>
      <Screen.Content style={{ padding: 0, overflowX: 'auto' }}>
        <Flex
          gap="m"
          style={{ padding: 'var(--space-content)', width: 'max-content' }}
        >
          {['Backlog', 'In progress', 'Review', 'Done'].map((col) => (
            <Flex
              key={col}
              direction="vertical"
              gap="s"
              style={{
                width: 260,
                padding: 12,
                borderRadius: 'var(--radius-l)',
                background: 'var(--gray-a2)',
              }}
            >
              <Text size={3} weight="bold">
                {col}
              </Text>
              {[...Array(3)].map((_, i) => (
                <Tile key={i} h={72}>
                  {col} card {i + 1}
                </Tile>
              ))}
            </Flex>
          ))}
        </Flex>
      </Screen.Content>
    </Screen>
  ),
};

/* ─────────────────────────────────────────────────────────────
 * 5. Adaptive — sidebar becomes an overlay drawer on narrow widths
 * ──────────────────────────────────────────────────────────── */

export const AdaptiveApp: StoryObj<typeof Screen> = {
  name: 'Adaptive — sidebar → overlay drawer',
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story:
          'Below `mobileBreakpoint` the sidebar leaves the grid and becomes an off-canvas panel with a scrim. Resize the preview narrow (or use the viewport toolbar); the same `collapsed` boolean drives both idioms, and `onClose` fires on scrim-click / Escape.',
      },
    },
  },
  render: () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
      <Screen title="Field app" mobileBreakpoint="lg">
        <Screen.Header>
          <Toolbar variant="floating" size="m">
            <Toolbar.SidebarToggleAction
              collapsed={collapsed}
              onClick={() => setCollapsed((v) => !v)}
            />
            <Toolbar.Title label="Today" />
          </Toolbar>
        </Screen.Header>
        <Screen.Sidebar
          collapsed={collapsed}
          onClose={() => setCollapsed(true)}
        >
          <NavigationList>
            <NavigationList.Group title="Menu">
              <NavigationList.Link icon={<Home />} label="Today" selected />
              <NavigationList.Link icon={<Calendar />} label="Schedule" />
              <NavigationList.Link icon={<Folder />} label="Jobs" />
              <NavigationList.Link icon={<Settings />} label="Settings" />
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>
        <Screen.Content>
          <Flex direction="vertical" gap="s">
            {[
              '08:00 Site inspection',
              '10:30 Client call',
              '13:00 Install',
              '16:00 Report',
            ].map((row) => (
              <Tile key={row}>{row}</Tile>
            ))}
          </Flex>
        </Screen.Content>
      </Screen>
    );
  },
};

/* ─────────────────────────────────────────────────────────────
 * 6. Sign in — no chrome, centered column
 * ──────────────────────────────────────────────────────────── */

export const SignIn: StoryObj<typeof Screen> = {
  name: 'Sign in — contentAlign="center"',
  parameters: {
    docs: {
      description: {
        story:
          'A single-task page with no app chrome: `contentAlign="center"` boxes the content dead centre, `size="s"` keeps the column narrow. The heading lives in the content, not a prop.',
      },
    },
  },
  render: () => (
    <Screen title="Sign in" contentAlign="center" size="s">
      <Screen.Content>
        <Flex
          direction="vertical"
          gap="l"
          style={{
            width: '100%',
            maxWidth: 360,
            padding: 24,
            borderRadius: 'var(--radius-xl)',
            background: 'var(--background-1)',
            boxShadow: 'var(--elevation-modal-shadow)',
          }}
        >
          <Text size={7} weight="bold" block>
            Welcome back
          </Text>
          <Form>
            <Flex direction="vertical" gap="m">
              <Form.Field label="Email" required>
                <TextInput type="email" placeholder="you@example.com" />
              </Form.Field>
              <Form.Field label="Password" required>
                <TextInput type="password" />
              </Form.Field>
              <Button label="Sign in" variant="submit" />
            </Flex>
          </Form>
        </Flex>
      </Screen.Content>
    </Screen>
  ),
};

/* ─────────────────────────────────────────────────────────────
 * 7. Not found — centered Result
 * ──────────────────────────────────────────────────────────── */

export const NotFound: StoryObj<typeof Screen> = {
  name: 'Not found — full-page Result',
  parameters: {
    docs: {
      description: {
        story:
          'Error / empty screens are just the `Result` component dropped into a centered `Screen` — no dedicated preset.',
      },
    },
  },
  render: () => (
    <Screen title="Page not found" contentAlign="center">
      <Screen.Content>
        <Result
          status="error"
          title="Page not found"
          description="The page you were looking for doesn't exist or was moved."
          actions={
            <Flex gap="s">
              <Button label="Go home" variant="submit" />
              <Button label="Contact support" />
            </Flex>
          }
        />
      </Screen.Content>
    </Screen>
  ),
};
