export type CarouselItem = {
  src: string;
};

/**
 * @interface CarouselProps
 */
export interface CarouselProps {
  data: CarouselItem[];
  duration?: number;
  loop?: boolean;
  imageFitting?: 'cover' | 'contain';
  showControls?: boolean;
  usePhotoViewer?: boolean;
}

export interface CarouselRef {
  currentIndex: number;
  prev: () => void;
  next: () => void;
}
