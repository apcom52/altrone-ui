export interface Option<T extends string | number | boolean = string> {
  label: string
  value: T,
  disabled?: boolean
  parent?: number
}

export interface OptionParent {
  label: string
  value: string | number
  disabled?: boolean
  color?: string
}