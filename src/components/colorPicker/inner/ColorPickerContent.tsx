import {
  Button,
  Flex,
  Icon,
  NumberInput,
  Tabs,
  TextInput,
  useLocalization,
} from 'components';
import { FocusEventHandler, useCallback, useEffect, useState } from 'react';
import { ColorPickerProps } from '../ColorPicker.types';
import { ColorPreset } from './ColorPreset';
import s from './colorPickerContent.module.scss';
import { HexAlphaColorPicker } from 'react-colorful';
import { Delete } from 'lucide-react';

interface ColorPickerContentProps
  extends Pick<
    ColorPickerProps,
    'colorPresets' | 'value' | 'onChange' | 'allowPalette' | 'clearable'
  > {
  closePopup: () => void;
}

export const ColorPickerContent = (props: ColorPickerContentProps) => {
  const { colorPresets, value = '#000000', onChange, allowPalette } = props;

  const t = useLocalization();

  const _allowPalette = typeof allowPalette === 'boolean' ? allowPalette : true;

  const presetsEnabled = Boolean(props.colorPresets?.length);
  const paletteEnabled = presetsEnabled ? _allowPalette : true;
  const tabsAmount = Number(presetsEnabled) + Number(paletteEnabled);

  const [mode, setMode] = useState<'presets' | 'palette'>(() => {
    if (presetsEnabled) {
      return 'presets';
    }

    return 'palette';
  });

  const [localColor, setLocalColor] = useState(value ? value.slice(1, 7) : '');

  const [hexR, hexG, hexB] = value
    ? [value.slice(1, 3), value.slice(3, 5), value.slice(5, 7)]
    : ['00', '00', '00'];

  const [red, setRed] = useState<number | undefined>(parseInt(hexR, 16));
  const [green, setGreen] = useState<number | undefined>(parseInt(hexG, 16));
  const [blue, setBlue] = useState<number | undefined>(parseInt(hexB, 16));

  useEffect(() => {
    setRed(parseInt(hexR, 16));
    setGreen(parseInt(hexG, 16));
    setBlue(parseInt(hexB, 16));
  }, [hexR, hexG, hexB]);

  const handleBlur = useCallback<FocusEventHandler>(
    (e) => {
      const isValidHexColor = (value: string): boolean => {
        const hexColorRegex = /^[0-9A-Fa-f]{6}$/;
        return hexColorRegex.test(value);
      };

      const input = e.target as HTMLInputElement;
      if (isValidHexColor(input.value)) {
        onChange(`#${input.value}`);
      } else {
        setLocalColor('');
        onChange(undefined);
      }
    },
    [hexR, hexG, hexB, onChange]
  );

  const handleRGBFieldBlur = useCallback(() => {
    const alphaValue = value.slice(7, 9);

    onChange(
      `#${(red || 0).toString(16).padStart(2, '0')}${(green || 0)
        .toString(16)
        .padStart(2, '0')}${(blue || 0)
        .toString(16)
        .padStart(2, '0')}${alphaValue}`
    );
  }, [red, green, blue, onChange]);

  const handleClearClick = () => {
    props.onChange(undefined);
    props.closePopup();
  };

  useEffect(() => {
    setLocalColor(value ? value.slice(1, 7) : '');
  }, [value]);

  return (
    <Flex direction="vertical" gap="m" className={s.ColorPicker}>
      {tabsAmount >= 2 ? (
        <Tabs>
          <Tabs.Item
            icon={<Icon i="apps" />}
            label={t('colorPicker.savedColors')}
            onClick={() => setMode('presets')}
            selected={mode === 'presets'}
          />
          <Tabs.Item
            icon={<Icon i="palette" />}
            label={t('colorPicker.palette')}
            onClick={() => setMode('palette')}
            selected={mode === 'palette'}
          />
        </Tabs>
      ) : null}
      {mode === 'presets' ? (
        <Flex direction="horizontal" gap="m" wrap>
          {colorPresets?.map((preset, presetIndex) => (
            <ColorPreset
              key={`${presetIndex}-${preset.name}`}
              onChange={onChange}
              selected={preset.value === value}
              {...preset}
            />
          ))}
        </Flex>
      ) : null}
      {mode === 'palette' ? (
        <HexAlphaColorPicker
          color={value}
          onChange={onChange}
          defaultValue="#000000ff"
          className={s.Palette}
        />
      ) : null}
      {mode === 'palette' ? (
        <Flex direction="vertical" gap="xs">
          <Flex direction="horizontal" gap="s">
            <TextInput
              maxLength={6}
              style={{ width: 100 }}
              placeholder="000000"
              value={localColor}
              onChange={setLocalColor}
              onBlur={handleBlur}
            >
              <TextInput.TextIsland label="#" />
            </TextInput>
            <NumberInput
              value={red}
              onChange={setRed}
              onBlur={handleRGBFieldBlur}
              min={0}
              max={255}
              showControls={false}
              placeholder="0"
              title="R"
            >
              <TextInput.TextIsland label="R" />
            </NumberInput>
            <NumberInput
              value={green}
              onChange={setGreen}
              onBlur={handleRGBFieldBlur}
              min={0}
              max={255}
              showControls={false}
              placeholder="0"
              title="G"
            >
              <TextInput.TextIsland label="G" />
            </NumberInput>
            <NumberInput
              value={blue}
              onChange={setBlue}
              onBlur={handleRGBFieldBlur}
              min={0}
              max={255}
              showControls={false}
              placeholder="0"
              title="B"
            >
              <TextInput.TextIsland label="B" />
            </NumberInput>
          </Flex>
        </Flex>
      ) : null}
      {props.clearable ? (
        <Flex justify="center" gap="s">
          <Button
            icon={<Delete />}
            label={t('common.clear')}
            onClick={handleClearClick}
          />
          <Button
            label={t('common.apply')}
            variant="submit"
            onClick={props.closePopup}
          />
        </Flex>
      ) : null}
    </Flex>
  );
};
