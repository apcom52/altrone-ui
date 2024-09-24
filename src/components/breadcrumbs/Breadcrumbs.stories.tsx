import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Text } from 'components';
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
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Standard Breadcrumbs</Text.Heading>
        <Breadcrumbs>
          <Breadcrumbs.Item href="#" icon={<Icon i="home" />} label="Home" />
          <Breadcrumbs.Item href="#" label="Altrone" />
          <Breadcrumbs.Item label="Altrone Next" />
        </Breadcrumbs>
      </Flex>
    );
  },
};

export default story;
