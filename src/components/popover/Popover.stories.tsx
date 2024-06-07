import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text, TextHeadingRoles } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Popover } from './Popover.tsx';
import { expect, userEvent, within } from '@storybook/test';
import { timeout } from '../../../old_src/utils';

const story: Meta<typeof Popover> = {
  title: 'Components/Containers/Popover',
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
    <Flex direction="vertical" gap="large">
      <Text.Heading role={TextHeadingRoles.inner}>Basic Popovers</Text.Heading>
      <Flex direction="horizontal" gap="large">
        <Popover
          placement="bottom"
          title="System update"
          showCloseButton
          data-testid="popover-click"
          content={
            <Flex gap="medium">
              <Text.Paragraph size="small">
                We're gearing up for a system update packed with improvements
              </Text.Paragraph>
              <Flex justify="end" direction="horizontal" gap="small">
                <Button label="Reschedule update" />
                <Button label="Update now" />
              </Flex>
            </Flex>
          }
        >
          <Button label="Open popover" data-testid="button-click" />
        </Popover>
        <Popover
          placement="bottom"
          title="System update"
          showCloseButton
          showArrow
          content={
            <Flex gap="medium">
              <Text.Paragraph size="small">
                We're gearing up for a system update packed with improvements
              </Text.Paragraph>
              <Flex justify="end" direction="horizontal" gap="small">
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
        <Popover
          style={{ maxWidth: '200px' }}
          data-testid="popover-parent"
          content={
            <Text.Paragraph size="small">
              Click here to open child popover{' '}
              <Popover
                showArrow
                data-testid="popover-child"
                content={
                  <Text.Paragraph>This is child popover!</Text.Paragraph>
                }
              >
                <Button label="Open" data-testid="button-child" />
              </Popover>
            </Text.Paragraph>
          }
        >
          <Button label="Parent popover" data-testid="button-parent" />
        </Popover>
      </Flex>
      <Text.Heading role={TextHeadingRoles.inner}>
        How to trigger the popover?
      </Text.Heading>
      <Flex direction="horizontal" gap="large">
        <Popover
          trigger="click"
          placement="top"
          showArrow={true}
          content={
            <Text.Paragraph size="small">
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
          data-testid="popover-hover"
          content={
            <Text.Paragraph size="small">
              Join Our Newsletter for Exciting Updates &{' '}
              <Text.Link href="#">Special Deals</Text.Link>!
            </Text.Paragraph>
          }
        >
          <Button label="Hover me" data-testid="button-hover" />
        </Popover>
        <Popover
          trigger="focus"
          placement="top"
          showArrow={true}
          data-testid="popover-focus"
          content={
            <Text.Paragraph size="small">
              Join Our Newsletter for Exciting Updates &{' '}
              <Text.Link href="#">Special Deals</Text.Link>!
            </Text.Paragraph>
          }
        >
          <Button label="Focus me" data-testid="button-focus" />
        </Popover>
      </Flex>
      <Flex direction="horizontal" gap="large"></Flex>
      <Text.Heading role={TextHeadingRoles.inner}>
        Different placement of popover
      </Text.Heading>
      <Flex direction="horizontal" gap="large">
        <Popover
          placement="top"
          title="Unraveling Dark Matter's Mystery"
          showCloseButton
          showArrow
          style={{ maxWidth: '250px' }}
          content={
            <Text.Paragraph size="small">
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
            <Text.Paragraph size="small">
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
            <Text.Paragraph size="small">
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
            <Text.Paragraph size="small">
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
      <Text.Heading role={TextHeadingRoles.inner}>
        Disabled popovers
      </Text.Heading>
      <Flex direction="horizontal" gap="large">
        <Popover
          placement="top"
          title="Unraveling Dark Matter's Mystery"
          enabled={false}
          showCloseButton
          data-testid="popover-disabled"
          showArrow
          style={{ maxWidth: '250px' }}
          content={
            <Text.Paragraph size="small">
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text.Paragraph>
          }
        >
          <Button label="No popover here" data-testid="button-disabled" />
        </Popover>
      </Flex>
    </Flex>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Popover with click trigger', async () => {
      await userEvent.click(canvas.getByTestId('button-click'));
      await expect(
        await canvas.findByTestId('popover-click'),
      ).toBeInTheDocument();
      await userEvent.click(canvas.getByText('close'));
      await expect(
        await canvas.queryByTestId('popover-click'),
      ).not.toBeInTheDocument();
    });

    await step('Popover with hover trigger', async () => {
      await userEvent.hover(canvas.getByTestId('button-hover'));
      await expect(
        await canvas.findByTestId('popover-hover'),
      ).toBeInTheDocument();
      await userEvent.unhover(canvas.getByTestId('button-hover'));
      await timeout(600);
      await expect(
        await canvas.queryByTestId('popover-hover'),
      ).not.toBeInTheDocument();
    });

    await step('Popover with child popover', async () => {
      await userEvent.click(canvas.getByTestId('button-parent'));
      await expect(
        await canvas.findByTestId('popover-parent'),
      ).toBeInTheDocument();
      await userEvent.click(canvas.getByTestId('button-child'));
      await expect(
        await canvas.findByTestId('popover-parent'),
      ).toBeInTheDocument();
      await expect(
        await canvas.findByTestId('popover-child'),
      ).toBeInTheDocument();
      await userEvent.click(document.body);
      await expect(
        await canvas.queryByTestId('popover-parent'),
      ).not.toBeInTheDocument();
      await expect(
        await canvas.queryByTestId('popover-child'),
      ).not.toBeInTheDocument();
    });

    await step(
      'If popover is not enabled we has to prevent opening the popover',
      async () => {
        await userEvent.click(canvas.getByTestId('button-disabled'));
        await expect(
          await canvas.queryByTestId('popover-disabled'),
        ).not.toBeInTheDocument();
      },
    );
  },
};

export default story;
