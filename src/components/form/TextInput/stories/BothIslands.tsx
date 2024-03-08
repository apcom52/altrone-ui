import { StoryObj } from '@storybook/react';
import { InputIslandType, TextInput, TextInputIsland } from '../index';
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
      <TextInput {...args} value={_value} onChange={setValue}>
        <TextInputIsland.Custom placement="left">
          <b>q:</b>
        </TextInputIsland.Custom>
        <TextInputIsland.Action
          placement="right"
          icon={<Icon i="keyboard_arrow_down" />}
          label="Decrease"
          showLabel={false}
          onClick={() => alert('Decrease clicked')}
        />
        <TextInputIsland.Action
          placement="right"
          icon={<Icon i="keyboard_arrow_up" />}
          label="Increase"
          showLabel={false}
          onClick={() => alert('Increase clicked')}
        />
      </TextInput>
    );
  },
  decorators: [StorybookDecorator]
};
