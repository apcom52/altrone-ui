import { StoryObj } from '@storybook/react';
import { Flex, Grid, Text } from 'components';
import { useState } from 'react';
import { DataGrid } from '../DataGrid.tsx';

const PLAN_PRICES: Record<string, number> = {
  free: 0,
  starter: 29,
  business: 99,
  enterprise: 399,
};

const PLAN_LIMITS: Record<string, string> = {
  free: '3 seats · 5 GB storage',
  starter: '10 seats · 50 GB storage',
  business: '50 seats · 500 GB storage',
  enterprise: 'Unlimited seats · 5 TB storage',
};

const INITIAL_DATA: Record<string, unknown> = {
  // Company Info
  companyName: 'Helix Systems Ltd.',
  industry: 'software',
  website: 'https://helix-systems.io',
  companySize: 'small',

  // Billing
  plan: 'business',
  billingEmail: 'billing@helix-systems.io',
  nextBillingDate: '2025-04-01',
  autoRenew: true,
  apiKey: 'hx_live_sk_4f8a2c91b3d0e7f56a2b',
  invoiceUrl: 'https://billing.helix-systems.io/invoices/latest',

  // Preferences
  language: 'en',
  timezone: 'europe_moscow',
  emailNotifications: true,
  weeklyDigest: false,
  brandColor: '#6366F1',
};

