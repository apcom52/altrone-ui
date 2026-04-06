import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Spoiler } from './Spoiler.tsx';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button/Button.tsx';
import { Label } from 'components/label/Label.tsx';
import { useState } from 'react';

const story: Meta<typeof Spoiler> = {
  title: 'Components/Containers/Spoiler',
  component: Spoiler,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

// ─── Settings Page ────────────────────────────────────────────────────────────

type AccentColor = 'blue' | 'teal' | 'purple' | 'pink' | 'amber';
type ThemeMode = 'light' | 'dark' | 'system';
type PlanTier = 'free' | 'pro' | 'team';

const ACCENT_COLORS: { id: AccentColor; label: string; color: React.ComponentProps<typeof Label>['color'] }[] = [
  { id: 'blue',   label: 'Blue',   color: 'blue' },
  { id: 'teal',   label: 'Teal',   color: 'teal' },
  { id: 'purple', label: 'Purple', color: 'purple' },
  { id: 'pink',   label: 'Pink',   color: 'pink' },
  { id: 'amber',  label: 'Amber',  color: 'amber' },
];

const PLAN_CONFIG: Record<PlanTier, { label: string; color: React.ComponentProps<typeof Label>['color']; seats: string; storage: string; price: string }> = {
  free:  { label: 'Free',  color: 'default', seats: '1 seat',      storage: '1 GB',   price: '$0 / mo' },
  pro:   { label: 'Pro',   color: 'blue',    seats: '1 seat',      storage: '50 GB',  price: '$12 / mo' },
  team:  { label: 'Team',  color: 'purple',  seats: 'Up to 25',    storage: '500 GB', price: '$49 / mo' },
};

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <Flex align="center" style={{ minHeight: 40 }}>
      <Flex direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
        <Text size={3} block>{label}</Text>
        {description && <Text size={2} color="secondary" block>{description}</Text>}
      </Flex>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </Flex>
  );
}

