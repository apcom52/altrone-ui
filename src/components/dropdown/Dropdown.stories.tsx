import { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Flex,
  Text,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useState } from 'react';
import {
  AlignLeft,
  ChevronDown,
  ChevronUp,
  Code,
  Copy,
  CreditCard,
  Download,
  FileText,
  FolderInput,
  GitBranch,
  HelpCircle,
  History,
  Home,
  Link,
  LogOut,
  Mail,
  Menu,
  Pencil,
  Plus,
  Settings,
  Share2,
  Star,
  Trash,
  Upload,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

const story: Meta<typeof Dropdown> = {
  title: 'Components/Containers/Dropdown',
  component: Dropdown,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

// --- Git branch switcher ---

const BRANCHES = [
  { name: 'main', protected: true },
  { name: 'next', protected: false },
  { name: 'feat/dropdown-refactor', protected: false },
  { name: 'fix/popover-z-index', protected: false },
];

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

// --- Account menu ---

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

// --- File context menu ---

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
            <Dropdown.Action icon={<Link />}     label="Copy link"            hintText="⌘+L" />
            <Dropdown.Action icon={<Mail />}     label="Send by email" />
            <Dropdown.Action icon={<UserPlus />} label="Invite collaborators" />
          </Dropdown.ChildMenu>
          <Dropdown.ChildMenu icon={<Download />} label="Export as">
            <Dropdown.Action label="PDF"        icon={<FileText />} />
            <Dropdown.Action label="Markdown"   icon={<Code />} />
            <Dropdown.Action label="Plain text" icon={<AlignLeft />} />
          </Dropdown.ChildMenu>
          <Divider />
          <Dropdown.Action icon={<Star />}    label="Add to favourites" />
          <Dropdown.Action icon={<History />} label="Version history" badge="12" />
          <Divider />
          <Dropdown.Action danger icon={<Trash />} label="Move to trash" hintText="⌫" />
        </Dropdown.Menu>
      }
    >
      <Button icon={<Pencil />} label="Actions" showLabel={false} tooltip="File actions" />
    </Dropdown>
  );
}

// --- asChild demo ---

function AsChildDemo() {
  return (
    <Dropdown
      placement="bottom-start"
      content={
        <Dropdown.Menu>
          <Dropdown.Action asChild icon={<Home />} label="Dashboard" hintText="⌘+1">
            <a href="#dashboard" onClick={(e) => e.preventDefault()} />
          </Dropdown.Action>
          <Dropdown.Action asChild icon={<Settings />} label="Settings" hintText="⌘+,">
            <a href="#settings" onClick={(e) => e.preventDefault()} />
          </Dropdown.Action>
          <Divider />
          <Dropdown.Action asChild icon={<HelpCircle />} label="Documentation">
            <a href="https://example.com" target="_blank" rel="noreferrer" onClick={(e) => e.preventDefault()} />
          </Dropdown.Action>
        </Dropdown.Menu>
      }
    >
      <Button icon={<Menu />} label="Navigation" />
    </Dropdown>
  );
}

// --- Stories ---

export const DropdownStory: StoryObj<typeof Dropdown> = {
  name: 'Using Dropdown',
  render: () => {
    return (
      <Flex direction="vertical" gap="xl" style={{ padding: 200 }}>
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Git branch switcher
          </Text>
          <Text>
            Переключение веток, push, создание новой ветки, история. Кнопка
            меняет label на текущую ветку.
          </Text>
          <Flex direction="horizontal" gap="m">
            <GitBranchMenu />
          </Flex>
        </Flex>

        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Account menu
          </Text>
          <Text>
            Меню аккаунта: настройки, биллинг, тема (RadioList), уведомления
            (Checkbox), выход. Триггер — Avatar.
          </Text>
          <Flex direction="horizontal" gap="m">
            <AccountMenu />
          </Flex>
        </Flex>

        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            File context menu
          </Text>
          <Text>
            Контекстное меню файла с вложенными подменю Share и Export As.
          </Text>
          <Flex direction="horizontal" gap="m">
            <FileContextMenu />
          </Flex>
        </Flex>

        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            asChild — пункты как ссылки
          </Text>
          <Text>
            asChild позволяет рендерить Dropdown.Action как любой элемент — в
            данном случае как {'<a>'}, сохраняя все стили и поведение.
          </Text>
          <Flex direction="horizontal" gap="m">
            <AsChildDemo />
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export default story;
