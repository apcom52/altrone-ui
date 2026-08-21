import { Meta, StoryObj } from '@storybook/react';
import { Flex, NavigationList, Screen, Text, Toolbar } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { useState } from 'react';
import { Archive, Inbox, Mail, Send } from 'lucide-react';

const story: Meta<typeof Screen.ListDetail> = {
  title: 'Components/Containers/Screen/ListDetail',
  component: Screen.ListDetail,
  decorators: [StorybookDecorator],
};

export default story;

const MESSAGES = [
  { id: 1, from: 'Ada Lovelace', subject: 'Analytical Engine notes' },
  { id: 2, from: 'Grace Hopper', subject: 'Compiler review' },
  { id: 3, from: 'Alan Turing', subject: 'Machine test results' },
];

export const Overview: StoryObj<typeof Screen.ListDetail> = {
  name: 'Using ListDetail',
  render: () => {
    const [selected, setSelected] = useState(MESSAGES[0].id);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const message = MESSAGES.find((m) => m.id === selected)!;

    return (
      <Screen.ListDetail
        list={
          <Flex direction="vertical" gap="xs">
            {MESSAGES.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelected(m.id)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-s)',
                  cursor: 'pointer',
                  background:
                    m.id === selected ? 'var(--accent-a4)' : 'transparent',
                }}
              >
                <Text block size={3} weight="medium">
                  {m.from}
                </Text>
                <Text block size={3} color="muted">
                  {m.subject}
                </Text>
              </div>
            ))}
          </Flex>
        }
        detail={
          <Flex direction="vertical" gap="s">
            <Text block size={7} weight="bold">
              {message.subject}
            </Text>
            <Text block size={4} color="muted">
              From {message.from}
            </Text>
            <Text block size={4}>
              Selecting which message is open, fetching its content, marking it
              read — all of that is the consumer&rsquo;s own state.{' '}
              <code>Screen.ListDetail</code> only lays the two panes out side by
              side.
            </Text>
          </Flex>
        }
      >
        <Screen.Sidebar collapsed={sidebarCollapsed}>
          <NavigationList>
            <NavigationList.Group title="Mail">
              <NavigationList.Link icon={<Inbox />} label="Inbox" selected />
              <NavigationList.Link icon={<Send />} label="Sent" />
              <NavigationList.Link icon={<Archive />} label="Archive" />
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>
        <Screen.Header>
          <Toolbar>
            <Toolbar.Leading>
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={sidebarCollapsed}
                  onClick={() => setSidebarCollapsed((v) => !v)}
                />
              </Toolbar.Group>
            </Toolbar.Leading>
            <Toolbar.Center>
              <Text weight="bold">
                <Mail size={16} style={{ verticalAlign: -3, marginRight: 6 }} />
                Inbox
              </Text>
            </Toolbar.Center>
          </Toolbar>
        </Screen.Header>
      </Screen.ListDetail>
    );
  },
};
