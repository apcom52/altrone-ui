import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  FilePickerRemoveContext,
  FilePickerUploadContext,
  FileProps,
  FileStatus,
} from '../FilePicker.types.ts';
import { Size } from '../../../types';
import s from './file.module.scss';
import { Popover } from 'components/popover';
import { Tooltip } from 'components/tooltip';
import { Text } from 'components/text';
import clsx from 'clsx';
import { FileUtils } from 'utils';
import { useFilePickerContext } from '../FilePicker.context.ts';
import { deleteFileRequest } from '../FilePicker.utils.ts';
import { useLocalization } from '../../application/useLocalization.tsx';
import { CircleAlert, RotateCw, Trash2 } from 'lucide-react';
import { Button } from 'components/button/Button.tsx';
import { motion, useReducedMotionConfig } from 'motion/react';

/** Chip size -> size for its inline retry / delete buttons (a tier smaller). */
const CONTROL_SIZE: Record<Size, Size> = {
  mini: 'mini',
  s: 'mini',
  m: 's',
  l: 's',
  xl: 'm',
};

export const File = memo<FileProps>(({ file, pickerItem, onDeleteClick }) => {
  const t = useLocalization();

  const {
    url,
    method = 'POST',
    name = 'file',
    size = 'm',
    autoUploadFn,
    removeFileFn,
    autoUpload,
  } = useFilePickerContext();

  const controlSize = CONTROL_SIZE[size];

  const [status, setStatus] = useState<FileStatus>('selected');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const setProgressValue = useCallback(
    (uploadedBytes: number) => {
      if (file?.size) {
        setProgress(
          uploadedBytes > file?.size
            ? 100
            : Math.round((uploadedBytes / file?.size) * 100),
        );
      }
    },
    [file?.size],
  );

  const setStartStatus = useCallback(() => {
    setErrorMessage('');
    setProgress(0);
    setStatus('loading');
  }, []);

  const setCompletedStatus = useCallback(() => {
    setErrorMessage('');
    setProgress(100);
    setStatus('loaded');
  }, []);

  const setFailedStatus = useCallback((errorMessage?: string) => {
    setErrorMessage(errorMessage || '');
    setProgress(100);
    setStatus('failed');
  }, []);

  const uploadContext = useMemo<FilePickerUploadContext>(() => {
    return {
      url: String(url),
      name: String(name),
      method: String(method),
      file: file as File,
      setProgress: setProgressValue,
      startUploading: setStartStatus,
      complete: setCompletedStatus,
      fail: setFailedStatus,
      pickerItem,
    };
  }, [name, url, method, file, setProgressValue, pickerItem]);

  const deleteContext = useMemo<FilePickerRemoveContext>(() => {
    return {
      url: String(url),
      name: String(name),
      file,
      pickerItem,
    };
  }, [url, name, file, pickerItem]);

  // SSR: requires client — XMLHttpRequest is browser-only
  const uploadFile = useCallback(
    async (context: FilePickerUploadContext) => {
      if (file) {
        const request = new XMLHttpRequest();
        request.open(context.method, context.url);

        const formData = new FormData();
        formData.append(context.name, context.file);

        context.startUploading();

        request.upload.addEventListener('progress', (e) => {
          context.setProgress(e.loaded);
        });

        request.onerror = () => {
          context.fail();
        };

        request.onload = (e: ProgressEvent) => {
          const xhr = e.target as XMLHttpRequest;
          if (xhr?.status >= 200 && xhr.status < 300) {
            context.complete();
          } else {
            context.fail(t('filePicker.errorMessage'));
          }
        };

        request.send(formData);
      }
    },
    [file],
  );

  const onRemoveClick = useCallback(
    async (event: React.MouseEvent) => {
      if (autoUpload) {
        if (removeFileFn) {
          await removeFileFn(deleteContext);
        } else {
          await deleteFileRequest(deleteContext);
        }
      }

      onDeleteClick(pickerItem, event);
    },
    [autoUpload, removeFileFn, deleteContext, onDeleteClick, pickerItem],
  );

  useEffect(() => {
    if (autoUpload && uploadContext && file && status === 'selected') {
      if (autoUploadFn) {
        void autoUploadFn(uploadContext);
      } else {
        void uploadFile(uploadContext);
      }
    }
  }, [uploadContext, status]);

  const cls = clsx(s.File, {
    [s.Invalid]: status === 'failed',
    [s.Mini]: size === 'mini',
    [s.Small]: size === 's',
    [s.Large]: size === 'l',
    [s.XLarge]: size === 'xl',
  });

  const fileName =
    pickerItem.filename || file?.name || t('filePicker.untitledFile');
  const showFileSize = Boolean(file && file?.size > 0);

  /* Animate the chip's size *and* position as contents change (name resolves,
     size text / actions appear, failed state widens it) and as sibling chips
     reflow around it — relative to the picker's `layoutRoot`. */
  const animateLayout = useReducedMotionConfig() ? undefined : true;

  return (
    <motion.div
      className={cls}
      layout={animateLayout}
      transition={{ layout: { duration: 0.25, ease: 'easeOut' } }}
    >
      {status === 'loading' ? (
        <div
          className={s.Progress}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      ) : null}
      <Tooltip content={fileName} placement="top">
        <span className={s.FileName}>{fileName}</span>
      </Tooltip>
      {showFileSize ? (
        <span className={s.Size}>{FileUtils.getFileSize(file?.size || 0)}</span>
      ) : null}
      {errorMessage ? (
        <Popover
          placement="top"
          trigger={['click', 'hover']}
          content={
            <Text block size={4}>
              {errorMessage}
            </Text>
          }
        >
          <button type="button" className={s.Alert} aria-label={errorMessage}>
            <CircleAlert />
          </button>
        </Popover>
      ) : null}
      {status === 'failed' ? (
        <Button
          className={s.Control}
          size={controlSize}
          icon={<RotateCw />}
          label={t('filePicker.retryUpload')}
          onClick={() => setStatus('selected')}
          showLabel={false}
        />
      ) : null}
      {status !== 'loading' ? (
        <Button
          className={s.Control}
          size={controlSize}
          icon={<Trash2 />}
          label={t('common.delete')}
          onClick={onRemoveClick}
          showLabel={false}
        />
      ) : null}
    </motion.div>
  );
});
