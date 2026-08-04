import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, Pagination, Range } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { NumberUtils } from 'utils';
import { useState } from 'react';

const story: Meta = {
  title: 'Foundations/Radius',
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

/** Matches --radius-mini. */
const RADIUS_FLOOR = 2;

const ConcentricPlayground = () => {
  const [outer, setOuter] = useState(24);
  const [gap, setGap] = useState(8);
  /** Same formula the CSS uses — see vitest/numberUtils.test.ts. */
  const inner = NumberUtils.concentricRadius(outer, gap, RADIUS_FLOOR);

  return (
    <Flex direction="vertical" gap="m">
      <Flex gap="l" wrap>
        <div style={{ width: 240 }}>
          <Text block size={3} weight="medium">
            Outer radius
          </Text>
          <Range
            min={0}
            max={48}
            value={outer}
            onChange={setOuter}
            renderLabel={(value) => `${value}px`}
            showCurrentValue="always"
          />
        </div>
        <div style={{ width: 240 }}>
          <Text block size={3} weight="medium">
            Gap
          </Text>
          <Range
            min={0}
            max={48}
            value={gap}
            onChange={setGap}
            renderLabel={(value) => `${value}px`}
            showCurrentValue="always"
          />
        </div>
      </Flex>

      <div
        style={{
          padding: gap,
          background: 'var(--accent-a4)',
          borderRadius: outer,
          transition: 'border-radius 0.2s ease',
          width: 280,
        }}
      >
        <div
          style={{
            height: 120,
            background: 'var(--accent-a9)',
            borderRadius: inner,
            transition: 'border-radius 0.2s ease',
          }}
        />
      </div>

      <Text size={3} color="muted">
        {outer < RADIUS_FLOOR
          ? `Outer radius is below the ${RADIUS_FLOOR}px floor, so it's treated as an explicit choice and passed through unchanged: `
          : `Child radius = max(${RADIUS_FLOOR}, ${outer} − ${gap}) = `}
        <b>{inner}px</b>
      </Text>
      <Text size={3} color="muted">
        Try dragging the gap slider all the way up — the inner corner never
        goes fully square while the outer box has a radius. Then drag the
        outer radius down to 0: the inner corner drops to 0 too, instead of
        being forced up to the {RADIUS_FLOOR}px floor.
      </Text>
    </Flex>
  );
};

const AnimatedExample = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <Flex direction="vertical" gap="s">
      <div
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={{
          width: 160,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--accent-9)',
          color: 'white',
          cursor: 'pointer',
          userSelect: 'none',
          borderRadius: pressed ? 'var(--radius-mini)' : 'var(--radius-l)',
          transition: 'border-radius 0.25s ease',
        }}
      >
        Press me
      </div>
      <Text size={3} color="muted">
        Because <code>--radius-outer</code> is registered via{' '}
        <code>@property</code>, changes to it transition smoothly as a
        length. Without the registration, the browser would treat it as an
        opaque string and the corner would snap instantly instead of easing.
      </Text>
    </Flex>
  );
};

