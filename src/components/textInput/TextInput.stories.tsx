import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, TextHeadingRoles, TextInput } from 'components';
import { Direction, Gap } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useState } from 'react';

const story: Meta<typeof TextInput> = {
  title: 'Components/Input/TextInput',
  component: TextInput,
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
  name: 'Using TextInputs',
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('Hello!');
    const [value3, setValue3] = useState(
      'Invalid value (to be valid it has to be only 3 characters)',
    );

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic TextInputs
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large} wrap={true}>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
          />
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
          />
          <TextInput
            value={''}
            onChange={() => null}
            disabled
            placeholder="Disabled input"
          />
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Type 3 characters"
            invalid={value3.length !== 3}
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
