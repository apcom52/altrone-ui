export enum Theme {
  light = 'light',
  dark = 'dark'
}

export interface ThemeConfig {
  theme: Theme
  accent: string
  offset: number
}