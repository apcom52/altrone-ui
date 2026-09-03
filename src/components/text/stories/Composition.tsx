import type { CSSProperties } from 'react';
import { Flex, Text } from 'components';

/* Reset the element's chrome so `Text`'s merged type styles show through. */
const linkButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
};

const bareInputStyle: CSSProperties = {
  border: 'none',
  outline: 'none',
  background: 'none',
  flex: 1,
};

export const Composition = () => {
  return (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 560 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          One primitive, any element
        </Text>
        <Text block>
          <Text code>asChild</Text> merges <Text weight="bold">Text</Text>&apos;s
          type styles onto an element you own — a router link, a{' '}
          <Text code>&lt;button&gt;</Text>, a <Text code>&lt;label&gt;</Text> —
          so the styling lives in one place. Plain links need nothing special:{' '}
          <Text code>href</Text> renders an <Text code>&lt;a&gt;</Text>, and{' '}
          <Text code>external</Text> adds <Text code>target</Text> /{' '}
          <Text code>rel</Text>.
        </Text>
      </Flex>

      {/* Pull-quote — align + weight + muted attribution */}
      <Flex
        tagName="blockquote"
        direction="vertical"
        gap="s"
        style={{
          margin: 0,
          borderLeft: '3px solid var(--accent-6)',
          paddingLeft: 16,
        }}
      >
        <Text size={5} italic block>
          Typography is the craft of endowing human language with a durable
          visual form.
        </Text>
        <Text size={2} color="muted" block>
          — Robert Bringhurst
        </Text>
      </Flex>

      {/* Empty state — built entirely from Text + Flex, centred */}
      <Flex
        direction="vertical"
        gap="s"
        align="center"
        style={{
          border: '1px dashed var(--border-a2)',
          borderRadius: 12,
          padding: '28px 24px',
          textAlign: 'center',
        }}
      >
        <Text size={5} weight="bold" block align="center">
          No teammates yet
        </Text>
        <Text size={3} color="muted" block align="center">
          Invite people by email, or bring a whole team over from your existing
          workspace.
        </Text>
        <Text asChild size={3} weight="medium">
          <button type="button" style={linkButtonStyle}>
            Import from CSV
          </button>
        </Text>
      </Flex>

      {/* Field — asChild <label>, helper (muted), error (danger) */}
      <Flex direction="vertical" gap="xs">
        <Text asChild size={2} weight="medium">
          <label htmlFor="ct-workspace">Workspace URL</label>
        </Text>
        <Flex
          direction="horizontal"
          gap="xs"
          align="center"
          style={{
            border: '1px solid var(--border-a2)',
            borderRadius: 8,
            padding: '6px 10px',
          }}
        >
          <Text size={3} color="muted" nowrap>
            harbor.app/
          </Text>
          <Text asChild size={3}>
            <input
              id="ct-workspace"
              defaultValue="acme"
              style={bareInputStyle}
            />
          </Text>
        </Flex>
        <Text size={2} color="danger" block>
          That name is taken. Try <Text weight="medium">acme-eu</Text> or{' '}
          <Text weight="medium">acme-team</Text>.
        </Text>
      </Flex>

      {/* Alignment row */}
      <Flex direction="vertical" gap="xs">
        <Text size={2} weight="bold" color="muted" block>
          align
        </Text>
        {(['start', 'center', 'end', 'justify'] as const).map((a) => (
          <Text key={a} block align={a} size={2}>
            <Text code>{a}</Text> — the same paragraph, realigned. Alignment
            needs a block context or an explicit width to have anything to work
            against.
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};
