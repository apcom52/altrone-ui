export interface Option<T extends unknown> {
  label: string;
  value: T;
  disabled?: boolean;
  parent?: string;
}

export interface OptionParent<T extends unknown> {
  label: string;
  value: T;
  disabled?: boolean;
  color?: string;
}
