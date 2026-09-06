import { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import {
  MoneyInput,
  OrderEditor,
  PortForwarding,
  SplitBill,
} from './stories';

const story: Meta<typeof NumberInput> = {
  title: 'Components/Controls/NumberInput',
  component: NumberInput,
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

export const OrderLineItems: StoryObj = {
  name: 'An order, line by line',
  render: () => <OrderEditor />,
};

export const FormattedMoney: StoryObj = {
  name: 'Money, formatted as you type',
  render: () => <MoneyInput />,
};

export const BillSplitter: StoryObj = {
  name: 'Split the bill',
  render: () => <SplitBill />,
};

export const Ports: StoryObj = {
  name: 'Port forwarding rules',
  render: () => <PortForwarding />,
};

export default story;
