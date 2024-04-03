import { ButtonProps } from './Button.types.ts';
import { Flex } from 'components';
import s from './button.module.scss';
import clsx from 'clsx';
import { Align, Direction, Gap, Role, Size } from 'types';

export const Button = ({
  label,
  leftIcon,
  rightIcon,
  transparent,
  role = Role.default,
  size = Size.medium,
  className,
  ...props
}: ButtonProps) => {
  const isOnlyIcon = Boolean(!label && (leftIcon || rightIcon));

  const cls = clsx(
    s.Button,
    {
      [s.Button_transparent]: transparent,
      [s.Primary]: role === Role.primary,
      [s.Success]: role === Role.success,
      [s.Warning]: role === Role.warning,
      [s.Danger]: role === Role.danger,
      [s.Small]: size === Size.small,
      [s.Large]: size === Size.large,
      [s.OnlyIcon]: isOnlyIcon,
    },
    className,
  );

  const buttonContent = !isOnlyIcon ? (
    <Flex
      direction={Direction.horizontal}
      gap={size === Size.large ? Gap.small : Gap.xsmall}
      align={Align.center}
    >
      {leftIcon ? <div className={s.Icon}>{leftIcon}</div> : null}
      <div className={s.Label}>{label}</div>
      {rightIcon ? <div className={s.Icon}>{rightIcon}</div> : null}
    </Flex>
  ) : (
    <div className={s.Icon}>{leftIcon || rightIcon}</div>
  );

  return (
    <button className={cls} {...props}>
      {buttonContent}
    </button>
  );
};
