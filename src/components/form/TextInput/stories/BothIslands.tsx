import { StoryObj } from '@storybook/react';
import { InputIslandType, TextInput } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../typography';

const LEFTISLAND = { type: InputIslandType.components, content: <b>{'q>:'}</b> };
const RIGHTISLAND = {
  type: InputIslandType.actions,
  content: [
    {
      title: 'Decrease',
      icon: <Icon i="keyboard_arrow_down" />,
      onClick: () => alert('Decrease clicked')
    },
    {
      title: 'Increase',
      icon: <Icon i="keyboard_arrow_up" />,
      onClick: () => alert('Increase clicked')
    }
  ]
};

export const BothIslandTextInputStory: StoryObj<typeof TextInput> = {
  name: 'TextInput with both island',
  storyName: 'TextInput with both island',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');

    return (
      <TextInput
        {...args}
        value={_value}
        onChange={setValue}
        leftIsland={LEFTISLAND}
        rightIsland={RIGHTISLAND}
      />
    );
  },
  decorators: [StorybookDecorator]
};
