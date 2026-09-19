import { Localization } from './types.ts';

export const tr: Localization = {
  common: {
    clear: 'Temizle',
    apply: 'Uygula',
    close: 'Kapat',
    cancel: 'İptal',
    delete: 'Sil',
    refresh: 'Yenile',
    edit: 'Düzenle',
    done: 'Tamam',
  },
  breadcrumbs: {
    label: 'Gezinme yolu',
  },
  loading: {
    label: 'Yükleniyor',
  },
  datePicker: {
    placeholder: 'Tarih seçin',
    placeholderRange: 'Aralık seçin',
    today: 'Bugün',
    thisMonth: 'Bu ay',
    thisYear: 'Bu yıl',
    next: 'İleri',
    prev: 'Geri',
    clickToChangeView: 'Görünümü değiştirmek için tıklayın',
    startDate: 'Başlangıç tarihi',
    endDate: 'Bitiş tarihi',
  },
  filePicker: {
    noFiles: 'Dosya seçilmedi',
    placeholder: 'Dosya seç',
    errorMessage: 'Dosya yüklenemedi. Lütfen tekrar deneyin',
    untitledFile: 'Adsız dosya',
    retryUpload: 'Yüklemeyi tekrar dene',
  },
  textInput: {
    loading: 'Yükleniyor',
  },
  passwordInput: {
    showPassword: 'Şifreyi göster',
    hidePassword: 'Şifreyi gizle',
  },
  search: {
    placeholder: 'Ara',
  },
  select: {
    notFound: 'Sonuç bulunamadı',
  },
  toolbar: {
    collapseSidebar: 'Kenar çubuğunu daralt',
    expandSidebar: 'Kenar çubuğunu genişlet',
    moreActions: 'Diğer işlemler',
  },
  screen: {
    sidebarLabel: 'Kenar çubuğu',
    bottomNavigationLabel: 'Alt gezinme',
    asideLabel: 'Ayrıntılar',
  },
  pagination: {
    navigation: 'Sayfalama',
    previous: 'Önceki sayfa',
    next: 'Sonraki sayfa',
    firstPage: 'İlk sayfa',
    lastPage: 'Son sayfa',
    page: 'Sayfa {{page}}',
  },
  dataTable: {
    filters: 'Filtreler',
    filtering: 'Filtreleme',
    addFilter: 'Filtre ekle',
    selectableMode: 'Satırları seç',
    disableSelectableMode: 'Seçim modunu kapat',
    selectRow: 'Bu satırı seç',
    deselectRow: 'Bu satırın seçimini kaldır',
    where: 'Koşul',
    and: 'VE',
    noFilters:
      'Şu anda uygulanan bir filtre yok. Yeni bir filtre oluşturmak için "Filtre ekle"ye tıklayın.',
    empty: 'Veri yok',
    chooseRule: 'Kural seç',
    /**
     * Turkish nouns don't inflect for grammatical number after a numeral
     * (`1 satır`/`5 satır`), so every plural category renders the same text —
     * same pattern as `zh`.
     */
    shownRows: {
      zero: '{{count}} satır gösteriliyor',
      one: '{{count}} satır gösteriliyor',
      two: '{{count}} satır gösteriliyor',
      few: '{{count}} satır gösteriliyor',
      many: '{{count}} satır gösteriliyor',
      other: '{{count}} satır gösteriliyor',
    },
    selectedRows: {
      zero: '{{count}} satır seçildi',
      one: '{{count}} satır seçildi',
      two: '{{count}} satır seçildi',
      few: '{{count}} satır seçildi',
      many: '{{count}} satır seçildi',
      other: '{{count}} satır seçildi',
    },
    totalRows: 'Toplam satır',
    rowsPerPage: 'Sayfa başına satır',
    actions: 'İşlemler',
    moreActions: 'Diğer işlemler',
    stringFilter: {
      empty: 'boş',
      notEmpty: 'boş değil',
      contain: 'içerir',
      notContain: 'içermez',
      equal: 'eşittir',
      notEqual: 'eşit değildir',
    },
    numberFilter: {
      empty: 'boş',
      notEmpty: 'boş değil',
      equal: 'eşittir',
      notEqual: 'eşit değildir',
      gt: '>',
      gte: '≥',
      lt: '<',
      lte: '≤',
      between: 'arasında',
      notBetween: 'arasında değil',
    },
    arrayFilter: {
      has: 'içinde bulunur',
      notHas: 'içinde bulunmaz',
    },
    booleanFilter: {
      positive: 'doğru',
      negative: 'yanlış',
    },
    dateFilter: {
      empty: 'boş',
      notEmpty: 'boş değil',
      equal: 'eşittir',
      notEqual: 'eşit değildir',
      gt: '>',
      gte: '≥',
      lt: '<',
      lte: '≤',
      between: 'arasında',
      beyond: 'dışında',
    },
    selectFilter: {
      has: 'şunlardan biri',
      notHas: 'şunlardan hiçbiri değil',
    },
    colorFilter: {
      has: 'şunlardan biri',
      notHas: 'şunlardan hiçbiri değil',
    },
    passwordFilter: {
      empty: 'boş',
      notEmpty: 'boş değil',
    },
  },
  photoViewer: {
    previous: 'Önceki fotoğraf',
    next: 'Sonraki fotoğraf',
    progressLabel: '{{total}} fotoğraftan {{current}}.',
    progress: '{{current}} / {{total}}',
    description: 'Açıklama',
    noDescription: 'Açıklama yok',
  },
  collapsedList: {
    expand: '{{count}} gizli öğeyi göster',
    collapse: 'Daha az göster',
  },
  closeButton: {
    ariaLabel: 'Kapat',
  },
  notifications: {
    regionLabel: 'Bildirimler',
  },
  dialog: {
    alertTitle: 'Uyarı',
    confirmTitle: 'Onayla',
    promptTitle: 'Giriş',
    ok: 'Tamam',
    confirm: 'Onayla',
    cancel: 'İptal',
    promptPlaceholder: 'Bir değer girin',
  },
  colorPicker: {
    placeholder: 'Bir renk seç',
    title: 'Renk seç',
    savedColors: 'Kayıtlı renkler',
    palette: 'Palet',
  },
  result: {
    empty: 'Veri yok',
  },
  autocompleteInput: {
    loadError: 'Veriler yüklenirken bir hata oluştu',
  },
  calendar: {
    previousMonth: 'Önceki ay',
    nextMonth: 'Sonraki ay',
  },
  splitter: {
    collapsePanel: 'Paneli daralt',
    expandPanel: 'Paneli genişlet',
    panel: 'Panel {{index}}',
  },
  image: {
    loading: 'Görsel yükleniyor',
    brokenImage: 'Görsel yüklenemedi',
  },
};
