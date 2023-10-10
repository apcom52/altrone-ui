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
    month: { control: 'date' }
  }
};

export default meta;
