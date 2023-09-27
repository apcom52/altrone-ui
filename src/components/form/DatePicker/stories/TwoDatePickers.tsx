import { StoryObj } from '@storybook/react';
import { DatePicker } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';
import { Heading } from '../../../typography';

export const TwoDatePickers: StoryObj<typeof DatePicker<false>> = {
  name: 'Two DatePickers',
  storyName: 'Two DatePickers',
  render: ({ ...args }) => {
    const [valueSingle, setValueSingle] = useState<Date | undefined>(undefined);
    const [valueRange, setValueRange] = useState<[Date, Date]>();

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return (
      <>
        <Heading level={4}>Single DatePicker</Heading>
        <DatePicker {...args} value={valueSingle} onChange={setValueSingle} />
        <br />
        <b>Value: {valueSingle && dateFormatter.format(valueSingle)}</b>
        <br />
        <hr />
        <Heading level={4}>Multi DatePicker</Heading>
        <DatePicker {...args} value={valueRange} onChange={setValueRange} useDateRange />
        <br />
        <b>
          Values: {valueRange?.[0] && dateFormatter.format(valueRange?.[0])} -{' '}
          {valueRange?.[1] && dateFormatter.format(valueRange?.[1])}
        </b>
      </>
    );
  },
  decorators: [StorybookDecorator]
};
