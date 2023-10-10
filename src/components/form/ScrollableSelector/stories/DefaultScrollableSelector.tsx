import { StoryObj } from '@storybook/react';
import { ScrollableSelector } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const DefaultScrollableSelector: StoryObj<typeof ScrollableSelector<number>> = {
  name: 'Default Scrollable Selector',
  storyName: 'Default Scrollable Selector',
  render: ({ ...args }) => {
    const [value, setValue] = useState(0);

    return <ScrollableSelector<number> {...args} value={value} onChange={setValue} />;
  },
  decorators: [StorybookDecorator]
};
