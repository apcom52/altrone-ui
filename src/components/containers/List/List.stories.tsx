import { Meta } from '@storybook/react';
import { List } from './List';
import { DishCategory, LIST_STORYDATA } from './stories/DefaultListStory';
import { Direction } from '../../../types';

export { DefaultListStory } from './stories';

const meta: Meta<typeof List<DishCategory, Direction.vertical>> = {
  component: List,
  title: 'Containers/List',
  tags: ['autodocs'],
  args: {
    data: LIST_STORYDATA,
    keyExtractor: (_, index) => index
  },
  argTypes: {
    lineBreak: { control: 'boolean' }
  }
};

export default meta;
