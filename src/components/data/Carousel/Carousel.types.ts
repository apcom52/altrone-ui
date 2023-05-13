export type CarouselItem = {
  src: string;
};

export interface CarouselProps {
  data: CarouselItem[];
  duration?: number;
  loop?: boolean;
  imageFitting?: 'cover' | 'contain';
  showControls?: boolean;
  usePhotoViewer?: boolean;
}
