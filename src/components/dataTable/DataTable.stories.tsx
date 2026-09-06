import { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';
import { Flame, Pencil, RefreshCw, Trash } from 'lucide-react';
import { DataTable } from './index';
import { DataTableColumn, DataTableFilter } from './DataTable.types';
import { Flex } from '../flex';
import { Text } from '../text';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const meta: Meta<typeof DataTable<AnyRow>> = {
  component: DataTable,
  title: 'Components/Display/DataTable',
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ *
 * Demo data
 * ------------------------------------------------------------------ */

interface Employee {
  id: number;
  name: string;
  bio: string;
  role: string;
  department: string;
  active: boolean;
  age: number;
  salary: number;
  currency: string;
  hiredAt: string;
  password: string;
  color: string;
  skills: string[];
  profile: string;
}

type AnyRow = Record<string, unknown>;

const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Ada Lovelace', bio: 'Wrote the first algorithm intended for a machine.', role: 'Principal Engineer', department: 'R&D', active: true, age: 36, salary: 185_000, currency: 'USD', hiredAt: '2019-03-11', password: 'analyticalengine', color: '#3b82f6', skills: ['Math', 'Analysis'], profile: 'https://example.com/ada' },
  { id: 2, name: 'Alan Turing', bio: 'Formalised computation and the notion of an algorithm.', role: 'Research Lead', department: 'R&D', active: true, age: 41, salary: 172_000, currency: 'USD', hiredAt: '2018-06-01', password: 'enigma1940', color: '#22c55e', skills: ['Logic', 'Cryptography'], profile: 'https://example.com/alan' },
  { id: 3, name: 'Grace Hopper', bio: 'Pioneered machine-independent programming languages.', role: 'Staff Engineer', department: 'Platform', active: false, age: 52, salary: 160_500, currency: 'USD', hiredAt: '2016-11-23', password: 'nanoseconds', color: '#a855f7', skills: ['Compilers', 'COBOL'], profile: 'https://example.com/grace' },
  { id: 4, name: 'Katherine Johnson', bio: 'Calculated orbital mechanics for crewed spaceflight.', role: 'Senior Analyst', department: 'Data', active: true, age: 47, salary: 143_200, currency: 'USD', hiredAt: '2020-01-15', password: 'orbit1962', color: '#f59e0b', skills: ['Orbital Mechanics'], profile: 'https://example.com/katherine' },
  { id: 5, name: 'Edsger Dijkstra', bio: 'Shortest paths, structured programming, and sharp opinions.', role: 'Principal Engineer', department: 'Platform', active: true, age: 58, salary: 191_000, currency: 'EUR', hiredAt: '2015-09-02', password: 'goto considered', color: '#ef4444', skills: ['Algorithms', 'Verification'], profile: 'https://example.com/edsger' },
  { id: 6, name: 'Barbara Liskov', bio: 'Substitution principle and data abstraction.', role: 'Research Lead', department: 'R&D', active: true, age: 49, salary: 178_400, currency: 'USD', hiredAt: '2017-04-19', password: 'clu1974', color: '#14b8a6', skills: ['Type Systems', 'Distributed'], profile: 'https://example.com/barbara' },
  { id: 7, name: 'Donald Knuth', bio: 'The Art of Computer Programming, TeX, literate programming.', role: 'Distinguished Engineer', department: 'R&D', active: false, age: 63, salary: 205_000, currency: 'USD', hiredAt: '2014-02-28', password: 'literate', color: '#3b82f6', skills: ['Analysis', 'Typesetting'], profile: 'https://example.com/donald' },
  { id: 8, name: 'Radia Perlman', bio: 'Spanning Tree Protocol — "mother of the internet".', role: 'Staff Engineer', department: 'Networking', active: true, age: 45, salary: 168_900, currency: 'USD', hiredAt: '2019-08-05', password: 'spanningtree', color: '#22c55e', skills: ['Networking', 'Security'], profile: 'https://example.com/radia' },
  { id: 9, name: 'Leslie Lamport', bio: 'LaTeX, logical clocks, Paxos, TLA+.', role: 'Distinguished Engineer', department: 'Platform', active: true, age: 61, salary: 210_000, currency: 'EUR', hiredAt: '2013-12-11', password: 'happensbefore', color: '#a855f7', skills: ['Distributed', 'Verification'], profile: 'https://example.com/leslie' },
  { id: 10, name: 'Margaret Hamilton', bio: 'Led the Apollo on-board flight software team.', role: 'Senior Analyst', department: 'Data', active: true, age: 43, salary: 150_000, currency: 'USD', hiredAt: '2021-05-30', password: 'apollo11', color: '#f59e0b', skills: ['Reliability', 'Systems'], profile: 'https://example.com/margaret' },
  { id: 11, name: 'Vint Cerf', bio: 'Co-designed the TCP/IP protocols.', role: 'Research Lead', department: 'Networking', active: false, age: 57, salary: 182_000, currency: 'USD', hiredAt: '2016-07-14', password: 'tcpip', color: '#ef4444', skills: ['Networking', 'Protocols'], profile: 'https://example.com/vint' },
  { id: 12, name: 'Frances Allen', bio: 'Compiler optimisation, first woman to win the Turing Award.', role: 'Staff Engineer', department: 'Platform', active: true, age: 54, salary: 171_300, currency: 'USD', hiredAt: '2015-03-08', password: 'optimizer', color: '#14b8a6', skills: ['Compilers', 'Parallelism'], profile: 'https://example.com/frances' },
  { id: 13, name: 'Tim Berners-Lee', bio: 'Invented the World Wide Web.', role: 'Principal Engineer', department: 'R&D', active: true, age: 50, salary: 188_600, currency: 'EUR', hiredAt: '2018-10-01', password: 'hypertext', color: '#3b82f6', skills: ['Web', 'Standards'], profile: 'https://example.com/tim' },
  { id: 14, name: 'Shafi Goldwasser', bio: 'Foundations of modern cryptography.', role: 'Research Lead', department: 'R&D', active: true, age: 46, salary: 179_900, currency: 'USD', hiredAt: '2019-11-19', password: 'zeroknowledge', color: '#22c55e', skills: ['Cryptography', 'Complexity'], profile: 'https://example.com/shafi' },
  { id: 15, name: 'Ken Thompson', bio: 'Unix, B, Go, and the Thompson hack.', role: 'Distinguished Engineer', department: 'Platform', active: false, age: 62, salary: 206_500, currency: 'USD', hiredAt: '2012-01-09', password: 'reflections', color: '#a855f7', skills: ['Systems', 'Languages'], profile: 'https://example.com/ken' },
];

const RICH_COLUMNS: DataTableColumn<Employee>[] = [
  { accessor: 'name', label: 'Name', type: 'string', sortable: true, filterable: true },
  { accessor: 'role', label: 'Role', type: 'select', filterable: true, sortable: true },
  { accessor: 'department', label: 'Department', type: 'select', filterable: true },
  { accessor: 'active', label: 'Active', type: 'boolean', filterable: true, width: 90 },
  { accessor: 'age', label: 'Age', type: 'number', sortable: true, filterable: true, width: 90 },
  {
    accessor: 'salary',
    label: 'Salary',
    type: 'currency',
    sortable: true,
    filterable: true,
    width: 140,
    options: { currencyAccessor: 'currency' },
  },
  { accessor: 'hiredAt', label: 'Hired', type: 'date', sortable: true, filterable: true, width: 150 },
  { accessor: 'skills', label: 'Skills', type: 'select', filterable: true },
];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <Flex direction="vertical" gap="s">
    <Text size={4} weight="bold" block>
      {title}
    </Text>
    <Text block>{children}</Text>
  </Flex>
);

