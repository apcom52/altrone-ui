import { CarouselProps, CarouselRef } from './Carousel.types';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import './carousel.scss';
import { Icon } from '../../typography';
import { PhotoViewer } from '../../containers';
import clsx from 'clsx';
import { useAltrone } from '../../../contexts';

/**
 * A slideshow component for cycling through elements. **Available only from 2.0**
 * @param data Data of the carousel
 * @param usePhotoViewer When this props is passed the expand button will be added to the toolbar. After clicking on this button the photo viewer with the current slide will be shown.
 * @param showControls When this prop is enabled the controls of the carousel are visible
 * @param imageFitting Manages with background-size prop for carousel items
 * @param loop Actives infinite switching of the carousel
 * @param duration Activates auto-switching of the slides. Minimum value is 500 ms. To disable this you have to pass `undefined` value
 * @constructor
 */
export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      data = [],
      usePhotoViewer = false,
      showControls = true,
      imageFitting = 'cover',
      loop = false,
      duration
    },
    ref
  ) => {
    const { options } = useAltrone();

    const configReduceMotion = options.carousel.reduceMotion || options.global.reduceMotion;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fakeSlideTransition, setFakeSlideTransition] = useState<'left' | 'right' | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    const carouselRef = useRef<HTMLDivElement>(null);

    const durationIntervalRef = useRef<NodeJS.Timer | null>(null);

    const next = useCallback(() => {
      setCurrentIndex((old) => {
        if (old < data.length - 1) {
          return old + 1;
        }

        if (loop && old === data.length - 1) {
          setFakeSlideTransition('right');

          setTimeout(() => {
            setReduceMotion(true);
            setCurrentIndex(0);
            setFakeSlideTransition(null);

            setTimeout(() => {
              setReduceMotion(false);
            }, 50);
          }, 499);
        }

        return old;
      });
    }, [data, loop]);

    const prev = useCallback(() => {
      setCurrentIndex((old) => {
        if (old > 0) {
          return old - 1;
        }

        if (loop && old === 0) {
          setFakeSlideTransition('left');

          setTimeout(() => {
            setReduceMotion(true);
            setCurrentIndex(data.length - 1);
            setFakeSlideTransition(null);

            setTimeout(() => {
              setReduceMotion(false);
            }, 50);
          }, 499);
        }

        return old;
      });
    }, [data, loop]);

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

    useImperativeHandle(
      ref,
      () => ({
        currentIndex,
        prev,
        next
      }),
      [currentIndex, prev, next]
    );

    const isFirstSlide = currentIndex === 0;
    const lastIndex = data.length - 1;
    const isLastSlide = currentIndex === lastIndex;

    return (
      <div
        className={clsx('alt-carousel', {
          'alt-carousel--reduce-motion': reduceMotion || configReduceMotion,
          'alt-carousel--image-contain': imageFitting === 'contain'
        })}
        ref={carouselRef}>
        {loop && (
          <>
            <div
              className={clsx('alt-carousel__item', {
                'alt-carousel__item--left': fakeSlideTransition !== 'left',
                'alt-carousel__item--prev': fakeSlideTransition === 'left'
              })}
              style={{ backgroundImage: `url(${data.at(-2)?.src})` }}
            />
            <div
              className={clsx('alt-carousel__item', {
                'alt-carousel__item--left': currentIndex > 0,
                'alt-carousel__item--prev': fakeSlideTransition === null && currentIndex === 0,
                'alt-carousel__item--current': fakeSlideTransition === 'left'
              })}
              style={{ backgroundImage: `url(${data.at(-1)?.src})` }}
            />
          </>
        )}
        {data.map((slide, slideIndex) => {
          let isCurrent = slideIndex === currentIndex;
          let isPrev = slideIndex === currentIndex - 1;
          let isNext = slideIndex === currentIndex + 1;
          let isLeft = slideIndex < currentIndex - 1;
          let isRight = slideIndex > currentIndex + 1;

          if (loop && fakeSlideTransition === 'left') {
            isCurrent = isPrev = isLeft = false;
            isNext = slideIndex === 0;
            isRight = slideIndex > 0;
          } else if (loop && fakeSlideTransition === 'right') {
            isCurrent = isNext = isRight = false;
            isPrev = slideIndex === lastIndex;
            isLeft = slideIndex < lastIndex;
          }

          return (
            <div
              key={slideIndex}
              className={clsx('alt-carousel__item', {
                'alt-carousel__item--current': isCurrent,
                'alt-carousel__item--prev': isPrev,
                'alt-carousel__item--next': isNext,
                'alt-carousel__item--left': isLeft,
                'alt-carousel__item--right': isRight
              })}
              data-slide-index={slideIndex}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          );
        })}
        {loop && (
          <>
            <div
              className={clsx('alt-carousel__item', {
                'alt-carousel__item--right': currentIndex < lastIndex,
                'alt-carousel__item--next':
                  fakeSlideTransition === null && currentIndex === lastIndex,
                'alt-carousel__item--current': fakeSlideTransition === 'right'
              })}
              style={{ backgroundImage: `url(${data.at(0)?.src})` }}
            />
            <div
              className={clsx('alt-carousel__item', {
                'alt-carousel__item--right': fakeSlideTransition !== 'right',
                'alt-carousel__item--next': fakeSlideTransition === 'right'
              })}
              style={{ backgroundImage: `url(${data.at(1)?.src})` }}
            />
          </>
        )}
        {showControls && (
          <div className="alt-carousel__controls">
            <button
              className="alt-carousel-control"
              disabled={disabled || (!loop && isFirstSlide)}
              onClick={prev}>
              <Icon i="arrow_back" />
            </button>
            <div className="alt-carousel-counter">
              {currentIndex + 1} / {data.length}
            </div>
            <button
              className="alt-carousel-control"
              disabled={disabled || (!loop && isLastSlide)}
              onClick={next}>
              <Icon i="arrow_forward" />
            </button>
            {usePhotoViewer && (
              <button className="alt-carousel-control" onClick={() => setIsFullScreen(true)}>
                <Icon i="open_in_full" />
              </button>
            )}
          </div>
        )}
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
  }
);

Carousel.displayName = 'Carousel';
