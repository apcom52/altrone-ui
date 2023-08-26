import {
  ArchiveFileIcon,
  AudioFileIcon,
  CodeFileIcon,
  DocumentFileIcon,
  ImageFileIcon,
  PresentationFileIcon,
  TableFileIcon,
  VideoFileIcon
} from './FilePickerIcons';
import { FileExtensions, FileExtensionType } from './FilePicker.types';
import { FileIcon } from './FileIcon';

export enum FilePickerVariant {
  default = 'default',
  block = 'block'
}

export const FILE_EXTENTIONS: Record<FileExtensions | string, FileExtensionType> = {
  text: {
    smallIcon: DocumentFileIcon,
    largeIcon: () => <FileIcon icon="description" />,
    accept: ['.doc', '.docx', '.pdf', '.txt'],
    label: 'Выберите документ'
  },
  image: {
    smallIcon: ImageFileIcon,
    largeIcon: (extension, count, file) => (
      <FileIcon>
        <img src={file.fileSrc} alt="" className="alt-file-icon__image" />
      </FileIcon>
    ),
    accept: ['.jpg', '.jpeg', '.gif', '.png', '.svg', '.tiff', '.tif'],
    label: 'Выберите изображение'
  },
  audio: {
    smallIcon: AudioFileIcon,
    largeIcon: () => <FileIcon icon="music_note" />,
    accept: ['.mp3', '.wav', '.aac', '.m4a'],
    label: 'Выберите музыку'
  },
  video: {
    smallIcon: VideoFileIcon,
    largeIcon: () => <FileIcon icon="local_movies" />,
    accept: ['.mp4', '.avi', '.mov'],
    label: 'Выберите видео'
  },
  table: {
    smallIcon: TableFileIcon,
    largeIcon: () => <FileIcon icon="table_chart" />,
    accept: ['.xls', '.xlsx', '.ods'],
    label: 'Выберите таблицу'
  },
  presentation: {
    smallIcon: PresentationFileIcon,
    largeIcon: () => <FileIcon icon="slideshow" />,
    accept: ['.ppt', '.pptx', '.odp', '.key'],
    label: 'Выберите презентацию'
  },
  code: {
    smallIcon: CodeFileIcon,
    largeIcon: () => <FileIcon icon="code" />,
    accept: [
      '.c',
      '.class',
      '.cpp',
      '.cs',
      '.h',
      '.java',
      '.php',
      '.py',
      '.sh',
      '.swift',
      '.vb',
      '.js',
      '.css',
      '.html'
    ],
    label: 'Выберите исходный код'
  },
  archive: {
    smallIcon: ArchiveFileIcon,
    largeIcon: () => <FileIcon icon="folder_zip" />,
    accept: ['.zip', '.rar', '.7z', '.tar.gz'],
    label: 'Выберите архив'
  }
};
