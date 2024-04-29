import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { useState } from 'react';
import { Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { TextInput } from '../textInput';
import { Icon } from '../icon';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { Option } from './Select.types.ts';

const story: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
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

const SELECT_COUNTRIES: Option<string> = COUNTRIES.map((item) => ({
  label: item.country,
  value: item.country.toLowerCase(),
}));

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using Select',
  render: () => {
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('portugal');
    const [value3, setValue3] = useState<string>('china');
    const [value4, setValue4] = useState<string[]>(['russia']);

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>Basic Select</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Select<string>
            multiple={false}
            value={value1}
            onChange={setValue1}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
          />
          <Select<string>
            multiple={false}
            value={value2}
            onChange={setValue2}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
          />
          <Select<string>
            multiple={false}
            value={value3}
            onChange={setValue3}
            options={SELECT_COUNTRIES}
            disabled
          />
        </Flex>
        <br />
        <Text.Heading role={TextHeadingRoles.inner}>
          Multiple Select
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Select<string[]>
            multiple={true}
            value={value4}
            onChange={setValue4}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
