import { WeatherData } from './types/Weather';
import { Language, Settings, Theme } from './types/Settings';
import { ListItem } from './types/LanguageSelection';

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
