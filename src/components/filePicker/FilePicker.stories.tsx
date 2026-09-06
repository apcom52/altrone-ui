import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, FilePicker, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Size } from 'types';
import { FileItem, FilePickerUploadContext } from './FilePicker.types.ts';

const story: Meta<typeof FilePicker> = {
  title: 'Components/Controls/FilePicker',
  component: FilePicker,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export default story;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 620, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Text block size={3} color="muted">
    {children}
  </Text>
);

// ─── Upload simulation ───────────────────────────────────────────────────────

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** pickerItem ids that already failed once, so a retry can succeed. */
const failedOnce = new Set<string>();

type SimMode = 'ok' | 'fail-once' | 'always-fail';

/**
 * Drives a real `FilePickerUploadContext` on a timer — reports progress in
 * steps, then either `complete()`s or `fail()`s partway through.
 */
async function simulateUpload(
  ctx: FilePickerUploadContext,
  { durationMs = 2400, mode = 'ok' as SimMode } = {},
) {
  const key = ctx.pickerItem.id ?? ctx.file.name;
  ctx.startUploading();

  const steps = 24;
  const willFail =
    mode === 'always-fail' || (mode === 'fail-once' && !failedOnce.has(key));
  const failAt = willFail ? Math.round(steps * 0.55) : steps + 1;

  for (let i = 1; i <= steps; i += 1) {
    await wait(durationMs / steps);
    if (i === failAt) {
      if (mode === 'fail-once') failedOnce.add(key);
      ctx.fail('Network error — connection reset (ERR_CONNECTION_RESET)');
      return;
    }
    ctx.setProgress(Math.round((ctx.file.size / steps) * i));
  }

  ctx.complete();
}

const uploadOk = (ctx: FilePickerUploadContext) =>
  simulateUpload(ctx, { durationMs: 1800 + Math.random() * 2400 });

const uploadFailOnce = (ctx: FilePickerUploadContext) =>
  simulateUpload(ctx, { mode: 'fail-once', durationMs: 1600 });

const uploadAlwaysFails = (ctx: FilePickerUploadContext) =>
  simulateUpload(ctx, { mode: 'always-fail', durationMs: 1200 });

const simulateDelete = () => wait(500);

const PRELOADED: FileItem[] = [
  { filename: 'Q4-report.pdf' },
  { filename: 'cover-letter.docx' },
  { filename: 'team-photo.jpg' },
];

// ─── 1. Single file, auto-upload ────────────────────────────────────────────

export const OverviewStory: StoryObj<typeof FilePicker> = {
  name: 'Uploading a file',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Text size={7} weight="bold" block>
        FilePicker
      </Text>
      <Paragraph>
        Picks files and, with <Text code>autoUpload</Text> (on by default),
        sends each one straight away. Supply <Text code>autoUploadFn</Text> to
        run the transfer yourself — it receives a context with{' '}
        <Text code>startUploading()</Text>, <Text code>setProgress(bytes)</Text>,{' '}
        <Text code>complete()</Text> and <Text code>fail(message)</Text>, which
        drive the chip&rsquo;s progress bar and state.
      </Paragraph>
      <Paragraph>
        Pick a file below — the chip fills as it &ldquo;uploads&rdquo;. Pick
        another and the first is removed (its <Text code>removeFileFn</Text>{' '}
        runs first).
      </Paragraph>
      <FilePicker
        name="document"
        autoUploadFn={uploadOk}
        removeFileFn={simulateDelete}
        placeholder="Choose a document"
      />
      <Caption>
        The transfer here is faked with <Text code>setTimeout</Text>; a real{' '}
        <Text code>autoUploadFn</Text> would wrap <Text code>fetch</Text> /{' '}
        <Text code>XMLHttpRequest</Text>.
      </Caption>
    </Flex>
  ),
};

// ─── 2. Multiple files ──────────────────────────────────────────────────────

export const MultipleStory: StoryObj<typeof FilePicker> = {
  name: 'Several files at once',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Each file uploads on its own</Heading>
      <Paragraph>
        With <Text code>multiple</Text>, every picked file gets its own chip and
        its own upload — here each with a different random duration, so they
        finish out of order. <Text code>accept</Text> limits the native file
        dialog (this one to images).
      </Paragraph>
      <FilePicker
        name="gallery"
        multiple
        accept="image/*"
        autoUploadFn={uploadOk}
        removeFileFn={simulateDelete}
        placeholder="Add images"
      />
    </Flex>
  ),
};

