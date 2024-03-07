import { StoryObj } from '@storybook/react';
import { TextInput, TextInputIsland } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const LeftIslandWithTextStory: StoryObj<typeof TextInput> = {
  name: 'TextInput with text left island',
  storyName: 'TextInput with text left island',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return (
      <TextInput value={_value} onChange={setValue}>
        <TextInputIsland.Text label={'$'} placement="left" />
        <TextInputIsland.Text label={'Label'} placement="left" />
        <TextInputIsland.Text label={'Suffix'} placement="right" />
      </TextInput>
    );
  },
  decorators: [StorybookDecorator]
};
