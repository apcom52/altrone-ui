import { Meta, StoryObj } from '@storybook/react';
import React, { ReactElement, useRef } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Download,
  Image,
  Italic,
  Link,
  Play,
  Save,
  Settings,
  Sparkles,
  Strikethrough,
  Table,
  Terminal,
  Trash,
  Underline,
} from 'lucide-react';
import { Avatar, Button, Divider, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Tooltip } from './Tooltip.tsx';

const story: Meta<typeof Tooltip> = {
  title: 'Components/Containers/Tooltip',
  component: Tooltip,
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

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 620, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Text block size={3} color="muted">
    {children}
  </Text>
);

// ─── 1. The basics ───────────────────────────────────────────────────────────

export const OverviewStory: StoryObj<typeof Tooltip> = {
  name: 'Hover, focus, and a shortcut',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Text size={7} weight="bold" block>
        Tooltip
      </Text>
      <Paragraph>
        A floating label anchored to a trigger via floating-ui, with a
        directional arrow. It opens 500ms after a hover, immediately on
        keyboard focus, and closes as soon as the pointer leaves or focus
        moves away. <Text code>kbd</Text> appends a shortcut badge after the
        text.
      </Paragraph>
      <Flex orientation="horizontal" gap="l" align="center" wrap>
        <Tooltip content="File not found on the server" />
        <Tooltip content="Click to open settings">
          <Button icon={<Settings />} label="Settings" />
        </Tooltip>
        <Tooltip content="Run tests" kbd="⌘+T">
          <Button icon={<Play />} label="Tests" showLabel={false} />
        </Tooltip>
        <Tooltip content="Save changes" kbd="⌘+S">
          <Button
            icon={<Save />}
            label="Save"
            showLabel={false}
            variant="submit"
          />
        </Tooltip>
        <Tooltip content="Delete permanently" kbd="⌫">
          <Button icon={<Trash />} label="Delete" showLabel={false} danger />
        </Tooltip>
      </Flex>
      <Caption>
        The leftmost tooltip has no <Text code>children</Text> at all — an
        icon button is rendered automatically (customizable via{' '}
        <Text code>triggerIcon</Text>).
      </Caption>
    </Flex>
  ),
};

// ─── 2. Title, width, and rich content ───────────────────────────────────────

export const RichContentStory: StoryObj<typeof Tooltip> = {
  name: 'Title, width, and rich content',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>A bold heading, and how wide the panel gets</Heading>
      <Paragraph>
        <Text code>title</Text> adds a bold line above <Text code>content</Text>.{' '}
        <Text code>maxWidth</Text> overrides the 300px default — narrower for a
        short label, wider for a paragraph. <Text code>content</Text> also
        accepts a <Text code>ReactElement</Text>, not just a string.
      </Paragraph>
      <Flex orientation="horizontal" gap="l" align="center" wrap>
        <Tooltip
          title="Keyboard shortcut"
          content="Open the editor's command palette"
          kbd="⌘+P"
        >
          <Button icon={<Terminal />} label="Commands" />
        </Tooltip>
        <Tooltip content="Brief" maxWidth={120}>
          <Button label="Narrow" />
        </Tooltip>
        <Tooltip
          title="Setting description"
          content="Enables an experimental WebGPU-based renderer. May be unstable on some GPUs and driver versions."
          maxWidth={420}
        >
          <Button label="Wide" />
        </Tooltip>
        <Tooltip
          content={
            <Flex orientation="vertical" gap="xs">
              <Text weight="bold">Plan limits</Text>
              <Text size={3}>5 projects · 3 team members · 10 GB storage</Text>
            </Flex>
          }
          maxWidth={240}
        >
          <Avatar firstName="Alex" lastName="Petrov" color="#6366f1" size="s" />
        </Tooltip>
      </Flex>
    </Flex>
  ),
};

// ─── 3. Placement ─────────────────────────────────────────────────────────────

export const PlacementStory: StoryObj<typeof Tooltip> = {
  name: 'Placement, and auto-flip near edges',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Six anchors</Heading>
      <Paragraph>
        <Text code>placement</Text> takes any floating-ui position, defaulting
        to <Text code>'top'</Text>. Both <Text code>flip</Text> and{' '}
        <Text code>shift</Text> are always on, so a tooltip that would run off
        the viewport near an edge repositions itself automatically.
      </Paragraph>
      <Flex orientation="horizontal" gap="l" align="center" wrap>
        {(
          [
            ['top', 'Top'],
            ['bottom', 'Bottom'],
            ['left', 'Left'],
            ['right', 'Right'],
            ['top-start', 'Top-start'],
            ['top-end', 'Top-end'],
          ] as const
        ).map(([placement, label]) => (
          <Tooltip
            key={placement}
            content={`placement="${placement}"`}
            placement={placement}
          >
            <Button size="s" label={label} />
          </Tooltip>
        ))}
      </Flex>
    </Flex>
  ),
};

