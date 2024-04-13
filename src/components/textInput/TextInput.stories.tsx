import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Text, TextHeadingRoles, TextInput } from 'components';
import { Direction, Gap, Size } from 'types';
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
    const [value4, setValue4] = useState('Lord Voldemort');
    const [readonly, setReadonly] = useState(true);
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState('');
    const [value7, setValue7] = useState('');

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic TextInputs
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
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
        <Text.Heading role={TextHeadingRoles.inner}>
          Transparent TextInputs
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            transparent
          />
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
            transparent
          />
          <TextInput
            value={''}
            onChange={() => null}
            disabled
            placeholder="Disabled input"
            transparent
          />
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Type 3 characters"
            invalid={value3.length !== 3}
            transparent
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Read-only mode
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.small}>
          <TextInput value={value4} onChange={setValue4} readOnly={readonly} />
          <Button
            label={readonly ? 'Edit' : 'Save'}
            onClick={() => setReadonly(!readonly)}
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Small TextInputs
        </Text.Heading>
        <TextInput
          size={Size.small}
          value={value5}
          onChange={setValue5}
          placeholder="Type something in the small TextInput"
        />
        <Text.Heading role={TextHeadingRoles.inner}>
          Large TextInputs
        </Text.Heading>
        <TextInput
          size={Size.large}
          value={value6}
          onChange={setValue6}
          placeholder="Type something in the large TextInput"
        />
        <Text.Heading role={TextHeadingRoles.inner}>
          TextInput without rainbow effect
        </Text.Heading>
        <TextInput
          size={Size.small}
          value={value5}
          onChange={setValue5}
          placeholder="This just a TextInput without rainbow effect"
          rainbowEffect={false}
        />
      </Flex>
    );
  },
};

export default story;
