import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Flex, Screen, Text } from 'components';
import { useBreakpoint } from 'utils';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../../.storybook/modes.ts';

/**
 * Shared config for the `Screen` example stories — each file adds its own
 * `title` under `Components/Core/Screen/*`. `Screen` is a bare layout shell
 * (a CSS grid with `Screen.Header` / `Screen.Sidebar` / `Screen.Content` /
 * `Screen.Footer` / `Screen.BottomNavigation`); every file here is a small
 * application skeleton reaching for a different layout the primitive supports.
 */
export const screenMeta = {
  component: Screen,
  decorators: [StorybookDecorator],
  parameters: {
    /* StorybookDecorator drops its wrapper padding for `fullscreen` stories,
       so Screen bleeds to every canvas edge and its footer sticks to the bottom. */
    layout: 'fullscreen',
    chromatic: { modes: { light: allModes['light desktop'] } },
  },
} satisfies Meta<typeof Screen>;

export const Tile = ({ children, h = 64 }: { children?: ReactNode; h?: number }) => (
  <Flex
    align="center"
    style={{
      minHeight: h,
      padding: '10px 14px',
      borderRadius: 'var(--radius-m)',
      background: 'var(--accent-a3)',
    }}
  >
    <Text size={3}>{children}</Text>
  </Flex>
);

export const Card = ({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) => (
  <Flex
    direction="vertical"
    gap="xs"
    style={{
      padding: 16,
      borderRadius: 'var(--radius-l)',
      background: 'var(--gray-a3)',
    }}
  >
    <Text size={2} color="muted">
      {title}
    </Text>
    <Text size={7} weight="bold">
      {value}
    </Text>
    <Text size={2} color="success">
      {hint}
    </Text>
  </Flex>
);

export const Stat = ({ label, value }: { label: string; value: string }) => (
  <Flex direction="vertical" align="center" gap="xs">
    <Text size={7} weight="bold">
      {value}
    </Text>
    <Text size={2} color="muted">
      {label}
    </Text>
  </Flex>
);

/** Rounded surface used by the list/grid rows in several examples. */
export const surface = (padding: number) => ({
  padding,
  borderRadius: 'var(--radius-l)',
  background: 'var(--gray-a2)',
});

const INLINE_FLAG = { sm: 'isSm', md: 'isMd', lg: 'isLg' } as const;

/**
 * Controlled `Screen.Sidebar` state for the example screens: open as a
 * persistent column while inline, closed once the viewport drops to overlay,
 * and flipped by the header toggle (only worth showing in overlay). Spread
 * `collapsed` / `onClose` into `Screen.Sidebar` and pass `collapsed` / the
 * toggle handler to `Toolbar.SidebarToggleAction`. Pass the same value here
 * as `Screen`'s `mobileBreakpoint`.
 */
export const useDemoSidebar = (mobileBreakpoint: 'sm' | 'md' | 'lg' = 'md') => {
  const breakpoint = useBreakpoint();
  const isInline = breakpoint[INLINE_FLAG[mobileBreakpoint]];
  const [openOnMobile, setOpenOnMobile] = useState(false);

  return {
    collapsed: isInline ? false : !openOnMobile,
    onClose: () => setOpenOnMobile(false),
    toggle: () => setOpenOnMobile((open) => !open),
    /** The header toggle only earns its place in overlay mode. */
    showToggle: !isInline,
  };
};
