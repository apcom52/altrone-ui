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
import { AutocompleteInput } from '../autocompleteInput';
import { Search } from '../search';
import { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { dayjsInstance as dayjs } from '../../utils';
import type { Dayjs } from 'dayjs';
import type { Option } from '../select/Select.types.ts';

const ROLE_OPTIONS: Option[] = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
  { label: 'DevOps Engineer', value: 'devops' },
];

const DEPARTMENT_OPTIONS: Option[] = [
  { label: 'Engineering', value: 'eng' },
  { label: 'Design', value: 'design' },
  { label: 'Product', value: 'product' },
  { label: 'Sales', value: 'sales' },
  { label: 'People Ops', value: 'people' },
];

const OFFICE_CITIES = [
  'Amsterdam',
  'Berlin',
  'Lisbon',
  'London',
  'Madrid',
  'New York',
  'Paris',
  'San Francisco',
  'Singapore',
  'Toronto',
];

interface Applicant {
  id: string;
  name: string;
  email: string;
  role: string;
}

const APPLICANTS: Applicant[] = [
  { id: 'a1', name: 'Priya Nair', email: 'priya.nair@example.com', role: 'Senior Frontend' },
  { id: 'a2', name: 'Marco Bianchi', email: 'marco.bianchi@example.com', role: 'Backend' },
  { id: 'a3', name: 'Sofia Kowalski', email: 'sofia.kowalski@example.com', role: 'Product Designer' },
  { id: 'a4', name: 'Daniel Osei', email: 'daniel.osei@example.com', role: 'DevOps' },
];

const TODAY = dayjs();

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

// Story 5 — every input type, one coherent task
interface HireForm {
  fullName: string;
  email: string;
  location: string;
  department: string;
  salary: number | undefined;
  startDate: Dayjs | undefined;
  tempPassword: string;
  notes: string;
  sendWelcome: boolean;
}

const EMPTY_HIRE: HireForm = {
  fullName: '',
  email: '',
  location: '',
  department: '',
  salary: undefined,
  startDate: undefined,
  tempPassword: '',
  notes: '',
  sendWelcome: true,
};

