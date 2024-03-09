import { StoryObj } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Altrone } from '../../../../hocs';
import { Theme } from '../../../../types';

export const DefaultTextInputStory: StoryObj<typeof TextInput> = {
  name: 'Default TextInput',
  storyName: 'Default TextInput',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return (
      <Altrone theme={Theme.light}>
        <TextInput {...args} value={_value} onChange={setValue} />
      </Altrone>
    );
  }
};
