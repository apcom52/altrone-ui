import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta = {
  title: 'Foundations/Elevation',
  decorators: [StorybookDecorator],
};

export default story;

const Code = ({ children }: { children: string }) => (
  <Text
    block
    code
    style={{
      display: 'block',
      padding: '12px 16px',
      background: 'var(--gray-a3)',
      borderRadius: 'var(--radius-s)',
      whiteSpace: 'pre-wrap',
    }}
  >
    {children}
  </Text>
);

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const roles = [
  { name: 'flat', z: 'auto', example: 'Box at rest' },
  {
    name: 'raised',
    z: 'auto',
    example:
      'Tabs item, DatePicker day, Range track, NavigationList, BottomNavigation',
  },
  { name: 'sticky', z: 'var(--level-sticky)', example: 'DataTable column headers' },
  { name: 'overlay', z: 'var(--level-popover)', example: 'Popover, Drawer, Toolbar group' },
  { name: 'modal', z: 'var(--level-modal)', example: 'Modal' },
  { name: 'toast', z: 'var(--level-toast)', example: 'Toast' },
];

const Swatch = ({ role, example }: { role: string; example: string }) => (
  <Flex direction="vertical" gap="s" align="center" style={{ width: 140 }}>
    <div
      style={{
        width: 96,
        height: 64,
        borderRadius: 12,
        background: 'var(--background-2)',
        boxShadow: `var(--elevation-${role}-shadow)`,
      }}
    />
    <Text size={3} weight="medium">
      --elevation-{role}
    </Text>
    <Text size={2} color="muted" align="center">
      {example}
    </Text>
  </Flex>
);

export const Overview: StoryObj = {
  name: 'Elevation Roles',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Elevation
      </Text>
      <Paragraph>
        A z-index stack and a shadow scale already existed in Altrone,
        separately — a component picked a stacking level and a shadow
        combination by hand, with nothing tying the two together even
        though they represent the same idea: how &ldquo;high up&rdquo;
        something sits above the page.
      </Paragraph>
      <Paragraph>
        Elevation names that pairing. Six roles, each backed by two custom
        properties (z-index and box-shadow are different CSS properties, so
        one role can&rsquo;t be a single <code>var()</code>):
      </Paragraph>
      <Code>{`z-index: var(--elevation-modal-z-index);
box-shadow: var(--elevation-modal-shadow);`}</Code>

      <Heading>The roles</Heading>
      <Flex gap="l" wrap>
        {roles.map((role) => (
          <Swatch key={role.name} role={role.name} example={role.example} />
        ))}
      </Flex>

      <Heading>Where the mapping came from</Heading>
      <Paragraph>
        Every role above (except <code>sticky</code>) was reverse-engineered
        from shadow combinations already shared by multiple real
        components — e.g. <code>Popover</code>, <code>Drawer</code>, and{' '}
        <code>Toolbar.Group</code> all independently used the exact same{' '}
        <code>shadow-1 + shadow-4</code> pair, which is now{' '}
        <code>--elevation-overlay-shadow</code>. <code>sticky</code>&rsquo;s
        shadow is seeded from <code>DataTable</code>&rsquo;s column headers,
        its only real precedent.
      </Paragraph>
      <Paragraph>
        Not every existing z-index level maps to a role — <code>Drawer</code>
        , for instance, uses its own dedicated offcanvas levels for
        stacking, so only its shadow was migrated to{' '}
        <code>--elevation-overlay-shadow</code>; its z-index was left
        untouched. Roles cover the common, reusable cases — components with
        a genuinely dedicated stacking concern keep using the primitive{' '}
        <code>--level-*</code> variables directly.
      </Paragraph>

      <Heading>Dark theme</Heading>
      <Paragraph>
        <code>--shadow-*</code> is built from two kinds of layers: a
        hairline <code>--gray-aN</code> outline and a soft{' '}
        <code>--black-aN</code> blur. The outline needs no special handling
        in dark mode — Altrone already defines <code>--gray-aN</code> as a
        light overlay there (see <code>colors/_gray.scss</code>), so it
        reads as a highlight against a dark surface on its own. The blur
        does: plain black at light-mode opacity barely registers against
        an already-dark surface, so under{' '}
        <code>[data-altrone-theme=&apos;dark&apos;]</code> each{' '}
        <code>--black-aN</code> reference is shifted ~4 steps up the alpha
        scale (e.g. <code>--black-a1</code> → <code>--black-a5</code>) to
        stay legible. Switch the theme toolbar above to dark to see the
        swatches respond.
      </Paragraph>
      <Paragraph>
        The exact opacity shifts are a starting point rather than a
        finished design — the more &ldquo;correct&rdquo; Material 3 answer
        (lighten the surface itself instead of leaning on shadow) is a
        separate, larger piece of work, worth revisiting once{' '}
        <code>Box</code>&rsquo;s tonal materials exist.
      </Paragraph>
    </Flex>
  ),
};
