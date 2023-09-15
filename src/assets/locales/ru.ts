import { Localization } from '../../types/Localization';

const localization: Localization = {
  common: {
    apply: 'Применить',
    cancel: 'Отмена',
    search: 'Поиск',
    back: 'Назад',
    asc: 'По возрастанию',
    desc: 'По убыванию',
    more: 'Развернуть',
    less: 'Свернуть',
    clear: 'Очистить'
  },
  containers: {
    modal: {
      closeModal: 'Закрыть окно'
    }
  },
  data: {
    dataTable: {
      showing: 'Показывается',
      lines: {
        zero: '{{count}} строк',
        one: '{{count}} строка',
        two: '{{count}} строки',
        few: '{{count}} строки',
        many: '{{count}} строк',
        other: '{{count}} строки'
      },
      total: 'Всего: {{count}}',
      sortedBy: 'Отсортировано по',
      sort: 'Сортировка',
      sorting: 'Сортировка',
      field: 'Колонка',
      direction: 'Направление',
      filters: 'Фильтры',
      filtering: 'Фильтры',
      resetFilters: 'Сбросить фильтры',
      resetSorting: 'Сбросить сортировку'
    }
  },
  form: {
    datePicker: {
      chooseMonth: 'Выберите месяц',
      chooseYear: 'Выберите год',
      today: 'Сегодня',
      currentMonth: 'Текущий месяц',
      placeholder: 'Выберите дату'
    },
    select: {
      placeholder: 'Выберите значение',
      others: 'Прочее',
      search: 'Поиск...'
    }
  },
  list: {
    breadcrumbs: {
      home: 'Домой'
    }
  },
  indicators: {
    pagination: {
      moveToPage: 'Перейти к странице',
      apply: 'Перейти'
    }
  }
};

export default localization;
