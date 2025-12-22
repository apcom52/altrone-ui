import { Meta, StoryObj } from '@storybook/react';
import { Button, DataGrid, Flex } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Drawer } from './Drawer.tsx';
import { DATA_GRID_DATA } from 'components/dataGrid/DataGrid.stories.tsx';

const story: Meta<typeof Drawer> = {
  title: 'Components/Containers/Drawer',
  component: Drawer,
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

export const PaginationStory: StoryObj<typeof Drawer> = {
  name: 'Using Drawer',
  render: () => {
    return (
      <Flex direction="vertical" gap="l" align="start">
        <Drawer
          title="Very Long Drawer Title with a lot of text that should wrap"
          onDone={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(true);
              }, 1000);
            });
          }}
          content={
            <DataGrid
              data={DATA_GRID_DATA}
              onChange={() => {}}
              mode="read"
              showToolbar={false}
              onChangeMode={() => {}}
              fields={[
                {
                  accessor: 'username',
                  label: 'Object Name',
                  type: 'string',
                  maxLength: 40,
                },
                {
                  accessor: 'description',
                  label: 'Description',
                  type: 'text',
                  maxLength: 500,
                },
                {
                  accessor: 'age',
                  label: 'Protocol Version (field with a very long label)',
                  type: 'number',
                  min: 0,
                  max: 300,
                },
                {
                  accessor: 'salary',
                  label: 'Energy Balance',
                  type: 'currency',
                  currency: 'CRD', // fictional currency "Creds"
                },
                {
                  accessor: 'secretKey',
                  label: 'Security Key',
                  type: 'password',
                },
                {
                  accessor: 'birthDate',
                  label: 'Activation Date',
                  type: 'date',
                  minDate: '2000-01-01',
                },
                {
                  accessor: 'contractMonth',
                  label: 'Sync Month',
                  type: 'date',
                  level: 'month',
                },
                {
                  accessor: 'foundationYear',
                  label: 'Log Year',
                  type: 'date',
                  level: 'year',
                },
                {
                  accessor: 'isActive',
                  label: 'Active',
                  type: 'boolean',
                },
                {
                  accessor: 'isActive',
                  type: 'boolean',
                  trueLabel: 'Yes',
                  falseLabel: 'No',
                },
                {
                  accessor: 'role',
                  label: 'Category',
                  type: 'select',
                  options: [
                    { value: 'observer', label: 'Observer' },
                    { value: 'executor', label: 'Executor' },
                    { value: 'sentinel', label: 'Sentinel' },
                    { value: 'archivist', label: 'Archivist' },
                  ],
                },
                {
                  accessor: 'roles',
                  label: 'Categories',
                  type: 'select',
                  multiple: true,
                  options: [
                    { value: 'observer', label: 'Observer' },
                    { value: 'executor', label: 'Executor' },
                    { value: 'sentinel', label: 'Sentinel' },
                    { value: 'archivist', label: 'Archivist' },
                  ],
                },
                {
                  accessor: 'website',
                  label: 'Archive Link',
                  type: 'link',
                  linkText: 'Open Record',
                  linkTransformer: (value) => String(value),
                },
                {
                  accessor: 'themeColor',
                  label: 'Theme Color',
                  type: 'color',
                  colorPresets: [
                    { name: 'Purple', title: 'Purple', value: '#7F5DFF' },
                    { name: 'Orange', title: 'Orange', value: '#FF7F5D' },
                    { name: 'Green', title: 'Green', value: '#5DFF7F' },
                    { name: 'Blue', title: 'Blue', value: '#5D7FFF' },
                  ],
                  allowPalette: true,
                },
              ]}
            />
          }
        >
          <Button label="Open drawer" />
        </Drawer>
        <Drawer
          title="Very Long Drawer Title with a lot of text that should wrap"
          placement="end"
          width={600}
          content={
            <DataGrid
              data={DATA_GRID_DATA}
              onChange={() => {}}
              mode="read"
              showToolbar={false}
              onChangeMode={() => {}}
              fields={[
                {
                  accessor: 'username',
                  label: 'Object Name',
                  type: 'string',
                  maxLength: 40,
                },
                {
                  accessor: 'description',
                  label: 'Description',
                  type: 'text',
                  maxLength: 500,
                },
                {
                  accessor: 'age',
                  label: 'Protocol Version',
                  type: 'number',
                  min: 0,
                  max: 300,
                },
                {
                  accessor: 'salary',
                  label: 'Energy Balance',
                  type: 'currency',
                  currency: 'CRD', // fictional currency "Creds"
                },
                {
                  accessor: 'secretKey',
                  label: 'Security Key',
                  type: 'password',
                },
                {
                  accessor: 'birthDate',
                  label: 'Activation Date',
                  type: 'date',
                  minDate: '2000-01-01',
                },
                {
                  accessor: 'contractMonth',
                  label: 'Sync Month',
                  type: 'date',
                  level: 'month',
                },
                {
                  accessor: 'foundationYear',
                  label: 'Log Year',
                  type: 'date',
                  level: 'year',
                },
                {
                  accessor: 'isActive',
                  label: 'Active',
                  type: 'boolean',
                },
                {
                  accessor: 'isActive',
                  type: 'boolean',
                  trueLabel: 'Yes',
                  falseLabel: 'No',
                },
                {
                  accessor: 'role',
                  label: 'Category',
                  type: 'select',
                  options: [
                    { value: 'observer', label: 'Observer' },
                    { value: 'executor', label: 'Executor' },
                    { value: 'sentinel', label: 'Sentinel' },
                    { value: 'archivist', label: 'Archivist' },
                  ],
                },
                {
                  accessor: 'roles',
                  label: 'Categories',
                  type: 'select',
                  multiple: true,
                  options: [
                    { value: 'observer', label: 'Observer' },
                    { value: 'executor', label: 'Executor' },
                    { value: 'sentinel', label: 'Sentinel' },
                    { value: 'archivist', label: 'Archivist' },
                  ],
                },
                {
                  accessor: 'website',
                  label: 'Archive Link',
                  type: 'link',
                  linkText: 'Open Record',
                  linkTransformer: (value) => String(value),
                },
                {
                  accessor: 'themeColor',
                  label: 'Theme Color',
                  type: 'color',
                  colorPresets: [
                    { name: 'Purple', title: 'Purple', value: '#7F5DFF' },
                    { name: 'Orange', title: 'Orange', value: '#FF7F5D' },
                    { name: 'Green', title: 'Green', value: '#5DFF7F' },
                    { name: 'Blue', title: 'Blue', value: '#5D7FFF' },
                  ],
                  allowPalette: true,
                },
              ]}
            />
          }
        >
          <Button label="Open drawer from the right side" />
        </Drawer>
      </Flex>
    );
  },
};

export default story;
