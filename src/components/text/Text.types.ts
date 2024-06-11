import { Gap, Size } from 'types';

export type TextHeadingRoles = 'title' | 'heading' | 'subheading' | 'inner';

export type TextListType = 'numeric' | 'marked';

interface BaseInlineProps {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  deleted?: boolean;
  highlighted?: boolean;
}

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
}

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
}

export interface TextScreenNameProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface TextHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  role?: TextHeadingRoles;
}

export interface TextParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: Size;
}

export interface TextInlineProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BaseInlineProps {}

export interface TextLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    Pick<BaseInlineProps, 'bold' | 'italic'> {
  href?: string;
  target?: string;
}

export interface TextCodeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    Pick<BaseInlineProps, 'bold' | 'italic'> {}

export interface TextKeyboardProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    Pick<BaseInlineProps, 'bold'> {}

export interface TextListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  type?: TextListType;
  size?: Size;
}

export interface TextListItemProps
  extends React.HTMLAttributes<HTMLLIElement> {}
