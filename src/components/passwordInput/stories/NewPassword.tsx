import { useMemo, useState } from 'react';
import { Button, Flex, Text } from 'components';
import { PasswordInput } from '../PasswordInput.tsx';

interface Rule {
  label: string;
  test: (v: string) => boolean;
}

const RULES: Rule[] = [
  { label: 'At least 10 characters', test: (v) => v.length >= 10 },
  { label: 'An uppercase and a lowercase letter', test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: 'A number', test: (v) => /\d/.test(v) },
  { label: 'A symbol', test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const METER_TONE = ['danger', 'danger', 'warning', 'warning', 'success'] as const;
const METER_LABEL = ['too weak', 'too weak', 'getting there', 'almost', 'strong'];

export const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const passed = useMemo(
    () => RULES.map((r) => r.test(password)),
    [password],
  );
  const score = passed.filter(Boolean).length;
  const allPassed = score === RULES.length;
  const matches = confirm.length > 0 && confirm === password;
  const canSubmit = allPassed && matches;

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 420 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Choose a password
        </Text>
        <Text block>
          The reveal toggle (<Text code>showControls</Text>, on by default) lets
          people check what they typed before committing to it. Everything else
          here — the meter, the checklist, the match state — is composed around
          the field with <Text code>Text</Text> and validation state.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="xs">
        <Text asChild size={2} weight="medium">
          <label htmlFor="np-password">New password</label>
        </Text>
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Make it memorable, not guessable"
          invalid={password.length > 0 && !allPassed}
          id="np-password"
        />

        <Flex direction="horizontal" gap="xs" style={{ marginTop: 4 }}>
          {[0, 1, 2, 3].map((i) => (
            <Flex
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background:
                  password.length > 0 && i < score
                    ? `var(--${METER_TONE[score]}-solid-1)`
                    : 'var(--border-a2)',
              }}
            />
          ))}
        </Flex>
        {password.length > 0 && (
          <Text size={2} color={METER_TONE[score]}>
            Strength: {METER_LABEL[score]}
          </Text>
        )}

        <Flex direction="vertical" gap="xxs" style={{ marginTop: 4 }}>
          {RULES.map((rule, i) => (
            <Text
              key={rule.label}
              size={2}
              color={passed[i] ? 'success' : 'muted'}
            >
              {passed[i] ? '✓' : '○'} {rule.label}
            </Text>
          ))}
        </Flex>
      </Flex>

      <Flex direction="vertical" gap="xs">
        <Text asChild size={2} weight="medium">
          <label htmlFor="np-confirm">Confirm password</label>
        </Text>
        <PasswordInput
          value={confirm}
          onChange={setConfirm}
          placeholder="Type it again"
          invalid={confirm.length > 0 && !matches}
          id="np-confirm"
        />
        {confirm.length > 0 && (
          <Text size={2} color={matches ? 'success' : 'danger'}>
            {matches ? 'Passwords match' : "Passwords don't match yet"}
          </Text>
        )}
      </Flex>

      <Button
        variant="submit"
        label="Create account"
        disabled={!canSubmit}
        onClick={() => undefined}
      />
    </Flex>
  );
};
