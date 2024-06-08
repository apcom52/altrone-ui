import { Meta, StoryObj } from '@storybook/react';
import { Form } from './index.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text, TextHeadingRoles } from '../text';
import { TextInput } from '../textInput';
import { PasswordInput } from '../passwordInput';
import { Button } from '../button';
import { NumberInput } from '../numberInput';
import { Textarea } from '../textarea';
import { Select } from '../select';
import { DatePicker } from '../datePicker';
import { SELECT_COUNTRIES } from '../select/Select.stories.tsx';
import dayjs from 'dayjs';

const story: Meta<typeof Form> = {
  title: 'Components/Containers/Form',
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
      <Flex gap="l">
        <Text.Heading role={TextHeadingRoles.inner}>
          Authorization Form
        </Text.Heading>
        <Flex direction="horizontal" gap="l">
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
            <Flex direction="horizontal" gap="l">
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
            <Flex direction="horizontal" gap="l">
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
            <Flex direction="horizontal" gap="l">
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
            <Flex direction="horizontal" gap="l">
              <Form.Field label="Disabled" disabled>
                <Select
                  options={SELECT_COUNTRIES}
                  value={'russia'}
                  onChange={() => null}
                />
              </Form.Field>
              <Form.Field
                label="With error message"
                errorMessage="There is an error here"
              >
                <Select
                  options={SELECT_COUNTRIES}
                  value={'russia'}
                  onChange={() => null}
                />
              </Form.Field>
            </Flex>
            <Text.Heading role={TextHeadingRoles.inner}>
              DatePicker
            </Text.Heading>
            <Flex direction="horizontal" gap="l">
              <Form.Field label="Disabled" disabled>
                <DatePicker />
              </Form.Field>
              <Form.Field
                label="With error message"
                errorMessage="There is an error here"
              >
                <DatePicker value={dayjs('2024-04-04')} />
              </Form.Field>
            </Flex>
            <Button role="primary" label="Submit" />
          </Form>
        </Flex>
      </Flex>
    );
  },
};

export default story;
