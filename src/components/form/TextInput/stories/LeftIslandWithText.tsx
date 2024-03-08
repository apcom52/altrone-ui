import { StoryObj } from '@storybook/react';
import { TextInput, TextInputIsland } from '../index';
import { useState } from 'react';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Switcher } from '../../Switcher';

export const LeftIslandWithTextStory: StoryObj<typeof TextInput> = {
  name: 'TextInput with text left island',
  storyName: 'TextInput with text left island',
  render: ({ ...args }) => {
    const [_value, setValue] = useState('');
    const [showMore, setShowMore] = useState(false);

    return (
      <>
        <Switcher checked={showMore} onChange={setShowMore}>
          Show more islands
        </Switcher>
        <TextInput {...args} value={_value} onChange={setValue}>
          <TextInputIsland.Text label={'$'} placement="left" />
          {showMore ? <TextInputIsland.Text label={'(.00)'} placement="left" /> : null}
          {showMore ? <TextInputIsland.Text label={'<--'} placement="right" /> : null}
        </TextInput>
      </>
    );
  },
  decorators: [StorybookDecorator]
};
