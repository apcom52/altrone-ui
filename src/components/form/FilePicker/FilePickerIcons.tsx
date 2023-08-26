import { Icon } from '../../icons';

export const DocumentFileIcon = (extension: string, count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--document">
      {count ? count : <Icon i="description" />}
    </div>
  );
};

export const ImageFileIcon = (extension: string, count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--image">
      {count ? count : <Icon i="image" />}
    </div>
  );
};

export const AudioFileIcon = (extension: string, count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--audio">
      {count ? count : <Icon i="music_note" />}
    </div>
  );
};

export const VideoFileIcon = (extension: string, count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--video">
      {count ? count : <Icon i="local_movies" />}
    </div>
  );
};

export const TableFileIcon = (extension: string, count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--table">
      {count ? count : <Icon i="table_chart" />}
    </div>
  );
};

export const PresentationFileIcon = (extension: string, count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--presentation">
      {count ? count : <Icon i="slideshow" />}
    </div>
  );
};

export const CodeFileIcon = (extension: string, count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--code">
      {count ? count : <Icon i="code" />}
    </div>
  );
};

export const ArchiveFileIcon = (extension: string, count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--archive">
      {count ? count : <Icon i="folder_zip" />}
    </div>
  );
};

export const DefaultIcon = () => {
  return <Icon i="upload" />;
};
