export type CarouselItem = {
  src?: string;
  Component?: JSX.Element;
};

export interface CarouselProps {
  data: CarouselItem[];
  duration?: number;
  loop?: boolean;
  usePhotoViewer?: boolean;
}
