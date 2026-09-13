import { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { BottomNavigation } from './BottomNavigation.tsx';
import {
  Bell,
  Compass,
  CreditCard,
  Home,
  Library,
  MessageCircle,
  PieChart,
  PlusSquare,
  Radio,
  Search,
  Send,
  Sparkles,
  User,
  Wallet,
} from 'lucide-react';

const story: Meta<typeof BottomNavigation> = {
  title: 'Components/Navigation/BottomNavigation',
  component: BottomNavigation,
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

// ─── Prose helpers ───────────────────────────────────────────────────────────

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

/* Gap between the bar and the frame edge — the frame's radius is this plus the
   bar's own radius (concentric radius: radius_parent = radius_child + gap). */
const FRAME_GAP = 12;

/** A phone-sized frame so the bar reads in context. */
const PhoneMock = ({
  children,
  bar,
}: {
  children: ReactNode;
  bar: ReactNode;
}) => (
  <div
    style={{
      width: 340,
      height: 560,
      borderRadius: `calc(var(--bottom-navigation-rounding) + ${FRAME_GAP}px)`,
      border: '1px solid var(--border-1)',
      background: 'var(--background-2)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>{children}</div>
    <div
      style={{
        padding: FRAME_GAP,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {bar}
    </div>
  </div>
);

const Screen = ({ title, note }: { title: string; note?: string }) => (
  <Flex direction="vertical" gap="s">
    <Text size={6} weight="bold" block>
      {title}
    </Text>
    {note ? (
      <Text size={3} color="muted" block>
        {note}
      </Text>
    ) : null}
  </Flex>
);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof BottomNavigation> = {
  name: 'Overview',
  render: () => {
    const [tab, setTab] = useState('home');
    const sel = (id: string) => tab === id;

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={9} weight="bold">
          BottomNavigation
        </Text>

        <Paragraph>
          <Text code>BottomNavigation</Text> is a mobile-style tab bar: a row of{' '}
          <Text code>BottomNavigation.Item</Text>s, each an icon over a short
          label. The active tab is marked <Text code>selected</Text> and gets a
          raised backdrop that slides between tabs (with a small scale pulse on
          each hop). Every item renders a real <Text code>&lt;a&gt;</Text>.
        </Paragraph>

        <Heading>Anatomy</Heading>
        <Paragraph>
          <Text code>icon</Text> and <Text code>label</Text> are required.
          Sizing follows the compact end of the scale — a 24px icon over 12px
          text — so the bar stays out of the way of content.
        </Paragraph>

        <BottomNavigation floating={false}>
          <BottomNavigation.Item
            icon={<Home />}
            label="Home"
            selected={sel('home')}
            onClick={() => setTab('home')}
          />
          <BottomNavigation.Item
            icon={<Compass />}
            label="Explore"
            selected={sel('explore')}
            onClick={() => setTab('explore')}
          />
          <BottomNavigation.Item
            icon={<Bell />}
            label="Activity"
            selected={sel('activity')}
            onClick={() => setTab('activity')}
          />
          <BottomNavigation.Item
            icon={<User />}
            label="Profile"
            selected={sel('profile')}
            onClick={() => setTab('profile')}
          />
        </BottomNavigation>

        <Heading>Badges</Heading>
        <Paragraph>
          <Text code>badge</Text> takes a string, a number, or an element and
          renders it as a pill in the item's top-right corner — the same chip a
          single-icon <Text code>Button</Text> uses (<Text code>plate</Text>{' '}
          material, corner offset).
        </Paragraph>

        <BottomNavigation floating={false}>
          <BottomNavigation.Item
            icon={<Home />}
            label="Home"
            selected={sel('b-home')}
            onClick={() => setTab('b-home')}
          />
          <BottomNavigation.Item
            icon={<MessageCircle />}
            label="Messages"
            badge={12}
            selected={sel('b-messages')}
            onClick={() => setTab('b-messages')}
          />
          <BottomNavigation.Item
            icon={<Bell />}
            label="Alerts"
            badge="9+"
            selected={sel('b-alerts')}
            onClick={() => setTab('b-alerts')}
          />
          <BottomNavigation.Item
            icon={<Sparkles />}
            label="What's new"
            badge="NEW"
            selected={sel('b-new')}
            onClick={() => setTab('b-new')}
          />
        </BottomNavigation>

        <Heading>Floating vs. flush</Heading>
        <Paragraph>
          By default <Text code>floating</Text> is <Text code>true</Text>: the
          bar is <Text code>position: fixed</Text>, centered near the bottom of
          the viewport as a rounded pill. Pass{' '}
          <Text code>floating={'{false}'}</Text> to drop it into normal flow —
          for embedding inside your own layout or a device frame (as in every
          example on this page).
        </Paragraph>

        <Heading>Router links</Heading>
        <Paragraph>
          Set <Text code>asChild</Text> and pass your router's{' '}
          <Text code>&lt;Link&gt;</Text> as the only child — the item merges its
          styling, ref and props onto it, and still supplies the icon, label,
          badge and backdrop. (<Text code>renderFunc</Text> still works but is
          deprecated in favor of <Text code>asChild</Text>.)
        </Paragraph>
      </Flex>
    );
  },
};

// ─── Scenario: Music app ─────────────────────────────────────────────────────

export const MusicApp: StoryObj<typeof BottomNavigation> = {
  name: 'Music app',
  render: () => {
    const [tab, setTab] = useState('listen');
    const sel = (id: string) => tab === id;
    const titles: Record<string, string> = {
      listen: 'Listen Now',
      browse: 'Browse',
      radio: 'Radio',
      library: 'Your Library',
      search: 'Search',
    };

    return (
      <PhoneMock
        bar={
          <BottomNavigation floating={false}>
            <BottomNavigation.Item
              icon={<PlusSquare />}
              label="Listen Now"
              selected={sel('listen')}
              onClick={() => setTab('listen')}
            />
            <BottomNavigation.Item
              icon={<Compass />}
              label="Browse"
              selected={sel('browse')}
              onClick={() => setTab('browse')}
            />
            <BottomNavigation.Item
              icon={<Radio />}
              label="Radio"
              selected={sel('radio')}
              onClick={() => setTab('radio')}
            />
            <BottomNavigation.Item
              icon={<Library />}
              label="Library"
              badge={3}
              selected={sel('library')}
              onClick={() => setTab('library')}
            />
            <BottomNavigation.Item
              icon={<Search />}
              label="Search"
              selected={sel('search')}
              onClick={() => setTab('search')}
            />
          </BottomNavigation>
        }
      >
        <Screen
          title={titles[tab]}
          note="3 new albums from artists you follow"
        />
      </PhoneMock>
    );
  },
};

// ─── Scenario: Mobile banking ────────────────────────────────────────────────

export const MobileBanking: StoryObj<typeof BottomNavigation> = {
  name: 'Mobile banking',
  render: () => {
    const [tab, setTab] = useState('cards');
    const sel = (id: string) => tab === id;
    const titles: Record<string, string> = {
      home: 'Accounts',
      cards: 'Cards',
      pay: 'Payments',
      insights: 'Insights',
      profile: 'Profile',
    };

    return (
      <PhoneMock
        bar={
          <BottomNavigation floating={false}>
            <BottomNavigation.Item
              icon={<Home />}
              label="Home"
              selected={sel('home')}
              onClick={() => setTab('home')}
            />
            <BottomNavigation.Item
              icon={<CreditCard />}
              label="Cards"
              selected={sel('cards')}
              onClick={() => setTab('cards')}
            />
            <BottomNavigation.Item
              icon={<Send />}
              label="Pay"
              badge={2}
              selected={sel('pay')}
              onClick={() => setTab('pay')}
            />
            <BottomNavigation.Item
              icon={<PieChart />}
              label="Insights"
              selected={sel('insights')}
              onClick={() => setTab('insights')}
            />
            <BottomNavigation.Item
              icon={<User />}
              label="Profile"
              badge="!"
              selected={sel('profile')}
              onClick={() => setTab('profile')}
            />
          </BottomNavigation>
        }
      >
        <Screen
          title={titles[tab]}
          note="2 payments awaiting approval · verify your identity"
        />
      </PhoneMock>
    );
  },
};

// ─── Scenario: Social feed ───────────────────────────────────────────────────

export const SocialFeed: StoryObj<typeof BottomNavigation> = {
  name: 'Social feed',
  render: () => {
    const [tab, setTab] = useState('feed');
    const sel = (id: string) => tab === id;
    const titles: Record<string, string> = {
      feed: 'Feed',
      explore: 'Explore',
      create: 'Create',
      notifications: 'Notifications',
      wallet: 'Wallet',
    };

    return (
      <PhoneMock
        bar={
          <BottomNavigation floating={false}>
            <BottomNavigation.Item
              icon={<Home />}
              label="Feed"
              selected={sel('feed')}
              onClick={() => setTab('feed')}
            />
            <BottomNavigation.Item
              icon={<Compass />}
              label="Explore"
              selected={sel('explore')}
              onClick={() => setTab('explore')}
            />
            <BottomNavigation.Item
              icon={<PlusSquare />}
              label="Create"
              selected={sel('create')}
              onClick={() => setTab('create')}
            />
            <BottomNavigation.Item
              icon={<Bell />}
              label="Alerts"
              badge={128}
              selected={sel('notifications')}
              onClick={() => setTab('notifications')}
            />
            <BottomNavigation.Item
              icon={<Wallet />}
              label="Wallet"
              selected={sel('wallet')}
              onClick={() => setTab('wallet')}
            />
          </BottomNavigation>
        }
      >
        <Screen title={titles[tab]} note="128 people reacted to your post" />
      </PhoneMock>
    );
  },
};

// ─── Floating (fixed to viewport) ────────────────────────────────────────────

export const Floating: StoryObj<typeof BottomNavigation> = {
  name: 'Floating',
  render: () => {
    const [tab, setTab] = useState('home');
    const sel = (id: string) => tab === id;

    return (
      <Flex direction="vertical" gap="m" style={{ minHeight: 240 }}>
        <Paragraph>
          The default. The bar is pinned to the bottom-center of the viewport
          &mdash; scroll the Storybook canvas and it stays put.
        </Paragraph>
        <BottomNavigation>
          <BottomNavigation.Item
            icon={<Home />}
            label="Home"
            selected={sel('home')}
            onClick={() => setTab('home')}
          />
          <BottomNavigation.Item
            icon={<Search />}
            label="Search"
            selected={sel('search')}
            onClick={() => setTab('search')}
          />
          <BottomNavigation.Item
            icon={<Bell />}
            label="Alerts"
            badge={5}
            selected={sel('alerts')}
            onClick={() => setTab('alerts')}
          />
          <BottomNavigation.Item
            icon={<User />}
            label="Profile"
            selected={sel('profile')}
            onClick={() => setTab('profile')}
          />
        </BottomNavigation>
      </Flex>
    );
  },
};
