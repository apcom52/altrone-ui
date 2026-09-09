import { Meta, StoryObj } from '@storybook/react';
import { Result, Screen } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta<typeof Screen.Empty> = {
  title: 'Components/Core/Screen/Empty',
  component: Screen.Empty,
  decorators: [StorybookDecorator],
};

export default story;

export const Overview: StoryObj<typeof Screen.Empty> = {
  name: 'Using Result',
  render: () => (
    <Screen.Empty>
      <Result>No projects yet</Result>
    </Screen.Empty>
  ),
};
