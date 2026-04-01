import { Meta, StoryObj } from '@storybook/react';
import { Form } from './index.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { TextInput } from '../textInput';
import { PasswordInput } from '../passwordInput';
import { Button } from '../button';
import { NumberInput } from '../numberInput';
import { Textarea } from '../textarea';
import { Select } from '../select';
import { DatePicker } from '../datePicker';
import { Switcher } from '../switcher';
import { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import type { Option } from '../select/Select.types.ts';

const ROLE_OPTIONS: Option[] = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
  { label: 'DevOps Engineer', value: 'devops' },
];

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

// Story 1 — all Form.Field states
export const FieldStatesStory: StoryObj<typeof Flex> = {
  name: 'Field States',
  render: () => (
    <Flex direction="vertical" gap="xl">
      <Text size={5} weight="bold" block>
        Form.Field — all states
      </Text>
      <Form>
        <Flex direction="horizontal" gap="l" align="start">
          <Form.Field label="Default field" name="default">
            <TextInput placeholder="Type something" />
          </Form.Field>

          <Form.Field label="Required field" name="required" required>
            <TextInput placeholder="Cannot be empty" />
          </Form.Field>

          <Form.Field
            label="With hint"
            name="hint"
            hintText="This value must be globally unique across all workspaces"
          >
            <TextInput placeholder="workspace-slug" />
          </Form.Field>
        </Flex>

        <Flex direction="horizontal" gap="l" align="start">
          <Form.Field
            label="With description"
            name="description"
            description="Shown below the input to give extra context to the user"
          >
            <TextInput placeholder="Type something" />
          </Form.Field>

          <Form.Field
            label="Field-level error"
            name="error"
            errorMessage="This value is already taken"
          >
            <TextInput placeholder="john.doe" />
          </Form.Field>

          <Form.Field label="Disabled field" name="disabled" disabled>
            <TextInput placeholder="Cannot edit" />
          </Form.Field>
        </Flex>

        <Flex direction="horizontal" gap="l" align="start">
          <Form.Field
            label="Required + hint + description"
            name="combo"
            required
            hintText="Must be a valid RFC 5322 email address"
            description="We will send a confirmation link to this address"
          >
            <TextInput placeholder="you@example.com" />
          </Form.Field>

          <Form.Field
            label="No label, only description"
            name="nolabel"
            description="Field without a visible label — label is optional"
          >
            <TextInput placeholder="anonymous field" />
          </Form.Field>
        </Flex>
      </Form>
    </Flex>
  ),
};

// Story 2 — interactive form with client + server validation
interface SignUpForm {
  username: string;
  email: string;
  password: string;
  role: string;
  bio: string;
  age: number | null;
  newsletter: boolean;
}

type FormErrors = Partial<Record<keyof SignUpForm, string>>;

const SERVER_TAKEN_ERRORS: FormErrors = {
  username: 'This username is already taken',
  email: 'An account with this email already exists',
};

