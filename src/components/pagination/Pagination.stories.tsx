import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, TextHeadingRoles } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Pagination } from './Pagination.tsx';
import { useState } from 'react';

const story: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const PaginationStory: StoryObj<typeof Pagination> = {
  name: 'Using Flex',
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(1);

    return (
      <Flex gap="large">
        <Text.Heading role={TextHeadingRoles.inner}>Pagination</Text.Heading>
        <Flex direction="horizontal" gap="medium">
          <Pagination currentPage={page1} totalPages={5} setPage={setPage1} />
          <Pagination currentPage={page2} totalPages={120} setPage={setPage2} />
          <Pagination currentPage={page3} totalPages={1} setPage={setPage3} />
        </Flex>
      </Flex>
    );
  },
};

export default story;
