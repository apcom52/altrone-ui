import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  DataGrid,
  Flex,
  Form,
  Radio,
  Select,
  Spoiler,
  Switcher,
  Textarea,
  TextInput,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Drawer } from './Drawer.tsx';
import { DATA_GRID_DATA } from 'components/dataGrid/DataGrid.constants.ts';
import { DeployDrawerStory } from './stories/Drawer.story.Deploy.tsx';

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
        <Drawer
          title="Create project"
          onDone={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(true);
              }, 1000);
            });
          }}
          renderDoneButton={({ closeDrawer }) => (
            <Button label="Done" onClick={closeDrawer} />
          )}
          content={
            <Flex direction="vertical">
              <Spoiler title="Basic information">
                <Form>
                  <Form.Field label="Project name">
                    <TextInput />
                  </Form.Field>
                  <Form.Field label="Slug">
                    <TextInput />
                  </Form.Field>
                  <Form.Field label="Description">
                    <Textarea />
                  </Form.Field>
                  <Form.Field label="Status">
                    <Select
                      options={[
                        { value: 'active', label: 'Active' },
                        { value: 'paused', label: 'Paused' },
                        { value: 'archived', label: 'Archived' },
                      ]}
                      onChange={() => {}}
                    />
                  </Form.Field>
                  <Form.Field label="Environment">
                    <Radio
                      onChange={() => {}}
                      value="development"
                      name="environment"
                    >
                      <Radio.Item value="development">Development</Radio.Item>
                      <Radio.Item value="production">Production</Radio.Item>
                    </Radio>
                  </Form.Field>
                </Form>
              </Spoiler>
              <Spoiler title="Ownership & access">
                <Form>
                  <Form.Field label="Owner">
                    <Select
                      options={[
                        { value: '1', label: 'John Doe' },
                        { value: '2', label: 'Jane Smith' },
                        { value: '3', label: 'Jim Beam' },
                      ]}
                      onChange={() => {}}
                    />
                  </Form.Field>
                  <Form.Field label="Default role for new users">
                    <Select
                      options={[
                        { value: 'observer', label: 'Admin' },
                        { value: 'executor', label: 'Manager' },
                        { value: 'sentinel', label: 'Viewer' },
                      ]}
                      onChange={() => {}}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Switcher onChange={() => {}} checked={true}>
                      Allow public API access
                    </Switcher>
                  </Form.Field>
                  <Form.Field>
                    <Switcher onChange={() => {}} checked={true}>
                      Allow invites by email
                    </Switcher>
                  </Form.Field>
                </Form>
              </Spoiler>
            </Flex>
          }
          footer={
            <Flex gap="s">
              <Button label="Reset" />
              <Button label="Help" />
            </Flex>
          }
        >
          <Button label="Edit record" />
        </Drawer>
      </Flex>
    );
  },
};

export { DeployDrawerStory };

export default story;
