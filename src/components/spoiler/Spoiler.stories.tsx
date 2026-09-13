import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Spoiler } from './Spoiler.tsx';

const story: Meta<typeof Spoiler> = {
  title: 'Components/Containers/Spoiler',
  component: Spoiler,
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
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Prose = ({ children }: { children: React.ReactNode }) => (
  <Text block size={3} style={{ lineHeight: 1.6 }}>
    {children}
  </Text>
);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof Spoiler> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Text block size={9} weight="bold">
        Spoiler
      </Text>
      <Paragraph>
        <Text code>Spoiler</Text> is an uncontrolled disclosure: a heading that
        stays visible and a content area that expands and collapses beneath it.
        The heading is a real <Text code>&lt;button&gt;</Text> with{' '}
        <Text code>aria-expanded</Text>, and it shows a <Text code>+</Text> when
        closed, a <Text code>−</Text> when open. Height animates over 200 ms.
      </Paragraph>

      <Spoiler title="What is altrone-ui?">
        <Prose>
          A React component library with a design-token system — spacing,
          colour, radius and motion all come from CSS custom properties, so
          components stay visually consistent and theme-aware.
        </Prose>
      </Spoiler>
    </Flex>
  ),
};

// ─── Open by default ────────────────────────────────────────────────────────

export const OpenByDefault: StoryObj<typeof Spoiler> = {
  name: 'Open by default',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Heading>Open by default</Heading>
      <Paragraph>
        Pass <Text code>openedByDefault</Text> to render the spoiler expanded on
        mount. State is still uncontrolled afterwards — the component owns it.
      </Paragraph>

      <Spoiler title="Installation" openedByDefault>
        <Prose>
          Add the package and its peer dependencies, then import styles.
        </Prose>
      </Spoiler>
    </Flex>
  ),
};

// ─── Grouped ────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: 'Can I use it with Next.js?',
    a: 'Yes. Components are SSR-safe and read no browser APIs during render.',
  },
  {
    q: 'Is it tree-shakeable?',
    a: 'Yes — the package ships ES modules, so bundlers drop unused components.',
  },
  {
    q: 'How do I change the accent colour?',
    a: 'Set data-altrone-accent on the application root; every accent token follows.',
  },
];

export const Grouped: StoryObj<typeof Spoiler> = {
  name: 'Grouped',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Heading>Grouped</Heading>
      <Paragraph>
        Adjacent spoilers get a divider and a little top padding between them
        automatically, so a stack reads as one list — an FAQ, a set of nested
        settings.
      </Paragraph>

      <Flex direction="vertical">
        {FAQ.map(({ q, a }) => (
          <Spoiler key={q} title={q}>
            <Prose>{a}</Prose>
          </Spoiler>
        ))}
      </Flex>
    </Flex>
  ),
};

// ─── Toggle callback ────────────────────────────────────────────────────────

const SECTIONS = [
  { title: 'Appearance', body: 'Theme, accent colour, reduced motion.' },
  { title: 'Notifications', body: 'Comments, mentions, weekly digest.' },
  { title: 'Privacy & data', body: 'Usage analytics, crash reports, profile.' },
  { title: 'Developer', body: 'API keys, debug logging, SDK version.' },
];

export const ToggleCallback: StoryObj<typeof Spoiler> = {
  name: 'Toggle callback',
  render: () => {
    const [openCount, setOpenCount] = useState(1);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
        <Heading>Toggle callback</Heading>
        <Paragraph>
          <Text code>onToggle(opened, event)</Text> fires after each toggle;{' '}
          <Text code>opened</Text> is the state the spoiler is moving to. Here
          it keeps a running count of open sections.
        </Paragraph>

        <Text block size={3} color="muted">
          {openCount} section{openCount === 1 ? '' : 's'} open
        </Text>

        <Flex direction="vertical">
          {SECTIONS.map(({ title, body }, i) => (
            <Spoiler
              key={title}
              title={title}
              openedByDefault={i === 0}
              onToggle={(opened) =>
                setOpenCount((n) => (opened ? n + 1 : n - 1))
              }
            >
              <Prose>{body}</Prose>
            </Spoiler>
          ))}
        </Flex>
      </Flex>
    );
  },
};

// ─── Rich heading and content ──────────────────────────────────────────────

export const RichContent: StoryObj<typeof Spoiler> = {
  name: 'Rich heading and content',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Heading>Rich heading and content</Heading>
      <Paragraph>
        <Text code>title</Text> takes any node, not just a string — pair a label
        with a count or a status. The content area is a plain container; put
        whatever layout you need inside.
      </Paragraph>

      <Spoiler
        title={
          <Flex gap="s" align="center" justify="between">
            <Text weight="bold">Attachments</Text>
            <Text size={2} color="muted">
              3 files
            </Text>
          </Flex>
        }
        openedByDefault
      >
        <Flex direction="vertical" gap="s">
          {['design-spec.pdf', 'screenshot.png', 'notes.md'].map((file) => (
            <Text key={file} size={3}>
              {file}
            </Text>
          ))}
        </Flex>
      </Spoiler>
    </Flex>
  ),
};

// ─── Accessibility ─────────────────────────────────────────────────────────

export const Accessibility: StoryObj<typeof Spoiler> = {
  name: 'Accessibility',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Heading>Accessibility</Heading>
      <Paragraph>
        The heading is a native <Text code>&lt;button&gt;</Text>, so it&rsquo;s
        focusable and toggles on <Text code>Enter</Text> and{' '}
        <Text code>Space</Text> with no extra handlers. It exposes{' '}
        <Text code>aria-expanded</Text> and <Text code>aria-controls</Text>{' '}
        pointing at the content region; the <Text code>+</Text> /{' '}
        <Text code>−</Text> icon is <Text code>aria-hidden</Text> since the
        state is already announced. Focus shows a{' '}
        <Text code>:focus-visible</Text> ring only.
      </Paragraph>

      <Spoiler title="Keyboard: focus me and press Enter">
        <Prose>Toggled entirely from the keyboard.</Prose>
      </Spoiler>
    </Flex>
  ),
};
