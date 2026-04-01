import { createContext, useContext } from 'react';
import type { CSSProperties } from 'react';
import { BasicComponentStyleConfig } from 'types';
import type { CollapsedListContext } from '../collapsedList/CollapsedList.types.ts';
import type { RenderFunction } from '../../utils';

export const DEFAULT_CONFIGURATION: ConsumerConfigurationContext = {
  locale: {
    locale: 'en-US',
    dateFormat: 'MM/dd/yyyy',
    monthFormat: 'MM/yyyy',
    yearFormat: 'yyyy',
    numberGrouping: ',',
    numberDecimal: '.',
  },
};

type ComponentConfiguration<ExtraProps extends Record<string, unknown> = Record<string, never>> =
  Partial<BasicComponentStyleConfig & ExtraProps>;

export type Locale = {
  locale: string;
  dateFormat: string;
  monthFormat: string;
  yearFormat: string;
  numberGrouping: string;
  numberDecimal: string;
};

export interface ConsumerConfigurationContext {
  locale?: Partial<Locale>;
  avatar?: ComponentConfiguration;
  autocompleteInput?: ComponentConfiguration<{
    showControls?: boolean;
  }>;
  bottomNavigation?: ComponentConfiguration<{
    selectedItemClassName?: string;
    item?: ComponentConfiguration<{
      selectedItemClassName?: string;
      badgeClassName?: string;
    }>;
  }>;
  breadcrumbs?: ComponentConfiguration;
  button?: ComponentConfiguration<{
    rainbowEffect?: boolean;
    badgeClassName?: string;
  }>;
  calendar?: ComponentConfiguration;
  checkbox?: ComponentConfiguration;
  closeButton?: ComponentConfiguration;
  collapsedList?: ComponentConfiguration<{
    limit?: number;
    expandButtonLabel?: RenderFunction<string, CollapsedListContext>;
  }>;
  colorPicker?: ComponentConfiguration;
  dataGrid?: ComponentConfiguration;
  dataTable?: ComponentConfiguration<{
    action?: ComponentConfiguration;
    rowActions?: ComponentConfiguration;
    rowAction?: ComponentConfiguration;
  }>;
  datePicker?: ComponentConfiguration<{
    popoverContentClassName?: string;
    popoverContentStyles?: CSSProperties;
    dateFormat?: string;
    monthFormat?: string;
    yearFormat?: string;
    rangeFormat?: string;
    rangeFormatEmpty?: string;
  }>;
  divider?: ComponentConfiguration;
  drawer?: ComponentConfiguration;
  dropdown?: ComponentConfiguration<{
    focusFirstElement?: boolean;
    menu?: ComponentConfiguration;
    action?: ComponentConfiguration<{
      badgeClassName?: string;
    }>;
    checkbox?: ComponentConfiguration;
    radioList?: ComponentConfiguration;
    radioItem?: ComponentConfiguration;
    childMenu?: ComponentConfiguration;
  }>;
  dummyBox?: ComponentConfiguration;
  empty?: ComponentConfiguration;
  filePicker?: ComponentConfiguration;
  flex?: ComponentConfiguration;
  form?: ComponentConfiguration<{
    field?: ComponentConfiguration;
  }>;
  grid?: ComponentConfiguration<{
    column?: ComponentConfiguration;
  }>;
  icon?: ComponentConfiguration;
  list?: ComponentConfiguration;
  loading?: ComponentConfiguration<{
    color?: string;
  }>;
  message?: ComponentConfiguration;
  modal?: ComponentConfiguration;
  navigationList?: ComponentConfiguration<{
    group?: ComponentConfiguration<{
      titleClassName?: string;
    }>;
    groupAction?: ComponentConfiguration;
    link?: ComponentConfiguration<{
      badgeClassName?: string;
    }>;
    linkAction?: ComponentConfiguration;
  }>;
  numberInput?: ComponentConfiguration<{
    showControls?: boolean;
    allowLeadingZeros?: boolean;
    digitsAfterPoint?: number;
  }>;
  pagination?: ComponentConfiguration;
  passwordInput?: ComponentConfiguration<{
    showControls?: boolean;
  }>;
  photoViewer?: ComponentConfiguration<{
    image?: {
      photoClassName?: string;
    };
  }>;
  popover?: ComponentConfiguration;
  progress?: ComponentConfiguration<{
    activeSegmentClassName?: string;
  }>;
  radio?: ComponentConfiguration<{
    item?: ComponentConfiguration;
  }>;
  range?: ComponentConfiguration<{
    activeTrackClassName?: string;
  }>;
  scrollable?: ComponentConfiguration;
  search?: ComponentConfiguration<{
    showControls?: boolean;
  }>;
  select?: ComponentConfiguration;
  sideNavigation?: ComponentConfiguration<{
    titleClassName?: string;
    selectedItemClassName?: string;
  }>;
  spoiler?: ComponentConfiguration;
  switcher?: ComponentConfiguration;
  tabs?: ComponentConfiguration<{
    rainbowEffect?: boolean;
    item?: ComponentConfiguration<{
      badgeClassName?: string;
      selectedClassName?: string;
    }>;
  }>;
  tags?: ComponentConfiguration<{
    item?: ComponentConfiguration;
  }>;
  text?: ComponentConfiguration<{
    section?: ComponentConfiguration;
    screenName?: ComponentConfiguration;
    heading?: ComponentConfiguration;
    paragraph?: ComponentConfiguration;
    inline?: ComponentConfiguration;
    code?: ComponentConfiguration;
    keyboard?: ComponentConfiguration;
    link?: ComponentConfiguration;
    list?: ComponentConfiguration;
    listItem?: ComponentConfiguration;
  }>;
  textarea?: ComponentConfiguration;
  textInput?: ComponentConfiguration<{
    rainbowEffect?: boolean;
    textIsland?: ComponentConfiguration;
    iconIsland?: ComponentConfiguration;
    loadingIsland?: ComponentConfiguration<{
      color?: string;
    }>;
    actionIsland?: ComponentConfiguration;
    customIsland?: ComponentConfiguration;
  }>;
  toolbar?: ComponentConfiguration<{
    actionClassName?: string;
    groupClassName?: string;
    action?: ComponentConfiguration<{
      badgeClassName?: string;
    }>;
  }>;
  tooltip?: ComponentConfiguration;
  topNavigation?: ComponentConfiguration<{
    link?: ComponentConfiguration<{
      badgeClassName?: string;
    }>;
  }>;
}

export const ConfigurationContext =
  createContext<ConsumerConfigurationContext>(DEFAULT_CONFIGURATION);
export const useConfiguration = () => useContext(ConfigurationContext);
