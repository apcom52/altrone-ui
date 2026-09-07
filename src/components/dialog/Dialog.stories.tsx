import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { DialogProvider } from './DialogProvider.tsx';
import { showAlert, showConfirm, showPrompt } from './dialog.ts';
import { Button } from 'components/button/index.ts';
import { Trash2, KeyRound, Rocket, PencilLine } from 'lucide-react';

const story: Meta<typeof DialogProvider> = {
  title: 'Components/Display/Dialogs',
  component: DialogProvider,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export default story;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} color="muted" style={{ maxWidth: 680, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Result = ({ children }: { children: React.ReactNode }) => (
  <Text
    block
    code
    style={{
      padding: '8px 12px',
      borderRadius: 'var(--radius-s)',
      background: 'var(--gray-a3)',
    }}
  >
    {children}
  </Text>
);

export const Overview: StoryObj<typeof DialogProvider> = {
  name: 'Overview',
  render: () => {
    const [lastResult, setLastResult] = useState<string>('—');

    return (
      <Flex direction="vertical" gap="l" align="start" style={{ padding: 24 }}>
        <Text block size={9} weight="bold">
          Dialogs
        </Text>
        <Paragraph>
          An imperative, promise-based API for the three interruptions every app
          eventually needs: <Text code>showAlert</Text> (acknowledge),{' '}
          <Text code>showConfirm</Text> (yes / no), <Text code>showPrompt</Text>{' '}
          (ask for one value). Each returns a Promise, so the calling code reads
          top to bottom — no callbacks, no local “is the dialog open” state.
          Rendering is handled by <Text code>DialogProvider</Text>, mounted for
          you inside <Text code>AltroneApplication</Text>.
        </Paragraph>
        <Paragraph>
          Reach for a dialog only when you genuinely need to block the flow.
          Passive feedback belongs in a <Text code>Toast</Text>; a form with more
          than one field belongs in a <Text code>Modal</Text> or its own screen.
        </Paragraph>

        <Heading>The await shape</Heading>
        <Paragraph>
          Because every function resolves, a confirm-then-act flow is a single
          straight line of code.
        </Paragraph>
        <Button
          label="Delete account"
          danger
          icon={<Trash2 size={14} />}
          onClick={async () => {
            const confirmed = await showConfirm({
              title: 'Delete account?',
              message:
                'Every project and file tied to this account is removed immediately. This cannot be undone.',
              confirmText: 'Delete account',
              rejectText: 'Keep it',
              danger: true,
            });

            if (!confirmed) {
              setLastResult('confirm → false (kept)');
              return;
            }

            await showAlert({
              title: 'Account deleted',
              message: 'You will be signed out in a moment.',
              okText: 'Got it',
            });
            setLastResult('confirm → true → alert acknowledged');
          }}
        />
        <Result>{lastResult}</Result>
      </Flex>
    );
  },
};

export const Alerts: StoryObj<typeof DialogProvider> = {
  name: 'Alert — acknowledge and move on',
  render: () => (
    <Flex direction="vertical" gap="l" align="start" style={{ padding: 24 }}>
      <Heading>Alert</Heading>
      <Paragraph>
        One button, one job: make sure the user has seen something before
        continuing. Give the button a verb that matches the message rather than a
        bare “OK” when you can.
      </Paragraph>
      <Flex gap="s" wrap>
        <Button
          label="Session expired"
          onClick={() =>
            showAlert({
              title: 'Session expired',
              message:
                'You were signed out after a period of inactivity. Sign in again to continue.',
              okText: 'Sign in',
            })
          }
        />
        <Button
          label="Access denied"
          onClick={() =>
            showAlert({
              title: 'Access denied',
              message: 'You do not have permission to perform this action.',
            })
          }
        />
        <Button
          label="Export ready"
          onClick={() =>
            showAlert({
              title: 'Export ready',
              message: 'Your data export has finished and is downloading now.',
              okText: 'Nice',
            })
          }
        />
      </Flex>
    </Flex>
  ),
};

export const Confirms: StoryObj<typeof DialogProvider> = {
  name: 'Confirm — a fork in the road',
  render: () => {
    const [log, setLog] = useState<string[]>([]);
    const push = (line: string) => setLog((prev) => [line, ...prev].slice(0, 5));

    return (
      <Flex direction="vertical" gap="l" align="start" style={{ padding: 24 }}>
        <Heading>Confirm</Heading>
        <Paragraph>
          Returns <Text code>true</Text> or <Text code>false</Text>. Dismissing
          the dialog (Escape, backdrop, the <Text code>×</Text>) counts as{' '}
          <Text code>false</Text>, so a stray click never triggers the
          consequential path. Use <Text code>danger</Text> for destructive
          confirms and name the button after the action.
        </Paragraph>
        <Flex gap="s" wrap>
          <Button
            label="Discard draft"
            onClick={async () => {
              const ok = await showConfirm({
                title: 'Discard this draft?',
                message: 'Your unsaved changes will be lost.',
                confirmText: 'Discard',
                rejectText: 'Keep editing',
                danger: true,
              });
              push(`Discard draft → ${ok}`);
            }}
          />
          <Button
            label="Publish now"
            icon={<Rocket size={14} />}
            onClick={async () => {
              const ok = await showConfirm({
                title: 'Publish to production?',
                message: 'The release goes live for everyone right away.',
                confirmText: 'Publish',
                rejectText: 'Not yet',
              });
              push(`Publish now → ${ok}`);
            }}
          />
        </Flex>
        {log.length > 0 && (
          <Flex direction="vertical" gap="xs" align="start">
            {log.map((line, i) => (
              <Result key={i}>{line}</Result>
            ))}
          </Flex>
        )}
      </Flex>
    );
  },
};

export const Prompts: StoryObj<typeof DialogProvider> = {
  name: 'Prompt — ask for exactly one value',
  render: () => {
    const [value, setValue] = useState<string>('—');

    return (
      <Flex direction="vertical" gap="l" align="start" style={{ padding: 24 }}>
        <Heading>Prompt</Heading>
        <Paragraph>
          A single input in a dialog. <Text code>inputType</Text> switches
          between a text field, a number field, a password field and a{' '}
          <Text code>textarea</Text> (<Text code>'text'</Text>). Resolves with
          the entered value, or <Text code>null</Text> if dismissed.
        </Paragraph>
        <Flex gap="s" wrap>
          <Button
            label="Rename project"
            icon={<PencilLine size={14} />}
            onClick={async () => {
              const name = await showPrompt({
                title: 'Rename project',
                message: 'Pick a new name for this project.',
                placeholder: 'e.g. Concentric Radius',
                confirmText: 'Rename',
              });
              setValue(name === null ? 'null (cancelled)' : `"${name}"`);
            }}
          />
          <Button
            label="Set seat count"
            onClick={async () => {
              const seats = await showPrompt({
                title: 'Team seats',
                message: 'How many seats should this plan include?',
                inputType: 'number',
                placeholder: '10',
              });
              setValue(seats === null ? 'null (cancelled)' : String(seats));
            }}
          />
          <Button
            label="Confirm password"
            icon={<KeyRound size={14} />}
            onClick={async () => {
              const pass = await showPrompt({
                title: 'Confirm your identity',
                message: 'Enter your password to continue.',
                inputType: 'password',
              });
              setValue(
                pass === null
                  ? 'null (cancelled)'
                  : `${String(pass).length} characters`,
              );
            }}
          />
          <Button
            label="Leave a note"
            onClick={async () => {
              const note = await showPrompt({
                title: 'Add a note',
                message: 'This is shown to reviewers alongside your request.',
                inputType: 'text',
                placeholder: 'What changed and why?',
                confirmText: 'Attach note',
                cancelText: 'Skip',
              });
              setValue(note === null ? 'null (cancelled)' : `"${note}"`);
            }}
          />
        </Flex>
        <Result>{value}</Result>
      </Flex>
    );
  },
};
