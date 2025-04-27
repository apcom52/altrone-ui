import clsx from 'clsx';
import { ColorPickerProps, ColorPreset } from './ColorPicker.types';
import { TextInput, Popover, Icon, useConfiguration } from 'components';
import s from './styles.module.scss';
import { ColorPickerContent } from './inner/ColorPickerContent';
import { Size } from 'types';
import { useCallback } from 'react';
const EMPTY_COLOR_PRESETS: ColorPreset[] = [];

const SIZES: Record<Size, number> = {
  s: 12,
  m: 16,
  l: 24,
};

export const ColorPicker = (props: ColorPickerProps) => {
  const {
    value,
    onChange,
    className,
    style,
    placeholder,
    size = 'm',
    allowPalette = true,
    colorPresets = EMPTY_COLOR_PRESETS,
    readOnly = false,
    clearable = false,
    renderFunc,
    ...restProps
  } = props;

  const handleChange = useCallback(
    (color?: string) => {
      onChange(typeof color === 'string' ? color.toLowerCase() : value);
    },
    [onChange],
  );

  const { colorPicker: colorPickerConfig = {} } = useConfiguration();

  const cls = clsx(s.ColorPicker, colorPickerConfig.className, className, {
    [s.Readonly]: readOnly,
  });

  const styles = {
    ...colorPickerConfig.style,
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
    >
      {({ opened }) => {
        if (typeof renderFunc === 'function') {
          return renderFunc({
            opened,
            value,
            setValue: handleChange,
          });
        }

        return (
          <TextInput
            className={cls}
            style={styles}
            value={value || ''}
            placeholder={placeholder}
            readOnly={true}
            readonlyStyles={readOnly}
            size={size}
            transparent={props.transparent}
            onChange={() => null}
            {...restProps}
          >
            <TextInput.CustomIsland>
              <div
                className={s.ColorPreview}
                style={{
                  backgroundColor: value,
                  width: SIZES[size],
                  height: SIZES[size],
                }}
              />
            </TextInput.CustomIsland>
            {!readOnly && (
              <TextInput.IconIsland
                placement="right"
                icon={<Icon i={opened ? 'expand_less' : 'expand_more'} />}
              />
            )}
          </TextInput>
        );
      }}
    </Popover>
  );
};
