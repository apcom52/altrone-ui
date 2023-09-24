import { Meta } from '@storybook/react';
import { DatePicker } from './index';

export { DefaultDatePickerStory } from './stories';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Forms/DatePicker',
  tags: ['autodocs'],
  args: {
    value: new Date()
  },
  argTypes: {
    value: { control: 'date', description: 'Selected date' },
    onChange: { description: 'Callback is called when user selects a new date' },
    picker: { control: 'select', description: 'Mode of the picker' },
    minDate: { description: 'Minimum possible date' },
    maxDate: { control: 'date', description: 'Minimum possible date' },
    placeholder: { description: 'Placeholder of the control' },
    clearable: { description: 'If true user can set value to undefined' },
    disabled: { control: 'boolean', description: 'Marks DatePicker as disabled' },
    size: { control: 'select', description: 'Size of the DatePicker' },
    errorText: { description: 'Error message of DatePicker' },
    hintText: { description: 'Hint message of DatePicker' },
    surface: { control: 'select', description: 'Surface of the DatePicker' },
    elevation: { control: 'select', description: 'Shadows of the DatePicker' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
