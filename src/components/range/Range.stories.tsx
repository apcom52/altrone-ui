import { Meta, StoryObj } from '@storybook/react';
import { Flex, Form, Grid, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Range } from './Range.tsx';
import { useState } from 'react';
import { ALargeSmall, SunMedium } from 'lucide-react';

const story: Meta<typeof Range> = {
  title: 'Components/Controls/Range',
  component: Range,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const RangeStory: StoryObj<typeof Range> = {
  name: 'Using Range',
  render: () => {
    const [value1, setValue1] = useState(3);
    const [value2, setValue2] = useState(100);
    const [value3, setValue3] = useState(25);

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Horizontal ranges
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`Default range [value: ${value1}]`}>
                <Range
                  value={value1}
                  onChange={setValue1}
                  icon={<ALargeSmall />}
                  renderLabel={(value) => `${value}pt`}
                  onValueCommit={(value) => console.log('onValueCommit', value)}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`From -100 to 200 [value: ${value2}]`}>
                <Range
                  min={-100}
                  max={200}
                  value={value2}
                  step={10}
                  onChange={setValue2}
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`Default range [value: ${value1}]`}>
                <Range
                  value={value1}
                  onChange={setValue1}
                  icon={<ALargeSmall />}
                  size="s"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`From -100 to 200 [value: ${value2}]`}>
                <Range
                  min={-100}
                  max={200}
                  value={value2}
                  step={10}
                  onChange={setValue2}
                  size="s"
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`Font size`}>
                <Range
                  value={value1}
                  onChange={setValue1}
                  icon={<ALargeSmall />}
                  size="l"
                  style={{ width: '100px' }}
                  renderLabel={(value) => `${value}pt`}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`From -100 to 200 [value: ${value2}]`}>
                <Range
                  min={-100}
                  max={200}
                  value={value2}
                  step={10}
                  onChange={setValue2}
                  size="l"
                  showCurrentValue="always"
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`Disabled range`}>
                <Range
                  value={10}
                  onChange={() => null}
                  icon={<ALargeSmall />}
                  size="l"
                  disabled
                  style={{ width: '200px' }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`Read-only range`}>
                <Range
                  min={-100}
                  max={200}
                  value={150}
                  step={10}
                  onChange={() => null}
                  size="l"
                  readOnly
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>
        <Text size={5} weight="bold" block>
          Vertical ranges
        </Text>
        <Flex gap="l">
          <Range
            value={value3}
            onChange={setValue3}
            direction="vertical"
            size="m"
            style={{ height: '300px' }}
          />
          <Range
            value={value3}
            onChange={setValue3}
            direction="vertical"
            size="s"
            min={0}
            max={100}
            icon={<SunMedium />}
            style={{ height: '200px' }}
          />
          <Range
            value={value3}
            onChange={setValue3}
            direction="vertical"
            size="l"
            showCurrentValue="always"
            style={{ height: '200px' }}
            icon={<SunMedium />}
          />
          <Range
            value={value3}
            onChange={setValue3}
            direction="vertical"
            size="l"
            showCurrentValue="always"
            disabled
            style={{ height: '200px' }}
          />
          <Range
            value={value3}
            onChange={setValue3}
            direction="vertical"
            size="l"
            readOnly
            style={{ height: '200px' }}
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
