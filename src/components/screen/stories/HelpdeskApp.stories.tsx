import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';
import {
  AtSign,
  Check,
  Eye,
  Inbox,
  Mail,
  MessageCircle,
  Phone,
  Pin,
  PinOff,
  Plus,
  Ticket as TicketIcon,
  Users,
} from 'lucide-react';
import {
  Avatar,
  Box,
  Button,
  DataTable,
  DataTableColumn,
  Divider,
  Drawer,
  Flex,
  Label,
  NavigationList,
  Option,
  Progress,
  Screen,
  Select,
  Skeleton,
  Text,
  Toolbar,
} from 'components';
import { dayjsInstance as dayjs } from 'utils';
import { Card, screenMeta } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Helpdesk',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/* ── JSONPlaceholder (https://jsonplaceholder.typicode.com) — public, no key, CORS-enabled ── */

interface RawComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

type TicketStatus = 'open' | 'pending' | 'resolved';
type TicketPriority = 'low' | 'medium' | 'high';
type TicketChannel = 'email' | 'chat' | 'social' | 'phone';
type Page = 'overview' | 'tickets' | 'team';

interface Ticket {
  id: number;
  customer: string;
  email: string;
  subject: string;
  body: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  agent: string;
  receivedAt: string;
}

const API = 'https://jsonplaceholder.typicode.com';
const AGENTS = [
  'Nadia Farouk',
  'Theo Laurent',
  'Priya Nair',
  'Marcus Webb',
  'Sofia Reyes',
];
const STATUSES: TicketStatus[] = ['open', 'pending', 'resolved'];
const PRIORITIES: TicketPriority[] = ['low', 'medium', 'high'];
const CHANNELS: TicketChannel[] = ['email', 'chat', 'social', 'phone'];
const ANCHOR = new Date('2026-09-17T09:00:00Z').getTime();

const STATUS_LABEL: Record<TicketStatus, string> = {
  open: 'Open',
  pending: 'Pending',
  resolved: 'Resolved',
};
const STATUS_COLOR: Record<TicketStatus, 'primary' | 'warning' | 'success'> = {
  open: 'primary',
  pending: 'warning',
  resolved: 'success',
};
const PRIORITY_LABEL: Record<TicketPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
const PRIORITY_COLOR: Record<TicketPriority, 'default' | 'warning' | 'danger'> =
  {
    low: 'default',
    medium: 'warning',
    high: 'danger',
  };
const CHANNEL_META: Record<
  TicketChannel,
  { icon: React.ReactNode; label: string }
> = {
  email: { icon: <Mail size={14} />, label: 'Email' },
  chat: { icon: <MessageCircle size={14} />, label: 'Chat' },
  social: { icon: <AtSign size={14} />, label: 'Social' },
  phone: { icon: <Phone size={14} />, label: 'Phone' },
};
const PAGE_TITLE: Record<Page, string> = {
  overview: 'Overview',
  tickets: 'All tickets',
  team: 'Team',
};
const STATUS_OPTIONS: Option[] = STATUSES.map((status) => ({
  value: status,
  label: STATUS_LABEL[status],
}));
const AGENT_OPTIONS: Option[] = AGENTS.map((agent) => ({
  value: agent,
  label: agent,
}));

const splitName = (fullName: string): [string, string] => {
  const [first, ...rest] = fullName.split(' ');
  return [first, rest.join(' ')];
};

