import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Dropdown,
  Flex,
  Icon,
  Text,
  TextHeadingRoles,
} from 'components';
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
      <Flex gap="large">
        <Text.Heading role={TextHeadingRoles.inner}>
          Standard TopNavigation
        </Text.Heading>
        <TopNavigation>
          <TopNavigation.Logo>
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
            <TopNavigation.Link label="Solutions" />
            <TopNavigation.Link label="Resources" />
            <TopNavigation.Link label="Enterprise" />
            <TopNavigation.Link label="Pricing" />
          </TopNavigation.Group>
          <TopNavigation.Group align="end">
            <Button leftIcon={<Icon i="globe" />} />
            <TopNavigation.Link label="Log In" />
            <TopNavigation.Link label="Contact Sales" />
            <Button size="large" label="Get started" />
          </TopNavigation.Group>
        </TopNavigation>
      </Flex>
    );
  },
};

export default story;
