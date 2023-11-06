type BaseContextAction = {
  title: string;
  icon?: JSX.Element;
  hint?: string;
  disabled?: boolean;
};

type ClickAction = {
  type?: 'action';
  onClick: (...args: unknown[]) => void;
  selected?: boolean;
  danger?: boolean;
};

type CheckboxAction = {
  type: 'checkbox';
  onChange: (state: boolean) => void;
  checked: boolean;
};

type RadioListAction = {
  type: 'radioList';
  groupName: string;
  value: unknown;
  onChange: (selectedOption: unknown) => void;
  selectedValue: unknown;
};

export type ContextClickAction = BaseContextAction & ClickAction;
export type ContextCheckboxAction = BaseContextAction & CheckboxAction;
export type ContextRadioListAction = BaseContextAction & RadioListAction;
export type ContextAction = ContextClickAction | ContextCheckboxAction | ContextRadioListAction;

export type ParentContextAction = {
  title: string;
  children: ContextAction[];
  icon?: JSX.Element;
  danger?: boolean;
};

export type ContextSeparator = '-';

export type ContextMenuType = (ContextAction | ParentContextAction)[];
