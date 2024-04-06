import { BasicComponentProps, Gap } from '../../types';
import { ReactElement } from 'react';
import { RenderFunction } from '../../utils/fn.ts';
import { FlexProps } from '../flex/Flex.types.ts';

export type ListItemContext<DataType extends object> = {
  item: DataType;
  currentIndex: number;
  data: DataType[];
};

export interface ListProps<DataType extends object>
  extends Omit<BasicComponentProps<HTMLDivElement>, 'children'>,
    FlexProps {
  data: Array<DataType>;
  renderItem: (context: ListItemContext<DataType>) => ReactElement;
  keyExtractor?: (context: ListItemContext<DataType>) => string | number;
  skipRule?: (context: ListItemContext<DataType>) => boolean;
  gap?: Gap;
  SeparatorComponent?: RenderFunction<ReactElement, ListItemContext<DataType>>;
}
