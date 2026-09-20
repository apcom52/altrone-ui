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
import { useFormField } from '../form/components/Field.context.ts';

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
    size,
    allowPalette = true,
    colorPresets = EMPTY_COLOR_PRESETS,
    readOnly = false,
    clearable = false,
    transparent,
    disabled,
    asChild = false,
    children,
    ...restProps
  } = props;

  const { disabled: formFieldDisabled, size: formFieldSize } = useFormField();

  const inputDisabled =
    typeof disabled === 'boolean' ? disabled : formFieldDisabled;
  const inputSize = size || formFieldSize || 'm';

  const handleChange = useCallback(
    (color: string | undefined, event?: SyntheticEvent) => {
      onChange(color?.toLowerCase(), event);
    },
    [onChange],
  );

  const cls = clsx(s.ColorPicker, className, {
    [s.Readonly]: readOnly,
  });

  return (
    <Popover
      placement="bottom-start"
      title={t('colorPicker.title')}
      content={({ closePopup }) => (
        <ColorPickerContent
          colorPresets={colorPresets}
          value={value}
          onChange={handleChange}
          allowPalette={allowPalette}
          clearable={clearable}
          size={inputSize}
          closePopup={closePopup}
        />
      )}
      enabled={!readOnly}
      defaultListNavigationIndex={-1}
      listNavigation
      overlap
    >
      {({ open: opened }) => {
        if (asChild) {
          if (!isValidElement(children)) {
            console.error(
              '[ColorPicker] asChild requires a single valid React element as children',
            );
            return null;
          }

          const childElement = children as ReactElement<
            Record<string, unknown>
          >;
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
            disabled={inputDisabled}
            size={inputSize}
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
                    width: PREVIEW_SIZES[inputSize],
                    height: PREVIEW_SIZES[inputSize],
                  }}
                />
              ) : (
                <Box
                  shape="circle"
                  material="pale"
                  size={PREVIEW_SIZES[inputSize]}
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
