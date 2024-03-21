import { StoryObj } from '@storybook/react';
import { Checkbox } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const DefaultCheckboxStory: StoryObj<typeof Checkbox> = {
  name: 'Default Checkbox',
  storyName: 'Default Checkbox',
  render: ({ ...args }) => {
    const [enable, setEnable] = useState(false);

    return <Checkbox {...args} checked={enable} onChange={setEnable} />;
  },
  decorators: [StorybookDecorator]
};
