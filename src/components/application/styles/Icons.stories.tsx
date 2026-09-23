import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Binoculars,
  CircleHelp,
  CircleX,
  Eraser,
  OctagonAlert,
  SquareChevronDown,
  SquareChevronUp,
  TriangleAlert,
} from 'lucide-react';
import { Application, Flex, Pagination, Select, Switch, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta = {
  title: 'Foundations/Icons',
  decorators: [StorybookDecorator],
};

export default story;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Code = ({ children }: { children: string }) => (
  <Text
    block
    code
    style={{
      display: 'block',
      padding: '12px 16px',
      background: 'var(--gray-a3)',
      borderRadius: 'var(--radius-s)',
      whiteSpace: 'pre-wrap',
    }}
  >
    {children}
  </Text>
);

const ROLES: Array<[string, string, string]> = [
  ['prev', 'ChevronLeft', 'Calendar, DatePicker, Pagination'],
  ['next', 'ChevronRight', 'Calendar, DatePicker, Pagination'],
  ['open', 'ChevronDown', 'ColorPicker, Select, CollapsedList'],
  ['close', 'ChevronUp', 'ColorPicker, Select, CollapsedList'],
  ['search', 'Search', 'Search, Select'],
  ['clear', 'Delete', 'Search, Select'],
  ['error', 'CircleAlert', 'AutocompleteInput, FilePicker'],
  ['help', 'HelpCircle', 'Form, Tooltip'],
  ['info', 'Info', 'Notifications, Result'],
  ['success', 'CheckCircle2', 'Notifications, Result'],
  ['warning', 'AlertTriangle', 'Notifications, Result'],
  ['danger', 'XCircle', 'Notifications, Result'],
];

const COUNTRIES = [
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
];

const LiveDemo = () => {
  const [custom, setCustom] = useState(false);
  const [country, setCountry] = useState<string | undefined>('us');

  const content = (
    <Flex gap="l" wrap align="center">
      <Pagination currentPage={3} totalPages={12} onChange={() => {}} />
      <div style={{ width: 200 }}>
        <Select
          name="demo-country"
          value={country}
          onChange={(value) => setCountry(value as string | undefined)}
          options={COUNTRIES}
          clearable
        />
      </div>
    </Flex>
  );

  return (
    <Flex orientation="vertical" gap="m">
      <Switch checked={custom} onChange={setCustom}>
        Use a custom icon set
      </Switch>
      {custom ? (
        <Application
          icons={{
            prev: <ArrowLeft />,
            next: <ArrowRight />,
            open: <SquareChevronDown />,
            close: <SquareChevronUp />,
            search: <Binoculars />,
            clear: <Eraser />,
            error: <OctagonAlert />,
            help: <CircleHelp />,
            success: <BadgeCheck />,
            warning: <TriangleAlert />,
            danger: <CircleX />,
          }}
        >
          {content}
        </Application>
      ) : (
        content
      )}
      <Text size={3} color="muted">
        <Text code>Pagination</Text>&rsquo;s prev/next arrows and{' '}
        <Text code>Select</Text>&rsquo;s open/close/clear icons all come
        from the same <Text code>icons</Text> prop on a nested{' '}
        <Text code>Application</Text> — toggle above to swap the whole set
        at once.
      </Text>
    </Flex>
  );
};

export const Overview: StoryObj = {
  name: 'Icons',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Icons
      </Text>
      <Paragraph>
        Components ship with <Text code>lucide-react</Text> icons baked in —
        chevrons, status glyphs, search/clear controls. A consumer bringing
        their own icon set would otherwise end up with a visual mismatch
        between Altrone&rsquo;s built-in icons and the rest of their app.
        Every built-in icon is overridable, through one of two mechanisms
        depending on whether it&rsquo;s shared by several components or
        unique to one.
      </Paragraph>

      <Heading>Shared roles — one override, everywhere</Heading>
      <Paragraph>
        Several components use the exact same icon for the exact same
        purpose — the prev/next chevrons in <Text code>Calendar</Text>,{' '}
        <Text code>DatePicker</Text> and <Text code>Pagination</Text>, for
        example. These are grouped into an <Text code>IconSet</Text> and
        overridden once, via the <Text code>icons</Text> prop on{' '}
        <Text code>Application</Text> — instead of separately on every
        component that happens to use the same glyph:
      </Paragraph>
      <Code>{`<Application icons={{ prev: <MyArrowLeft />, next: <MyArrowRight /> }}>
  <App />
</Application>`}</Code>
      <Paragraph>Available roles:</Paragraph>
      <Flex orientation="vertical" gap="xs">
        {ROLES.map(([role, def, usedBy]) => (
          <Text key={role} size={3} color="muted">
            <Text code>{role}</Text> — default <Text code>{def}</Text>,
            used by {usedBy}
          </Text>
        ))}
      </Flex>

      <Heading>Try it</Heading>
      <LiveDemo />

      <Heading>Icons unique to one component</Heading>
      <Paragraph>
        An icon that only ever appears in a single component isn&rsquo;t
        part of the shared set — merging it in would force every other
        consumer of that role to also change, or would silently change that
        one component&rsquo;s look the moment someone overrides an unrelated
        role. It stays a local prop on that component instead, e.g.{' '}
        <Text code>Button</Text>&rsquo;s <Text code>successIcon</Text>/
        <Text code>failedIcon</Text>, or a grouped{' '}
        <Text code>icons</Text> prop for components with several unique
        icons of their own (<Text code>DataTable</Text>,{' '}
        <Text code>Toolbar</Text>, <Text code>Splitter</Text>):
      </Paragraph>
      <Code>{`<Button state="succeeded" successIcon={<MyCheck />}>Save</Button>

<DataTable icons={{ sortAsc: <MyArrowUp />, sortDesc: <MyArrowDown /> }} {...rest} />`}</Code>
      <Paragraph>
        Every icon prop in the library — shared or local — takes an
        already-instantiated element (<Text code>{'<MyIcon />'}</Text>), the
        same convention every other icon-shaped prop in Altrone already
        follows.
      </Paragraph>
    </Flex>
  ),
};
