import { Meta, StoryObj } from '@storybook/react';
import { Empty, Screen } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta<typeof Screen.Empty> = {
  title: 'Components/Core/Screen/Empty',
  component: Screen.Empty,
  decorators: [StorybookDecorator],
};

export default story;

export const Overview: StoryObj<typeof Screen.Empty> = {
  name: 'Using Empty',
  render: () => (
    <Screen.Empty>
      <Empty>No projects yet</Empty>
    </Screen.Empty>
  ),
};
