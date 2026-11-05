import { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import {
  AlignLeft,
  RotateCw,
  RotateCcw,
  MousePointer2,
  Archive,
  Bold,
  Check,
  ChevronDown,
  ChevronUp,
  Code,
  Copy,
  CreditCard,
  Download,
  FileText,
  FolderInput,
  GitBranch,
  History,
  Italic,
  Link,
  LogOut,
  Mail,
  MailOpen,
  Menu as MenuIcon,
  MoreHorizontal,
  Pencil,
  Plus,
  Settings,
  Share2,
  Star,
  Strikethrough,
  Trash,
  Underline,
  Upload,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Dropdown,
  Flex,
  PopoverRef,
  Text,
  Toolbar,
} from 'components';
import { Badge } from 'internal/badge';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Dropdown> = {
  title: 'Components/Overlays/Dropdown',
  component: Dropdown,
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

// ─── Data ────────────────────────────────────────────────────────────────────

const BRANCHES = [
  { name: 'main', protected: true },
  { name: 'next', protected: false },
  { name: 'feat/dropdown-refactor', protected: false },
  { name: 'fix/popover-z-index', protected: false },
];

const INBOX_ITEMS = [
  {
    subject: 'Q3 roadmap review — please confirm your availability by Friday',
    unread: true,
  },
  { subject: 'Re: Design tokens migration status', unread: false },
  { subject: 'Invoice #4471 has been paid', unread: false },
];

// ─── 1. Anatomy: a branch switcher ──────────────────────────────────────────

function GitBranchMenu() {
  const [currentBranch, setCurrentBranch] = useState('next');
  const [isPushing, setIsPushing] = useState(false);

  const handlePush = () => {
    setIsPushing(true);
    setTimeout(() => setIsPushing(false), 1800);
  };

  return (
    <Dropdown
      placement="bottom-start"
      content={
        <Dropdown.Menu>
          <Dropdown.RadioList
            label="Switch branch"
            value={currentBranch}
            onChange={setCurrentBranch}
          >
            {BRANCHES.map((b) => (
              <Dropdown.RadioItem key={b.name} value={b.name} label={b.name} />
            ))}
          </Dropdown.RadioList>
          <Divider />
          <Dropdown.Action
            icon={<Plus />}
            label="New branch from current"
            hintText="⌘+B"
          />
          <Dropdown.Action
            icon={<Upload />}
            label={isPushing ? 'Pushing...' : 'Push to origin'}
            disabled={isPushing}
            onClick={handlePush}
          />
          <Dropdown.ChildMenu icon={<History />} label="Recent branches">
            <Dropdown.Action label="feat/avatar-stories" />
            <Dropdown.Action label="fix/tooltip-placement" />
            <Dropdown.Action label="chore/deps-update" />
          </Dropdown.ChildMenu>
          <Divider />
          <Dropdown.Action
            danger
            icon={<Trash />}
            label="Delete branch"
            disabled={currentBranch === 'main'}
          />
        </Dropdown.Menu>
      }
    >
      {({ open: opened }) => (
        <Button
          icon={<GitBranch />}
          label={currentBranch}
          additionalIcon={opened ? <ChevronUp /> : <ChevronDown />}
        />
      )}
    </Dropdown>
  );
}

export const OverviewStory: StoryObj<typeof Dropdown> = {
  name: 'A branch switcher',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Text size={7} weight="bold" block>
        Dropdown
      </Text>
      <Paragraph>
        A floating menu built on <Text code>Popover</Text>, with arrow-key
        navigation, <Text code>Home</Text>/<Text code>End</Text>, and{' '}
        <Text code>Escape</Text>-to-close-and-return-focus already wired in.
        Content is composed from <Text code>Dropdown.Menu</Text>,{' '}
        <Text code>Dropdown.Action</Text>, <Text code>Dropdown.Checkbox</Text>,{' '}
        <Text code>Dropdown.RadioList</Text>/<Text code>Dropdown.RadioItem</Text>{' '}
        and <Text code>Dropdown.ChildMenu</Text> for nested submenus.
      </Paragraph>

      <Heading>Switch, push, and drill into history</Heading>
      <Paragraph>
        <Text code>Dropdown.RadioList</Text> picks the current branch,{' '}
        <Text code>Dropdown.ChildMenu</Text> opens a submenu of recent ones, and
        the protected <Text code>main</Text> branch disables the danger action
        below it. The trigger reads back the picked branch as its own label.
      </Paragraph>
      <GitBranchMenu />
    </Flex>
  ),
};

// ─── 2. Checkbox + RadioList + badges ───────────────────────────────────────

type Theme = 'system' | 'light' | 'dark';

function AccountMenu() {
  const [theme, setTheme] = useState<Theme>('system');
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <Dropdown
      placement="bottom-end"
      content={
        <Dropdown.Menu>
          <Dropdown.Action
            asChild
            icon={<User />}
            label="Alex Petrov"
            hintText="@apcom"
          >
            <div />
          </Dropdown.Action>
          <Divider />
          <Dropdown.Action
            icon={<Users />}
            label="Profile settings"
            hintText="⌘+,"
          />
          <Dropdown.Action icon={<CreditCard />} label="Billing" badge="PRO" />
          <Dropdown.Action icon={<Users />} label="Team settings" />
          <Divider />
          <Dropdown.RadioList
            label="Theme"
            value={theme}
            onChange={(v) => setTheme(v as Theme)}
          >
            <Dropdown.RadioItem value="system" label="System" />
            <Dropdown.RadioItem value="light" label="Light" />
            <Dropdown.RadioItem value="dark" label="Dark" />
          </Dropdown.RadioList>
          <Divider />
          <Dropdown.Checkbox
            checked={notifications}
            onChange={setNotifications}
            label="Email notifications"
          />
          <Dropdown.Checkbox
            checked={compactMode}
            onChange={setCompactMode}
            label="Compact mode"
          />
          <Divider />
          <Dropdown.Action danger icon={<LogOut />} label="Sign out" />
        </Dropdown.Menu>
      }
    >
      <Avatar firstName="Alex" lastName="Petrov" color="#6366f1" size="s" />
    </Dropdown>
  );
}

