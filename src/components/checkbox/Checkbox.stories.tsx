import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text, TextHeadingRoles } from '../text';
// import { userEvent, within, expect } from '@storybook/test';
import { Checkbox } from './Checkbox.tsx';
import { useEffect, useRef, useState } from 'react';

const story: Meta<typeof Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
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
    const isFirstRender = useRef(true);

    const [value1Indetermine, setValue1Indetermine] = useState(true);
    const [value1, setValue1] = useState(false);
    const [value2, setValue2] = useState(true);
    const [value3, setValue3] = useState(false);
    const [value4, setValue4] = useState(false);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (value1) {
        setValue2(true);
        setValue3(true);
        setValue4(true);
      } else {
        setValue2(false);
        setValue3(false);
        setValue4(false);
      }
    }, [value1]);

    useEffect(() => {
      if (value2 && value3 && value4) {
        setValue1Indetermine(false);
        setValue1(true);
      } else if (value2 || value3 || value4) {
        setValue1Indetermine(true);
        setValue1(false);
      } else {
        setValue1Indetermine(false);
        setValue1(false);
      }
    }, [value2, value3, value4]);

    return (
      <Flex gap="large">
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic Checkboxes
        </Text.Heading>
        <Flex direction="horizontal" gap="large" align="center">
          <Text.Paragraph>Permissions:</Text.Paragraph>
          <Checkbox
            checked={value1}
            onChange={setValue1}
            indeterminate={value1Indetermine}
          >
            All actions
          </Checkbox>
          <Checkbox checked={value2} onChange={setValue2}>
            Read
          </Checkbox>
          <Checkbox checked={value3} onChange={setValue3}>
            Write
          </Checkbox>
          <Checkbox danger checked={value4} onChange={setValue4}>
            Delete
          </Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
        </Flex>
      </Flex>
    );
  },
  play: ({ canvasElement, step }) => {
    // const canvas = within(canvasElement);
  },
};

export default story;
