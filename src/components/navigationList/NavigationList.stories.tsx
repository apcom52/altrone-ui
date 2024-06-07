import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Text, TextHeadingRoles } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { NavigationList } from './NavigationList.tsx';

const story: Meta<typeof NavigationList> = {
  title: 'Components/Navigation/NavigationList',
  component: NavigationList,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const TooltipStory: StoryObj<typeof NavigationList> = {
  name: 'Using NavigationList',
  render: () => {
    return (
      <Flex gap="large">
        <Text.Heading role={TextHeadingRoles.inner}>
          Standard NavigationList
        </Text.Heading>
        <div style={{ width: 350 }}>
          <NavigationList>
            <NavigationList.Group>
              <NavigationList.Link
                icon={<Icon i="arrow_back" />}
                label="Back"
              />
            </NavigationList.Group>
            <NavigationList.Group title="Personal settings">
              <NavigationList.Link icon={<Icon i="tune" />} label="Profile" />
              <NavigationList.Link
                icon={<Icon i="account_circle" />}
                label="Preferences"
              />
              <NavigationList.Link
                icon={<Icon i="notifications" />}
                label="Notifications"
              />
              <NavigationList.Link
                icon={<Icon i="keyboard_alt" />}
                label="Keyboard shortcuts"
              />
            </NavigationList.Group>
            <NavigationList.Group title="Product settings">
              <NavigationList.Link label="Attributes" />
              <NavigationList.Link label="Automations" selected />
              <NavigationList.Link label="Copilot" />
              <NavigationList.Link label="Group mentions" />
              <NavigationList.Link label="Import" />
              <NavigationList.Link label="Integrations" />
              <NavigationList.Link label="Task forms" />
            </NavigationList.Group>
            <NavigationList.Group title="Workspace settings">
              <NavigationList.Link label="General" />
              <NavigationList.Link
                icon={<Icon i="webhook" />}
                label="API & Webhooks"
              />
              <NavigationList.Link label="Authentification" />
              <NavigationList.Link label="Billing" />
              <NavigationList.Link label="Security Log" />
              <NavigationList.Link label="Users" />
            </NavigationList.Group>
          </NavigationList>
        </div>
      </Flex>
    );
  },
};

export default story;
