import { Meta } from '@storybook/react';
import { Calendar } from './index';

export { DefaultCalendarStory } from './stories';

const onClickHandler = (date: Date) => {
  console.log(date);
};

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'data/Calendar',
  tags: ['autodocs'],
  args: {
    selectedDates: [new Date(2023, 9, 15)],
    onDateChange: onClickHandler
  },
  argTypes: {
    month: { control: 'date', description: 'Selected month' },
    selectedDates: { description: 'List of the selected dates' },
    onDateChange: { description: 'Callback is called when user clicks on the date' },
    DateComponent: {
      control: 'none',
      description: 'Custom Date component'
    },
    disabled: { control: 'none', description: 'If true user can not change the current date' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
