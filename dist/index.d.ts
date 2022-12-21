/// <reference types="react" />
import * as react from 'react';
import { CSSProperties, ReactNode, FC, PropsWithChildren, RefObject, ReactElement } from 'react';
import { Options } from '@popperjs/core';

declare enum OffsetAxis {
    vertical = "vertical",
    horizontal = "horizontal",
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right"
}
type Offset = {
    [K in OffsetAxis]?: number;
};
interface OffsetObject {
    offset?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}
declare const useOffset: (params: number | Offset) => OffsetObject;

type WithoutDefaultOffsets<T = React.HTMLProps<HTMLDivElement>> = Omit<T, 'margin' | 'padding' | 'tagName' | 'ref'>;
type WithAltroneOffsets = {
    margin?: number | Offset;
    padding?: number | Offset;
};

declare enum Theme {
    light = "light",
    dark = "dark"
}
interface ThemeConfig {
    theme: Theme;
    locale: string;
    style?: CSSProperties;
    lang?: string;
}

declare enum Size {
    small = "small",
    medium = "medium",
    large = "large"
}

interface ContextAction {
    title: string;
    onClick: () => void;
    icon?: JSX.Element;
    hint?: string;
    disabled?: boolean;
    danger?: boolean;
}
interface ParentContextAction extends Omit<ContextAction, 'onClick' | 'hint' | 'danger'> {
    children: ContextAction[];
}
type ContextSeparator = '-';
type ContextMenuType = (ContextAction | ParentContextAction)[];

declare enum Direction {
    horizontal = "horizontal",
    vertical = "vertical"
}

interface Option<T extends any = any> {
    label: string;
    value: T;
    disabled?: boolean;
    parent?: string | number;
}
interface OptionParent {
    label: string;
    value: string | number;
    disabled?: boolean;
    color?: string;
}

declare enum Role {
    default = "default",
    primary = "primary",
    success = "success",
    danger = "danger"
}

declare enum Sort {
    asc = "asc",
    desc = "desc"
}

type Point = {
    x: number;
    y: number;
};

declare enum Align {
    start = "start",
    center = "center",
    end = "end"
}

declare const DEFAULT_OFFSET = 4;
declare const ZERO_MARGIN: Offset;
declare const ZERO_PADDING: Offset;
declare const VERTICAL_MARGIN: Offset;
declare const HORIZONTAL_MARGIN: Offset;
declare const PADDING: Offset;

declare const DEFAULT_THEME: ThemeConfig;

declare const ThemeContext: react.Context<ThemeConfig>;
declare const useThemeContext: () => ThemeConfig;

interface FormContextProps {
    required?: boolean;
    disabled?: boolean;
}
declare const FormContext: react.Context<FormContextProps>;
declare const useFormContext: () => FormContextProps;

interface DataTableSearchFunc {
    item: unknown;
    field: string;
    query: string;
}
interface DataTableSortFunc {
    itemA: unknown;
    itemB: unknown;
    field: string;
    direction: Sort;
}

interface DataTableColumn {
    accessor: string;
    label?: string;
    width?: number | string;
    Component?: ReactNode;
}
interface DataTableProps<T = any> {
    data: T[];
    columns: DataTableColumn[];
    limit?: number;
    searchBy?: string;
    sortKeys?: string[];
    sortFunc?: (params: DataTableSortFunc) => number;
    searchFunc?: (params: DataTableSearchFunc) => unknown[];
    filters?: DataTableFilter[];
    mobileColumns?: string[];
    className?: string;
}
declare const _default$w: react.MemoExoticComponent<({ data, columns, limit, searchBy, searchFunc, sortKeys, filters, mobileColumns, className }: DataTableProps<any>) => JSX.Element>;

interface DataTableFilter {
    accessor: string;
    type: 'select' | 'checkboxList';
    label?: string;
    defaultValue?: unknown;
}
interface DataTableAppliedFilter {
    accessor: string;
    value: any | any[];
}
interface DataTableContextType {
    data: any[];
    initialData: any[];
    columns: DataTableColumn[];
    page: number;
    setPage: (page: number) => void;
    limit: number;
    searchBy: string;
    search: string;
    setSearch: (search: string) => void;
    sortKeys: string[];
    sortBy: string | null;
    setSortBy: (sortBy: string | null) => void;
    sortType: Sort;
    setSortType: (sortType: Sort) => void;
    filters: DataTableFilter[];
    appliedFilters: DataTableAppliedFilter[];
    setAppliedFilters: (filters: DataTableAppliedFilter[]) => void;
    mobileColumns: string[];
}
declare const DataTableContext: react.Context<DataTableContextType>;
declare const useDataTableContext: () => DataTableContextType;

