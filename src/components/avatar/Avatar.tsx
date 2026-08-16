import { memo, useEffect, useState } from 'react';
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
  const initials = `${firstName.trimStart().charAt(0)}${lastName ? lastName?.trimStart().charAt(0) : ''}`;

  // No explicit backgroundColor: fall back to a categorical color derived
  // from the name, so a given person keeps the same background across
  // renders instead of everyone sharing one flat neutral fill.
  const categoricalIndex = ColorUtils.getCategoricalColorIndex(fullName) + 1;

  const styles: React.CSSProperties & Record<string, unknown> = {
    ...style,
    '--_avatar-bg': backgroundColor ?? `var(--category-${categoricalIndex})`,
    ...(textColor ? { '--_avatar-text-color': textColor } : {}),
  };

  return (
    <div
      ref={ref}
      className={cls}
      aria-label={fullName}
      style={styles}
      {...restProps}
    >
      {imageSrc && !imageError ? (
        <img
          src={imageSrc}
          className={s.Image}
          alt={fullName}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={s.Letters}>{initials}</span>
      )}
    </div>
  );
});
