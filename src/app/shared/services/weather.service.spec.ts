import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../../environments/environment';
import { WeatherResponseData } from '../types/Weather';

export const mockWeatherResponseData: WeatherResponseData = {
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
    lat: '51.509865',
    lon: '-0.118092',
    timezoneId: 'Europe/Berlin',
    localtime: '2023-01-01T12:00:00',
    localtimeEpoch: 1641052800,
    utcOffset: '0'
  }
};

export const transformedDataResult = {
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
      lat: '51.509865',
      lon: '-0.118092',
      timezoneId: 'Europe/Berlin',
      localtime: '2023-01-01T12:00:00',
      localtimeEpoch: 1641052800,
      utcOffset: '0'
    }
  },
  error: null
}

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current weather for a city', () => {
    const cityName = 'Mainz';
    service.getCurrentWeather(cityName).subscribe((data) => {
      expect(data).toEqual(mockWeatherResponseData);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ cityName });

    req.flush(mockWeatherResponseData);
  });

  it('should transform weather data', () => {

    const transformedData = service.transformWeatherData(mockWeatherResponseData);

    expect(transformedData).toEqual(transformedDataResult);
  });
});
