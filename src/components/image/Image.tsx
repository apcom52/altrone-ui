import { memo, useEffect, useState, type CSSProperties } from 'react';
import clsx from 'clsx';
import { ImageOff } from 'lucide-react';
import { Skeleton } from 'components/skeleton/Skeleton.tsx';
import { Text } from 'components/text/Text.tsx';
import { useLocalization } from 'components/application/useLocalization.tsx';
import s from './image.module.scss';
import { ImageFit, ImageProps } from './Image.types.ts';

const toLength = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value;

/* `cover`/`fill` always fill the frame, so the media box can just be 100%.
   `contain`/`scale-down`/`none` can render smaller than the frame — sizing
   the box to the content is what makes the border (see image.module.scss)
   hug the visible picture instead of the empty letterbox space around it. */
const FIT_CLASS: Record<ImageFit, string> = {
  cover: s.FitCover,
  fill: s.FitFill,
  contain: s.FitContain,
  'scale-down': s.FitScaleDown,
  none: s.FitNone,
};

export const Image = memo((props: ImageProps) => {
  const {
    ref,
    src,
    alt = '',
    children,
    fit = 'cover',
    objectPosition,
    width,
    height,
    radius,
    caption,
    isLoading,
    preloader,
    onLoad,
    onError,
    className,
    style,
    ...restProps
  } = props;

  const t = useLocalization();

  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    src ? 'loading' : 'loaded',
  );

  /* Re-arm the loading state when the URL changes — `src`/`alt` are the only
     signals this component can observe on its own. */
  useEffect(() => {
    setStatus(src ? 'loading' : 'loaded');
  }, [src]);

  const cls = clsx(s.Image, className);

  const mediaStyle: CSSProperties & Record<string, string> = {
    '--image-fit': fit,
    ...(objectPosition && { '--image-object-position': objectPosition }),
    ...(width != null && { '--image-width': toLength(width) }),
    ...(height != null && { '--image-height': toLength(height) }),
    ...(radius != null && { '--image-radius': toLength(radius) }),
  };

  const showChildrenPreloader = !src && isLoading;
  const showSrcPreloader = Boolean(src) && status === 'loading';
  const showPreloader = showChildrenPreloader || showSrcPreloader;

  const preloaderNode = showPreloader ? (
    <div className={s.Preloader}>
      {preloader ?? (
        <Skeleton width="100%" height="100%" aria-label={t('image.loading')} />
      )}
    </div>
  ) : null;

  const media = src ? (
    status === 'error' ? (
      <div
        className={s.Broken}
        role="img"
        aria-label={alt || t('image.brokenImage')}
      >
        <div className={s.BrokenMedia} aria-hidden="true">
          <ImageOff />
        </div>
      </div>
    ) : (
      <img
        className={clsx(s.Media, FIT_CLASS[fit], {
          [s.Hidden]: status === 'loading',
        })}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setStatus('loaded');
          onLoad?.(event);
        }}
        onError={(event) => {
          setStatus('error');
          onError?.(event);
        }}
      />
    )
  ) : (
    <div
      className={clsx(s.Media, FIT_CLASS[fit], {
        [s.Hidden]: showChildrenPreloader,
      })}
    >
      {children}
    </div>
  );

  return (
    <figure ref={ref} className={cls} style={style} {...restProps}>
      <div className={s.Frame} style={mediaStyle}>
        {media}
        {preloaderNode}
      </div>
      {caption ? (
        <Text block size={4} color="muted" align="center">
          {caption}
        </Text>
      ) : null}
    </figure>
  );
});