export const AccountMenuStory: StoryObj<typeof Dropdown> = {
  name: 'Checkbox, RadioList and a badge',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>An account menu</Heading>
      <Paragraph>
        <Text code>Dropdown.RadioList</Text> for a mutually-exclusive theme,{' '}
        <Text code>Dropdown.Checkbox</Text> for independent toggles, and{' '}
        <Text code>badge</Text> on an action for a plan indicator. The first
        row uses <Text code>asChild</Text> with a custom{' '}
        <Text code>{'<div>'}</Text>. It remains a focusable action: open the
        menu with <Text kbd>Enter</Text> on the <Text code>Avatar</Text>,
        then press <Text kbd>ArrowDown</Text> to move from Alex Petrov to
        Profile settings.
      </Paragraph>
      <Flex orientation="horizontal">
        <AccountMenu />
      </Flex>
      <Caption>
        A custom root keeps the action's keyboard behavior. Without an explicit{' '}
        <Text code>tabIndex</Text>, the active custom action gets{' '}
        <Text code>tabIndex={0}</Text> and other custom actions get{' '}
        <Text code>tabIndex={-1}</Text>.
      </Caption>
    </Flex>
  ),
};

function TrackedSettingsMenu() {
  const [autosave, setAutosave] = useState(true);
  const [clicks, setClicks] = useState(0);

  return (
    <Flex orientation="horizontal" gap="m" align="center">
      <Dropdown
        content={
          <Dropdown.Menu>
            <Dropdown.Checkbox
              checked={autosave}
              onChange={setAutosave}
              onClick={() => setClicks((count) => count + 1)}
              label="Autosave"
            />
            <Dropdown.Checkbox
              checked
              onChange={() => undefined}
              onClick={(event) => event.preventDefault()}
              label="Sync (managed by admin)"
            />
          </Dropdown.Menu>
        }
      >
        <Button label="Settings" />
      </Dropdown>
      <Text>Autosave clicks tracked: {clicks}</Text>
    </Flex>
  );
}

export const ItemHandlersStory: StoryObj<typeof Dropdown> = {
  name: 'Own handlers on items',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Adding your own handlers</Heading>
      <Paragraph>
        <Text code>onClick</Text>, <Text code>onKeyDown</Text>,{' '}
        <Text code>onMouseEnter</Text> and <Text code>onMouseLeave</Text> on a
        menu item run before its built-in handling, not instead of it. The
        Autosave checkbox counts clicks for analytics and still toggles. Call{' '}
        <Text code>event.preventDefault()</Text> to skip the built-in step — the
        Sync checkbox does that, so it can&rsquo;t be switched off.
      </Paragraph>
      <TrackedSettingsMenu />
    </Flex>
  ),
};

