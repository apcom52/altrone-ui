import { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { useState } from 'react';
import { Direction, Gap, Size } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { TextInput } from '../textInput';
import { Icon } from '../icon';
import { within } from '@storybook/test';

const story: Meta<typeof NumberInput> = {
  title: 'Components/Form/NumberInput',
  component: NumberInput,
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
  name: 'Using NumberInput',
  render: () => {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(-25);
    const [value4, setValue4] = useState(0);

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>NumberInput</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <NumberInput
            value={value1}
            onChange={setValue1}
            placeholder="Standard NumberInput (max: 10k)"
            data-testid="number"
            max={10000}
          />
          <NumberInput
            value={value2}
            onChange={setValue2}
            placeholder="Disabled NumberInput"
            disabled
          />
          <NumberInput
            value={value3}
            onChange={setValue3}
            placeholder="NumberInput without controls"
            showControl={false}
            allowNegative
            min={-100}
            max={100}
          />
        </Flex>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <NumberInput
            value={value4}
            onChange={setValue4}
            placeholder="NumberInput with custom islands"
          >
            <TextInput.TextIsland label="Age:" />
            <TextInput.ActionIsland
              placement="right"
              icon={<Icon i="backspace" />}
              label="Clear"
            />
          </NumberInput>
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Different sizes of NumberInput
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <NumberInput
            value={value1}
            onChange={setValue1}
            placeholder="Small NumberInput"
            data-testid="number"
            max={10000}
            size={Size.small}
          />
          <NumberInput
            value={value1}
            onChange={setValue1}
            placeholder="Large NumberInput"
            data-testid="number"
            max={10000}
            size={Size.large}
          />
        </Flex>
      </Flex>
    );
  },
  play: ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    step('check controls', async () => {});
  },
};

export default story;
