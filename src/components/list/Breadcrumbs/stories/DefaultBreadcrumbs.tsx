import { StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultBreadcrumbs: StoryObj<typeof Breadcrumbs> = {
  name: 'Default Spoiler',
  render: ({ ...args }) => {
    return (
      <>
        <Breadcrumbs {...args} />
      </>
    );
  },
  decorators: [StorybookDecorator]
};
