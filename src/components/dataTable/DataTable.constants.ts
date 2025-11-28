import { Option } from '../select/Select.types.ts';
import {
  ArrayFilterRules,
  BooleanFilterRules,
  CellRenderer,
  DataTableColumnType,
  DateFilterRules,
  NumberFilterRules,
  StringFilterRules,
} from './DataTable.types.ts';
import { BooleanRenderer } from './renderers/booleanRenderer.tsx';
import { ColorRenderer } from './renderers/colorRenderer.tsx';
import { CurrencyRenderer } from './renderers/currencyRenderer.tsx';
import { DateRenderer } from './renderers/dateRenderer.tsx';
import { LinkRenderer } from './renderers/linkRenderer.tsx';
import { NumberRenderer } from './renderers/numberRenderer.tsx';
import { PasswordRenderer } from './renderers/passwordRenderer.tsx';
import { SelectRenderer } from './renderers/selectRenderer.tsx';
import { StringRenderer } from './renderers/stringRenderer.tsx';
import { TextRenderer } from './renderers/textRenderer.tsx';

interface FilteringRuleOption extends Option {
  columns?: 0 | 1 | 2;
}

export const DataTableStringRules: FilteringRuleOption[] = [
  {
    value: StringFilterRules.contain,
    label: 'dataTable.stringFilter.contain',
    columns: 1,
  },
  {
    value: StringFilterRules.notContain,
    label: 'dataTable.stringFilter.notContain',
    columns: 1,
  },
  {
    value: StringFilterRules.equal,
    label: 'dataTable.stringFilter.equal',
    columns: 1,
  },
  {
    value: StringFilterRules.notEqual,
    label: 'dataTable.stringFilter.notEqual',
    columns: 1,
  },
  {
    value: StringFilterRules.empty,
    label: 'dataTable.stringFilter.empty',
    columns: 0,
  },
  {
    value: StringFilterRules.notEmpty,
    label: 'dataTable.stringFilter.notEmpty',
    columns: 0,
  },
];

export const DataTableNumberRules: FilteringRuleOption[] = [
  {
    value: NumberFilterRules.equal,
    label: 'dataTable.numberFilter.equal',
    columns: 1,
  },
  {
    value: NumberFilterRules.notEqual,
    label: 'dataTable.numberFilter.notEqual',
    columns: 1,
  },
  {
    value: NumberFilterRules.gt,
    label: 'dataTable.numberFilter.gt',
    columns: 1,
  },
  {
    value: NumberFilterRules.gte,
    label: 'dataTable.numberFilter.gte',
    columns: 1,
  },
  {
    value: NumberFilterRules.lt,
    label: 'dataTable.numberFilter.lt',
    columns: 1,
  },
  {
    value: NumberFilterRules.lte,
    label: 'dataTable.numberFilter.lte',
    columns: 1,
  },
  {
    value: NumberFilterRules.between,
    label: 'dataTable.numberFilter.between',
    columns: 2,
  },
  {
    value: NumberFilterRules.notBetween,
    label: 'dataTable.numberFilter.notBetween',
    columns: 2,
  },
  {
    value: NumberFilterRules.empty,
    label: 'dataTable.numberFilter.empty',
    columns: 0,
  },
  {
    value: NumberFilterRules.notEmpty,
    label: 'dataTable.numberFilter.notEmpty',
    columns: 0,
  },
];

export const DataTableArrayRules: FilteringRuleOption[] = [
  {
    value: ArrayFilterRules.has,
    label: 'dataTable.arrayFilter.has',
    columns: 1,
  },
  {
    value: ArrayFilterRules.notHas,
    label: 'dataTable.arrayFilter.notHas',
    columns: 1,
  },
];

export const DataTableBooleanRules: FilteringRuleOption[] = [
  {
    value: BooleanFilterRules.positive,
    label: 'dataTable.booleanFilter.positive',
    columns: 0,
  },
  {
    value: BooleanFilterRules.negative,
    label: 'dataTable.booleanFilter.negative',
    columns: 0,
  },
];

export const DataTableDateRules: FilteringRuleOption[] = [
  {
    value: DateFilterRules.equal,
    label: 'dataTable.dateFilter.equal',
    columns: 1,
  },
  {
    value: DateFilterRules.notEqual,
    label: 'dataTable.dateFilter.notEqual',
    columns: 1,
  },
  {
    value: DateFilterRules.empty,
    label: 'dataTable.dateFilter.empty',
    columns: 0,
  },
  {
    value: DateFilterRules.notEmpty,
    label: 'dataTable.dateFilter.notEmpty',
    columns: 0,
  },
  {
    value: DateFilterRules.lt,
    label: 'dataTable.dateFilter.lt',
    columns: 1,
  },
  {
    value: DateFilterRules.lte,
    label: 'dataTable.dateFilter.lte',
    columns: 1,
  },
  {
    value: DateFilterRules.gt,
    label: 'dataTable.dateFilter.gt',
    columns: 1,
  },
  {
    value: DateFilterRules.gte,
    label: 'dataTable.dateFilter.gte',
    columns: 1,
  },
  {
    value: DateFilterRules.between,
    label: 'dataTable.dateFilter.between',
    columns: 2,
  },
  {
    value: DateFilterRules.beyond,
    label: 'dataTable.dateFilter.beyond',
    columns: 2,
  },
];

export const RulesByDataType: Partial<
  Record<DataTableColumnType, FilteringRuleOption[]>
> = {
  string: DataTableStringRules,
  text: DataTableStringRules,
  number: DataTableNumberRules,
  currency: DataTableNumberRules,
};

export const CellRenderers: Partial<
  Record<DataTableColumnType, React.FC<CellRenderer<any>>>
> & {
  string: React.FC<CellRenderer<any>>;
  text: React.FC<CellRenderer<any>>;
} = {
  string: StringRenderer,
  text: TextRenderer,
  number: NumberRenderer,
  currency: CurrencyRenderer,
  boolean: BooleanRenderer,
  date: DateRenderer,
  password: PasswordRenderer,
  select: SelectRenderer,
  link: LinkRenderer,
  color: ColorRenderer,
  // custom: CustomRenderer,
};