// ─── 4. A disabled trigger ────────────────────────────────────────────────────

export const DisabledTriggerStory: StoryObj<typeof Tooltip> = {
  name: 'Wrapping a disabled trigger',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>No mouse events, no tooltip</Heading>
      <Paragraph>
        A disabled <Text code>{'<button>'}</Text> fires no pointer events at
        all, so a tooltip on it directly never opens. Wrap it in a plain{' '}
        <Text code>{'<span>'}</Text> instead — the span becomes the trigger
        and forwards hover/focus to <Text code>Tooltip</Text>, while the
        button underneath stays visibly disabled.
      </Paragraph>
      <Tooltip content="Select at least one row first">
        <span>
          <Button icon={<Download />} label="Export" disabled />
        </span>
      </Tooltip>
    </Flex>
  ),
};

// ─── 5. Components that tooltip themselves ───────────────────────────────────

const TOOLBAR_GROUPS: { icon: ReactElement; label: string; kbd?: string }[][] = [
  [
    { icon: <Bold />, label: 'Bold', kbd: '⌘+B' },
    { icon: <Italic />, label: 'Italic', kbd: '⌘+I' },
    { icon: <Underline />, label: 'Underline', kbd: '⌘+U' },
    { icon: <Strikethrough />, label: 'Strikethrough', kbd: '⌘+⇧+S' },
  ],
  [
    { icon: <AlignLeft />, label: 'Align left', kbd: '⌘+⇧+L' },
    { icon: <AlignCenter />, label: 'Align center', kbd: '⌘+⇧+E' },
    { icon: <AlignRight />, label: 'Align right', kbd: '⌘+⇧+R' },
  ],
  [
    { icon: <Link />, label: 'Insert link', kbd: '⌘+K' },
    { icon: <Image />, label: 'Insert image' },
    { icon: <Table />, label: 'Insert table' },
  ],
];

export const ToolbarStory: StoryObj<typeof Tooltip> = {
  name: 'Components that tooltip themselves',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Don&rsquo;t wrap a self-tooltipping control</Heading>
      <Paragraph>
        An icon-only <Text code>Button</Text> (<Text code>showLabel={'{false}'}</Text>)
        already renders its own <Text code>Tooltip</Text> from{' '}
        <Text code>label</Text>. Wrapping it in another <Text code>Tooltip</Text>{' '}
        stacks two panels that both open on hover — instead, override the text
        with the button&rsquo;s <Text code>tooltip</Text> prop and add the
        shortcut with <Text code>kbd</Text>.
      </Paragraph>
      <Flex
        orientation="horizontal"
        gap="xs"
        align="center"
        style={{
          background: 'var(--glass-background-color)',
          border: '1px solid var(--border-1)',
          borderRadius: 12,
          padding: '6px 10px',
          width: 'fit-content',
        }}
      >
        {TOOLBAR_GROUPS.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 ? (
              <Divider
                orientation="vertical"
                style={{ height: 20, margin: '0 4px' }}
              />
            ) : null}
            {group.map(({ icon, label, kbd }) => (
              <Button
                key={label}
                icon={icon}
                label={label}
                kbd={kbd}
                showLabel={false}
                variant="text"
              />
            ))}
          </React.Fragment>
        ))}
      </Flex>
      <Caption>
        Every button here shows a tooltip on hover, but none of them is wrapped
        in <Text code>{'<Tooltip>'}</Text>.
      </Caption>
    </Flex>
  ),
};

// ─── 6. A ref that survives the chain ────────────────────────────────────────

function RefChainDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focused, setFocused] = React.useState(false);

  return (
    <Flex orientation="vertical" gap="m" align="start">
      <Tooltip content="Also readable via its own ref" title="Sparkles">
        <Button
          ref={buttonRef}
          icon={<Sparkles />}
          label="Format document"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </Tooltip>
      <Caption>
        Button&rsquo;s own <Text code>ref</Text>{' '}
        {focused ? 'is focused right now.' : 'is idle.'} It still points at the
        real button — <Text code>Tooltip</Text> merges its own reference
        tracking with the child&rsquo;s <Text code>ref</Text> instead of
        replacing it.
      </Caption>
    </Flex>
  );
}

