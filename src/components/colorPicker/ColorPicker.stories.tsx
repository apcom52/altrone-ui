import { Meta, StoryObj } from '@storybook/react';
import { Button, Divider, Flex, Text, Tooltip } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { ColorPicker } from './ColorPicker.tsx';
import { COLORS } from './COLORS.ts';
import { useState } from 'react';
import { ColorPreset } from './ColorPicker.types.ts';
import {
  Baseline,
  Bold,
  Italic,
  Paintbrush,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignStart,
  Underline,
} from 'lucide-react';

const story: Meta<typeof ColorPicker> = {
  title: 'Components/Controls/ColorPicker',
  component: ColorPicker,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

const BRAND_COLORS: ColorPreset[] = [
  { name: 'Primary', title: 'Primary', value: '#3B82F6' },
  { name: 'Primary Dark', title: 'Primary Dark', value: '#1D4ED8' },
  { name: 'Success', title: 'Success', value: '#22C55E' },
  { name: 'Warning', title: 'Warning', value: '#F59E0B' },
  { name: 'Danger', title: 'Danger', value: '#EF4444' },
  { name: 'Surface', title: 'Surface', value: '#F8FAFC' },
  { name: 'Muted', title: 'Muted', value: '#94A3B8' },
  { name: 'Dark', title: 'Dark', value: '#0F172A' },
];

const TEXT_COLORS: ColorPreset[] = [
  { name: 'Black', title: 'Чёрный', value: '#0F172A' },
  { name: 'Dark Gray', title: 'Тёмно-серый', value: '#334155' },
  { name: 'Gray', title: 'Серый', value: '#64748B' },
  { name: 'Red', title: 'Красный', value: '#DC2626' },
  { name: 'Orange', title: 'Оранжевый', value: '#EA580C' },
  { name: 'Amber', title: 'Янтарный', value: '#D97706' },
  { name: 'Green', title: 'Зелёный', value: '#16A34A' },
  { name: 'Blue', title: 'Синий', value: '#2563EB' },
  { name: 'Violet', title: 'Фиолетовый', value: '#7C3AED' },
  { name: 'Pink', title: 'Розовый', value: '#DB2777' },
];

const HIGHLIGHT_COLORS: ColorPreset[] = [
  { name: 'Yellow', title: 'Жёлтый', value: '#FEF08A' },
  { name: 'Green', title: 'Зелёный', value: '#BBF7D0' },
  { name: 'Blue', title: 'Голубой', value: '#BAE6FD' },
  { name: 'Pink', title: 'Розовый', value: '#FBCFE8' },
  { name: 'Orange', title: 'Оранжевый', value: '#FED7AA' },
  { name: 'Purple', title: 'Фиолетовый', value: '#E9D5FF' },
];

export const ColorPickerStory: StoryObj<typeof ColorPicker> = {
  name: 'Using ColorPicker',
  render: () => {
    const [basic, setBasic] = useState<string | undefined>('#3B82F6');
    const [paletteOnly, setPaletteOnly] = useState<string | undefined>(
      '#22C55E',
    );
    const [presetsOnly, setPresetsOnly] = useState<string | undefined>(
      COLORS[4].value,
    );
    const [clearable, setClearable] = useState<string | undefined>('#F59E0B');
    const [textColor, setTextColor] = useState<string | undefined>('#0F172A');
    const [highlight, setHighlight] = useState<string | undefined>('#FEF08A');
    const [background, setBackground] = useState<string | undefined>('#FFFFFF');
    const [swatch, setSwatch] = useState<string | undefined>('#3B82F6');
    const [token1, setToken1] = useState<string | undefined>('#3B82F6');
    const [token2, setToken2] = useState<string | undefined>('#1D4ED8');
    const [token3, setToken3] = useState<string | undefined>('#22C55E');
    const [token4, setToken4] = useState<string | undefined>('#EF4444');

    return (
      <Flex direction="vertical" gap="xl" style={{ padding: '20px' }}>
        {/* Basic modes */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Режимы выбора цвета
          </Text>
          <Text>
            Компонент поддерживает три режима: палитра + пресеты, только палитра
            и только пресеты. Если пресеты переданы, они показываются по
            умолчанию.
          </Text>
          <Flex direction="horizontal" gap="m" align="center">
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                Палитра + пресеты
              </Text>
              <ColorPicker
                colorPresets={COLORS}
                value={basic}
                onChange={setBasic}
                clearable
              />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                Только палитра
              </Text>
              <ColorPicker
                value={paletteOnly}
                onChange={setPaletteOnly}
                placeholder="Выбрать цвет"
              />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                Только пресеты
              </Text>
              <ColorPicker
                colorPresets={COLORS}
                value={presetsOnly}
                onChange={setPresetsOnly}
                allowPalette={false}
                placeholder="Из набора"
              />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                С кнопкой очистки
              </Text>
              <ColorPicker
                colorPresets={COLORS}
                value={clearable}
                onChange={setClearable}
                clearable
                placeholder="С очисткой"
              />
            </Flex>
          </Flex>
        </Flex>

        <Divider />

        {/* Sizes */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Размеры
          </Text>
          <Text>
            Три размера — <code>s</code>, <code>m</code> (по умолчанию) и{' '}
            <code>l</code> — позволяют вписать пикер в любой интерфейс.
          </Text>
          <Flex direction="horizontal" gap="m" align="center">
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                size="s"
              </Text>
              <ColorPicker
                value={basic}
                onChange={setBasic}
                size="s"
                colorPresets={COLORS}
              />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                size="m"
              </Text>
              <ColorPicker
                value={basic}
                onChange={setBasic}
                size="m"
                colorPresets={COLORS}
              />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                size="l"
              </Text>
              <ColorPicker
                value={basic}
                onChange={setBasic}
                size="l"
                colorPresets={COLORS}
              />
            </Flex>
          </Flex>
        </Flex>

        <Divider />

        {/* States */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Состояния
          </Text>
          <Flex direction="horizontal" gap="m" align="center">
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                Обычный
              </Text>
              <ColorPicker value="#3B82F6" onChange={() => null} />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                readOnly
              </Text>
              <ColorPicker value="#3B82F6" onChange={() => null} readOnly />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                disabled
              </Text>
              <ColorPicker value="#3B82F6" onChange={() => null} disabled />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                Без значения
              </Text>
              <ColorPicker onChange={() => null} placeholder="Не выбран" />
            </Flex>
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                transparent
              </Text>
              <ColorPicker value="#3B82F6" onChange={() => null} transparent />
            </Flex>
          </Flex>
        </Flex>

        <Divider />

        {/* asChild */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Свой триггер (asChild)
          </Text>
          <Text>
            Проп <code>asChild</code> позволяет использовать любой элемент как
            триггер пикера. Все пропы взаимодействия (открытие, закрытие,
            позиционирование) автоматически мержатся на дочерний элемент.
          </Text>
          <Flex direction="horizontal" gap="l" align="center">
            {/* Color swatch */}
            <Flex direction="vertical" gap="xs" align="center">
              <Text size={3} color="secondary">
                Цветовой кружок
              </Text>
              <ColorPicker
                value={swatch}
                onChange={setSwatch}
                asChild
                colorPresets={COLORS}
                clearable
              >
                <div
                  title="Нажмите, чтобы изменить цвет"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: swatch || 'var(--interactive-2)',
                    border: '2px solid var(--border-2)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                />
              </ColorPicker>
            </Flex>

            {/* Button with color label */}
            <Flex direction="vertical" gap="xs" align="center">
              <Text size={3} color="secondary">
                Кнопка с цветом
              </Text>
              <ColorPicker
                value={swatch}
                onChange={setSwatch}
                asChild
                colorPresets={COLORS}
              >
                <Button
                  label={swatch ?? 'Выбрать'}
                  icon={
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 3,
                        backgroundColor: swatch || 'var(--border-2)',
                        border: '1px solid var(--border-a2)',
                        flexShrink: 0,
                      }}
                    />
                  }
                />
              </ColorPicker>
            </Flex>

            {/* Inline swatch in text */}
            <Flex direction="vertical" gap="xs">
              <Text size={3} color="secondary">
                В строке текста
              </Text>
              <Flex direction="horizontal" gap="xs" align="center">
                <Text>Цвет акцента:</Text>
                <ColorPicker value={swatch} onChange={setSwatch} asChild>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      backgroundColor: swatch || 'var(--interactive-2)',
                      border: '1px solid var(--border-2)',
                      cursor: 'pointer',
                      verticalAlign: 'middle',
                    }}
                  />
                </ColorPicker>
                <Text>{swatch ?? '—'}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Divider />

        {/* Document editor scenario */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Редактор документа
          </Text>
          <Text>
            Реальный сценарий: панель форматирования текста с выбором цвета
            символов, цвета выделения и фона страницы.
          </Text>

          {/* Toolbar */}
          <Flex
            direction="horizontal"
            gap="xs"
            align="center"
            style={{
              background: 'var(--glass-background-color)',
              backdropFilter: 'var(--glass-effects)',
              border: '1px solid var(--border-1)',
              borderRadius: 10,
              padding: '6px 10px',
              width: 'fit-content',
            }}
          >
            <Tooltip content="Жирный" kbd="⌘+B" placement="bottom">
              <Button
                icon={<Bold />}
                label="Жирный"
                showLabel={false}
                variant="text"
              />
            </Tooltip>
            <Tooltip content="Курсив" kbd="⌘+I" placement="bottom">
              <Button
                icon={<Italic />}
                label="Курсив"
                showLabel={false}
                variant="text"
              />
            </Tooltip>
            <Tooltip content="Подчёркнутый" kbd="⌘+U" placement="bottom">
              <Button
                icon={<Underline />}
                label="Подч."
                showLabel={false}
                variant="text"
              />
            </Tooltip>

            <Divider
              direction="vertical"
              style={{ height: 20, margin: '0 2px' }}
            />

            {/* Text color — Tooltip cannot wrap ColorPicker (asChild): floating-ui ref conflict */}
            <ColorPicker
              value={textColor}
              onChange={setTextColor}
              colorPresets={TEXT_COLORS}
              asChild
            >
              <Button
                title="Цвет текста"
                label="Цвет текста"
                showLabel={false}
                variant="text"
                icon={
                  <Flex
                    direction="vertical"
                    gap="xs"
                    align="center"
                    style={{ gap: 2 }}
                  >
                    <Baseline />
                    <div
                      style={{
                        width: 14,
                        height: 3,
                        borderRadius: 2,
                        backgroundColor: textColor || 'var(--text-2)',
                      }}
                    />
                  </Flex>
                }
              />
            </ColorPicker>

            {/* Highlight color */}
            <ColorPicker
              value={highlight}
              onChange={setHighlight}
              colorPresets={HIGHLIGHT_COLORS}
              allowPalette={false}
              asChild
            >
              <Button
                title="Цвет выделения"
                label="Выделение"
                showLabel={false}
                variant="text"
                icon={
                  <Flex direction="vertical" align="center" style={{ gap: 2 }}>
                    <Paintbrush />
                    <div
                      style={{
                        width: 14,
                        height: 3,
                        borderRadius: 2,
                        backgroundColor: highlight || 'transparent',
                        border: highlight
                          ? 'none'
                          : '1px dashed var(--border-2)',
                      }}
                    />
                  </Flex>
                }
              />
            </ColorPicker>

            <Divider
              direction="vertical"
              style={{ height: 20, margin: '0 2px' }}
            />

            <Tooltip content="По левому краю" kbd="⌘+⇧+L" placement="bottom">
              <Button
                icon={<TextAlignStart />}
                label="Лево"
                showLabel={false}
                variant="text"
              />
            </Tooltip>
            <Tooltip content="По центру" kbd="⌘+⇧+E" placement="bottom">
              <Button
                icon={<TextAlignCenter />}
                label="Центр"
                showLabel={false}
                variant="text"
              />
            </Tooltip>
            <Tooltip content="По правому краю" kbd="⌘+⇧+R" placement="bottom">
              <Button
                icon={<TextAlignEnd />}
                label="Право"
                showLabel={false}
                variant="text"
              />
            </Tooltip>
          </Flex>

          {/* Document preview */}
          <div
            style={{
              padding: '32px 40px',
              borderRadius: 12,
              border: '1px solid var(--border-1)',
              backgroundColor: background,
              maxWidth: 560,
              minHeight: 160,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 12,
              }}
            >
              <ColorPicker
                value={background}
                onChange={setBackground}
                colorPresets={[
                  { name: 'White', title: 'Белый', value: '#FFFFFF' },
                  { name: 'Cream', title: 'Кремовый', value: '#FFFBEB' },
                  { name: 'Light Blue', title: 'Голубой', value: '#EFF6FF' },
                  { name: 'Light Green', title: 'Мятный', value: '#F0FDF4' },
                  { name: 'Dark', title: 'Тёмный', value: '#1E293B' },
                ]}
                asChild
              >
                <div
                  title="Цвет фона страницы"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: background,
                    border: '1.5px solid var(--border-2)',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px var(--border-a2)',
                  }}
                />
              </ColorPicker>
            </div>
            <p
              style={{
                margin: 0,
                color: textColor,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              Это пример текста документа.{' '}
              <span
                style={{
                  backgroundColor: highlight,
                  borderRadius: 3,
                  padding: '1px 2px',
                }}
              >
                Выделенный фрагмент
              </span>{' '}
              отображает выбранный цвет подсветки, а весь текст использует
              выбранный цвет символов.
            </p>
          </div>
        </Flex>

        <Divider />

        {/* Design tokens editor */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Редактор дизайн-токенов
          </Text>
          <Text>
            Пример интерфейса для управления цветами бренда. Пресеты ускоряют
            работу, полная палитра даёт точный контроль.
          </Text>
          <Flex direction="vertical" gap="s" style={{ maxWidth: 400 }}>
            {[
              { label: '--color-primary', value: token1, setter: setToken1 },
              {
                label: '--color-primary-dark',
                value: token2,
                setter: setToken2,
              },
              { label: '--color-success', value: token3, setter: setToken3 },
              { label: '--color-danger', value: token4, setter: setToken4 },
            ].map(({ label, value: tokenValue, setter }) => (
              <Flex
                key={label}
                direction="horizontal"
                gap="m"
                align="center"
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-1)',
                  background: 'var(--background-2)',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    backgroundColor: tokenValue,
                    border: '1px solid var(--border-a2)',
                    flexShrink: 0,
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-family-code)',
                    fontSize: 12,
                  }}
                >
                  {label}
                </Text>
                <ColorPicker
                  value={tokenValue}
                  onChange={setter}
                  colorPresets={BRAND_COLORS}
                  size="s"
                  clearable
                />
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export default story;
