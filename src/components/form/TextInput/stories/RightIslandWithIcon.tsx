import { StoryObj } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../typography';

export const RightIslandWithIconStory: StoryObj<typeof TextInput> = {
  name: 'TextInput with icon right island',
  storyName: 'TextInput with icon right island',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return (
      <TextInput {...args} rightIcon={<Icon i="search" />} value={_value} onChange={setValue} />
    );
  },
  decorators: [StorybookDecorator]
};

RightIslandWithIconStory.args = {
  loading: false
};

export default RightIslandWithIconStory;
