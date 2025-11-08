export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  block?: boolean;
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  list?: 'numeric' | 'marked';
  item?: boolean;
  italic?: boolean;
  underline?: boolean;
  deleted?: boolean;
  highlighted?: boolean;
  href?: string;
  code?: boolean;
  kbd?: boolean;
}
