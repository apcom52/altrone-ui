import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Button, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Divider } from './Divider.tsx';

const story: Meta<typeof Divider> = {
  title: 'Components/Atoms/Divider',
  component: Divider,
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

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 16 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

export const Overview: StoryObj<typeof Divider> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Text block size={9} weight="bold">
        Divider
      </Text>

      <Paragraph>
        <Text code>Divider</Text> is a thin rule. It renders a native{' '}
        <Text code>&lt;hr&gt;</Text> (which already carries the{' '}
        <Text code>separator</Text> role). Default is horizontal; pass{' '}
        <Text code>direction="vertical"</Text> to stand it up (it also gets{' '}
        <Text code>aria-orientation="vertical"</Text> and stretches to its
        flex row's height).
      </Paragraph>

      <Heading>Horizontal</Heading>
      <Paragraph>
        Separates stacked sections. The rule is slightly inset from the
        container edges.
      </Paragraph>
      <Flex direction="vertical" gap="m">
        <Text block>Profile</Text>
        <Divider />
        <Text block>Security</Text>
        <Divider />
        <Text block>Danger zone</Text>
      </Flex>

      <Heading>Vertical</Heading>
      <Paragraph>Separates items in a row — a toolbar, a button group.</Paragraph>
      <Flex direction="horizontal" gap="m" align="center">
        <Button label="Cut" />
        <Button label="Copy" />
        <Divider direction="vertical" />
        <Button label="Paste" />
        <Divider direction="vertical" />
        <Button label="Delete" danger />
      </Flex>
    </Flex>
  ),
};