declare const Altrone: FC<PropsWithChildren<Partial<ThemeConfig>>>;

interface Margin {
    margin?: number | string;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;
}
declare const useMargin: (params: number | Offset) => Margin;

interface Padding {
    padding?: number | string;
    paddingTop?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingBottom?: number;
}
declare const usePadding: (params: number | Offset) => Padding;

type DOMRectValues = Pick<DOMRectReadOnly, 'bottom' | 'height' | 'left' | 'right' | 'top' | 'width'>;
declare const useResizeObserver: (elementRef: RefObject<HTMLElement>) => DOMRectValues;

interface SizeResult extends Record<string, number | boolean | any> {
    width: number;
    height: number;
    DesktopXL: boolean;
    DesktopL: boolean;
    DesktopM: boolean;
    DesktopS: boolean;
    DesktopXS: boolean;
    TabletL: boolean;
    TabletM: boolean;
    TabletS: boolean;
    PhoneL: boolean;
    PhoneM: boolean;
    PhoneS: boolean;
    gtDesktopXL: boolean;
    gtDesktopL: boolean;
    gtDesktopM: boolean;
    gtDesktopS: boolean;
    gtDesktopXS: boolean;
    gtTabletL: boolean;
    gtTabletM: boolean;
    gtTabletS: boolean;
    gtPhoneL: boolean;
    gtPhoneM: boolean;
    gtPhoneS: boolean;
    ltDesktopXL: boolean;
    ltDesktopL: boolean;
    ltDesktopM: boolean;
    ltDesktopS: boolean;
    ltDesktopXS: boolean;
    ltTabletL: boolean;
    ltTabletM: boolean;
    ltTabletS: boolean;
    ltPhoneL: boolean;
    ltPhoneM: boolean;
    ltPhoneS: boolean;
    gteDesktopXL: boolean;
    gteDesktopL: boolean;
    gteDesktopM: boolean;
    gteDesktopS: boolean;
    gteDesktopXS: boolean;
    gteTabletL: boolean;
    gteTabletM: boolean;
    gteTabletS: boolean;
    gtePhoneL: boolean;
    gtePhoneM: boolean;
    gtePhoneS: boolean;
    lteDesktopXL: boolean;
    lteDesktopL: boolean;
    lteDesktopM: boolean;
    lteDesktopS: boolean;
    lteDesktopXS: boolean;
    lteTabletL: boolean;
    lteTabletM: boolean;
    lteTabletS: boolean;
    ltePhoneL: boolean;
    ltePhoneM: boolean;
    ltePhoneS: boolean;
    between: (from: string, to: string) => boolean;
}
declare const useWindowSize: () => Partial<SizeResult>;

type translationOptions = {
    defaultValue?: string;
    value?: number;
    plural?: boolean;
    vars?: Record<string, any>;
};
declare const useLocalization: () => (t: string, config?: translationOptions) => string;

declare enum ButtonVariant {
    default = 0,
    borders = "borders",
    transparent = "transparent",
    text = "text"
}
interface ButtonProps extends Omit<WithoutDefaultOffsets<React.HTMLProps<HTMLButtonElement>>, 'style' | 'target' | 'size'>, WithAltroneOffsets {
    role?: Role;
    variant?: ButtonVariant;
    href?: string;
    target?: HTMLAnchorElement['target'];
    fluid?: boolean;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    size?: Size;
    dropdown?: ContextMenuType;
    isIcon?: boolean;
}
declare const _default$v: react.MemoExoticComponent<react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>>;

interface BoxProps extends WithoutDefaultOffsets, WithAltroneOffsets {
    tagName?: keyof JSX.IntrinsicElements;
}
declare const _default$u: react.MemoExoticComponent<react.ForwardRefExoticComponent<BoxProps & react.RefAttributes<unknown>>>;

