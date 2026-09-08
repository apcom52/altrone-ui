import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { Button } from '../button/Button.tsx';
import { Empty } from './Empty.tsx';
import {
  FolderPlus,
  Inbox,
  Plus,
  RefreshCw,
  SearchX,
  Upload,
  Users,
} from 'lucide-react';

const story: Meta<typeof Empty> = {
  title: 'Components/Atoms/Empty',
  component: Empty,
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

const Frame = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-l)',
      background: 'var(--background-1)',
    }}
  >
    {children}
  </div>
);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof Empty> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Empty
      </Text>

      <Paragraph>
        <Text code>Empty</Text> is an empty-state block: an icon in a soft media
        chip, a short <Text code>title</Text>, an optional muted{' '}
        <Text code>description</Text>, and an optional row of{' '}
        <Text code>actions</Text>. It renders <Text code>role="status"</Text> so
        a state that appears after a search or filter is announced.
      </Paragraph>

      <Heading>Anatomy</Heading>
      <Paragraph>
        With nothing passed it shows a default icon and the localized “No data”.
        A lone <Text code>description</Text> (or <Text code>children</Text>, for
        back-compat) is promoted to the title; pass an explicit{' '}
        <Text code>title</Text> to get both lines.
      </Paragraph>

      <Frame>
        <Empty
          icon={<FolderPlus />}
          title="No projects yet"
          description="Projects group your work, deploys and members. Create the first one to get going."
          actions={
            <>
              <Button label="New project" icon={<Plus />} variant="submit" />
              <Button label="Import" icon={<Upload />} />
            </>
          }
        />
      </Frame>

      <Heading>Sizes</Heading>
      <Paragraph>
        <Text code>size</Text> runs the full <Text code>mini</Text> →{' '}
        <Text code>xl</Text> scale (<Text code>'m'</Text> is the default) — it
        scales the chip, the type and the padding.
      </Paragraph>

      <Flex gap="l" align="start" wrap>
        {(['mini', 's', 'm', 'l', 'xl'] as const).map((sz) => (
          <Frame key={sz}>
            <Empty size={sz} title={`size="${sz}"`} description="Muted line" />
          </Frame>
        ))}
      </Flex>

      <Heading>Just a line</Heading>
      <Paragraph>
        Inside a table, a menu or a small panel you often want one line and no
        chrome around it.
      </Paragraph>
      <Frame>
        <Empty size="s" icon={<SearchX />}>
          No results for “kubernetes”
        </Empty>
      </Frame>
    </Flex>
  ),
};

// ─── Scenario: search results ───────────────────────────────────────────────

export const NoSearchResults: StoryObj<typeof Empty> = {
  name: 'No search results',
  render: () => (
    <Frame>
      <Empty
        icon={<SearchX />}
        title="No matches"
        description="No documents match “q3 revenue forecast”. Try a shorter query or clear the filters."
        actions={<Button label="Clear filters" />}
      />
    </Frame>
  ),
};

// ─── Scenario: inbox zero ───────────────────────────────────────────────────

export const InboxZero: StoryObj<typeof Empty> = {
  name: 'Inbox zero',
  render: () => (
    <Frame>
      <Empty
        size="l"
        icon={<Inbox />}
        title="You're all caught up"
        description="No new messages. Anything that needs your attention will show up here."
      />
    </Frame>
  ),
};

// ─── Scenario: first-run with actions ───────────────────────────────────────

export const FirstRun: StoryObj<typeof Empty> = {
  name: 'First run',
  render: () => (
    <Frame>
      <Empty
        icon={<Users />}
        title="Invite your team"
        description="Altrone is better with people. Add teammates to share projects and review work together."
        actions={
          <>
            <Button
              label="Invite members"
              icon={<Plus />}
              variant="submit"
            />
            <Button label="Copy invite link" />
          </>
        }
      />
    </Frame>
  ),
};

// ─── Scenario: failed to load ───────────────────────────────────────────────

export const FailedToLoad: StoryObj<typeof Empty> = {
  name: 'Failed to load',
  render: () => (
    <Frame>
      <Empty
        icon={<RefreshCw />}
        title="Couldn't load activity"
        description="Something went wrong on our side. This usually clears up on its own."
        actions={<Button label="Retry" icon={<RefreshCw />} />}
      />
    </Frame>
  ),
};
