import { BasicComponentProps } from '../../types/BaseDisplayComponent.ts';
import { Size } from '../../types';

export enum TextHeadingRoles {
  title = 'title',
  heading = 'heading',
  subheading = 'subheading',
  inner = 'inner',
}

interface BaseInlineProps {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  deleted?: boolean;
  highlighted?: boolean;
}

export interface TextScreenNameProps
  extends BasicComponentProps<HTMLHeadingElement> {}

export interface TextHeadingProps
  extends BasicComponentProps<HTMLHeadingElement> {
  level?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  role?: TextHeadingRoles;
}

export interface TextParagraphProps
  extends BasicComponentProps<HTMLParagraphElement> {
  size?: Size;
}

export interface TextInlineProps extends BasicComponentProps, BaseInlineProps {}

export interface TextLinkProps
  extends BasicComponentProps<HTMLAnchorElement>,
    Pick<BaseInlineProps, 'bold' | 'italic'> {
  href?: string;
  target?: string;
}

export interface TextCodeProps
  extends BasicComponentProps,
    Pick<BaseInlineProps, 'bold' | 'italic'> {}

export interface TextKeyboardProps
  extends BasicComponentProps,
    Pick<BaseInlineProps, 'bold'> {}