declare enum FloatingBoxMobileBehaviour {
    default = "default",
    modal = "modal"
}
interface FloatingBoxProps extends WithoutDefaultOffsets {
    targetElement: HTMLElement | null;
    onClose: () => void;
    offset?: number;
    placement?: Options['placement'];
    popperProps?: Omit<Partial<Options>, "modifiers">;
    useParentWidth?: boolean;
    minWidth?: number;
    maxHeight?: number | string;
    useRootContainer?: boolean;
    preventClose?: (e: MouseEvent) => boolean;
    mobileBehaviour?: FloatingBoxMobileBehaviour;
    closeOnAnotherFloatingBoxClick?: boolean;
    className?: string;
}
declare const FloatingBox: react.ForwardRefExoticComponent<FloatingBoxProps & react.RefAttributes<HTMLDivElement>>;

interface FormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'required' | 'disabled'>, FormContextProps {
}
declare const _default$t: react.MemoExoticComponent<({ className, children, required, disabled, ...props }: FormProps) => JSX.Element>;

declare enum FormGroupVariant {
    default = "default",
    linear = "linear",
    row = "row"
}
interface FormGroupProps extends React.HTMLProps<HTMLDivElement>, FormContextProps {
    variant?: FormGroupVariant;
    align?: Align;
    weights?: number[];
}
declare const _default$s: react.MemoExoticComponent<({ variant, align, children, className, required, disabled, weights }: FormGroupProps) => JSX.Element>;

interface FormFieldProps extends Omit<React.HTMLProps<HTMLDivElement>, 'children'>, FormContextProps {
    children: ReactElement;
    label?: string;
    required?: boolean;
}
declare const _default$r: react.MemoExoticComponent<({ className, label, children, required, disabled }: FormFieldProps) => JSX.Element>;

interface ModalProps extends PropsWithChildren {
    onClose: () => void;
    title?: string;
    size?: Size;
    fluid?: boolean;
    actions?: {
        label: string;
        onClick: () => null;
        leftIcon?: ReactNode;
        rightIcon?: ReactNode;
        align?: Align;
        role?: Role;
    }[];
    showClose?: boolean;
    showCancel?: boolean;
    closeOnOverlay?: boolean;
    reduceMotion?: boolean;
    className?: string;
}
declare const _default$q: react.MemoExoticComponent<({ title, children, onClose, size, fluid, actions, showClose, showCancel, closeOnOverlay, reduceMotion, className }: ModalProps) => react.ReactPortal>;

interface ButtonContainerProps extends React.HTMLProps<HTMLDivElement> {
    direction?: Direction;
    align?: Align;
    mobileFluid?: boolean;
}
declare const _default$p: react.MemoExoticComponent<({ direction, align, className, children, mobileFluid }: ButtonContainerProps) => JSX.Element>;

interface BasicInputProps<T = string> {
    errorText?: string;
    hintText?: string;
    size?: Size;
    className?: string;
    disabled?: boolean;
}
declare const _default$o: react.NamedExoticComponent<PropsWithChildren<BasicInputProps<string>>>;

