import { memo, useEffect } from 'react';
import { PhotoViewerImageProps } from '../PhotoViewer.types.ts';
import clsx from 'clsx';
import s from './image.module.scss';
import { useBoolean } from 'utils';
import { Loading } from 'components/loading';
import { Icon } from 'components/icon';
import { useConfiguration } from 'components/configuration';

export const Image = memo<PhotoViewerImageProps>(
  ({ caption, description, className, ...restProps }) => {
    const { photoViewer: { image: imageConfig } = {} } = useConfiguration();

    const cls = clsx(s.Image, className, imageConfig?.photoClassName);

    const {
      value: loading,
      enable: startLoading,
      disable: finishLoading,
    } = useBoolean(true);

    const {
      value: failed,
      enable: setFailed,
      disable: clearFailed,
    } = useBoolean(false);

    useEffect(() => {
      startLoading();
      clearFailed();
    }, [restProps.src]);

    const onError = () => {
      finishLoading();
      setFailed();
    };

    return (
      <div className={s.ImageBlock}>
        <img
          className={cls}
          onLoad={finishLoading}
          onError={onError}
          {...restProps}
        />
        {loading && (
          <div className={s.LoadingBlock}>
            <Loading
              size="42px"
              strokeWidth="3px"
              color="var(--photoViewerLoadingColor)"
            />
          </div>
        )}
        {failed && (
          <div className={s.ErrorBlock}>
            <Icon i="error" />
          </div>
        )}
      </div>
    );
  },
);
