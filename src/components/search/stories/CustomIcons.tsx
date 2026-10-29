import { useState } from 'react';
import { Compass, XSquare } from 'lucide-react';
import { Flex, Text } from 'components';
import { Search } from '../Search.tsx';

export const CustomIcons = () => {
  const [query, setQuery] = useState('');

  return (
    <Flex orientation="vertical" gap="m" style={{ maxWidth: 460 }}>
      <Flex orientation="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Custom search and clear icons
        </Text>
        <Text block>
          <Text code>searchIcon</Text> / <Text code>clearIcon</Text> override
          the two icons this field renders itself. Left unset, they fall back
          to <Text code>Application.icons.search</Text> /{' '}
          <Text code>.clear</Text> — the same roles <Text code>Select</Text>{' '}
          uses for its own search mode and clear button.
        </Text>
      </Flex>

      <Search
        value={query}
        onChange={setQuery}
        placeholder="Explore destinations"
        searchIcon={<Compass />}
        clearIcon={<XSquare />}
      />
    </Flex>
  );
};
