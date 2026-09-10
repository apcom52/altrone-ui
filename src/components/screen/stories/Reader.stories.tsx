import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Screen, Text, Toolbar } from 'components';
import { screenMeta } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Reader',
};

export default meta;

/**
 * No sidebar, a minimal header, and `size="m"` to hold the text column to a
 * comfortable measure. `Screen.Content` centres itself inside the grid.
 */
export const Reader: StoryObj<typeof Screen> = {
  name: 'Reader',
  render: () => (
    <Screen title="The Timeless Way of Building" size="m">
      <Screen.Header>
        <Toolbar variant="solid" size="m">
          <Toolbar.Logo>
            <img
              src="https://help.apple.com/assets/67DB47E269E8D943E20D7C8C/67DB47E569E8D943E20D7C92/en_US/efdd967a11ce8c7e441948d3f26510ce.png"
              width={32}
              height={32}
            />
          </Toolbar.Logo>
          <Toolbar.Title label="Essays" />
          <Toolbar.Separator />
          <Toolbar.Action label="Subscribe" />
        </Toolbar>
      </Screen.Header>
      <Screen.Content>
        <Flex direction="vertical" gap="m">
          <Text size={8} weight="bold" block>
            The Timeless Way of Building
          </Text>
          <Text size={3} color="muted" block>
            12 min read · Christopher Alexander
          </Text>
          {[...Array(6)].map((_, i) => (
            <Text key={i} size={4} block>
              There is one timeless way of building. It is thousands of years
              old, and the same today as it has always been. The great
              traditional buildings of the past, the villages and tents and
              temples in which man feels at home, have always been made by
              people who were very close to the center of this way.
            </Text>
          ))}
        </Flex>
      </Screen.Content>
    </Screen>
  ),
};
