import { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Divider, Flex, Skeleton, Text, TextInput } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useState } from 'react';
import { DataGrid } from './DataGrid.tsx';

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

const DATA_GRID_DATA = {
  id: 'OBJ-001',
  username: 'stellaris.phoenix',
  description:
    'Experimental protocol data entry. Used for interface testing. Personality traits: calm, predictable, friendly.',
  age: 42,
  salary: 98765.43,
  secretKey: 'X7h!2kL9',
  birthDate: '2088-07-16',
  contractMonth: '2033-11',
  foundationYear: '2095',
  isActive: false,
  role: 'observer',
  roles: ['observer', 'executor'],
  themeColor: '#7F5DFF',
  website: 'https://archive.test/objects/OBJ-001',
  avatarUrl: 'https://mockmind-api.uifaces.co/content/human/222.jpg',
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

    console.log('>> data', data);

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
              copyOnClick: true,
              showOnHover: true,
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
                  src={value}
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

export default story;
