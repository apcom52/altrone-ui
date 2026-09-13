import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from 'global/storybook/StorybookDecorator.tsx';
import {
  ActivityLog,
  Composition,
  ReleaseNotes,
  TypeSpecimen,
} from './stories';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta = {
  title: 'Components/Core/Text',
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const TypeAndAnatomy: StoryObj = {
  name: 'Type & anatomy',
  render: () => <TypeSpecimen />,
};

export const FormattedDocument: StoryObj = {
  name: 'A formatted document',
  render: () => <ReleaseNotes />,
};

export const UnderLayoutPressure: StoryObj = {
  name: 'Under layout pressure',
  render: () => <ActivityLog />,
};

export const PolymorphismAndAsChild: StoryObj = {
  name: 'Polymorphism & asChild',
  render: () => <Composition />,
};

export default story;
