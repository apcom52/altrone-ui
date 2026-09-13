import { useState } from 'react';
import { Divider, Flex, Text, TextInput } from 'components';
import { NumberInput } from '../NumberInput.tsx';

interface Product {
  name: string;
  unitPrice: number;
  inStock: number;
}

const CATALOG: Product[] = [
  { name: 'Aeron Chair, size B', unitPrice: 1395, inStock: 4 },
  { name: 'Motorised standing desk', unitPrice: 649, inStock: 12 },
  { name: 'Single monitor arm', unitPrice: 189, inStock: 30 },
];

const money = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2 });

export const OrderEditor = () => {
  const [qty, setQty] = useState<number[]>([1, 1, 2]);

  const setAt = (i: number, v?: number) =>
    setQty((prev) => prev.map((q, j) => (j === i ? (v ?? 0) : q)));

  const subtotal = CATALOG.reduce(
    (sum, p, i) => sum + p.unitPrice * qty[i],
    0,
  );
  const shipping = subtotal > 2000 ? 0 : 75;
  const total = subtotal + shipping;

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 540 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Order — line by line
        </Text>
        <Text block>
          Each quantity is a <Text code>NumberInput</Text> clamped between{' '}
          <Text code>1</Text> and the item&apos;s stock — over-typing is refused,
          not corrected after the fact. Line and order totals are plain derived
          values shown through a read-only, currency-formatted field.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="m">
        {CATALOG.map((p, i) => (
          <Flex key={p.name} direction="horizontal" gap="m" align="center">
            <Flex direction="vertical" gap="xxs" style={{ flex: 1, minWidth: 0 }}>
              <Text size={3} weight="medium" truncate>
                {p.name}
              </Text>
              <Text size={2} color="muted" nowrap>
                ${money(p.unitPrice)} each · {p.inStock} in stock
              </Text>
            </Flex>
            <Flex style={{ width: 104 }}>
              <NumberInput
                value={qty[i]}
                onChange={(v) => setAt(i, v)}
                min={1}
                max={p.inStock}
                size="s"
                aria-label={`Quantity of ${p.name}`}
              />
            </Flex>
            <Text
              size={3}
              weight="medium"
              nowrap
              style={{ width: 96, textAlign: 'right' }}
            >
              ${money(p.unitPrice * qty[i])}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Divider />

      <Flex direction="vertical" gap="xs">
        <Flex direction="horizontal" gap="m" align="center" justify="between">
          <Text size={2} color="muted">
            Subtotal
          </Text>
          <Text size={2} nowrap>
            ${money(subtotal)}
          </Text>
        </Flex>
        <Flex direction="horizontal" gap="m" align="center" justify="between">
          <Text size={2} color="muted">
            Shipping {shipping === 0 && '(free over $2,000)'}
          </Text>
          <Text size={2} nowrap>
            ${money(shipping)}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="horizontal" gap="m" align="center">
        <Text size={4} weight="bold" style={{ flex: 1 }}>
          Order total
        </Text>
        <Flex style={{ width: 180 }}>
          <NumberInput
            value={total}
            onChange={() => undefined}
            readOnly
            digitsAfterPoint={2}
            fixedDecimalScale
            groupingDelimiter=","
            aria-label="Order total"
          >
            <TextInput.TextIsland label="$" />
          </NumberInput>
        </Flex>
      </Flex>
    </Flex>
  );
};
