import { Meta, StoryObj } from '@storybook/react';
import { Flex, List, Scrollable, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { COUNTRIES } from './Scrollable.constants.ts';
import { fn } from '@storybook/test';

const story: Meta<typeof Scrollable> = {
  title: 'Components/Containers/Scrollable',
  component: Scrollable,
  decorators: [StorybookDecorator],
  args: {
    showShadows: true,
    onScroll: fn(),
  },
  argTypes: {
    showShadows: { control: 'boolean' },
    direction: { control: 'none' },
    offset: { control: 'number' },
  },
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const ScrollableStory: StoryObj<typeof Scrollable> = {
  name: 'Using Scrollable',
  render: (args) => (
    <Flex direction="vertical" gap="xl">
      <Text.Heading role="inner">
        Vertical Scrollable with long content
      </Text.Heading>
      <Scrollable
        maxHeight="200px"
        offset={{ top: 12, bottom: 12, left: 8, right: 8 }}
        data-testid="scrollable-1"
        {...args}
      >
        <List
          gap="m"
          data={COUNTRIES}
          renderItem={({ item, currentIndex }) => {
            return (
              <Flex key={currentIndex} direction="horizontal" gap="m">
                <div>{item.flag}</div>
                <div>
                  <Text.Inline bold>{item.country}</Text.Inline>, {item.capital}
                </div>
              </Flex>
            );
          }}
        />
      </Scrollable>
      <Text.Heading role="inner">
        Horizontal Scrollable with long content
      </Text.Heading>
      <Scrollable
        maxWidth="100%"
        direction="horizontal"
        offset={{ top: 12, bottom: 12, left: 8, right: 8 }}
        data-testid="scrollable-2"
        {...args}
      >
        <List
          gap="l"
          direction="horizontal"
          data={COUNTRIES}
          wrap={false}
          renderItem={({ item, currentIndex }) => {
            return (
              <Flex
                key={currentIndex}
                direction="vertical"
                gap="xs"
                style={{ width: '200px', minWidth: '200px' }}
              >
                <div style={{ fontSize: 48 }}>{item.flag}</div>
                <Text.Heading role="subheading">{item.country}</Text.Heading>
                <Text.Paragraph size="s">{item.capital}</Text.Paragraph>
              </Flex>
            );
          }}
        />
      </Scrollable>
      <Text.Heading role="inner">
        Vertical Scrollable with short content
      </Text.Heading>
      <Scrollable
        maxHeight="200px"
        offset={{ top: 12, bottom: 12, left: 8, right: 8 }}
        data-testid="scrollable-3"
        {...args}
      >
        <List
          gap="m"
          data={COUNTRIES.slice(0, 3)}
          renderItem={({ item, currentIndex }) => {
            return (
              <Flex key={currentIndex} direction="horizontal" gap="m">
                <div>{item.flag}</div>
                <div>
                  <Text.Inline bold>{item.country}</Text.Inline>, {item.capital}
                </div>
              </Flex>
            );
          }}
        />
      </Scrollable>
      <Text.Heading role="inner">
        Horizontal Scrollable with short content
      </Text.Heading>
      <Scrollable
        maxWidth="100%"
        direction="horizontal"
        offset={{ top: 12, bottom: 12, left: 8, right: 8 }}
        data-testid="scrollable-4"
        {...args}
      >
        <List
          gap="l"
          direction="horizontal"
          data={COUNTRIES.slice(0, 3)}
          wrap={false}
          renderItem={({ item, currentIndex }) => {
            return (
              <Flex
                key={currentIndex}
                direction="vertical"
                gap="xs"
                style={{ width: '200px', minWidth: '200px' }}
              >
                <div style={{ fontSize: 48 }}>{item.flag}</div>
                <Text.Heading role="subheading">{item.country}</Text.Heading>
                <Text.Paragraph size="s">{item.capital}</Text.Paragraph>
              </Flex>
            );
          }}
        />
      </Scrollable>
    </Flex>
  ),
};

export default story;
