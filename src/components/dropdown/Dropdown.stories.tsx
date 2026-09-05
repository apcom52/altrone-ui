import { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import {
  AlignLeft,
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
  Button,
  Divider,
  Dropdown,
  Flex,
  PopoverRef,
  Select,
  Text,
  Toolbar,
} from 'components';
import { Badge } from 'components/badge';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Size } from 'types';

const story: Meta<typeof Dropdown> = {
  title: 'Components/Containers/Dropdown',
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

const SIZE_OPTIONS = [
  { value: 'mini', label: 'mini' },
  { value: 's', label: 's' },
  { value: 'm', label: 'm' },
  { value: 'l', label: 'l' },
  { value: 'xl', label: 'xl' },
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
      {({ opened }) => (
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
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
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
            <div style={{ cursor: 'default' }} />
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
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>An account menu</Heading>
      <Paragraph>
        <Text code>Dropdown.RadioList</Text> for a mutually-exclusive theme,{' '}
        <Text code>Dropdown.Checkbox</Text> for independent toggles, and{' '}
        <Text code>badge</Text> on an action for a plan indicator. The first
        row is <Text code>asChild</Text> on a non-interactive{' '}
        <Text code>{'<div>'}</Text> — a way to show identity inside the menu
        without it acting like a clickable item. Trigger is an{' '}
        <Text code>Avatar</Text>.
      </Paragraph>
      <Flex direction="horizontal">
        <AccountMenu />
      </Flex>
      <Caption>
        The name row doesn&rsquo;t close the menu or highlight on hover — it
        renders <Text code>{'<div style={{ cursor: \'default\' }} />'}</Text>{' '}
        as its child instead of a link or a button.
      </Caption>
    </Flex>
  ),
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
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>A file context menu</Heading>
      <Paragraph>
        <Text code>Dropdown.ChildMenu</Text> opens its own{' '}
        <Text code>Popover</Text> beside the parent one, so{' '}
        <Text code>Share</Text> and <Text code>Export as</Text> below don&rsquo;t
        compete for the same space — each is a menu in its own right, closable
        on its own or as part of the whole chain.
      </Paragraph>
      <Flex direction="horizontal">
        <FileContextMenu />
      </Flex>
    </Flex>
  ),
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
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Rendering a different element</Heading>
      <Paragraph>
        <Text code>asChild</Text> merges an action&rsquo;s styles, hover state
        and click-to-close behavior onto its single child element instead of a{' '}
        <Text code>{'<button>'}</Text> — the usual reason is a router{' '}
        <Text code>{'<a>'}</Text> that needs to look and behave like every
        other item in the menu.
      </Paragraph>
      <Flex direction="horizontal">
        <AsChildDemo />
      </Flex>
    </Flex>
  ),
};

// ─── 5. Sizes ────────────────────────────────────────────────────────────────

function SizesDemo() {
  const [size, setSize] = useState<Size>('m');
  const [starred, setStarred] = useState(true);

  return (
    <Flex direction="vertical" gap="m" align="start">
      <Select
        value={size}
        onChange={(v) => setSize((v as Size) ?? 'm')}
        options={SIZE_OPTIONS}
        style={{ width: 120 }}
      />
      <Dropdown
        placement="bottom-start"
        content={
          <Dropdown.Menu>
            <Dropdown.Action
              size={size}
              icon={<Star />}
              label="Starred"
              hintText="⌘+S"
            />
            <Dropdown.Checkbox
              size={size}
              checked={starred}
              onChange={setStarred}
              label="Show in sidebar"
            />
            <Dropdown.ChildMenu size={size} icon={<Share2 />} label="Share">
              <Dropdown.Action label="Copy link" icon={<Link />} />
            </Dropdown.ChildMenu>
          </Dropdown.Menu>
        }
      >
        <Button label={`size="${size}"`} additionalIcon={<ChevronDown />} />
      </Dropdown>
    </Flex>
  );
}

export const SizesStory: StoryObj<typeof Dropdown> = {
  name: 'Sizes',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>mini, s, m, l, xl</Heading>
      <Paragraph>
        <Text code>size</Text> is accepted independently by{' '}
        <Text code>Dropdown.Action</Text>, <Text code>Dropdown.Checkbox</Text>,{' '}
        <Text code>Dropdown.RadioItem</Text> and{' '}
        <Text code>Dropdown.ChildMenu</Text> — a menu can even mix tiers row by
        row. Row height stays at or above 24px at every tier, including{' '}
        <Text code>"mini"</Text>, to keep the hit area accessible.
      </Paragraph>
      <SizesDemo />
    </Flex>
  ),
};

// ─── 6. Hover trigger + overflowing content ─────────────────────────────────

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
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Row actions in an inbox</Heading>
      <Paragraph>
        <Text code>trigger="hover"</Text> opens the menu without a click —
        useful for per-row actions in a list. The long subject line below is
        truncated with an ellipsis rather than wrapping or overflowing the row.
      </Paragraph>
      <Flex direction="vertical" style={{ width: 420, maxWidth: '100%' }}>
        {INBOX_ITEMS.map((item, index) => (
          <Flex direction="vertical" key={item.subject}>
            <InboxRow subject={item.subject} unread={item.unread} />
            {index < INBOX_ITEMS.length - 1 ? <Divider /> : null}
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};

// ─── 7. Inside a Toolbar ─────────────────────────────────────────────────────

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
          {({ opened }) => (
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
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
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

// ─── 8. Imperative control via ref ───────────────────────────────────────────

function ImperativeRefDemo() {
  const dropdownRef = useRef<PopoverRef>(null);

  return (
    <Flex gap="m" align="center">
      <Button
        label="Open from outside"
        onClick={() => dropdownRef.current?.openPopup()}
      />
      <Dropdown
        ref={dropdownRef}
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
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Opening it from outside</Heading>
      <Paragraph>
        <Text code>Dropdown</Text> forwards <Text code>ref</Text> to the
        underlying <Text code>Popover</Text>, so <Text code>openPopup</Text>/
        <Text code>closePopup</Text> can drive the menu from anywhere — a
        neighbouring button here, or the end of an async action elsewhere.
      </Paragraph>
      <ImperativeRefDemo />
    </Flex>
  ),
};
