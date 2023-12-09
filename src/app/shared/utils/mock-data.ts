import { WeatherResponseData } from '../types/Weather';

export const WEATHER_RESPONSE_DATA: WeatherResponseData = {
  observationTime: '2023-01-01T12:00:00',
  temperature: 20,
  weatherCode: 200,
  weatherIcons: ['icon1', 'icon2'],
  weatherDescriptions: ['Cloudy'],
  windSpeed: 10,
  windDegree: 180,
  windDir: 'S',
  pressure: 1015,
  precipitation: 0.5,
  humidity: 70,
  cloudCover: 40,
  feelsLike: 22,
  uvIndex: 3,
  visibility: 10,
  location: {
    name: 'Mainz',
    country: 'Germany',
    region: 'Europe',
    lat: '49.992862',
    lon: '8.247253',
    timezoneId: 'Europe/Berlin',
    localtime: '2023-01-01T12:00:00',
    localtimeEpoch: 1641052800,
    utcOffset: '+1'
  }
};

export const TRANSFORMED_WEATHER_DATA = {
  data: {
    observationTime: '2023-01-01T12:00:00',
    temperature: 20,
    weatherDescriptions: ['Cloudy'],
    windSpeed: 10,
    pressure: 1015,
    humidity: 70,
    feelsLike: 22,
    uvIndex: 3,
    visibility: 10,
    location: {
      name: 'Mainz',
      country: 'Germany',
      region: 'Europe',
      lat: '49.992862',
      lon: '8.247253',
      timezoneId: 'Europe/Berlin',
      localtime: '2023-01-01T12:00:00',
      localtimeEpoch: 1641052800,
      utcOffset: '+1'
    }
  },
  error: null
}
