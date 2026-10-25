import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Avatar,
  BottomNavigation,
  Box,
  DataTable,
  Divider,
  Flex,
  Message,
  NavigationList,
  Progress,
  Screen,
  Tags,
  Text,
  Toolbar,
} from 'components';
import { allModes } from '../../.storybook/modes.ts';
import { screenMeta } from './shared.tsx';
import {
  Anchor,
  Bell,
  Boxes,
  CircleHelp,
  Container,
  FileText,
  Gauge,
  LayoutDashboard,
  Map,
  PanelRight,
  Plus,
  Search,
  Settings,
  Ship,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Applications/Harbor',
  parameters: {
    ...screenMeta.parameters,
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export default meta;

interface Shipment {
  id: string;
  route: string;
  carrier: string;
  status: string;
  eta: string;
  value: number;
}

const SHIPMENTS: Shipment[] = [
  {
    id: 'HB-20841',
    route: 'Rotterdam → Singapore',
    carrier: 'Maersk Line',
    status: 'In transit',
    eta: '2026-10-28',
    value: 184200,
  },
  {
    id: 'HB-20838',
    route: 'Hamburg → New York',
    carrier: 'Hapag-Lloyd',
    status: 'At customs',
    eta: '2026-10-23',
    value: 96750,
  },
  {
    id: 'HB-20836',
    route: 'Shenzhen → Los Angeles',
    carrier: 'COSCO',
    status: 'In transit',
    eta: '2026-11-02',
    value: 241900,
  },
  {
    id: 'HB-20829',
    route: 'Antwerp → Santos',
    carrier: 'MSC',
    status: 'Delayed',
    eta: '2026-10-31',
    value: 73400,
  },
  {
    id: 'HB-20824',
    route: 'Busan → Vancouver',
    carrier: 'ONE',
    status: 'Delivered',
    eta: '2026-10-18',
    value: 128300,
  },
  {
    id: 'HB-20817',
    route: 'Genoa → Alexandria',
    carrier: 'CMA CGM',
    status: 'In transit',
    eta: '2026-10-25',
    value: 59800,
  },
  {
    id: 'HB-20812',
    route: 'Valencia → Tangier',
    carrier: 'MSC',
    status: 'At customs',
    eta: '2026-10-22',
    value: 41200,
  },
];

const STATS = [
  { label: 'Active shipments', value: '1,284', delta: '+4.2%' },
  { label: 'On-time rate', value: '96.8%', delta: '+1.1%' },
  { label: 'Containers at sea', value: '412', delta: '−12' },
  { label: 'Avg. transit time', value: '17.4 d', delta: '−0.6 d' },
];

const DOCK = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard /> },
  { id: 'map', label: 'Live map', icon: <Map /> },
  { id: 'fleet', label: 'Fleet', icon: <Ship /> },
  { id: 'warehouses', label: 'Warehouses', icon: <Warehouse /> },
];

