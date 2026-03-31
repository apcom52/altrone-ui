import { StoryObj } from '@storybook/react';
import { Button, Flex, Grid, Text } from 'components';
import { useState } from 'react';
import { DataGrid } from '../DataGrid.tsx';

// Simulated device state fetched from the hub
const DEVICE_FROM_HUB: Record<string, unknown> = {
  deviceName: 'Living Room Ceiling',
  model: 'Lumi Arc Pro 3',
  firmware: 'v4.2.1',
  macAddress: 'A4:C3:F0:85:1B:2E',
  ipAddress: '192.168.1.42',
  location: 'living_room',
  isEnabled: true,
  brightness: 72,
  colorTemp: 3800,
  lampColor: '#FFD580',
  autoOffMinutes: 120,
  nightMode: false,
  scheduleEnabled: true,
  scheduleOn: '2024-01-01',
  scheduleOff: '2024-01-01',
};

const INITIAL_DATA: Record<string, unknown> = {
  deviceName: 'My Smart Lamp',
  model: 'Lumi Arc Pro 3',
  firmware: 'v4.1.0',
  macAddress: 'A4:C3:F0:85:1B:2E',
  ipAddress: '192.168.1.42',
  location: 'bedroom',
  isEnabled: false,
  brightness: 40,
  colorTemp: 6000,
  lampColor: '#FFFFFF',
  autoOffMinutes: 30,
  nightMode: true,
  scheduleEnabled: false,
  scheduleOn: '2024-01-01',
  scheduleOff: '2024-01-01',
};

const LOCATION_LABELS: Record<string, string> = {
  living_room: 'Living Room',
  bedroom: 'Bedroom',
  kitchen: 'Kitchen',
  hallway: 'Hallway',
  office: 'Office',
};

