import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { DatePicker } from './DatePicker.tsx';
import { useState } from 'react';

const story: Meta<typeof DatePicker> = {
  title: 'Components/Form/DatePicker',
  component: DatePicker,
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
  name: 'Using DatePicker',
  render: () => {
    const [value1, setValue1] = useState(new Date(2024, 3, 12));
    const [value2, setValue2] = useState(new Date(2024, 4, 6));

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic DatePicker
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.xlarge}>
          <DatePicker value={value1} onChange={setValue1} />
          <DatePicker value={value2} onChange={setValue2} />
        </Flex>
      </Flex>
    );
  },
};

export default story;
