import React, { useContext } from 'react';
import { BasicComponentStyleConfig } from 'types';
import { CollapsedListProps } from '../collapsedList/CollapsedList.types.ts';

export const DEFAULT_CONFIGURATION: ConsumerConfigurationContext = {
  language: 'en',
  locale: {
    dateFormat: 'DD.MM.YYYY',
    numberGrouping: ' ',
    numberDecimal: '.',
  },
};

type ComponentConfiguration<ExtraProps extends object = {}> = Partial<
  BasicComponentStyleConfig & ExtraProps
>;

export type Language = 'en' | 'ru' | string;

export type Locale = {
  dateFormat: string;
  numberGrouping: '' | ' ' | ',' | '.';
  numberDecimal: '.' | ',';
};

export interface ConsumerConfigurationContext {
  language?: Language;
  locale?: Partial<Locale>;
  icon?: ComponentConfiguration;
  flex?: ComponentConfiguration;
  message?: ComponentConfiguration;
  textScreenName?: ComponentConfiguration;
  textHeading?: ComponentConfiguration;
  textParagraph?: ComponentConfiguration;
  textInline?: ComponentConfiguration;
  textList?: ComponentConfiguration;
  textListItem?: ComponentConfiguration;
  textCode?: ComponentConfiguration;
  textKeyboard?: ComponentConfiguration;
  textLink?: ComponentConfiguration<{ rel?: string }>;
  list?: ComponentConfiguration;
  button?: ComponentConfiguration<{
    rainbowEffect?: boolean;
  }>;
  scrollable?: ComponentConfiguration;
  closeButton?: ComponentConfiguration;
  popover?: ComponentConfiguration;
  dropdown?: ComponentConfiguration<{
    focusFirstElement?: boolean;
  }>;
  dropdownMenu?: ComponentConfiguration;
  dropdownAction?: ComponentConfiguration;
  dropdownCheckbox?: ComponentConfiguration;
  dropdownRadioList?: ComponentConfiguration;
  dropdownRadioItem?: ComponentConfiguration;
  dropdownChildMenu?: ComponentConfiguration;
  textInput?: ComponentConfiguration<{
    rainbowEffect?: boolean;
  }>;
  inputTextIsland?: ComponentConfiguration;
  inputIconIsland?: ComponentConfiguration;
  inputActionIsland?: ComponentConfiguration;
  inputCustomIsland?: ComponentConfiguration;
  passwordInput?: ComponentConfiguration<{
    showControl?: boolean;
  }>;
  autocompleteInput?: ComponentConfiguration;
  numberInput?: ComponentConfiguration<{
    showControl?: boolean;
    allowLeadingZeros?: boolean;
    digitsAfterPoint?: number;
  }>;
  textarea?: ComponentConfiguration;
  search?: ComponentConfiguration<{
    showControl?: boolean;
  }>;
  checkbox?: ComponentConfiguration;
  switcher?: ComponentConfiguration;
  collapsedList?: ComponentConfiguration<{
    limit?: number;
    expandButtonLabel?: CollapsedListProps['expandButtonLabel'];
  }>;
  radio?: ComponentConfiguration;
  select?: ComponentConfiguration;
  calendar?: ComponentConfiguration;
  datePicker?: ComponentConfiguration<{
    popoverContentClassName: string;
    popoverContentStyles: React.CSSProperties;
    dateFormat: string;
    monthFormat: string;
    yearFormat: string;
    rangeFormat: string;
    rangeFormatEmpty: string;
  }>;
  filePicker?: ComponentConfiguration;
  pagination?: ComponentConfiguration;
  loading?: ComponentConfiguration<{
    color: string;
  }>;
  tooltip?: ComponentConfiguration;
  dataTable?: ComponentConfiguration;
  toolbar?: ComponentConfiguration<{
    actionClassName: string;
    groupClassName: string;
  }>;
  photoViewer?: ComponentConfiguration<{
    photoClassName: string;
  }>;
  topNavigation?: ComponentConfiguration;
  navigationList?: ComponentConfiguration<{
    groupTitleClassName: string;
  }>;
  sideNavigation?: ComponentConfiguration<{
    titleClassName: string;
    selectedItemClassName: string;
  }>;
  bottomNavigation?: ComponentConfiguration<{
    selectedItemClassName: string;
  }>;
  modal?: ComponentConfiguration;
  spoiler?: ComponentConfiguration;
  progress?: ComponentConfiguration<{
    activeSegmentClassName?: string;
  }>;
}

export const ConfigurationContext =
  React.createContext<ConsumerConfigurationContext>(DEFAULT_CONFIGURATION);
export const useConfiguration = () => useContext(ConfigurationContext);
