import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Popover } from './Popover.tsx';
import { getAllPlacements } from './utils/placementUtils';
// import { expect, userEvent, within } from '@storybook/test';

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
    <Flex direction="vertical" gap="l">
      <Text size={5} weight="bold" block>
        Basic Popovers
      </Text>
      <Flex direction="horizontal" gap="l">
        <Popover
          placement="bottom"
          title="System update"
          showCloseButton
          data-testid="popover-click"
          content={
            <Flex direction="vertical" gap="m">
              <Text size={3} block>
                We're gearing up for a system update packed with improvements
              </Text>
              <Flex justify="center" direction="horizontal" gap="s">
                <Button variant="action" label="Reschedule update" />
                <Button variant="submit" label="Update now" />
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
            <Flex direction="vertical" gap="m">
              <Text size={3} block>
                We're gearing up for a system update packed with improvements
              </Text>
              <Flex justify="end" direction="horizontal" gap="s">
                <Button label="Reschedule update" />
                <Button label="Update now" />
              </Flex>
            </Flex>
          }
        >
          <Button label="Show more details" icon={<Icon i="lightbulb" />} />
        </Popover>
        <Popover
          style={{ maxWidth: '150px' }}
          content={
            <Text size={3} block>
              <Text weight="bold">Resilience</Text> - Bouncing back from
              adversity with strength and adaptability.
            </Text>
          }
        >
          <Button label="Resilience" />
        </Popover>
        <Popover
          style={{ maxWidth: '200px' }}
          data-testid="popover-parent"
          content={
            <Text size={3} block>
              Click here to open child popover{' '}
              <Popover
                showArrow
                data-testid="popover-child"
                content={
                  <Text size={3} block>
                    This is child popover!
                  </Text>
                }
              >
                <Button label="Open" data-testid="button-child" />
              </Popover>
            </Text>
          }
        >
          <Button label="Parent popover" data-testid="button-parent" />
        </Popover>
      </Flex>
      <Text size={5} weight="bold" block>
        How to trigger the popover?
      </Text>
      <Flex direction="horizontal" gap="l">
        <Popover
          trigger="click"
          placement="top"
          showArrow={true}
          content={
            <Text size={3} block>
              Join Our Newsletter for Exciting Updates &{' '}
              <Text href="#">Special Deals</Text>!
            </Text>
          }
        >
          <Button label="Click me" />
        </Popover>
        <Popover
          trigger="hover"
          placement="top"
          showArrow={true}
          data-testid="popover-hover"
          content={() => (
            <Text size={3} block>
              Join Our Newsletter for Exciting Updates &{' '}
              <Text href="#">Special Deals</Text>!
            </Text>
          )}
        >
          <Button label="Hover me" data-testid="button-hover" />
        </Popover>
        <Popover
          trigger="focus"
          placement="top"
          showArrow={true}
          data-testid="popover-focus"
          content={
            <Text size={3} block>
              Join Our Newsletter for Exciting Updates &{' '}
              <Text href="#">Special Deals</Text>!
            </Text>
          }
        >
          <Button label="Focus me" data-testid="button-focus" />
        </Popover>
      </Flex>
      <Flex direction="horizontal" gap="l"></Flex>
      <Text size={5} weight="bold" block>
        Different placement of popover
      </Text>
      <Flex direction="horizontal" gap="l">
        <Popover
          placement="top"
          title="Unraveling Dark Matter's Mystery"
          showCloseButton
          showArrow
          style={{ maxWidth: '250px' }}
          content={
            <Text size={3} block>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text>
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
            <Text size={3} block>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text>
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
            <Text size={3} block>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text>
          }
        >
          <Button label="Bottom" />
        </Popover>
        <Popover
          placement="left"
          title="Unraveling Dark Matter's Mystery"
          showCloseButton
          showArrow
          style={{ maxWidth: '250px' }}
          content={
            <Text size={3} block>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text>
          }
        >
          <Button label="Left" />
        </Popover>
      </Flex>
      <Text size={5} weight="bold" block>
        Disabled popovers
      </Text>
      <Flex direction="horizontal" gap="l">
        <Popover
          placement="top"
          title="Unraveling Dark Matter's Mystery"
          enabled={false}
          showCloseButton
          data-testid="popover-disabled"
          showArrow
          style={{ maxWidth: '250px' }}
          content={
            <Text size={3} block>
              Dark matter, comprising 27% of the universe, defies detection
              despite its gravitational influence on celestial bodies. Theories
              abound regarding its composition, yet conclusive evidence remains
              elusive. Astronomers employ advanced technologies in a relentless
              pursuit to shed light on this cosmic enigma.
            </Text>
          }
        >
          <Button label="No popover here" data-testid="button-disabled" />
        </Popover>
      </Flex>
    </Flex>
  ),
};

