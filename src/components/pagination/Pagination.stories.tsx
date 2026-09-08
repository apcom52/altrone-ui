import { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Pagination } from './Pagination.tsx';

const story: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
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

export default story;

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 16 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Case = ({ title, children }: { title: string; children: ReactNode }) => (
  <Flex direction="vertical" gap="s">
    <Text size={3} weight="medium" block>
      {title}
    </Text>
    {children}
  </Flex>
);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof Pagination> = {
  name: 'Overview',
  render: () => {
    const [page, setPage] = useState(6);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={9} weight="bold">
          Pagination
        </Text>

        <Paragraph>
          <Text code>Pagination</Text> is a controlled page switcher — a{' '}
          <Text code>&lt;nav&gt;</Text> landmark with previous/next arrows,{' '}
          numbered page buttons, and (by default) first/last jumps. You own the{' '}
          state: pass <Text code>currentPage</Text> and{' '}
          <Text code>totalPages</Text>, and update your state from{' '}
          <Text code>onChange(page, event)</Text>.
        </Paragraph>

        <Heading>The number window</Heading>
        <Paragraph>
          It always shows page 1 and the last page, plus{' '}
          <Text code>siblings</Text> pages on each side of the current one (
          <Text code>1</Text> by default). Gaps collapse into an ellipsis. The
          current page button is <Text code>selected</Text> and carries{' '}
          <Text code>aria-current="page"</Text>; arrows disable at the ends.
        </Paragraph>

        <Flex direction="vertical" gap="xs">
          <Pagination
            currentPage={page}
            totalPages={20}
            onChange={(p) => setPage(p)}
          />
          <Text size={2} color="muted" block>
            page {page} of 20
          </Text>
        </Flex>

        <Heading>Variations</Heading>

        <Case title="Few pages — no ellipsis">
          <Pagination currentPage={2} totalPages={5} onChange={() => {}} />
        </Case>

        <Case title="siblings={2}">
          <Pagination
            currentPage={50}
            totalPages={100}
            siblings={2}
            onChange={() => {}}
          />
        </Case>

        <Case title="showEdgeButtons={false}">
          <Pagination
            currentPage={4}
            totalPages={12}
            showEdgeButtons={false}
            onChange={() => {}}
          />
        </Case>

        <Case title="At the last page — next/last disabled">
          <Pagination currentPage={12} totalPages={12} onChange={() => {}} />
        </Case>

        <Case title="Single page — everything disabled">
          <Pagination currentPage={1} totalPages={1} onChange={() => {}} />
        </Case>
      </Flex>
    );
  },
};

// ─── Interactive ─────────────────────────────────────────────────────────────

export const Interactive: StoryObj<typeof Pagination> = {
  name: 'Interactive',
  args: {
    currentPage: 1,
    totalPages: 25,
    siblings: 1,
    showEdgeButtons: true,
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return (
      <Flex direction="vertical" gap="s">
        <Pagination
          {...args}
          currentPage={page}
          onChange={(p) => setPage(p)}
        />
        <Text size={2} color="muted" block>
          page {page} of {args.totalPages}
        </Text>
      </Flex>
    );
  },
};
