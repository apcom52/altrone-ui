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
import { FileExtensions, FilePickerFileIcon } from './FilePicker.types';

export enum FilePickerVariant {
  default = 'default',
  block = 'block'
}

export const FILE_EXTENTIONS: Record<
  FileExtensions | string,
  { icon: FilePickerFileIcon; accept: string[]; label: string }
> = {
  text: {
    icon: DocumentFileIcon,
    accept: ['.doc', '.docx', '.pdf', '.txt'],
    label: 'Выберите документ'
  },
  image: {
    icon: ImageFileIcon,
    accept: ['.jpg', '.jpeg', '.gif', '.png', '.svg', '.tiff', '.tif'],
    label: 'Выберите изображение'
  },
  audio: {
    icon: AudioFileIcon,
    accept: ['.mp3', '.wav', '.aac', '.m4a'],
    label: 'Выберите музыку'
  },
  video: {
    icon: VideoFileIcon,
    accept: ['.mp4', '.avi', '.mov'],
    label: 'Выберите видео'
  },
  table: {
    icon: TableFileIcon,
    accept: ['.xls', '.xlsx', '.ods'],
    label: 'Выберите таблицу'
  },
  presentation: {
    icon: PresentationFileIcon,
    accept: ['.ppt', '.pptx', '.odp', '.key'],
    label: 'Выберите презентацию'
  },
  code: {
    icon: CodeFileIcon,
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
    icon: ArchiveFileIcon,
    accept: ['.zip', '.rar', '.7z', '.tar.gz'],
    label: 'Выберите архив'
  }
};
