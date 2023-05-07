import React, {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Loading } from '../../indicators';
import { Point, Size } from '../../../types';
import './photo-viewer.scss';
import { Icon } from '../../icons';
import clsx from 'clsx';
import { PhotoViewerProps } from './PhotoViewer.types';

const TOOLBAR_DRAGGING = 'alt-photo-viewer-toolbar--dragging';

export const PhotoViewer = ({ images = [], onClose }: PhotoViewerProps) => {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const [toolbarPosition, setToolbarPosition] = useState<Point>({
    x: 0,
    y: 0
  });
  const [imageOffset, setImageOffset] = useState<Point>({
    x: 0,
    y: 0
  });

  const isDragged = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback<MouseEventHandler>((e) => {
    isDragged.current = e.target.closest('.alt-photo-viewer-toolbar') === toolbarRef.current;

    if (toolbarRef.current) {
      if (isDragged.current) {
        setTimeout(() => {
          if (toolbarRef.current && isDragged.current) {
            toolbarRef.current.classList.add(TOOLBAR_DRAGGING);
          }
        }, 100);
      } else {
        toolbarRef.current.classList.remove(TOOLBAR_DRAGGING);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
  }, []);

  const onMouseMove = useCallback<MouseEventHandler>((e) => {
    if (!isDragged.current || !toolbarRef.current || !containerRef.current) {
      return;
    }

    const toolbarRect = toolbarRef.current.getBoundingClientRect();
    const rect = containerRef.current.getBoundingClientRect();

    const maxXPosition = rect.width - 16 - toolbarRect.width;
    const maxYPosition = rect.height - 16 - toolbarRect.height;

    setToolbarPosition((toolbarPosition) => {
      let x = toolbarPosition.x + e.movementX;
      let y = toolbarPosition.y + e.movementY;

      if (x < 16) {
        x = 16;
      }

      if (y < 16) {
        y = 16;
      }

      if (x > maxXPosition) {
        x = maxXPosition;
      }

      if (y > maxYPosition) {
        y = maxYPosition;
      }

      return { x, y };
    });
  }, []);

  const onMouseUp = useCallback<MouseEventHandler>((e: MouseEvent) => {
    isDragged.current = false;
    document.removeEventListener('mousemove', onMouseMove);

    if (toolbarRef.current) {
      toolbarRef.current.classList.remove(TOOLBAR_DRAGGING);
    }
  }, []);

  const onZoomIn = useCallback(() => {
    setZoom((zoom) => (zoom < 3 ? zoom + 0.5 : 3));
  }, []);

  const onZoomOut = useCallback(() => {
    setZoom((zoom) => (zoom > 1 ? zoom - 0.5 : 1));
  }, []);

  const onImageLoad = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current && toolbarRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const toolbarRect = toolbarRef.current.getBoundingClientRect();
      setToolbarPosition({
        x: rect.width / 2 - toolbarRect.width / 2,
        y: rect.height * 0.7
      });
    }

    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [currentIndex]);

  return (
    <div className={clsx('alt-photo-viewer')}>
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
          style={{
            transform: `translateX(-50%) translateY(-50%) scale(${zoom})`
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
          style={{
            top: toolbarPosition.y,
            left: toolbarPosition.x
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
