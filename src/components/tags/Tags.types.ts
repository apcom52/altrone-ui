import { RenderFuncProp } from '../../types';

export interface TagsProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TagsItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, TagsItemProps>;
}
