import { ComponentStory, StoryObj } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookDecorator, StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { default as COUNTRIES } from '../../../data/DataTable/stories/data';

const SUGGESTIONS = COUNTRIES.map((country) => country.name);

export const TextInputLiveSuggestionsStory: StoryObj<typeof TextInput> = {
  name: 'TextInput with live suggestions',
  storyName: 'TextInput with live suggestions',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return (
      <TextInput
        {...args}
        value={_value}
        onChange={setValue}
        suggestions={SUGGESTIONS}
        useLiveSuggestions
      />
    );
  },
  decorators: [StorybookDecorator]
};