export const AppSettingsStory: StoryObj<typeof Flex> = {
  name: 'App Settings',
  render: () => {
    // Appearance
    const [theme, setTheme] = useState<ThemeMode>('system');
    const [accent, setAccent] = useState<AccentColor>('blue');
    const [reduceMotion, setReduceMotion] = useState(false);
    const [compactMode, setCompactMode] = useState(false);

    // Notifications
    const [notifyComments, setNotifyComments] = useState(true);
    const [notifyMentions, setNotifyMentions] = useState(true);
    const [notifyDigest, setNotifyDigest] = useState(false);
    const [notifyPush, setNotifyPush] = useState(false);

    // Privacy
    const [analytics, setAnalytics] = useState(true);
    const [errorReporting, setErrorReporting] = useState(true);
    const [publicProfile, setPublicProfile] = useState(false);

    // Billing
    const [plan] = useState<PlanTier>('pro');

    // Developer
    const [debugMode, setDebugMode] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);

    // Track expanded
    const [expandedCount, setExpandedCount] = useState(1);
    const handleToggle = (opened: boolean) =>
      setExpandedCount((n) => opened ? n + 1 : n - 1);

    const planInfo = PLAN_CONFIG[plan];

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
        <Flex direction="vertical" gap="xs">
          <Text size={5} weight="bold" block>Settings</Text>
          <Text color="secondary" block>
            {expandedCount} section{expandedCount !== 1 ? 's' : ''} expanded
          </Text>
        </Flex>

        <Flex direction="vertical" gap="s">

          {/* ── Appearance ── */}
          <Spoiler title="Appearance" openedByDefault onToggle={handleToggle}>
            <Flex direction="vertical" gap="m">
              <SettingRow label="Theme">
                <Flex gap="xs">
                  {(['light', 'dark', 'system'] as ThemeMode[]).map((t) => (
                    <Button
                      key={t}
                      size="s"
                      label={t.charAt(0).toUpperCase() + t.slice(1)}
                      selected={theme === t}
                      onClick={() => setTheme(t)}
                    />
                  ))}
                </Flex>
              </SettingRow>

              <SettingRow label="Accent color">
                <Flex gap="xs">
                  {ACCENT_COLORS.map(({ id, label, color }) => (
                    <Label
                      key={id}
                      color={color}
                      variant={accent === id ? 'solid' : 'soft'}
                      size="s"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setAccent(id)}
                    >
                      {label}
                    </Label>
                  ))}
                </Flex>
              </SettingRow>

              <SettingRow
                label="Reduce motion"
                description="Disable animations across the interface"
              >
                <Checkbox checked={reduceMotion} onChange={setReduceMotion} />
              </SettingRow>

              <SettingRow
                label="Compact mode"
                description="Decrease spacing and component sizes"
              >
                <Checkbox checked={compactMode} onChange={setCompactMode} />
              </SettingRow>
            </Flex>
          </Spoiler>

          {/* ── Notifications ── */}
          <Spoiler title="Notifications" onToggle={handleToggle}>
            <Flex direction="vertical" gap="m">
              <SettingRow label="New comments" description="Notify when someone comments on your work">
                <Checkbox checked={notifyComments} onChange={setNotifyComments} />
              </SettingRow>
              <SettingRow label="Mentions" description="Notify when you're mentioned in a thread">
                <Checkbox checked={notifyMentions} onChange={setNotifyMentions} />
              </SettingRow>
              <SettingRow label="Weekly digest" description="Summary of activity sent every Monday">
                <Checkbox checked={notifyDigest} onChange={setNotifyDigest} />
              </SettingRow>
              <SettingRow label="Push notifications" description="Browser and mobile push alerts">
                <Checkbox checked={notifyPush} onChange={setNotifyPush} />
              </SettingRow>
            </Flex>
          </Spoiler>

          {/* ── Privacy ── */}
          <Spoiler title="Privacy & Data" onToggle={handleToggle}>
            <Flex direction="vertical" gap="m">
              <SettingRow
                label="Usage analytics"
                description="Help improve the product by sharing anonymous usage data"
              >
                <Checkbox checked={analytics} onChange={setAnalytics} />
              </SettingRow>
              <SettingRow
                label="Crash reports"
                description="Automatically send error reports to our team"
              >
                <Checkbox checked={errorReporting} onChange={setErrorReporting} />
              </SettingRow>
              <SettingRow
                label="Public profile"
                description="Allow others to find your profile by name or email"
              >
                <Checkbox checked={publicProfile} onChange={setPublicProfile} />
              </SettingRow>
              <Button size="s" label="Download my data" />
            </Flex>
          </Spoiler>

          {/* ── Billing ── */}
          <Spoiler title="Plan & Billing" onToggle={handleToggle}>
            <Flex direction="vertical" gap="m">
              <SettingRow label="Current plan">
                <Label color={planInfo.color} variant="soft">{planInfo.label}</Label>
              </SettingRow>
              <SettingRow label="Seats">
                <Text size={3}>{planInfo.seats}</Text>
              </SettingRow>
              <SettingRow label="Storage">
                <Text size={3}>{planInfo.storage}</Text>
              </SettingRow>
              <SettingRow label="Price">
                <Text size={3} weight="bold">{planInfo.price}</Text>
              </SettingRow>
              <Flex gap="s">
                <Button size="s" label="Upgrade to Team" />
                <Button size="s" label="Manage subscription" />
              </Flex>
            </Flex>
          </Spoiler>

          {/* ── Developer ── */}
          <Spoiler title="Developer" onToggle={handleToggle}>
            <Flex direction="vertical" gap="m">
              <SettingRow label="API key">
                <Flex gap="xs" align="center">
                  <Label variant="soft" color="default" size="s">
                    {showApiKey ? 'sk-live-xK9mP2qR4nL7wT1' : 'sk-live-••••••••••••••••'}
                  </Label>
                  <Button
                    size="s"
                    label={showApiKey ? 'Hide' : 'Reveal'}
                    onClick={() => setShowApiKey((v) => !v)}
                  />
                </Flex>
              </SettingRow>
              <SettingRow
                label="Debug mode"
                description="Log component renders and context updates to console"
              >
                <Checkbox checked={debugMode} onChange={setDebugMode} />
              </SettingRow>
              <SettingRow label="SDK version">
                <Label variant="soft" color="teal" size="s">v3.14.2</Label>
              </SettingRow>
              <Flex gap="s">
                <Button size="s" label="Regenerate API key" />
                <Button size="s" label="View docs" />
              </Flex>
            </Flex>
          </Spoiler>

        </Flex>
      </Flex>
    );
  },
};

export default story;
