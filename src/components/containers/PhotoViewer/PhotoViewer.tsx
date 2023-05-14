import { useCallback, useEffect, useRef, useState } from 'react';
import { Loading } from '../../indicators';
import { Size } from '../../../types';
import './photo-viewer.scss';
import { Icon } from '../../icons';
import clsx from 'clsx';
import { PhotoViewerProps } from './PhotoViewer.types';
import { useDrag } from '../../../hooks/useDrag/useDrag';

const PHOTO_VIEWER_BOUNDARIES = 16;

export const PhotoViewer = ({ images = [], onClose, className }: PhotoViewerProps) => {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);

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

  const {
    offset: photoOffset,
    onMouseDown: onPhotoMouseDown,
    wasDragged: wasPhotoDragged,
    setOffsets: setPhotoOffsets
  } = useDrag({
    elementRef: pictureRef,
    containerRef: containerRef,
    boundariesRect: undefined
  });

  const onZoomIn = useCallback(() => {
    setZoom((zoom) => (zoom < 3 ? zoom + 0.5 : 3));
  }, []);

  const onZoomOut = useCallback(() => {
    setZoom((zoom) => (zoom > 1 ? zoom - 0.5 : 1));
  }, []);

  const onImageLoad = useCallback(() => {
    setLoading(false);

    if (pictureRef.current && containerRef.current) {
      const pictureRect = pictureRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setPhotoOffsets(
        containerRect.width / 2 - pictureRect.width / 2,
        containerRect.height / 2 - pictureRect.height / 2
      );
    }
  }, []);

  useEffect(() => {
    if (containerRef.current && toolbarRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const toolbarRect = toolbarRef.current.getBoundingClientRect();
      setToolbarOffsets(rect.width / 2 - toolbarRect.width / 2, rect.height * 0.7);
    }

    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    setLoading(true);
    setZoom(1);
  }, [currentIndex]);

  return (
    <div className={clsx('alt-photo-viewer', className)}>
      <div className="alt-photo-viewer__container" ref={containerRef}>
        {loading && (
          <div className="alt-photo-viewer__loading">
            <Loading size={Size.large} />
          </div>
        )}
        <img
          className="alt-photo-viewer__image"
          src={images[currentIndex]?.src}
          alt=""
          onLoad={onImageLoad}
          ref={pictureRef}
          onMouseDown={onPhotoMouseDown}
          draggable={false}
          style={{
            transform: `scale(${zoom})`,
            left: photoOffset.x,
            top: photoOffset.y
          }}
        />

        <div className="alt-photo-viewer-info">
          {expanded && (
            <>
              {images.length > 1 && (
                <div className="alt-photo-viewer-info__counter">
                  <strong>{currentIndex + 1}</strong>/ {images.length}
                </div>
              )}
              {images[currentIndex].caption && (
                <div className="alt-photo-viewer-info__caption">{images[currentIndex].caption}</div>
              )}
              {images[currentIndex].description && (
                <div className="alt-photo-viewer-info__description">
                  {images[currentIndex].description}
                </div>
              )}
            </>
          )}
          <button
            className="alt-photo-viewer-toolbar__action"
            onClick={() => setExpanded(!expanded)}>
            <Icon i={expanded ? 'south_west' : 'north_east'} />
          </button>
        </div>

        <div
          className={clsx('alt-photo-viewer-toolbar')}
          ref={toolbarRef}
          onMouseDown={onToolbarMouseDown}
          style={{
            top: toolbarOffset.y,
            left: toolbarOffset.x
          }}>
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
          <button className="alt-photo-viewer-toolbar__action" onClick={onClose}>
            <Icon i="close" />
          </button>
        </div>
      </div>
    </div>
  );
};
