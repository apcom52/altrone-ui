import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, Range } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { useState } from 'react';
import { Heart } from 'lucide-react';

const story: Meta = {
  title: 'Foundations/Spacing',
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

const RoleDemo = ({
  role,
  label,
  children,
}: {
  role: string;
  label: string;
  children: React.ReactNode;
}) => (
  <Flex direction="vertical" gap="s" align="start">
    <Text size={3} weight="medium">
      {label} — <code>var({role})</code>
    </Text>
    {children}
  </Flex>
);

const PrimitiveSwitcher = () => {
  const tiers = [
    'narrow-gap',
    'xs-gap',
    's-gap',
    'gap',
    'l-gap',
    'xl-gap',
    'xxl-gap',
  ];
  const [tierIndex, setTierIndex] = useState(3); // 'gap'
  const tier = tiers[tierIndex];

  return (
    <Flex direction="vertical" gap="m">
      <div style={{ width: 320 }}>
        <Text block size={3} weight="medium">
          --space-content aliased to: --{tier}
        </Text>
        <Range
          min={0}
          max={tiers.length - 1}
          value={tierIndex}
          onChange={setTierIndex}
          renderLabel={() => tier}
          showCurrentValue="always"
        />
      </div>
      <div
        style={{
          display: 'inline-block',
          padding: `var(--${tier})`,
          background: 'var(--accent-a4)',
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 160,
            height: 60,
            background: 'var(--accent-a9)',
            borderRadius: 4,
          }}
        />
      </div>
      <Text size={3} color="muted">
        Re-pointing one primitive tier updates every role built on it — the
        role never has to be touched.
      </Text>
    </Flex>
  );
};

export const Overview: StoryObj = {
  name: 'Spacing Roles',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Spacing Roles
      </Text>
      <Paragraph>
        Altrone already has a spacing scale — <code>--narrow-gap</code>{' '}
        through <code>--xxl-gap</code>. What it didn&rsquo;t have was
        names for what each gap is <em>for</em>, so components picked
        px values by hand instead of reaching for the scale, and two
        places that should match (say, a container&rsquo;s padding and
        its own inner gap) could quietly drift apart.
      </Paragraph>
      <Paragraph>
        The roles below don&rsquo;t introduce new raw values — each one is
        an alias onto the existing primitive scale. The primitive stays
        the single source of truth for &ldquo;how many px&rdquo;; the role
        only answers &ldquo;which primitive, for what purpose&rdquo;.
      </Paragraph>

      <Heading>The roles</Heading>

      <RoleDemo role="--space-inline" label="Icon ↔ text gap">
        <Flex gap="xs" align="center">
          <Heart size={16} />
          <Text>Like</Text>
        </Flex>
      </RoleDemo>

      <RoleDemo role="--space-stack" label="Vertical rhythm between rows">
        <Flex direction="vertical" gap="xs" style={{ width: 200 }}>
          {['First name', 'Last name', 'Email'].map((label) => (
            <div
              key={label}
              style={{
                padding: 8,
                background: 'var(--gray-a3)',
                borderRadius: 4,
              }}
            >
              <Text size={3}>{label}</Text>
            </div>
          ))}
        </Flex>
      </RoleDemo>

      <RoleDemo role="--space-content" label="Padding inside a container">
        <div
          style={{
            padding: 'var(--space-content)',
            background: 'var(--gray-a3)',
            borderRadius: 4,
          }}
        >
          <Text size={3}>Content padded on all sides</Text>
        </div>
      </RoleDemo>

      <Paragraph>
        Two more roles exist for less common cases:{' '}
        <code>--space-section</code> (gap between large layout blocks) and{' '}
        <code>--space-inset-compact</code> (dense lists/tables).
      </Paragraph>

      <Heading>One primitive, every role in sync</Heading>
      <Paragraph>
        Because a role is just <code>var(--some-gap)</code>, moving the
        whole design onto a different value for a tier is a one-line change
        at the primitive — nothing that references the role has to change:
      </Paragraph>
      <PrimitiveSwitcher />

      <Heading>In practice</Heading>
      <Paragraph>
        Same pixels on screen, now with a name attached instead of a bare
        number — for example in <code>DataGrid</code>:
      </Paragraph>
      <Code>{`.DataGrid {
  gap: 8px; /* was: no indication this is the same idea as .Fields below */
}
.Fields {
  gap: 8px;
}`}</Code>
      <Code>{`.DataGrid {
  gap: var(--space-stack);
}
.Fields {
  gap: var(--space-stack);
}`}</Code>

      <Heading>Control padding — role × size (seed, not final)</Heading>
      <Paragraph>
        Internal control padding needs to vary by component{' '}
        <code>size</code> (<code>mini/s/m/l/xl</code>), unlike the roles
        above — this makes it a matrix, not a flat value:{' '}
        <code>--space-control-x-{'{size}'}</code> /{' '}
        <code>--space-control-y-{'{size}'}</code>. These exist today,
        seeded from the primitive scale as a reasonable starting point —
        but no component has been migrated onto them yet.{' '}
        <code>Button</code> and <code>TextInput</code>, for example, each
        already hardcode their own per-size padding, and neither matches
        this seed. Moving an existing component onto the matrix is a
        deliberate per-component decision, not a rename — it can visibly
        change that component&rsquo;s padding.
      </Paragraph>

      <Heading>Open: the 4px grid</Heading>
      <Paragraph>
        <code>--s-gap</code> is 6px, which breaks the 4px grid the rest of
        the scale sits on. Snapping it to 8px would make it visually
        identical to <code>--gap</code> — which also happens to be the
        value <code>{'<Flex gap="s">'}</code> and{' '}
        <code>{'<Grid gap="s">'}</code> resolve to today, so this
        isn&rsquo;t just a token cleanup: it changes what every{' '}
        <code>gap=&quot;s&quot;</code> renders as. Not resolved here — needs
        a design call on whether to snap the value or drop the tier.
      </Paragraph>
    </Flex>
  ),
};
