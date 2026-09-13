import { useState } from 'react';
import { Flex, Text, TextInput } from 'components';
import { NumberInput } from '../NumberInput.tsx';

const BALANCE = 8420.5;

export const MoneyInput = () => {
  const [budgetUsd, setBudgetUsd] = useState<number | undefined>(2500);
  const [budgetEur, setBudgetEur] = useState<number | undefined>(1899.99);
  const [transfer, setTransfer] = useState<number | undefined>(1000);

  const atLimit = (transfer ?? 0) >= BALANCE;

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 460 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Money, formatted as you type
        </Text>
        <Text block>
          Grouping and decimal separators are locale props
          (<Text code>groupingDelimiter</Text>,{' '}
          <Text code>decimalDelimiter</Text>);{' '}
          <Text code>digitsAfterPoint</Text> with{' '}
          <Text code>fixedDecimalScale</Text> pins the cents;{' '}
          <Text code>min</Text> / <Text code>max</Text> clamp silently while you
          type.
        </Text>
      </Flex>

      <Flex direction="horizontal" gap="m">
        <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
          <Text asChild size={2} weight="medium">
            <label htmlFor="mi-usd">Monthly budget · US</label>
          </Text>
          <NumberInput
            id="mi-usd"
            value={budgetUsd}
            onChange={setBudgetUsd}
            min={0}
            digitsAfterPoint={2}
            fixedDecimalScale
            groupingDelimiter=","
            decimalDelimiter="."
            placeholder="0.00"
          >
            <TextInput.TextIsland label="$" />
          </NumberInput>
        </Flex>

        <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
          <Text asChild size={2} weight="medium">
            <label htmlFor="mi-eur">Monatsbudget · EU</label>
          </Text>
          <NumberInput
            id="mi-eur"
            value={budgetEur}
            onChange={setBudgetEur}
            min={0}
            digitsAfterPoint={2}
            fixedDecimalScale
            groupingDelimiter="."
            decimalDelimiter=","
            placeholder="0,00"
          >
            <TextInput.TextIsland placement="end" label="€" />
          </NumberInput>
        </Flex>
      </Flex>

      <Flex direction="vertical" gap="xs">
        <Text asChild size={2} weight="medium">
          <label htmlFor="mi-transfer">Transfer amount</label>
        </Text>
        <NumberInput
          id="mi-transfer"
          value={transfer}
          onChange={setTransfer}
          min={0}
          max={BALANCE}
          digitsAfterPoint={2}
          fixedDecimalScale
          groupingDelimiter=","
          decimalDelimiter="."
        >
          <TextInput.TextIsland label="$" />
        </NumberInput>
        <Text size={2} color={atLimit ? 'warning' : 'muted'}>
          {atLimit
            ? 'Capped at your available balance — max clamps as you type'
            : `Available balance: $${BALANCE.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}`}
        </Text>
      </Flex>
    </Flex>
  );
};
