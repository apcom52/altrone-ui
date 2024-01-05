import { Direction } from '../../../types';

export interface ListProps<T extends object, ListDirection extends Direction = Direction.vertical> {
  data: T[];
  children: (item: T, index: number) => React.ReactElement | null;
  keyExtractor?: (item: T, index: number) => string | number;
  skipRule?: (item: T, index: number) => boolean;
  gap?: number;
  className?: string;
  startsFrom?: number;
  limit?: number;
  SeparatorComponent?: () => React.JSX.Element;
  direction?: ListDirection;
  onRefresh?: ListDirection extends Direction.vertical
    ? undefined | (() => Promise<T[]>)
    : undefined;
  lineBreak: ListDirection extends Direction.horizontal ? boolean | undefined : false | undefined;
}
