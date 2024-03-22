import { AltroneApplication } from './AltroneApplication.tsx';
import { Meta, StoryObj } from '@storybook/react';
import { Theme } from './AltroneApplication.types.ts';

const story: Meta<typeof AltroneApplication> = {
  title: 'Altrone Application',
  component: AltroneApplication,
};

export default story;

export const ApplicationStory: StoryObj<typeof AltroneApplication> = {
  name: 'Simple Application',
  render: () => (
    <AltroneApplication
      theme={Theme.dark}
      tagName="main"
      config={{
        language: 'ru',
      }}
      style={{ background: 'pink' }}
    />
  ),
};
