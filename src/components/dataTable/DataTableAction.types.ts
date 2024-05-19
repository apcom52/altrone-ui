import { Indicator } from '../../../types';

type BaseAction = {
  icon: JSX.Element;
  label: string;
  isIcon?: boolean;
  danger?: boolean;
  indicator?: Indicator;
  disabled?: boolean;
  onClick?: () => void;
};

export type DataTableAction = BaseAction;
