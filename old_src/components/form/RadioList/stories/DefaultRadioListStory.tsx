import { StoryObj } from '@storybook/react';
import { RadioList } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const DefaultRadioListStory: StoryObj<typeof RadioList<string>> = {
  name: 'Default RadioList',
  storyName: 'Default RadioList',
  render: ({ ...args }) => {
    const [value, setValue] = useState('');

    return <RadioList<string> {...args} value={value} onChange={setValue} />;
  },
  decorators: [StorybookDecorator]
};
