import { CarouselProps } from './Carousel.types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './carousel.scss';
import { Icon } from '../../icons';
import { PhotoViewer } from '../../containers';
import clsx from 'clsx';

export const Carousel = ({ data = [], usePhotoViewer = false, duration }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const durationIntervalRef = useRef<NodeJS.Timer | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((old) => {
      if (old < data.length - 1) {
        return old + 1;
      }

      return old;
    });
  }, [data]);

  const prev = useCallback(() => {
    setCurrentIndex((old) => {
      if (old > 0) {
        return old - 1;
      }

      return old;
    });
  }, [data]);

  useEffect(() => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 500);
  }, [currentIndex]);

  useEffect(() => {
    if (duration !== undefined && !durationIntervalRef.current) {
      durationIntervalRef.current = setInterval(() => next(), duration >= 1000 ? duration : 1000);
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    };
  }, [duration]);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === data.length - 1;

  return (
    <div className="alt-carousel">
      {data.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          className={clsx('alt-carousel__item', {
            'alt-carousel__item--current': slideIndex === currentIndex,
            'alt-carousel__item--prev': slideIndex === currentIndex - 1,
            'alt-carousel__item--next': slideIndex === currentIndex + 1,
            'alt-carousel__item--left': slideIndex < currentIndex - 1,
            'alt-carousel__item--right': slideIndex > currentIndex + 1
          })}
          style={{ backgroundImage: `url(${slide.src})` }}
        />
      ))}
      <div className="alt-carousel__controls">
        <button className="alt-carousel-control" disabled={disabled || isFirstSlide} onClick={prev}>
          <Icon i="arrow_back" />
        </button>
        <div className="alt-carousel-counter">
          {currentIndex + 1} / {data.length}
        </div>
        <button className="alt-carousel-control" disabled={disabled || isLastSlide} onClick={next}>
          <Icon i="arrow_forward" />
        </button>
        {usePhotoViewer && (
          <button className="alt-carousel-control" onClick={() => setIsFullScreen(true)}>
            <Icon i="open_in_full" />
          </button>
        )}
      </div>
      {isFullScreen && data[currentIndex].src && usePhotoViewer && (
        <PhotoViewer
          images={[
            {
              src: data[currentIndex].src || ''
            }
          ]}
          onClose={() => setIsFullScreen(false)}
          className="alt-carousel-photo-viewer"
        />
      )}
    </div>
  );
};
