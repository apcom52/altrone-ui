export interface PhotoViewerImageProps
  extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  caption?: string;
  description?: string;
}

export interface PhotoViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element[];
  onClose: () => void;
  startsFrom?: number;
}

export interface PhotoViewerToolbarProps {
  currentIndex: number;
  totalPhotos: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  caption?: string;
  description?: string;
}
