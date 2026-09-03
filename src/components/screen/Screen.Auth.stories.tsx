import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Form, Screen, Text, TextInput } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta<typeof Screen.Auth> = {
  title: 'Components/Core/Screen/Auth',
  component: Screen.Auth,
  decorators: [StorybookDecorator],
};

export default story;

export const Overview: StoryObj<typeof Screen.Auth> = {
  name: 'Using Auth',
  render: () => (
    <Screen.Auth>
      <Flex direction="vertical" gap="l" align="center">
        <Text block size={8} weight="bold">
          Sign in
        </Text>
        <Form style={{ width: '100%' }}>
          <Flex direction="vertical" gap="m">
            <Form.Field label="Email">
              <TextInput placeholder="you@example.com" />
            </Form.Field>
            <Form.Field label="Password">
              <TextInput type="password" placeholder="••••••••" />
            </Form.Field>
            <Button label="Sign in" variant="submit" />
          </Flex>
        </Form>
      </Flex>
    </Screen.Auth>
  ),
};
