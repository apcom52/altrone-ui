import React, { useContext } from 'react';
import { BasicComponentStyleConfig } from 'types';
import { CollapsedListProps } from '../collapsedList/CollapsedList.types.ts';

export const DEFAULT_CONFIGURATION: ConsumerConfigurationContext = {
  locale: {
    dateFormat: 'DD.MM.YYYY',
    numberGrouping: ' ',
    numberDecimal: '.',
  },
};

type ComponentConfiguration<ExtraProps extends object = {}> = Partial<
  BasicComponentStyleConfig & ExtraProps
>;

export type Locale = {
  dateFormat: string;
  numberGrouping: '' | ' ' | ',' | '.';
  numberDecimal: '.' | ',';
};

export interface ConsumerConfigurationContext {
  locale?: Partial<Locale>;
  autocompleteInput?: ComponentConfiguration;
  bottomNavigation?: ComponentConfiguration<{
    selectedItemClassName: string;
  }>;
  breadcrumbs?: ComponentConfiguration;
  button?: ComponentConfiguration<{
    rainbowEffect?: boolean;
  }>;
  calendar?: ComponentConfiguration;
  checkbox?: ComponentConfiguration;
  closeButton?: ComponentConfiguration;
  collapsedList?: ComponentConfiguration<{
    limit?: number;
    expandButtonLabel?: CollapsedListProps['expandButtonLabel'];
  }>;
  dataTable?: ComponentConfiguration;
  datePicker?: ComponentConfiguration<{
    popoverContentClassName: string;
    popoverContentStyles: React.CSSProperties;
    dateFormat: string;
    monthFormat: string;
    yearFormat: string;
    rangeFormat: string;
    rangeFormatEmpty: string;
  }>;
  divider?: ComponentConfiguration;
  dropdown?: ComponentConfiguration<{
    focusFirstElement?: boolean;
    menu?: ComponentConfiguration;
    action?: ComponentConfiguration;
    checkbox?: ComponentConfiguration;
    radioList?: ComponentConfiguration;
    radioItem?: ComponentConfiguration;
    childMenu?: ComponentConfiguration;
  }>;
  filePicker?: ComponentConfiguration;
  flex?: ComponentConfiguration;
  form?: ComponentConfiguration<{
    field?: ComponentConfiguration;
  }>;
  icon?: ComponentConfiguration;
  list?: ComponentConfiguration;
  loading?: ComponentConfiguration<{
    color: string;
  }>;
  message?: ComponentConfiguration;
  modal?: ComponentConfiguration;
  navigationList?: ComponentConfiguration<{
    group?: {
      titleClassName: string;
    };
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
    image: {
      photoClassName: string;
    };
  }>;
  popover?: ComponentConfiguration;
  progress?: ComponentConfiguration<{
    activeSegmentClassName?: string;
  }>;
  radio?: ComponentConfiguration;
  scrollable?: ComponentConfiguration;
  search?: ComponentConfiguration<{
    showControls?: boolean;
  }>;
  select?: ComponentConfiguration;
  sideNavigation?: ComponentConfiguration<{
    titleClassName: string;
    selectedItemClassName: string;
  }>;
  spoiler?: ComponentConfiguration;
  switcher?: ComponentConfiguration;
  tabs?: ComponentConfiguration<{
    rainbowEffect: boolean;
  }>;
  tags?: ComponentConfiguration;
  text?: ComponentConfiguration<{
    section: ComponentConfiguration;
    screenName: ComponentConfiguration;
    heading: ComponentConfiguration;
    paragraph: ComponentConfiguration;
    inline: ComponentConfiguration;
    code: ComponentConfiguration;
    keyboard: ComponentConfiguration;
    link: ComponentConfiguration;
    list: ComponentConfiguration;
    listItem: ComponentConfiguration;
  }>;
  textarea?: ComponentConfiguration;
  textInput?: ComponentConfiguration<{
    rainbowEffect?: boolean;
    textIsland?: ComponentConfiguration;
    iconIsland?: ComponentConfiguration;
    actionIsland?: ComponentConfiguration;
    customIsland?: ComponentConfiguration;
  }>;
  toolbar?: ComponentConfiguration<{
    actionClassName: string;
    groupClassName: string;
  }>;
  tooltip?: ComponentConfiguration;
  topNavigation?: ComponentConfiguration;
}

export const ConfigurationContext =
  React.createContext<ConsumerConfigurationContext>(DEFAULT_CONFIGURATION);
export const useConfiguration = () => useContext(ConfigurationContext);
