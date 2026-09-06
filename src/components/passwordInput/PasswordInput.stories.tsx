import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import {
  DeploymentSecrets,
  GeneratePassword,
  NewPassword,
  UnlockScreen,
} from './stories';

const story: Meta<typeof PasswordInput> = {
  title: 'Components/Controls/PasswordInput',
  component: PasswordInput,
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

export const CreatingAPassword: StoryObj = {
  name: 'Creating a password',
  render: () => <NewPassword />,
};

export const EditingSecrets: StoryObj = {
  name: 'Editing secret values',
  render: () => <DeploymentSecrets />,
};

export const Unlock: StoryObj = {
  name: 'Unlock screen',
  render: () => <UnlockScreen />,
};

export const SuggestStrong: StoryObj = {
  name: 'Suggest a strong password',
  render: () => <GeneratePassword />,
};

export default story;
