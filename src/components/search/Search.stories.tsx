import { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { useCallback, useState } from 'react';
import { Text } from '../text';
import { TextInput } from '../textInput';
import { Icon } from '../icon';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { AutocompleteSuggestionsFunc } from '../autocompleteInput/AutocompleteInput.types.ts';
import { userEvent, within, expect } from '@storybook/test';

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
    const getCountry: AutocompleteSuggestionsFunc = useCallback(
      async ({ value }) => {
        return COUNTRIES.filter((country) =>
          country.country.toLowerCase().startsWith(value.toLowerCase()),
        ).map((item) => item.country);
      },
      [],
    );

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Search</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Search
            data-testid="search"
            value={value1}
            onChange={setValue1}
            getSuggestions={getCountry}
          />
          <Search
            value={value2}
            onChange={setValue2}
            placeholder="Disabled Search"
            disabled
          />
          <Search
            value={value3}
            onChange={setValue3}
            placeholder="Search without controls"
            showControls={false}
          />
        </Flex>
        <Flex direction="horizontal" gap="l">
          <Search
            value={value4}
            onChange={setValue4}
            placeholder="PasswordInput with custom islands"
          >
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('search need to provide suggestions', async () => {
      await userEvent.type(canvas.getByTestId('search'), 'Ru');
      await userEvent.click(await canvas.findByText('Russia'));
      await expect(canvas.getByTestId('search')).toHaveValue('Russia');
    });

    await step('clear button should work correctly', async () => {
      await userEvent.click(canvas.getByText('backspace'));
      await expect(canvas.getByTestId('search')).toHaveValue('');
    });
  },
};

export default story;
