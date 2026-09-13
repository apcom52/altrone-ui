import { useMemo, useState } from 'react';
import { Flex, Text } from 'components';
import { Textarea } from '../Textarea.tsx';

const SAMPLE = `{
  "name": "web",
  "env": "production",
  "replicas": 3,
  "resources": { "cpu": "500m", "memory": "512Mi" }
}`;

interface Parsed {
  ok: boolean;
  message: string;
}

const check = (text: string): Parsed => {
  if (!text.trim()) return { ok: false, message: 'Paste a JSON object' };
  try {
    const v = JSON.parse(text);
    if (v === null || typeof v !== 'object' || Array.isArray(v)) {
      return { ok: false, message: 'Valid JSON, but not an object' };
    }
    return { ok: true, message: `Valid — ${Object.keys(v).length} top-level keys` };
  } catch (e) {
    return { ok: false, message: (e as Error).message.replace(/^JSON.parse: /, '') };
  }
};

export const SnippetEditor = () => {
  const [text, setText] = useState(SAMPLE);
  const parsed = useMemo(() => check(text), [text]);
  const lines = text.split('\n').length;

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Paste a config
        </Text>
        <Text block>
          A tall <Text code>Textarea</Text> for machine text — bump{' '}
          <Text code>size</Text>, drag the resize handle for a big payload, and
          drive validation from the value. <Text code>invalid</Text> flips the
          moment the JSON stops parsing.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="xs">
        <Textarea
          value={text}
          onChange={setText}
          size="l"
          invalid={!parsed.ok}
          spellCheck={false}
          placeholder='{ "key": "value" }'
          style={{ minHeight: 160, fontFamily: 'var(--font-family-code)' }}
        />
        <Flex direction="horizontal" gap="m" align="center" justify="between">
          <Text size={2} color={parsed.ok ? 'success' : 'danger'}>
            {parsed.ok ? '✓ ' : '✗ '}
            {parsed.message}
          </Text>
          <Text size={2} color="muted" nowrap>
            {lines} line{lines === 1 ? '' : 's'} · {text.length} chars
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
