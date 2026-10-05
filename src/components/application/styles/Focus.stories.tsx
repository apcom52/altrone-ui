import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, Button, Flex, Tabs, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta = {
  title: 'Foundations/Focus',
  decorators: [StorybookDecorator],
};

export default story;

type Story = StoryObj;

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

export const Overview: Story = {
  render: () => (
    <Flex orientation="vertical" gap="l">
      <Heading>Keyboard focus</Heading>
      <Paragraph>
        Every focusable element inside <Text code>Application</Text> gets the
        same ring on <Text code>:focus-visible</Text>: a{' '}
        <Text code>--focus-ring-width</Text> outline in{' '}
        <Text code>--focus-color</Text>, pushed out by{' '}
        <Text code>--focus-ring-offset</Text>. The color flips with the theme,
        so the ring stays readable on both light and dark surfaces.
      </Paragraph>
      <Paragraph>
        The rule has zero specificity, so a component overrides it with a
        plain class. Components that draw their own indicator set{' '}
        <Text code>outline: none</Text> and replace the ring entirely.
        Elements focused programmatically with{' '}
        <Text code>tabindex=&quot;-1&quot;</Text> (focus-trap containers) are
        skipped.
      </Paragraph>
      <Heading>Try it with Tab</Heading>
      <Flex gap="m" wrap align="center">
        <Button label="Button" />
        <Tabs>
          <Tabs.Item label="Tab one" selected />
          <Tabs.Item label="Tab two" />
        </Tabs>
        <Breadcrumbs>
          <Breadcrumbs.Item asChild label="Home">
            <a href="#" />
          </Breadcrumbs.Item>
          <Breadcrumbs.Item current label="Section" />
        </Breadcrumbs>
        <Text href="#">A link</Text>
      </Flex>
    </Flex>
  ),
};