export const OnboardingStory: StoryObj<typeof Flex> = {
  name: 'Every field, one form — onboard a new hire',
  render: () => {
    const [applicantQuery, setApplicantQuery] = useState('');
    const [values, setValues] = useState<HireForm>(EMPTY_HIRE);
    const [created, setCreated] = useState<HireForm | null>(null);

    const set = <K extends keyof HireForm>(key: K, value: HireForm[K]) =>
      setValues((s) => ({ ...s, [key]: value }));

    const reset = () => {
      setValues(EMPTY_HIRE);
      setApplicantQuery('');
      setCreated(null);
    };

    if (created) {
      const dept = DEPARTMENT_OPTIONS.find(
        (d) => d.value === created.department,
      )?.label;

      return (
        <Flex direction="vertical" gap="m" style={{ maxWidth: 560 }}>
          <Text size={6} weight="bold" block>
            {created.fullName || 'New hire'} is set up
          </Text>
          <Text block>
            {dept ? `${dept}, ` : ''}
            {created.location || 'no office'} · starts{' '}
            {created.startDate ? created.startDate.format('LL') : 'TBD'} ·{' '}
            {created.salary != null
              ? `$${created.salary.toLocaleString('en-US')}/yr`
              : 'salary TBD'}
          </Text>
          <Text size={2} color="muted" block>
            {created.sendWelcome
              ? 'A welcome email is scheduled for the start date.'
              : 'No welcome email will be sent.'}
          </Text>
          <Button label="Onboard another" icon={<RefreshCw />} onClick={reset} />
        </Flex>
      );
    }

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
        <Flex direction="vertical" gap="xs">
          <Text size={6} weight="bold" block>
            Onboard a new hire
          </Text>
          <Text block>
            One task, one control per question: a name is a{' '}
            <Text code>TextInput</Text>, a fixed list of departments is a{' '}
            <Text code>Select</Text>, an amount is a <Text code>NumberInput</Text>,
            a day is a <Text code>DatePicker</Text>, an open-ended set of cities is
            an <Text code>AutocompleteInput</Text>, and free text is a{' '}
            <Text code>Textarea</Text>. <Text code>Search</Text> sits apart — it
            retrieves an existing record to prefill, it isn&apos;t a field.
          </Text>
        </Flex>

        <Flex direction="vertical" gap="xs">
          <Text size={2} weight="medium" block>
            Start from an accepted applicant
          </Text>
          <Search<Applicant>
            value={applicantQuery}
            onChange={setApplicantQuery}
            getSuggestions={({ value }) =>
              APPLICANTS.filter((a) =>
                a.name.toLowerCase().includes(value.toLowerCase()),
              )
            }
            getSuggestionValue={(a) => a.name}
            renderSuggestion={({ suggestion }) => (
              <>
                <Text size={3} style={{ flex: 1 }}>
                  {suggestion.name}
                </Text>
                <Text size={1} color="muted" nowrap>
                  {suggestion.role}
                </Text>
              </>
            )}
            onSelect={(a) =>
              setValues((s) => ({ ...s, fullName: a.name, email: a.email }))
            }
            placeholder="Search accepted applicants…"
          />
        </Flex>

        <Form>
          <Flex direction="horizontal" gap="l" align="start">
            <Form.Field label="Full name" name="fullName" required>
              <TextInput
                value={values.fullName}
                onChange={(v) => set('fullName', v)}
                placeholder="Jane Smith"
              />
            </Form.Field>
            <Form.Field label="Work email" name="email" required>
              <TextInput
                value={values.email}
                onChange={(v) => set('email', v)}
                placeholder="jane@company.com"
              />
            </Form.Field>
          </Flex>

          <Flex direction="horizontal" gap="l" align="start">
            <Form.Field
              label="Office"
              name="location"
              hintText="Start typing — closest matches appear"
            >
              <AutocompleteInput
                value={values.location}
                onChange={(v) => set('location', v)}
                getSuggestions={({ value }) =>
                  OFFICE_CITIES.filter((c) =>
                    c.toLowerCase().includes(value.toLowerCase()),
                  )
                }
                placeholder="e.g. Berlin"
              />
            </Form.Field>
            <Form.Field label="Department" name="department" required>
              <Select
                options={DEPARTMENT_OPTIONS}
                value={values.department}
                onChange={(v) => set('department', (v as string) ?? '')}
                placeholder="Pick a department"
              />
            </Form.Field>
          </Flex>

          <Flex direction="horizontal" gap="l" align="start">
            <Form.Field
              label="Annual salary"
              name="salary"
              hintText="Gross, before tax"
            >
              <NumberInput
                value={values.salary}
                onChange={(v) => set('salary', v)}
                min={0}
                groupingDelimiter=","
                digitsAfterPoint={0}
                placeholder="90,000"
              >
                <TextInput.TextIsland label="$" placement="start" />
              </NumberInput>
            </Form.Field>
            <Form.Field label="Start date" name="startDate" required>
              <DatePicker
                value={values.startDate}
                onChange={(v) => set('startDate', v)}
                minDate={TODAY}
                clearable
                placeholder="Pick a start date"
              />
            </Form.Field>
          </Flex>

          <Form.Field
            label="Temporary password"
            name="tempPassword"
            required
            description="The hire is prompted to change it on first sign-in"
          >
            <PasswordInput
              value={values.tempPassword}
              onChange={(v) => set('tempPassword', v)}
              placeholder="••••••••••••"
            />
          </Form.Field>

          <Form.Field
            label="Notes for the team"
            name="notes"
            description="Equipment, seating, anything the manager should know (optional)"
          >
            <Textarea
              value={values.notes}
              onChange={(v) => set('notes', v)}
              placeholder="Ordered a MacBook Pro, sitting with the platform team…"
            />
          </Form.Field>

          <Form.Field label="Welcome email" name="sendWelcome">
            <Switcher
              checked={values.sendWelcome}
              onChange={(v) => set('sendWelcome', v)}
            >
              Send the welcome email on the start date
            </Switcher>
          </Form.Field>

          <Flex direction="horizontal" gap="s">
            <Button
              label="Create hire"
              icon={<Send />}
              role="primary"
              onClick={() => setCreated(values)}
            />
            <Button label="Reset" icon={<RefreshCw />} onClick={reset} />
          </Flex>
        </Form>
      </Flex>
    );
  },
};

export default story;
