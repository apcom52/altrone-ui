interface PhotoViewImage {
  src: string;
  caption?: string;
  description?: string;
  altText?: string;
}

type PhotoViewerBase = {
  images: PhotoViewImage[];
  onClose: () => void;
  className?: string;
};

export type PhotoViewerProps = PhotoViewerBase;
