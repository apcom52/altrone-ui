import { AltroneApplication } from './AltroneApplication.tsx';
import { Meta, Story } from '@storybook/react';
import { AltroneConfiguration } from '../configuration/AltroneConfiguration.tsx';

const story: Meta<typeof AltroneApplication> = {
  component: AltroneApplication,
};

export default story;

export const Primary: Story = {
  render: () => (
    <AltroneApplication>
      <AltroneConfiguration
        baseComponent={{ className: 'parent className', element: 'element' }}
      >
        <AltroneConfiguration baseComponent={{ className: 'child 1' }}>
          <AltroneConfiguration baseComponent={{ element: 'child element' }} />
        </AltroneConfiguration>
      </AltroneConfiguration>
    </AltroneApplication>
  ),
};
