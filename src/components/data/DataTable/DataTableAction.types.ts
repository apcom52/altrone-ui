import { ContextMenuType, Indicator } from '../../../types';
import React from 'react';

type BaseAction = {
  icon: JSX.Element;
  label: string;
  isIcon?: boolean;
  danger?: boolean;
  indicator?: Indicator;
  disabled?: boolean;
};

export interface DataTablePopupActionProps {
  closePopup: () => void;
}

export interface DataTableSelectablePopupActionProps<T extends object>
  extends DataTablePopupActionProps {
  selectedRows?: T[];
}

type BaseActionContent =
  | {
      onClick: () => void;
    }
  | {
      content: React.FC<DataTablePopupActionProps>;
    }
  | {
      contextMenu: ContextMenuType;
    };

type SelectableActionContent<T extends object> =
  | {
      onClick: (selectedRows: T[]) => void;
    }
  | {
      content: React.FC<DataTableSelectablePopupActionProps<T>>;
    }
  | {
      contextMenu: ContextMenuType;
    };

export type DataTableAction = BaseAction & BaseActionContent;
export type DataTableSelectableAction<T extends object> = BaseAction & SelectableActionContent<T>;
