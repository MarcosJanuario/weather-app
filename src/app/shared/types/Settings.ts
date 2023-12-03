export enum Theme {
  WHITE,
  BLACK
}

export type ThemeAction = {
  data: Theme;
}

export type Settings = {
  theme: Theme
}
