export interface Option<T extends unknown> {
  label: string;
  value: T;
  disabled?: boolean;
  parent?: string;
}

export interface OptionParent {
  label: string;
  value: string;
  disabled?: boolean;
  color?: string;
}