export const Overview: StoryObj = {
  name: 'Concentric Radius',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Concentric Radius
      </Text>
      <Paragraph>
        When a rounded box sits inside another rounded box, their corners
        should look like they share a center — the inner corner should curve
        a little less than the outer one, by exactly the width of the gap
        between them. Get this wrong and nested rounded elements look
        subtly &ldquo;off&rdquo;, even if nobody can immediately say why.
      </Paragraph>

      <Heading>The formula</Heading>
      <Paragraph>
        Altrone derives nested radii instead of picking them from a table:
      </Paragraph>
      <Code>{'radius_child = radius_parent - gap'}</Code>
      <Paragraph>
        (With one refinement — the result never quite reaches 0 while the
        parent has a radius at all, unless the parent explicitly asked for
        none. More on that below.)
      </Paragraph>
      <Paragraph>
        This is the same idea as shadcn/ui&rsquo;s <code>--radius</code>{' '}
        tiers (all computed via <code>calc()</code> from one root value) and
        Apple SwiftUI&rsquo;s <code>ContainerRelativeShape</code>, where a
        child view asks its container for its shape instead of hardcoding
        its own. On the web, CSS custom property inheritance gives us the
        same thing for free: a descendant reads its parent&rsquo;s{' '}
        <code>var(--radius-outer)</code> through the cascade — no
        JavaScript, resolved cheaply at style recalculation.
      </Paragraph>

      <Heading>Try it</Heading>
      <Paragraph>
        Drag the sliders below. The inner box always stays concentric with
        the outer one, however the numbers change.
      </Paragraph>
      <ConcentricPlayground />

      <Heading>Never fully square — unless you meant it</Heading>
      <Paragraph>
        A wide gap can subtract more than the outer radius has to give,
        which would round the inner corner all the way down to a hard,
        90&deg; edge sitting inside a rounded container — a small but
        noticeable visual glitch. So the formula floors the result at{' '}
        <code>--radius-mini</code> (2px): inside a rounded container, a
        corner is allowed to be barely rounded, but never perfectly square.
      </Paragraph>
      <Paragraph>
        That floor only applies when there is a radius to protect. If the
        outer element has explicitly opted out of rounding entirely
        (<code>--radius-outer: 0</code>), the formula has nothing to
        protect and lets the 0 through untouched — forcing a 2px corner
        onto an element that deliberately asked for square corners would be
        the same drift-by-convenience problem this whole system exists to
        avoid. The trick is a single <code>clamp()</code>:
      </Paragraph>
      <Code>{`--radius-outer: clamp(
  var(--radius-mini),
  calc(var(--radius-outer) - var(--gap)),
  var(--radius-outer)
);`}</Code>
      <Paragraph>
        <code>{'clamp(MIN, VAL, MAX)'}</code> normally resolves to{' '}
        <code>{'max(MIN, min(VAL, MAX))'}</code>, but the CSS spec carves
        out one exception: when <code>MIN</code> is greater than{' '}
        <code>MAX</code>, the result is <code>MAX</code>. Here{' '}
        <code>MAX</code> is the inherited radius itself, so whenever it is
        already below the 2px floor — including exactly 0 — that exception
        fires and the inherited value passes through unchanged instead of
        being pulled up to the floor.
      </Paragraph>

      <Heading>Why not a static size table</Heading>
      <Paragraph>
        The library used to hardcode a radius per component size, and any
        nested element that needed to match its container had to add its
        own hand-picked offset. <code>Pagination</code> is a real example
        that shipped this way:
      </Paragraph>
      <Code>{`.Pagination {
  padding: 4px;
  border-radius: calc(var(--pagination-rounding) + 4px);
  /* the "4px" here and the padding above are the same
     number, written twice, with no link between them */
}`}</Code>
      <Paragraph>
        Nothing enforced that the <code>4px</code> gap in the radius
        calculation matched the <code>4px</code> padding — a future edit to
        either one would quietly break the concentric look. The fix ties
        both to one variable and publishes the result as{' '}
        <code>--radius-outer</code>, so any descendant can pick it up:
      </Paragraph>
      <Code>{`.Pagination {
  --pagination-gap: 4px;

  padding: var(--pagination-gap);
  --radius-outer: calc(var(--pagination-rounding) + var(--pagination-gap));
  border-radius: var(--radius-outer);
}`}</Code>
      <Paragraph>Same pixels on screen, one source of truth:</Paragraph>
      <Pagination currentPage={3} totalPages={12} onChange={() => {}} />

      <Heading>Animating a radius change</Heading>
      <Paragraph>
        A plain CSS custom property has no defined type, so the browser
        can&rsquo;t interpolate it — a transition on it just snaps at the
        midpoint. Registering <code>--radius-outer</code> with{' '}
        <code>@property</code> and <code>{"syntax: '<length>'"}</code>{' '}
        teaches the browser that it is a length, which makes it animatable:
      </Paragraph>
      <Code>{`@property --radius-outer {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}`}</Code>
      <AnimatedExample />

      <Heading>Using it in a component</Heading>
      <Paragraph>
        Starting a new radius scope means picking a seed value for the
        outermost element:
      </Paragraph>
      <Code>{`.Card {
  --radius-outer: var(--radius-l);
  border-radius: var(--radius-outer);
}`}</Code>
      <Paragraph>
        A nested element nested inside it derives its own radius instead of
        picking another seed, and — if it has children of its own —
        re-publishes <code>--radius-outer</code> so the cascade continues:
      </Paragraph>
      <Code>{`.CardThumbnail {
  --card-thumbnail-gap: var(--gap);
  --radius-outer: clamp(
    var(--radius-mini),
    calc(var(--radius-outer) - var(--card-thumbnail-gap)),
    var(--radius-outer)
  );
  border-radius: var(--radius-outer);
}`}</Code>
    </Flex>
  ),
};