export const ActionActivationCheck: StoryObj<typeof Dropdown> = {
  name: 'Action activation check (T-111)',
  render: () => {
    const [events, setEvents] = useState<string[]>([]);

    return (
      <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>Action activation count</Heading>
        <Paragraph>
          Open the menu, focus Run action and press <Text kbd>Enter</Text>{' '}
          once. Each activation should add one click to the counter. Compare
          with a mouse click or <Text kbd>Space</Text>. The event log
          distinguishes browser clicks from programmatic clicks.
        </Paragraph>
        <Dropdown
          placement="bottom-start"
          content={
            <Dropdown.Menu>
              <Dropdown.Action
                label="Run action"
                onClick={(event) => {
                  const source = event.nativeEvent.isTrusted
                    ? 'Browser click'
                    : 'Programmatic click';
                  setEvents((previous) => [...previous, source]);
                }}
              />
            </Dropdown.Menu>
          }
        >
          <Button label="Open action menu" />
        </Dropdown>
        <Text block role="status" aria-live="polite">
          Click count: {events.length}. Events: {events.join(', ') || 'None'}.
        </Text>
        <Button label="Reset counter" onClick={() => setEvents([])} />
      </Flex>
    );
  },
};

export const SelectionActivationCheck: StoryObj<typeof Dropdown> = {
  name: 'Checkbox and radio activation check (T-112)',
  render: () => {
    const [checked, setChecked] = useState(false);
    const [focusedItem, setFocusedItem] = useState('None');
    const [density, setDensity] = useState('compact');
    const [checkboxChanges, setCheckboxChanges] = useState(0);
    const [radioChanges, setRadioChanges] = useState(0);
    const [events, setEvents] = useState<string[]>([]);

    return (
      <Flex
        orientation="vertical"
        gap="l"
        style={{ maxWidth: 620 }}
        onFocusCapture={(event) => {
          setFocusedItem((event.target as HTMLElement).textContent?.trim() || 'None');
        }}
      >
        <Heading>Selection activation count</Heading>
        <Paragraph>
          Open the menu with <Text kbd>Enter</Text>: DOM focus should move to
          Autosave. The first <Text kbd>ArrowDown</Text> should move to Compact.
          Press <Text kbd>Enter</Text> once on Autosave to check activation.
          Use the arrow keys to reach Comfortable and press{' '}
          <Text kbd>Enter</Text> once. Each gesture should update its change
          counter once. Compare with <Text kbd>Space</Text> and a mouse click.
        </Paragraph>
        <Dropdown
          placement="bottom-start"
          content={
            <Dropdown.Menu>
              <Dropdown.Checkbox
                label="Autosave"
                checked={checked}
                onChange={(next, event) => {
                  setChecked(next);
                  setCheckboxChanges((count) => count + 1);
                  setEvents((previous) => [...previous, `Checkbox: ${event.type}`]);
                }}
              />
              <Dropdown.RadioList
                value={density}
                onChange={(next, event) => {
                  setDensity(next);
                  setRadioChanges((count) => count + 1);
                  setEvents((previous) => [...previous, `Radio: ${event.type}`]);
                }}
              >
                <Dropdown.RadioItem label="Compact" value="compact" />
                <Dropdown.RadioItem label="Comfortable" value="comfortable" />
              </Dropdown.RadioList>
            </Dropdown.Menu>
          }
        >
          <Button label="Open selection menu" />
        </Dropdown>
        <Text block role="status" aria-live="polite">
          DOM focus: {focusedItem}. Autosave: {String(checked)}. Checkbox changes: {checkboxChanges}.
          Density: {density}. Radio changes: {radioChanges}.
          Events: {events.join(', ') || 'None'}.
        </Text>
        <Button
          label="Reset selection counters"
          onClick={() => {
            setChecked(false);
            setDensity('compact');
            setCheckboxChanges(0);
            setRadioChanges(0);
            setEvents([]);
          }}
        />
      </Flex>
    );
  },
};

// ─── 3. Nested submenus (ChildMenu) ──────────────────────────────────────────

