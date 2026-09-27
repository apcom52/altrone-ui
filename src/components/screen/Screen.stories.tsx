import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Avatar,
  BottomNavigation,
  Button,
  Flex,
  NavigationList,
  Screen,
  Text,
  Toolbar,
} from 'components';
import { useBreakpoint } from 'utils';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import {
  Bell,
  Clock,
  Heart,
  Home,
  Inbox,
  Info,
  Search,
  Star,
  User,
} from 'lucide-react';

const story: Meta<typeof Screen> = {
  title: 'Components/Core/Screen',
  component: Screen,
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
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 680, lineHeight: 1.6 }} color="muted">
    {children}
  </Text>
);

const fullscreen = { layout: 'fullscreen' as const };

/* ---------------------------------------------------------------------- */
/* Overview                                                                */
/* ---------------------------------------------------------------------- */

export const Overview: StoryObj<typeof Screen> = {
  name: 'Overview',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Screen
      </Text>
      <Paragraph>
        A bare application shell — a CSS grid occupying the full viewport, laid
        out through named zones: <Text code>Screen.Header</Text>,{' '}
        <Text code>Screen.Sidebar</Text>, <Text code>Screen.Content</Text>,{' '}
        <Text code>Screen.Aside</Text>, <Text code>Screen.Footer</Text> and{' '}
        <Text code>Screen.BottomNavigation</Text>. It carries no navigation
        idiom or visual style of its own — every zone is optional, and what
        goes inside each one (a <Text code>Toolbar</Text>, a{' '}
        <Text code>NavigationList</Text>, plain content) is entirely up to the
        consumer.
      </Paragraph>
      <Heading>Zones</Heading>
      <Paragraph>
        <Text code>Screen.Header</Text> is fixed chrome by default (
        <Text code>fixed</Text>) and reserves clearance for itself in{' '}
        <Text code>Screen.Content</Text>. <Text code>Screen.Sidebar</Text> is a
        persistent inline column above <Text code>mobileBreakpoint</Text> and
        an off-canvas overlay below it — collapse state can be owned by the
        consumer (<Text code>collapsed</Text>/<Text code>onCollapsedChange</Text>)
        or left uncontrolled. <Text code>Screen.Aside</Text> is a lighter
        trailing companion column that lives directly in the content row, with
        no background or resize logic of its own — wrap it and{' '}
        <Text code>Screen.Content</Text> in a <Text code>Splitter</Text> for a
        draggable boundary. <Text code>Screen.BottomNavigation</Text> is the
        mobile alternative to a sidebar-driven navigation idiom.
      </Paragraph>
      <Heading>Responsiveness</Heading>
      <Paragraph>
        <Text code>mobileBreakpoint</Text> (default <Text code>'md'</Text>)
        decides where <Text code>Screen.Sidebar</Text> flips from inline to
        overlay — independent of a zone's own <Text code>visibleFrom</Text> /{' '}
        <Text code>hiddenFrom</Text>, which control whether it renders at all.
        A common pattern is a sidebar hidden below <Text code>lg</Text> paired
        with a <Text code>Screen.BottomNavigation</Text> shown only below it —
        see the story below.
      </Paragraph>
      <Heading>Sizing and alignment</Heading>
      <Paragraph>
        <Text code>size</Text> caps the width of <Text code>Screen.Content</Text>;{' '}
        <Text code>contentAlign="center"</Text> additionally centers it in both
        axes — the combination suits a sign-in form or a full-page{' '}
        <Text code>Result</Text> state rather than a data-dense app screen.
      </Paragraph>
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Basic layout                                                            */
/* ---------------------------------------------------------------------- */

export const BasicLayout: StoryObj<typeof Screen> = {
  name: 'Header, Content & Footer',
  parameters: fullscreen,
  render: () => (
    <Screen title="Basic layout">
      <Screen.Header>
        <Toolbar variant="solid" size="m">
          <Toolbar.Logo>
            <Home size={20} />
          </Toolbar.Logo>
          <Toolbar.Title title="Overview" />
          <Toolbar.Separator />
          <Toolbar.Group>
            <Toolbar.Action label="Search" icon={<Search />} showLabel={false} />
            <Toolbar.Action
              label="Notifications"
              icon={<Bell />}
              showLabel={false}
            />
          </Toolbar.Group>
        </Toolbar>
      </Screen.Header>

      <Screen.Content>
        <Flex orientation="vertical" gap="m">
          <Text block size={7} weight="bold">
            Welcome back
          </Text>
          <Text block size={4} color="muted">
            The header stays pinned while this area scrolls — resize the
            canvas or add more content to see it happen.
          </Text>
        </Flex>
      </Screen.Content>

      <Screen.Footer>
        <Flex justify="between" align="center">
          <Text size={2} color="muted">
            Updated just now
          </Text>
          <Text size={2} color="muted">
            v1.0.0
          </Text>
        </Flex>
      </Screen.Footer>
    </Screen>
  ),
};

/* ---------------------------------------------------------------------- */
/* Sidebar                                                                 */
/* ---------------------------------------------------------------------- */

export const WithSidebar: StoryObj<typeof Screen> = {
  name: 'With Sidebar',
  parameters: fullscreen,
  render: () => {
    const breakpoint = useBreakpoint();
    const isInline = breakpoint.isMd;
    const [openOnMobile, setOpenOnMobile] = useState(false);
    const collapsed = isInline ? false : !openOnMobile;

    return (
      <Screen title="With sidebar">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            {!isInline ? (
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={collapsed}
                  onClick={() => setOpenOnMobile((open) => !open)}
                />
              </Toolbar.Group>
            ) : null}
            <Toolbar.Title title="Inbox" />
          </Toolbar>
        </Screen.Header>

        <Screen.Sidebar
          collapsed={collapsed}
          onClose={() => setOpenOnMobile(false)}
        >
          <NavigationList>
            <NavigationList.Group title="Mailboxes">
              <NavigationList.Link href="#" icon={<Inbox />} label="Inbox" selected />
              <NavigationList.Link href="#" icon={<Star />} label="Starred" />
              <NavigationList.Link href="#" icon={<Clock />} label="Snoozed" />
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>

        <Screen.Content>
          <Text block size={4} color="muted">
            Narrow the canvas below the <Text code>mobileBreakpoint</Text> (
            <Text code>'md'</Text> by default) to see the sidebar switch to an
            off-canvas overlay with a scrim.
          </Text>
        </Screen.Content>
      </Screen>
    );
  },
};

/* ---------------------------------------------------------------------- */
/* Bottom navigation                                                       */
/* ---------------------------------------------------------------------- */

export const WithBottomNavigation: StoryObj<typeof Screen> = {
  name: 'With BottomNavigation',
  parameters: fullscreen,
  render: () => {
    const [tab, setTab] = useState<'home' | 'search' | 'favorites' | 'profile'>(
      'home',
    );
    const tabs = [
      { id: 'home' as const, label: 'Home', icon: <Home /> },
      { id: 'search' as const, label: 'Search', icon: <Search /> },
      { id: 'favorites' as const, label: 'Favorites', icon: <Heart /> },
      { id: 'profile' as const, label: 'Profile', icon: <User /> },
    ];

    return (
      <Screen title="With bottom navigation">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            <Toolbar.Title title="Feed" />
          </Toolbar>
        </Screen.Header>

        <Screen.Content>
          <Text block size={4} color="muted">
            Narrow the canvas below <Text code>lg</Text> to see the header
            navigation give way to <Text code>Screen.BottomNavigation</Text> —
            the two are meant to be paired via <Text code>hiddenFrom</Text> /{' '}
            <Text code>visibleFrom</Text>, not shown together.
          </Text>
        </Screen.Content>

        <Screen.BottomNavigation hiddenFrom="lg">
          <BottomNavigation floating={false}>
            {tabs.map((t) => (
              <BottomNavigation.Link
                key={t.id}
                href="#"
                icon={t.icon}
                label={t.label}
                selected={tab === t.id}
                onClick={(event) => {
                  event.preventDefault();
                  setTab(t.id);
                }}
              />
            ))}
          </BottomNavigation>
        </Screen.BottomNavigation>
      </Screen>
    );
  },
};

/* ---------------------------------------------------------------------- */
/* Aside                                                                   */
/* ---------------------------------------------------------------------- */

export const WithAside: StoryObj<typeof Screen> = {
  name: 'With Aside',
  parameters: fullscreen,
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Screen title="With aside">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            <Toolbar.Title title="Contacts" />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Button
                size="s"
                label={collapsed ? 'Show inspector' : 'Hide inspector'}
                onClick={() => setCollapsed((c) => !c)}
              >
                {collapsed ? 'Show inspector' : 'Hide inspector'}
              </Button>
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>

        <Screen.Content>
          <Text block size={4} color="muted">
            Unlike <Text code>Screen.Sidebar</Text>, the aside column carries
            no background and lives directly in the content row.
          </Text>
        </Screen.Content>

        <Screen.Aside collapsed={collapsed}>
          <Flex orientation="vertical" gap="m">
            <Flex align="center" gap="m">
              <Avatar firstName="Ada" lastName="Lovelace" />
              <Flex orientation="vertical" gap="xs">
                <Text weight="bold">Ada Lovelace</Text>
                <Text size={2} color="muted">
                  ada@example.com
                </Text>
              </Flex>
            </Flex>
            <Text size={2} color="muted">
              Selected contact details render here.
            </Text>
          </Flex>
        </Screen.Aside>
      </Screen>
    );
  },
};

/* ---------------------------------------------------------------------- */
/* Centered content                                                        */
/* ---------------------------------------------------------------------- */

export const CenteredContent: StoryObj<typeof Screen> = {
  name: 'Centered content',
  parameters: fullscreen,
  render: () => (
    <Screen title="Centered content" size="mini" contentAlign="center">
      <Screen.Content>
        <Flex orientation="vertical" gap="m" align="center">
          <Info size={32} />
          <Text block size={6} weight="bold" style={{ textAlign: 'center' }}>
            Nothing here yet
          </Text>
          <Text block size={3} color="muted" style={{ textAlign: 'center' }}>
            <Text code>contentAlign="center"</Text> combined with{' '}
            <Text code>size</Text> centers a narrow column both ways — a fit
            for a sign-in form or a full-page <Text code>Result</Text> state.
          </Text>
          <Button label="Get started">Get started</Button>
        </Flex>
      </Screen.Content>
    </Screen>
  ),
};
