import { AltroneApplication } from './AltroneApplication.tsx';
import { Meta, StoryObj } from '@storybook/react';
import { ScreenName } from '../text/components/ScreenName.tsx';
import { Heading } from '../text/components/Heading.tsx';
import { TextHeadingRoles } from '../text/Text.types.ts';

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
      <Heading>Heading component</Heading>
      <Heading role={TextHeadingRoles.heading} className="custom">
        Heading component
      </Heading>
      <Heading role={TextHeadingRoles.subheading}>Heading component</Heading>
      <Heading role={TextHeadingRoles.inner}>Heading component</Heading>
    </AltroneApplication>
  ),
};
