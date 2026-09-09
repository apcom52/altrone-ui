import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { Button } from '../button/Button.tsx';
import { Result } from './Result.tsx';
import type { ResultStatus } from './Result.types.ts';
import {
  FolderPlus,
  Inbox,
  MailCheck,
  Plus,
  RefreshCw,
  RotateCcw,
  SearchX,
  ShieldAlert,
  Upload,
  Users,
} from 'lucide-react';

const story: Meta<typeof Result> = {
  title: 'Components/Display/Result',
  component: Result,
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

const STATUSES: ResultStatus[] = ['empty', 'info', 'success', 'warning', 'error'];

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof Result> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Result
      </Text>

      <Paragraph>
        <Text code>Result</Text> is a centered feedback block: an icon in a
        tinted media chip, a short <Text code>title</Text>, an optional muted{' '}
        <Text code>description</Text>, and an optional row of{' '}
        <Text code>actions</Text>. <Text code>status</Text> covers the common
        cases and sets the default icon and the chip tint; an{' '}
        <Text code>error</Text> renders <Text code>role="alert"</Text>,
        everything else <Text code>role="status"</Text>.
      </Paragraph>

      <Heading>Statuses</Heading>
      <Paragraph>
        <Text code>empty</Text> (the default — a neutral &ldquo;no data&rdquo;
        state), <Text code>info</Text>, <Text code>success</Text>,{' '}
        <Text code>warning</Text>, <Text code>error</Text>. Only the chip is
        coloured; the text stays neutral.
      </Paragraph>
      <Flex gap="l" align="start" wrap>
        {STATUSES.map((st) => (
          <Frame key={st}>
            <Result
              status={st}
              size="s"
              title={`status="${st}"`}
              description="Supporting line"
            />
          </Frame>
        ))}
      </Flex>

      <Heading>Anatomy</Heading>
      <Paragraph>
        With nothing passed it shows the <Text code>empty</Text> icon and the
        localized &ldquo;No data&rdquo;. A lone <Text code>description</Text> (or{' '}
        <Text code>children</Text>) is promoted to the title; pass an explicit{' '}
        <Text code>title</Text> to get both lines. <Text code>icon</Text>{' '}
        overrides the status glyph.
      </Paragraph>
      <Frame>
        <Result
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
            <Result size={sz} title={`size="${sz}"`} description="Muted line" />
          </Frame>
        ))}
      </Flex>

      <Heading>Just a line</Heading>
      <Paragraph>
        Inside a table, a menu or a small panel you often want one line and no
        chrome around it.
      </Paragraph>
      <Frame>
        <Result size="s" icon={<SearchX />}>
          No results for &ldquo;kubernetes&rdquo;
        </Result>
      </Frame>
    </Flex>
  ),
};

// ─── Scenario: empty — no search results ────────────────────────────────────

export const NoSearchResults: StoryObj<typeof Result> = {
  name: 'Empty — no search results',
  render: () => (
    <Frame>
      <Result
        icon={<SearchX />}
        title="No matches"
        description="No documents match “q3 revenue forecast”. Try a shorter query or clear the filters."
        actions={<Button label="Clear filters" />}
      />
    </Frame>
  ),
};

// ─── Scenario: empty — inbox zero ──────────────────────────────────────────

export const InboxZero: StoryObj<typeof Result> = {
  name: 'Empty — inbox zero',
  render: () => (
    <Frame>
      <Result
        size="l"
        icon={<Inbox />}
        title="You're all caught up"
        description="No new messages. Anything that needs your attention will show up here."
      />
    </Frame>
  ),
};

// ─── Scenario: success ─────────────────────────────────────────────────────

export const Success: StoryObj<typeof Result> = {
  name: 'Success',
  render: () => (
    <Frame>
      <Result
        status="success"
        size="l"
        icon={<MailCheck />}
        title="Invitations sent"
        description="Four teammates will get an email with a link to join the workspace."
        actions={<Button label="Back to team" variant="submit" />}
      />
    </Frame>
  ),
};

// ─── Scenario: error — failed to load ──────────────────────────────────────

export const FailedToLoad: StoryObj<typeof Result> = {
  name: 'Error — failed to load',
  render: () => (
    <Frame>
      <Result
        status="error"
        title="Couldn't load activity"
        description="Something went wrong on our side. This usually clears up on its own."
        actions={<Button label="Retry" icon={<RefreshCw />} />}
      />
    </Frame>
  ),
};

// ─── Scenario: warning — permission ────────────────────────────────────────

export const NoAccess: StoryObj<typeof Result> = {
  name: 'Warning — no access',
  render: () => (
    <Frame>
      <Result
        status="warning"
        icon={<ShieldAlert />}
        title="You don't have access to this project"
        description="Ask an owner to add you, or switch to a workspace where you're a member."
        actions={
          <>
            <Button label="Request access" variant="submit" />
            <Button label="Switch workspace" icon={<RotateCcw />} />
          </>
        }
      />
    </Frame>
  ),
};

// ─── Scenario: first-run with actions ─────────────────────────────────────

export const FirstRun: StoryObj<typeof Result> = {
  name: 'Empty — first run',
  render: () => (
    <Frame>
      <Result
        icon={<Users />}
        title="Invite your team"
        description="Altrone is better with people. Add teammates to share projects and review work together."
        actions={
          <>
            <Button label="Invite members" icon={<Plus />} variant="submit" />
            <Button label="Copy invite link" />
          </>
        }
      />
    </Frame>
  ),
};
