import { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Flex, Skeleton, Text, TextInput } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useState } from 'react';
import { DataGrid } from './DataGrid.tsx';
import { DATA_GRID_DATA, DATA_GRID_DATA_2 } from './DataGrid.constants.ts';

const story: Meta<typeof DataGrid> = {
  title: 'Components/Display/DataGrid',
  component: DataGrid,
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

export const DataGridStory: StoryObj<typeof DataGrid> = {
  name: 'Using DataGrid',
  render: () => {
    const [data, setData] = useState<object>(DATA_GRID_DATA);
    const [mode, setMode] = useState<'loading' | 'read' | 'edit'>('read');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (field: string, value: any) => {
      setData((old) => ({ ...old, [field]: value }));
    };

    return (
      <Flex direction="vertical" gap="l">
        <Text block size={5} weight="bold">
          Standard DataGrid
        </Text>
        <Checkbox checked={loading} onChange={setLoading}>
          Loading
        </Checkbox>
        <DataGrid
          data={data}
          onChange={handleChange}
          mode={loading ? 'loading' : mode}
          onChangeMode={setMode}
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
            {
              accessor: 'avatarUrl',
              label: 'Avatar',
              type: 'custom',
              renderReadMode: (value) => (
                <img
                  src={String(value)}
                  alt="avatar"
                  style={{ width: 64, height: 64, borderRadius: '50%' }}
                />
              ),
              renderEditMode: (value) => (
                <TextInput
                  value={String(value)}
                  onChange={(value: string) => handleChange('avatarUrl', value)}
                />
              ),
              renderLoadingMode: () => (
                <Skeleton width="64px" height="64px" radius="50%" />
              ),
              editable: false,
            },
          ]}
        />
      </Flex>
    );
  },
};

export const DataGridGroupsStory: StoryObj<typeof DataGrid> = {
  name: 'Using DataGrid with groups',
  render: () => {
    const [data, setData] = useState<object>(DATA_GRID_DATA_2);
    const [mode, setMode] = useState<'loading' | 'read' | 'edit'>('read');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (field: string, value: any) => {
      setData((old) => ({ ...old, [field]: value }));
    };

    return (
      <Flex direction="vertical" gap="l">
        <Text block size={5} weight="bold">
          DataGrid with groups
        </Text>
        <Checkbox checked={loading} onChange={setLoading}>
          Loading
        </Checkbox>
        <DataGrid
          data={data}
          onChange={handleChange}
          mode={loading ? 'loading' : mode}
          onChangeMode={setMode}
          fields={[
            {
              accessor: 'id',
              label: 'ID',
              type: 'string',
              visible: true,
              editable: false,
              placeholder: '',
              maxLength: 36,
            },
            {
              accessor: 'createdAt',
              label: 'Created At',
              type: 'date',
              visible: true,
              editable: false,
              format: 'YYYY-MM-DD HH:mm',
            },
            {
              accessor: 'isVerified',
              label: 'Verified',
              type: 'boolean',
              visible: true,
              editable: false,
            },
            {
              accessor: 'firstName',
              label: 'First Name',
              type: 'string',
              visible: true,
              editable: true,
              group: 'personal',
              placeholder: 'Enter first name',
              maxLength: 50,
            },
            {
              accessor: 'lastName',
              label: 'Last Name',
              type: 'string',
              visible: true,
              editable: true,
              group: 'personal',
              placeholder: 'Enter last name',
              maxLength: 50,
            },
            {
              accessor: 'bio',
              label: 'Bio',
              type: 'text',
              visible: true,
              editable: true,
              group: 'personal',
              placeholder: 'Short description',
              maxLength: 300,
            },
            {
              accessor: 'birthDate',
              label: 'Birth Date',
              type: 'date',
              visible: true,
              editable: true,
              group: 'personal',
              minDate: '1960-01-01',
              maxDate: '2030-01-01',
              clearable: true,
            },
            {
              accessor: 'favoriteColor',
              label: 'Favorite Color',
              type: 'color',
              visible: true,
              editable: true,
              group: 'personal',
              allowPalette: true,
              colorPresets: [
                { name: 'Red', title: 'Red', value: '#FF0000' },
                { name: 'Green', title: 'Green', value: '#00FF00' },
                { name: 'Blue', title: 'Blue', value: '#0000FF' },
                { name: 'Orange', title: 'Orange', value: '#FF8800' },
              ],
            },
            {
              accessor: 'position',
              label: 'Position',
              type: 'select',
              visible: true,
              editable: true,
              group: 'work',
              options: [
                { label: 'Developer', value: 'dev' },
                { label: 'Designer', value: 'designer' },
                { label: 'Manager', value: 'manager' },
                { label: 'HR', value: 'hr' },
              ],
            },
            {
              accessor: 'salary',
              label: 'Salary',
              type: 'currency',
              visible: true,
              editable: false,
              group: 'work',
              currency: 'USD',
              min: 0,
              allowNegative: false,
            },
            {
              accessor: 'workEmail',
              label: 'Work Email',
              type: 'string',
              visible: true,
              editable: false,
              group: 'work',
              placeholder: 'example@company.com',
              maxLength: 100,
            },
            {
              accessor: 'isActiveEmployee',
              label: 'Active Status',
              type: 'boolean',
              visible: true,
              editable: true,
              group: 'work',
              trueLabel: 'Active',
              falseLabel: 'Inactive',
            },
            {
              accessor: 'contractLink',
              label: 'Contract Link',
              type: 'link',
              visible: true,
              editable: true,
              group: 'work',
              linkText: 'Open Contract',
              linkTransformer: (value) =>
                `https://company.com/contracts/${value}`,
            },
          ]}
          groups={[
            {
              name: 'personal',
              title: 'Personal Information',
            },
            {
              name: 'work',
              title: 'Work Information',
            },
          ]}
        />
      </Flex>
    );
  },
};

export default story;
