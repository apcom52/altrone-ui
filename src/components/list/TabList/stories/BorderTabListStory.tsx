import { StoryObj } from '@storybook/react';
import { TabList, TabListVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const BorderTabListStory: StoryObj<typeof TabList<string>> = {
  name: 'Border TabList',
  render: ({ ...args }) => {
    const [tab, setTab] = useState<string>('dashboard');

    return (
      <>
        <TabList {...args} selected={tab} onChange={setTab} variant={TabListVariant.border} />
      </>
    );
  },
  decorators: [StorybookDecorator]
};