function FileContextMenu() {
  return (
    <Dropdown
      placement="bottom-start"
      content={
        <Dropdown.Menu>
          <Dropdown.Action icon={<Pencil />} label="Rename" hintText="F2" />
          <Dropdown.Action icon={<Copy />} label="Duplicate" hintText="⌘+D" />
          <Dropdown.Action icon={<FolderInput />} label="Move to..." />
          <Dropdown.ChildMenu icon={<Share2 />} label="Share">
            <Dropdown.Action icon={<Link />} label="Copy link" hintText="⌘+L" />
            <Dropdown.Action icon={<Mail />} label="Send by email" />
            <Dropdown.Action icon={<UserPlus />} label="Invite collaborators" />
          </Dropdown.ChildMenu>
          <Dropdown.ChildMenu icon={<Download />} label="Export as">
            <Dropdown.Action label="PDF" icon={<FileText />} />
            <Dropdown.Action label="Markdown" icon={<Code />} />
            <Dropdown.Action label="Plain text" icon={<AlignLeft />} />
          </Dropdown.ChildMenu>
          <Divider />
          <Dropdown.Action icon={<Star />} label="Add to favourites" />
          <Dropdown.Action icon={<History />} label="Version history" badge="12" />
          <Divider />
          <Dropdown.Action danger icon={<Trash />} label="Move to trash" hintText="⌫" />
        </Dropdown.Menu>
      }
    >
      <Button
        icon={<Pencil />}
        label="Actions"
        showLabel={false}
        tooltip="File actions"
      />
    </Dropdown>
  );
}

export const NestedStory: StoryObj<typeof Dropdown> = {
  name: 'Nested submenus (ChildMenu)',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>A file context menu</Heading>
      <Paragraph>
        <Text code>Dropdown.ChildMenu</Text> opens its own{' '}
        <Text code>Popover</Text> beside the parent one, so{' '}
        <Text code>Share</Text> and <Text code>Export as</Text> below don&rsquo;t
        compete for the same space — each is a menu in its own right, closable
        on its own or as part of the whole chain.
      </Paragraph>
      <Flex orientation="horizontal">
        <FileContextMenu />
      </Flex>
    </Flex>
  ),
};

export const ChildMenuInteractionCheck: StoryObj<typeof Dropdown> = {
  name: 'ChildMenu interaction checks (T-115)',
  render: () => {
    const [focusedItem, setFocusedItem] = useState('None');
    const [lastAction, setLastAction] = useState('None');

    return (
      <Flex orientation="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Heading>Submenu interaction</Heading>
        <Paragraph>
          Open either menu and use <Text kbd>ArrowDown</Text> and{' '}
          <Text kbd>ArrowUp</Text> to move between its items. In the enabled
          example, More should receive focus between Before and After; press{' '}
          <Text kbd>Enter</Text> to open it. In the disabled example, More
          should be skipped and should stay closed when clicked.
        </Paragraph>
        <Flex orientation="horizontal" gap="l" wrap>
          {[false, true].map((disabled) => (
            <Dropdown
              key={String(disabled)}
              placement="bottom-start"
              content={
                <Dropdown.Menu>
                  <Dropdown.Action
                    label="Before"
                    onFocus={() => setFocusedItem('Before')}
                    onClick={() => setLastAction('Before')}
                  />
                  <Dropdown.ChildMenu
                    label="More"
                    disabled={disabled}
                    onFocus={() => setFocusedItem('More')}
                  >
                    <Dropdown.Action
                      label="Nested action"
                      onFocus={() => setFocusedItem('Nested action')}
                      onClick={() => setLastAction('Nested action')}
                    />
                  </Dropdown.ChildMenu>
                  <Dropdown.Action
                    label="After"
                    onFocus={() => setFocusedItem('After')}
                    onClick={() => setLastAction('After')}
                  />
                </Dropdown.Menu>
              }
            >
              <Button
                label={disabled ? 'Open disabled submenu' : 'Open enabled submenu'}
                onFocus={() => setFocusedItem('Menu trigger')}
              />
            </Dropdown>
          ))}
        </Flex>
        <Text block role="status" aria-live="polite">
          Focused item: {focusedItem}. Last action: {lastAction}.
        </Text>
      </Flex>
    );
  },
};

// ─── 4. Actions as links (asChild) ──────────────────────────────────────────

function AsChildDemo() {
  return (
    <Dropdown
      placement="bottom-start"
      content={
        <Dropdown.Menu>
          <Dropdown.Action asChild icon={<Users />} label="Team" hintText="⌘+1">
            <a href="#team" onClick={(e) => e.preventDefault()} />
          </Dropdown.Action>
          <Dropdown.Action asChild icon={<Settings />} label="Settings" hintText="⌘+,">
            <a href="#settings" onClick={(e) => e.preventDefault()} />
          </Dropdown.Action>
        </Dropdown.Menu>
      }
    >
      <Button icon={<MenuIcon />} label="Navigation" />
    </Dropdown>
  );
}

