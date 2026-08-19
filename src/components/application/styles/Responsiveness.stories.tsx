import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { useBreakpoint, useContainerQuery } from 'utils';
import { useRef } from 'react';

const story: Meta = {
  title: 'Foundations/Responsiveness',
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

const BreakpointDemo = () => {
  const { isXs, isSm, isMd, isLg, isXl } = useBreakpoint();
  const entries: [string, boolean][] = [
    ['xs (520px)', isXs],
    ['sm (768px)', isSm],
    ['md (1024px)', isMd],
    ['lg (1280px)', isLg],
    ['xl (1640px)', isXl],
  ];

  return (
    <Flex gap="s" wrap>
      {entries.map(([label, matched]) => (
        <div
          key={label}
          style={{
            padding: '6px 12px',
            borderRadius: 999,
            background: matched ? 'var(--accent-9)' : 'var(--gray-a4)',
            color: matched ? 'white' : 'var(--text-1)',
          }}
        >
          <Text size={3} weight="medium">
            {label}
          </Text>
        </div>
      ))}
    </Flex>
  );
};

const ContainerQueryDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isNarrow = useContainerQuery(ref, { maxWidth: 340 });

  return (
    <div
      ref={ref}
      style={{
        resize: 'horizontal',
        overflow: 'auto',
        minWidth: 200,
        maxWidth: 600,
        width: 400,
        padding: 16,
        borderRadius: 12,
        border: '1px solid var(--border-1)',
        background: 'var(--background-2)',
      }}
    >
      <Flex direction={isNarrow ? 'vertical' : 'horizontal'} gap="m">
        <div
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            background: 'var(--accent-a4)',
          }}
        >
          <Text size={3}>List</Text>
        </div>
        <div
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            background: 'var(--accent-a4)',
          }}
        >
          <Text size={3}>Detail</Text>
        </div>
      </Flex>
      <Text block size={2} color="muted" style={{ marginTop: 8 }}>
        {isNarrow ? 'Stacked (container < 340px)' : 'Side by side'} — drag
        the bottom-right corner to resize this box.
      </Text>
    </div>
  );
};

export const Overview: StoryObj = {
  name: 'Responsiveness',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Responsiveness
      </Text>
      <Paragraph>
        Two independent levels, for two independent questions.{' '}
        <strong>Viewport breakpoints</strong> answer app-level questions —
        should the app show a mobile nav right now?{' '}
        <strong>Container queries</strong> answer component-level questions
        — does this particular panel have room for a side-by-side layout,
        regardless of how big the browser window is? A component sitting
        in a narrow <code>Splitter</code> panel on a huge monitor should
        respond to its own space, not the viewport.
      </Paragraph>

      <Heading>Viewport: useBreakpoint()</Heading>
      <Paragraph>
        Mirrors the <code>--breakpoint-*</code> CSS custom properties, so
        JS-side decisions use the same thresholds as any CSS written
        against them. Each flag is <code>min-width</code> — &ldquo;the
        viewport is at least this wide&rdquo; — not a mutually exclusive
        bucket, so on a wide screen several are true at once. Resize this
        window to see which ones light up:
      </Paragraph>
      <BreakpointDemo />
      <Code>{`const { isSm, isLg } = useBreakpoint();
if (!isSm) return <MobileNav />;`}</Code>

      <Heading>Container: useContainerQuery()</Heading>
      <Paragraph>
        For structural changes — swapping a layout, not just hiding an
        element — that need to happen in JS/React rather than pure CSS
        (e.g. a List-Detail view collapsing into a single stacked panel).
        Pure visual adjustments (hide something, change a grid
        column count) should stay in CSS <code>@container</code> queries
        instead — no JS, no measurement, no SSR mismatch risk. Reach for
        this hook only when the decision can&rsquo;t be expressed in CSS
        alone:
      </Paragraph>
      <ContainerQueryDemo />
      <Code>{`const ref = useRef<HTMLDivElement>(null);
const isNarrow = useContainerQuery(ref, { maxWidth: 480 });
return <div ref={ref}>{isNarrow ? <Stacked /> : <SideBySide />}</div>;`}</Code>
      <Paragraph>
        Built on <code>useElementSize()</code>, which tracks an
        element&rsquo;s content-box size via <code>ResizeObserver</code>.
        Both hooks report a zero/false default until the element is
        actually measured on mount — server and the first client render
        always agree, the same SSR-safe pattern <code>useMediaMatch()</code>{' '}
        already uses for viewport queries.
      </Paragraph>

      <Heading>What doesn&rsquo;t change</Heading>
      <Paragraph>
        A component&rsquo;s <code>size</code> prop stays an explicit,
        author-set choice — it never changes implicitly based on a
        breakpoint. Matches the library&rsquo;s broader philosophy: explicit
        config over magic.
      </Paragraph>
    </Flex>
  ),
};
