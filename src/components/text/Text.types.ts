import { BasicComponentProps } from '../../types/BaseDisplayComponent.ts';
import { Role, Size } from '../../types';

export enum TextHeadingRoles {
  title = 'title',
  heading = 'heading',
  subheading = 'subheading',
  inner = 'inner',
}

interface BaseInlineProps {
  size?: Size;
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
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  role?: TextHeadingRoles;
}

export interface TextParagraphProps
  extends BasicComponentProps<HTMLParagraphElement> {
  size?: Size;
}

export interface TextInlineProps extends BasicComponentProps, BaseInlineProps {}

export interface TextLabelProps
  extends BasicComponentProps,
    Pick<BaseInlineProps, 'size' | 'highlighted'> {
  role?: Role;
}

export interface TextLinkProps
  extends BasicComponentProps<HTMLAnchorElement>,
    Omit<BaseInlineProps, 'deleted' | 'highlighted'> {
  href?: string;
  target?: string;
}

export interface TextCodeProps
  extends BasicComponentProps,
    Pick<BaseInlineProps, 'size' | 'bold' | 'italic'> {}

export interface TextKeyboardProps
  extends BasicComponentProps,
    Pick<BaseInlineProps, 'size' | 'bold'> {}
