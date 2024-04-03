import { ButtonProps } from './Button.types.ts';
import { Flex } from '../flex';
import s from './button.module.scss';
import clsx from 'clsx';
import { Direction, Gap, Role } from '../../types';

export const Button = ({
  label,
  leftIcon,
  rightIcon,
  transparent,
  role = Role.default,
  className,
  ...props
}: ButtonProps) => {
  const cls = clsx(
    s.Button,
    {
      [s.Button_transparent]: transparent,
      [s.Primary]: role === Role.primary,
      [s.Success]: role === Role.success,
      [s.Warning]: role === Role.warning,
      [s.Danger]: role === Role.danger,
    },
    className,
  );

  const buttonContent = label ? (
    <Flex direction={Direction.horizontal} gap={Gap.small}>
      {leftIcon ? <div className={s.Icon}>{leftIcon}</div> : null}
      <div className={s.Label}>{label}</div>
      {rightIcon ? <div className={s.Icon}>{rightIcon}</div> : null}
    </Flex>
  ) : (
    leftIcon || rightIcon
  );

  return (
    <button className={cls} {...props}>
      {buttonContent}
    </button>
  );
};
