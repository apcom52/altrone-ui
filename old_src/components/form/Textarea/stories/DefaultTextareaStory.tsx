import { StoryObj } from '@storybook/react';
import { Textarea } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const DefaultTextareaStory: StoryObj<typeof Textarea> = {
  name: 'Default Textarea',
  storyName: 'Default Textarea',
  render: ({ ...args }) => {
    const [_value, setValue] = useState(args.value);

    return <Textarea {...args} value={_value} onChange={setValue} />;
  },
  decorators: [StorybookDecorator]
};
