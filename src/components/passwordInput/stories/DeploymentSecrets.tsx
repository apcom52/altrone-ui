import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button, Flex, Text, TextInput } from 'components';
import { PasswordInput } from '../PasswordInput.tsx';

interface Secret {
  key: string;
  value: string;
  scope: string;
}

const INITIAL: Secret[] = [
  { key: 'DATABASE_URL', value: 'postgres://app:XXX@db.prod.internal:5432/main', scope: 'Production' },
  { key: 'STRIPE_SECRET_KEY', value: 'XXX', scope: 'Production' },
  { key: 'JWT_SIGNING_SECRET', value: 'XXX', scope: 'Production, Preview' },
];

export const DeploymentSecrets = () => {
  const [secrets, setSecrets] = useState(INITIAL);
  const [copied, setCopied] = useState<string | null>(null);

  const setValue = (key: string, value: string) =>
    setSecrets((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value } : s)),
    );

  const copy = (secret: Secret) => {
    void navigator.clipboard?.writeText?.(secret.value);
    setCopied(secret.key);
    window.setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Environment secrets
        </Text>
        <Text block>
          <Text weight="bold">PasswordInput</Text> isn&apos;t only a login field
          — it fits any value that&apos;s secret at rest but has to be checked or
          edited on demand. Here the reveal toggle rides alongside a{' '}
          <Text code>Copy</Text> action island.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="m">
        {secrets.map((secret) => (
          <Flex key={secret.key} direction="vertical" gap="xs">
            <Flex direction="horizontal" gap="s" align="center">
              <Text code size={2}>
                {secret.key}
              </Text>
              <Text size={1} color="muted" nowrap>
                {secret.scope}
              </Text>
            </Flex>
            <PasswordInput
              value={secret.value}
              onChange={(v) => setValue(secret.key, v)}
              aria-label={secret.key}
            >
              <TextInput.ActionIsland
                placement="end"
                showLabel={false}
                icon={copied === secret.key ? <Check /> : <Copy />}
                label={copied === secret.key ? 'Copied' : 'Copy value'}
                onClick={() => copy(secret)}
              />
            </PasswordInput>
          </Flex>
        ))}
      </Flex>

      <Flex direction="horizontal" gap="s">
        <Button label="Save changes" variant="submit" onClick={() => undefined} />
        <Button label="Add secret" variant="text" onClick={() => undefined} />
      </Flex>
    </Flex>
  );
};
