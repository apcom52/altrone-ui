import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Flex, Radio, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Size } from 'types';

const story: Meta<typeof Radio> = {
  title: 'Components/Controls/Radio',
  component: Radio,
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

export default story;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 620, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Text block size={3} color="muted">
    {children}
  </Text>
);

// ─── 1. Layout ───────────────────────────────────────────────────────────────

export const OverviewStory: StoryObj<typeof Radio> = {
  name: 'Horizontal and vertical',
  render: () => {
    const [status, setStatus] = useState('single');
    const [plan, setPlan] = useState('pro');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Text size={7} weight="bold" block>
          Radio
        </Text>
        <Paragraph>
          A group of mutually exclusive options. <Text code>Radio</Text> is the
          controlled container (<Text code>value</Text> +{' '}
          <Text code>onChange</Text>, which reports the picked item&rsquo;s{' '}
          <Text code>value</Text> as a string); <Text code>Radio.Item</Text> is
          each option. The items share a <Text code>name</Text>, so the browser
          handles arrow-key movement between them.
        </Paragraph>

        <Heading>Inline</Heading>
        <Radio value={status} onChange={setStatus} name="status">
          <Radio.Item value="single">Single</Radio.Item>
          <Radio.Item value="married">Married</Radio.Item>
          <Radio.Item value="divorced">Divorced</Radio.Item>
        </Radio>

        <Heading>Stacked</Heading>
        <Radio
          direction="vertical"
          value={plan}
          onChange={setPlan}
          name="plan"
        >
          <Radio.Item value="free">Free — $0 / month</Radio.Item>
          <Radio.Item value="pro">Pro — $12 / month</Radio.Item>
          <Radio.Item value="enterprise">Enterprise — contact sales</Radio.Item>
        </Radio>
      </Flex>
    );
  },
};

// ─── 2. Disabled ─────────────────────────────────────────────────────────────

export const DisabledStory: StoryObj<typeof Radio> = {
  name: 'Disabled — whole group or one option',
  render: () => {
    const [role, setRole] = useState('editor');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>One option locked</Heading>
        <Paragraph>
          <Text code>disabled</Text> on a single <Text code>Radio.Item</Text>{' '}
          takes it out of the group; on the <Text code>Radio</Text> container it
          disables every option at once.
        </Paragraph>
        <Radio value={role} onChange={setRole} name="role" direction="vertical">
          <Radio.Item value="viewer">Viewer</Radio.Item>
          <Radio.Item value="editor">Editor</Radio.Item>
          <Radio.Item value="admin" disabled>
            Admin — requires an approved request
          </Radio.Item>
        </Radio>

        <Heading>Entire group</Heading>
        <Radio value="weekly" onChange={() => {}} name="digest" disabled>
          <Radio.Item value="daily">Daily</Radio.Item>
          <Radio.Item value="weekly">Weekly</Radio.Item>
          <Radio.Item value="never">Never</Radio.Item>
        </Radio>
      </Flex>
    );
  },
};

// ─── 3. Sizes ────────────────────────────────────────────────────────────────

const SIZES: Size[] = ['mini', 's', 'm', 'l', 'xl'];

export const SizesStory: StoryObj<typeof Radio> = {
  name: 'Sizes',
  render: () => {
    const [values, setValues] = useState<Record<string, string>>(
      Object.fromEntries(SIZES.map((sz) => [sz, 'b'])),
    );

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>mini, s, m, l, xl</Heading>
        <Paragraph>
          <Text code>size</Text> on the <Text code>Radio</Text> container scales
          every option; a single <Text code>Radio.Item</Text> can override it.
          The clickable row never drops below 24px.
        </Paragraph>

        <Flex direction="vertical" gap="m">
          {SIZES.map((sz) => (
            <Radio
              key={sz}
              size={sz}
              name={`size-${sz}`}
              value={values[sz]}
              onChange={(next) =>
                setValues((prev) => ({ ...prev, [sz]: next }))
              }
            >
              <Radio.Item value="a">First</Radio.Item>
              <Radio.Item value="b">size=&quot;{sz}&quot;</Radio.Item>
              <Radio.Item value="c">Third</Radio.Item>
            </Radio>
          ))}
        </Flex>
      </Flex>
    );
  },
};

// ─── 4. A choice card ────────────────────────────────────────────────────────

const SHIPPING = [
  { value: 'standard', title: 'Standard', meta: '3–5 business days · free' },
  { value: 'express', title: 'Express', meta: 'Next business day · $9' },
  { value: 'pickup', title: 'Pick up in store', meta: 'Ready in 2 hours · free' },
];

export const ChoiceCardStory: StoryObj<typeof Radio> = {
  name: 'Rich labels',
  render: () => {
    const [method, setMethod] = useState('express');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>A label can be more than one line</Heading>
        <Paragraph>
          <Text code>children</Text> takes any node — the whole row still
          toggles the option because it&rsquo;s wrapped in the{' '}
          <Text code>{'<label>'}</Text>.
        </Paragraph>

        <Radio
          direction="vertical"
          value={method}
          onChange={setMethod}
          name="shipping"
        >
          {SHIPPING.map(({ value, title, meta }) => (
            <Radio.Item key={value} value={value}>
              <Flex direction="vertical">
                <Text>{title}</Text>
                <Text size={3} color="muted">
                  {meta}
                </Text>
              </Flex>
            </Radio.Item>
          ))}
        </Radio>
        <Caption>Selected: {method}</Caption>
      </Flex>
    );
  },
};
