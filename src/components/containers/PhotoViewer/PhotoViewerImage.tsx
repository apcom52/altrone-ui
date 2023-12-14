// import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { ReactEventHandler, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Loading } from '../../indicators';
import { Size } from '../../../types';
import { Draggable } from '../Draggable';
import { DraggablePosition } from '../Draggable/Draggable.types';
import { motion } from 'framer-motion';

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
    console.log('onImageLoad');
    if (!e.target || !containerRef) {
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

  return (
    <>
      {loading ? (
        <div className="alt-photo-viewer__loading">
          <Loading size={Size.large} color="white" />
        </div>
      ) : (
        <div ref={imageContainerRef}>
          <Draggable
            width="100vw"
            height="100vh"
            position={DraggablePosition.screen}
            renderElement={(props) => {
              return (
                <motion.img
                  {...props}
                  className="alt-photo-viewer__image"
                  src={src}
                  animate={{
                    scale: scale
                  }}
                  alt=""
                />
              );
            }}
            className="alt-photo-viewer__image-wrapper"
            centered
          />
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
  );
};
