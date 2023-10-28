import { StoryObj } from '@storybook/react';
import { TabList, TabListVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const DefaultTabListStory: StoryObj<typeof TabList<string>> = {
  name: 'Default TabList',
  render: ({ ...args }) => {
    const [tab, setTab] = useState<string>('dashboard');

    return (
      <>
        <TabList {...args} selected={tab} onChange={setTab} variant={TabListVariant.default} />
      </>
    );
  },
  decorators: [StorybookDecorator]
};
