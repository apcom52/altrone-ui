import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex, Form, Grid, Text } from 'components';
import { useState } from 'react';
import { FilePicker } from './FilePicker.tsx';
import { FileItem, FilePickerUploadContext } from './FilePicker.types.ts';

// Simulates a real upload with progress reporting
const mockAutoUploadFn = async (ctx: FilePickerUploadContext) => {
  ctx.startUploading();
  const chunks = 10;
  for (let i = 1; i <= chunks; i++) {
    await new Promise<void>((r) => setTimeout(r, 120));
    ctx.setProgress(Math.round((ctx.file.size / chunks) * i));
  }
  ctx.complete();
};

// Simulates an upload that always fails
const mockFailingUploadFn = async (ctx: FilePickerUploadContext) => {
  ctx.startUploading();
  await new Promise<void>((r) => setTimeout(r, 800));
  ctx.fail('Server returned 500: Internal Server Error');
};

// Simulates a slow delete request
const mockRemoveFn = async () => {
  await new Promise<void>((r) => setTimeout(r, 400));
};

const PRELOADED_FILES: FileItem[] = [
  { filename: 'Q4-report.pdf' },
  { filename: 'cover-letter.docx' },
  { filename: 'photo.jpg' },
];

const story: Meta<typeof FilePicker> = {
  title: 'Components/Form/FilePicker',
  component: FilePicker,
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

export const FilePickerStory: StoryObj<typeof FilePicker> = {
  name: 'Using FilePicker',
  render: () => {
    const [controlledFiles, setControlledFiles] = useState<FileItem[]>([]);

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Single file — with simulated upload
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label="Attach document">
                <FilePicker
                  name="document"
                  autoUploadFn={mockAutoUploadFn}
                  removeFileFn={mockRemoveFn}
                  placeholder="Choose file"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label="Without autoUpload (manual submit)">
                <FilePicker
                  name="attachment"
                  autoUpload={false}
                  placeholder="Choose file"
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>

        <Text size={5} weight="bold" block>
          Multiple files — with simulated upload
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label="Upload portfolio">
                <FilePicker
                  name="file"
                  multiple
                  autoUploadFn={mockAutoUploadFn}
                  removeFileFn={mockRemoveFn}
                  placeholder="Add files"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label="Images only (accept filter)">
                <FilePicker
                  name="image"
                  multiple
                  accept="image/*"
                  autoUploadFn={mockAutoUploadFn}
                  placeholder="Add images"
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>

        <Text size={5} weight="bold" block>
          Pre-loaded files (defaultValue)
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label="Files from server">
                <FilePicker
                  name="file"
                  multiple
                  autoUpload={false}
                  defaultValue={PRELOADED_FILES}
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>

        <Text size={5} weight="bold" block>
          Controlled mode — value + onChange
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label="Controlled file list">
                <FilePicker
                  name="file"
                  multiple
                  value={controlledFiles}
                  onChange={(files) => setControlledFiles(files)}
                  autoUploadFn={mockAutoUploadFn}
                  removeFileFn={mockRemoveFn}
                  placeholder="Add files"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field
                label={`Current file list (${controlledFiles.length} files)`}
              >
                {controlledFiles.length === 0 ? (
                  <Text block style={{ opacity: 0.5 }}>
                    No files selected
                  </Text>
                ) : (
                  <Flex direction="vertical" gap="xs">
                    {controlledFiles.map((f, i) => (
                      <Text block key={f.id ?? i}>
                        {f.filename ?? f.file?.name ?? 'Untitled'}
                      </Text>
                    ))}
                  </Flex>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>

        <Text size={5} weight="bold" block>
          Upload failure simulation
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={6} style={{ padding: '8px' }}>
              <Form.Field label="Any upload will fail">
                <FilePicker
                  name="file"
                  multiple
                  autoUploadFn={mockFailingUploadFn}
                  placeholder="Try uploading"
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>
      </Flex>
    );
  },
};

export default story;
