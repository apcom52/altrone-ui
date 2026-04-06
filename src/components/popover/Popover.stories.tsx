import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar, Button, Flex, Progress, Radio, Tags, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Popover } from './Popover.tsx';
import { PopoverRef } from './Popover.types.ts';
import { getAllPlacements } from './utils/placementUtils';
import { ChevronDown, ChevronUp, Lightbulb, Logs, Rocket } from 'lucide-react';
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
                <Button variant="default" label="Reschedule update" />
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
          <Button label="Show more details" icon={<Lightbulb />} />
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
          `Placement: ${actualPlacement}, Transform Origin: ${transformOrigin}`,
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

const CREW = [
  {
    first: 'Alex',
    last: 'Chen',
    role: 'Commander',
    readiness: 87,
    tags: ['Navigation', 'EVA'],
  },
  {
    first: 'Maria',
    last: 'Santos',
    role: 'Engineer',
    readiness: 62,
    tags: ['Systems', 'Propulsion'],
  },
  {
    first: 'Yuki',
    last: 'Tanaka',
    role: 'Science Officer',
    readiness: 94,
    tags: ['Biology', 'Research'],
  },
];

const INITIAL_LOGS = [
  { id: 1, text: 'Engine burn completed — Δv +312 m/s' },
  { id: 2, text: 'Navigation beacon signal degraded' },
  { id: 3, text: 'Life support pressure nominal' },
];

export const MissionControlStory: StoryObj<typeof Flex> = {
  name: 'Mission Control (feature showcase)',
  render: () => {
    const launchRef = React.useRef<PopoverRef>(null);
    const [missionPhase, setMissionPhase] = React.useState('cruise');
    const [logs, setLogs] = React.useState(INITIAL_LOGS);

    return (
      <Flex direction="vertical" gap="xl" style={{ padding: 24 }}>
        {/* ── 1. Hover trigger: crew cards ── */}
        <Flex direction="vertical" gap="s">
          <Text size={5} weight="bold" block>
            Crew manifest
          </Text>
          <Text size={3} block>
            Hover over an avatar to see the crew member's profile.
          </Text>
          <Flex direction="horizontal" gap="m" style={{ marginTop: 8 }}>
            {CREW.map((member) => (
              <Popover
                key={member.first}
                trigger="hover"
                placement="bottom"
                style={{ width: 250 }}
                content={
                  <Flex direction="vertical" gap="m">
                    <Flex direction="horizontal" gap="m" align="center">
                      <Avatar
                        firstName={member.first}
                        lastName={member.last}
                        size="l"
                      />
                      <Flex direction="vertical" gap="xs">
                        <Text size={3} weight="bold">
                          {member.first} {member.last}
                        </Text>
                        <Text size={2}>{member.role}</Text>
                      </Flex>
                    </Flex>
                    <Progress value={member.readiness} max={100}>
                      <>Mission readiness: {String(member.readiness)}%</>
                    </Progress>
                    <Tags>
                      {member.tags.map((tag) => (
                        <Tags.Item key={tag} label={tag} />
                      ))}
                    </Tags>
                  </Flex>
                }
              >
                <Avatar firstName={member.first} lastName={member.last} />
              </Popover>
            ))}
          </Flex>
        </Flex>

        {/* ── 2. children render function: trigger reacts to open state ── */}
        <Flex direction="vertical" gap="s" align="start">
          <Text size={5} weight="bold" block>
            Mission phase
          </Text>
          <Text size={3} block>
            The trigger is a <Text weight="bold">render function</Text> — the
            button label and icon update based on whether the popover is open.
          </Text>
          <Popover
            placement="bottom-start"
            title="Select mission phase"
            showCloseButton
            style={{ width: 240 }}
            content={({ closePopup }) => (
              <Flex direction="vertical" gap="m">
                <Radio
                  value={missionPhase}
                  onChange={(v) => setMissionPhase(v)}
                  direction="vertical"
                >
                  <Radio.Item value="launch">Launch</Radio.Item>
                  <Radio.Item value="cruise">Cruise</Radio.Item>
                  <Radio.Item value="approach">Approach</Radio.Item>
                  <Radio.Item value="landing">Landing</Radio.Item>
                </Radio>
                <Button label="Apply" variant="submit" onClick={closePopup} />
              </Flex>
            )}
          >
            {({ opened }) => (
              <Button
                label={opened ? 'Close' : `Phase: ${missionPhase}`}
                icon={opened ? <ChevronUp /> : <ChevronDown />}
              />
            )}
          </Popover>
        </Flex>

        {/* ── 3. Nested popovers + cascade close ── */}
        <Flex direction="vertical" gap="s" align="start">
          <Text size={5} weight="bold" block>
            Mission logs
          </Text>
          <Text size={3} block>
            Opens a nested confirmation popover. Clicking{' '}
            <Text weight="bold">Archive</Text> calls{' '}
            <Text code>closeAllSequence</Text> — closes the entire chain at
            once.
          </Text>
          <Popover
            placement="bottom-start"
            title="Mission logs"
            showCloseButton
            style={{ width: 320 }}
            content={() => (
              <Flex direction="vertical" gap="m">
                {logs.length === 0 ? (
                  <Text size={3} block>
                    No logs remaining.
                  </Text>
                ) : (
                  logs.map((log) => (
                    <Text key={log.id} size={3} block>
                      — {log.text}
                    </Text>
                  ))
                )}
                {logs.length > 0 && (
                  <Popover
                    placement="right"
                    title="Confirm archive"
                    style={{ width: 240 }}
                    content={({ closeAllSequence }) => (
                      <Flex direction="vertical" gap="m">
                        <Text size={3} block>
                          Archive all {logs.length} entries? This cannot be
                          undone.
                        </Text>
                        <Flex direction="horizontal" gap="s">
                          <Button label="Cancel" onClick={closeAllSequence} />
                          <Button
                            label="Archive"
                            variant="submit"
                            onClick={() => {
                              setLogs([]);
                              closeAllSequence();
                            }}
                          />
                        </Flex>
                      </Flex>
                    )}
                  >
                    <Button label="Archive all…" />
                  </Popover>
                )}
              </Flex>
            )}
          >
            <Button label={`Logs (${logs.length})`} icon={<Logs />} />
          </Popover>
        </Flex>

        {/* ── 4. Imperative API via ref ── */}
        <Flex direction="vertical" gap="s" align="start">
          <Text size={5} weight="bold" block>
            Launch sequence
          </Text>
          <Text size={3} block>
            External buttons control the popover via{' '}
            <Text code>ref.openPopup()</Text> /{' '}
            <Text code>ref.closePopup()</Text> without touching the trigger.
          </Text>
          <Flex direction="horizontal" gap="m" align="center">
            <Button
              label="Open externally"
              onClick={() => launchRef.current?.openPopup()}
            />
            <Button
              label="Close externally"
              onClick={() => launchRef.current?.closePopup()}
            />
            <Popover
              ref={launchRef}
              placement="right"
              title="T-10 seconds"
              showCloseButton
              content={
                <Text size={3} block>
                  All systems nominal. Launch is confirmed. Good luck, crew.
                </Text>
              }
            >
              <Button
                label="Launch Control"
                variant="submit"
                icon={<Rocket />}
              />
            </Popover>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export default story;
