import { StoryObj } from '@storybook/react';
import { Switcher } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const DefaultSwitcherStory: StoryObj<typeof Switcher> = {
  name: 'Default Switcher',
  storyName: 'Default Switcher',
  render: ({ ...args }) => {
    const [enable, setEnable] = useState(false);

    return <Switcher {...args} checked={enable} onChange={setEnable} />;
  },
  decorators: [StorybookDecorator]
};
