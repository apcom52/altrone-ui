export interface PhotoViewImage {
  src: string;
  caption?: string;
  description?: string;
  altText?: string;
}

export type PhotoViewerRef = {
  currentIndex: number;
  zoom: number;
  expanded: boolean;
};

export type PhotoViewerProps = {
  images: PhotoViewImage[];
  onClose: () => void;
  className?: string;
  startsFrom?: number;
  min?: number;
  max?: number;
};
