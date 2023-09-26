import { StoryObj } from '@storybook/react';
import { Chips } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const SingleChipStory: StoryObj<typeof Chips<string>> = {
  name: 'Single Chips',
  render: ({ ...args }) => {
    const [values, setValues] = useState<string | undefined>('SA');

    return (
      <>
        <Chips {...args} multiple={false} values={values} onChange={setValues} />
      </>
    );
  },
  decorators: [StorybookDecorator]
};
