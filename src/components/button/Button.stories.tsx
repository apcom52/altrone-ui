import { Meta, StoryObj } from '@storybook/react';
import { Button, Dropdown, Flex, Radio, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { ButtonProps } from './Button.types.ts';
import { Size } from 'types';
import { useState } from 'react';
import {
  Bell,
  Bold,
  Check,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Italic,
  Mail,
  Pause,
  Play,
  Plus,
  Repeat,
  Save,
  Search,
  Settings,
  Shuffle,
  SkipBack,
  SkipForward,
  Trash2,
  Underline,
  Upload,
} from 'lucide-react';

const story: Meta<typeof Button> = {
  title: 'Components/Form/Button',
  component: Button,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

const chromaticBoth = {
  chromatic: {
    modes: {
      light: allModes['light desktop'],
      dark: allModes['dark desktop'],
    },
  },
};

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 680, lineHeight: 1.6 }}>
    {children}
  </Text>
);

/* ---------------------------------------------------------------------- */
/* Overview                                                                */
/* ---------------------------------------------------------------------- */

const DialogFooterExample = () => (
  <Flex
    gap="m"
    justify="end"
    align="center"
    style={{
      padding: 16,
      background: 'var(--gray-a2)',
      borderRadius: 'var(--radius-l)',
      width: 420,
    }}
  >
    <Button variant="text" label="Learn more" />
    <Button variant="default" label="Cancel" />
    <Button variant="submit" label="Save changes" icon={<Check />} />
  </Flex>
);

