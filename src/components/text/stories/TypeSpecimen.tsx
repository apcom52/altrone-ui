import { Flex, Text } from 'components';

const TAG_MAP: [string, string][] = [
  ['— (default)', 'span'],
  ['block', 'p'],
  ['list="numeric"', 'ol'],
  ['list="marked"', 'ul'],
  ['item', 'li'],
  ['href="…"', 'a'],
  ['asChild', 'your element'],
];

const SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const SIZE_PX = [8, 10, 12, 14, 16, 18, 20, 24, 28];

const WEIGHTS = ['light', 'regular', 'medium', 'bold'] as const;

export const TypeSpecimen = () => {
  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Text size={8} weight="bold" block>
        One primitive for every string in the UI
      </Text>
      <Text block>
        <Text weight="bold">Text</Text> is the only text element you reach for.
        You never hand-pick a <Text code>&lt;p&gt;</Text>, a{' '}
        <Text code>&lt;span&gt;</Text> or an <Text code>&lt;h2&gt;</Text> and
        then re-derive its type styles in CSS — you describe the role and{' '}
        <Text weight="bold">Text</Text> renders the right tag with the right
        rhythm. Mixing structural props (<Text code>block</Text>,{' '}
        <Text code>list</Text>, <Text code>item</Text>, <Text code>href</Text>)
        is a type error, so a given <Text weight="bold">Text</Text> is always
        exactly one kind of node.
      </Text>

      <Text size={6} weight="bold" block>
        The element it renders
      </Text>
      <Text block>
        The rendered tag follows from the props — and the ref is typed to match,
        so a <Text code>Tooltip</Text> or <Text code>Dropdown</Text> can anchor
        to any of them transparently.
      </Text>
      <Flex direction="vertical" gap="xs">
        {TAG_MAP.map(([prop, tag]) => (
          <Flex key={prop} direction="horizontal" gap="m" align="center">
            <Text
              code
              size={2}
              style={{ display: 'inline-block', minWidth: 132 }}
            >
              {prop}
            </Text>
            <Text size={2} color="muted">
              →
            </Text>
            <Text size={3} weight="medium">
              {tag === 'your element' ? tag : `<${tag}>`}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Text size={6} weight="bold" block>
        The size scale
      </Text>
      <Text block>
        Nine fixed steps, in pixels (a <Text code>rem</Text> scale is a known
        gap, not yet built). A <Text code>block</Text> paragraph relaxes to a{' '}
        <Text code>1.6</Text> reading rhythm; a sized line keeps the tighter
        line-height of its step, which is what you want for headings and single
        rows.
      </Text>
      <Flex direction="vertical" gap="s">
        {SIZES.map((n, i) => (
          <Flex key={n} direction="horizontal" gap="m" align="center">
            <Text
              code
              size={2}
              color="muted"
              style={{ display: 'inline-block', minWidth: 56 }}
            >
              {SIZE_PX[i]}px
            </Text>
            <Text size={n}>The quick brown fox jumps</Text>
          </Flex>
        ))}
      </Flex>

      <Text size={6} weight="bold" block>
        Weight
      </Text>
      <Flex direction="vertical" gap="s">
        {WEIGHTS.map((w) => (
          <Flex key={w} direction="horizontal" gap="m" align="center">
            <Text
              code
              size={2}
              color="muted"
              style={{ display: 'inline-block', minWidth: 56 }}
            >
              {w}
            </Text>
            <Text size={5} weight={w}>
              Ship early, ship often
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