declare enum InputIslandType {
    text = 0,
    icon = 1,
    actions = 2,
    components = 3
}
interface InputIslandAction {
    title: string;
    icon: JSX.Element;
    onClick: () => void;
    disabled?: boolean;
}
interface InputIsland {
    type: InputIslandType;
    content: string | JSX.Element | JSX.Element[] | InputIslandAction[];
}
interface TextInputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange' | 'size'> {
    value: string;
    onChange: (value: string) => void;
    classNames?: {
        control?: string;
    };
    leftIsland?: InputIsland;
    rightIsland?: InputIsland;
    prefix?: string;
    suffix?: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    errorText?: string;
    hintText?: string;
    size?: Size;
    Component?: JSX.Element;
}
declare const _default$n: react.MemoExoticComponent<react.ForwardRefExoticComponent<Pick<TextInputProps, "onClick" | "title" | "disabled" | "height" | "width" | "value" | "children" | "accept" | "acceptCharset" | "action" | "allowFullScreen" | "allowTransparency" | "alt" | "as" | "async" | "autoComplete" | "autoFocus" | "autoPlay" | "capture" | "cellPadding" | "cellSpacing" | "charSet" | "challenge" | "checked" | "cite" | "classID" | "cols" | "colSpan" | "content" | "controls" | "coords" | "crossOrigin" | "data" | "dateTime" | "default" | "defer" | "download" | "encType" | "form" | "formAction" | "formEncType" | "formMethod" | "formNoValidate" | "formTarget" | "frameBorder" | "headers" | "high" | "href" | "hrefLang" | "htmlFor" | "httpEquiv" | "integrity" | "keyParams" | "keyType" | "kind" | "label" | "list" | "loop" | "low" | "manifest" | "marginHeight" | "marginWidth" | "max" | "maxLength" | "media" | "mediaGroup" | "method" | "min" | "minLength" | "multiple" | "muted" | "name" | "noValidate" | "open" | "optimum" | "pattern" | "placeholder" | "playsInline" | "poster" | "preload" | "readOnly" | "rel" | "required" | "reversed" | "rows" | "rowSpan" | "sandbox" | "scope" | "scoped" | "scrolling" | "seamless" | "selected" | "shape" | "size" | "sizes" | "span" | "src" | "srcDoc" | "srcLang" | "srcSet" | "start" | "step" | "summary" | "target" | "type" | "useMap" | "wmode" | "wrap" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "className" | "contentEditable" | "contextMenu" | "dir" | "draggable" | "hidden" | "id" | "lang" | "nonce" | "slot" | "spellCheck" | "style" | "tabIndex" | "translate" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "color" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onResize" | "onResizeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "key" | "leftIcon" | "rightIcon" | "errorText" | "hintText" | "classNames" | "leftIsland" | "rightIsland" | "suffix" | "Component"> & react.RefAttributes<HTMLInputElement>>>;

interface PasswordInputProps extends TextInputProps {
    showControls?: boolean;
}
declare const _default$m: react.MemoExoticComponent<({ showControls, rightIsland, ...props }: PasswordInputProps) => JSX.Element>;

interface NumberInputProps extends Omit<TextInputProps, 'value' | 'onChange' | 'step' | 'min' | 'max'> {
    value: number;
    onChange: (value: number) => void;
    showControls?: boolean;
    allowNegative?: boolean;
    allowLeadingZeros?: boolean;
    decimalSeparator?: string;
    digitsAfterDecimal?: number;
    step?: number;
    min?: number;
    max?: number;
}
declare const _default$l: react.MemoExoticComponent<({ value, showControls, rightIsland, onChange, allowNegative, allowLeadingZeros, decimalSeparator, digitsAfterDecimal, step, min, max, ...props }: NumberInputProps) => JSX.Element>;

interface CheckboxProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'size'>, BasicInputProps {
    danger?: boolean;
    CheckIconComponent?: JSX.Element;
    onChange: (checked: boolean) => void;
}
declare const _default$k: react.MemoExoticComponent<({ disabled, id, checked, danger, children, CheckIconComponent, className, onChange, hintText, errorText, ...props }: CheckboxProps) => JSX.Element>;

interface CheckboxListProps extends React.HTMLProps<HTMLDivElement> {
    direction?: Direction;
    limit?: number;
}
declare const _default$j: react.MemoExoticComponent<({ children, direction, className, limit, ...props }: CheckboxListProps) => JSX.Element>;

interface SelectProps<T extends number | string | boolean = string> extends Omit<React.HTMLProps<HTMLSelectElement>, 'value' | 'onChange' | 'size'>, BasicInputProps {
    value: T;
    options: Option<T>[];
    onChange: (value: T) => void;
    parents?: OptionParent[];
    searchable?: boolean;
    searchFunc?: (searchTerm: string, item: Option<T>) => boolean;
    ItemComponent?: (item: Option<T>, checked: boolean) => Element;
    size?: Size;
    classNames?: {
        select?: string;
        currentValue?: string;
        menu?: string;
        option?: string;
    };
}
declare const _default$i: react.MemoExoticComponent<({ value, options, onChange, id, parents, searchable, searchFunc, ItemComponent, disabled, size, classNames, placeholder, hintText, errorText }: SelectProps<string>) => JSX.Element>;

interface SwitcherProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'size'>, Omit<BasicInputProps, 'size'> {
    onChange: (checked: boolean) => void;
    danger?: boolean;
    align?: Align;
}
declare const _default$h: react.MemoExoticComponent<({ children, danger, align, onChange, id, className, disabled, errorText, hintText, ...props }: SwitcherProps) => JSX.Element>;