/* ------------------------------------------------------------------ *
 * Overview
 * ------------------------------------------------------------------ */

export const Overview: Story = {
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 900 }}>
      <Flex direction="vertical" gap="s">
        <Text size={6} weight="bold" block>
          DataTable
        </Text>
        <Text block>
          <Text code>DataTable</Text> is a thin wrapper around{' '}
          <Text code>@tanstack/react-table</Text>. You describe the data and a
          list of <Text code>columns</Text>; the component owns sorting,
          filtering, pagination and row selection, and picks a cell renderer per
          column <Text code>type</Text>. Everything below is one component with
          different props.
        </Text>
      </Flex>

      <Section title="Minimal usage">
        A column only needs an <Text code>accessor</Text>. Without a{' '}
        <Text code>type</Text> it renders as plain text.
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES}
        rowsPerPage={6}
        columns={[
          { accessor: 'name', label: 'Name' },
          { accessor: 'role', label: 'Role' },
          { accessor: 'department', label: 'Department' },
        ]}
      />
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Column types
 * ------------------------------------------------------------------ */

export const ColumnTypes: Story = {
  name: 'Column types & renderers',
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 1000 }}>
      <Section title="One renderer per type">
        The <Text code>type</Text> field selects the built-in renderer:{' '}
        <Text code>string</Text>, <Text code>text</Text>, <Text code>number</Text>
        , <Text code>currency</Text>, <Text code>date</Text>,{' '}
        <Text code>boolean</Text>, <Text code>select</Text>,{' '}
        <Text code>password</Text>, <Text code>color</Text>,{' '}
        <Text code>link</Text>. <Text code>number</Text>/<Text code>currency</Text>
        /<Text code>date</Text> format through the active locale;{' '}
        <Text code>currency</Text> can read its currency code from another field
        via <Text code>options.currencyAccessor</Text>.
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES}
        rowsPerPage={8}
        columns={[
          { accessor: 'name', label: 'string', type: 'string' },
          { accessor: 'bio', label: 'text', type: 'text', width: 240 },
          { accessor: 'age', label: 'number', type: 'number', width: 90 },
          {
            accessor: 'salary',
            label: 'currency',
            type: 'currency',
            width: 130,
            options: { currencyAccessor: 'currency' },
          },
          {
            accessor: 'hiredAt',
            label: 'date',
            type: 'date',
            width: 140,
            options: { level: 'month' },
          },
          { accessor: 'active', label: 'boolean', type: 'boolean', width: 90 },
          { accessor: 'skills', label: 'select', type: 'select' },
          { accessor: 'password', label: 'password', type: 'password' },
          { accessor: 'color', label: 'color', type: 'color', width: 80 },
          {
            accessor: 'profile',
            label: 'link',
            type: 'link',
            options: {
              textTransformer: (_value, item) => item.name,
            },
          },
        ]}
      />

      <Section title="Custom rendering">
        <Text code>type: 'custom'</Text> hands rendering back to you through{' '}
        <Text code>options.renderReadMode</Text> (and an optional{' '}
        <Text code>renderLoadingMode</Text>).
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES.slice(0, 6)}
        showFooter={false}
        columns={[
          {
            accessor: 'name',
            label: 'Employee',
            type: 'custom',
            options: {
              renderReadMode: ({ item }) => {
                const row = item as Employee;
                return (
                  <Flex direction="vertical">
                    <Text weight="bold">{row.name}</Text>
                    <Text size={3}>{row.role}</Text>
                  </Flex>
                );
              },
            },
          },
          { accessor: 'department', label: 'Department' },
        ]}
      />
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Sorting
 * ------------------------------------------------------------------ */

