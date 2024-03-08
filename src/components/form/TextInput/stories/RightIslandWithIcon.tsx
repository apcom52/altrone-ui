import { StoryObj } from '@storybook/react';
import { TextInput, TextInputIsland } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../typography';

export const RightIslandWithIconStory: StoryObj<typeof TextInput> = {
  name: 'TextInput with icon right island',
  storyName: 'TextInput with icon right island',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return (
      <TextInput {...args} value={_value} onChange={setValue}>
        <TextInputIsland.Icon icon={<Icon i="check" />} placement="right" />
      </TextInput>
    );
  },
  decorators: [StorybookDecorator]
};

RightIslandWithIconStory.args = {
  loading: false
};

export default RightIslandWithIconStory;
