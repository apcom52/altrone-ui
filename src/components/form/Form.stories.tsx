import { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { useState } from 'react';
import { Direction, Gap, Role, Size } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { TextInput } from '../textInput';
import { PasswordInput } from '../passwordInput';
import { Button } from '../button';
import { NumberInput } from '../numberInput';
import { Textarea } from '../textarea';
import { Select } from '../select';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { DatePicker } from '../datePicker';

const story: Meta<typeof Form> = {
  title: 'Components/Form/Form',
  component: Form,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using Forms',
  render: () => {
    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Authorization Form
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Form>
            <Form.Field
              name="username"
              label="Username"
              required
              hintText="This username has to be unique"
            >
              <TextInput placeholder="Username" />
            </Form.Field>
            <Form.Field
              name="password"
              label="Password"
              required
              description="Has to be more than 6 characters and contains special symbols"
            >
              <PasswordInput placeholder="Password" />
            </Form.Field>
            <Form.Field description="Field without label">
              <TextInput placeholder="Type something" />
            </Form.Field>
            <Text.Heading role={TextHeadingRoles.inner}>TextInput</Text.Heading>
            <Flex direction={Direction.horizontal} gap={Gap.large}>
              <Form.Field label="Disabled" disabled>
                <TextInput placeholder="Type something" />
              </Form.Field>
              <Form.Field
                label="With error message"
                errorMessage="There is an error here"
              >
                <TextInput placeholder="Type something" />
              </Form.Field>
            </Flex>
            <Text.Heading role={TextHeadingRoles.inner}>
              NumberInput
            </Text.Heading>
            <Flex direction={Direction.horizontal} gap={Gap.large}>
              <Form.Field label="Disabled" disabled>
                <NumberInput placeholder="Type something" />
              </Form.Field>
              <Form.Field
                label="With error message"
                errorMessage="There is an error here"
              >
                <NumberInput placeholder="Type something" />
              </Form.Field>
            </Flex>
            <Text.Heading role={TextHeadingRoles.inner}>Textarea</Text.Heading>
            <Flex direction={Direction.horizontal} gap={Gap.large}>
              <Form.Field label="Disabled" disabled>
                <Textarea placeholder="Type something" />
              </Form.Field>
              <Form.Field
                label="With error message"
                errorMessage="There is an error here"
              >
                <Textarea placeholder="Type something" />
              </Form.Field>
            </Flex>
            <Text.Heading role={TextHeadingRoles.inner}>Select</Text.Heading>
            <Flex direction={Direction.horizontal} gap={Gap.large}>
              <Form.Field label="Disabled" disabled>
                <Select
                  options={COUNTRIES}
                  value={'russia'}
                  onChange={() => null}
                />
              </Form.Field>
              <Form.Field
                label="With error message"
                errorMessage="There is an error here"
              >
                <Select
                  options={COUNTRIES}
                  value={'russia'}
                  onChange={() => null}
                />
              </Form.Field>
            </Flex>
            <Text.Heading role={TextHeadingRoles.inner}>
              DatePicker
            </Text.Heading>
            <Flex direction={Direction.horizontal} gap={Gap.large}>
              <Form.Field label="Disabled" disabled>
                <DatePicker />
              </Form.Field>
              <Form.Field
                label="With error message"
                errorMessage="There is an error here"
              >
                <DatePicker />
              </Form.Field>
            </Flex>
            <Button role={Role.primary} label="Submit" />
          </Form>
        </Flex>
      </Flex>
    );
  },
};

export const ComplexFormStory: StoryObj<typeof Flex> = {
  name: 'Complex Form',
  render: () => {
    const [formState1, setFormState1] = useState({
      username: 'apcom',
      password: '',
    });

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Authorization Form
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Form
            initialState={formState1}
            validation={{
              username: (value) =>
                String(value).length > 6
                  ? 'Username cannot be more than 6 chars'
                  : true,
              password: (value) =>
                !String(value) ? 'Password cannot be empty' : true,
            }}
          >
            <Form.Field
              name="username"
              label="Username"
              required
              hintText="This username has to be unique"
            >
              <TextInput placeholder="Username" />
            </Form.Field>
            <Form.Field name="password" label="Password" required>
              <PasswordInput placeholder="Password" />
            </Form.Field>
            <Button role={Role.primary} label="Submit" />
          </Form>
        </Flex>
      </Flex>
    );
  },
};

export default story;
