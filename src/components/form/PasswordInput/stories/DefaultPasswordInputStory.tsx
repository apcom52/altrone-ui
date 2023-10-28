import { StoryObj } from '@storybook/react';
import { PasswordInput } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const DefaultPasswordInputStory: StoryObj<typeof PasswordInput> = {
  name: 'Default Password Input',
  storyName: 'Default Password Input',
  render: ({ ...args }) => {
    const [_value, setValue] = useState(args.value);

    return <PasswordInput {...args} value={_value} onChange={setValue} />;
  },
  decorators: [StorybookDecorator]
};
