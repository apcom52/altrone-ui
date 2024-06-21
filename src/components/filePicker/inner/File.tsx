import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  FilePickerRemoveContext,
  FilePickerUploadContext,
  FileProps,
  FileStatus,
} from '../FilePicker.types.ts';
import s from './file.module.scss';
import { Icon } from 'components/icon';
import { Loading } from 'components/loading';
import { Popover } from 'components/popover';
import { Text } from 'components/text';
import clsx from 'clsx';
import { getFileSize } from '../../../utils/file.ts';
import { useFilePickerContext } from '../FilePicker.context.ts';
import type {} from 'ldrs';
import 'ldrs/ring';
import { deleteFileRequest } from '../FilePicker.utils.ts';

export const File = memo<FileProps>(({ file, pickerItem, onDeleteClick }) => {
  const {
    url,
    method = 'GET',
    name = 'file',
    autoUploadFn,
    removeFileFn,
    autoUpload,
  } = useFilePickerContext();

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

  const uploadFile = useCallback(async (context: FilePickerUploadContext) => {
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

      request.onload = (e: ProgressEvent<any>) => {
        if (
          e.target?.status &&
          e.target.status >= 200 &&
          e.target.status < 300
        ) {
          context.complete();
        } else {
          context.fail('Cannot upload the file. Please try again');
        }
      };

      request.send(formData);
    }
  }, []);

  const onRemoveClick = async () => {
    if (autoUpload) {
      if (removeFileFn) {
        await removeFileFn(deleteContext);
      } else {
        await deleteFileRequest(deleteContext);
      }
    }

    onDeleteClick(pickerItem);
  };

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
  });

  const fileName = pickerItem.filename || file?.name || 'Untitled file';
  const showFileSize = Boolean(file && file?.size > 0);

  return (
    <div className={cls} title={file?.name}>
      <div className={s.Progress} style={{ width: `${progress}%` }} />
      <div className={s.FileName}>{fileName}</div>
      {showFileSize ? (
        <div className={s.Size}>{getFileSize(file?.size || 0)}</div>
      ) : null}
      {errorMessage ? (
        <Popover
          placement="top"
          showArrow
          trigger={['click', 'hover']}
          content={<Text.Paragraph size="s">{errorMessage}</Text.Paragraph>}
        >
          <div className={s.Alert}>
            <Icon i="warning" />
          </div>
        </Popover>
      ) : null}
      {status === 'loading' ? <Loading size="12px" strokeWidth="1px" /> : null}
      {status === 'failed' ? (
        <button type="button" className={s.Close} onClick={() => null}>
          <Icon i="refresh" />
        </button>
      ) : null}
      {status !== 'loading' ? (
        <button type="button" className={s.Close} onClick={onRemoveClick}>
          <Icon i="close" />
        </button>
      ) : null}
    </div>
  );
});
