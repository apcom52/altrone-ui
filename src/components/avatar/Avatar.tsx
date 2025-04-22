import { memo } from 'react';
import s from './avatar.module.scss';
import clsx from 'clsx';
import { AvatarProps } from './Avatar.types';
import { useConfiguration } from 'components/configuration';
import { GlobalUtils } from 'utils';

export const Avatar = memo((props: AvatarProps) => {
  const {
    firstName,
    lastName,
    size,
    color = 'var(--default-200)',
    imageSrc,
    className,
    style,
    ...restProps
  } = props;

  const { avatar: avatarConfig = {} } = useConfiguration();

  const cls = clsx(
    s.Avatar,
    {
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
    },
    className,
    avatarConfig.className,
  );

  const styles = {
    backgroundColor: color,
    ...avatarConfig.style,
    ...style,
  };

  const textColor =
    GlobalUtils.getColorLuminance(color) === 'dark'
      ? 'var(--default-50)'
      : 'var(--default-900)';

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div title={fullName} className={cls} style={styles} {...restProps}>
      {imageSrc ? (
        <img src={imageSrc} className={s.Image} alt={fullName} />
      ) : (
        <span className={s.Letters} style={{ color: textColor }}>
          {firstName.trimStart().charAt(0)}
          {lastName?.trimStart().charAt(0)}
        </span>
      )}
    </div>
  );
});
