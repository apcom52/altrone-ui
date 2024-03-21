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
    label: { control: 'text', description: 'Label text' },
    required: { description: 'Adds red asterisk to the label' },
    hintText: { control: 'text', description: 'Adds question mark with tooltip to the label' }
  }
};

export default meta;