export const InteractiveStory: StoryObj<typeof Flex> = {
  name: 'Interactive — Registration Form',
  render: () => {
    const [values, setValues] = useState<SignUpForm>({
      username: '',
      email: '',
      password: '',
      role: '',
      bio: '',
      age: null,
      newsletter: false,
    });
    const [clientErrors, setClientErrors] = useState<FormErrors>({});
    const [serverErrors, setServerErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = (v: SignUpForm): FormErrors => {
      const errors: FormErrors = {};
      if (!v.username.trim()) errors.username = 'Username is required';
      else if (v.username.length < 3) errors.username = 'At least 3 characters';
      if (!v.email.trim()) errors.email = 'Email is required';
      else if (!v.email.includes('@')) errors.email = 'Enter a valid email';
      if (!v.password) errors.password = 'Password is required';
      else if (v.password.length < 8) errors.password = 'At least 8 characters';
      if (!v.role) errors.role = 'Please select your role';
      return errors;
    };

    const handleSubmit = () => {
      const errors = validate(values);
      if (Object.keys(errors).length > 0) {
        setClientErrors(errors);
        setServerErrors({});
        setSubmitted(false);
        return;
      }
      setClientErrors({});
      // Simulate server rejecting taken username/email
      if (values.username === 'admin' || values.email === 'admin@example.com') {
        setServerErrors(SERVER_TAKEN_ERRORS);
        setSubmitted(false);
      } else {
        setServerErrors({});
        setSubmitted(true);
      }
    };

    const handleReset = () => {
      setValues({ username: '', email: '', password: '', role: '', bio: '', age: null, newsletter: false });
      setClientErrors({});
      setServerErrors({});
      setSubmitted(false);
    };

    const allErrors = { ...clientErrors, ...serverErrors };

    if (submitted) {
      return (
        <Flex direction="vertical" gap="m" align="center">
          <Text size={6} weight="bold" block>Account created!</Text>
          <Text size={4} block>Welcome, {values.username}. Check {values.email} for the confirmation link.</Text>
          <Button label="Start over" icon={<RefreshCw />} onClick={handleReset} />
        </Flex>
      );
    }

    return (
      <Flex direction="vertical" gap="l">
        <Flex direction="vertical" gap="xs">
          <Text size={6} weight="bold" block>Create an account</Text>
          <Text size={4} block>
            Try submitting with empty fields to see client-side errors.
            Use <Text weight="bold">admin</Text> / <Text weight="bold">admin@example.com</Text> to trigger server errors.
          </Text>
        </Flex>

        <Form errorMessages={allErrors} onSubmit={handleSubmit}>
          <Flex direction="horizontal" gap="l" align="start">
            <Form.Field
              label="Username"
              name="username"
              required
              hintText="3–20 characters, letters and numbers only"
            >
              <TextInput
                value={values.username}
                onChange={(v) => setValues((s) => ({ ...s, username: v }))}
                placeholder="john_doe"
              />
            </Form.Field>

            <Form.Field
              label="Email"
              name="email"
              required
              description="We'll send a confirmation link here"
            >
              <TextInput
                value={values.email}
                onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                placeholder="you@example.com"
              />
            </Form.Field>
          </Flex>

          <Flex direction="horizontal" gap="l" align="start">
            <Form.Field
              label="Password"
              name="password"
              required
              description="Minimum 8 characters"
            >
              <PasswordInput
                value={values.password}
                onChange={(v) => setValues((s) => ({ ...s, password: v }))}
                placeholder="••••••••"
              />
            </Form.Field>

            <Form.Field
              label="Role"
              name="role"
              required
              hintText="Your primary role in the team"
            >
              <Select
                options={ROLE_OPTIONS}
                value={values.role}
                onChange={(v) => setValues((s) => ({ ...s, role: v as string }))}
                placeholder="Select role..."
              />
            </Form.Field>
          </Flex>

          <Form.Field
            label="Bio"
            name="bio"
            description="Tell us a little about yourself (optional)"
          >
            <Textarea
              value={values.bio}
              onChange={(v) => setValues((s) => ({ ...s, bio: v }))}
              placeholder="I'm a developer who loves building great UIs..."
            />
          </Form.Field>

          <Flex direction="horizontal" gap="l" align="start">
            <Form.Field
              label="Age"
              name="age"
              hintText="Must be 18 or older to register"
            >
              <NumberInput
                value={values.age ?? undefined}
                onChange={(v) => setValues((s) => ({ ...s, age: v ?? null }))}
                placeholder="25"
              />
            </Form.Field>

            <Form.Field label="Newsletter" name="newsletter">
              <Switcher
                checked={values.newsletter}
                onChange={(v) => setValues((s) => ({ ...s, newsletter: v }))}
              >
                Subscribe to product updates
              </Switcher>
            </Form.Field>
          </Flex>

          <Flex direction="horizontal" gap="s">
            <Button label="Create account" icon={<Send />} role="primary" />
            <Button label="Reset" icon={<RefreshCw />} onClick={handleReset} />
          </Flex>
        </Form>
      </Flex>
    );
  },
};

// Story 3 — disabled form
export const DisabledStory: StoryObj<typeof Flex> = {
  name: 'Disabled Form',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={5} weight="bold" block>
        Disabled — entire form locked
      </Text>
      <Form disabled>
        <Flex direction="horizontal" gap="l" align="start">
          <Form.Field label="Username" name="username" required>
            <TextInput value="john_doe" onChange={() => null} />
          </Form.Field>
          <Form.Field label="Email" name="email" required>
            <TextInput value="john@example.com" onChange={() => null} />
          </Form.Field>
        </Flex>
        <Form.Field label="Role" name="role">
          <Select
            options={ROLE_OPTIONS}
            value="frontend"
            onChange={() => null}
          />
        </Form.Field>
        <Form.Field label="Bio" name="bio">
          <Textarea
            value="Loves clean code and well-designed APIs."
            onChange={() => null}
          />
        </Form.Field>
        <Button label="Save changes" role="primary" />
      </Form>
    </Flex>
  ),
};

// Story 4 — sizes
export const SizesStory: StoryObj<typeof Flex> = {
  name: 'Form Sizes',
  render: () => (
    <Flex direction="vertical" gap="xl">
      <Text size={5} weight="bold" block>
        Form Sizes — s / m / l
      </Text>
      <Flex direction="horizontal" gap="xl" align="start">
        {(['s', 'm', 'l'] as const).map((size) => (
          <Flex key={size} direction="vertical" gap="s">
            <Text size={3} weight="bold" block>
              size="{size}"
            </Text>
            <Form size={size}>
              <Form.Field label="Full name" name="name" required>
                <TextInput placeholder="Jane Smith" />
              </Form.Field>
              <Form.Field
                label="Email"
                name="email"
                required
                hintText="Used for login"
              >
                <TextInput placeholder="jane@example.com" />
              </Form.Field>
              <Form.Field
                label="Role"
                name="role"
                errorMessage="This field is required"
              >
                <Select options={ROLE_OPTIONS} value="" onChange={() => null} placeholder="Select..." />
              </Form.Field>
              <Button label="Submit" role="primary" size={size} />
            </Form>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};

export default story;
