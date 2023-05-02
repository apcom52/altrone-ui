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
  const [toolbarPosition, setToolbarPosition] = useState<Point>({
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
        toolbarRef.current.classList.add(TOOLBAR_DRAGGING);
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

  return (
    <div
      className={clsx('alt-photo-viewer', {
        'alt-photo-viewer--loaded': !loading
      })}>
      <div className="alt-photo-viewer__container" ref={containerRef}>
        {loading && <Loading size={Size.large} />}
        <img className="alt-photo-viewer__image" src={images[0]?.src} alt="" />

        <div className="alt-photo-viewer-info">
          <div className="alt-photo-viewer-info__counter">
            <strong>1</strong>/ 6
          </div>
          <div className="alt-photo-viewer-info__caption">Image caption</div>
          <div className="alt-photo-viewer-info__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, aspernatur assumenda
            ducimus ea eaque enim harum ipsa laudantium libero, mollitia, nihil nostrum pariatur
            quas recusandae rerum saepe similique. Eius, officiis?
          </div>
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
              <button className="alt-photo-viewer-toolbar__action">
                <Icon i="arrow_back" />
              </button>
              <button className="alt-photo-viewer-toolbar__action">
                <Icon i="arrow_forward" />
              </button>
            </>
          )}
          <button className="alt-photo-viewer-toolbar__action">
            <Icon i="remove" />
          </button>
          <div className="alt-photo-viewer-toolbar__zoom">100%</div>
          <button className="alt-photo-viewer-toolbar__action">
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
