export enum Theme {
  LIGHT,
  DARK
}

export enum Language {
  ENGLISH = 'en',
  GERMAN = 'de',
  PORTUGUESE = 'pt-br',
  SPANISH = 'es',
  ITALIAN = 'it',
  RUSSIAN = 'ru'
}

export type ThemeAction = {
  data: Theme;
}

export type LanguageAction = {
  data: Language;
}

export type Settings = {
  theme: Theme,
  language: Language
}
