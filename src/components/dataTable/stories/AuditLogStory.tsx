import { StoryObj } from '@storybook/react';
import { Avatar, Flex, Label, Text } from 'components';
import { DataTable } from '../DataTable.tsx';
import {
  Filter,
  FilterType,
  StringFilterRules,
  Sorting,
} from '../DataTable.types.ts';

type AuditEvent = {
  id: number;
  timestamp: string;
  severity: string;
  eventType: string;
  userName: string;
  userInitial: string;
  userColor: string;
  sourceIp: string;
  resource: string;
  success: boolean;
};

const EVENTS: AuditEvent[] = [
  {
    id: 1,
    timestamp: '2025-03-31T08:14:22',
    severity: 'critical',
    eventType: 'auth',
    userName: 'root',
    userInitial: 'R',
    userColor: '#ef4444',
    sourceIp: '91.108.4.1',
    resource: '/api/admin/users',
    success: false,
  },
  {
    id: 2,
    timestamp: '2025-03-31T08:16:05',
    severity: 'critical',
    eventType: 'auth',
    userName: 'root',
    userInitial: 'R',
    userColor: '#ef4444',
    sourceIp: '91.108.4.1',
    resource: '/api/admin/delete',
    success: false,
  },
  {
    id: 3,
    timestamp: '2025-03-31T08:22:48',
    severity: 'high',
    eventType: 'auth',
    userName: 'alice.morgan',
    userInitial: 'A',
    userColor: '#8b5cf6',
    sourceIp: '185.220.101.34',
    resource: '/api/auth/token',
    success: false,
  },
  {
    id: 4,
    timestamp: '2025-03-31T09:01:13',
    severity: 'high',
    eventType: 'config',
    userName: 'bob.chen',
    userInitial: 'B',
    userColor: '#0ea5e9',
    sourceIp: '10.0.1.12',
    resource: '/config/firewall',
    success: true,
  },
  {
    id: 5,
    timestamp: '2025-03-31T09:14:37',
    severity: 'medium',
    eventType: 'access',
    userName: 'carol.diaz',
    userInitial: 'C',
    userColor: '#10b981',
    sourceIp: '10.0.2.88',
    resource: '/files/payroll.xlsx',
    success: true,
  },
  {
    id: 6,
    timestamp: '2025-03-31T09:28:50',
    severity: 'high',
    eventType: 'data',
    userName: 'bob.chen',
    userInitial: 'B',
    userColor: '#0ea5e9',
    sourceIp: '10.0.1.12',
    resource: '/api/export/users',
    success: true,
  },
  {
    id: 7,
    timestamp: '2025-03-31T09:45:02',
    severity: 'low',
    eventType: 'auth',
    userName: 'dave.smith',
    userInitial: 'D',
    userColor: '#f59e0b',
    sourceIp: '10.0.3.5',
    resource: '/api/auth/login',
    success: true,
  },
  {
    id: 8,
    timestamp: '2025-03-31T10:03:19',
    severity: 'info',
    eventType: 'system',
    userName: 'system',
    userInitial: 'S',
    userColor: '#64748b',
    sourceIp: '127.0.0.1',
    resource: '/cron/backup',
    success: true,
  },
  {
    id: 9,
    timestamp: '2025-03-31T10:17:44',
    severity: 'medium',
    eventType: 'config',
    userName: 'alice.morgan',
    userInitial: 'A',
    userColor: '#8b5cf6',
    sourceIp: '10.0.2.4',
    resource: '/api/settings/smtp',
    success: true,
  },
  {
    id: 10,
    timestamp: '2025-03-31T10:32:11',
    severity: 'critical',
    eventType: 'data',
    userName: 'unknown',
    userInitial: '?',
    userColor: '#ef4444',
    sourceIp: '45.33.32.156',
    resource: '/api/db/dump',
    success: false,
  },
  {
    id: 11,
    timestamp: '2025-03-31T10:45:28',
    severity: 'high',
    eventType: 'auth',
    userName: 'unknown',
    userInitial: '?',
    userColor: '#ef4444',
    sourceIp: '45.33.32.156',
    resource: '/api/admin/login',
    success: false,
  },
  {
    id: 12,
    timestamp: '2025-03-31T11:02:05',
    severity: 'low',
    eventType: 'access',
    userName: 'carol.diaz',
    userInitial: 'C',
    userColor: '#10b981',
    sourceIp: '10.0.2.88',
    resource: '/dashboard',
    success: true,
  },
  {
    id: 13,
    timestamp: '2025-03-31T11:19:33',
    severity: 'info',
    eventType: 'system',
    userName: 'system',
    userInitial: 'S',
    userColor: '#64748b',
    sourceIp: '127.0.0.1',
    resource: '/health/check',
    success: true,
  },
  {
    id: 14,
    timestamp: '2025-03-31T11:37:17',
    severity: 'medium',
    eventType: 'data',
    userName: 'emma.stone',
    userInitial: 'E',
    userColor: '#ec4899',
    sourceIp: '10.0.4.22',
    resource: '/api/reports/export',
    success: true,
  },
  {
    id: 15,
    timestamp: '2025-03-31T11:54:42',
    severity: 'high',
    eventType: 'config',
    userName: 'root',
    userInitial: 'R',
    userColor: '#ef4444',
    sourceIp: '10.0.0.1',
    resource: '/api/admin/config',
    success: true,
  },
  {
    id: 16,
    timestamp: '2025-03-31T12:08:09',
    severity: 'low',
    eventType: 'auth',
    userName: 'frank.wu',
    userInitial: 'F',
    userColor: '#6366f1',
    sourceIp: '10.0.1.77',
    resource: '/api/auth/login',
    success: true,
  },
  {
    id: 17,
    timestamp: '2025-03-31T12:23:55',
    severity: 'medium',
    eventType: 'access',
    userName: 'dave.smith',
    userInitial: 'D',
    userColor: '#f59e0b',
    sourceIp: '10.0.3.5',
    resource: '/files/contracts/',
    success: true,
  },
  {
    id: 18,
    timestamp: '2025-03-31T12:41:30',
    severity: 'critical',
    eventType: 'auth',
    userName: 'unknown',
    userInitial: '?',
    userColor: '#ef4444',
    sourceIp: '91.108.4.1',
    resource: '/api/admin/users',
    success: false,
  },
  {
    id: 19,
    timestamp: '2025-03-31T13:02:14',
    severity: 'info',
    eventType: 'system',
    userName: 'system',
    userInitial: 'S',
    userColor: '#64748b',
    sourceIp: '127.0.0.1',
    resource: '/cron/cleanup',
    success: true,
  },
  {
    id: 20,
    timestamp: '2025-03-31T13:19:47',
    severity: 'high',
    eventType: 'data',
    userName: 'bob.chen',
    userInitial: 'B',
    userColor: '#0ea5e9',
    sourceIp: '10.0.1.12',
    resource: '/api/users/bulk',
    success: true,
  },
  {
    id: 21,
    timestamp: '2025-03-31T13:38:02',
    severity: 'low',
    eventType: 'auth',
    userName: 'emma.stone',
    userInitial: 'E',
    userColor: '#ec4899',
    sourceIp: '10.0.4.22',
    resource: '/api/auth/login',
    success: true,
  },
  {
    id: 22,
    timestamp: '2025-03-31T13:55:29',
    severity: 'medium',
    eventType: 'config',
    userName: 'alice.morgan',
    userInitial: 'A',
    userColor: '#8b5cf6',
    sourceIp: '10.0.2.4',
    resource: '/api/settings/2fa',
    success: false,
  },
  {
    id: 23,
    timestamp: '2025-03-31T14:10:18',
    severity: 'high',
    eventType: 'access',
    userName: 'unknown',
    userInitial: '?',
    userColor: '#ef4444',
    sourceIp: '185.220.101.34',
    resource: '/api/keys/generate',
    success: false,
  },
  {
    id: 24,
    timestamp: '2025-03-31T14:27:53',
    severity: 'info',
    eventType: 'system',
    userName: 'system',
    userInitial: 'S',
    userColor: '#64748b',
    sourceIp: '127.0.0.1',
    resource: '/metrics/collect',
    success: true,
  },
  {
    id: 25,
    timestamp: '2025-03-31T14:45:36',
    severity: 'low',
    eventType: 'access',
    userName: 'frank.wu',
    userInitial: 'F',
    userColor: '#6366f1',
    sourceIp: '10.0.1.77',
    resource: '/dashboard/reports',
    success: true,
  },
  {
    id: 26,
    timestamp: '2025-03-31T15:02:07',
    severity: 'critical',
    eventType: 'data',
    userName: 'unknown',
    userInitial: '?',
    userColor: '#ef4444',
    sourceIp: '45.33.32.156',
    resource: '/api/db/tables',
    success: false,
  },
  {
    id: 27,
    timestamp: '2025-03-31T15:19:44',
    severity: 'medium',
    eventType: 'auth',
    userName: 'carol.diaz',
    userInitial: 'C',
    userColor: '#10b981',
    sourceIp: '10.0.2.88',
    resource: '/api/auth/reset',
    success: true,
  },
  {
    id: 28,
    timestamp: '2025-03-31T15:37:21',
    severity: 'high',
    eventType: 'config',
    userName: 'root',
    userInitial: 'R',
    userColor: '#ef4444',
    sourceIp: '10.0.0.1',
    resource: '/api/admin/roles',
    success: true,
  },
];

