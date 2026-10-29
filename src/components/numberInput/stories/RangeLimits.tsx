import { useState } from 'react';
import { Flex, Text } from 'components';
import { NumberInput } from '../NumberInput.tsx';

export const RangeLimits = () => {
  const [age, setAge] = useState<number | undefined>();
  const [temperature, setTemperature] = useState<number | undefined>();

  return (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 480 }}>
      <Flex orientation="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Range limits
        </Text>
        <Text block>
          <Text code>min</Text> and <Text code>max</Text> don't get in the way
          of typing. A number below <Text code>min</Text> is accepted on the way
          to a valid one — with <Text code>min=18</Text>, typing{' '}
          <Text code>2</Text> then <Text code>25</Text> just works. Once the
          field loses focus, an out-of-range value snaps to the nearest bound
          and <Text code>onChange</Text> reports it.
        </Text>
        <Text block>
          Keys are refused only when no further digit could bring the number
          back into range: past <Text code>max=120</Text>, typing{' '}
          <Text code>1200</Text> stops at <Text code>120</Text>.
        </Text>
      </Flex>

      <Flex orientation="vertical" gap="xs">
        <Text size={2} weight="medium" block>
          Age (18–120)
        </Text>
        <Flex style={{ width: 160 }}>
          <NumberInput
            value={age}
            onChange={setAge}
            min={18}
            max={120}
            digitsAfterPoint={0}
            placeholder="Age"
            aria-label="Age"
          />
        </Flex>
        <Text size={2} color="muted">
          onChange value: {age ?? '—'}
        </Text>
      </Flex>

      <Flex orientation="vertical" gap="xs">
        <Text size={2} weight="medium" block>
          Fridge temperature, °C (−30–10)
        </Text>
        <Text block>
          Negative ranges work the same way with <Text code>allowNegative</Text>
          : <Text code>-</Text> and <Text code>-5</Text> are fine on the way,
          and anything below <Text code>-30</Text> is refused.
        </Text>
        <Flex style={{ width: 160 }}>
          <NumberInput
            value={temperature}
            onChange={setTemperature}
            allowNegative
            min={-30}
            max={10}
            digitsAfterPoint={1}
            placeholder="Temperature"
            aria-label="Fridge temperature"
          />
        </Flex>
        <Text size={2} color="muted">
          onChange value: {temperature ?? '—'}
        </Text>
      </Flex>
    </Flex>
  );
};
