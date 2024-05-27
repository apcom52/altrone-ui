import { isValidElement, memo, useEffect } from 'react';
import { PhotoViewerProps } from './PhotoViewer.types';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import { getSafeArray } from '../../utils';
import { Image } from './components';
import s from './photoViewer.module.scss';
import clsx from 'clsx';
import { PhotoViewerToolbar } from './inner/PhotoViewerToolbar.tsx';
import { useNumber } from '../../utils/hooks';

const PhotoViewerComponent = memo(
  ({
    children,
    onClose,
    className,
    startsFrom = 0,
    style,
    ...restProps
  }: PhotoViewerProps) => {
    const { photoViewer: photoViewerConfig = {} } = useConfiguration();

    const safeChildren = getSafeArray(children);
    const validChildren = safeChildren.filter(
      (item) => isValidElement(item) && item.type === Image,
    );

    const {
      value: currentIndex,
      setValue: setCurrentIndex,
      increment: nextPhoto,
      decrement: prevPhoto,
    } = useNumber(startsFrom, 0, validChildren.length);

    const currentChildElement = validChildren[currentIndex];

    const cls = clsx(s.Wrapper, className, photoViewerConfig.className);
    const styles = {
      ...photoViewerConfig.style,
      ...style,
    };

    useEffect(() => {
      setCurrentIndex(0);
    }, [children]);

    return (
      <div className={cls} style={styles} {...restProps}>
        {currentChildElement}
        <PhotoViewerToolbar
          currentIndex={currentIndex}
          totalPhotos={validChildren.length}
          onPrevious={prevPhoto}
          onNext={nextPhoto}
          onClose={onClose}
          caption={currentChildElement.props.caption}
          description={currentChildElement.props.description}
        />
      </div>
    );
  },
);

const PhotoViewerNamespace = Object.assign(PhotoViewerComponent, {
  Image,
});

export { PhotoViewerNamespace as PhotoViewer };
