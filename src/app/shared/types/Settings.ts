export enum Theme {
  LIGHT,
  DARK
}

export type ThemeAction = {
  data: Theme;
}

export type Settings = {
  theme: Theme
}
