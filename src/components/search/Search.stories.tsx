import { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { useState } from 'react';
import { Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { TextInput } from '../textInput';
import { Icon } from '../icon';

const story: Meta<typeof Search> = {
  title: 'Components/Form/Search',
  component: Search,
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
  name: 'Using Search',
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>PasswordInput</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Search
            value={value1}
            onChange={setValue1}
            placeholder="Standard PasswordInput"
            data-testid="password"
          />
          <Search
            value={value2}
            onChange={setValue2}
            placeholder="Disabled PasswordInput"
            disabled
          />
          <Search
            value={value3}
            onChange={setValue3}
            placeholder="PasswordInput without controls"
            showControl={false}
          />
        </Flex>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Search
            value={value4}
            onChange={setValue4}
            placeholder="PasswordInput with custom islands"
          >
            <TextInput.TextIsland label="Password:" />
            <TextInput.ActionIsland
              placement="right"
              icon={<Icon i="backspace" />}
              label="Clear"
            />
          </Search>
        </Flex>
      </Flex>
    );
  },
};

export default story;