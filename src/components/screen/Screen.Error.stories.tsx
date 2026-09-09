import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Result, Screen, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta<typeof Screen.Error> = {
  title: 'Components/Core/Screen/Error',
  component: Screen.Error,
  decorators: [StorybookDecorator],
};

export default story;

export const Overview: StoryObj<typeof Screen.Error> = {
  name: 'Using Error',
  render: () => (
    <Screen.Error>
      <Flex direction="vertical" gap="m" align="center">
        <Result status="error">Something went wrong</Result>
        <Text block size={4} color="muted">
          The page you&rsquo;re looking for couldn&rsquo;t be loaded.
        </Text>
        <Button label="Try again" onClick={() => {}} />
      </Flex>
    </Screen.Error>
  ),
};
