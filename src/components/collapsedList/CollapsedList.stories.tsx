import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { CollapsedList } from './CollapsedList.tsx';
import { useState } from 'react';
import { Checkbox } from '../checkbox';

const story: Meta<typeof CollapsedList> = {
  title: 'Components/Containers/CollapsedList',
  component: CollapsedList,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using CollapsedList',
  render: () => {
    const [value1, setValue1] = useState(false);
    const [value2, setValue2] = useState(false);
    const [value3, setValue3] = useState(false);
    const [value4, setValue4] = useState(false);
    const [value5, setValue5] = useState(false);
    const [value6, setValue6] = useState(false);

    return (
      <Flex gap="l">
        <Text.Heading role="inner">Basic CollapsedList</Text.Heading>
        <Flex direction="horizontal" gap="xl">
          <CollapsedList limit={4}>
            <Checkbox checked={value1} onChange={setValue1}>
              Homepage
            </Checkbox>
            <Checkbox checked={value2} onChange={setValue2}>
              Explore
            </Checkbox>
            <Checkbox checked={value3} onChange={setValue3}>
              Notifications
            </Checkbox>
            <Checkbox checked={value4} onChange={setValue4}>
              Messages
            </Checkbox>
            <Checkbox checked={value5} onChange={setValue5}>
              Lists
            </Checkbox>
            <Checkbox checked={value6} onChange={setValue6}>
              Bookmarks
            </Checkbox>
          </CollapsedList>
          <CollapsedList limit={4}>
            <Checkbox checked={value1} onChange={setValue1}>
              Homepage
            </Checkbox>
            <Checkbox checked={value2} onChange={setValue2}>
              Explore
            </Checkbox>
            <Checkbox checked={value3} onChange={setValue3}>
              Notifications
            </Checkbox>
          </CollapsedList>
          <CollapsedList limit={4} hideExpandButtonAfterUsage>
            <Checkbox checked={value1} onChange={setValue1}>
              Homepage
            </Checkbox>
            <Checkbox checked={value2} onChange={setValue2}>
              Explore
            </Checkbox>
            <Checkbox checked={value3} onChange={setValue3}>
              Notifications
            </Checkbox>
            <Checkbox checked={value4} onChange={setValue4}>
              Messages
            </Checkbox>
            <Checkbox checked={value5} onChange={setValue5}>
              Lists
            </Checkbox>
            <Checkbox checked={value6} onChange={setValue6}>
              Bookmarks
            </Checkbox>
          </CollapsedList>
        </Flex>
      </Flex>
    );
  },
  play: ({ canvasElement, step }) => {
    // const canvas = within(canvasElement);
  },
};

export default story;
