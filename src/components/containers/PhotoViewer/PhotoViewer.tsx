import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './photo-viewer.scss';
import { Icon } from '../../icons';
import clsx from 'clsx';
import { PhotoViewerProps } from './PhotoViewer.types';
import { useDrag } from '../../../hooks/useDrag/useDrag';
import { useWindowSize } from '../../../hooks';
import { PhotoViewerImage } from './PhotoViewerImage';

const PHOTO_VIEWER_BOUNDARIES = 16;

export const PhotoViewer = ({
  images = [],
  onClose,
  className,
  startsFrom = 0
}: PhotoViewerProps) => {
  const [expanded, setExpanded] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(startsFrom);
  const [zoom, setZoom] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const {
    offset: toolbarOffset,
    onMouseDown: onToolbarMouseDown,
    wasDragged: wasToolbarDragged,
    setOffsets: setToolbarOffsets
  } = useDrag({
    elementRef: toolbarRef,
    containerRef: containerRef,
    boundariesRect: PHOTO_VIEWER_BOUNDARIES
  });

  const { ltePhoneL, gtPhoneL } = useWindowSize();

  const onZoomIn = useCallback(() => {
    setZoom((zoom) => (zoom < 3 ? zoom + 0.5 : 3));
  }, []);

  const onZoomOut = useCallback(() => {
    setZoom((zoom) => (zoom > 1 ? zoom - 0.5 : 1));
  }, []);

  useEffect(() => {
    if (containerRef.current && toolbarRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const toolbarRect = toolbarRef.current.getBoundingClientRect();
      setToolbarOffsets(rect.width / 2 - toolbarRect.width / 2, rect.height * 0.7);
    }
  }, []);

  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  return ReactDOM.createPortal(
    <div className={clsx('alt-photo-viewer', className)}>
      <div className="alt-photo-viewer__container" ref={containerRef}>
        <PhotoViewerImage
          containerRef={containerRef}
          scale={zoom}
          src={images[currentIndex]?.src}
        />

        {ltePhoneL && !expanded && images.length > 1 && (
          <div className="alt-photo-viewer-info">
            <div className="alt-photo-viewer-info__counter">
              <strong>{currentIndex + 1}</strong>/ {images.length}
            </div>
          </div>
        )}

        {ltePhoneL ||
        images.length > 1 ||
        images[currentIndex].caption ||
        images[currentIndex].description ? (
          gtPhoneL || (ltePhoneL && expanded) ? (
            <div className="alt-photo-viewer-info">
              {expanded && (
                <>
                  {images.length > 1 && (
                    <div className="alt-photo-viewer-info__counter">
                      <strong>{currentIndex + 1}</strong>/ {images.length}
                    </div>
                  )}
                  {images[currentIndex].caption && (
                    <div className="alt-photo-viewer-info__caption">
                      {images[currentIndex].caption}
                    </div>
                  )}
                  {images[currentIndex].description && (
                    <div className="alt-photo-viewer-info__description">
                      {images[currentIndex].description}
                    </div>
                  )}
                </>
              )}
              {gtPhoneL && (
                <button
                  className="alt-photo-viewer-toolbar__action"
                  onClick={() => setExpanded(!expanded)}>
                  <Icon i={expanded ? 'south_west' : 'north_east'} />
                </button>
              )}
            </div>
          ) : null
        ) : null}

        <div
          className={clsx('alt-photo-viewer-toolbar')}
          ref={toolbarRef}
          onMouseDown={onToolbarMouseDown}
          style={{
            top: toolbarOffset.y,
            left: toolbarOffset.x
          }}>
          {ltePhoneL && (
            <button
              className="alt-photo-viewer-toolbar__action alt-photo-viewer-toolbar__action--left"
              onClick={() => setExpanded(!expanded)}>
              <Icon i="info" />
            </button>
          )}
          {images.length > 1 && (
            <>
              <button
                className="alt-photo-viewer-toolbar__action"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}>
                <Icon i="arrow_back" />
              </button>
              <button
                className="alt-photo-viewer-toolbar__action"
                disabled={currentIndex === images.length - 1}
                onClick={() => setCurrentIndex(currentIndex + 1)}>
                <Icon i="arrow_forward" />
              </button>
            </>
          )}
          <button
            className="alt-photo-viewer-toolbar__action"
            disabled={zoom <= 1}
            onClick={onZoomOut}>
            <Icon i="remove" />
          </button>
          <div className="alt-photo-viewer-toolbar__zoom">{Math.round(zoom * 100)}%</div>
          <button
            className="alt-photo-viewer-toolbar__action"
            disabled={zoom >= 3}
            onClick={onZoomIn}>
            <Icon i="add" />
          </button>
          <button
            className={clsx('alt-photo-viewer-toolbar__action', {
              'alt-photo-viewer-toolbar__action--right': ltePhoneL
            })}
            onClick={onClose}>
            <Icon i="close" />
          </button>
        </div>
      </div>
    </div>,
    document.body.querySelector('.altrone') || document.body
  );
};
