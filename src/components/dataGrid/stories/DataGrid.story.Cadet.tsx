import { StoryObj } from '@storybook/react';
import { Flex, Grid, Text } from 'components';
import { useState } from 'react';
import { DataGrid } from '../DataGrid.tsx';

// Status → badge colors (bg / text)
const STATUS_COLORS: Record<string, [string, string]> = {
  active: ['#dcfce7', '#15803d'],
  probation: ['#fef9c3', '#a16207'],
  suspended: ['#fee2e2', '#b91c1c'],
  graduated: ['#ede9fe', '#7c3aed'],
};

const DEPT_LABELS: Record<string, string> = {
  navigation: 'Navigation',
  engineering: 'Engineering',
  medicine: 'Medicine',
  command: 'Command',
  intelligence: 'Intelligence',
};

const INITIAL_DATA: Record<string, unknown> = {
  cadetId: 'STA-2847-Φ',
  fullName: 'Lyra Voss',
  biography:
    'Top-ranked pilot in the Stellar Navigation program. Specializes in deep-space corridor mapping and emergency docking protocols.',
  gpa: 94,
  stipend: 1200,
  accessPin: 'nova#8812',
  enrolledOn: '2041-09-01',
  gradMonth: '2045-06',
  cohortYear: '2041',
  status: 'active',
  specializations: ['navigation', 'engineering'],
  tunicColor: '#4A90D9',
  profileUrl: 'https://stellar-academy.test/cadets/2847',
};

export const CadetProfileStory: StoryObj<typeof Flex> = {
  name: 'Stellar Academy — Cadet Profile',
  render: () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [mode, setMode] = useState<'read' | 'edit' | 'loading'>('read');

    const handleChange = (field: string, value: unknown) =>
      setData((prev) => ({ ...prev, [field]: value }));

    const statusColors =
      STATUS_COLORS[String(data.status)] ?? STATUS_COLORS.active;
    const specs = Array.isArray(data.specializations)
      ? data.specializations
      : [];
    const tunicColor = String(data.tunicColor ?? '#4A90D9');

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Stellar Academy — Cadet Registration System
        </Text>
        <Text block>
          All basic field types in one form. Fields marked as non-editable
          (Cadet ID, Enrollment Date) are locked regardless of mode. Change
          Tunic Color to see the ID card update live.
        </Text>
        <Grid>
          <Grid.Column span={7}>
            <DataGrid
              data={data}
              mode={mode}
              onChange={handleChange}
              onChangeMode={(m) => setMode(m as typeof mode)}
              fields={[
                {
                  accessor: 'cadetId',
                  label: 'Cadet ID',
                  type: 'string',
                  editable: false,
                },
                {
                  accessor: 'fullName',
                  label: 'Full Name',
                  type: 'string',
                  maxLength: 60,
                },
                {
                  accessor: 'biography',
                  label: 'Biography',
                  type: 'text',
                  maxLength: 300,
                },
                {
                  accessor: 'gpa',
                  label: 'GPA Score',
                  type: 'number',
                  min: 0,
                  max: 100,
                },
                {
                  accessor: 'stipend',
                  label: 'Monthly Stipend',
                  type: 'currency',
                  currency: 'USD',
                  min: 0,
                },
                {
                  accessor: 'accessPin',
                  label: 'Access PIN',
                  type: 'password',
                },
                {
                  accessor: 'enrolledOn',
                  label: 'Enrollment Date',
                  type: 'date',
                  editable: false,
                },
                {
                  accessor: 'gradMonth',
                  label: 'Expected Graduation',
                  type: 'date',
                  level: 'month',
                },
                {
                  accessor: 'cohortYear',
                  label: 'Cohort Year',
                  type: 'date',
                  level: 'year',
                },
                {
                  accessor: 'status',
                  label: 'Status',
                  type: 'select',
                  options: [
                    { value: 'active', label: 'Active' },
                    { value: 'probation', label: 'On Probation' },
                    { value: 'suspended', label: 'Suspended' },
                    { value: 'graduated', label: 'Graduated' },
                  ],
                },
                {
                  accessor: 'specializations',
                  label: 'Specializations',
                  type: 'select',
                  multiple: true,
                  options: [
                    { value: 'navigation', label: 'Navigation' },
                    { value: 'engineering', label: 'Engineering' },
                    { value: 'medicine', label: 'Medicine' },
                    { value: 'command', label: 'Command' },
                    { value: 'intelligence', label: 'Intelligence' },
                  ],
                },
                {
                  accessor: 'tunicColor',
                  label: 'Tunic Color',
                  type: 'color',
                  allowPalette: false,
                  colorPresets: [
                    {
                      name: 'Navigation Blue',
                      title: 'Navigation Blue',
                      value: '#4A90D9',
                    },
                    {
                      name: 'Engineering Orange',
                      title: 'Engineering Orange',
                      value: '#E67E22',
                    },
                    {
                      name: 'Medical Green',
                      title: 'Medical Green',
                      value: '#27AE60',
                    },
                    {
                      name: 'Command Red',
                      title: 'Command Red',
                      value: '#E74C3C',
                    },
                    {
                      name: 'Intelligence Purple',
                      title: 'Intelligence Purple',
                      value: '#8E44AD',
                    },
                  ],
                },
                {
                  accessor: 'profileUrl',
                  label: 'Public Profile',
                  type: 'link',
                  linkText: 'Open in Registry',
                  linkTransformer: (v) => String(v),
                },
              ]}
            />
          </Grid.Column>

          {/* Live ID Card Preview */}
          <Grid.Column span={5}>
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border-1)',
                fontFamily: 'var(--font-family-base)',
              }}
            >
              {/* Card header — driven by tunicColor */}
              <div
                style={{
                  background: tunicColor,
                  padding: '24px 20px 20px',
                  color: '#ffffff',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    opacity: 0.75,
                    letterSpacing: 3,
                    marginBottom: 8,
                  }}
                >
                  STELLAR ACADEMY · CADET ID
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
                  {String(data.fullName || '—')}
                </div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {String(data.cadetId)}
                </div>
              </div>

              {/* Card body */}
              <div
                style={{
                  padding: '16px 20px',
                  background: 'var(--background-1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {/* GPA */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text>GPA Score</Text>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'var(--text-2)',
                    }}
                  >
                    {String(data.gpa ?? '—')}
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--disabled-text-color)',
                      }}
                    >
                      /100
                    </span>
                  </span>
                </div>

                {/* Status */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text>Status</Text>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1,
                      padding: '3px 12px',
                      borderRadius: 20,
                      background: statusColors[0],
                      color: statusColors[1],
                    }}
                  >
                    {String(data.status ?? '').toUpperCase()}
                  </span>
                </div>

                {/* Monthly stipend */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text>Monthly Stipend</Text>
                  <Text weight="bold">
                    ${Number(data.stipend ?? 0).toLocaleString()}
                  </Text>
                </div>

                {/* Specializations */}
                {specs.length > 0 && (
                  <div>
                    <Text block style={{ marginBottom: 6 }}>
                      Specializations
                    </Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {specs.map((s) => (
                        <span
                          key={String(s)}
                          style={{
                            fontSize: 11,
                            padding: '2px 10px',
                            borderRadius: 12,
                            background: tunicColor + '22',
                            color: tunicColor,
                            fontWeight: 600,
                          }}
                        >
                          {DEPT_LABELS[String(s)] ?? String(s)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </Flex>
    );
  },
};
