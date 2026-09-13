import type { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Form, Screen, Text, TextInput } from 'components';
import { screenMeta } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Sign in',
};

export default meta;

/**
 * A single-task page with no app chrome: `contentAlign="center"` boxes the
 * content dead centre, `size="s"` keeps the column narrow. The heading lives
 * in the content, not a prop.
 */
export const SignIn: StoryObj<typeof Screen> = {
  name: 'Sign in',
  render: () => (
    <Screen title="Sign in" contentAlign="center" size="s">
      <Screen.Content>
        <Flex
          direction="vertical"
          gap="l"
          style={{
            width: '100%',
            maxWidth: 360,
            padding: 24,
            borderRadius: 'var(--radius-xl)',
            background: 'var(--background-1)',
            boxShadow: 'var(--elevation-modal-shadow)',
          }}
        >
          <Text size={7} weight="bold" block>
            Welcome back
          </Text>
          <Form>
            <Flex direction="vertical" gap="m">
              <Form.Field label="Email" required>
                <TextInput type="email" placeholder="you@example.com" />
              </Form.Field>
              <Form.Field label="Password" required>
                <TextInput type="password" />
              </Form.Field>
              <Button label="Sign in" variant="submit" />
            </Flex>
          </Form>
        </Flex>
      </Screen.Content>
    </Screen>
  ),
};
