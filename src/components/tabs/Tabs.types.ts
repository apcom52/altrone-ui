import { RenderFuncProp } from '../../types';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TabsItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  icon?: JSX.Element;
  selected?: boolean;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, TabsItemProps>;
}
