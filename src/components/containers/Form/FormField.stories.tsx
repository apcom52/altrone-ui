import { Meta } from '@storybook/react';
import { FormField } from './index';

export { FormFieldStory } from './stories';

const meta: Meta<typeof FormField> = {
  component: FormField,
  title: 'Containers/Form/FormField',
  tags: ['autodocs'],
  args: {
    label: 'Your username',
    hintText: ''
  },
  argTypes: {
    label: { control: 'text' },
    hintText: { control: 'text' }
  }
};

export default meta;
