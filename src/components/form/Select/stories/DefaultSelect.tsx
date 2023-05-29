import { Select } from '../index';
import { useEffect, useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';
import { Option } from '../../../../types';

const DATA: Option<string>[] = [
  {
    label: 'The United Kingdom',
    value: 'uk'
  },
  {
    label: 'The United States of America',
    value: 'use'
  },
  {
    label: 'Spain',
    value: 'spain'
  },
  {
    label: 'France',
    value: 'france'
  },
  {
    label: 'Turkey',
    value: 'turkey'
  },
  {
    label: 'Russia',
    value: 'russia'
  },
  {
    label: 'Japan',
    value: 'japan'
  },
  {
    label: 'China',
    value: 'china'
  },
  {
    label: 'Brazil',
    value: 'brazil'
  },
  {
    label: 'Germany',
    value: 'germany'
  }
];

export const DefaultSelect: StoryObj<typeof Select<string>> = {
  name: 'Default Select',
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>(args.value);

    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <StorybookPlayground>
        <Select<string> {...args} value={value} onChange={setValue} options={DATA} />
      </StorybookPlayground>
    );
  }
};