const SEVERITY_STYLE: Record<string, [string, string]> = {
  critical: ['#fef2f2', '#b91c1c'],
  high: ['#fff7ed', '#c2410c'],
  medium: ['#fefce8', '#a16207'],
  low: ['#f0fdf4', '#15803d'],
  info: ['#f0f9ff', '#0369a1'],
};

// Pre-sorted newest → oldest so the table opens in a sensible order
const DEFAULT_SORT: Sorting = { field: 'timestamp', direction: 'desc' };

// Pre-filter: show only critical + high severity events by default
const DEFAULT_FILTERS: Filter[] = [
  {
    field: 'severity',
    type: FilterType.string,
    columnType: 'string',
    conditions: [
      { rule: StringFilterRules.equal, join: 'AND', value: 'critical' },
      { rule: StringFilterRules.equal, join: 'OR', value: 'high' },
    ],
  },
];

export const AuditLogStory: StoryObj<typeof Flex> = {
  name: 'Security Audit Log — Sorted & Pre-filtered',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold">
            Security Audit Log
          </Text>
          <Text style={{ color: 'var(--text-1)' }}>
            Read-only. Sorted newest → oldest. Pre-filtered to Critical &amp;
            High severity. Remove the severity filter to see all 28 events.
          </Text>
        </Flex>
        <DataTable
          data={EVENTS}
          rowsPerPage={10}
          defaultSort={DEFAULT_SORT}
          defaultFilters={DEFAULT_FILTERS}
          columns={[
            {
              accessor: 'timestamp',
              label: 'Timestamp',
              type: 'date',
              sortable: true,
              filterable: true,
              width: 160,
              options: { level: 'day', format: 'DD MMM HH:mm:ss' },
            },
            {
              accessor: 'severity',
              label: 'Severity',
              filterable: 'string',
              sortable: true,
              width: 110,
              type: 'custom',
              options: {
                renderReadMode: ({ value }) => {
                  const sev = String(value);
                  const [bg, color] = SEVERITY_STYLE[sev] ?? [
                    '#f1f5f9',
                    '#475569',
                  ];
                  return (
                    <Label variant="soft" size="s">
                      {sev.toUpperCase()}
                    </Label>
                  );
                },
              },
            },
            {
              accessor: 'eventType',
              label: 'Event Type',
              type: 'select',
              filterable: true,
              width: 100,
            },
            {
              accessor: 'userName',
              label: 'User',
              filterable: 'string',
              type: 'custom',
              width: 160,
              options: {
                renderReadMode: ({ item }) => {
                  const e = item as AuditEvent;
                  return (
                    <Flex direction="horizontal" gap="xs" align="center">
                      <Avatar
                        firstName={e.userInitial}
                        color={e.userColor}
                        size="s"
                      />
                      <Text style={{ fontSize: 13 }}>{e.userName}</Text>
                    </Flex>
                  );
                },
              },
            },
            {
              accessor: 'sourceIp',
              label: 'Source IP',
              type: 'string',
              filterable: true,
              width: 140,
            },
            {
              accessor: 'resource',
              label: 'Resource',
              type: 'string',
              filterable: true,
            },
            {
              accessor: 'success',
              label: 'Result',
              type: 'custom',
              filterable: 'boolean',
              width: 90,
              options: {
                renderReadMode: ({ value }) =>
                  value ? (
                    <span
                      style={{
                        color: '#15803d',
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      ✓ OK
                    </span>
                  ) : (
                    <span
                      style={{
                        color: '#b91c1c',
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      ✗ FAIL
                    </span>
                  ),
              },
            },
          ]}
        />
      </Flex>
    );
  },
};
