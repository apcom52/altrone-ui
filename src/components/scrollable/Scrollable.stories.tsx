import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Scrollable } from './Scrollable.tsx';
import { COUNTRIES } from './Scrollable.constants.ts';

const story: Meta<typeof Scrollable> = {
  title: 'Components/Containers/Scrollable',
  component: Scrollable,
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

export const ScrollableStory: StoryObj<typeof Scrollable> = {
  name: 'Using Scrollable',
  render: () => (
    <Flex direction="vertical" gap="xl">
      <Text block size={5} weight="bold">
        Overflow content
      </Text>
      <div style={{ height: '240px' }}>
        <Scrollable>
          <Flex direction="vertical" gap="m" style={{ padding: '8px 12px' }}>
            {COUNTRIES.map((item) => (
              <Flex key={item.country} direction="horizontal" gap="m" align="center">
                <span style={{ fontSize: 24 }}>{item.flag}</span>
                <Text>
                  <Text weight="bold">{item.country}</Text>
                  {' — '}
                  {item.capital}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Scrollable>
      </div>

      <Text block size={5} weight="bold">
        Content that fits — no scroll
      </Text>
      <div style={{ height: '240px' }}>
        <Scrollable>
          <Flex direction="vertical" gap="m" style={{ padding: '8px 12px' }}>
            {COUNTRIES.slice(0, 3).map((item) => (
              <Flex key={item.country} direction="horizontal" gap="m" align="center">
                <span style={{ fontSize: 24 }}>{item.flag}</span>
                <Text>
                  <Text weight="bold">{item.country}</Text>
                  {' — '}
                  {item.capital}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Scrollable>
      </div>

      <Text block size={5} weight="bold">
        Inside a panel
      </Text>
      <Flex direction="horizontal" gap="l" style={{ height: '300px' }}>
        <div
          style={{
            width: '260px',
            height: '100%',
            border: '1px solid var(--border-1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Scrollable>
            <Flex direction="vertical" gap="m" style={{ padding: '12px' }}>
              {COUNTRIES.map((item) => (
                <Flex key={item.country} direction="horizontal" gap="m" align="center">
                  <span style={{ fontSize: 20 }}>{item.flag}</span>
                  <Text size={4}>{item.country}</Text>
                </Flex>
              ))}
            </Flex>
          </Scrollable>
        </div>
        <Flex direction="vertical" gap="s">
          <Text block weight="bold">Select a country from the list</Text>
          <Text block color="muted" size={3}>
            Scroll through the list on the left to find a country.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  ),
};

export default story;
