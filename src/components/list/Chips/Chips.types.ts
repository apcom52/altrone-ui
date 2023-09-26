import { Direction, Option, Size, Value } from '../../../types';

export interface ChipsProps<ValueType, Multiple extends boolean | undefined> {
  options: Option<ValueType>[];
  onChange: (values: Value<ValueType, Multiple>) => void;
  values?: Value<ValueType, Multiple>;
  multiple?: Multiple;
  SelectedIcon?: JSX.Element;
  direction?: Direction;
  size?: Size;
}
