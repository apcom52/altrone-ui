import { ButtonProps } from './Button.types.ts';
import { Flex } from '../flex';

export const Button = ({ label, leftIcon, rightIcon }: ButtonProps) => {
  const buttonContent = label ? (
    <Flex>
      {leftIcon}
      <div>{label}</div>
      {rightIcon}
    </Flex>
  ) : (
    leftIcon || rightIcon
  );

  return <button>{buttonContent}</button>;
};
