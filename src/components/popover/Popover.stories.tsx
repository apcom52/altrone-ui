import { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { useListItem } from '@floating-ui/react';
import {
  ChevronDown,
  Copy,
  Filter,
  Info,
  Link2,
  MapPin,
  RefreshCw,
  ShieldAlert,
  Smile,
  Trash2,
} from 'lucide-react';
import { Button, Flex, Progress, Switcher, Text, TextInput } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Popover } from './Popover.tsx';
import type { PopoverRef, PopoverTrigger } from './Popover.types.ts';
import { getAllPlacements } from './utils/placementUtils';

const story: Meta<typeof Popover> = {
  title: 'Components/Containers/Popover',
  component: Popover,
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
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Text block size={3} color="muted">
    {children}
  </Text>
);

// ─── 1. Triggers ─────────────────────────────────────────────────────────────

export const TriggersStory: StoryObj<typeof Popover> = {
  name: 'Ways to open',
  render: () => {
    const cases: { trigger: PopoverTrigger | PopoverTrigger[]; note: string }[] =
      [
        { trigger: 'click', note: 'Tap to open, tap-away or Esc to close.' },
        {
          trigger: 'hover',
          note: 'Opens after 500 ms, closes 250 ms after you leave (safe-polygon path to the panel).',
        },
        {
          trigger: 'focus',
          note: 'Opens on keyboard focus only (`visibleOnly`). Great for hint bubbles on inputs.',
        },
        {
          trigger: ['click', 'focus'],
          note: 'Combined — a click opens it without instantly re-closing on the focus that follows.',
        },
      ];

    return (
      <Flex direction="vertical" gap="xl" style={{ maxWidth: 640 }}>
        <Text size={7} weight="bold" block>
          Popover
        </Text>
        <Paragraph>
          A floating panel anchored to a trigger element via floating-ui. It
          portals to the app root, traps focus, closes on Esc / outside-press,
          and animates in and out.
        </Paragraph>

        <Heading>Ways to open</Heading>
        <Paragraph>
          The <Text code>trigger</Text> prop takes <Text code>'click'</Text>,{' '}
          <Text code>'hover'</Text>, <Text code>'focus'</Text>, or an array of
          them.
        </Paragraph>
        <Flex direction="horizontal" gap="l" wrap>
          {cases.map(({ trigger, note }) => (
            <Flex
              key={String(trigger)}
              direction="vertical"
              gap="s"
              style={{ width: 260 }}
            >
              <Popover
                trigger={trigger}
                content={
                  <Text size={3} style={{ maxWidth: 200 }}>
                    {note}
                  </Text>
                }
              >
                <Button
                  label={
                    Array.isArray(trigger) ? trigger.join(' + ') : trigger
                  }
                />
              </Popover>
              <Caption>{note}</Caption>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  },
};

// ─── 2. Placement, auto-flip, matching width ────────────────────────────────

export const AnchoringStory: StoryObj<typeof Popover> = {
  name: 'Anchoring, auto-flip & matching width',
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 720 }}>
      <Heading>Twelve anchors</Heading>
      <Paragraph>
        <Text code>placement</Text> accepts every floating-ui position. Each
        button below opens its panel on the named side; <Text code>shift</Text>{' '}
        keeps it in view near screen edges.
      </Paragraph>
      <Flex
        direction="horizontal"
        gap="m"
        wrap
        style={{ maxWidth: 560, margin: '40px 0' }}
      >
        {getAllPlacements().map(({ value, label }) => (
          <Popover
            key={value}
            placement={value}
            content={<Text size={3}>Placed at “{label}”.</Text>}
          >
            <Button size="s" label={label} />
          </Popover>
        ))}
      </Flex>

      <Heading>Auto</Heading>
      <Paragraph>
        <Text code>placement="auto"</Text> lets floating-ui pick whichever side
        has room. Scroll this one to the edge of the viewport and reopen — it
        flips to stay visible.
      </Paragraph>
      <Popover
        placement="auto"
        content={<Text size={3}>I land wherever I fit.</Text>}
      >
        <Button icon={<MapPin />} label="Auto-placed" />
      </Popover>

      <Heading>Matching the trigger's width</Heading>
      <Paragraph>
        <Text code>parentWidth</Text> stretches the panel to the trigger's
        exact width — useful when the panel is a preview of the control itself,
        not an independently-sized menu.
      </Paragraph>
      <Popover
        parentWidth
        placement="bottom"
        content={
          <Flex direction="vertical" gap="xs" style={{ padding: '2px 0' }}>
            <Text size={3} color="muted">
              Q3 coverage
            </Text>
            <Progress value={72} max={100} />
            <Text size={2} color="muted">
              72% of target reached
            </Text>
          </Flex>
        }
      >
        <Button label="Export quarterly report" style={{ width: 280 }} />
      </Popover>
    </Flex>
  ),
};

// ─── 3. Overlap + list navigation ────────────────────────────────────────────

const EMOJIS = ['👍', '❤️', '😂', '🎉', '👀'];

/** Registers itself with the enclosing `FloatingList` so arrow keys can reach it. */
const ReactionButton = ({
  emoji,
  selected,
  onSelect,
}: {
  emoji: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  const { ref } = useListItem();

  return (
    <Button
      ref={ref}
      variant={selected ? 'submit' : 'default'}
      label={emoji}
      onClick={onSelect}
      style={{ fontSize: 18, minWidth: 40 }}
    />
  );
};

export const ReactionsStory: StoryObj<typeof Popover> = {
  name: 'Reactions: overlap + arrow-key picking',
  render: () => {
    const [picked, setPicked] = useState('👍');
    const [virtualFocus, setVirtualFocus] = useState(false);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
        <Heading>Overlap + list navigation</Heading>
        <Paragraph>
          <Text code>overlap</Text> lets the panel cover its trigger — the
          reaction button becomes the row's first slot instead of pushing
          content below it. <Text code>listNavigation</Text> (with{' '}
          <Text code>defaultListNavigationIndex</Text>) lets Arrow keys walk the
          row, starting on “🎉”; each button registers itself via floating-ui's{' '}
          <Text code>useListItem()</Text> — that's the same mechanism{' '}
          <Text code>Dropdown</Text> uses internally, available directly on{' '}
          <Text code>Popover</Text> for content that isn't a menu.
        </Paragraph>
        <Flex direction="horizontal" gap="m" align="center">
          <Popover
            overlap
            listNavigation
            defaultListNavigationIndex={3}
            virtualNavigationFocus={virtualFocus}
            placement="bottom-start"
            content={({ closePopup }) => (
              <Flex direction="horizontal" gap="xs">
                {EMOJIS.map((emoji) => (
                  <ReactionButton
                    key={emoji}
                    emoji={emoji}
                    selected={emoji === picked}
                    onSelect={() => {
                      setPicked(emoji);
                      closePopup();
                    }}
                  />
                ))}
              </Flex>
            )}
          >
            <Button icon={<Smile />} label={`You reacted ${picked}`} />
          </Popover>
          <Switcher checked={virtualFocus} onChange={setVirtualFocus}>
            Virtual focus
          </Switcher>
        </Flex>
        <Caption>
          <Text code>virtualNavigationFocus</Text> swaps real DOM focus moves for
          an <Text code>aria-activedescendant</Text> — the row stays visually
          the same either way.
        </Caption>
      </Flex>
    );
  },
};

// ─── 4. Titled dialog + focus trap ───────────────────────────────────────────

export const ShareStory: StoryObj<typeof Popover> = {
  name: 'A share panel',
  render: () => {
    const [copied, setCopied] = useState(false);
    const [restricted, setRestricted] = useState(true);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
        <Heading>Header, close button, trapped focus</Heading>
        <Paragraph>
          <Text code>title</Text> plus <Text code>showCloseButton</Text> turn
          the panel into a labelled <Text code>role="dialog"</Text>.{' '}
          <Text code>focusTrap</Text> (on by default) keeps Tab cycling inside
          it — try tabbing through the field, the switch and the close button
          without ever leaving the panel.
        </Paragraph>
        <Popover
          title="Share “Q3 roadmap”"
          showCloseButton
          placement="bottom-start"
          content={
            <Flex direction="vertical" gap="m" style={{ width: 280 }}>
              <TextInput value="https://altrone.app/d/q3-roadmap" readOnly size="s">
                <TextInput.ActionIsland
                  placement="end"
                  label="Copy link"
                  icon={<Copy />}
                  showLabel={false}
                  onClick={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                  }}
                />
              </TextInput>
              {copied && <Caption>Copied to clipboard.</Caption>}
              <Switcher checked={restricted} onChange={setRestricted}>
                Only people I invite
              </Switcher>
            </Flex>
          }
        >
          <Button label="Share" icon={<Link2 />} />
        </Popover>
      </Flex>
    );
  },
};

