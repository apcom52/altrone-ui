interface PhotoViewImage {
  src: string;
  caption?: string;
  description?: string;
  altText?: string;
}

type PhotoViewerBase = {
  images: PhotoViewImage[];
  onClose: () => void;
};

export type PhotoViewerProps = PhotoViewerBase;
