import { CarouselProps } from './Carousel.types';
import React, { useState } from 'react';
import './carousel.scss';
import { Icon } from '../../icons';
import { PhotoViewer } from '../../containers';

export const Carousel = ({ data = [] }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="alt-carousel">
      {currentIndex > 0 && (
        <div
          className="alt-carousel__item alt-carousel__item--prev"
          style={{ backgroundImage: `url(${data[currentIndex - 1]?.src})` }}>
          prev
        </div>
      )}
      {currentIndex < data.length - 1 && (
        <div
          className="alt-carousel__item alt-carousel__item--next"
          style={{ backgroundImage: `url(${data[currentIndex + 1]?.src})` }}>
          next
        </div>
      )}
      <div
        className="alt-carousel__item alt-carousel__item--current"
        style={{ backgroundImage: `url(${data[currentIndex]?.src})` }}>
        current
      </div>
      <div className="alt-carousel__controls">
        <button className="alt-carousel-control" onClick={() => setCurrentIndex((old) => old - 1)}>
          <Icon i="arrow_back" />
        </button>
        <div className="alt-carousel-counter">
          {currentIndex + 1} / {data.length}
        </div>
        <button className="alt-carousel-control" onClick={() => setCurrentIndex((old) => old + 1)}>
          <Icon i="arrow_forward" />
        </button>
        <button className="alt-carousel-control" onClick={() => setIsFullScreen(true)}>
          <Icon i="open_in_full" />
        </button>
      </div>
      {isFullScreen && data[currentIndex].src && (
        <PhotoViewer
          images={[
            {
              src: data[currentIndex].src || ''
            }
          ]}
          onClose={() => setIsFullScreen(false)}
        />
      )}
    </div>
  );
};