// ─── 5. Nested + closeAllSequence ────────────────────────────────────────────

const ConfirmField = ({ onConfirm }: { onConfirm: () => void }) => {
  const [value, setValue] = useState('');

  return (
    <Flex direction="horizontal" gap="s">
      <TextInput
        value={value}
        onChange={setValue}
        placeholder="DELETE"
        size="s"
      />
      <Button
        label="Confirm"
        variant="submit"
        danger
        disabled={value !== 'DELETE'}
        onClick={onConfirm}
      />
    </Flex>
  );
};

export const NestedStory: StoryObj<typeof Popover> = {
  name: 'Confirm, twice — then bail out of both',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
      <Heading>Nested popovers</Heading>
      <Paragraph>
        A popover opened from inside another popover's content stacks on top of
        it. Both levels get their own <Text code>closePopup</Text>; the inner
        one also gets <Text code>closeAllSequence</Text> to collapse the whole
        chain — a single "never mind" that doesn't require closing each level
        in turn.
      </Paragraph>
      <Popover
        title="Delete workspace"
        showCloseButton
        content={({ closePopup }) => (
          <Flex direction="vertical" gap="m" style={{ width: 260 }}>
            <Text size={3}>This removes every project inside it.</Text>
            <Flex direction="horizontal" gap="s" justify="end">
              <Button label="Cancel" onClick={closePopup} />
              <Popover
                placement="bottom-end"
                title="Are you really sure?"
                content={({ closeAllSequence }) => (
                  <Flex direction="vertical" gap="m" style={{ width: 240 }}>
                    <Text size={3}>
                      Type <Text code>DELETE</Text> below. This can't be undone.
                    </Text>
                    <ConfirmField onConfirm={closeAllSequence} />
                    <Button
                      variant="text"
                      label="Never mind, cancel everything"
                      onClick={closeAllSequence}
                    />
                  </Flex>
                )}
              >
                <Button
                  label="Continue"
                  variant="submit"
                  danger
                  icon={<Trash2 />}
                />
              </Popover>
            </Flex>
          </Flex>
        )}
      >
        <Button label="Delete workspace" danger icon={<ShieldAlert />} />
      </Popover>
    </Flex>
  ),
};

