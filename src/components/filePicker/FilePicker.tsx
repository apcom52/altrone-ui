import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button } from '../button';
import { FilePickerProps } from './FilePicker.types.ts';
import s from './filePicker.module.scss';
import { File } from './inner/File.tsx';
import { FilePickerContextType } from './FilePicker.types.ts';
import { Flex } from '../flex';
import { Align, Direction, Gap } from '../../types';
import { Icon } from '../icon';
import { useImperativeFilePicker } from 'use-file-picker';

const FilePickerContext = createContext<FilePickerContextType>({
  deleteFile: () => null,
});

export const useFilePickerContext = () => useContext(FilePickerContext);

export const FilePicker = memo<FilePickerProps>(
  ({ multiple = false, onChange }) => {
    const [invalidFiles, setInvalidFiles] = useState<File[]>([]);

    const {
      openFilePicker,
      plainFiles,
      loading,
      removeFileByReference,
      errors,
    } = useImperativeFilePicker({
      // accept: restProps.accept || '*',
      multiple,
      onFilesSelected: (...args) => {
        console.log('>> [Selected]:', args);
      },
      onFilesRejected: (args) => {
        setInvalidFiles(
          args.errors.map((error) => (error as any).causedByFile),
        );
        console.log('>> [Rejected]:', args);
      },
      onFilesSuccessfullySelected: () => {
        console.log('>> [Successfully Selected]:');
      },
    });

    const filePickerContext = useMemo<FilePickerContextType>(() => {
      return {
        deleteFile: removeFileByReference,
      };
    }, [removeFileByReference]);

    const fileList = [...plainFiles, ...invalidFiles];

    useEffect(() => {
      onChange?.(plainFiles);
    }, [onChange, plainFiles]);

    return (
      <FilePickerContext.Provider value={filePickerContext}>
        <Flex
          direction={Direction.horizontal}
          gap={Gap.medium}
          align={Align.center}
          wrap
          className={s.FilePicker}
        >
          {fileList.length === 0 ? (
            <div className={s.EmptyLabel}>No files chosen</div>
          ) : null}
          {fileList.map((item, itemIndex) => {
            const errorMessage = errors.find(
              (error) => (error as any).causedByFile === item,
            )?.readerError?.message;

            return (
              <File key={itemIndex} file={item} errorMessage={errorMessage} />
            );
          })}
          <Button
            leftIcon={<Icon i="file_upload" />}
            label={loading ? 'Choosing...' : 'Choose file'}
            onClick={openFilePicker}
          />
        </Flex>
      </FilePickerContext.Provider>
    );
  },
);
