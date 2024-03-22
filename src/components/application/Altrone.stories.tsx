import { AltroneApplication } from './AltroneApplication.tsx';
import { Meta, StoryObj } from '@storybook/react';
import { ScreenName } from '../text/components/ScreenName.tsx';

const story: Meta<typeof AltroneApplication> = {
  title: 'Altrone Application',
  component: AltroneApplication,
};

export default story;

export const ApplicationStory: StoryObj<typeof AltroneApplication> = {
  name: 'Simple Application',
  render: () => (
    <AltroneApplication
      tagName="main"
      config={{
        language: 'ru',
      }}
    >
      <ScreenName id="1">Altrone UI</ScreenName>
    </AltroneApplication>
  ),
};
