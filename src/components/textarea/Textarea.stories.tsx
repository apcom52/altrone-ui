import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { useState } from 'react';
import { Text } from '../text';

const story: Meta<typeof Textarea> = {
  title: 'Components/Form/Textarea',
  component: Textarea,
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
  name: 'Using Textarea',
  render: () => {
    const [value1, setValue1] = useState('');

    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">TextArea component</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Textarea
            value={value1}
            onChange={setValue1}
            placeholder="Type your story here"
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
