import { ButtonProps } from './Button.types.ts';
import { Flex } from '../flex';
import s from './button.module.scss';
import clsx from 'clsx';
import { Direction, Gap } from '../../types';

export const Button = ({
  label,
  leftIcon,
  rightIcon,
  transparent,
  className,
  ...props
}: ButtonProps) => {
  const cls = clsx(
    s.Button,
    {
      [s.Button_transparent]: transparent,
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
