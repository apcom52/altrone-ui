import { Meta } from '@storybook/react';
import { List } from './List';
import { DishCategory, LIST_STORYDATA } from './stories/DefaultListStory';
import React from 'react';
import { Icon } from '../../typography';

export { DefaultListStory } from './stories';

const meta: Meta<typeof List<DishCategory>> = {
  component: List,
  title: 'Containers/List',
  tags: ['autodocs'],
  args: {
    data: LIST_STORYDATA,
    keyExtractor: (_, index) => index,
    children: (item) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <span style={{ fontSize: '24px', marginRight: 16 }}>{item.icon}</span>
        <span style={{ fontWeight: 500, fontSize: 18 }}>{item.name}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Icon i="arrow_forward_ios" />
        </span>
      </div>
    )
  },
  argTypes: {
    lineBreak: { control: 'boolean' }
  }
};

export default meta;
