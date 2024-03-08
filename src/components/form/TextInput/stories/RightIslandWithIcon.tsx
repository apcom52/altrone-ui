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
      <TextInput value={_value} onChange={setValue}>
        <TextInputIsland.Action
          label="Fill"
          icon={<Icon i="reply" />}
          placement="left"
          showLabel={false}
        />
        <TextInputIsland.Action label="Cut" icon={<Icon i="cut" />} placement="right" />
        <TextInputIsland.Action label="Copy" icon={<Icon i="content_copy" />} placement="right" />
        <TextInputIsland.Icon icon={<Icon i="face" />} placement="right" />
      </TextInput>
    );
  },
  decorators: [StorybookDecorator]
};

RightIslandWithIconStory.args = {
  loading: false
};

export default RightIslandWithIconStory;