export const HarborApp: StoryObj<typeof Screen> = {
  name: 'Harbor',
  render: () => {
    const [dock, setDock] = useState('overview');
    const [inspectorCollapsed, setInspectorCollapsed] = useState(false);

    return (
      <Screen title="Overview" size="xl">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            <Toolbar.Leading>
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction />
              </Toolbar.Group>
              <Toolbar.Title title="Overview" />
            </Toolbar.Leading>
            <Toolbar.Center>
              <Toolbar.Action
                label="Search shipments, vessels, ports"
                icon={<Search />}
                kbd="⌘K"
              />
            </Toolbar.Center>
            <Toolbar.Trailing>
              <Toolbar.Group>
                <Toolbar.Action label="New shipment" icon={<Plus />} />
                <Toolbar.Action
                  label="Notifications"
                  icon={<Bell />}
                  showLabel={false}
                />
                <Toolbar.Action
                  label={inspectorCollapsed ? 'Show details' : 'Hide details'}
                  icon={<PanelRight />}
                  showLabel={false}
                  onClick={() => setInspectorCollapsed((c) => !c)}
                />
              </Toolbar.Group>
              <Toolbar.Separator variant="line" />
              <Avatar firstName="Mara" lastName="Okafor" size="s" />
            </Toolbar.Trailing>
          </Toolbar>
        </Screen.Header>

        <Screen.Sidebar>
          <NavigationList>
            <NavigationList.Header>
              <Flex align="center" gap="m">
                <Box
                  shape="circle"
                  tone="accent"
                  style={{
                    width: 36,
                    height: 36,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Anchor size={20} />
                </Box>
                <Flex orientation="vertical">
                  <Text weight="bold">Harbor</Text>
                  <Text size={2} color="muted">
                    Freight control tower
                  </Text>
                </Flex>
              </Flex>
            </NavigationList.Header>
            <NavigationList.Group title="Operations">
              <NavigationList.Link
                href="#"
                icon={<LayoutDashboard />}
                label="Overview"
                selected
              />
              <NavigationList.Link
                href="#"
                icon={<Container />}
                label="Shipments"
                badge="128"
              />
              <NavigationList.Link href="#" icon={<Ship />} label="Vessels" />
              <NavigationList.Link href="#" icon={<Truck />} label="Trucking" />
              <NavigationList.Link
                href="#"
                icon={<Warehouse />}
                label="Warehouses"
              />
            </NavigationList.Group>
            <NavigationList.Group title="Insights">
              <NavigationList.Link
                href="#"
                icon={<Gauge />}
                label="Performance"
              />
              <NavigationList.Link
                href="#"
                icon={<Boxes />}
                label="Inventory"
              />
              <NavigationList.Link
                href="#"
                icon={<FileText />}
                label="Reports"
              />
            </NavigationList.Group>
            <NavigationList.Group title="Workspace">
              <NavigationList.Link href="#" icon={<Users />} label="Team" />
              <NavigationList.Link
                href="#"
                icon={<Settings />}
                label="Settings"
              />
              <NavigationList.Link
                href="#"
                icon={<CircleHelp />}
                label="Support"
              />
            </NavigationList.Group>
            <NavigationList.Footer>
              <Flex align="center" gap="m">
                <Avatar firstName="Mara" lastName="Okafor" />
                <Flex orientation="vertical">
                  <Text weight="bold">Mara Okafor</Text>
                  <Text size={2} color="muted">
                    Logistics lead
                  </Text>
                </Flex>
              </Flex>
            </NavigationList.Footer>
          </NavigationList>
        </Screen.Sidebar>

        <Screen.Content>
          <Flex orientation="vertical" gap="l">
            <Flex orientation="vertical" gap="xs">
              <Text block size={8} weight="bold">
                Good morning, Mara
              </Text>
              <Text block size={4} color="muted">
                Here is what is moving through your network today.
              </Text>
            </Flex>

            <Message
              severity="warning"
              title="Port congestion in Santos"
              compact
            >
              Shipment HB-20829 is running 2 days behind schedule. Rerouting
              options are ready for review.
            </Message>

            <Flex gap="m" wrap>
              {STATS.map((stat) => (
                <Box
                  key={stat.label}
                  material="plate"
                  radius="var(--radius-l)"
                  elevation="raised"
                  style={{ flex: '1 1 150px', padding: 20 }}
                >
                  <Flex orientation="vertical" gap="xs">
                    <Text size={2} color="muted">
                      {stat.label}
                    </Text>
                    <Text size={8} weight="bold">
                      {stat.value}
                    </Text>
                    <Text size={2} color="success">
                      {stat.delta} this week
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Flex>

            <Text block size={6} weight="bold">
              Recent shipments
            </Text>
            <DataTable<Shipment>
              data={SHIPMENTS.slice(0, 4)}
              showFooter={false}
              columns={[
                { accessor: 'id', label: 'Shipment', width: 110 },
                { accessor: 'route', label: 'Route', width: 200 },
                { accessor: 'carrier', label: 'Carrier', width: 130 },
                { accessor: 'status', label: 'Status', width: 110 },
                {
                  accessor: 'eta',
                  label: 'ETA',
                  type: 'date',
                  width: 160,
                },
                {
                  accessor: 'value',
                  label: 'Cargo value',
                  type: 'currency',
                  width: 130,
                  options: { currency: 'USD' },
                },
              ]}
            />
          </Flex>
        </Screen.Content>

        <Screen.Aside collapsed={inspectorCollapsed}>
          <Flex orientation="vertical" gap="l">
            <Flex orientation="vertical" gap="xs">
              <Text size={2} color="muted">
                Selected shipment
              </Text>
              <Text size={6} weight="bold">
                HB-20841
              </Text>
              <Text color="muted">Rotterdam → Singapore</Text>
            </Flex>
            <Tags>
              <Tags.Item label="Reefer" />
              <Tags.Item label="Priority" />
              <Tags.Item label="Insured" />
            </Tags>
            <Flex orientation="vertical" gap="s">
              <Text size={2} color="muted">
                Voyage progress
              </Text>
              <Progress value={62} />
              <Text size={2} color="muted">
                Currently in the Red Sea · ETA 28 Oct
              </Text>
            </Flex>
            <Divider />
            <Flex orientation="vertical" gap="m">
              <Text weight="bold">Account manager</Text>
              <Flex align="center" gap="m">
                <Avatar firstName="Jonas" lastName="Lindqvist" />
                <Flex orientation="vertical">
                  <Text>Jonas Lindqvist</Text>
                  <Text size={2} color="muted">
                    jonas@harbor.example
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Screen.Aside>

        <Screen.Footer>
          <Flex justify="between" align="center">
            <Text size={2} color="muted">
              All systems operational · Synced 12 seconds ago
            </Text>
            <Text size={2} color="muted">
              Harbor 4.2 · EU-West
            </Text>
          </Flex>
        </Screen.Footer>

        <Screen.BottomNavigation>
          <BottomNavigation>
            {DOCK.map((item) => (
              <BottomNavigation.Link
                key={item.id}
                href="#"
                icon={item.icon}
                label={item.label}
                selected={dock === item.id}
                onClick={(event) => {
                  event.preventDefault();
                  setDock(item.id);
                }}
              />
            ))}
          </BottomNavigation>
        </Screen.BottomNavigation>
      </Screen>
    );
  },
};