export const Sorting: Story = {
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 900 }}>
      <Section title="Click-to-sort">
        Set <Text code>sortable</Text> on a column to make its header
        interactive. Clicking cycles through{' '}
        <Text code>none → descending → ascending → none</Text>. Sorting is
        single-column. Seed it with <Text code>defaultSort</Text> and observe
        changes through <Text code>onSortChange</Text>.
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES}
        rowsPerPage={8}
        defaultSort={{ field: 'salary', direction: 'desc' }}
        columns={[
          { accessor: 'name', label: 'Name', sortable: true },
          { accessor: 'department', label: 'Department', sortable: true },
          { accessor: 'age', label: 'Age', type: 'number', sortable: true, width: 100 },
          {
            accessor: 'salary',
            label: 'Salary',
            type: 'currency',
            sortable: true,
            width: 140,
            options: { currencyAccessor: 'currency' },
          },
          { accessor: 'hiredAt', label: 'Hired', type: 'date', sortable: true, width: 150 },
        ]}
      />
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Filtering
 * ------------------------------------------------------------------ */

export const Filtering: Story = {
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 1000 }}>
      <Section title="The filter panel">
        Mark a column <Text code>filterable</Text> to expose it in the{' '}
        <Text code>Filters</Text> panel in the header. Each column type brings its
        own set of rules — text (<Text code>contains</Text>,{' '}
        <Text code>equals</Text>, <Text code>is empty</Text>…), number and date (
        <Text code>&gt;</Text>, <Text code>between</Text>…), boolean, and{' '}
        <Text code>select</Text>/<Text code>color</Text> (membership against the
        values present in the data). Pass <Text code>filterable</Text> a type
        string to filter a column as a different type than it renders.
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES}
        rowsPerPage={8}
        defaultFilters={[{ id: 'active', value: { rule: 'positive' } }]}
        columns={RICH_COLUMNS}
      />
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Pagination
 * ------------------------------------------------------------------ */

