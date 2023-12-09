import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../../environments/environment';
import { TRANSFORMED_WEATHER_DATA, WEATHER_RESPONSE_DATA } from '../utils/mock-data';

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
      expect(data).toEqual(WEATHER_RESPONSE_DATA);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ cityName });
    req.flush(WEATHER_RESPONSE_DATA);
  });

  it('should transform weather data', () => {
    const transformedData = service.transformWeatherData(WEATHER_RESPONSE_DATA);

    expect(transformedData).toEqual(TRANSFORMED_WEATHER_DATA);
  });
});
