import { WeatherData } from '../types/Weather';
import { Language, Settings, Theme } from '../types/Settings';
import { ListItem } from '../types/LanguageSelection';
import { UiController } from '../types/UiController';

export const INITIAL_SETTINGS_DATA: Settings = {
  theme: Theme.LIGHT,
  language: Language.ENGLISH
}
export const INITIAL_WEATHER_DATA: WeatherData = {
  data: null,
  error: null
};

export const LANGUAGE_LIST: ListItem[] = [
  { value: 'en', label: 'english' },
  { value: 'de', label: 'german' },
  { value: 'es', label: 'spanish' },
  { value: 'pt-br', label: 'portuguese' },
  { value: 'it', label: 'italian' },
  { value: 'ru', label: 'russian' }
];

export const VALUE_FORMAT_DIRECTIVE_MAP: [string, string][] = [
  ['feelsLike', 'celsius degree'],
  ['temperature', 'celsius degree'],
  ['humidity', '%'],
  ['pressure', 'hPa'],
  ['visibility', 'km'],
  ['windSpeed', 'km/h'],
];

export const UNIT_TEST_INITIAL_SETTINGS = {
  theme: Theme.LIGHT,
  language: Language.ENGLISH,
};

export const UNIT_TEST_INITIAL_UI: UiController = {
  sideMenu: {
    show: 'hidden',
  },
  loadingSpinner: {
    show: false,
  },
}
