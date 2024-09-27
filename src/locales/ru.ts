import { Localization } from './types.ts';

export const ru: Localization = {
  common: {
    clear: 'Очистить',
    apply: 'Применить',
    close: 'Закрыть',
    cancel: 'Отмена',
    delete: 'Удалить',
    refresh: 'Обновить',
  },
  datePicker: {
    placeholder: 'Выбрать дату',
    placeholderRange: 'Выбрать период',
    today: 'Сегодня',
    thisMonth: 'Текущий месяц',
    thisYear: 'Текущий год',
  },
  filePicker: {
    noFiles: 'Файлы не выбраны',
    placeholder: 'Выбрать файл',
    errorMessage: 'Возникла ошибка при загрузке файла. Попробуйте еще раз',
  },
  numberInput: {
    increase: 'Увеличить',
    decrease: 'Уменьшить',
  },
  passwordInput: {
    showPassword: 'Показать пароль',
    hidePassword: 'Скрыть пароль',
  },
  search: {
    placeholder: 'Поиск',
  },
  pagination: {
    progress: '{{current}} из {{total}}',
    title: 'Перейти на страницу',
    action: 'Перейти',
  },
  dataTable: {
    filters: 'Фильтры',
    filtering: 'Фильтры',
    addFilter: 'Добавить фильтр',
    selectableMode: 'Выделить строки',
    disableSelectableMode: 'Выйти из режима выделения строк',
    where: 'Условие',
    and: 'ТАКЖЕ',
    noFilters:
      'Нет выбранных фильтров. Чтобы создать, нажмите на "Добавить фильтр"',
    shownRows: {
      zero: 'Показывается {{count}} строк',
      one: 'Показывается {{count}} строка',
      two: 'Показывается {{count}} строки',
      few: 'Показывается {{count}} строки',
      many: 'Показывается {{count}} строк',
      other: 'Показывается {{count}} строки',
    },
    selectedRows: {
      zero: 'Выделено {{count}} строк',
      one: 'Выделена {{count}} строка',
      two: 'Выделено {{count}} строки',
      few: 'Выделено {{count}} строки',
      many: 'Выделено {{count}} строк',
      other: 'Выделены {{count}} строки',
    },
    totalRows: 'Всего строк',
    rowsPerPage: 'Строк на странице',
    stringFilter: {
      empty: 'пустой',
      notEmpty: 'не пустой',
      contain: 'содержит',
      notContain: 'не содержит',
      equal: 'равен',
      notEqual: 'не равен',
    },
    numberFilter: {
      equal: 'равен',
      notEqual: 'не равен',
      gt: '>',
      gte: '≥',
      lt: '<',
      lte: '≤',
      between: 'между',
      notBetween: 'за пределами',
    },
    arrayFilter: {
      has: 'содержится в',
      notHas: 'не содержится в',
    },
    booleanFilter: {
      positive: 'положительный',
      negative: 'негативный',
    },
  },
  photoViewer: {
    previous: 'Предыдущее изображение',
    next: 'Следующее изображение',
    progressLabel: 'Изображение {{current}} из {{total}}',
    progress: '{{current}} из {{total}}',
    description: 'Описание',
    noDescription: 'Нет описания',
  },
  collapsedList: {
    expand: 'Показать еще {{count}}',
    collapse: 'Свернуть',
  },
};
