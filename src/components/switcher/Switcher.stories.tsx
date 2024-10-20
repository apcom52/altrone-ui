import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
// import { userEvent, within, expect } from '@storybook/test';
import { Switcher } from './Switcher.tsx';
import { useState } from 'react';

const story: Meta<typeof Switcher> = {
  title: 'Components/Form/Switcher',
  component: Switcher,
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

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using Checkboxes',
  render: () => {
    const [value2, setValue2] = useState(true);
    const [value3, setValue3] = useState(false);
    const [value4, setValue4] = useState(false);

    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Basic Checkboxes</Text.Heading>
        <Flex direction="horizontal" gap="l" align="center">
          <Text.Paragraph>Permissions:</Text.Paragraph>
          <Switcher checked={value2} onChange={setValue2}>
            Read
          </Switcher>
          <Switcher checked={value3} onChange={setValue3}>
            Write
          </Switcher>
          <Switcher danger checked={value4} onChange={setValue4}>
            Delete
          </Switcher>
          <Switcher disabled>Disabled</Switcher>
        </Flex>
      </Flex>
    );
  },
  play: () => {
    // const canvas = within(canvasElement);
  },
};

export default story;
