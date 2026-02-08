import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { EntityList } from './EntityList.tsx';
import { Ellipsis, Eye, FileText, PawPrint, Trash } from 'lucide-react';
import { Button } from 'components/button/Button.tsx';
import { Dropdown } from 'components/dropdown/index.ts';
import { Label } from 'components/label/Label.tsx';
import { Checkbox } from 'components/checkbox/index.ts';
import { useState } from 'react';

const story: Meta<typeof EntityList> = {
  title: 'Components/Display/EntityList',
  component: EntityList,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const EmptyStory: StoryObj<typeof Flex> = {
  name: 'Using EntityList',
  render: () => {
    const [selectable, setSelectable] = useState(false);

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Using standard EntityList
        </Text>
        <Checkbox checked={selectable} onChange={setSelectable}>Selectable mode</Checkbox>
        <EntityList selectable={selectable}>
          <EntityList.Item
            title="Анна Петрова"
            icon={<FileText />}
            subtitle="Менеджер проектов · anna.p@company.ru"
            meta="Последняя активность: 2 ч назад"
          />
          <EntityList.Item
            title="Дмитрий Козлов"
            subtitle="Frontend-разработчик · d.kozlov@dev.io"
            meta="В проекте «Портал» · 3 задачи"
          >
            <Button icon={<Eye />} showLabel={false} label="Посмотреть" />
            <Dropdown content={
              <Dropdown.Menu>
                <Dropdown.Action label="Edit" />
                <Dropdown.Action label="Copy" />
                <Dropdown.Action danger label="Remove" icon={<Trash />} />
              </Dropdown.Menu>
            }>
              <Button icon={<Ellipsis />} showLabel={false} label="Actions" />
            </Dropdown>
          </EntityList.Item>
          <EntityList.Item
            title="Елена Соколова"
            subtitle="UX-дизайнер · elena.s@design.studio"
            meta="Черновик макетов: 5"
            onClick={() => alert('clicked')}
          />
          <EntityList.Item
            title="Заказ #2847"
            subtitle="ООО «Технопром» · 12 450 ₽"
            meta="Ожидает оплаты · до 10.02.2025"
          />
          <EntityList.Item
            title="Проект «Альфа»"
            subtitle="Веб-платформа для клиентов"
            meta="Прогресс: 67% · 4 участника"
          >
            <Label color="danger" variant="soft">Checking</Label>
          </EntityList.Item>
          <EntityList.Item
            title="Маргарита Волкова"
            subtitle="Бэкенд-разработчик · m.volkova@api.dev"
            meta="Спринт 12 · 8 коммитов"
            icon={<PawPrint />}
          />
          <EntityList.Item
            title="Тикет SUPPORT-891"
            subtitle="Проблема с авторизацией в мобильном приложении"
            meta="В работе · Приоритет: высокий"
          />
          <EntityList.Item
            title="Контракт № 2025/03"
            subtitle="ИП Иванов А.С. · Поставка оборудования"
            meta="Подписание до 15.02.2025"
            disabled
          />
          <EntityList.Item
            title="Склад «Центральный»"
            subtitle="г. Москва, ул. Складская, 15"
            meta="Остаток: 1 247 позиций · 3 приёмки сегодня"
            onClick={() => alert('clicked')}
            disabled
          />
          <EntityList.Item
            title="Репозиторий altrone-ui"
            subtitle="Компонентная библиотека · main"
            meta="+24 −8 за неделю · 12 открытых PR"
          />
          <EntityList.Item
            title="Ольга Новикова"
            subtitle="Аналитик данных · o.novikova@analytics.co"
            meta="Отчёт за январь готов"
          />
          <EntityList.Item
            title="Событие «День открытых дверей»"
            subtitle="Офис · 14 февраля, 10:00"
            meta="Зарегистрировано: 34 человека"
          />
        </EntityList>
      </Flex>
    );
  },
};

export default story;
