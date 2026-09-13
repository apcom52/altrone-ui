import { Meta, StoryObj } from '@storybook/react';
import { AutocompleteInput } from './AutocompleteInput.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import {
  AddressLookup,
  AssigneePicker,
  CommandPalette,
  FontPicker,
} from './stories';

const story: Meta<typeof AutocompleteInput> = {
  title: 'Components/Controls/AutocompleteInput',
  component: AutocompleteInput,
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

export const FontPickerStory: StoryObj = {
  name: 'Pick a font — the default renderer',
  render: () => <FontPicker />,
};

export const CommandPaletteStory: StoryObj = {
  name: 'A command palette',
  render: () => <CommandPalette />,
};

export const AddressLookupStory: StoryObj = {
  name: 'Address lookup against a slow API',
  render: () => <AddressLookup />,
};

export const AssigneePickerStory: StoryObj = {
  name: 'Assign a task',
  render: () => <AssigneePicker />,
};

export default story;
