import { memo, useCallback, useEffect, useRef, useState } from 'react';
import s from './avatar.module.scss';
import clsx from 'clsx';
import { AvatarProps } from './Avatar.types';
import { useConfiguration } from 'components/configuration';
import { GlobalUtils } from 'utils';
import { useAltroneTheme } from 'components/application';

export const Avatar = memo((props: AvatarProps) => {
  const {
    ref,
    firstName,
    lastName,
    size,
    color,
    imageSrc,
    className,
    style,
    ...restProps
  } = props;

  const theme = useAltroneTheme();

  const { avatar: avatarConfig = {} } = useConfiguration();
  const internalRef = useRef<HTMLDivElement>(null);
  const [textColor, setTextColor] = useState<string>('var(--white)');
  const [imageError, setImageError] = useState(false);

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  useEffect(() => {
    const el = internalRef.current;
    if (!el) return;
    const computedColor = window.getComputedStyle(el).backgroundColor;
    const hex = GlobalUtils.rgbToHex(computedColor);
    setTextColor(
      GlobalUtils.getColorLuminance(hex) === 'dark'
        ? 'var(--white)'
        : 'var(--black)',
    );
  }, [color, theme.theme]);

  const cls = clsx(
    s.Avatar,
    {
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
    },
    className,
    avatarConfig.className,
  );

  const styles = {
    ...avatarConfig.style,
    backgroundColor: color,
    ...style,
  };

  const fullName = [firstName, lastName].join(' ').trim();
  const initials = `${firstName.trimStart().charAt(0)}${lastName ? lastName?.trimStart().charAt(0) : ''}`;

  return (
    <div
      ref={mergedRef}
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
        <span className={s.Letters} style={{ color: textColor }}>
          {initials}
        </span>
      )}
    </div>
  );
});
