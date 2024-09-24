import { Option } from './Select.types.ts';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';

export const SELECT_COUNTRIES: Option[] = COUNTRIES.map((item) => ({
  label: item.country,
  value: item.country.toLowerCase(),
}));