export const AsChildStory: StoryObj<typeof Dropdown> = {
  name: 'Actions as links (asChild)',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Rendering a different element</Heading>
      <Paragraph>
        <Text code>asChild</Text> merges an action&rsquo;s styles, hover state
        and click-to-close behavior onto its single child element instead of a{' '}
        <Text code>{'<button>'}</Text> — the usual reason is a router{' '}
        <Text code>{'<a>'}</Text> that needs to look and behave like every
        other item in the menu.
      </Paragraph>
      <Flex orientation="horizontal">
        <AsChildDemo />
      </Flex>
    </Flex>
  ),
};

// ─── 5. Hover trigger + overflowing content ─────────────────────────────────

function InboxRow({ subject, unread }: { subject: string; unread: boolean }) {
  const [isUnread, setIsUnread] = useState(unread);
  const [archived, setArchived] = useState(false);

  return (
    <Flex
      align="center"
      gap="s"
      style={{ padding: '8px 4px', opacity: archived ? 0.4 : 1 }}
    >
      <Flex style={{ flex: 1, minWidth: 0 }}>
        <Text weight={isUnread ? 'bold' : 'regular'}>
          {subject}
          {isUnread ? <Badge style={{ marginLeft: 8 }}>new</Badge> : null}
        </Text>
      </Flex>
      <Dropdown
        placement="bottom-end"
        trigger="hover"
        content={
          <Dropdown.Menu>
            <Dropdown.Action
              icon={isUnread ? <MailOpen /> : <Mail />}
              label={isUnread ? 'Mark as read' : 'Mark as unread'}
              onClick={() => setIsUnread((v) => !v)}
            />
            <Dropdown.Action
              icon={<Archive />}
              label="Archive"
              onClick={() => setArchived(true)}
            />
            <Divider />
            <Dropdown.Action danger icon={<Trash />} label="Delete" />
          </Dropdown.Menu>
        }
      >
        <Button
          size="s"
          icon={<MoreHorizontal />}
          showLabel={false}
          label="Message actions"
          tooltip="Message actions"
        />
      </Dropdown>
    </Flex>
  );
}

