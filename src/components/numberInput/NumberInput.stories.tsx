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
import { userEvent, within, expect } from '@storybook/test';

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
    const [value1, setValue1] = useState<number | undefined>(undefined);
    const [value2, setValue2] = useState<number | undefined>(undefined);
    const [value3, setValue3] = useState<number | undefined>(-25);
    const [value4, setValue4] = useState<number | undefined>(undefined);
    const [value5, setValue5] = useState<number | undefined>(undefined);
    const [value6, setValue6] = useState<number | undefined>(undefined);

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
            min={0}
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
            value={value5}
            onChange={setValue5}
            placeholder="0,00"
            decimalDelimiter=","
            groupingDelimiter="."
            size={Size.small}
          />
          <NumberInput
            value={value6}
            onChange={setValue6}
            placeholder="0.00"
            decimalDelimiter="."
            groupingDelimiter=","
            digitsAfterPoint={2}
            allowNegative
            size={Size.large}
          />
        </Flex>
      </Flex>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const field = canvas.getByTestId('number');

    await step('check that user can only enter digits', async () => {
      await userEvent.type(field, '12abc 4');
      expect(field).toHaveValue('124');
    });

    await step('check that spinner works correctly', async () => {
      await userEvent.click(canvas.getAllByText('keyboard_arrow_up')[0]);
      expect(field).toHaveValue('125');
      await userEvent.click(canvas.getAllByText('keyboard_arrow_down')[0]);
      expect(field).toHaveValue('124');
    });
  },
};

export default story;