export const RefChainStory: StoryObj<typeof Tooltip> = {
  name: 'A ref on the wrapped element',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Refs pass through untouched</Heading>
      <Paragraph>
        <Text code>{'<Tooltip><Button ref={x} /></Tooltip>'}</Text> is a common
        shape — a <Text code>Button</Text> inside a <Text code>Tooltip</Text>{' '}
        inside a <Text code>Dropdown</Text> trigger, say. <Text code>Tooltip</Text>{' '}
        needs the child&rsquo;s DOM node for floating-ui&rsquo;s own
        positioning, but that must never come at the cost of the ref the
        consumer put there themselves.
      </Paragraph>
      <RefChainDemo />
    </Flex>
  ),
};

// ─── 7. Custom icons ─────────────────────────────────────────────────────────

export const CustomIconStory: StoryObj<typeof Tooltip> = {
  name: 'Custom trigger icon',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Custom trigger icon</Heading>
      <Paragraph>
        <Text code>triggerIcon</Text> replaces the auto-generated trigger&rsquo;s
        icon — a role shared with <Text code>Form</Text>&rsquo;s hint button,
        also settable once for both via <Text code>Application</Text>&apos;s{' '}
        <Text code>icons</Text> prop. Has no effect when a custom trigger is
        passed via <Text code>children</Text>.
      </Paragraph>
      <Flex orientation="horizontal" gap="l" align="center">
        <Tooltip content="What is this?" triggerIcon={<Sparkles />} />
      </Flex>
    </Flex>
  ),
};

// ─── 8. Trigger modes ─────────────────────────────────────────────────────────

export const TriggerModesStory: StoryObj<typeof Tooltip> = {
  name: 'Trigger modes',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Hover, focus, click, or a mix</Heading>
      <Paragraph>
        <Text code>trigger</Text> accepts a single mode or an array of
        modes — <Text code>'hover'</Text>, <Text code>'focus'</Text>,{' '}
        <Text code>'click'</Text>. It defaults to{' '}
        <Text code>{"['hover', 'focus']"}</Text>, the previous fixed
        behavior.
      </Paragraph>
      <Flex orientation="horizontal" gap="l" align="center" wrap>
        <Tooltip content="Opens on hover only" trigger="hover">
          <Button label="Hover only" />
        </Tooltip>
        <Tooltip content="Opens on keyboard focus only" trigger="focus">
          <Button label="Focus only" />
        </Tooltip>
        <Tooltip content="Opens on click, closes on outside press" trigger="click">
          <Button label="Click only" />
        </Tooltip>
        <Tooltip
          content="Opens on hover, focus, or click"
          trigger={['hover', 'focus', 'click']}
        >
          <Button label="Hover, focus, and click" />
        </Tooltip>
      </Flex>
    </Flex>
  ),
};

// ─── 9. Default open and onOpenChange ────────────────────────────────────────

function OpenStateDemo() {
  const [log, setLog] = React.useState<string[]>([]);

  return (
    <Flex orientation="vertical" gap="m" align="start">
      <Tooltip
        content="Starts open, and reports every change below"
        defaultOpen
        onOpenChange={(open, _event, reason) =>
          setLog((prev) => [...prev, `${open ? 'opened' : 'closed'} (${reason ?? 'initial'})`])
        }
      >
        <Button label="Hover, then move away" />
      </Tooltip>
      <Flex orientation="vertical" gap="xs">
        {log.length === 0 ? (
          <Caption>No changes yet.</Caption>
        ) : (
          log.map((entry, index) => <Caption key={index}>{entry}</Caption>)
        )}
      </Flex>
    </Flex>
  );
}

export const OpenStateStory: StoryObj<typeof Tooltip> = {
  name: 'Default open and onOpenChange',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>An uncontrolled tooltip that still reports its state</Heading>
      <Paragraph>
        <Text code>defaultOpen</Text> shows the tooltip on first render — this
        one starts open. <Text code>onOpenChange</Text> fires on every
        transition (<Text code>reason</Text> comes straight from floating-ui,
        e.g. <Text code>'hover'</Text> or <Text code>'escape-key'</Text>) so a
        consumer can observe or log the state without taking over control of
        it.
      </Paragraph>
      <OpenStateDemo />
    </Flex>
  ),
};
