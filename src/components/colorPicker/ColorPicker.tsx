import clsx from 'clsx';
import { ColorPickerProps, ColorPreset } from './ColorPicker.types';
import { TextInput, Popover, Icon } from 'components';
import s from './styles.module.scss';
import { ColorPickerContent } from './inner/ColorPickerContent';

const EMPTY_COLOR_PRESETS: ColorPreset[] = [];

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

  const cls = clsx(s.ColorPicker, className, {
    [s.Readonly]: readOnly,
  });
  const styles = { ...style };

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
              style={{ backgroundColor: value }}
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
