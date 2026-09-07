import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Flex, Tags, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Tags> = {
  title: 'Components/Display/Tags',
  component: Tags,
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

const Section = ({ children }: { children: string }) => (
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const TOPICS = ['AI', 'Design', 'Web', 'TypeScript', 'Performance', 'Tooling'];

export const Overview: StoryObj<typeof Tags> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Tags
      </Text>
      <Paragraph>
        <Text code>Tags</Text> is a horizontal, wrapping list of short labels —
        article topics, filters, keywords. It&rsquo;s a thin{' '}
        <Text code>Flex</Text> wrapper (<Text code>wrap</Text>,{' '}
        <Text code>gap="m"</Text>); each <Text code>Tags.Item</Text> is a single
        label.
      </Paragraph>
      <Paragraph>
        An item renders as an <Text code>&lt;a&gt;</Text> when given{' '}
        <Text code>href</Text>, as a <Text code>role="button"</Text>{' '}
        <Text code>&lt;span&gt;</Text> when given <Text code>onClick</Text>, and
        as a plain inert <Text code>&lt;span&gt;</Text> otherwise — only the
        interactive forms get the hover underline and pointer cursor.
      </Paragraph>

      <Tags>
        <Tags.Item label="#AI" href="#ai" />
        <Tags.Item label="#Design" href="#design" />
        <Tags.Item label="#TypeScript" href="#typescript" />
        <Tags.Item label="#Performance" href="#performance" />
      </Tags>
    </Flex>
  ),
};

export const Links: StoryObj<typeof Tags> = {
  name: 'As links',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>As links</Section>
      <Paragraph>
        Pass <Text code>href</Text> and the item is a real anchor — focusable,
        right-clickable, and it opens in a new tab with{' '}
        <Text code>target="_blank"</Text> like any <Text code>&lt;a&gt;</Text>.
      </Paragraph>

      <Tags>
        {TOPICS.map((topic) => (
          <Tags.Item key={topic} label={`#${topic}`} href={`/tags/${topic}`} />
        ))}
      </Tags>
    </Flex>
  ),
};

export const Clickable: StoryObj<typeof Tags> = {
  name: 'Clickable',
  render: () => {
    const [selected, setSelected] = useState<string[]>(['AI']);

    const toggle = (topic: string) =>
      setSelected((current) =>
        current.includes(topic)
          ? current.filter((t) => t !== topic)
          : [...current, topic],
      );

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Section>Clickable</Section>
        <Paragraph>
          With <Text code>onClick</Text> and no <Text code>href</Text>, the item
          becomes a keyboard-operable button (<Text code>Enter</Text> /{' '}
          <Text code>Space</Text> activate it). Here each tag toggles a filter.
        </Paragraph>

        <Tags>
          {TOPICS.map((topic) => (
            <Tags.Item
              key={topic}
              label={selected.includes(topic) ? `#${topic} ✓` : `#${topic}`}
              onClick={() => toggle(topic)}
            />
          ))}
        </Tags>
        <Text block size={3} color="muted">
          Selected: {selected.length ? selected.join(', ') : 'none'}
        </Text>
      </Flex>
    );
  },
};

export const DisplayOnly: StoryObj<typeof Tags> = {
  name: 'Display only',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Display only</Section>
      <Paragraph>
        An item with neither <Text code>href</Text> nor{' '}
        <Text code>onClick</Text> is inert text — no cursor, no hover state, not
        in the tab order. Use it for a read-only keyword list.
      </Paragraph>

      <Tags>
        {TOPICS.map((topic) => (
          <Tags.Item key={topic} label={`#${topic}`} />
        ))}
      </Tags>
    </Flex>
  ),
};

export const RouterLinks: StoryObj<typeof Tags> = {
  name: 'Router links (asChild)',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Router links</Section>
      <Paragraph>
        <Text code>asChild</Text> merges the tag styling onto a single child
        element — a framework&rsquo;s <Text code>&lt;Link&gt;</Text>, say —
        instead of rendering its own <Text code>&lt;a&gt;</Text>.
      </Paragraph>

      <Tags>
        {TOPICS.map((topic) => (
          <Tags.Item key={topic} label={`#${topic}`} asChild>
            <a href={`/tags/${topic}`}>#{topic}</a>
          </Tags.Item>
        ))}
      </Tags>
    </Flex>
  ),
};

export const InContext: StoryObj<typeof Tags> = {
  name: 'In context',
  render: () => (
    <Flex direction="vertical" gap="m" style={{ maxWidth: 560 }}>
      <Text block size={7} weight="bold">
        Concentric radius, explained
      </Text>
      <Text block size={4} color="muted">
        Why nested rounded corners need to share a centre, and the one-line
        formula that keeps them honest.
      </Text>
      <Tags>
        <Tags.Item label="#Design" href="/tags/design" />
        <Tags.Item label="#CSS" href="/tags/css" />
        <Tags.Item label="#Radius" href="/tags/radius" />
      </Tags>
    </Flex>
  ),
};
