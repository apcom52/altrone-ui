import { StoryObj } from '@storybook/react';
import { Chips } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const MultipleChipsStory: StoryObj<typeof Chips<string>> = {
  name: 'Default Chips',
  render: ({ ...args }) => {
    const [values, setValues] = useState<string[]>(['SA']);

    return (
      <>
        <Chips {...args} values={values} onChange={setValues} />
      </>
    );
  },
  decorators: [StorybookDecorator]
};