export const Overview: StoryObj<typeof Button> = {
  name: 'Overview',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Button
      </Text>
      <Paragraph>
        <code>Button</code> is the library&rsquo;s primary interactive control —
        the thing a user presses to submit a form, trigger an action, or toggle
        a tool. It&rsquo;s a <code>Box</code> underneath (shape{' '}
        <code>pill</code>, with <code>material</code>/<code>tone</code> chosen
        by <code>variant</code>), so its fill, press feedback and focus ring are
        the same primitives every other chip-like component uses. It always
        forwards its <code>ref</code> to the actual DOM element it renders, so
        it composes transparently with <code>Tooltip</code>,{' '}
        <code>Popover</code> and <code>Dropdown</code> without any
        special-casing.
      </Paragraph>

      <Heading>Three variants, one purpose each</Heading>
      <Paragraph>
        A view rarely needs more than one visual weight of action at a time: one
        thing to confirm, one or more things to back out of, and sometimes a
        lower-emphasis link-like action alongside them. The <code>variant</code>{' '}
        prop maps directly onto that:
      </Paragraph>
      <Text list="marked">
        <Text item>
          <code>submit</code> — the one filled, accent-colored action in a view.
          Named after what it almost always is: the button that confirms a form
          or commits a change.
        </Text>
        <Text item>
          <code>default</code> — a neutral, glass-material action. Used for
          everything that isn&rsquo;t the primary commit: cancel, back,
          secondary choices.
        </Text>
        <Text item>
          <code>text</code> — no fill, no border, text-only until hovered. For
          the lowest-emphasis action in a group, or an inline link-like action
          next to more prominent buttons.
        </Text>
      </Text>
      <DialogFooterExample />
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Icons & badges                                                          */
/* ---------------------------------------------------------------------- */

const IconOnlyExample = () => (
  <Flex gap="m" align="center">
    <Button
      variant="default"
      label="Notifications"
      icon={<Bell />}
      showLabel={false}
      badge="3"
    />
    <Text size={3} color="muted">
      Icon-only, with a badge and an automatic tooltip
    </Text>
  </Flex>
);

const ExportDropdownExample = () => (
  <Dropdown
    placement="bottom-start"
    content={
      <Dropdown.Menu>
        <Dropdown.Action icon={<FileText />} label="Export as PDF" />
        <Dropdown.Action icon={<Download />} label="Export as CSV" />
      </Dropdown.Menu>
    }
  >
    {() => (
      <Button
        variant="default"
        label="Export"
        icon={<Download />}
        showLabel={false}
      />
    )}
  </Dropdown>
);

const AffordanceExample = () => (
  <Flex gap="m" align="center" wrap>
    <Button
      variant="default"
      label="Open dashboard"
      additionalIcon={<ExternalLink />}
    />
    <Button
      variant="default"
      label="Sort"
      icon={<FileText />}
      additionalIcon={<ChevronDown />}
    />
    <Button variant="submit" label="Save" icon={<Save />} badge="⌘S" />
  </Flex>
);

export const IconsAndBadges: StoryObj<typeof Button> = {
  name: 'Icons, tooltips & badges',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>Icon-only buttons stay accessible</Heading>
      <Paragraph>
        Setting <code>showLabel={'{false}'}</code> shrinks the button to a
        square icon target, but <code>label</code> is still required — it
        becomes the button&rsquo;s <code>aria-label</code> and, unless a
        separate <code>tooltip</code> is given, the tooltip shown on hover. A
        screen-reader user and a mouse user both still learn what the button
        does.
      </Paragraph>
      <IconOnlyExample />

      <Heading>Icon leads, additionalIcon trails</Heading>
      <Paragraph>
        <code>Icon</code> always sits before the label;{' '}
        <code>additionalIcon</code> sits after it. The trailing slot is where an
        affordance hint goes — a <code>ChevronDown</code> that says &ldquo;this
        opens a menu&rdquo;, an <code>ExternalLink</code> that says &ldquo;this
        leaves the app&rdquo; — without taking the leading slot from the
        action&rsquo;s own icon.
      </Paragraph>
      <AffordanceExample />

      <Heading>Badges ride along with the content</Heading>
      <Paragraph>
        <code>badge</code> overlays a small count or status onto the
        button&rsquo;s content — an unread count on a notification bell, a
        status word on a disabled action. It accepts any node, so it isn&rsquo;t
        limited to counts: the <code>Save</code> button above carries a
        keyboard-shortcut hint in the same corner. It never changes what the
        button does, only what it reports.
      </Paragraph>
      <Paragraph>
        On a labelled button the badge sits inline at the end of the content
        row. On an icon-only button there&rsquo;s no room for that, so it turns
        into a small <code>plate</code> chip floating over the top-right corner
        — the notification-badge pattern (see the bell above).
      </Paragraph>

      <Heading>A real trigger: Dropdown</Heading>
      <Paragraph>
        Because <code>Button</code> always forwards its ref to its root DOM node
        — including when that node sits inside the tooltip <code>Button</code>{' '}
        renders internally for icon-only buttons — <code>Dropdown</code> can
        position its menu against a plain <code>Button</code> with no adapter
        code:
      </Paragraph>
      <ExportDropdownExample />
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Sizes                                                                   */
/* ---------------------------------------------------------------------- */

const SIZES: { value: Size; label: string }[] = [
  { value: 'mini', label: 'Mini' },
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large' },
  { value: 'xl', label: 'XLarge' },
];

const SizePlayground = () => {
  const [size, setSize] = useState<Size>('m');

  return (
    <Flex direction="vertical" gap="m">
      <Radio
        direction="horizontal"
        name="button-size"
        value={size}
        onChange={(value) => setSize(value as Size)}
      >
        {SIZES.map(({ value, label }) => (
          <Radio.Item key={value} value={value}>
            {label}
          </Radio.Item>
        ))}
      </Radio>
      <Flex gap="m" align="center" wrap>
        <Button size={size} variant="default" label="Cancel" />
        <Button
          size={size}
          variant="submit"
          label="Save changes"
          icon={<Check />}
        />
        <Button
          size={size}
          variant="default"
          label="Inbox"
          icon={<Mail />}
          badge="8"
        />
        <Button
          size={size}
          variant="default"
          label="Notifications"
          icon={<Bell />}
          showLabel={false}
          badge={3}
        />
      </Flex>
    </Flex>
  );
};

const BadgeSizeMatrix = () => (
  <Flex direction="vertical" gap="m">
    {SIZES.map(({ value, label }) => (
      <Flex key={value} gap="m" align="center" wrap>
        <Text size={2} color="muted" style={{ width: 56 }}>
          {label}
        </Text>
        <Button
          size={value}
          variant="default"
          label="Inbox"
          icon={<Mail />}
          badge="8"
        />
        <Button size={value} variant="submit" label="Updates" badge="99+" />
        <Button
          size={value}
          variant="default"
          label="Messages"
          icon={<Mail />}
          showLabel={false}
          badge="8"
        />
        <Button
          size={value}
          variant="default"
          label="Alerts"
          icon={<Bell />}
          showLabel={false}
          badge={3}
        />
      </Flex>
    ))}
  </Flex>
);

export const Sizes: StoryObj<typeof Button> = {
  name: 'Sizes',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>Sizes</Heading>
      <Paragraph>
        <code>size</code> is an explicit, author-set choice — it never changes
        on its own based on viewport, matching the rest of the library. Pick{' '}
        <code>mini</code>/<code>s</code> for dense toolbars and inline actions,{' '}
        <code>m</code> for most forms, and <code>l</code>/<code>xl</code> for a
        view&rsquo;s single most important action.
      </Paragraph>
      <SizePlayground />

      <Heading>Badges scale with the tier</Heading>
      <Paragraph>
        The badge&rsquo;s size, padding and type all follow the button&rsquo;s{' '}
        <code>size</code>. On a labelled button it stays inline at the end of
        the content; on an icon-only button it&rsquo;s a <code>plate</code> chip
        in the top-right corner. In neither case does it change the
        button&rsquo;s height.
      </Paragraph>
      <BadgeSizeMatrix />
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Animated content                                                        */
/* ---------------------------------------------------------------------- */

const FollowButtonDemo = () => {
  const [following, setFollowing] = useState(false);

  return (
    <Button
      variant={following ? 'default' : 'submit'}
      label={following ? 'Following' : 'Follow'}
      icon={following ? <Check /> : <Plus />}
      onClick={() => setFollowing((v) => !v)}
    />
  );
};

const InboxButtonDemo = () => {
  const [count, setCount] = useState(0);

  return (
    <Button
      variant="default"
      label="Inbox"
      icon={<Mail />}
      badge={count || undefined}
      onClick={() => setCount((c) => (c + 1) % 4)}
    />
  );
};

export const AnimatedContent: StoryObj<typeof Button> = {
  name: 'Animated content changes',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>The width eases when the content changes</Heading>
      <Paragraph>
        Swapping <code>label</code>, switching the <code>icon</code>, or showing
        a <code>badge</code> changes how wide the button needs to be.{' '}
        <code>Button</code> animates that with <code>motion</code>&rsquo;s
        layout animation — the box and its content slide to the new size instead
        of jumping. It follows <code>prefers-reduced-motion</code> (through{' '}
        <code>AltroneApplication</code>&rsquo;s <code>MotionConfig</code>), so
        the change is instant when reduced motion is on.
      </Paragraph>
      <Flex gap="m" align="center" wrap>
        <FollowButtonDemo />
        <InboxButtonDemo />
      </Flex>
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Async states                                                            */
/* ---------------------------------------------------------------------- */

const SaveButtonDemo = ({
  outcome = 'succeeded',
  label = 'Save changes',
}: {
  outcome?: 'succeeded' | 'failed';
  label?: string;
}) => {
  const [state, setState] = useState<ButtonProps['state']>('idle');

  const handleSave = () => {
    setState('loading');
    setTimeout(() => {
      setState(outcome);
      setTimeout(() => setState('idle'), 1600);
    }, 1200);
  };

  return (
    <Button
      variant="submit"
      label={label}
      icon={<Save />}
      danger={outcome === 'failed'}
      state={state}
      onClick={handleSave}
    />
  );
};

export const AsyncStates: StoryObj<typeof Button> = {
  name: 'Loading, success & failure',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>The button reports its own async state</Heading>
      <Paragraph>
        <code>state</code> (<code>idle</code>/<code>loading</code>/
        <code>succeeded</code>/<code>failed</code>) is fully controlled by the
        consumer, same as everywhere else in the library — the button itself has
        no idea what &ldquo;saving&rdquo; means, it just renders a spinner or a
        checkmark for whatever state it&rsquo;s given. That means a save action
        doesn&rsquo;t need a separate spinner overlay wrapped around it; the
        feedback lives on the control the user just pressed.
      </Paragraph>
      <Paragraph>
        Click each button to simulate a request. The first resolves
        successfully; the second fails and stays <code>danger</code> while it
        shows the failure, so the outcome is never signalled by the icon alone.
      </Paragraph>
      <Flex gap="m" align="center" wrap>
        <SaveButtonDemo outcome="succeeded" />
        <SaveButtonDemo outcome="failed" label="Sync now" />
      </Flex>
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Selected & danger                                                       */
/* ---------------------------------------------------------------------- */

const FormattingToolbar = () => {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  return (
    <Flex gap="s">
      <Button
        size="s"
        variant="text"
        label="Bold"
        icon={<Bold />}
        showLabel={false}
        selected={bold}
        onClick={() => setBold(!bold)}
      />
      <Button
        size="s"
        variant="text"
        label="Italic"
        icon={<Italic />}
        showLabel={false}
        selected={italic}
        onClick={() => setItalic(!italic)}
      />
      <Button
        size="s"
        variant="text"
        label="Underline"
        icon={<Underline />}
        showLabel={false}
        selected={underline}
        onClick={() => setUnderline(!underline)}
      />
    </Flex>
  );
};

export const SelectedAndDanger: StoryObj<typeof Button> = {
  name: 'Toggles & destructive actions',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>Selected marks a toggle, not a route</Heading>
      <Paragraph>
        <code>selected</code> sets <code>aria-pressed</code> and gives the
        button a distinct pressed appearance. It&rsquo;s for a control that
        toggles on/off — a formatting option, a filter chip — not for marking
        the current page in navigation. Each button here tracks its own boolean;
        toggling one doesn&rsquo;t affect the others.
      </Paragraph>
      <FormattingToolbar />

      <Heading>Danger overlays the chosen variant</Heading>
      <Paragraph>
        <code>danger</code> is a boolean, not its own variant — it recolors
        whichever <code>variant</code> is already in use, so a destructive
        action keeps the same visual weight (text/default/submit) it would have
        had, just recolored as a warning.
      </Paragraph>
      <Flex gap="m" align="center">
        <Button
          variant="default"
          label="Delete project"
          icon={<Trash2 />}
          danger
        />
        <Button
          variant="submit"
          label="Delete permanently"
          icon={<Trash2 />}
          danger
        />
        <Button variant="text" label="Remove" danger />
      </Flex>
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Disabled                                                                */
/* ---------------------------------------------------------------------- */

const DisabledRow = ({ disabled = false }: { disabled?: boolean }) => (
  <Flex gap="m" align="center" wrap>
    <Button
      variant="submit"
      label="Save changes"
      icon={<Save />}
      disabled={disabled}
    />
    <Button variant="default" label="Cancel" disabled={disabled} />
    <Button variant="text" label="Learn more" disabled={disabled} />
    <Button
      variant="default"
      label="Delete"
      icon={<Trash2 />}
      danger
      disabled={disabled}
    />
    <Button
      variant="default"
      label="Notifications"
      icon={<Bell />}
      showLabel={false}
      badge="3"
      disabled={disabled}
    />
    <Button danger variant="submit" label="Delete" disabled={disabled} />
  </Flex>
);

const AutoDisabledDemo = () => {
  const [state, setState] = useState<ButtonProps['state']>('idle');

  return (
    <Button
      variant="submit"
      label="Submit"
      icon={<Check />}
      state={state}
      onClick={() => {
        setState('loading');
        setTimeout(() => setState('succeeded'), 1200);
        setTimeout(() => setState('idle'), 2600);
      }}
    />
  );
};

export const Disabled: StoryObj<typeof Button> = {
  name: 'Disabled',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>One flat treatment for every variant</Heading>
      <Paragraph>
        <code>disabled</code> sets the native attribute (so the button leaves
        the tab order and fires no events) and switches the fill, border and
        text to the dedicated <code>--disabled-*</code> tokens — not an opacity
        knocked over the enabled look. Every <code>variant</code>,{' '}
        <code>danger</code> included, collapses to the same muted state, so a
        disabled control never competes for attention with an active one.
      </Paragraph>
      <Flex direction="vertical" gap="s">
        <Text size={2} color="muted">
          Enabled
        </Text>
        <DisabledRow />
        <Text size={2} color="muted" style={{ marginTop: 8 }}>
          Disabled
        </Text>
        <DisabledRow disabled />
      </Flex>

      <Heading>A busy button disables itself</Heading>
      <Paragraph>
        You don&rsquo;t have to pair <code>disabled</code> with{' '}
        <code>state</code>: any non-<code>idle</code> <code>state</code> (
        <code>loading</code>/<code>succeeded</code>/<code>failed</code>) already
        blocks clicks and sets <code>aria-busy</code>, so a submit can&rsquo;t
        be fired twice while its request is in flight. Click to try:
      </Paragraph>
      <AutoDisabledDemo />
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Toolbars & icon clusters                                                */
/* ---------------------------------------------------------------------- */

const clusterStyle = {
  padding: 12,
  background: 'var(--gray-a2)',
  borderRadius: 'var(--radius-l)',
  width: 'fit-content',
} as const;

const AppBarExample = () => (
  <Flex gap="s" align="center" style={clusterStyle}>
    <Button
      variant="text"
      label="Search"
      tooltip="Search    ⌘K"
      icon={<Search />}
      showLabel={false}
    />
    <Button
      variant="text"
      label="Messages"
      icon={<Mail />}
      showLabel={false}
      badge="12"
    />
    <Button
      variant="text"
      label="Notifications"
      icon={<Bell />}
      showLabel={false}
      badge="3"
    />
    <Button
      variant="text"
      label="Settings"
      icon={<Settings />}
      showLabel={false}
    />
  </Flex>
);

const MediaToolbarExample = () => {
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  return (
    <Flex gap="s" align="center" style={clusterStyle}>
      <Button
        size="s"
        variant="text"
        label="Shuffle"
        icon={<Shuffle />}
        showLabel={false}
        selected={shuffle}
        onClick={() => setShuffle((v) => !v)}
      />
      <Button
        size="s"
        variant="text"
        label="Previous track"
        icon={<SkipBack />}
        showLabel={false}
      />
      <Button
        size="l"
        variant="submit"
        label={playing ? 'Pause' : 'Play'}
        icon={playing ? <Pause /> : <Play />}
        showLabel={false}
        onClick={() => setPlaying((v) => !v)}
      />
      <Button
        size="s"
        variant="text"
        label="Next track"
        icon={<SkipForward />}
        showLabel={false}
      />
      <Button
        size="s"
        variant="text"
        label="Repeat"
        icon={<Repeat />}
        showLabel={false}
        selected={repeat}
        onClick={() => setRepeat((v) => !v)}
      />
    </Flex>
  );
};

export const Toolbars: StoryObj<typeof Button> = {
  name: 'Toolbars & icon clusters',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>Persistent chrome stays quiet</Heading>
      <Paragraph>
        When a row of buttons lives permanently on screen — an app bar, a
        toolbar — <code>variant="text"</code> keeps every button visually silent
        until it&rsquo;s hovered or focused, so the cluster reads as chrome
        rather than a wall of calls to action. Each button is still icon-only
        with a required <code>label</code> behind it: that <code>label</code> is
        the <code>aria-label</code> and the hover tooltip. One button overrides{' '}
        <code>tooltip</code> to also show its shortcut, and <code>badge</code>{' '}
        carries unread counts without growing the hit target.
      </Paragraph>
      <AppBarExample />

      <Heading>One cluster, several jobs</Heading>
      <Paragraph>
        A media transport bar packs three different kinds of button into one
        strip: momentary actions (skip), a primary play/pause that swaps its own{' '}
        <code>icon</code> and <code>label</code> with state, and real toggles
        (shuffle, repeat) that use <code>selected</code> for{' '}
        <code>aria-pressed</code>. The primary control is one <code>size</code>{' '}
        up (<code>l</code> against <code>s</code>) so the eye lands on it first
        — size is doing the emphasis work that <code>variant</code> does
        elsewhere.
      </Paragraph>
      <MediaToolbarExample />
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Button in context                                                       */
/* ---------------------------------------------------------------------- */

const AsChildExample = () => (
  <Flex gap="m" align="center" wrap>
    <Button
      asChild
      variant="submit"
      label="Read the docs"
      additionalIcon={<ExternalLink />}
    >
      <a href="https://altrone.dev" target="_blank" rel="noreferrer" />
    </Button>
    <Button
      asChild
      variant="default"
      label="Download report"
      icon={<Download />}
    >
      <a href="/report.pdf" download />
    </Button>
  </Flex>
);

const SplitButtonExample = () => (
  <Flex gap="s" align="center">
    <Button variant="submit" label="Publish" icon={<Upload />} />
    <Dropdown
      placement="bottom-end"
      content={
        <Dropdown.Menu>
          <Dropdown.Action icon={<Clock />} label="Schedule for later" />
          <Dropdown.Action icon={<FileText />} label="Save as draft" />
        </Dropdown.Menu>
      }
    >
      {() => (
        <Button
          variant="submit"
          label="More publish options"
          icon={<ChevronDown />}
          showLabel={false}
        />
      )}
    </Dropdown>
  </Flex>
);

const InlineConfirmExample = () => {
  const [confirming, setConfirming] = useState(false);
  const [state, setState] = useState<ButtonProps['state']>('idle');

  if (state !== 'idle') {
    return (
      <Button
        variant="submit"
        label="Delete file"
        icon={<Trash2 />}
        danger
        state={state}
      />
    );
  }

  if (!confirming) {
    return (
      <Button
        variant="default"
        label="Delete file"
        icon={<Trash2 />}
        danger
        onClick={() => setConfirming(true)}
      />
    );
  }

  return (
    <Flex gap="s" align="center">
      <Button
        variant="submit"
        label="Yes, delete it"
        icon={<Trash2 />}
        danger
        onClick={() => {
          setState('loading');
          setTimeout(() => {
            setState('succeeded');
            setTimeout(() => {
              setState('idle');
              setConfirming(false);
            }, 1400);
          }, 1000);
        }}
      />
      <Button
        variant="text"
        label="Cancel"
        onClick={() => setConfirming(false)}
      />
    </Flex>
  );
};

export const InContext: StoryObj<typeof Button> = {
  name: 'Button in context',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>A button that is really a link</Heading>
      <Paragraph>
        When the action is navigation — open a page, download a file — the
        element should be an <code>&lt;a&gt;</code>, not a{' '}
        <code>&lt;button&gt;</code>, so it gets middle-click, &ldquo;open in new
        tab&rdquo; and <code>download</code> for free. Pass <code>asChild</code>{' '}
        with the <code>&lt;a&gt;</code> as the single child: the button merges
        its class, ref and content onto that element instead of rendering its
        own.
      </Paragraph>
      <AsChildExample />

      <Heading>Split button: one default, a menu of alternates</Heading>
      <Paragraph>
        A split button is just two buttons of the same <code>variant</code> side
        by side — the primary one does the common thing on click, the icon-only
        one opens a <code>Dropdown</code> of the rarer options. No new prop: the
        icon-only button forwards its ref to <code>Dropdown</code> the way any
        trigger does, and its <code>label</code> becomes that trigger&rsquo;s
        accessible name.
      </Paragraph>
      <SplitButtonExample />

      <Heading>Inline confirm, no modal</Heading>
      <Paragraph>
        For a low-stakes destructive action the confirmation can happen in
        place: the first press swaps the neutral <code>danger</code> button for
        a filled <code>submit</code> + <code>Cancel</code> pair, the second
        press runs the request through <code>state</code> (<code>loading</code>{' '}
        → <code>succeeded</code>) on that same button. No <code>Dialog</code>,
        no focus trap — the whole exchange stays on one control.
      </Paragraph>
      <InlineConfirmExample />
    </Flex>
  ),
};

export default story;
