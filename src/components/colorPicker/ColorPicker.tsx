import clsx from 'clsx';
import { ColorPickerProps, ColorPreset } from './ColorPicker.types';
import { TextInput, Popover, Icon, useConfiguration } from 'components';
import s from './styles.module.scss';
import { ColorPickerContent } from './inner/ColorPickerContent';
import { Size } from 'types';

const EMPTY_COLOR_PRESETS: ColorPreset[] = [];

const SIZES: Record<Size, number> = {
  s: 12,
  m: 16,
  l: 24,
};

export const ColorPicker = <Value = unknown,>(
  props: ColorPickerProps<Value>,
) => {
  const {
    value,
    onChange,
    className,
    style,
    placeholder,
    parentWidth,
    size = 'm',
    allowPalette = true,
    colorPresets = EMPTY_COLOR_PRESETS,
    readOnly = false,
    ...restProps
  } = props;

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
      content={
        <ColorPickerContent
          colorPresets={colorPresets}
          value={value}
          onChange={onChange}
          allowPalette={allowPalette}
        />
      }
      enabled={!readOnly}
      defaultListNavigationIndex={-1}
      listNavigation
    >
      {({ opened }) => (
        <TextInput
          className={cls}
          style={styles}
          value={value}
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
      )}
    </Popover>
  );
};
