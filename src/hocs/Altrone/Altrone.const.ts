import { AltroneOptions } from './Altrone.types';

export const DEFAULT_ALTRONE_OPTIONS: AltroneOptions = {
  global: {
    reduceMotion: false,
    transitionDuration: 200
  },
  numberInput: {
    useFormatFromLocale: true
  },
  carousel: {
    reduceMotion: false
  },
  modal: {
    reduceMotion: false
  },
  floatingBox: {
    windowOffset: 4,
    offset: 4
  },
  photoViewer: {
    openDescriptionByDefault: true
  },
  spoiler: {
    reduceMotion: false
  }
};
