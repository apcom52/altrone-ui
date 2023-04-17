import React from 'react';
import { Icon } from '../../icons';

export const DocumentFileIcon = () => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--document">
      <Icon i="description" />
    </div>
  );
};

export const ImageFileIcon = () => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--image">
      <Icon i="image" />
    </div>
  );
};

export const AudioFileIcon = () => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--audio">
      <Icon i="music_note" />
    </div>
  );
};

export const VideoFileIcon = () => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--video">
      <Icon i="local_movies" />
    </div>
  );
};

export const TableFileIcon = () => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--table">
      <Icon i="table_chart" />
    </div>
  );
};

export const PresentationFileIcon = () => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--presentation">
      <Icon i="slideshow" />
    </div>
  );
};

export const CodeFileIcon = () => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--code">
      <Icon i="code" />
    </div>
  );
};

export const ArchiveFileIcon = () => {
  return (
    <div className="alt-file-picker-icon alt-file-picker-icon--archive">
      <Icon i="folder_zip" />
    </div>
  );
};

export const DefaultIcon = () => {
  return <Icon i="upload" />;
};