export const SubscriptionStory: StoryObj<typeof Flex> = {
  name: 'SaaS Account — Subscription & Settings',
  render: () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [mode, setMode] = useState<'read' | 'edit' | 'loading'>('read');

    const handleChange = (field: string, value: unknown) =>
      setData((prev) => ({ ...prev, [field]: value }));

    const plan = String(data.plan ?? 'free');
    const monthlyPrice = PLAN_PRICES[plan] ?? 0;
    const annualPrice = monthlyPrice * 12;
    const planLimits = PLAN_LIMITS[plan] ?? '';
    const brandColor = String(data.brandColor ?? '#6366F1');
    const autoRenew = Boolean(data.autoRenew);
    const nextBilling = String(data.nextBillingDate ?? '');

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Account Settings — Subscription &amp; Preferences
        </Text>
        <Text block>
          Billing fields (Plan, Price, Next Billing Date, API Key, Invoice URL)
          are read-only — these are managed by the billing system. Change the
          Plan in "Billing" group to see the summary panel update.
        </Text>

        <Grid>
          <Grid.Column span={8}>
            <DataGrid
              data={data}
              mode={mode}
              onChange={handleChange}
              onChangeMode={(m) => setMode(m as typeof mode)}
              groups={[
                { name: 'company', title: 'Company Info' },
                { name: 'billing', title: 'Billing' },
                { name: 'prefs', title: 'Preferences' },
              ]}
              fields={[
                // ── Company Info ──────────────────────────────────────────
                {
                  accessor: 'companyName',
                  label: 'Company Name',
                  type: 'string',
                  group: 'company',
                  maxLength: 80,
                },
                {
                  accessor: 'industry',
                  label: 'Industry',
                  type: 'select',
                  group: 'company',
                  options: [
                    { value: 'software', label: 'Software / SaaS' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'healthcare', label: 'Healthcare' },
                    { value: 'retail', label: 'Retail / E-commerce' },
                    { value: 'education', label: 'Education' },
                    { value: 'other', label: 'Other' },
                  ],
                },
                {
                  accessor: 'companySize',
                  label: 'Company Size',
                  type: 'select',
                  group: 'company',
                  options: [
                    { value: 'solo', label: 'Solo / Freelance' },
                    { value: 'small', label: '2–50 employees' },
                    { value: 'medium', label: '51–500 employees' },
                    { value: 'large', label: '500+ employees' },
                  ],
                },
                {
                  accessor: 'website',
                  label: 'Website',
                  type: 'link',
                  group: 'company',
                  linkText: 'Visit site',
                  linkTransformer: (v) => String(v),
                },

                // ── Billing ───────────────────────────────────────────────
                {
                  accessor: 'plan',
                  label: 'Plan',
                  type: 'select',
                  group: 'billing',
                  options: [
                    { value: 'free', label: 'Free' },
                    { value: 'starter', label: 'Starter' },
                    { value: 'business', label: 'Business' },
                    { value: 'enterprise', label: 'Enterprise' },
                  ],
                  editable: false,
                },
                {
                  accessor: 'billingEmail',
                  label: 'Billing Email',
                  type: 'string',
                  group: 'billing',
                  maxLength: 100,
                },
                {
                  accessor: 'nextBillingDate',
                  label: 'Next Billing Date',
                  type: 'date',
                  group: 'billing',
                  editable: false,
                },
                {
                  accessor: 'autoRenew',
                  label: 'Auto-renew',
                  type: 'boolean',
                  group: 'billing',
                  trueLabel: 'Enabled',
                  falseLabel: 'Disabled',
                },
                {
                  accessor: 'apiKey',
                  label: 'API Key',
                  type: 'password',
                  group: 'billing',
                  editable: false,
                },
                {
                  accessor: 'invoiceUrl',
                  label: 'Latest Invoice',
                  type: 'link',
                  group: 'billing',
                  linkText: 'Download PDF',
                  linkTransformer: (v) => String(v),
                  editable: false,
                },

                // ── Preferences ───────────────────────────────────────────
                {
                  accessor: 'language',
                  label: 'Language',
                  type: 'select',
                  group: 'prefs',
                  options: [
                    { value: 'en', label: 'English' },
                    { value: 'de', label: 'German' },
                    { value: 'fr', label: 'French' },
                    { value: 'ru', label: 'Russian' },
                    { value: 'es', label: 'Spanish' },
                  ],
                },
                {
                  accessor: 'timezone',
                  label: 'Timezone',
                  type: 'select',
                  group: 'prefs',
                  options: [
                    { value: 'utc', label: 'UTC+0' },
                    { value: 'europe_london', label: 'London (UTC+0/+1)' },
                    { value: 'europe_berlin', label: 'Berlin (UTC+1/+2)' },
                    { value: 'europe_moscow', label: 'Moscow (UTC+3)' },
                    { value: 'america_new_york', label: 'New York (UTC-5/-4)' },
                    {
                      value: 'america_los_angeles',
                      label: 'Los Angeles (UTC-8/-7)',
                    },
                    { value: 'asia_tokyo', label: 'Tokyo (UTC+9)' },
                  ],
                },
                {
                  accessor: 'emailNotifications',
                  label: 'Email Notifications',
                  type: 'boolean',
                  group: 'prefs',
                },
                {
                  accessor: 'weeklyDigest',
                  label: 'Weekly Digest',
                  type: 'boolean',
                  group: 'prefs',
                },
                {
                  accessor: 'brandColor',
                  label: 'Brand Color',
                  type: 'color',
                  group: 'prefs',
                  allowPalette: false,
                  colorPresets: [
                    { name: 'Indigo', title: 'Indigo', value: '#6366F1' },
                    { name: 'Emerald', title: 'Emerald', value: '#10B981' },
                    { name: 'Rose', title: 'Rose', value: '#F43F5E' },
                    { name: 'Amber', title: 'Amber', value: '#F59E0B' },
                    { name: 'Sky', title: 'Sky', value: '#0EA5E9' },
                  ],
                },
              ]}
            />
          </Grid.Column>

          {/* Billing Summary Card */}
          <Grid.Column span={4}>
            <Flex direction="vertical" gap="m">
              <Text weight="bold" block>
                Billing Summary
              </Text>

              {/* Plan card */}
              <div
                style={{
                  border: `2px solid ${brandColor}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  fontFamily: 'var(--font-family-base)',
                }}
              >
                {/* Plan header */}
                <div
                  style={{
                    background: brandColor,
                    padding: '14px 18px',
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 10, opacity: 0.75, letterSpacing: 2 }}
                    >
                      CURRENT PLAN
                    </div>
                    <div
                      style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}
                    >
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </div>
                  </div>
                  {monthlyPrice === 0 ? (
                    <span style={{ fontSize: 20, fontWeight: 700 }}>Free</span>
                  ) : (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 22, fontWeight: 700 }}>
                        ${monthlyPrice}
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.75 }}>/month</div>
                    </div>
                  )}
                </div>

                {/* Plan details */}
                <div
                  style={{
                    padding: '14px 18px',
                    background: 'var(--background-1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      color: 'var(--disabled-text-color)',
                      fontSize: 12,
                    }}
                  >
                    {planLimits}
                  </Text>

                  <div style={{ height: 1, background: 'var(--border-1)' }} />

                  {/* Annual cost */}
                  {monthlyPrice > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text>Annual total</Text>
                      <Text weight="bold">${annualPrice.toLocaleString()}</Text>
                    </div>
                  )}

                  {/* Next billing */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text>Next billing</Text>
                    <Text weight="bold">{nextBilling || '—'}</Text>
                  </div>

                  {/* Auto-renew badge */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text>Auto-renew</Text>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 10px',
                        borderRadius: 20,
                        background: autoRenew ? '#dcfce7' : '#fee2e2',
                        color: autoRenew ? '#15803d' : '#b91c1c',
                      }}
                    >
                      {autoRenew ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </div>

                  {/* Company name */}
                  <div style={{ height: 1, background: 'var(--border-1)' }} />
                  <Text
                    style={{
                      color: 'var(--disabled-text-color)',
                      fontSize: 12,
                    }}
                  >
                    Billed to: {String(data.companyName || '—')}
                  </Text>
                </div>
              </div>
            </Flex>
          </Grid.Column>
        </Grid>
      </Flex>
    );
  },
};
