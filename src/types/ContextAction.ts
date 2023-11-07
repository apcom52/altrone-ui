import { Option } from './Option';

type BaseContextAction = {
  hint?: string;
  disabled?: boolean;
};

type ClickAction = {
  type?: 'action';
  title: string;
  icon?: JSX.Element;
  onClick: (...args: unknown[]) => void;
  selected?: boolean;
  danger?: boolean;
};

type CheckboxAction = {
  type: 'checkbox';
  title: string;
  onChange: (state: boolean) => void;
  checked: boolean;
};

type RadioListAction = {
  type: 'radioList';
  title?: string;
  options: Option<unknown>[];
  value: unknown;
  onChange: (selectedOption: unknown) => void;
};

type SeparatorAction = {
  type: 'separator';
};

export type ContextClickAction = BaseContextAction & ClickAction;
export type ContextCheckboxAction = BaseContextAction & CheckboxAction;
export type ContextRadioListAction = BaseContextAction & RadioListAction;
export type ContextAction =
  | ContextClickAction
  | ContextCheckboxAction
  | ContextRadioListAction
  | SeparatorAction;

export type ParentContextAction = {
  title: string;
  children: ContextAction[];
  icon?: JSX.Element;
  danger?: boolean;
};

export type ContextSeparator = '-';

export type ContextMenuType = (ContextAction | ParentContextAction)[];
