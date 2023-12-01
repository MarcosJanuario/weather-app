export type WeatherData = {
  data: Weather | null
}

export type WeatherResponseData = {
  observationTime: string;
  temperature: number;
  weatherCode: number;
  weatherIcons: string[];
  weatherDescriptions: string[];
  windSpeed: number;
  windDegree: number;
  windDir: string;
  pressure: number;
  precipitation: number;
  humidity: number;
  cloudCover: number;
  feelsLike: number;
  uvIndex: number;
  visibility: number;
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezoneId: string;
    localtime: string;
    localtimeEpoch: number;
    utcOffset: string;
  };
}

export type Weather = {
  observationTime: string;
  temperature: number;
  weatherDescriptions: string[];
  windSpeed: number;
  pressure: number;
  humidity: number;
  feelsLike: number;
  uvIndex: number;
  visibility: number;
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezoneId: string;
    localtime: string;
    localtimeEpoch: number;
    utcOffset: string;
  };
}
