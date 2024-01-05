import { Direction } from '../../../types';

export interface ListProps<T extends object> {
  data: T[];
  children: (item: T, index: number) => React.ReactElement | null;
  keyExtractor: (item: T, index: number) => string | number;
  direction?: Direction;
  skipRule?: (item: T, index: number) => boolean;
  gap?: number;
  className?: string;
  startsFrom?: number;
  limit?: number;
  SeparatorComponent?: () => React.JSX.Element;
  onRefresh?: () => Promise<T[]>;
}
