import { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label.tsx';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';

const story: Meta<typeof Label> = {
  title: 'Components/Atoms/Label',
  component: Label,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export default story;

export const Overview: StoryObj<typeof Label> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Text block size={9} weight="bold">
        Label
      </Text>
      <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
        A small tag for a status or a category — not an HTML{' '}
        <Text code>&lt;label&gt;</Text>. Pick a <Text code>color</Text>: a
        semantic one (<Text code>primary</Text> / <Text code>success</Text> /{' '}
        <Text code>warning</Text> / <Text code>danger</Text>, which follow the
        design-system status hues), one of the ten categorical hues (
        <Text code>blue</Text>, <Text code>teal</Text>, …), or{' '}
        <Text code>default</Text> for neutral. Cross it with a{' '}
        <Text code>variant</Text> (<Text code>solid</Text> /{' '}
        <Text code>soft</Text> / <Text code>outline</Text>), a{' '}
        <Text code>rounding</Text> (<Text code>rounded</Text> /{' '}
        <Text code>pill</Text>) and a <Text code>size</Text>.
      </Text>
      <Flex gap="s" wrap align="center">
        <Label color="success" variant="soft">Done</Label>
        <Label color="warning" variant="soft">In review</Label>
        <Label color="danger" variant="soft">Blocked</Label>
        <Label color="primary" variant="soft">Beta</Label>
        <Label color="default">Draft</Label>
        <Label color="indigo" rounding="pill">v2.0.0</Label>
        <Label color="teal" variant="outline">SDK</Label>
      </Flex>
    </Flex>
  ),
};

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Showcase',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Different labels (solid variant)
        </Text>
        <Flex gap="m" wrap>
          <Label color="default">Processing</Label>
          <Label color="primary">In progress</Label>
          <Label color="warning">In review</Label>
          <Label color="success">Completed</Label>
          <Label color="danger">Cancelled</Label>
          <Label color="amber">Amber</Label>
          <Label color="blue">Blue</Label>
          <Label color="brown">Brown</Label>
          <Label color="indigo">Indigo</Label>
          <Label color="pink">Pink</Label>
          <Label color="purple">Purple</Label>
          <Label color="red">Red</Label>
          <Label color="teal">Teal</Label>
        </Flex>
        <Text size={5} weight="bold" block>
          Different labels (soft variant)
        </Text>
        <Flex gap="m" wrap>
          <Label color="default" variant="soft">Processing</Label>
          <Label color="primary" variant="soft">In progress</Label>
          <Label color="warning" variant="soft">In review</Label>
          <Label color="success" variant="soft">Completed</Label>
          <Label color="danger" variant="soft">Cancelled</Label>
          <Label color="amber" variant="soft">Amber</Label>
          <Label color="blue" variant="soft">Blue</Label>
          <Label color="brown" variant="soft">Brown</Label>
          <Label color="indigo" variant="soft">Indigo</Label>
          <Label color="pink" variant="soft">Pink</Label>
          <Label color="purple" variant="soft">Purple</Label>
          <Label color="red" variant="soft">Red</Label>
          <Label color="teal" variant="soft">Teal</Label>
        </Flex>
        <Text size={5} weight="bold" block>
          Different labels (outline variant)
        </Text>
        <Flex gap="m" wrap>
          <Label color="default" variant="outline">Processing</Label>
          <Label color="primary" variant="outline">In progress</Label>
          <Label color="warning" variant="outline">In review</Label>
          <Label color="success" variant="outline">Completed</Label>
          <Label color="danger" variant="outline">Cancelled</Label>
          <Label color="amber" variant="outline">Amber</Label>
          <Label color="blue" variant="outline">Blue</Label>
          <Label color="brown" variant="outline">Brown</Label>
          <Label color="indigo" variant="outline">Indigo</Label>
          <Label color="pink" variant="outline">Pink</Label>
          <Label color="purple" variant="outline">Purple</Label>
          <Label color="red" variant="outline">Red</Label>
          <Label color="teal" variant="outline">Teal</Label>
        </Flex>
        <Text size={5} weight="bold" block>
          Pills
        </Text>
        <Flex gap="m" wrap>
          <Label color="default" rounding="pill">Processing</Label>
          <Label color="primary" rounding="pill">In progress</Label>
          <Label color="warning" rounding="pill">In review</Label>
          <Label color="success" rounding="pill">Completed</Label>
          <Label color="danger" rounding="pill">Cancelled</Label>
        </Flex>
        <Text size={5} weight="bold" block>
          Sizes
        </Text>
        <Flex gap="m" wrap align="start">
          <Label color="default" size="mini" variant="soft">Processing</Label>
          <Label color="primary" size="s" variant="soft">In progress</Label>
          <Label color="warning" size="m" variant="soft">In review</Label>
          <Label color="success" size="l" variant="soft">Completed</Label>
          <Label color="danger" size="xl" variant="soft">Cancelled</Label>
        </Flex>
      </Flex>
    );
  },
};
