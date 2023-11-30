import { WeatherData } from './types/Weather';
import { Settings, Theme } from './types/Settings';

export const INITIAL_SETTINGS_DATA: Settings = {
  theme: Theme.WHITE
}
export const INITIAL_WEATHER_DATA: WeatherData = {
  observationTime: '',
  temperature: 0,
  weatherCode: 0,
  weatherIcons: [],
  weatherDescriptions: [],
  windSpeed: 0,
  windDegree: 0,
  windDir: '',
  pressure: 0,
  precipitation: 0,
  humidity: 0,
  cloudCover: 0,
  feelsLike: 0,
  uvIndex: 0,
  visibility: 0,
  location: {
    name: '',
    country: '',
    region: '',
    lat: '',
    lon: '',
    timezoneId: '',
    localtime: '',
    localtimeEpoch: 0,
    utcOffset: '',
  },
};
