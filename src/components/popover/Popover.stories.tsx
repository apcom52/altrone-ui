import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Text, TextHeadingRoles } from 'components';
import { Align, Direction, Gap, Size } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Popover } from './Popover.tsx';

const story: Meta<typeof Popover> = {
  title: 'Components/Display/Popover',
  component: Popover,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const PopoverStory: StoryObj<typeof Flex> = {
  name: 'Using Popover',
  render: () => (
    <Flex direction={Direction.vertical} gap={Gap.large}>
      <Text.Heading role={TextHeadingRoles.inner}>Basic Popovers</Text.Heading>
      <Flex direction={Direction.horizontal} gap={Gap.large}>
        <Popover
          placement="bottom"
          title="System update"
          showCloseButton
          content={
            <Flex gap={Gap.medium}>
              <Text.Paragraph size={Size.small}>
                We're gearing up for a system update packed with improvements
              </Text.Paragraph>
              <Flex
                justify={Align.end}
                direction={Direction.horizontal}
                gap={Gap.small}
              >
                <Button label="Reschedule update" />
                <Button label="Update now" />
              </Flex>
            </Flex>
          }
        >
          <Button label="Open popover" />
        </Popover>
      </Flex>
      <Text.Heading role={TextHeadingRoles.inner}>
        How to trigger the popover?
      </Text.Heading>
      <Flex direction={Direction.horizontal} gap={Gap.large}>
        <Button label="Click me" />
        <Button label="Hover me" />
        <Button label="Focus me" />
      </Flex>
      <Text.Heading role={TextHeadingRoles.inner}>
        Popovers with heading and close buttons
      </Text.Heading>
      <Flex direction={Direction.horizontal} gap={Gap.large}></Flex>
      <Text.Heading role={TextHeadingRoles.inner}>
        Different placement of popover
      </Text.Heading>
      <Flex direction={Direction.horizontal} gap={Gap.large}>
        <Popover
          placement="top"
          title="Unraveling Dark Matter's Mystery"
          showCloseButton
          style={{ maxWidth: '250px' }}
          content={
            <Text.Paragraph size={Size.small}>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text.Paragraph>
          }
        >
          <Button label="Top" />
        </Popover>
        <Popover
          placement="right"
          title="Unraveling Dark Matter's Mystery"
          showCloseButton
          style={{ maxWidth: '250px' }}
          content={
            <Text.Paragraph size={Size.small}>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text.Paragraph>
          }
        >
          <Button label="Right" />
        </Popover>
        <Popover
          placement="bottom"
          title="Unraveling Dark Matter's Mystery"
          showCloseButton
          style={{ maxWidth: '260px' }}
          content={
            <Text.Paragraph size={Size.small}>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text.Paragraph>
          }
        >
          <Button label="Bottom" />
        </Popover>
        <Popover
          placement="left"
          title="Unraveling Dark Matter's Mystery"
          showCloseButton
          style={{ maxWidth: '160px' }}
          content={
            <Text.Paragraph size={Size.small}>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text.Paragraph>
          }
        >
          <Button label="Left" />
        </Popover>
      </Flex>
    </Flex>
  ),
};

export default story;