// ─── 3. Failure + retry ─────────────────────────────────────────────────────

export const FailureStory: StoryObj<typeof FilePicker> = {
  name: 'When an upload fails',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>fail(), then retry</Heading>
      <Paragraph>
        Calling <Text code>ctx.fail(message)</Text> turns the chip red and shows
        an alert button — click it for the message, or use the retry button to
        run <Text code>autoUploadFn</Text> again. In this simulation the first
        attempt for a file always fails about halfway through; the retry
        succeeds.
      </Paragraph>
      <FilePicker
        name="upload"
        multiple
        autoUploadFn={uploadFailOnce}
        placeholder="Pick files (first try fails)"
      />
      <Caption>
        Set <Text code>autoUploadFn</Text> to a version that always fails to see
        the terminal error state:
      </Caption>
      <FilePicker
        name="doomed"
        multiple
        autoUploadFn={uploadAlwaysFails}
        placeholder="These never succeed"
      />
    </Flex>
  ),
};

// ─── 4. Deferred upload ─────────────────────────────────────────────────────

export const DeferredStory: StoryObj<typeof FilePicker> = {
  name: 'Deferred upload (autoUpload = false)',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>Hold the files until the form is submitted</Heading>
      <Paragraph>
        <Text code>{'autoUpload={false}'}</Text> keeps every picked file in the{' '}
        <Text code>selected</Text> state — no chip progress, nothing sent. The
        consumer reads the list (via <Text code>onChange</Text> or the form{' '}
        <Text code>name</Text>) and uploads on its own submit.
      </Paragraph>
      <FilePicker name="attachments" multiple autoUpload={false} placeholder="Attach files" />
    </Flex>
  ),
};

// ─── 5. Pre-loaded ──────────────────────────────────────────────────────────

export const PreloadedStory: StoryObj<typeof FilePicker> = {
  name: 'Files already on the server',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Heading>defaultValue</Heading>
      <Paragraph>
        Pass <Text code>defaultValue</Text> with just <Text code>filename</Text>s
        for files that already exist server-side. They render as removable chips
        with no upload; removing one calls <Text code>removeFileFn</Text>.
      </Paragraph>
      <FilePicker
        name="existing"
        multiple
        autoUpload={false}
        defaultValue={PRELOADED}
        removeFileFn={simulateDelete}
        placeholder="Add more"
      />
    </Flex>
  ),
};

// ─── 6. Controlled ──────────────────────────────────────────────────────────

export const ControlledStory: StoryObj<typeof FilePicker> = {
  name: 'Controlled: value + onChange',
  render: () => {
    const [files, setFiles] = useState<FileItem[]>([]);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>Owning the list from outside</Heading>
        <Paragraph>
          Pass <Text code>value</Text> and <Text code>onChange</Text> to keep the
          file list in your own state — for form validation, a counter, or a
          &ldquo;clear all&rdquo; action.
        </Paragraph>
        <FilePicker
          name="files"
          multiple
          value={files}
          onChange={(next) => setFiles(next)}
          autoUploadFn={uploadOk}
          removeFileFn={simulateDelete}
          placeholder="Add files"
        />
        <Flex align="center" gap="m">
          <Caption>
            {files.length} file{files.length === 1 ? '' : 's'} in state
          </Caption>
          {files.length > 0 ? (
            <Button
              size="s"
              variant="text"
              label="Clear all"
              onClick={() => setFiles([])}
            />
          ) : null}
        </Flex>
      </Flex>
    );
  },
};

// ─── 7. Sizes ──────────────────────────────────────────────────────────────

const SIZES: Size[] = ['mini', 's', 'm', 'l', 'xl'];

const SIZE_DEMO_FILES: FileItem[] = [
  { filename: 'annual-report-2026.pdf' },
  { filename: 'cover.jpg' },
];

export const SizesStory: StoryObj<typeof FilePicker> = {
  name: 'Sizes',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>mini, s, m, l, xl</Heading>
      <Paragraph>
        <Text code>size</Text> scales the pick button and the file chips
        together — chip height, the file name and size text, and the inline
        retry / delete buttons (a tier smaller than the chip).
      </Paragraph>
      <Flex direction="vertical" gap="l">
        {SIZES.map((sz) => (
          <Flex key={sz} align="center" gap="m">
            <Caption>{sz}</Caption>
            <FilePicker
              size={sz}
              name={`size-${sz}`}
              multiple
              autoUpload={false}
              defaultValue={SIZE_DEMO_FILES}
              placeholder="Add"
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};
