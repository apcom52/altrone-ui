import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button, Divider, Flex, Text } from 'components';
import { NumberInput } from '../NumberInput.tsx';

interface Rule {
  external: number;
  internal: number;
}

export const PortForwarding = () => {
  const [rules, setRules] = useState<Rule[]>([
    { external: 443, internal: 8443 },
    { external: 80, internal: 8080 },
  ]);
  const [ext, setExt] = useState<number | undefined>();
  const [int, setInt] = useState<number | undefined>();

  const extPrivileged = (ext ?? 1024) < 1024;
  const duplicate = rules.some((r) => r.external === ext);
  const canAdd = ext !== undefined && int !== undefined && !duplicate;

  const add = () => {
    if (!canAdd) return;
    setRules((r) => [...r, { external: ext!, internal: int! }]);
    setExt(undefined);
    setInt(undefined);
  };

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 480 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Port forwarding rules
        </Text>
        <Text block>
          Integer fields (<Text code>digitsAfterPoint=0</Text>) clamped to the
          full port range, <Text code>min=1 max=65535</Text> — over-typing is
          simply refused. Validation warnings sit outside the field.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="s">
        {rules.map((r, i) => (
          <Flex key={i} direction="horizontal" gap="s" align="center">
            <Text code size={2} style={{ width: 72, textAlign: 'right' }}>
              {r.external}
            </Text>
            <ArrowRight size={14} style={{ color: 'var(--text-2)' }} />
            <Text code size={2} style={{ width: 72 }}>
              {r.internal}
            </Text>
            <Text size={1} color="muted" nowrap style={{ flex: 1 }}>
              tcp · active
            </Text>
          </Flex>
        ))}
      </Flex>

      <Divider />

      <Flex direction="vertical" gap="xs">
        <Text size={2} weight="medium" block>
          Add a rule
        </Text>
        <Flex direction="horizontal" gap="s" align="center">
          <Flex style={{ width: 120 }}>
            <NumberInput
              value={ext}
              onChange={setExt}
              min={1}
              max={65535}
              digitsAfterPoint={0}
              placeholder="External"
              invalid={duplicate}
              aria-label="External port"
            />
          </Flex>
          <ArrowRight size={14} style={{ color: 'var(--text-2)' }} />
          <Flex style={{ width: 120 }}>
            <NumberInput
              value={int}
              onChange={setInt}
              min={1}
              max={65535}
              digitsAfterPoint={0}
              placeholder="Internal"
              aria-label="Internal port"
            />
          </Flex>
          <Button
            size="s"
            variant="submit"
            label="Add"
            disabled={!canAdd}
            onClick={add}
          />
        </Flex>
        {duplicate && (
          <Text size={2} color="danger">
            A rule for external port {ext} already exists.
          </Text>
        )}
        {!duplicate && extPrivileged && ext !== undefined && (
          <Text size={2} color="warning">
            Port {ext} is privileged (&lt; 1024) — the service needs elevated
            permissions to bind it.
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
