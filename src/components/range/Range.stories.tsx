import { Meta, StoryObj } from '@storybook/react';
import { Flex, Form, Grid, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Range } from './Range.tsx';
import { useState } from 'react';

const story: Meta<typeof Range> = {
  title: 'Components/Form/Range',
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
        <Text.Heading role="inner">Horizontal ranges</Text.Heading>
        <Form>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label={`Default range [value: ${value1}]`}>
                <Range
                  value={value1}
                  onChange={setValue1}
                  icon={<Icon i="format_size" />}
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
                  icon={<Icon i="format_size" />}
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
              <Form.Field label={`Default range [value: ${value1}]`}>
                <Range
                  value={value1}
                  onChange={setValue1}
                  icon={<Icon i="format_size" />}
                  size="l"
                  style={{ width: '100px' }}
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
                  icon={<Icon i="format_size" />}
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
        <Text.Heading role="inner">Vertical ranges</Text.Heading>
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
            icon={<Icon i="brightness_4" />}
            style={{ height: '200px' }}
          />
          <Range
            value={value3}
            onChange={setValue3}
            direction="vertical"
            size="l"
            showCurrentValue="always"
            style={{ height: '200px' }}
            icon={<Icon i="brightness_4" />}
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
