import React, { useEffect, useState } from 'react';
import { Loading } from '../../indicators';
import { Size } from '../../../types';
import './photo-viewer.scss';
import { Icon } from '../../icons';
import clsx from 'clsx';
import { PhotoViewerProps } from './PhotoViewer.types';

export const PhotoViewer = ({ url, onClose, useNavigation = false }: PhotoViewerProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div
      className={clsx('alt-photo-viewer', {
        'alt-photo-viewer--loaded': !loading
      })}>
      <div className="alt-photo-viewer__container">
        {loading && <Loading size={Size.large} />}
        <img className="alt-photo-viewer__image" src={url} alt="" />
        <div className="alt-photo-viewer-toolbar">
          {useNavigation && (
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
