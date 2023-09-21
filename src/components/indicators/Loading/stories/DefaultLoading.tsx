import { StoryObj } from '@storybook/react';
import { Loading } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultLoading: StoryObj<typeof Loading> = {
  name: 'Default Loading',
  render: ({ ...args }) => {
    return <Loading {...args} />;
  },
  decorators: [StorybookDecorator]
};
