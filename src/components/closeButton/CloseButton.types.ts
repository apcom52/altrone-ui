import { ButtonProps } from 'components/button/Button.types';

export type CloseButtonProps = Omit<ButtonProps, 'label'> & {
  label?: string;
};
