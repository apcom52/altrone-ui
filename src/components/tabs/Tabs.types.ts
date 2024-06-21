import { RenderFuncProp } from '../../types';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TabsItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  selected?: boolean;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, TabsItemProps>;
}
