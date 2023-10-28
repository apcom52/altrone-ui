import { StoryObj } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultTextInputStory: StoryObj<typeof TextInput> = {
  name: 'Default TextInput',
  storyName: 'Default TextInput',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return <TextInput {...args} value={_value} onChange={setValue} />;
  },
  decorators: [StorybookDecorator]
};
