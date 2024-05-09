import { memo, useCallback, useEffect, useState } from 'react';
import { FileTileProps, FileUploadStatus } from '../FilePicker.types.ts';
import s from './file.module.scss';
import { Icon } from 'components';
import clsx from 'clsx';
import { useFilePickerContext } from '../FilePicker.tsx';

export const File = memo<Partial<FileTileProps>>(({ file }) => {
  const { url, method, name, onSuccessUpload, getFileNameFunc, onDeleteFile } =
    useFilePickerContext();

  const [_file, setFile] = useState(file?.file);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<FileUploadStatus>(undefined);
  const [filepath, setFilepath] = useState(file?.filepath);

  const uploadFile = useCallback(
    (file: File) => {
      const request = new XMLHttpRequest();
      request.open(method, url);

      const formData = new FormData();
      formData.append(name, file);

      setStatus('loading');

      request.upload.addEventListener('progress', (e) => {
        const progress = Math.round((e.loaded / e.total) * 100);
        setProgress(progress);
      });

      request.onerror = () => {
        setProgress(100);
        setStatus('failed');
      };

      request.onload = (e: ProgressEvent<any>) => {
        setProgress(100);
        setFile(undefined);

        if (
          e.target?.status &&
          e.target.status >= 200 &&
          e.target.status < 300
        ) {
          setStatus('loaded');
          onSuccessUpload(e.target.response);
          setFilepath(getFileNameFunc(e.target.response));

          setTimeout(() => {
            setProgress(0);
            setStatus(undefined);
          }, 1500);
        } else {
          setStatus('failed');
        }
      };

      request.send(formData);
    },
    [url, name, method, onSuccessUpload],
  );

  const deleteFile = useCallback(() => {
    onDeleteFile(String(filepath), file?.id);

    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        [name]: file.filepath,
      }),
    });
  }, [filepath, onDeleteFile]);

  useEffect(() => {
    if (_file) {
      uploadFile(_file);
    }
  }, []);

  const cls = clsx(s.File, {
    // [s.Invalid]: invalid,
  });

  return (
    <div className={cls} title={file?.filename}>
      <div className={s.Progress} style={{ width: `${progress}%` }} />
      <div className={s.FileName}>{file?.filename}</div>
      {/*{invalid ? (*/}
      {/*  <Popover*/}
      {/*    placement="top"*/}
      {/*    showArrow*/}
      {/*    trigger={['click', 'hover']}*/}
      {/*    content={*/}
      {/*      <Text.Paragraph size={Size.small}>*/}
      {/*        There is an unknown error with uploading*/}
      {/*      </Text.Paragraph>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <div className={s.Alert}>*/}
      {/*      <Icon i="warning" />*/}
      {/*    </div>*/}
      {/*  </Popover>*/}
      {/*) : null}*/}
      <button className={s.Close} type="button">
        <Icon i="close" />
      </button>
    </div>
  );
});
