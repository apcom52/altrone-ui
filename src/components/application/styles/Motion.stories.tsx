import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, Skeleton, Loading } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta = {
  title: 'Foundations/Motion',
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

export const Overview: StoryObj = {
  name: 'Motion & Reduced Motion',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Motion
      </Text>
      <Paragraph>
        Turning on &ldquo;reduce motion&rdquo; doesn&rsquo;t mean turning
        off motion — it means removing motion that doesn&rsquo;t carry
        information: autoplay, looping, decorative movement. Direct
        feedback tied to something the user just did (a drag following the
        cursor, a panel expanding because it was clicked) stays, per WCAG
        2.3.3. Altrone has two layers for this, depending on where an
        animation is implemented.
      </Paragraph>
      <Paragraph>
        Use the <strong>Motion</strong> toggle in the Storybook toolbar to
        preview any story with reduced motion forced on — it flips{' '}
        <code>{'<MotionConfig reducedMotion>'}</code> to{' '}
        <code>always</code> and zeroes the CSS duration tokens, without
        touching your OS setting.
      </Paragraph>

      <Heading>Plain CSS</Heading>
      <Paragraph>
        Durations and easing are custom properties, zeroed under{' '}
        <code>prefers-reduced-motion: reduce</code> at the root — a
        component using them gets reduced motion automatically, with no
        media query of its own:
      </Paragraph>
      <Code>{`--motion-duration-fast: 0.1s;
--motion-duration-base: 0.2s;
--motion-easing-standard: ease;

/* zeroed under prefers-reduced-motion: reduce */`}</Code>
      <Paragraph>
        This only covers simple property transitions. A looping{' '}
        <code>@keyframes</code> animation isn&rsquo;t stopped by a duration
        going to <code>0s</code> the way a transition would be — it needs
        its own <code>@media (prefers-reduced-motion: reduce)</code> block.
        Whether to stop, slow down, or keep such an animation is a
        per-case call, not something the token layer can decide generically.
      </Paragraph>

      <Heading>The <code>motion</code> library</Heading>
      <Paragraph>
        Everything animated through <code>motion/react</code> (Modal,
        Popover, Tooltip, Toast, Spoiler, and more) is covered globally —{' '}
        <code>AltroneApplication</code> wraps its tree in{' '}
        <code>{'<MotionConfig reducedMotion="user">'}</code>, so individual
        components don&rsquo;t each need to check the media query
        themselves.
      </Paragraph>
      <Paragraph>
        For manual JS timing that isn&rsquo;t driven by <code>motion</code>{' '}
        (e.g. a <code>setTimeout</code> before unmounting after an exit
        animation), reuse the existing SSR-safe{' '}
        <code>{"useMediaMatch('(prefers-reduced-motion: reduce)')"}</code>{' '}
        hook instead of hardcoding a duration.
      </Paragraph>

      <Heading>Two real examples, two different answers</Heading>
      <Paragraph>
        <code>Skeleton</code>&rsquo;s shimmer is purely decorative — it
        doesn&rsquo;t communicate anything a static placeholder
        doesn&rsquo;t already say, so it stops under reduced motion:
      </Paragraph>
      <Flex gap="m">
        <Skeleton width="160px" height="20px" />
      </Flex>
      <Paragraph>
        <code>Loading</code>&rsquo;s spinner, on the other hand, keeps
        spinning. It&rsquo;s a functional state indicator — the only signal
        that a background operation is still running — not decorative
        motion, so removing it would remove real information:
      </Paragraph>
      <Flex gap="m">
        <Loading />
      </Flex>
    </Flex>
  ),
};
