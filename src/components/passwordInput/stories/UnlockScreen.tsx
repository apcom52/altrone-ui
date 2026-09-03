import { useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { Button, Flex, Text } from 'components';
import { PasswordInput } from '../PasswordInput.tsx';

const SECRET = 'letmein';
const MAX_ATTEMPTS = 3;

export const UnlockScreen = () => {
  const [value, setValue] = useState('');
  const [left, setLeft] = useState(MAX_ATTEMPTS);
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const locked = left === 0;

  const submit = () => {
    if (locked || unlocked) return;
    if (value === SECRET) {
      setUnlocked(true);
      setError('');
      return;
    }
    const next = left - 1;
    setLeft(next);
    setValue('');
    setError(
      next === 0
        ? 'Too many attempts. Vault locked for 30 seconds.'
        : `Incorrect password. ${next} attempt${next === 1 ? '' : 's'} left.`,
    );
  };

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 360 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Unlock
        </Text>
        <Text block>
          The auth-gate side of <Text weight="bold">PasswordInput</Text>: reveal
          toggle for a quick check, <Text code>invalid</Text> plus a message on a
          wrong entry, and the field disabling itself once attempts run out.
        </Text>
      </Flex>

      <Flex
        direction="vertical"
        gap="m"
        align="center"
        style={{
          border: '1px solid var(--border-a1)',
          borderRadius: 14,
          padding: '28px 24px',
        }}
      >
        {unlocked ? (
          <>
            <ShieldCheck size={28} style={{ color: 'var(--success-solid-1)' }} />
            <Text size={4} weight="bold" block align="center">
              Vault unlocked
            </Text>
          </>
        ) : (
          <>
            <Lock size={24} style={{ color: 'var(--text-2)' }} />
            <Text size={3} weight="medium" block align="center">
              Enter your master password
            </Text>
            <PasswordInput
              value={value}
              onChange={(v) => {
                setValue(v);
                if (error) setError('');
              }}
              placeholder="Master password"
              invalid={Boolean(error)}
              disabled={locked}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              aria-label="Master password"
            />
            {error && (
              <Text size={2} color="danger" block align="center">
                {error}
              </Text>
            )}
            <Button
              variant="submit"
              label="Unlock"
              disabled={locked || value.length === 0}
              onClick={submit}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};
