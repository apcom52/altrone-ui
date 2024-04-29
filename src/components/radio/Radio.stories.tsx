import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Align, Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { Radio } from './Radio.tsx';
import { useState } from 'react';
import { CollapsedList } from '../collapsedList/CollapsedList.tsx';

const story: Meta<typeof Radio> = {
  title: 'Components/Form/Radio',
  component: Radio,
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

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using Checkboxes',
  render: () => {
    const [gender, setGender] = useState('');
    const [marriage, setMarriage] = useState('single');
    const [paymentMethod, setPaymentMethod] = useState('dd');
    const [contactMethod, setContactMethod] = useState('sms');

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic Radio lists
        </Text.Heading>
        <Flex
          direction={Direction.horizontal}
          gap={Gap.large}
          align={Align.center}
        >
          <Text.Paragraph>Choose your gender:</Text.Paragraph>
          <Radio value={gender} onChange={setGender} name="gender">
            <Radio.Item value="male">Male</Radio.Item>
            <Radio.Item value="female">Female</Radio.Item>
          </Radio>
        </Flex>
        <Flex
          direction={Direction.horizontal}
          gap={Gap.large}
          align={Align.center}
        >
          <Text.Paragraph>Choose your marital status:</Text.Paragraph>
          <Radio value={marriage} onChange={setMarriage} name="marriage">
            <Radio.Item value="single">Single</Radio.Item>
            <Radio.Item value="married">Married</Radio.Item>
            <Radio.Item value="divorced">Divorced</Radio.Item>
            <Radio.Item value="widowed" disabled>
              Widowed
            </Radio.Item>
          </Radio>
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Vertical Radio lists
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.xlarge}>
          <Flex direction={Direction.vertical} gap={Gap.large}>
            <Text.Paragraph>Choose payment method:</Text.Paragraph>
            <Radio
              direction={Direction.vertical}
              value={paymentMethod}
              onChange={setPaymentMethod}
              name="paymentMethod"
            >
              <Radio.Item value="cc">Credit Card</Radio.Item>
              <Radio.Item value="dd">Direct Debit</Radio.Item>
              <Radio.Item value="pp">PayPal</Radio.Item>
              <Radio.Item value="bt">Bank Transfer</Radio.Item>
            </Radio>
          </Flex>
          <Flex direction={Direction.vertical} gap={Gap.large}>
            <Text.Paragraph>Preferred Contact Method:</Text.Paragraph>
            <Radio
              direction={Direction.vertical}
              value={contactMethod}
              onChange={setContactMethod}
              name="contact"
            >
              <CollapsedList gap={Gap.medium} limit={3}>
                <Radio.Item value="email">Email</Radio.Item>
                <Radio.Item value="phone">Phone</Radio.Item>
                <Radio.Item value="sms">SMS</Radio.Item>
                <Radio.Item value="mail">Mail</Radio.Item>
                <Radio.Item value="fax">Fax</Radio.Item>
                <Radio.Item value="none">None</Radio.Item>
              </CollapsedList>
            </Radio>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export default story;
