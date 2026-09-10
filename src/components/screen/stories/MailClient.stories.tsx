import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Flex, NavigationList, Screen, Text, Toolbar } from 'components';
import { Bell, FileText, Hash, Inbox, Send, Star } from 'lucide-react';
import { screenMeta, Tile } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Mail client',
};

export default meta;

/**
 * The classic desktop app frame: a fixed, full-width glass header that runs
 * edge to edge (it already paints the frosted bar), with the folder sidebar
 * sitting on top of its leading corner. Fill the header with a
 * `Toolbar variant="floating" size="m"`.
 */
export const MailClient: StoryObj<typeof Screen> = {
  name: 'Mail client',
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
