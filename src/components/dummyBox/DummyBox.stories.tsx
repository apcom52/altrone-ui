import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { DummyBox } from './DummyBox.tsx';

const story: Meta<typeof DummyBox> = {
  title: 'Components/Atoms/DummyBox',
  component: DummyBox,
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

export const DummyBoxStory: StoryObj<typeof Flex> = {
  name: 'Using DummyBox',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Using DummyBox</Text.Heading>
        <Flex gap="m">
          <DummyBox width="100px" height="100px" />
          <DummyBox width="80px" height="240px" />
          <DummyBox width="200px" height="40px" />
          <DummyBox height="100px" />
        </Flex>
      </Flex>
    );
  },
};

export default story;
