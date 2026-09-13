import { Button } from 'components/button/Button.tsx';
import { Flex } from 'components/flex/Flex.tsx';
import { NumberInput } from 'components/numberInput/NumberInput.tsx';
import { Tabs } from 'components/tabs/Tabs.tsx';
import { TextInput } from 'components/textInput/TextInput.tsx';
import { useLocalization } from 'components/application';
import { FocusEventHandler, useCallback, useEffect, useState } from 'react';
import { ColorPickerProps } from '../ColorPicker.types';
import { ColorPreset } from './ColorPreset';
import s from './colorPickerContent.module.scss';
import { HexAlphaColorPicker } from 'react-colorful';
import { Delete, Grid3X3, Palette } from 'lucide-react';

const HEX6 = /^[0-9A-Fa-f]{6}$/;

type Channel = 'r' | 'g' | 'b';

/** Splits `#rrggbb(aa)` into decimal channels + the raw alpha byte; degrades to black on malformed input. */
const parseChannels = (color: string | undefined) => {
  const hex = (color ?? '').replace('#', '');
  if (hex.length < 6) {
    return { r: 0, g: 0, b: 0, alpha: '' };
  }
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    alpha: hex.slice(6, 8),
  };
};

const toHexByte = (value: number) =>
  Math.max(0, Math.min(255, Math.round(value || 0)))
    .toString(16)
    .padStart(2, '0');

interface ColorPickerContentProps extends Pick<
  ColorPickerProps,
  'colorPresets' | 'value' | 'onChange' | 'allowPalette' | 'clearable' | 'size'
> {
  closePopup: () => void;
}

export const ColorPickerContent = (props: ColorPickerContentProps) => {
  const {
    colorPresets,
    value = '#000000',
    onChange,
    allowPalette = true,
    clearable,
    size,
    closePopup,
  } = props;

  const t = useLocalization();

  const presetsEnabled = Boolean(colorPresets?.length);
  const paletteEnabled = presetsEnabled ? allowPalette : true;
  const showTabs = presetsEnabled && paletteEnabled;

  const [mode, setMode] = useState<'presets' | 'palette'>(
    presetsEnabled ? 'presets' : 'palette',
  );

  const [hexDraft, setHexDraft] = useState('');
  const [rgb, setRgb] = useState(() => parseChannels(value));

  /** Re-sync the editable fields whenever the color changes from the outside (palette drag, preset click). */
  useEffect(() => {
    setRgb(parseChannels(value));
    setHexDraft(value ? value.replace('#', '').slice(0, 6) : '');
  }, [value]);

  const commitHex = useCallback<FocusEventHandler>(
    (event) => {
      const next = (event.target as HTMLInputElement).value;
      if (HEX6.test(next)) {
        onChange(`#${next}`, event);
      } else {
        setHexDraft('');
        onChange(undefined, event);
      }
    },
    [onChange],
  );

  const commitRgb = useCallback(() => {
    const { alpha } = parseChannels(value);
    onChange(
      `#${toHexByte(rgb.r)}${toHexByte(rgb.g)}${toHexByte(rgb.b)}${alpha}`,
    );
  }, [rgb, onChange, value]);

  const handleClear = () => {
    onChange(undefined);
    closePopup();
  };

  return (
    <Flex direction="vertical" gap="m" className={s.ColorPicker}>
      {showTabs ? (
        <Tabs>
          <Tabs.Item
            icon={<Grid3X3 />}
            label={t('colorPicker.savedColors')}
            onClick={() => setMode('presets')}
            selected={mode === 'presets'}
          />
          <Tabs.Item
            icon={<Palette />}
            label={t('colorPicker.palette')}
            onClick={() => setMode('palette')}
            selected={mode === 'palette'}
          />
        </Tabs>
      ) : null}

      {mode === 'presets' ? (
        <Flex direction="horizontal" gap="m" wrap>
          {colorPresets?.map((preset, index) => (
            <ColorPreset
              key={`${index}-${preset.name}`}
              onChange={onChange}
              selected={preset.value.toLowerCase() === value?.toLowerCase()}
              {...preset}
            />
          ))}
        </Flex>
      ) : null}

      {mode === 'palette' ? (
        <>
          <HexAlphaColorPicker
            color={value}
            onChange={(color) => onChange(color)}
            className={s.Palette}
          />
          <Flex direction="vertical" gap="s">
            <TextInput
              maxLength={6}
              size={size}
              wrapperClassName={s.HexField}
              placeholder="000000"
              value={hexDraft}
              onChange={setHexDraft}
              onBlur={commitHex}
            >
              <TextInput.TextIsland label="#" />
            </TextInput>
            <Flex direction="horizontal" gap="s" className={s.ChannelRow}>
              {(['r', 'g', 'b'] as Channel[]).map((channel) => (
                <div key={channel} className={s.ChannelCell}>
                  <NumberInput
                    size={size}
                    value={rgb[channel]}
                    onChange={(next) =>
                      setRgb((prev) => ({ ...prev, [channel]: next ?? 0 }))
                    }
                    onBlur={commitRgb}
                    min={0}
                    max={255}
                    placeholder="0"
                    title={channel.toUpperCase()}
                  >
                    <TextInput.TextIsland label={channel.toUpperCase()} />
                  </NumberInput>
                </div>
              ))}
            </Flex>
          </Flex>
        </>
      ) : null}

      {clearable ? (
        <Flex justify="center" gap="s">
          <Button
            icon={<Delete />}
            label={t('common.clear')}
            onClick={handleClear}
          />
          <Button
            label={t('common.apply')}
            variant="submit"
            onClick={closePopup}
          />
        </Flex>
      ) : null}
    </Flex>
  );
};
