import { Meta, StoryObj } from '@storybook/react';
import { Grid } from './index.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { StorybookGridCell } from '../../global/storybook/StorybookGridCell.tsx';

const story: Meta<typeof Grid> = {
  title: 'Components/Containers/Grid',
  component: Grid,
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

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using Grid',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading variant="inner">Basic Grid</Text.Heading>
        <Grid style={{ margin: '1rem 0' }}>
          <Grid.Column size={4}>
            <StorybookGridCell>Column 4</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={6}>
            <StorybookGridCell>Column 6</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
        </Grid>
        <Text.Heading variant="inner">Grid with auto columns</Text.Heading>
        <Grid style={{ margin: '1rem 0' }} gap="xxl">
          <Grid.Column size={3}>
            <StorybookGridCell>Column 3</StorybookGridCell>
          </Grid.Column>
          <Grid.Column>
            <StorybookGridCell>Auto</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
        </Grid>
        <Text.Heading variant="inner">Grid with offsets</Text.Heading>
        <Grid style={{ margin: '1rem 0' }} gap="xxl">
          <Grid.Column size={3}>
            <StorybookGridCell>Column 3</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={4} offset={2}>
            <StorybookGridCell>Column 4</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={1}>
            <StorybookGridCell>Column 1</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
        </Grid>
        <Grid style={{ margin: '1rem 0' }} gap="xxl">
          <Grid.Column size={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={2} offset={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={2} offset={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
        </Grid>
        <Grid style={{ margin: '1rem 0' }} gap="xxl">
          <Grid.Column size={2} offset={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={2} offset={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
          <Grid.Column size={2} offset={2}>
            <StorybookGridCell>Column 2</StorybookGridCell>
          </Grid.Column>
        </Grid>
      </Flex>
    );
  },
};

export default story;
