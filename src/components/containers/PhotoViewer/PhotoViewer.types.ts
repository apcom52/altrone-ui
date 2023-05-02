type PhotoViewerBase = {
  url: string;
  onClose: () => void;
};

type PhotoViewerPropsWithNavigation = {
  useNavigation: true;
  onNext: () => void;
  onPrev: () => void;
};

type PhotoViewerPropsWithoutNavigation = {
  useNavigation: false;
};

export type PhotoViewerProps = PhotoViewerBase &
  (PhotoViewerPropsWithNavigation | PhotoViewerPropsWithoutNavigation);
