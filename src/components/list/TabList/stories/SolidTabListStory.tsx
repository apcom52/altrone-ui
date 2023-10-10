import { StoryObj } from '@storybook/react';
import { TabList, TabListVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useCallback, useState } from 'react';

export const SolidTabListStory: StoryObj<typeof TabList<string>> = {
  name: 'Solid TabList',
  render: ({ ...args }) => {
    const [tabs, setTabs] = useState(args.tabs);
    const [tab, setTab] = useState<string>('dashboard');

    const onAddClick = useCallback(() => {
      setTabs((old) => [...old, { value: Math.random().toString(), label: 'New tab' }]);
    }, [tabs]);

    const onCloseClick = useCallback(
      (tabValue: string) => {
        setTabs((old) => old.filter((tab) => tab.value !== tabValue));
      },
      [tabs]
    );

    return (
      <>
        <TabList
          {...args}
          tabs={tabs}
          selected={tab}
          onChange={setTab}
          variant={TabListVariant.solid}
          onAddTab={onAddClick}
          onCloseTab={onCloseClick}
        />
      </>
    );
  },
  decorators: [StorybookDecorator]
};
