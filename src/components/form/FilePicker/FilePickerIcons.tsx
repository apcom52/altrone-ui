import { Icon } from '../../icons';

export const DocumentFileIcon = (count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--document">
      {count ? count : <Icon i="description" />}
    </div>
  );
};

export const ImageFileIcon = (count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--image">
      {count ? count : <Icon i="image" />}
    </div>
  );
};

export const AudioFileIcon = (count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--audio">
      {count ? count : <Icon i="music_note" />}
    </div>
  );
};

export const VideoFileIcon = (count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--video">
      {count ? count : <Icon i="local_movies" />}
    </div>
  );
};

export const TableFileIcon = (count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--table">
      {count ? count : <Icon i="table_chart" />}
    </div>
  );
};

export const PresentationFileIcon = (count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--presentation">
      {count ? count : <Icon i="slideshow" />}
    </div>
  );
};

export const CodeFileIcon = (count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--code">
      {count ? count : <Icon i="code" />}
    </div>
  );
};

export const ArchiveFileIcon = (count = 0) => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--archive">
      {count ? count : <Icon i="folder_zip" />}
    </div>
  );
};

export const DefaultIcon = () => {
  return <Icon i="upload" />;
};
