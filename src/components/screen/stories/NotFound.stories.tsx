import type { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Result, Screen } from 'components';
import { screenMeta } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Not found',
};

export default meta;

/**
 * Error / empty screens are just the `Result` component dropped into a
 * centered `Screen` — no dedicated preset.
 */
export const NotFound: StoryObj<typeof Screen> = {
  name: 'Not found',
  render: () => (
    <Screen title="Page not found" contentAlign="center">
      <Screen.Content>
        <Result
          status="error"
          title="Page not found"
          description="The page you were looking for doesn't exist or was moved."
          actions={
            <Flex gap="s">
              <Button label="Go home" variant="submit" />
              <Button label="Contact support" />
            </Flex>
          }
        />
      </Screen.Content>
    </Screen>
  ),
};
