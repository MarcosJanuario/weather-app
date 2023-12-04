import { WeatherData } from './types/Weather';
import { Language, Settings, Theme } from './types/Settings';

export const INITIAL_SETTINGS_DATA: Settings = {
  theme: Theme.LIGHT,
  language: Language.ENGLISH
}
export const INITIAL_WEATHER_DATA: WeatherData = {
  data: null,
  error: null
};
