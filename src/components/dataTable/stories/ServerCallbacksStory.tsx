import { StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { useState } from 'react';
import { DataTable } from '../DataTable.tsx';
import { Filter, Sorting } from '../DataTable.types.ts';
import { RefreshCw } from 'lucide-react';

type StarSystem = {
  id: number;
  name: string;
  constellation: string;
  type: string;
  distanceLy: number;
  planets: number;
  discovered: string;
  hasStation: boolean;
};

const STAR_SYSTEMS: StarSystem[] = [
  { id: 1,  name: 'Alpha Centauri',   constellation: 'Centaurus',    type: 'Binary',       distanceLy: 4.37,  planets: 1,  discovered: '1689-01-01', hasStation: true  },
  { id: 2,  name: 'Barnard\'s Star',  constellation: 'Ophiuchus',    type: 'Red Dwarf',    distanceLy: 5.96,  planets: 1,  discovered: '1916-01-01', hasStation: false },
  { id: 3,  name: 'Wolf 359',         constellation: 'Leo',          type: 'Red Dwarf',    distanceLy: 7.78,  planets: 0,  discovered: '1917-01-01', hasStation: false },
  { id: 4,  name: 'Lalande 21185',    constellation: 'Ursa Major',   type: 'Red Dwarf',    distanceLy: 8.29,  planets: 2,  discovered: '1801-01-01', hasStation: false },
  { id: 5,  name: 'Sirius',           constellation: 'Canis Major',  type: 'Binary',       distanceLy: 8.58,  planets: 0,  discovered: '1844-01-01', hasStation: true  },
  { id: 6,  name: 'BL Ceti',         constellation: 'Cetus',        type: 'Binary',       distanceLy: 8.73,  planets: 0,  discovered: '1948-01-01', hasStation: false },
  { id: 7,  name: 'Ross 154',         constellation: 'Sagittarius',  type: 'Red Dwarf',    distanceLy: 9.68,  planets: 0,  discovered: '1925-01-01', hasStation: false },
  { id: 8,  name: 'Ross 248',         constellation: 'Andromeda',    type: 'Red Dwarf',    distanceLy: 10.32, planets: 0,  discovered: '1926-01-01', hasStation: false },
  { id: 9,  name: 'Epsilon Eridani',  constellation: 'Eridanus',     type: 'Orange Dwarf', distanceLy: 10.48, planets: 1,  discovered: '1983-01-01', hasStation: true  },
  { id: 10, name: 'Lacaille 9352',    constellation: 'Piscis',       type: 'Red Dwarf',    distanceLy: 10.74, planets: 0,  discovered: '1804-01-01', hasStation: false },
  { id: 11, name: 'Ross 128',         constellation: 'Virgo',        type: 'Red Dwarf',    distanceLy: 10.89, planets: 1,  discovered: '1926-01-01', hasStation: false },
  { id: 12, name: 'EZ Aquarii',       constellation: 'Aquarius',     type: 'Triple',       distanceLy: 11.10, planets: 0,  discovered: '1951-01-01', hasStation: false },
  { id: 13, name: 'Procyon',          constellation: 'Canis Minor',  type: 'Binary',       distanceLy: 11.46, planets: 0,  discovered: '1844-01-01', hasStation: true  },
  { id: 14, name: '61 Cygni',         constellation: 'Cygnus',       type: 'Binary',       distanceLy: 11.40, planets: 0,  discovered: '1792-01-01', hasStation: false },
  { id: 15, name: 'Struve 2398',      constellation: 'Draco',        type: 'Binary',       distanceLy: 11.52, planets: 0,  discovered: '1830-01-01', hasStation: false },
  { id: 16, name: 'Groombridge 34',   constellation: 'Andromeda',    type: 'Binary',       distanceLy: 11.62, planets: 0,  discovered: '1860-01-01', hasStation: false },
  { id: 17, name: 'DX Cancri',        constellation: 'Cancer',       type: 'Red Dwarf',    distanceLy: 11.83, planets: 0,  discovered: '1979-01-01', hasStation: false },
  { id: 18, name: 'Tau Ceti',         constellation: 'Cetus',        type: 'Yellow Dwarf', distanceLy: 11.89, planets: 5,  discovered: '1864-01-01', hasStation: true  },
  { id: 19, name: 'Epsilon Indi',     constellation: 'Indus',        type: 'Triple',       distanceLy: 11.87, planets: 1,  discovered: '1847-01-01', hasStation: false },
  { id: 20, name: 'GJ 1061',          constellation: 'Horologium',   type: 'Red Dwarf',    distanceLy: 11.99, planets: 3,  discovered: '1985-01-01', hasStation: false },
  { id: 21, name: 'YZ Ceti',          constellation: 'Cetus',        type: 'Red Dwarf',    distanceLy: 12.13, planets: 3,  discovered: '1934-01-01', hasStation: false },
  { id: 22, name: 'Luyten\'s Star',   constellation: 'Canis Minor',  type: 'Red Dwarf',    distanceLy: 12.36, planets: 2,  discovered: '1935-01-01', hasStation: false },
  { id: 23, name: 'Teegarden\'s Star',constellation: 'Aries',        type: 'Red Dwarf',    distanceLy: 12.43, planets: 2,  discovered: '2003-01-01', hasStation: false },
  { id: 24, name: 'SCR 1845',         constellation: 'Pavo',         type: 'Binary',       distanceLy: 12.57, planets: 0,  discovered: '2003-01-01', hasStation: false },
  { id: 25, name: 'Kapteyn\'s Star',  constellation: 'Pictor',       type: 'Red Dwarf',    distanceLy: 12.78, planets: 2,  discovered: '1898-01-01', hasStation: false },
  { id: 26, name: 'Lacaille 8760',    constellation: 'Microscopium', type: 'Orange Dwarf', distanceLy: 12.87, planets: 0,  discovered: '1763-01-01', hasStation: false },
  { id: 27, name: 'Proxima Centauri', constellation: 'Centaurus',    type: 'Red Dwarf',    distanceLy: 4.24,  planets: 3,  discovered: '1915-01-01', hasStation: true  },
  { id: 28, name: 'Kruger 60',        constellation: 'Cepheus',      type: 'Binary',       distanceLy: 13.15, planets: 0,  discovered: '1890-01-01', hasStation: false },
  { id: 29, name: 'DEN 1048',         constellation: 'Antlia',       type: 'Red Dwarf',    distanceLy: 13.17, planets: 0,  discovered: '2000-01-01', hasStation: false },
  { id: 30, name: 'UGPS 0722',        constellation: 'Gemini',       type: 'Brown Dwarf',  distanceLy: 13.43, planets: 0,  discovered: '2010-01-01', hasStation: false },
];

type LogEntry = {
  time: string;
  type: 'page' | 'sort' | 'filter';
  message: string;
};

const TYPE_COLOR: Record<LogEntry['type'], string> = {
  page:   '#0ea5e9',
  sort:   '#8b5cf6',
  filter: '#f59e0b',
};

export const ServerCallbacksStory: StoryObj<typeof Flex> = {
  name: 'Star Catalogue — Server Callback Simulation',
  render: () => {
    const [mode, setMode] = useState<'read' | 'loading'>('read');
    const [log, setLog] = useState<LogEntry[]>([]);
    const [requestCount, setRequestCount] = useState(0);

    const flash = (entry: Omit<LogEntry, 'time'>) => {
      const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
      setLog((prev) => [{ ...entry, time }, ...prev].slice(0, 6));
      setRequestCount((n) => n + 1);
      setMode('loading');
      // Simulate variable network latency (200–700 ms)
      setTimeout(() => setMode('read'), 200 + Math.random() * 500);
    };

    const handleSortChange = (sort?: Sorting) => {
      flash({
        type: 'sort',
        message: sort
          ? `ORDER BY ${sort.field} ${sort.direction.toUpperCase()}`
          : 'ORDER BY id ASC (default)',
      });
    };

    const handleFilterChange = (filters?: Filter[]) => {
      const count = filters?.length ?? 0;
      flash({
        type: 'filter',
        message:
          count === 0
            ? 'WHERE — (no filters)'
            : `WHERE — ${count} filter condition${count > 1 ? 's' : ''} applied`,
      });
    };

    const handlePageChange = (page: number) => {
      flash({
        type: 'page',
        message: `OFFSET ${page * 8} LIMIT 8  (page ${page + 1})`,
      });
    };

    return (
      <Flex direction="vertical" gap="l">
        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold">
            Star Catalogue — Nearby Systems within 14 ly
          </Text>
          <Text style={{ color: 'var(--text-1)' }}>
            Every page change, sort and filter triggers a simulated API call with
            random latency (200–700 ms). The server log below shows the generated
            SQL-like query. Total API calls this session:{' '}
            <strong>{requestCount}</strong>
          </Text>
        </Flex>

        <DataTable
          data={STAR_SYSTEMS}
          mode={mode}
          rowsPerPage={8}
          defaultSort={{ field: 'distanceLy', direction: 'asc' }}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
          columns={[
            {
              accessor: 'name',
              label: 'Star System',
              type: 'string',
              filterable: true,
            },
            {
              accessor: 'constellation',
              label: 'Constellation',
              type: 'select',
              filterable: true,
              width: 150,
            },
            {
              accessor: 'type',
              label: 'Type',
              type: 'select',
              filterable: true,
              sortable: true,
              width: 140,
            },
            {
              accessor: 'distanceLy',
              label: 'Distance (ly)',
              type: 'number',
              sortable: true,
              filterable: true,
              width: 130,
              options: { digitsAfterPoint: 2 },
            },
            {
              accessor: 'planets',
              label: 'Planets',
              type: 'number',
              sortable: true,
              filterable: true,
              width: 90,
            },
            {
              accessor: 'discovered',
              label: 'Discovered',
              type: 'date',
              sortable: true,
              filterable: true,
              width: 120,
              options: { level: 'year' },
            },
            {
              accessor: 'hasStation',
              label: 'Station',
              type: 'boolean',
              filterable: true,
              width: 80,
            },
          ]}
        >
          <DataTable.Action
            label="Refresh"
            icon={<RefreshCw size={14} />}
            onClick={() =>
              flash({ type: 'page', message: 'SELECT * — full refresh' })
            }
          />
        </DataTable>

        {/* Server log panel */}
        {log.length > 0 && (
          <div
            style={{
              background: '#0f172a',
              borderRadius: 10,
              padding: '12px 16px',
              fontFamily: 'monospace',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: '#475569',
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              SERVER LOG
            </Text>
            {log.map((entry, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'baseline',
                  opacity: 1 - i * 0.15,
                }}
              >
                <span style={{ fontSize: 11, color: '#475569', flexShrink: 0 }}>
                  {entry.time}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: TYPE_COLOR[entry.type],
                    textTransform: 'uppercase',
                    width: 44,
                    flexShrink: 0,
                  }}
                >
                  {entry.type}
                </span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>
                  {entry.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </Flex>
    );
  },
};
