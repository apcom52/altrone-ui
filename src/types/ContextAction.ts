export interface ContextAction {
  title: string
  onClick: () => void
  icon?: JSX.Element
  hint?: string
  disabled?: boolean
  danger?: boolean
}

export interface ParentContextAction extends Omit<ContextAction, 'onClick' | 'hint'> {
  children: ContextAction[]
}

export type ContextSeparator = '-'

export type ContextMenu = (ContextAction | ParentContextAction)[]