// ─── 6. openedByDefault + enabled ────────────────────────────────────────────

export const AvailabilityStory: StoryObj<typeof Popover> = {
  name: 'Opened by default, and switched off entirely',
  render: () => {
    const [dismissed, setDismissed] = useState(false);
    const [ticketsEnabled, setTicketsEnabled] = useState(true);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
        <Heading>An onboarding hint</Heading>
        <Paragraph>
          <Text code>openedByDefault</Text> starts a popover open on mount —
          handy for a one-time coach-mark. It's still an ordinary,
          uncontrolled popover afterwards: closing it just closes it, the
          trigger reopens it normally.
        </Paragraph>
        <Popover
          openedByDefault
          placement="right"
          title="New: quick filters"
          showCloseButton
          content={
            <Text size={3} style={{ maxWidth: 220 }}>
              Filter by owner or status without leaving this page.
            </Text>
          }
          onOpenChange={(open) => setDismissed(!open)}
        >
          <Button icon={<Filter />} label="Filters" />
        </Popover>
        <Caption>
          {dismissed
            ? 'Dismissed — click “Filters” to open it like any other popover.'
            : 'Open by default, as soon as this story mounts.'}
        </Caption>

        <Heading>Switched off entirely</Heading>
        <Paragraph>
          <Text code>{'enabled={false}'}</Text> renders only the trigger — no
          floating-ui wiring, no listeners, nothing to open. A feature flag or
          an out-of-stock state can turn a popover off without conditionally
          rendering two different trees.
        </Paragraph>
        <Flex direction="horizontal" gap="m" align="center">
          <Popover
            enabled={ticketsEnabled}
            content={<Text size={3}>Two seats left in row F.</Text>}
          >
            <Button
              label={ticketsEnabled ? 'Seat map' : 'Sold out'}
              disabled={!ticketsEnabled}
            />
          </Popover>
          <Switcher checked={ticketsEnabled} onChange={setTicketsEnabled}>
            Tickets on sale
          </Switcher>
        </Flex>
      </Flex>
    );
  },
};

