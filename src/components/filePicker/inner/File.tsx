import { memo } from 'react';
import { FileProps } from '../FilePicker.types.ts';
import s from './file.module.scss';
import { Icon, Popover, Text } from 'components';
import clsx from 'clsx';
import { getFileSize } from '../../../utils/file.ts';
import { useFilePickerContext } from '../FilePicker.tsx';
import { Size } from '../../../types';

export const File = memo<Partial<FileProps>>(({ file, errorMessage }) => {
  const { deleteFile } = useFilePickerContext();

  const cls = clsx(s.File, {
    [s.Invalid]: errorMessage,
  });

  return (
    <div className={cls} title={file?.name}>
      <div className={s.FileName}>{file?.name}</div>
      <div className={s.Size}>{getFileSize(file?.size || 0)}</div>
      {errorMessage ? (
        <Popover
          placement="top"
          showArrow
          trigger={['click', 'hover']}
          content={
            <Text.Paragraph size={Size.small}>
              {errorMessage} This file won't be send
            </Text.Paragraph>
          }
        >
          <div className={s.Alert}>
            <Icon i="warning" />
          </div>
        </Popover>
      ) : null}
      <button
        className={s.Close}
        type="button"
        onClick={() => (file ? deleteFile(file) : null)}
      >
        <Icon i="close" />
      </button>
    </div>
  );
});
