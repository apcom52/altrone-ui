import { StoryObj } from '@storybook/react';
import { Loading } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Button } from '../../../button';

export const DefaultLoading: StoryObj<typeof Button> = {
  name: 'Default Loading',
  render: ({ ...args }) => {
    return <Loading {...args} />;
  },
  decorators: [StorybookDecorator]
};
