import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { ReactEventHandler, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Loading } from '../../indicators';
import { Size } from '../../../types';

interface PhotoViewerImageProps {
  containerRef: RefObject<HTMLDivElement>;
  scale: number;
  src?: string;
}

export const PhotoViewerImage = ({ containerRef, scale = 1, src }: PhotoViewerImageProps) => {
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const hiddenImageRef = useRef<HTMLImageElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const onImageLoad = useCallback<ReactEventHandler<HTMLImageElement>>((e) => {
    if (!e.target || !containerRef.current) {
      return null;
    }

    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) {
      return null;
    }

    const image = e.target as HTMLImageElement;

    setPosition([
      (containerRect.width - image.offsetWidth) / 2,
      (containerRect.height - image.offsetHeight) / 2
    ]);

    setLoading(false);
  }, []);

  const onImageDrag = useCallback((e: DraggableEvent, data: DraggableData) => {
    setPosition([data.x, data.y]);
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [src]);

  useEffect(() => {
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transition = 'none';
    }

    setTimeout(() => {
      if (imageContainerRef.current) {
        imageContainerRef.current.style.transition = 'transform 0.2s ease';
      }
    }, 50);
  }, [loading, src]);

  if (!containerRef?.current) {
    return null;
  }

  return containerRef.current ? (
    <>
      {loading ? (
        <div className="alt-photo-viewer__loading">
          <Loading size={Size.large} />
        </div>
      ) : (
        <div ref={imageContainerRef} style={{ transform: `scale(${scale})` }}>
          <Draggable
            disabled={loading}
            scale={scale}
            position={{ x: position[0], y: position[1] }}
            onStop={onImageDrag}>
            {!loading ? (
              <img className="alt-photo-viewer__image" src={src} alt="" draggable={false} />
            ) : (
              <span />
            )}
          </Draggable>
        </div>
      )}
      <img
        ref={hiddenImageRef}
        src={src}
        alt=""
        className="alt-photo-viewer__image alt-photo-viewer__hidden-image"
        onLoad={onImageLoad}
      />
    </>
  ) : null;
};
