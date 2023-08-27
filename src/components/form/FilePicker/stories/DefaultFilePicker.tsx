import { FileItem, FilePicker, FilePickerVariant } from '../index';
import { useCallback, useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';
import { UploadedFile } from '../FilePicker.types';

export const DefaultFilePicker: StoryObj<typeof FilePicker> = {
  name: 'Default FilePicker',
  render: ({ ...args }) => {
    const [value, setValue] = useState<FileItem[]>([]);

    const handleUpload = useCallback((uploadedFiles: UploadedFile[]) => {
      const promises: Promise<UploadedFile>[] = [];

      for (const file of uploadedFiles) {
        setValue((old) => [
          ...old,
          {
            id: file.id,
            filename: file.file.name,
            status: 'loading',
            progress: 0
          }
        ]);

        const fileLoadingPromise = new Promise<UploadedFile>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.file);

          let loadedBytes = 0;

          let interval: NodeJS.Timer;

          interval = setInterval(() => {
            loadedBytes += 102_400;

            setValue((old) => {
              const fileIndex = old.findIndex((item) => item.id === file.id);
              const result = [...old];
              const newProgress = Math.floor((loadedBytes / file.file.size) * 100);

              result[fileIndex].progress = newProgress > 100 ? 100 : newProgress;

              return result;
            });

            if (loadedBytes > file.file.size) {
              resolve(file);
              if (interval) {
                clearInterval(interval);
              }
            }
          }, 100);

          reader.onerror = function (error) {
            console.log('onerror', error);
            reject(error);
          };
        });

        promises.push(fileLoadingPromise);
      }

      return Promise.all(promises);
    }, []);

    return (
      <StorybookPlayground showBackground>
        <FilePicker
          {...args}
          defaultValue={[
            {
              filename: 'mojave-wallaper.jpg',
              src: 'https://cdn.osxdaily.com/wp-content/uploads/2018/06/macos-mojave-night-wallpaper-r-610x343.jpg'
            },
            {
              filename: 'receipt.pdf',
              src: 'http://example.com'
            },
            {
              filename: 'song-with-a-very-very-very-long-name.mp3',
              src: 'http://example.com'
            }
          ]}
          variant={FilePickerVariant.default}
        />
      </StorybookPlayground>
    );
  }
};