export const HoverTriggerStory: StoryObj<typeof Dropdown> = {
  name: 'Hover trigger, and a long label',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Row actions in an inbox</Heading>
      <Paragraph>
        <Text code>trigger="hover"</Text> opens the menu without a click —
        useful for per-row actions in a list. The long subject line below is
        truncated with an ellipsis rather than wrapping or overflowing the row.
      </Paragraph>
      <Flex orientation="vertical" style={{ width: 420, maxWidth: '100%' }}>
        {INBOX_ITEMS.map((item, index) => (
          <Flex orientation="vertical" key={item.subject}>
            <InboxRow subject={item.subject} unread={item.unread} />
            {index < INBOX_ITEMS.length - 1 ? <Divider /> : null}
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};

// ─── 6. Inside a Toolbar ─────────────────────────────────────────────────────

function FormattingMenu() {
  const [highlight, setHighlight] = useState(false);

  return (
    <Toolbar>
      <Toolbar.Group>
        <Toolbar.Action icon={<Bold />} label="Bold" />
        <Toolbar.Action icon={<Italic />} label="Italic" />
        <Dropdown
          placement="bottom-start"
          content={
            <Dropdown.Menu>
              <Dropdown.Action icon={<Underline />} label="Underline" hintText="⌘+U" />
              <Dropdown.Action
                icon={<Strikethrough />}
                label="Strikethrough"
                hintText="⌘+⇧+X"
              />
              <Divider />
              <Dropdown.Checkbox
                checked={highlight}
                onChange={setHighlight}
                label="Highlight selection"
              />
            </Dropdown.Menu>
          }
        >
          {({ open: opened }) => (
            <Toolbar.Action
              icon={<MoreHorizontal />}
              label="More formatting"
              selected={opened}
            />
          )}
        </Dropdown>
      </Toolbar.Group>
    </Toolbar>
  );
}

export const ToolbarStory: StoryObj<typeof Dropdown> = {
  name: 'Inside a Toolbar',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Overflow for a formatting toolbar</Heading>
      <Paragraph>
        The render-prop <Text code>children</Text> reads <Text code>opened</Text>{' '}
        so the <Text code>Toolbar.Action</Text> trigger can mark itself{' '}
        <Text code>selected</Text> while its menu is open, matching the other
        toggleable actions beside it.
      </Paragraph>
      <FormattingMenu />
    </Flex>
  ),
};

// ─── 7. Imperative control via ref ───────────────────────────────────────────

function ImperativeRefDemo() {
  const dropdownRef = useRef<PopoverRef>(null);

  return (
    <Flex gap="m" align="center">
      <Button
        label="Open from outside"
        onClick={() => dropdownRef.current?.show()}
      />
      <Dropdown
        controlRef={dropdownRef}
        placement="bottom-start"
        content={
          <Dropdown.Menu>
            <Dropdown.Action icon={<Check />} label="Acknowledged" />
          </Dropdown.Menu>
        }
      >
        <Button label="Anchor" variant="text" />
      </Dropdown>
    </Flex>
  );
}

export const ImperativeStory: StoryObj<typeof Dropdown> = {
  name: 'Imperative control via ref',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Opening it from outside</Heading>
      <Paragraph>
        <Text code>Dropdown</Text> forwards <Text code>controlRef</Text> to
        the underlying <Text code>Popover</Text>, so <Text code>show</Text>/
        <Text code>hide</Text> can drive the menu from anywhere — a
        neighbouring button here, or the end of an async action elsewhere.
        Plain <Text code>ref</Text> still points at the trigger DOM element.
      </Paragraph>
      <ImperativeRefDemo />
    </Flex>
  ),
};

// ─── 8. A long menu, capped and scrolling ───────────────────────────────────

const TIMEZONES = [
  'UTC',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Moscow',
  'Europe/Istanbul',
  'Africa/Cairo',
  'Africa/Johannesburg',
  'Asia/Dubai',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Asia/Dhaka',
  'Asia/Bangkok',
  'Asia/Singapore',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Australia/Sydney',
  'Pacific/Auckland',
  'America/Sao_Paulo',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
];

export const LongMenuStory: StoryObj<typeof Dropdown> = {
  name: 'A long menu, capped and scrolling',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Capped by default</Heading>
      <Paragraph>
        <Text code>Dropdown.Menu</Text> caps its own height at{' '}
        <Text code>--dropdown-menu-max-height</Text> (320px) and scrolls past
        it, via <Text code>Scrollable</Text> — no ancestor has to provide one.
        Pass <Text code>maxHeight</Text> to override it per instance, the way{' '}
        <Text code>Select</Text>'s <Text code>menuHeight</Text> prop does.
      </Paragraph>
      <Dropdown
        content={
          <Dropdown.Menu>
            {TIMEZONES.map((zone) => (
              <Dropdown.Action key={zone} label={zone} />
            ))}
          </Dropdown.Menu>
        }
      >
        <Button label="Pick a timezone" additionalIcon={<ChevronDown />} />
      </Dropdown>
    </Flex>
  ),
};