const nameFromEmail = (email: string) =>
  email
    .split('@')[0]
    .split(/[._]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

const subjectFromBody = (body: string) => {
  const words = body.replace(/\n/g, ' ').split(' ').filter(Boolean);
  const lead = words.slice(0, 6).join(' ');
  return (
    lead.charAt(0).toUpperCase() + lead.slice(1) + (words.length > 6 ? '…' : '')
  );
};

const toTicket = (raw: RawComment): Ticket => ({
  id: raw.id,
  customer: nameFromEmail(raw.email),
  email: raw.email,
  subject: subjectFromBody(raw.body),
  body: raw.body,
  status: STATUSES[raw.id % STATUSES.length],
  /** Divides a different digit of `id` than `status` so the two don't move in lockstep. */
  priority:
    PRIORITIES[Math.floor(raw.id / STATUSES.length) % PRIORITIES.length],
  channel: CHANNELS[raw.id % CHANNELS.length],
  agent: AGENTS[raw.id % AGENTS.length],
  receivedAt: new Date(ANCHOR - (500 - raw.id) * 37 * 60_000).toISOString(),
});

/* ── recent ticket row (overview page) ──────────────────────────── */

const RecentTicketRow = ({
  ticket,
  onOpen,
}: {
  ticket: Ticket;
  onOpen: () => void;
}) => {
  const [firstName, lastName] = splitName(ticket.customer);

  return (
    <Box
      shape="rounded"
      material="plate"
      padding={12}
      pressable
      focusable
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
      style={{ cursor: 'pointer', width: '100%' }}
    >
      <Flex gap="m" align="center" style={{ width: '100%', minWidth: 0 }}>
        <Avatar firstName={firstName} lastName={lastName} size="s" />
        <Flex orientation="vertical" gap="xxs" style={{ flex: 1, minWidth: 0 }}>
          <Text size={3} weight="medium" truncate block>
            {ticket.subject}
          </Text>
          <Text size={2} color="muted" truncate block>
            {ticket.customer} ·{' '}
            {dayjs(ticket.receivedAt).format('MMM D, HH:mm')}
          </Text>
        </Flex>
        <Label variant="soft" color={STATUS_COLOR[ticket.status]}>
          {STATUS_LABEL[ticket.status]}
        </Label>
      </Flex>
    </Box>
  );
};

/* ── agent card (team page) ─────────────────────────────────────── */

const AgentCard = ({
  agent,
  tickets,
}: {
  agent: string;
  tickets: Ticket[];
}) => {
  const [firstName, lastName] = splitName(agent);
  const open = tickets.filter((t) => t.status === 'open').length;
  const pending = tickets.filter((t) => t.status === 'pending').length;
  const resolved = tickets.filter((t) => t.status === 'resolved').length;

  return (
    <Box
      shape="rounded"
      material="plate"
      padding={16}
      style={{ width: '100%' }}
    >
      <Flex orientation="vertical" gap="s">
        <Flex align="center" gap="s">
          <Avatar firstName={firstName} lastName={lastName} />
          <Flex orientation="vertical" gap="xxs">
            <Text weight="bold">{agent}</Text>
            <Text size={2} color="muted">
              {tickets.length} tickets assigned
            </Text>
          </Flex>
        </Flex>
        <Progress value={resolved} max={tickets.length || 1} />
        <Flex gap="xs" wrap>
          <Label size="mini" variant="soft" color="primary">
            {open} open
          </Label>
          <Label size="mini" variant="soft" color="warning">
            {pending} pending
          </Label>
          <Label size="mini" variant="soft" color="success">
            {resolved} resolved
          </Label>
        </Flex>
      </Flex>
    </Box>
  );
};

/* ── the screen ──────────────────────────────────────────────────── */

/**
 * A support inbox on a live REST API (JSONPlaceholder's `/comments`, 500
 * rows enriched with synthetic status/priority/agent fields). `Screen.Sidebar`
 * switches between three pages kept in local state; `All tickets` is the
 * `DataTable` at full scale — sortable/filterable columns, pagination and
 * bulk selection over the whole dataset. A row's "View" action opens a
 * `Drawer` with the full ticket and inline status/assignee editing. The
 * toolbar's pin toggle flips `Screen.Header`'s `fixed` prop live — on
 * `All tickets`, unpinning it shows `DataTable`'s sticky column header stick
 * flush to the true viewport top once the header scrolls away, instead of
 * clearing a pinned bar.
 */
export const HelpdeskApp: StoryObj<typeof Screen> = {
  name: 'Helpdesk',
  render: () => {
    const [tickets, setTickets] = useState<Ticket[] | null>(null);
    const [error, setError] = useState(false);
    const [activePage, setActivePage] = useState<Page>('overview');
    const [openTicketId, setOpenTicketId] = useState<number | null>(null);
    const [headerFixed, setHeaderFixed] = useState(true);

    useEffect(() => {
      let cancelled = false;
      fetch(`${API}/comments`)
        .then((response) => response.json())
        .then((data: RawComment[]) => {
          if (!cancelled) setTickets(data.map(toTicket));
        })
        .catch(() => {
          if (!cancelled) setError(true);
        });
      return () => {
        cancelled = true;
      };
    }, []);

    const updateTicket = (id: number, patch: Partial<Ticket>) => {
      setTickets((prev) =>
        prev ? prev.map((t) => (t.id === id ? { ...t, ...patch } : t)) : prev,
      );
    };

    const openTicket = tickets?.find((t) => t.id === openTicketId) ?? null;

    const recentTickets = useMemo(
      () =>
        tickets
          ? [...tickets]
              .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
              .slice(0, 6)
          : [],
      [tickets],
    );

    const stats = useMemo(() => {
      const list = tickets ?? [];
      return {
        open: list.filter((t) => t.status === 'open').length,
        pending: list.filter((t) => t.status === 'pending').length,
        resolved: list.filter((t) => t.status === 'resolved').length,
        highOpen: list.filter(
          (t) => t.status !== 'resolved' && t.priority === 'high',
        ).length,
      };
    }, [tickets]);

    const columns: DataTableColumn<Ticket>[] = [
      { accessor: 'id', label: '#', type: 'number', width: 64, sortable: true },
      {
        accessor: 'customer',
        label: 'Customer',
        type: 'custom',
        sortable: true,
        options: {
          renderReadMode: ({ item }) => {
            const ticket = item as Ticket;
            const [firstName, lastName] = splitName(ticket.customer);
            return (
              <Flex align="center" gap="s" style={{ minWidth: 0 }}>
                <Avatar firstName={firstName} lastName={lastName} size="mini" />
                <Flex orientation="vertical" gap="xxs" style={{ minWidth: 0 }}>
                  <Text size={3} weight="medium" truncate block>
                    {ticket.customer}
                  </Text>
                  <Text size={2} color="muted" truncate block>
                    {ticket.email}
                  </Text>
                </Flex>
              </Flex>
            );
          },
        },
      },
      {
        accessor: 'subject',
        label: 'Subject',
        sortable: true,
        filterable: true,
        width: 280,
      },
      {
        accessor: 'channel',
        label: 'Channel',
        type: 'custom',
        sortable: true,
        width: 110,
        options: {
          renderReadMode: ({ item }) => {
            const meta = CHANNEL_META[(item as Ticket).channel];
            return (
              <Flex align="center" gap="xs">
                {meta.icon}
                <Text size={3}>{meta.label}</Text>
              </Flex>
            );
          },
        },
      },
      {
        accessor: 'priority',
        label: 'Priority',
        type: 'custom',
        sortable: true,
        width: 110,
        options: {
          renderReadMode: ({ item }) => {
            const priority = (item as Ticket).priority;
            return (
              <Label variant="outline" color={PRIORITY_COLOR[priority]}>
                {PRIORITY_LABEL[priority]}
              </Label>
            );
          },
        },
      },
      {
        accessor: 'status',
        label: 'Status',
        type: 'custom',
        sortable: true,
        width: 110,
        options: {
          renderReadMode: ({ item }) => {
            const status = (item as Ticket).status;
            return (
              <Label variant="soft" color={STATUS_COLOR[status]}>
                {STATUS_LABEL[status]}
              </Label>
            );
          },
        },
      },
      {
        accessor: 'agent',
        label: 'Assigned to',
        type: 'custom',
        sortable: true,
        width: 170,
        options: {
          renderReadMode: ({ item }) => {
            const agent = (item as Ticket).agent;
            const [firstName, lastName] = splitName(agent);
            return (
              <Flex align="center" gap="xs">
                <Avatar firstName={firstName} lastName={lastName} size="mini" />
                <Text size={3} truncate block>
                  {agent}
                </Text>
              </Flex>
            );
          },
        },
      },
      {
        accessor: 'receivedAt',
        label: 'Received',
        type: 'date',
        options: { format: 'MMM D, HH:mm' },
        sortable: true,
        width: 140,
      },
    ];

    return (
      <Screen title="Helpdesk">
        <Screen.Header fixed={headerFixed}>
          <Toolbar variant="solid" size="m">
            <Toolbar.Group>
              <Toolbar.SidebarToggleAction />
            </Toolbar.Group>
            <Toolbar.Title title={PAGE_TITLE[activePage]} />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.Action
                label={headerFixed ? 'Unpin header' : 'Pin header'}
                icon={headerFixed ? <Pin /> : <PinOff />}
                showLabel={false}
                selected={headerFixed}
                onClick={() => setHeaderFixed((prev) => !prev)}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action label="New ticket" icon={<Plus />} />
            </Toolbar.Group>
            <Toolbar.Group>
              <Avatar firstName="Nadia" lastName="Farouk" size="s" />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>

        <Screen.Sidebar>
          <NavigationList>
            <NavigationList.Group title="Support">
              <NavigationList.Link
                href="#"
                icon={<Inbox />}
                label="Overview"
                selected={activePage === 'overview'}
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage('overview');
                }}
              />
              <NavigationList.Link
                href="#"
                icon={<TicketIcon />}
                label="All tickets"
                selected={activePage === 'tickets'}
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage('tickets');
                }}
              />
              <NavigationList.Link
                href="#"
                icon={<Users />}
                label="Team"
                selected={activePage === 'team'}
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage('team');
                }}
              />
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>

        <Screen.Content>
          {error ? (
            <Text size={3} color="danger" block>
              Could not reach jsonplaceholder.typicode.com — check the
              connection and reload.
            </Text>
          ) : tickets === null ? (
            <Flex orientation="vertical" gap="s">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} height="56px" radius="var(--radius-l)" />
              ))}
            </Flex>
          ) : activePage === 'overview' ? (
            <Flex orientation="vertical" gap="l">
              <div
                style={{
                  display: 'grid',
                  gap: 'var(--space-section)',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                }}
              >
                <Card
                  title="Open"
                  value={String(stats.open)}
                  hint={`${stats.pending} pending`}
                />
                <Card
                  title="Resolved"
                  value={String(stats.resolved)}
                  hint={`${Math.round((stats.resolved / tickets.length) * 100)}% of all tickets`}
                />
                <Card
                  title="High priority"
                  value={String(stats.highOpen)}
                  hint="needs attention"
                />
                <Card
                  title="Agents"
                  value={String(AGENTS.length)}
                  hint={`${Math.round(tickets.length / AGENTS.length)} tickets each`}
                />
              </div>

              <Flex orientation="vertical" gap="s">
                <Text size={4} weight="bold">
                  Recent tickets
                </Text>
                {recentTickets.map((ticket) => (
                  <RecentTicketRow
                    key={ticket.id}
                    ticket={ticket}
                    onOpen={() => setOpenTicketId(ticket.id)}
                  />
                ))}
              </Flex>
            </Flex>
          ) : activePage === 'tickets' ? (
            <DataTable<Ticket>
              data={tickets}
              columns={columns}
              rowsPerPage={20}
              selectable
              resizableColumns
              rowActions={({ row }) => [
                <DataTable.RowAction
                  key="view"
                  label="View"
                  icon={<Eye />}
                  showLabel={false}
                  onClick={() => setOpenTicketId(row.id)}
                />,
                row.status !== 'resolved' ? (
                  <DataTable.RowAction
                    key="resolve"
                    label="Mark resolved"
                    collapsed
                    icon={<Check />}
                    onClick={() => updateTicket(row.id, { status: 'resolved' })}
                  />
                ) : null,
              ]}
              actions={({ selectableMode, selectedItems }) =>
                selectableMode ? (
                  <Toolbar.Group key="bulk-resolve">
                    <DataTable.Action
                      label={`Resolve ${selectedItems.length} selected`}
                      icon={<Check />}
                      onClick={() => {
                        const ids = new Set(selectedItems.map((t) => t.id));
                        setTickets((prev) =>
                          prev
                            ? prev.map((t) =>
                                ids.has(t.id)
                                  ? { ...t, status: 'resolved' }
                                  : t,
                              )
                            : prev,
                        );
                      }}
                    />
                  </Toolbar.Group>
                ) : null
              }
            />
          ) : (
            <div
              style={{
                display: 'grid',
                gap: 'var(--space-section)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              }}
            >
              {AGENTS.map((agent) => (
                <AgentCard
                  key={agent}
                  agent={agent}
                  tickets={tickets.filter((t) => t.agent === agent)}
                />
              ))}
            </div>
          )}
        </Screen.Content>

        <Screen.Footer>
          <Flex justify="between" align="center">
            <Text size={2} color="muted">
              {tickets ? `${tickets.length} tickets` : 'Loading…'}
            </Text>
            <Text size={2} color="muted">
              Live data · jsonplaceholder.typicode.com
            </Text>
          </Flex>
        </Screen.Footer>

        <Drawer
          title={openTicket ? `Ticket #${openTicket.id}` : undefined}
          open={openTicket !== null}
          onClose={() => setOpenTicketId(null)}
          width={420}
          content={() => {
            if (!openTicket) return <></>;
            const [firstName, lastName] = splitName(openTicket.customer);
            return (
              <Flex orientation="vertical" gap="m">
                <Flex align="center" gap="s">
                  <Avatar firstName={firstName} lastName={lastName} />
                  <Flex orientation="vertical" gap="xxs">
                    <Text weight="bold">{openTicket.customer}</Text>
                    <Text size={2} color="muted">
                      {openTicket.email}
                    </Text>
                  </Flex>
                </Flex>

                <Flex gap="s" wrap>
                  <Label
                    size="mini"
                    variant="soft"
                    color={STATUS_COLOR[openTicket.status]}
                  >
                    {STATUS_LABEL[openTicket.status]}
                  </Label>
                  <Label
                    size="mini"
                    variant="outline"
                    color={PRIORITY_COLOR[openTicket.priority]}
                  >
                    {PRIORITY_LABEL[openTicket.priority]} priority
                  </Label>
                </Flex>

                <Divider />

                <Flex orientation="vertical" gap="xxs">
                  <Text size={2} color="muted">
                    Subject
                  </Text>
                  <Text weight="medium">{openTicket.subject}</Text>
                </Flex>

                <Flex orientation="vertical" gap="xxs">
                  <Text size={2} color="muted">
                    Message
                  </Text>
                  <Text size={3}>{openTicket.body}</Text>
                </Flex>

                <Divider />

                <Flex orientation="vertical" gap="xs">
                  <Text size={2} color="muted">
                    Status
                  </Text>
                  <Select
                    size="s"
                    value={openTicket.status}
                    options={STATUS_OPTIONS}
                    onChange={(value) =>
                      value &&
                      updateTicket(openTicket.id, {
                        status: value as TicketStatus,
                      })
                    }
                  />
                </Flex>

                <Flex orientation="vertical" gap="xs">
                  <Text size={2} color="muted">
                    Assigned to
                  </Text>
                  <Select
                    size="s"
                    value={openTicket.agent}
                    options={AGENT_OPTIONS}
                    onChange={(value) =>
                      value &&
                      updateTicket(openTicket.id, { agent: value as string })
                    }
                  />
                </Flex>
              </Flex>
            );
          }}
          actions={({ hide }) => (
            <Button
              label="Mark resolved"
              icon={<Check />}
              onClick={() => {
                if (openTicket)
                  updateTicket(openTicket.id, { status: 'resolved' });
                hide();
              }}
            />
          )}
        />
      </Screen>
    );
  },
};