export const SmartHomeStory: StoryObj<typeof Flex> = {
  name: 'Smart Home — Device Configuration',
  render: () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [mode, setMode] = useState<'read' | 'edit' | 'loading'>('read');

    const handleChange = (field: string, value: unknown) =>
      setData((prev) => ({ ...prev, [field]: value }));

    // Simulate pulling fresh config from the physical device
    const syncFromDevice = () => {
      setMode('loading');
      setTimeout(() => {
        setData(DEVICE_FROM_HUB);
        setMode('read');
      }, 1800);
    };

    const isEnabled = Boolean(data.isEnabled);
    const lampColor = String(data.lampColor ?? '#FFFFFF');
    const brightness = Number(data.brightness ?? 0);
    const colorTemp = Number(data.colorTemp ?? 4000);

    // Warm/cool label for color temperature
    const tempLabel =
      colorTemp < 3000
        ? 'Warm White'
        : colorTemp < 4500
          ? 'Neutral White'
          : 'Cool White';

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Smart Home — Device Configuration Panel
        </Text>
        <Text block>
          Hardware-level fields (Model, Firmware, MAC, IP) are read-only
          regardless of mode. Press "Sync from Device" to simulate loading fresh
          settings from the physical lamp — it triggers the loading state and
          overwrites local data.
        </Text>

        <Flex direction="horizontal" gap="m" align="center">
          <Button label="Sync from Device" onClick={syncFromDevice} />
          {mode === 'loading' && (
            <Text style={{ color: 'var(--disabled-text-color)' }}>
              Connecting to device…
            </Text>
          )}
        </Flex>

        <Grid>
          <Grid.Column span={8}>
            <DataGrid
              data={data}
              mode={mode}
              onChange={handleChange}
              onChangeMode={(m) => setMode(m as typeof mode)}
              groups={[
                { name: 'device', title: 'Device Info' },
                { name: 'behavior', title: 'Behavior' },
                { name: 'schedule', title: 'Schedule' },
              ]}
              fields={[
                // ── Device Info (hardware, mostly read-only) ──────────────
                {
                  accessor: 'deviceName',
                  label: 'Device Name',
                  type: 'string',
                  group: 'device',
                  maxLength: 40,
                },
                {
                  accessor: 'model',
                  label: 'Model',
                  type: 'string',
                  group: 'device',
                  editable: false,
                },
                {
                  accessor: 'firmware',
                  label: 'Firmware Version',
                  type: 'string',
                  group: 'device',
                  editable: false,
                },
                {
                  accessor: 'macAddress',
                  label: 'MAC Address',
                  type: 'string',
                  group: 'device',
                  editable: false,
                },
                {
                  accessor: 'ipAddress',
                  label: 'IP Address',
                  type: 'string',
                  group: 'device',
                  editable: false,
                },
                {
                  accessor: 'location',
                  label: 'Room',
                  type: 'select',
                  group: 'device',
                  options: [
                    { value: 'living_room', label: 'Living Room' },
                    { value: 'bedroom', label: 'Bedroom' },
                    { value: 'kitchen', label: 'Kitchen' },
                    { value: 'hallway', label: 'Hallway' },
                    { value: 'office', label: 'Office' },
                  ],
                },

                // ── Behavior ──────────────────────────────────────────────
                {
                  accessor: 'isEnabled',
                  label: 'Enabled',
                  type: 'boolean',
                  group: 'behavior',
                  trueLabel: 'On',
                  falseLabel: 'Off',
                },
                {
                  accessor: 'brightness',
                  label: 'Brightness (%)',
                  type: 'number',
                  group: 'behavior',
                  min: 0,
                  max: 100,
                },
                {
                  accessor: 'colorTemp',
                  label: 'Color Temp (K)',
                  type: 'number',
                  group: 'behavior',
                  min: 2700,
                  max: 6500,
                },
                {
                  accessor: 'lampColor',
                  label: 'Light Color',
                  type: 'color',
                  group: 'behavior',
                  allowPalette: true,
                  colorPresets: [
                    {
                      name: 'Warm White',
                      title: 'Warm White',
                      value: '#FFD580',
                    },
                    { name: 'Daylight', title: 'Daylight', value: '#FFFFFF' },
                    { name: 'Cool Blue', title: 'Cool Blue', value: '#C8E6FF' },
                    { name: 'Sunset', title: 'Sunset', value: '#FF8C42' },
                    { name: 'Night Red', title: 'Night Red', value: '#FF3B30' },
                  ],
                },
                {
                  accessor: 'autoOffMinutes',
                  label: 'Auto-off (min)',
                  type: 'number',
                  group: 'behavior',
                  min: 0,
                  max: 480,
                },
                {
                  accessor: 'nightMode',
                  label: 'Night Mode',
                  type: 'boolean',
                  group: 'behavior',
                },

                // ── Schedule ──────────────────────────────────────────────
                {
                  accessor: 'scheduleEnabled',
                  label: 'Enable Schedule',
                  type: 'boolean',
                  group: 'schedule',
                },
                {
                  accessor: 'scheduleOn',
                  label: 'Turn On At (date)',
                  type: 'date',
                  group: 'schedule',
                },
                {
                  accessor: 'scheduleOff',
                  label: 'Turn Off At (date)',
                  type: 'date',
                  group: 'schedule',
                },
              ]}
            />
          </Grid.Column>

          {/* Live Lamp Visualization */}
          <Grid.Column span={4}>
            <Flex direction="vertical" gap="m" align="center">
              <Text weight="bold" block>
                Live Preview
              </Text>

              {/* Lamp bulb */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: '24px 0',
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: isEnabled ? lampColor : 'var(--border-1)',
                    opacity: isEnabled ? 0.2 + (brightness / 100) * 0.8 : 1,
                    boxShadow: isEnabled
                      ? `0 0 ${brightness / 2}px ${brightness / 4}px ${lampColor}88`
                      : 'none',
                    transition: 'all 0.4s ease',
                  }}
                />
                <Text
                  style={{
                    color: isEnabled ? lampColor : 'var(--disabled-text-color)',
                  }}
                >
                  {isEnabled ? 'ON' : 'OFF'}
                </Text>
              </div>

              {/* Stats */}
              <div
                style={{
                  width: '100%',
                  border: '1px solid var(--border-1)',
                  borderRadius: 12,
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  background: 'var(--background-1)',
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Text>Brightness</Text>
                  <Text weight="bold">{brightness}%</Text>
                </div>
                <div
                  style={{
                    height: 4,
                    borderRadius: 4,
                    background: 'var(--border-1)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${brightness}%`,
                      background: isEnabled ? lampColor : 'var(--border-2)',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Text>Color Temp</Text>
                  <Text weight="bold">{colorTemp}K</Text>
                </div>
                <Text
                  style={{ color: 'var(--disabled-text-color)', fontSize: 12 }}
                >
                  {tempLabel}
                </Text>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Text>Room</Text>
                  <Text weight="bold">
                    {LOCATION_LABELS[String(data.location)] ??
                      String(data.location)}
                  </Text>
                </div>
                {Boolean(data.nightMode) && (
                  <div
                    style={{
                      padding: '4px 10px',
                      borderRadius: 8,
                      background: '#1e1b4b',
                      color: '#a5b4fc',
                      fontSize: 12,
                      textAlign: 'center',
                    }}
                  >
                    Night Mode active
                  </div>
                )}
              </div>
            </Flex>
          </Grid.Column>
        </Grid>
      </Flex>
    );
  },
};
