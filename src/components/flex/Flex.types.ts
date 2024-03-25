import { BasicComponentProps } from '../../types/BaseDisplayComponent.ts';
import { Align, Direction, Gap } from 'types';
import { PropsWithChildren } from 'react';

export interface FlexProps
  extends PropsWithChildren<BasicComponentProps<HTMLDivElement>> {
  gap?: Gap;
  direction?: Direction;
  align?: Align;
  justify?: Align;
  disableInnerMargins?: boolean;
}
