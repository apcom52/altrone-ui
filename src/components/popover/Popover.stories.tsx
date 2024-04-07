import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text, TextHeadingRoles } from 'components';
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
        <Popover
          placement="bottom"
          title="System update"
          showCloseButton
          showArrow
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
          {({ opened }) => (
            <Button
              label="Show more details"
              leftIcon={<Icon i="lightbulb" />}
              rightIcon={<Icon i={opened ? 'expand_less' : 'expand_more'} />}
            />
          )}
        </Popover>
        <Popover
          style={{ maxWidth: '150px' }}
          content={
            <Text.Paragraph>
              <Text.Inline bold>Resilience</Text.Inline> - Bouncing back from
              adversity with strength and adaptability.
            </Text.Paragraph>
          }
        >
          <Button label="Resilience" />
        </Popover>
      </Flex>
      <Text.Heading role={TextHeadingRoles.inner}>
        How to trigger the popover?
      </Text.Heading>
      <Flex direction={Direction.horizontal} gap={Gap.large}>
        <Popover
          trigger="click"
          placement="top"
          showArrow={true}
          content={
            <Text.Paragraph size={Size.small}>
              Join Our Newsletter for Exciting Updates &{' '}
              <Text.Link href="#">Special Deals</Text.Link>!
            </Text.Paragraph>
          }
        >
          <Button label="Click me" />
        </Popover>
        <Popover
          trigger="hover"
          placement="top"
          showArrow={true}
          content={
            <Text.Paragraph size={Size.small}>
              Join Our Newsletter for Exciting Updates &{' '}
              <Text.Link href="#">Special Deals</Text.Link>!
            </Text.Paragraph>
          }
        >
          <Button label="Hover me" />
        </Popover>
        <Popover
          trigger="focus"
          placement="top"
          showArrow={true}
          content={
            <Text.Paragraph size={Size.small}>
              Join Our Newsletter for Exciting Updates &{' '}
              <Text.Link href="#">Special Deals</Text.Link>!
            </Text.Paragraph>
          }
        >
          <Button label="Focus me" />
        </Popover>
      </Flex>
      <Flex direction={Direction.horizontal} gap={Gap.large}></Flex>
      <Text.Heading role={TextHeadingRoles.inner}>
        Different placement of popover
      </Text.Heading>
      <Flex direction={Direction.horizontal} gap={Gap.large}>
        <Popover
          placement="top"
          title="Unraveling Dark Matter's Mystery"
          showCloseButton
          showArrow
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
          showArrow
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
          openedByDefault
          showArrow
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
          showArrow
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
