import { Meta, StoryObj } from '@storybook/react';
import { Flex, List, Scrollable, Text, TextHeadingRoles } from 'components';
import { Direction, Gap, Size } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { COUNTRIES } from './Scrollable.constants.ts';
import { fn } from '@storybook/test';

const story: Meta<typeof Scrollable> = {
  title: 'Components/Container/Scrollable',
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
    <Flex gap={Gap.xlarge}>
      <Text.Heading role={TextHeadingRoles.inner}>
        Vertical Scrollable with long content
      </Text.Heading>
      <Scrollable
        maxHeight="200px"
        offset={{ top: 12, bottom: 12, left: 8, right: 8 }}
        data-testid="scrollable-1"
        {...args}
      >
        <List
          gap={Gap.medium}
          data={COUNTRIES}
          renderItem={({ item, currentIndex }) => {
            return (
              <Flex
                key={currentIndex}
                direction={Direction.horizontal}
                gap={Gap.medium}
              >
                <div>{item.flag}</div>
                <div>
                  <Text.Inline bold>{item.country}</Text.Inline>, {item.capital}
                </div>
              </Flex>
            );
          }}
        />
      </Scrollable>
      <Text.Heading role={TextHeadingRoles.inner}>
        Horizontal Scrollable with long content
      </Text.Heading>
      <Scrollable
        maxWidth="100%"
        direction={Direction.horizontal}
        offset={{ top: 12, bottom: 12, left: 8, right: 8 }}
        data-testid="scrollable-2"
        {...args}
      >
        <List
          gap={Gap.large}
          direction={Direction.horizontal}
          data={COUNTRIES}
          wrap={false}
          renderItem={({ item, currentIndex }) => {
            return (
              <Flex
                key={currentIndex}
                direction={Direction.vertical}
                gap={Gap.xsmall}
                style={{ width: '200px', minWidth: '200px' }}
              >
                <div style={{ fontSize: 48 }}>{item.flag}</div>
                <Text.Heading role={TextHeadingRoles.subheading}>
                  {item.country}
                </Text.Heading>
                <Text.Paragraph size={Size.small}>
                  {item.capital}
                </Text.Paragraph>
              </Flex>
            );
          }}
        />
      </Scrollable>
      <Text.Heading role={TextHeadingRoles.inner}>
        Vertical Scrollable with short content
      </Text.Heading>
      <Scrollable
        maxHeight="200px"
        offset={{ top: 12, bottom: 12, left: 8, right: 8 }}
        data-testid="scrollable-3"
        {...args}
      >
        <List
          gap={Gap.medium}
          data={COUNTRIES.slice(0, 3)}
          renderItem={({ item, currentIndex }) => {
            return (
              <Flex
                key={currentIndex}
                direction={Direction.horizontal}
                gap={Gap.medium}
              >
                <div>{item.flag}</div>
                <div>
                  <Text.Inline bold>{item.country}</Text.Inline>, {item.capital}
                </div>
              </Flex>
            );
          }}
        />
      </Scrollable>
      <Text.Heading role={TextHeadingRoles.inner}>
        Horizontal Scrollable with short content
      </Text.Heading>
      <Scrollable
        maxWidth="100%"
        direction={Direction.horizontal}
        offset={{ top: 12, bottom: 12, left: 8, right: 8 }}
        data-testid="scrollable-4"
        {...args}
      >
        <List
          gap={Gap.large}
          direction={Direction.horizontal}
          data={COUNTRIES.slice(0, 3)}
          wrap={false}
          renderItem={({ item, currentIndex }) => {
            return (
              <Flex
                key={currentIndex}
                direction={Direction.vertical}
                gap={Gap.xsmall}
                style={{ width: '200px', minWidth: '200px' }}
              >
                <div style={{ fontSize: 48 }}>{item.flag}</div>
                <Text.Heading role={TextHeadingRoles.subheading}>
                  {item.country}
                </Text.Heading>
                <Text.Paragraph size={Size.small}>
                  {item.capital}
                </Text.Paragraph>
              </Flex>
            );
          }}
        />
      </Scrollable>
    </Flex>
  ),
};

export default story;
