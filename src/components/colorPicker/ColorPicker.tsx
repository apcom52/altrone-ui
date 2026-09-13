import clsx from 'clsx';
import { ColorPickerProps, ColorPreset } from './ColorPicker.types';
import { TextInput } from 'components/textInput/TextInput.tsx';
import { Popover } from 'components/popover/Popover.tsx';
import { useLocalization } from 'components/application';
import { Box } from 'components/box';
import s from './styles.module.scss';
import { ColorPickerContent } from './inner/ColorPickerContent';
import { Size } from 'types';
import {
  isValidElement,
  useCallback,
  type ReactElement,
  type SyntheticEvent,
} from 'react';
import { Slot } from 'utils/components/Slot';
import { ChevronDown, ChevronUp } from 'lucide-react';

const EMPTY_COLOR_PRESETS: ColorPreset[] = [];

/** Swatch diameter per tier — roughly two thirds of the matching `Box` height (16/24/32/40/48). */
const PREVIEW_SIZES: Record<Size, number> = {
  mini: 10,
  s: 16,
  m: 20,
  l: 28,
  xl: 32,
};

export const ColorPicker = (props: ColorPickerProps) => {
  const t = useLocalization();

  const {
    ref,
    value,
    onChange,
    className,
    style,
    placeholder = t('colorPicker.placeholder'),
    size = 'm',
    allowPalette = true,
    colorPresets = EMPTY_COLOR_PRESETS,
    readOnly = false,
    clearable = false,
    transparent,
    disabled = false,
    asChild = false,
    children,
    renderFunc,
    ...restProps
  } = props;

  const handleChange = useCallback(
    (color: string | undefined, event?: SyntheticEvent) => {
      onChange(typeof color === 'string' ? color.toLowerCase() : value, event);
    },
    [onChange, value],
  );

  const cls = clsx(s.ColorPicker, className, {
    [s.Readonly]: readOnly,
  });

  return (
    <Popover
      placement="bottom-start"
      content={({ closePopup }) => (
        <ColorPickerContent
          colorPresets={colorPresets}
          value={value}
          onChange={handleChange}
          allowPalette={allowPalette}
          clearable={clearable}
          size={size}
          closePopup={closePopup}
        />
      )}
      enabled={!readOnly}
      defaultListNavigationIndex={-1}
      listNavigation
      overlap
    >
      {({ opened }) => {
        if (renderFunc) {
          return renderFunc({
            value,
            opened,
            disabled,
            placeholder,
            className: cls,
            style,
          });
        }

        if (asChild) {
          if (!isValidElement(children)) {
            console.error(
              '[ColorPicker] asChild requires a single valid React element as children',
            );
            return null;
          }

          const childElement = children as ReactElement<Record<string, unknown>>;
          const childProps = childElement.props;

          return (
            <Slot
              ref={ref}
              className={clsx(childProps.className as string | undefined, cls)}
              style={{
                ...(childProps.style as React.CSSProperties | undefined),
                ...style,
              }}
              data-value={value || undefined}
              data-opened={opened}
            >
              {childElement}
            </Slot>
          );
        }

        return (
          <TextInput
            ref={ref}
            className={cls}
            style={style}
            value={value || ''}
            placeholder={placeholder}
            readOnly={true}
            readonlyStyles={readOnly}
            disabled={disabled}
            size={size}
            variant={transparent ? 'transparent' : undefined}
            onChange={() => null}
            {...restProps}
          >
            <TextInput.CustomIsland className={s.ColorPreviewWrapper}>
              {value ? (
                <div
                  className={s.ColorPreview}
                  style={{
                    backgroundColor: value,
                    width: PREVIEW_SIZES[size],
                    height: PREVIEW_SIZES[size],
                  }}
                />
              ) : (
                <Box
                  shape="circle"
                  material="hatch"
                  size={PREVIEW_SIZES[size]}
                  style={{ marginLeft: 2 }}
                />
              )}
            </TextInput.CustomIsland>
            {!readOnly && (
              <TextInput.IconIsland
                placement="end"
                icon={opened ? <ChevronUp /> : <ChevronDown />}
              />
            )}
          </TextInput>
        );
      }}
    </Popover>
  );
};
