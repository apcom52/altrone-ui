import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Breadcrumbs } from './Breadcrumbs.tsx';
import { Home } from 'lucide-react';

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
        <Breadcrumbs data-testid="breadcrumbs">
          <Breadcrumbs.Item href="#" icon={<Home />} label="Home" />
          <Breadcrumbs.Item href="#" label="Altrone" />
          <Breadcrumbs.Item label="Altrone Next" current />
        </Breadcrumbs>
      </Flex>
    );
  },
};

export default story;
