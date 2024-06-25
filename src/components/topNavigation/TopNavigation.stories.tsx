import { Meta, StoryObj } from '@storybook/react';
import { Button, Dropdown, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { TopNavigation } from './TopNavigation.tsx';

const story: Meta<typeof TopNavigation> = {
  title: 'Components/Navigation/TopNavigation',
  component: TopNavigation,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const TooltipStory: StoryObj<typeof TopNavigation> = {
  name: 'Using TopNavigation',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Standard TopNavigation</Text.Heading>
        <TopNavigation>
          <TopNavigation.Logo href="#">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asana_logo.svg/2560px-Asana_logo.svg.png" />
          </TopNavigation.Logo>
          <TopNavigation.Group>
            <Dropdown
              content={() => (
                <Dropdown.Menu>
                  <Dropdown.Action label="Product Overview" />
                  <Dropdown.Action label="All features" />
                  <Dropdown.Action label="App integrations" />
                </Dropdown.Menu>
              )}
            >
              {({ opened }) => (
                <TopNavigation.Link
                  label="Features"
                  selected={opened}
                  rightIcon={
                    <Icon i={opened ? 'expand_less' : 'expand_more'} />
                  }
                />
              )}
            </Dropdown>
            <TopNavigation.Link href="#" label="Solutions" />
            <TopNavigation.Link href="#" label="Resources" />
            <TopNavigation.Link href="#" label="Enterprise" />
            <TopNavigation.Link href="#" label="Pricing" />
          </TopNavigation.Group>
          <TopNavigation.Group align="end">
            <Button leftIcon={<Icon i="globe" />} />
            <TopNavigation.Link label="Log In" />
            <TopNavigation.Link label="Contact Sales" />
            <Button size="l" label="Get started" />
          </TopNavigation.Group>
        </TopNavigation>
      </Flex>
    );
  },
};

export default story;
