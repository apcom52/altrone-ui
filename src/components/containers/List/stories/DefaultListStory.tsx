import { StoryObj } from '@storybook/react';
import { List } from '../List';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import React, { useState } from 'react';
import { Form, FormGroup } from '../../Form';
import { Switcher } from '../../../form';

export interface DishCategory {
  name: string;
  color: string;
  icon: string;
}

export const LIST_STORYDATA: DishCategory[] = [
  {
    name: 'Italian',
    color: '#f5428d',
    icon: '🍕'
  },
  {
    name: 'Quick & Easy',
    color: '#f54242',
    icon: '🔪'
  },
  {
    name: 'Hamburgers',
    color: '#f5a442',
    icon: '🍔'
  },
  {
    name: 'German',
    color: '#f5d142',
    icon: '🇩🇪'
  },
  {
    name: 'Light & Lovely',
    color: '#368dff',
    icon: '❤️'
  },
  {
    name: 'Exotic',
    color: '#41d95d',
    icon: '🦀'
  },
  {
    name: 'Breakfast',
    color: '#9eecff',
    icon: '🍳'
  },
  {
    name: 'Asian',
    color: '#b9ffb0',
    icon: '🍜'
  },
  {
    name: 'French',
    color: '#ffc7ff',
    icon: '🥐'
  },
  {
    name: 'Summer',
    color: '#47fced',
    icon: '☀️'
  }
];

export const DefaultListStory: StoryObj<typeof List> = {
  name: 'Default List',
  storyName: 'Default List',
  render: ({ ...args }) => {
    const [onlyOdd, setOnlyOdd] = useState(false);

    return (
      <Form>
        <FormGroup>
          <Switcher checked={onlyOdd} onChange={setOnlyOdd}>
            Show only odd items
          </Switcher>
        </FormGroup>
        <FormGroup>
          <List {...args} skipRule={(_, index) => (onlyOdd ? index % 2 !== 0 : false)} />
        </FormGroup>
      </Form>
    );
  },
  decorators: [StorybookDecorator]
};