export const OverlapPopoverStory: StoryObj<typeof Flex> = {
  name: 'Overlap Popover',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={5} weight="bold" block>
        Overlap Popovers
      </Text>
      <Text size={3} block>
        Popovers with overlap=true completely cover the children element at the
        same coordinates
      </Text>
      <Flex direction="horizontal" gap="l">
        <Popover
          overlap
          title="Overlap Popover"
          showCloseButton
          content={
            <Flex direction="vertical" gap="m">
              <Text size={3} block>
                This popover overlaps with the button at its starting position
              </Text>
              <Button label="Action" />
            </Flex>
          }
        >
          <Button label="Overlap Popover" />
        </Popover>
        <Popover
          overlap
          placement="bottom"
          title="Bottom Overlap"
          showCloseButton
          content={
            <Flex direction="vertical" gap="m">
              <Text size={3} block>
                This popover appears below the button with overlap
              </Text>
            </Flex>
          }
        >
          <Button label="Bottom Overlap" />
        </Popover>
      </Flex>
    </Flex>
  ),
};

export const AllPlacementsStory: StoryObj<typeof Flex> = {
  name: 'All Placements',
  render: () => {
    const placements = getAllPlacements();

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          All Placement Options
        </Text>
        <Text size={3} block>
          Demonstration of all available placement options for popovers
        </Text>

        <Flex
          direction="vertical"
          gap="l"
          style={{ paddingTop: '200px', paddingBottom: '200px' }}
        >
          {placements.map((placement) => (
            <Flex
              key={placement.value}
              direction="horizontal"
              gap="m"
              align="center"
            >
              <Text size={3} block style={{ minWidth: '400px' }}>
                {placement.label}:
              </Text>
              <Popover
                placement={placement.value}
                title={`${placement.label} Popover`}
                showCloseButton
                content={
                  <Flex direction="vertical" gap="m">
                    <Text size={3} block>
                      This is a {placement.label.toLowerCase()} popover
                    </Text>
                    <Button label="Action" />
                  </Flex>
                }
              >
                <Button label={`${placement.label} Popover`} />
              </Popover>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  },
};

export const OverlapPlacementsStory: StoryObj<typeof Flex> = {
  name: 'Overlap Placements',
  render: () => {
    const placements = getAllPlacements();

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Overlap Placements
        </Text>
        <Text size={3} block>
          All placement options in overlap mode - popovers are positioned
          relative to their trigger elements:
          <br />• <strong>top/bottom/left/right</strong> - centered
          <br />• <strong>*-start</strong> - aligned to start edge
          <br />• <strong>*-end</strong> - aligned to end edge
        </Text>

        <Flex
          direction="vertical"
          gap="l"
          style={{ paddingTop: '200px', paddingBottom: '200px' }}
        >
          {placements.map((placement) => (
            <Flex
              key={placement.value}
              direction="horizontal"
              gap="m"
              align="center"
            >
              <Text size={3} block style={{ minWidth: '120px' }}>
                {placement.label}:
              </Text>
              <Popover
                overlap
                placement={placement.value}
                title={`${placement.label} Overlap`}
                showCloseButton
                content={
                  <Flex direction="vertical" gap="m">
                    <Text size={3} block>
                      {placement.value.includes('start')
                        ? 'Aligned to start edge'
                        : placement.value.includes('end')
                        ? 'Aligned to end edge'
                        : 'Centered'}{' '}
                      - {placement.label.toLowerCase()} popover
                    </Text>
                    <Button label="Action" />
                  </Flex>
                }
              >
                <Button label={`${placement.label} Overlap`} />
              </Popover>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  },
};

export const PlacementInfoStory: StoryObj<typeof Flex> = {
  name: 'Placement Info',
  render: () => {
    const [placementInfo, setPlacementInfo] = React.useState<string>('');
    const popoverRef = React.useRef<any>(null);

    const handleOpenChange = (opened: boolean) => {
      if (opened && popoverRef.current) {
        const { actualPlacement, transformOrigin } = popoverRef.current;
        setPlacementInfo(
          `Placement: ${actualPlacement}, Transform Origin: ${transformOrigin}`
        );
      }
    };

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Placement Information
        </Text>
        <Text size={3} block>
          This example shows how to get the actual placement and transform
          origin from the popover ref when using auto placement.
        </Text>

        {placementInfo && (
          <Text
            size={3}
            block
            style={{
              padding: '8px',
              backgroundColor: 'var(--default-100)',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}
          >
            {placementInfo}
          </Text>
        )}

        <Popover
          ref={popoverRef}
          placement="auto"
          title="Auto Placement"
          showCloseButton
          onOpenChange={handleOpenChange}
          content={
            <Flex direction="vertical" gap="m">
              <Text size={3} block>
                This popover uses auto placement. Check the info above to see
                the actual placement and transform origin.
              </Text>
              <Button label="Action" />
            </Flex>
          }
        >
          <Button label="Auto Placement Popover" />
        </Popover>
      </Flex>
    );
  },
};

export default story;
