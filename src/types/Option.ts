export interface Option<T extends any  = string> {
  label: string
  value: T,
  disabled?: boolean
  parent?: string | number
}

export interface OptionParent {
  label: string
  value: string | number
  disabled?: boolean
  color?: string
}