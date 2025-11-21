import { JSX, ReactElement } from 'react';

export type ListItemKey = string;

export type ListItemData = {
  key: ListItemKey;
  title: string;
  description?: JSX.Element;
  icon?: ReactElement;
  meta?: JSX.Element;
  disabled?: boolean;
};

export interface ListItemProps
  extends ListItemData,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  itemKey: ListItemKey;
  selected?: boolean;
  onSelect?: (key: ListItemKey) => void;
}

export type ListContext = {
  selectedItemKeys: ListItemKey[];
  selectedItems: ListItemData[];

  setSelection: (keys: ListItemKey[]) => void;
  clearSelection: () => void;
};

export type ListActionsChildren = ReactElement | ReactElement[];

export interface ListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
  data: ListItemData[];
  selectedItemKeys?: ListItemKey[];
  children?:
    | ListActionsChildren
    | ((context: ListContext) => ListActionsChildren);
  multiple?: boolean;

  onSelect?: (keys: ListItemKey[]) => void;
}