declare enum Picker {
    day = "day",
    month = "month",
    year = "year"
}
interface DatePickerProps extends Pick<TextInputProps, 'errorText' | 'hintText' | 'size' | 'disabled'>, BasicInputProps {
    value: Date;
    onChange: (value: Date) => void;
    id?: string;
    picker?: Picker;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
}
declare const _default$g: react.MemoExoticComponent<({ value, onChange, id, picker, minDate, maxDate, disabled, placeholder, size, hintText, errorText, className }: DatePickerProps) => JSX.Element>;

interface ScrollableSelectorProps<T> {
    value: T;
    options: Option<T>[];
    onChange: (value: T) => void;
    disabled?: boolean;
    width?: number | string;
    align?: Align;
    className?: string;
}
declare const _default$f: react.MemoExoticComponent<(<T extends unknown = string>({ value, options, width, disabled, align, onChange, className }: ScrollableSelectorProps<T>) => JSX.Element)>;

type Value = number | string | boolean;
interface RadioListProps {
    name: string;
    value: Value;
    options: Option[];
    onChange: (value: Option["value"]) => void;
    direction?: Direction;
    disabled?: boolean;
}
declare const _default$e: react.MemoExoticComponent<({ value, options, disabled, direction, onChange, name }: RadioListProps) => JSX.Element>;

interface TextareaProps extends Pick<TextInputProps, 'value' | 'onChange' | 'className' | 'classNames' | 'required'>, BasicInputProps {
}
declare const _default$d: react.MemoExoticComponent<({ value, onChange, className, classNames, required, disabled, errorText, hintText, size, ...props }: TextareaProps) => JSX.Element>;

type MaterialIconStyle = 'outlined' | 'rounded' | 'sharp';
interface IconProps {
    i: string;
    size?: number;
    className?: string;
    margin?: Offset;
    padding?: Offset;
    style?: MaterialIconStyle;
}
declare const _default$c: react.MemoExoticComponent<({ i, size, className, style, ...props }: IconProps) => JSX.Element>;

declare enum ProgressVariant {
    default = "default",
    segmented = "segmented"
}
interface ProgressProps {
    value: number;
    max?: number;
    size?: Size;
    role?: Role;
    variant?: ProgressVariant;
    className?: string;
}
declare const _default$b: react.MemoExoticComponent<({ variant, value, max, role, size, className }: ProgressProps) => JSX.Element>;

interface ContextMenuComponentProps {
    onClose: () => void;
    menu: ContextMenuType;
}
declare const _default$a: react.MemoExoticComponent<({ menu, onClose }: ContextMenuComponentProps) => JSX.Element>;

interface ChipsProps {
    options: Option[];
    values: any[];
    onChange: (values: any[]) => void;
    SelectedIcon?: JSX.Element;
    direction?: Direction;
    size?: Size;
}
declare const _default$9: react.MemoExoticComponent<({ options, values, onChange, SelectedIcon, direction, size }: ChipsProps) => JSX.Element>;

declare enum TabListVariant {
    default = "default",
    border = "border",
    solid = "solid"
}
type TabValue = number | string;
interface TabListProps {
    selected: TabValue;
    tabs: {
        label: string;
        value: TabValue;
        disabled?: boolean;
        href?: string;
    }[];
    onChange: (value: TabValue) => void;
    variant?: TabListVariant;
    fluid?: boolean;
    showCloseButtons?: boolean;
    showAddTabButton?: boolean;
    onCloseTab?: (value: TabValue) => void;
    onAddTab?: () => void;
    align?: Align;
}
declare const _default$8: react.MemoExoticComponent<({ selected, tabs, variant, fluid, showCloseButtons, showAddTabButton, onChange, onCloseTab, onAddTab, align }: TabListProps) => JSX.Element>;

interface ToolbarMenuProps {
    menu: {
        label: string;
        submenu?: ContextMenuType;
    }[];
}

interface ToolbarProps {
    children: ReactNode | ReactNode[];
    floated?: boolean;
    menu?: ToolbarMenuProps['menu'];
    offset?: Point;
    width?: number | string;
    className?: string;
}
declare const _default$7: react.MemoExoticComponent<({ children, floated, menu, offset, width, className }: ToolbarProps) => JSX.Element>;

