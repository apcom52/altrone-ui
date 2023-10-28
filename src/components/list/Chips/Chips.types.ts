import { Direction, Option, Size, OptionValue } from '../../../types';

export interface ChipsProps<ValueType, Multiple extends boolean | undefined = true> {
  options: Option<ValueType>[];
  onChange: (values: OptionValue<ValueType, Multiple>) => void;
  values: OptionValue<ValueType, Multiple>;
  multiple?: Multiple;
  SelectedIcon?: JSX.Element;
  direction?: Direction;
  size?: Size;
}
