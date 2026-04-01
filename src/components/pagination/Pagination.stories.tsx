import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
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
  name: 'Using Pagination',
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(6);
    const [page3, setPage3] = useState(50);
    const [page4, setPage4] = useState(3);
    const [page5, setPage5] = useState(4);

    return (
      <Flex direction="vertical" gap="xl">
        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>
            Default — siblings=1, showEdgeButtons=false
          </Text>
          <Text size={3} block>
            Few pages: always shows all numbers without ellipsis
          </Text>
        </Flex>
        <Pagination
          currentPage={page1}
          totalPages={5}
          showEdgeButtons={false}
          onChange={(p) => setPage1(p)}
        />

        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>
            Many pages — current in the middle
          </Text>
          <Text size={3} block>
            Ellipsis on both sides
          </Text>
        </Flex>
        <Pagination
          currentPage={page2}
          totalPages={20}
          onChange={(p) => setPage2(p)}
        />

        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>
            Large range — siblings=2
          </Text>
          <Text size={3} block>
            Shows 2 pages on each side of the current page
          </Text>
        </Flex>
        <Pagination
          currentPage={page3}
          totalPages={100}
          siblings={2}
          onChange={(p) => setPage3(p)}
        />

        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>
            showEdgeButtons=false
          </Text>
          <Text size={3} block>
            First/last jump buttons are hidden
          </Text>
        </Flex>
        <Pagination
          currentPage={page4}
          totalPages={12}
          showEdgeButtons={false}
          onChange={(p) => setPage4(p)}
        />

        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>
            Single page
          </Text>
          <Text size={3} block>
            All navigation is disabled when there is only one page
          </Text>
        </Flex>
        <Pagination currentPage={1} totalPages={1} onChange={() => null} />

        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>
            siblings=3
          </Text>
        </Flex>
        <Pagination
          currentPage={page5}
          totalPages={10}
          siblings={3}
          onChange={(p) => setPage5(p)}
        />
      </Flex>
    );
  },
};

export default story;
