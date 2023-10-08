import { Meta } from '@storybook/react';
import { Calendar } from './index';

export { DefaultCalendarStory } from './stories';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'data/Calendar',
  tags: ['autodocs'],
  args: {
    selectedDates: [new Date(2023, 9, 15)]
  },
  argTypes: {
    month: { control: 'date' }
  }
};

export default meta;
