import { useState } from 'react';
import { Divider, Flex, Text, TextInput } from 'components';
import { NumberInput } from '../NumberInput.tsx';

const money = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2 });

export const SplitBill = () => {
  const [bill, setBill] = useState<number | undefined>(184.5);
  const [people, setPeople] = useState<number | undefined>(3);
  const [tipPct, setTipPct] = useState<number | undefined>(15);

  const b = bill ?? 0;
  const p = Math.max(1, people ?? 1);
  const tip = (b * (tipPct ?? 0)) / 100;
  const perPerson = (b + tip) / p;

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 420 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Split the bill
        </Text>
        <Text block>
          Three <Text code>NumberInput</Text>s with different configs on one row:
          a currency field, a plain integer clamped to <Text code>min=1</Text>,
          and a percentage. Everything below is derived.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="m">
        <Flex direction="vertical" gap="xs">
          <Text asChild size={2} weight="medium">
            <label htmlFor="sb-bill">Bill total</label>
          </Text>
          <NumberInput
            id="sb-bill"
            value={bill}
            onChange={setBill}
            min={0}
            digitsAfterPoint={2}
            fixedDecimalScale
            groupingDelimiter=","
          >
            <TextInput.TextIsland label="$" />
          </NumberInput>
        </Flex>

        <Flex direction="horizontal" gap="m">
          <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
            <Text asChild size={2} weight="medium">
              <label htmlFor="sb-people">People</label>
            </Text>
            <NumberInput
              id="sb-people"
              value={people}
              onChange={setPeople}
              min={1}
              max={50}
              digitsAfterPoint={0}
            />
          </Flex>
          <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
            <Text asChild size={2} weight="medium">
              <label htmlFor="sb-tip">Tip</label>
            </Text>
            <NumberInput
              id="sb-tip"
              value={tipPct}
              onChange={setTipPct}
              min={0}
              max={100}
              digitsAfterPoint={0}
            >
              <TextInput.TextIsland placement="end" label="%" />
            </NumberInput>
          </Flex>
        </Flex>
      </Flex>

      <Divider />

      <Flex direction="vertical" gap="xs">
        <Flex direction="horizontal" align="center" justify="between">
          <Text size={2} color="muted">
            Tip ({tipPct ?? 0}%)
          </Text>
          <Text size={2} nowrap>
            ${money(tip)}
          </Text>
        </Flex>
        <Flex direction="horizontal" align="center" justify="between">
          <Text size={4} weight="bold">
            Each person pays
          </Text>
          <Text size={4} weight="bold" nowrap>
            ${money(perPerson)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
