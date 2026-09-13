import { CSSProperties, memo, useEffect, useState } from 'react';
import s from './avatar.module.scss';
import clsx from 'clsx';
import { AvatarProps } from './Avatar.types';
import { ColorUtils } from 'utils';

export const Avatar = memo((props: AvatarProps) => {
  const {
    ref,
    firstName,
    lastName,
    size,
    backgroundColor,
    textColor,
    imageSrc,
    className,
    style,
    ...restProps
  } = props;

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  const cls = clsx(
    s.Avatar,
    {
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
    },
    className,
  );

  const fullName = [firstName, lastName].join(' ').trim();
  const initials = `${firstName.trimStart().charAt(0)}${lastName ? lastName.trimStart().charAt(0) : ''}`;

  /* No explicit backgroundColor: fall back to a categorical colour keyed by
     the name, so a given person keeps the same fill across renders instead of
     everyone sharing one flat neutral. */
  const categoricalIndex = ColorUtils.getCategoricalColorIndex(fullName) + 1;

  const styles: CSSProperties & Record<string, unknown> = {
    ...style,
    '--_avatar-bg': backgroundColor ?? `var(--category-${categoricalIndex})`,
    ...(textColor ? { '--_avatar-text-color': textColor } : {}),
  };

  const showImage = Boolean(imageSrc) && !imageError;

  return (
    <div
      ref={ref}
      className={cls}
      role="img"
      aria-label={fullName || undefined}
      style={styles}
      {...restProps}
    >
      {showImage ? (
        <img
          src={imageSrc}
          className={s.Image}
          alt=""
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={s.Letters} aria-hidden="true">
          {initials}
        </span>
      )}
    </div>
  );
});
