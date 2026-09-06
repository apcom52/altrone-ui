import { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { DocsSearch, GlobalSearch, TableFilter } from './stories';

const story: Meta<typeof Search> = {
  title: 'Components/Controls/Search',
  component: Search,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const DocsSearchStory: StoryObj = {
  name: 'Search-as-you-type in a docs sidebar',
  render: () => <DocsSearch />,
};

export const TableFilterStory: StoryObj = {
  name: 'Filtering a list',
  render: () => <TableFilter />,
};

export const GlobalSearchStory: StoryObj = {
  name: 'Search everything',
  render: () => <GlobalSearch />,
};

export default story;
