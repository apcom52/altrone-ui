import { StoryObj } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const LeftIslandWithTextStory: StoryObj<typeof TextInput> = {
  name: 'TextInput with text left island',
  storyName: 'TextInput with text left island',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return <TextInput {...args} prefix="$" value={_value} onChange={setValue} />;
  },
  decorators: [StorybookDecorator]
};
