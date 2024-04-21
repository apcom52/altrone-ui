import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { useState } from 'react';
import { Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';

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
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          TextArea component
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
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