// ─── 7. Reading and driving the open state ───────────────────────────────────

export const StateStory: StoryObj<typeof Popover> = {
  name: 'Reading and driving the open state',
  render: () => {
    const popoverRef = useRef<PopoverRef>(null);
    const [loading, setLoading] = useState(false);
    const [placement, setPlacement] = useState('—');
    const [log, setLog] = useState<string[]>([]);

    const openAfterFetch = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        popoverRef.current?.openPopup();
        setPlacement(popoverRef.current?.actualPlacement ?? '—');
      }, 900);
    };

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
        <Heading>Imperative API via ref</Heading>
        <Paragraph>
          <Text code>ref</Text> exposes <Text code>openPopup</Text>,{' '}
          <Text code>closePopup</Text>, the resolved{' '}
          <Text code>actualPlacement</Text> and the live <Text code>opened</Text>{' '}
          flag — for opening a popover after an async step, or reading where it
          landed.
        </Paragraph>
        <Flex direction="horizontal" gap="s" align="center" wrap>
          <Button
            label={loading ? 'Loading…' : 'Fetch, then open'}
            icon={<RefreshCw />}
            disabled={loading}
            onClick={openAfterFetch}
          />
          <Button
            label="Close"
            onClick={() => popoverRef.current?.closePopup()}
          />
          <Popover
            ref={popoverRef}
            placement="right"
            content={<Text size={3}>Opened by an external control.</Text>}
          >
            <Button label="Anchor" icon={<Info />} />
          </Popover>
        </Flex>
        <Caption>Last resolved placement: {placement}</Caption>

        <Heading>A trigger that knows its own state</Heading>
        <Paragraph>
          Pass a function as <Text code>children</Text> to read{' '}
          <Text code>opened</Text> — here the chevron flips. Every change also
          fires <Text code>onOpenChange(open, event, reason)</Text>;{' '}
          <Text code>reason</Text> says <em>how</em> it changed.
        </Paragraph>
        <Popover
          onOpenChange={(open, _event, reason) =>
            setLog((l) =>
              [`${open ? 'opened' : 'closed'} · ${reason ?? '—'}`, ...l].slice(
                0,
                5,
              ),
            )
          }
          content={<Text size={3}>Try Esc, an outside click, or Tab away.</Text>}
        >
          {({ opened }) => (
            <Button
              label="Preferences"
              additionalIcon={
                <ChevronDown
                  style={{
                    transform: opened ? 'rotate(180deg)' : 'none',
                    transition: 'transform 150ms',
                  }}
                />
              }
            />
          )}
        </Popover>
        <Flex direction="vertical" gap="xs">
          {log.length === 0 ? (
            <Caption>No events yet.</Caption>
          ) : (
            log.map((entry, i) => (
              <Text key={i} size={2} color="muted">
                {entry}
              </Text>
            ))
          )}
        </Flex>
      </Flex>
    );
  },
};
