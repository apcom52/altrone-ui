import { Direction } from '../../../types';

export interface ListProps<T extends object, ListDirection extends Direction = Direction.vertical> {
  data: T[];
  renderFunc: (item: T, index: number) => React.ReactElement | null;
  keyExtractor?: (item: T, index: number) => string | number;
  skipRule?: (item: T, index: number) => boolean;
  gap?: number;
  SeparatorComponent?: () => React.JSX.Element;
  direction?: ListDirection;
  lineBreak?: ListDirection extends Direction.horizontal ? boolean : false;
  className?: string;
}
