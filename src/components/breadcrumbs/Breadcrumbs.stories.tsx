import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Text, TextHeadingRoles } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Breadcrumbs } from './Breadcrumbs.tsx';

const story: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const BottomNavigationStory: StoryObj<typeof Breadcrumbs> = {
  name: 'Using Breadcrumbs',
  render: () => {
    return (
      <Flex gap="l">
        <Text.Heading role={TextHeadingRoles.inner}>
          Standard Breadcrumbs
        </Text.Heading>
        <Breadcrumbs>
          <Breadcrumbs.Item icon={<Icon i="home" />} label="Home" />
          <Breadcrumbs.Item label="Altrone" />
          <Breadcrumbs.Item label="Altrone Next" />
        </Breadcrumbs>
      </Flex>
    );
  },
};

export default story;
