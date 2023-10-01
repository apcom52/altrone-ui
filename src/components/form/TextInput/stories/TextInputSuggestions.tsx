import { StoryObj } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { default as COUNTRIES } from '../../../data/DataTable/stories/data';

const SUGGESTIONS = COUNTRIES.map((country) => country.name);

export const TextInputSuggestionsStory: StoryObj<typeof TextInput> = {
  name: 'TextInput with suggestions',
  storyName: 'TextInput with suggestions',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return <TextInput {...args} value={_value} onChange={setValue} suggestions={SUGGESTIONS} />;
  },
  decorators: [StorybookDecorator]
};
