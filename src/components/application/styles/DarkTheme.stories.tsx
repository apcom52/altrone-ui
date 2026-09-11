import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, Switcher } from 'components';
import { useAltroneTheme } from 'components/application';
import { StorybookDecorator } from 'global/storybook';

const story: Meta = {
  title: 'Foundations/Dark Theme',
  decorators: [StorybookDecorator],
};

export default story;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

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

const ThemeToggleDemo = () => {
  const { theme, setTheme } = useAltroneTheme();

  return (
    <Flex direction="vertical" gap="m">
      <Switcher
        checked={theme === 'dark'}
        onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      >
        Dark theme
      </Switcher>
      <Flex gap="m" wrap>
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--background-2)',
            border: '1px solid var(--border-1)',
            width: 160,
          }}
        >
          <Text size={4} weight="bold">
            Surface
          </Text>
          <Text block size={3} color="muted">
            --background-2 / --border-1
          </Text>
        </div>
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--accent-3)',
            width: 160,
          }}
        >
          <Text size={4} weight="bold" style={{ color: 'var(--accent-11)' }}>
            Accent
          </Text>
          <Text block size={3} style={{ color: 'var(--accent-11)' }}>
            --accent-3 / --accent-11
          </Text>
        </div>
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            width: 160,
            background:
              'linear-gradient(135deg, var(--accent-9), var(--purple-9))',
          }}
        >
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: 'var(--glass-background-color)',
              backdropFilter: 'var(--glass-effects)',
              WebkitBackdropFilter: 'var(--glass-effects)',
              border: '1px solid var(--glass-border-color)',
            }}
          >
            <Text size={4} weight="bold">
              Glass
            </Text>
            <Text block size={3} color="muted">
              --glass-background-color
            </Text>
          </div>
        </div>
      </Flex>
      <Text size={3} color="muted">
        Current: <code>data-altrone-theme=&quot;{theme}&quot;</code> — flip
        the switch, no page reload.
      </Text>
    </Flex>
  );
};

export const Overview: StoryObj = {
  name: 'Dark Theme',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Dark Theme
      </Text>
      <Paragraph>
        Altrone switches theme via a <code>data-altrone-theme</code>{' '}
        attribute, set by JS state rather than relying only on the OS-level{' '}
        <code>prefers-color-scheme</code> media query — the same approach as
        next-themes and Radix Themes. That means a consumer can offer an
        in-app light/dark toggle that overrides the system preference, not
        just follow it.
      </Paragraph>

      <Heading>Controlling it</Heading>
      <Paragraph>
        <code>{'<Application theme="...">'}</code> accepts{' '}
        <code>&apos;auto&apos;</code> (default — follows{' '}
        <code>prefers-color-scheme</code>), <code>&apos;light&apos;</code>,
        or <code>&apos;dark&apos;</code>. From inside the tree, read or
        change it with <code>useAltroneTheme()</code>:
      </Paragraph>
      <Code>{`const { theme, setTheme } = useAltroneTheme();
setTheme('dark');`}</Code>
      <Paragraph>Try it — this toggles the real app theme:</Paragraph>
      <ThemeToggleDemo />

      <Heading>Writing theme-aware styles</Heading>
      <Paragraph>
        Almost nothing you write needs its own{' '}
        <code>[data-altrone-theme=&apos;dark&apos;]</code> block. Every
        color scale — gray, the ten accent hues, the four status colors,
        the categorical palette — already redefines itself under that
        selector, and the semantic roles built on top (
        <code>--background-*</code>, <code>--text-*</code>,{' '}
        <code>--accent-N</code>, <code>--danger-text-*</code>, …) inherit
        that automatically. Reach for a role, not a raw step, and dark mode
        comes for free:
      </Paragraph>
      <Code>{`.Card {
  background: var(--background-2);
  color: var(--text-2);
  border: 1px solid var(--border-1);
}
/* no dark-mode override needed — already correct in both themes */`}</Code>
      <Paragraph>
        A component only needs its own{' '}
        <code>[data-altrone-theme=&apos;dark&apos;]</code> block for a
        value that isn&rsquo;t already theme-aware — the shadow recipe is a
        real example (see <code>Foundations/Elevation</code>): shadows are
        built from <code>--black-aN</code>, which doesn&rsquo;t adapt on
        its own, so the dark variant is overridden explicitly.
      </Paragraph>
      <Paragraph>
        Same category of bug, twice found the hard way: <code>--glass-background-color</code>{' '}
        and <code>--color-overlay-scrim</code> both had dark-mode values
        picked as if they were independent colors, when in practice they
        sit on top of <code>--background-1</code>/<code>-2</code> and need
        to contrast against them specifically. A near-black glass fill or a
        black scrim barely reads over an already near-black page — the{' '}
        <code>Glass</code> swatch above uses{' '}
        <code>--gray-a6</code>, the light-tinted alpha scale{' '}
        <code>--gray-aN</code> already uses for dark-mode overlays, so it
        lifts off the page instead of blending into it.
      </Paragraph>

      <Heading>Avoiding a flash of the wrong theme</Heading>
      <Paragraph>
        <code>&apos;auto&apos;</code> is resolved on the client — during
        server rendering there&rsquo;s no <code>window</code> to check, so
        the server has to guess (currently: light). A visitor with a dark
        system preference can see a flash of light content before
        hydration corrects it. <code>getThemeInitScript()</code> returns
        the source for a small blocking script that sets{' '}
        <code>data-altrone-theme</code> on <code>&lt;html&gt;</code> before
        that first paint:
      </Paragraph>
      <Code>{`<script
  dangerouslySetInnerHTML={{ __html: getThemeInitScript(theme) }}
/>`}</Code>
      <Paragraph>
        <code>Application</code> already renders this itself as a
        best-effort default. For a hard guarantee under streaming SSR,
        place it in your document&rsquo;s <code>&lt;head&gt;</code>{' '}
        yourself, before any themed content.
      </Paragraph>
    </Flex>
  ),
};
