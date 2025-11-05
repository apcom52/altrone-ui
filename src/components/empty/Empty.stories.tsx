import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { Empty } from './Empty.tsx';
import { Icon } from 'components/icon/Icon.tsx';
import { Inbox } from 'lucide-react';

const story: Meta<typeof Empty> = {
  title: 'Components/Atoms/Empty',
  component: Empty,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const EmptyStory: StoryObj<typeof Flex> = {
  name: 'Using Empty',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Using standard Empty</Text.Heading>
        <Empty />
        <Text.Heading role="inner">Using Empty with label</Text.Heading>
        <Empty>
          No users found. Please click on 'Add' button to add a new user.
        </Empty>
        <Text.Heading role="inner">
          Using Empty with custom components
        </Text.Heading>
        <Empty icon={<Inbox />}>
          No users found. Please click on <Text.Link href="#">Add</Text.Link>{' '}
          button to add a new user.
        </Empty>
        <Text.Heading role="inner">Transparent Empty</Text.Heading>
        <Empty transparent>
          No users found. Please click on 'Add' button to add a new user.
        </Empty>
      </Flex>
    );
  },
};

export default story;