export const Pagination: Story = {
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 900 }}>
      <Section title="Footer pagination">
        <Text code>rowsPerPage</Text> sets the page size and{' '}
        <Text code>defaultPage</Text> the starting page (zero-based). The footer
        shows the page count and the row summary; hide it with{' '}
        <Text code>showFooter={'{false}'}</Text>. <Text code>onPageChange</Text>{' '}
        reports the new page (one-based).
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES}
        rowsPerPage={4}
        defaultPage={1}
        columns={[
          { accessor: 'name', label: 'Name' },
          { accessor: 'role', label: 'Role' },
          { accessor: 'department', label: 'Department' },
        ]}
      />
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Row selection
 * ------------------------------------------------------------------ */

export const RowSelection: Story = {
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 900 }}>
      <Section title="Selecting rows">
        <Text code>selectable</Text> adds a toggle to the header; turning it on
        reveals a checkbox column and switches the footer to a selection count.
        Start already in selection mode with <Text code>mode="select"</Text>.
        Toolbar content passed as a function receives{' '}
        <Text code>{'{ selectableMode, selectedItems }'}</Text>.
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES}
        rowsPerPage={8}
        selectable
        mode="select"
        columns={[
          { accessor: 'name', label: 'Name' },
          { accessor: 'role', label: 'Role' },
          { accessor: 'department', label: 'Department' },
        ]}
      >
        {({ selectableMode, selectedItems }) =>
          selectableMode ? (
            <DataTable.Action
              label={`Email ${selectedItems.length} selected`}
              onClick={() => undefined}
            />
          ) : (
            <></>
          )
        }
      </DataTable>
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Toolbar & row actions
 * ------------------------------------------------------------------ */

export const Actions: Story = {
  name: 'Toolbar & row actions',
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 1000 }}>
      <Section title="Toolbar actions">
        Any element passed as a child renders in the header next to the filter
        button. <Text code>DataTable.Action</Text> is a pre-wired{' '}
        <Text code>Button</Text> that disables itself while the table is loading.
      </Section>

      <Section title="Per-row actions">
        <Text code>renderRowActions</Text> adds a trailing actions column. Return
        a <Text code>DataTable.RowActions</Text> with{' '}
        <Text code>DataTable.RowAction</Text> children; mark the less important
        ones <Text code>collapsed</Text> and they fold into an overflow menu.
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES}
        rowsPerPage={8}
        selectable
        renderRowActions={({ rowIndex, selected }) => (
          <DataTable.RowActions>
            <DataTable.RowAction
              label="Edit"
              icon={<Pencil />}
              showLabel={false}
              onClick={() => undefined}
            />
            <DataTable.RowAction
              label="Promote"
              collapsed
              icon={<Flame />}
              onClick={() => undefined}
            />
            {selected ? (
              <DataTable.RowAction
                label="Make admin"
                collapsed
                onClick={() => undefined}
              />
            ) : null}
            <DataTable.RowAction
              label={`Delete #${rowIndex}`}
              collapsed
              danger
              icon={<Trash />}
              onClick={() => undefined}
            />
          </DataTable.RowActions>
        )}
        columns={[
          { accessor: 'name', label: 'Name' },
          { accessor: 'role', label: 'Role' },
          { accessor: 'department', label: 'Department' },
        ]}
      >
        <DataTable.Action label="Add employee" onClick={() => undefined} />
      </DataTable>
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Loading mode
 * ------------------------------------------------------------------ */

