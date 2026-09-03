import { useState } from 'react';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { Flex, Switcher, Text, TextInput } from 'components';
import { PasswordInput } from '../PasswordInput.tsx';

const LOWER = 'abcdefghijkmnpqrstuvwxyz';
const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const DIGITS = '23456789';
const SYMBOLS = '!@#$%^&*-_=+';

const generate = (length: number, symbols: boolean) => {
  const pool = LOWER + UPPER + DIGITS + (symbols ? SYMBOLS : '');
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += pool[Math.floor(Math.random() * pool.length)];
  }
  return out;
};

export const GeneratePassword = () => {
  const [length, setLength] = useState(20);
  const [symbols, setSymbols] = useState(true);
  const [value, setValue] = useState(() => generate(20, true));
  const [copied, setCopied] = useState(false);

  const regenerate = () => setValue(generate(length, symbols));

  const copy = () => {
    void navigator.clipboard?.writeText?.(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 440 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Suggest a strong password
        </Text>
        <Text block>
          The signup pattern the browser and password managers use: a field
          pre-filled with a generated value, a reveal toggle to eyeball it, and
          two action islands — <Text code>Regenerate</Text> and{' '}
          <Text code>Copy</Text> — that do the work.
        </Text>
      </Flex>

      <PasswordInput
        value={value}
        onChange={setValue}
        aria-label="Generated password"
      >
        <TextInput.ActionIsland
          placement="end"
          showLabel={false}
          icon={<RefreshCw />}
          label="Regenerate"
          onClick={regenerate}
        />
        <TextInput.ActionIsland
          placement="end"
          showLabel={false}
          icon={copied ? <Check /> : <Copy />}
          label={copied ? 'Copied' : 'Copy password'}
          onClick={copy}
        />
      </PasswordInput>

      <Flex direction="horizontal" gap="l" align="center" wrap>
        <Flex direction="horizontal" gap="s" align="center">
          <Text size={2} color="muted">
            Length
          </Text>
          <Flex style={{ width: 80 }}>
            <TextInput
              value={String(length)}
              onChange={(v) => {
                const n = Math.min(64, Math.max(8, Number(v) || 8));
                setLength(n);
              }}
              size="s"
              inputMode="numeric"
              aria-label="Password length"
            />
          </Flex>
        </Flex>
        <Flex direction="horizontal" gap="s" align="center">
          <Switcher checked={symbols} onChange={() => setSymbols((s) => !s)} />
          <Text size={2} color="muted">
            Include symbols
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