interface ToolbarGroupProps {
    align?: Align;
    fluid?: boolean;
    collapsible?: boolean;
    children?: ReactNode | ReactNode[];
}
declare const _default$6: react.MemoExoticComponent<({ children, fluid, align, collapsible }: ToolbarGroupProps) => JSX.Element>;

declare const _default$5: react.MemoExoticComponent<() => JSX.Element>;

interface SubSubNavigationItem {
    label: string;
    value: unknown;
}
interface SubNavigationItem {
    label: string;
    value: unknown;
    icon?: JSX.Element;
    submenu?: SubSubNavigationItem[];
}
interface NavigationItem {
    label: string;
    value: unknown;
    icon?: JSX.Element;
    submenu?: SubNavigationItem[];
}
interface NavigationListProps {
    list: NavigationItem[];
    selected: unknown;
    onChange: (selectedValue: unknown) => void;
    title?: string;
    className?: string;
    NavigationItemComponent?: JSX.Element;
    NavigationSubItemComponent?: JSX.Element;
    NavigationSubSubItemComponent?: JSX.Element;
}
declare const _default$4: react.MemoExoticComponent<({ list, selected, onChange, title, className, NavigationItemComponent, NavigationSubItemComponent, NavigationSubSubItemComponent }: NavigationListProps) => JSX.Element>;

interface HeadingProps extends WithoutDefaultOffsets, WithAltroneOffsets {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}
declare const _default$3: react.MemoExoticComponent<({ children, level, ...props }: HeadingProps) => JSX.Element>;

interface BlockquoteProps extends WithoutDefaultOffsets, WithAltroneOffsets {
    cite?: string;
    author?: string;
    classNames?: {
        content?: string;
        author?: string;
    };
    innerProps?: {
        content?: React.HTMLProps<HTMLQuoteElement>;
        author: React.HTMLProps<HTMLDivElement>;
    };
}
declare const _default$2: react.MemoExoticComponent<({ children, className, author, classNames, innerProps, cite, ...props }: BlockquoteProps) => JSX.Element>;

interface ParagraphProps extends WithoutDefaultOffsets, WithAltroneOffsets {
}
declare const _default$1: react.MemoExoticComponent<({ children, className, ...props }: ParagraphProps) => JSX.Element>;

interface MessageProps extends Omit<React.HTMLProps<HTMLDivElement>, 'title' | 'style'> {
    title?: string;
    role?: Role;
    IconComponent?: JSX.Element;
    className?: string;
}
declare const _default: react.MemoExoticComponent<({ title, children, role, IconComponent, className }: MessageProps) => JSX.Element>;

export { Align, Altrone, _default$o as BasicInput, BasicInputProps, _default$2 as Blockquote, _default$u as Box, _default$v as Button, _default$p as ButtonContainer, ButtonVariant, _default$k as Checkbox, _default$j as CheckboxList, _default$9 as Chips, ContextAction, _default$a as ContextMenu, ContextMenuType, ContextSeparator, DEFAULT_OFFSET, DEFAULT_THEME, _default$w as DataTable, DataTableAppliedFilter, DataTableContext, DataTableContextType, DataTableFilter, _default$g as DatePicker, Direction, FloatingBox, _default$t as Form, FormContext, FormContextProps, _default$r as FormField, _default$s as FormGroup, FormGroupVariant, HORIZONTAL_MARGIN, _default$3 as Heading, _default$c as Icon, InputIsland, InputIslandAction, InputIslandType, Margin, _default as Message, _default$q as Modal, _default$4 as NavigationList, _default$l as NumberInput, OffsetObject, Option, OptionParent, PADDING, Padding, _default$1 as Paragraph, ParentContextAction, _default$m as PasswordInput, Point, _default$b as Progress, _default$e as RadioList, Role, _default$f as ScrollableSelector, _default$i as Select, Size, Sort, _default$h as Switcher, _default$8 as TabList, TabListVariant, _default$n as TextInput, TextInputProps, _default$d as Textarea, Theme, ThemeConfig, ThemeContext, _default$7 as Toolbar, _default$6 as ToolbarGroup, _default$5 as ToolbarSeparator, VERTICAL_MARGIN, WithAltroneOffsets, WithoutDefaultOffsets, ZERO_MARGIN, ZERO_PADDING, useDataTableContext, useFormContext, useLocalization, useMargin, useOffset, usePadding, useResizeObserver, useThemeContext, useWindowSize };
