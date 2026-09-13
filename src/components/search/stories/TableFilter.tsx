import { useMemo, useState } from 'react';
import { Flex, Text } from 'components';
import { Search } from '../Search.tsx';

interface Member {
  name: string;
  email: string;
  role: string;
}

const TEAM: Member[] = [
  { name: 'Ada Okafor', email: 'ada@acme.io', role: 'Owner' },
  { name: 'Bruno Lima', email: 'bruno@acme.io', role: 'Admin' },
  { name: 'Chen Wei', email: 'chen@acme.io', role: 'Developer' },
  { name: 'Dita Novak', email: 'dita@acme.io', role: 'Developer' },
  { name: 'Ewan Fraser', email: 'ewan@acme.io', role: 'Billing' },
  { name: 'Farida Aziz', email: 'farida@acme.io', role: 'Viewer' },
  { name: 'Georgi Petrov', email: 'georgi@acme.io', role: 'Developer' },
];

export const TableFilter = () => {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEAM;
    return TEAM.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <Flex direction="vertical" gap="m" style={{ maxWidth: 460 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Filtering a list
        </Text>
        <Text block>
          Not every <Text weight="bold">Search</Text> has a dropdown. With no{' '}
          <Text code>getSuggestions</Text> it&apos;s just the search-styled
          field — leading icon, placeholder overlay, and a clear button that
          appears once there&apos;s something to clear — driving a filter over
          the rows below.
        </Text>
      </Flex>

      <Search
        value={query}
        onChange={setQuery}
        placeholder="Filter members"
      />

      <Flex direction="horizontal" gap="m" align="center" justify="between">
        <Text size={2} color="muted">
          {rows.length} of {TEAM.length}
        </Text>
        {query && (
          <Text size={2} color="muted">
            matching “{query}”
          </Text>
        )}
      </Flex>

      <Flex direction="vertical" gap="none">
        {rows.map((m) => (
          <Flex
            key={m.email}
            direction="horizontal"
            gap="m"
            align="center"
            style={{
              padding: '8px 0',
              borderTop: '1px solid var(--border-a1)',
            }}
          >
            <Flex direction="vertical" style={{ flex: 1, minWidth: 0 }}>
              <Text size={3} truncate>
                {m.name}
              </Text>
              <Text size={2} color="muted" truncate>
                {m.email}
              </Text>
            </Flex>
            <Text size={2} color="muted" nowrap>
              {m.role}
            </Text>
          </Flex>
        ))}
        {rows.length === 0 && (
          <Text size={2} color="muted" block style={{ padding: '12px 0' }}>
            No members match that filter.
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
