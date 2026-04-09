import clsx from 'clsx';
import { ColorPickerProps, ColorPreset } from './ColorPicker.types';
import { TextInput } from 'components/textInput/TextInput.tsx';
import { Popover } from 'components/popover/Popover.tsx';
import { useLocalization } from 'components/application';
import { DummyBox } from 'components/dummyBox/DummyBox.tsx';
import s from './styles.module.scss';
import { ColorPickerContent } from './inner/ColorPickerContent';
import { Size } from 'types';
import { isValidElement, useCallback } from 'react';
import { Slot } from 'utils/components/Slot';
import { ChevronDown, ChevronUp } from 'lucide-react';

const EMPTY_COLOR_PRESETS: ColorPreset[] = [];

const SIZES: Record<Size, number> = {
  mini: 16,
  s: 20,
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
    asChild = false,
    children,
    ...restProps
  } = props;

  const handleChange = useCallback(
    (color?: string) => {
      onChange(typeof color === 'string' ? color.toLowerCase() : value);
    },
    [onChange, value],
  );

  const cls = clsx(s.ColorPicker, className, {
    [s.Readonly]: readOnly,
  });

  const styles = {
    ...style,
  };

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
          closePopup={closePopup}
        />
      )}
      enabled={!readOnly}
      defaultListNavigationIndex={-1}
      listNavigation
      overlap
    >
      {({ opened }) => {
        if (asChild) {
          if (!isValidElement(children)) {
            console.error(
              '[ColorPicker] asChild requires a single valid React element as children',
            );
            return null;
          }

          const childProps = (children as React.ReactElement).props as Record<
            string,
            unknown
          >;

          return (
            <Slot
              ref={ref}
              className={clsx(childProps.className as string | undefined, cls)}
              style={{
                ...(childProps.style as React.CSSProperties | undefined),
                ...styles,
              }}
              data-value={value || undefined}
              data-opened={opened}
            >
              {children}
            </Slot>
          );
        }

        return (
          <TextInput
            ref={ref}
            className={cls}
            style={styles}
            value={value || ''}
            placeholder={placeholder}
            readOnly={true}
            readonlyStyles={readOnly}
            size={size}
            transparent={transparent}
            onChange={() => null}
            {...restProps}
          >
            <TextInput.CustomIsland className={s.ColorPreviewWrapper}>
              {value ? (
                <div
                  className={s.ColorPreview}
                  style={{
                    backgroundColor: value,
                    width: SIZES[size],
                    height: SIZES[size],
                  }}
                />
              ) : (
                <DummyBox
                  className={s.ColorPreview}
                  width={SIZES[size] + 'px'}
                  height={SIZES[size] + 'px'}
                  radius="50%"
                />
              )}
            </TextInput.CustomIsland>
            {!readOnly && (
              <TextInput.IconIsland
                placement="right"
                icon={opened ? <ChevronUp /> : <ChevronDown />}
              />
            )}
          </TextInput>
        );
      }}
    </Popover>
  );
};
