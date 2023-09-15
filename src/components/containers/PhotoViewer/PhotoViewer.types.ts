export interface PhotoViewImage {
  src: string;
  caption?: string;
  description?: string;
  altText?: string;
}

type PhotoViewerBase = {
  images: PhotoViewImage[];
  onClose: () => void;
  className?: string;
  startsFrom?: number;
};

export type PhotoViewerRef = {
  currentIndex: number;
  zoom: number;
  expanded: boolean;
};

export type PhotoViewerProps = PhotoViewerBase;
