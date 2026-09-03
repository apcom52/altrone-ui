import { useRef, useState } from 'react';
import { Flex, Text } from 'components';
import { TextInput } from '../TextInput.tsx';

const LENGTH = 6;

export const OtpEntry = () => {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join('');
  const complete = code.length === LENGTH;
  const wrong = complete && code !== '424242';

  const setAt = (i: number, v: string) => {
    const clean = v.replace(/\D/g, '');
    setDigits((prev) => {
      const next = [...prev];
      if (clean.length <= 1) {
        next[i] = clean;
      } else {
        // paste: spread across the remaining boxes
        clean.split('').forEach((ch, k) => {
          if (i + k < LENGTH) next[i + k] = ch;
        });
      }
      return next;
    });
    const advanceTo = Math.min(i + Math.max(clean.length, 1), LENGTH - 1);
    if (clean) refs.current[advanceTo]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 420 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          One-time code
        </Text>
        <Text block>
          Six single-character fields at <Text code>size=&quot;l&quot;</Text>{' '}
          with <Text code>inputMode=&quot;numeric&quot;</Text>. Typing advances,
          Backspace on an empty box steps back, and a paste spreads across the
          row. Try <Text weight="bold">424242</Text>.
        </Text>
      </Flex>

      <Flex direction="horizontal" gap="s">
        {digits.map((d, i) => (
          <Flex key={i} style={{ width: 44 }}>
            <TextInput
              inputRef={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(v) => setAt(i, v)}
              onKeyDown={(e) => onKeyDown(i, e)}
              size="l"
              maxLength={1}
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              invalid={wrong}
              aria-label={`Digit ${i + 1}`}
              style={{ textAlign: 'center' }}
            />
          </Flex>
        ))}
      </Flex>

      {complete && (
        <Text size={2} color={wrong ? 'danger' : 'success'}>
          {wrong ? 'That code is incorrect' : 'Code accepted'}
        </Text>
      )}
    </Flex>
  );
};
