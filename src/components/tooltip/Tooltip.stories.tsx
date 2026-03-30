import { Meta, StoryObj } from '@storybook/react';
import { Avatar, Button, Divider, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Tooltip } from './Tooltip.tsx';

const story: Meta<typeof Tooltip> = {
  title: 'Components/Containers/Tooltip',
  component: Tooltip,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const TooltipStory: StoryObj<typeof Tooltip> = {
  name: 'Using Tooltips',
  render: () => {
    return (
      <Flex direction="vertical" gap="xl" style={{ padding: '80px 60px' }}>
        {/* Basic */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Базовые тултипы
          </Text>
          <Text>
            Без дочернего элемента рендерится иконка-вопрос. Тултип появляется
            через 500 мс после наведения.
          </Text>
          <Flex direction="horizontal" gap="l" align="center">
            <Tooltip content="Файл не найден на сервере" />
            <Tooltip content="Нажмите, чтобы открыть настройки">
              <Button icon={<Icon i="settings" />} label="Настройки" />
            </Tooltip>
            <Tooltip content="Запустить тесты" kbd="⌘+T">
              <Button
                icon={<Icon i="play_arrow" />}
                label="Тесты"
                showLabel={false}
              />
            </Tooltip>
            <Tooltip content="Сохранить изменения" kbd="⌘+S">
              <Button
                icon={<Icon i="save" />}
                label="Сохранить"
                showLabel={false}
                variant="submit"
              />
            </Tooltip>
            <Tooltip content="Удалить безвозвратно" kbd="⌫">
              <Button
                icon={<Icon i="delete" />}
                label="Удалить"
                showLabel={false}
                danger
              />
            </Tooltip>
          </Flex>
        </Flex>

        <Divider />

        {/* title prop */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            С заголовком
          </Text>
          <Text>
            Проп <code>title</code> добавляет строку-заголовок над контентом —
            удобно для более информативных подсказок.
          </Text>
          <Flex direction="horizontal" gap="l" align="center">
            <Tooltip
              title="Горячая клавиша"
              content="Открыть командную строку редактора"
              kbd="⌘+P"
            >
              <Button icon={<Icon i="terminal" />} label="Команды" />
            </Tooltip>
            <Tooltip
              title="Форматирование"
              content="Применить автоформатирование ко всему файлу"
              kbd="⇧+⌥+F"
            >
              <Button icon={<Icon i="auto_fix_high" />} label="Форматировать" />
            </Tooltip>
            <Tooltip
              title="Git blame"
              content="Показать историю изменений для выбранных строк"
              kbd="⌘+⇧+G"
            >
              <Button
                icon={<Icon i="history" />}
                label="История"
                showLabel={false}
              />
            </Tooltip>
            <Tooltip
              title="Недоступно"
              content="Сначала выберите хотя бы одну строку в таблице"
            >
              <Button icon={<Icon i="download" />} label="Экспорт" disabled />
            </Tooltip>
          </Flex>
        </Flex>

        <Divider />

        {/* maxWidth */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Ширина тултипа
          </Text>
          <Text>
            По умолчанию <code>maxWidth</code> = 300px. Можно расширить для
            длинных описаний или сузить для коротких меток.
          </Text>
          <Flex direction="horizontal" gap="l" align="center">
            <Tooltip content="Кратко" maxWidth={120}>
              <Button label="Узкий" />
            </Tooltip>
            <Tooltip
              title="Описание настройки"
              content="Включает экспериментальный рендерер на основе WebGPU. Может быть нестабильным на некоторых видеокартах и версиях драйверов."
              maxWidth={420}
            >
              <Button label="Широкий" />
            </Tooltip>
            <Tooltip
              title="Автор последнего коммита"
              content="Alex Petrov · feat/dropdown-refactor · 2 часа назад"
              maxWidth={360}
            >
              <Avatar
                firstName="Alex"
                lastName="Petrov"
                color="#6366f1"
                size="s"
              />
            </Tooltip>
          </Flex>
        </Flex>

        <Divider />

        {/* Placements */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Расположение
          </Text>
          <Text>
            Тултип адаптируется к краям экрана; можно задать предпочтительную
            сторону.
          </Text>
          <Flex direction="horizontal" gap="l" align="center">
            {(
              [
                ['top', 'Сверху'],
                ['bottom', 'Снизу'],
                ['left', 'Слева'],
                ['right', 'Справа'],
                ['top-start', 'Сверху-лево'],
                ['top-end', 'Сверху-право'],
              ] as const
            ).map(([placement, label]) => (
              <Tooltip
                key={placement}
                content={`placement="${placement}"`}
                placement={placement}
              >
                <Button label={label} />
              </Tooltip>
            ))}
          </Flex>
        </Flex>

        <Divider />

        {/* Toolbar example */}
        <Flex direction="vertical" gap="m">
          <Text size={5} weight="bold">
            Тулбар редактора
          </Text>
          <Text>
            Реальный сценарий: тултипы с горячими клавишами на каждой кнопке
            панели форматирования.
          </Text>
          <Flex
            direction="horizontal"
            gap="xs"
            align="center"
            style={{
              background: 'var(--glass-background-color)',
              border: '1px solid var(--border-1)',
              borderRadius: 12,
              padding: '6px 10px',
              width: 'fit-content',
            }}
          >
            {[
              { icon: 'format_bold', label: 'Жирный', kbd: '⌘+B' },
              { icon: 'format_italic', label: 'Курсив', kbd: '⌘+I' },
              { icon: 'format_underlined', label: 'Подчёркнутый', kbd: '⌘+U' },
              { icon: 'strikethrough_s', label: 'Зачёркнутый', kbd: '⌘+⇧+S' },
            ].map(({ icon, label, kbd }) => (
              <Tooltip key={icon} content={label} kbd={kbd} placement="bottom">
                <Button
                  icon={<Icon i={icon} />}
                  label={label}
                  showLabel={false}
                  variant="text"
                />
              </Tooltip>
            ))}
            <Divider
              direction="vertical"
              style={{ height: 20, margin: '0 4px' }}
            />
            {[
              {
                icon: 'format_align_left',
                label: 'По левому краю',
                kbd: '⌘+⇧+L',
              },
              { icon: 'format_align_center', label: 'По центру', kbd: '⌘+⇧+E' },
              {
                icon: 'format_align_right',
                label: 'По правому краю',
                kbd: '⌘+⇧+R',
              },
            ].map(({ icon, label, kbd }) => (
              <Tooltip key={icon} content={label} kbd={kbd} placement="bottom">
                <Button
                  icon={<Icon i={icon} />}
                  label={label}
                  showLabel={false}
                  variant="text"
                />
              </Tooltip>
            ))}
            <Divider
              direction="vertical"
              style={{ height: 20, margin: '0 4px' }}
            />
            {[
              { icon: 'link', label: 'Вставить ссылку', kbd: '⌘+K' },
              { icon: 'image', label: 'Вставить изображение' },
              { icon: 'table_chart', label: 'Вставить таблицу' },
            ].map(({ icon, label, kbd }) => (
              <Tooltip key={icon} content={label} kbd={kbd} placement="bottom">
                <Button
                  icon={<Icon i={icon} />}
                  label={label}
                  showLabel={false}
                  variant="text"
                />
              </Tooltip>
            ))}
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export default story;
