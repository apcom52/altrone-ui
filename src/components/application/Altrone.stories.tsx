import { AltroneApplication } from './AltroneApplication.tsx';
import { Meta, Story } from '@storybook/react';

const story: Meta<typeof AltroneApplication> = {
  component: AltroneApplication,
};

export default story;

export const Primary: Story = {
  render: () => <AltroneApplication />,
};