export const LoadingMode: Story = {
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 900 }}>
      <Section title="Skeleton rows">
        <Text code>mode="loading"</Text> swaps every cell for a type-appropriate
        skeleton and disables the toolbar. Use it between server requests while
        keeping the layout stable.
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES.slice(0, 6)}
        mode="loading"
        rowsPerPage={6}
        columns={RICH_COLUMNS}
      />
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Column resizing
 * ------------------------------------------------------------------ */

export const ColumnResizing: Story = {
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 1000 }}>
      <Section title="Draggable column edges">
        <Text code>resizableColumns</Text> lets every column be resized by
        dragging the handle on its right edge (hover a header to reveal it). Opt a
        single column out with <Text code>resizable={'{false}'}</Text> on its
        definition.
      </Section>

      <DataTable<Employee>
        data={EMPLOYEES}
        rowsPerPage={8}
        resizableColumns
        columns={[
          { accessor: 'name', label: 'Name', width: 180 },
          { accessor: 'bio', label: 'Bio', type: 'text', width: 280 },
          { accessor: 'role', label: 'Role', width: 180 },
          { accessor: 'department', label: 'Department', width: 140, resizable: false },
        ]}
      />
    </Flex>
  ),
};

/* ------------------------------------------------------------------ *
 * Server-driven table
 * ------------------------------------------------------------------ */

export const ServerCallbacks: Story = {
  name: 'Server-driven table',
  render: () => {
    const [log, setLog] = useState<string[]>([]);
    const [mode, setMode] = useState<'read' | 'loading'>('read');

    const record = (line: string) => {
      setLog((prev) => [line, ...prev].slice(0, 6));
      setMode('loading');
      window.setTimeout(() => setMode('read'), 400);
    };

    return (
      <Flex direction="vertical" gap="xl" style={{ maxWidth: 1000 }}>
        <Section title="Reacting to state changes">
          <Text code>onPageChange</Text>, <Text code>onSortChange</Text> and{' '}
          <Text code>onFilterChange</Text> fire on user interaction only (never on
          mount). A real app would issue a request here and flip{' '}
          <Text code>mode</Text> to <Text code>loading</Text> until it resolves —
          which is what this demo fakes.
        </Section>

        <DataTable<Employee>
          data={EMPLOYEES}
          mode={mode}
          rowsPerPage={5}
          defaultSort={{ field: 'name', direction: 'asc' }}
          onPageChange={(page) => record(`page → ${page}`)}
          onSortChange={(sort) =>
            record(
              sort
                ? `sort → ${sort.field} ${sort.direction}`
                : 'sort → cleared',
            )
          }
          onFilterChange={(filters: DataTableFilter[]) =>
            record(`filters → ${filters.length} active`)
          }
          columns={RICH_COLUMNS}
        >
          <DataTable.Action
            label="Refresh"
            icon={<RefreshCw />}
            onClick={() => record('manual refresh')}
          />
        </DataTable>

        <Flex direction="vertical" gap="xs">
          <Text weight="bold" block>
            Event log
          </Text>
          {log.length === 0 ? (
            <Text block>No events yet — interact with the table.</Text>
          ) : (
            log.map((line, index) => (
              <Text key={index} code block>
                {line}
              </Text>
            ))
          )}
        </Flex>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ *
 * Empty state
 * ------------------------------------------------------------------ */

export const EmptyState: Story = {
  render: () => (
    <Flex direction="vertical" gap="xl" style={{ maxWidth: 900 }}>
      <Section title="No rows">
        When <Text code>data</Text> is empty (or every row is filtered out) the
        body shows an empty banner. Suppress it with{' '}
        <Text code>showEmptyBanner={'{false}'}</Text>.
      </Section>

      <DataTable<Employee>
        data={[]}
        columns={[
          { accessor: 'name', label: 'Name' },
          { accessor: 'role', label: 'Role' },
        ]}
      />
    </Flex>
  ),
};