type BoardShape = {
  id: number;
  label: string;
  shape: 'rect' | 'rounded' | 'circle';
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

const INITIAL_BOARD_SHAPES: BoardShape[] = [
  { id: 1, label: 'Idea', shape: 'rounded', color: 'amber', x: 10, y: 55, width: 140, height: 120, rotation: -6 },
  { id: 2, label: 'Research', shape: 'circle', color: 'blue', x: 44, y: 45, width: 140, height: 140, rotation: 0 },
  { id: 3, label: 'Design', shape: 'rect', color: 'purple', x: 24, y: 250, width: 110, height: 110, rotation: 45 },
  { id: 4, label: 'Build', shape: 'rounded', color: 'teal', x: 68, y: 245, width: 160, height: 100, rotation: 4 },
];

const ContextMenuBoard = () => {
  const [shapes, setShapes] = useState(INITIAL_BOARD_SHAPES);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const nextId = useRef(5);
  const selected = shapes.find((shape) => shape.id === selectedId);

  const duplicate = (id: number) => {
    const original = shapes.find((shape) => shape.id === id);
    if (!original) return;
    const copy = {
      ...original,
      id: nextId.current++,
      label: `${original.label} copy`,
      x: Math.min(original.x + 5, 70),
      y: original.y > 300 ? 70 : original.y + 30,
    };
    setShapes((items) => [...items, copy]);
    setSelectedId(copy.id);
  };

  const rotate = (id: number) => setShapes((items) => items.map((shape) =>
    shape.id === id ? { ...shape, rotation: shape.rotation + 15 } : shape,
  ));

  const remove = (id: number) => {
    setShapes((items) => items.filter((shape) => shape.id !== id));
    setSelectedId(null);
  };

  return (
    <Flex orientation="vertical" gap="m" style={{ width: '100%', maxWidth: 960 }}>
      <Box material="plate" radius={24} padding={0} style={{ display: 'block', width: '100%', overflow: 'hidden' }}>
        <Toolbar variant="plain" size="s">
          <Toolbar.Leading>
            <Toolbar.Group>
              <Toolbar.Title title="Product workshop" />
            </Toolbar.Group>
          </Toolbar.Leading>
          <Toolbar.Trailing>
            <Toolbar.Group>
              <Toolbar.Action label="Duplicate" icon={<Copy />} disabled={!selected} onClick={() => selected && duplicate(selected.id)} />
              <Toolbar.Action label="Rotate" icon={<RotateCw />} disabled={!selected} onClick={() => selected && rotate(selected.id)} />
              <Toolbar.Action label="Delete" icon={<Trash />} disabled={!selected} onClick={() => selected && remove(selected.id)} />
              <Toolbar.Action label="Reset board" icon={<RotateCcw />} onClick={() => { setShapes(INITIAL_BOARD_SHAPES); setSelectedId(null); }} />
            </Toolbar.Group>
          </Toolbar.Trailing>
        </Toolbar>
        <Box material="dotted" shape="rect" width="100%" height={460} padding={0} style={{ position: 'relative', display: 'block', overflow: 'auto' }}>
          {shapes.map((shape) => (
            <Dropdown
              key={shape.id}
              trigger="contextmenu"
              onOpenChange={(open) => { if (open) setSelectedId(shape.id); }}
              content={
                <Dropdown.Menu>
                  <Text block size={3} color="muted" style={{ padding: 'var(--space-content)' }}>{shape.label}</Text>
                  <Dropdown.Action label="Duplicate" icon={<Copy />} onClick={() => duplicate(shape.id)} />
                  <Dropdown.Action label="Rotate 15°" icon={<RotateCw />} onClick={() => rotate(shape.id)} />
                  <Divider />
                  <Dropdown.Action label="Delete" icon={<Trash />} danger onClick={() => remove(shape.id)} />
                </Dropdown.Menu>
              }
            >
              <Box
                role="button"
                aria-label={`${shape.label} shape actions`}
                shape={shape.shape}
                color={shape.color}
                material="solid"
                elevation="raised"
                radius={16}
                width={shape.width}
                height={shape.height}
                focusable
                style={{
                  position: 'absolute',
                  left: `${shape.x}%`,
                  top: shape.y,
                  transform: `rotate(${shape.rotation}deg)`,
                  cursor: 'context-menu',
                  outline: selectedId === shape.id ? '2px solid var(--accent-9)' : undefined,
                  outlineOffset: 4,
                }}
              >
                <Text weight="bold" style={{ transform: `rotate(${-shape.rotation}deg)` }}>{shape.label}</Text>
              </Box>
            </Dropdown>
          ))}
          <Box material="plate" shape="pill" width="auto" height="auto" padding={{ x: 16, y: 8 }} style={{ position: 'absolute', bottom: 16, left: 16, pointerEvents: 'none' }}>
            <MousePointer2 size={16} />
            <Text size={3}>Right-click a shape · Touch and hold</Text>
          </Box>
        </Box>
      </Box>
      <Caption>{selected ? `${selected.label} selected` : 'Select a shape to reveal its actions'} · {shapes.length} objects</Caption>
    </Flex>
  );
};

export const ContextMenuStory: StoryObj<typeof Dropdown> = {
  name: 'Context menu — whiteboard',
  render: () => (
    <Flex orientation="vertical" gap="l">
      <Heading>A whiteboard with context menus</Heading>
      <Paragraph>
        Right-click a shape or touch and hold to open its menu.
        Right-click positions the menu at the pointer; Shift+F10 opens it
        from the keyboard. Duplicate, rotate, and delete work on the selected
        shape and are also available in the board toolbar.
      </Paragraph>
      <ContextMenuBoard />
    </Flex>
  ),
};
