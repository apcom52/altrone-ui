import { StoryObj } from '@storybook/react';
import { NumberInput } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const DefaultPasswordInputStory: StoryObj<typeof NumberInput> = {
  name: 'Default Number Input',
  storyName: 'Default Number Input',
  render: ({ ...args }) => {
    const [_value, setValue] = useState(args.value);

    return <NumberInput {...args} value={_value} onChange={setValue} />;
  },
  decorators: [StorybookDecorator]
};
