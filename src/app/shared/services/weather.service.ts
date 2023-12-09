import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData, WeatherResponseData } from '../types/Weather';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentWeather(cityName: string): Observable<WeatherResponseData> {
    const requestBody = { cityName };
    return this.http.post<WeatherResponseData>(this.apiUrl, requestBody);
  }

  transformWeatherData(weatherData: WeatherResponseData): WeatherData {
    return {
      data: {
        observationTime: weatherData.observationTime,
        temperature: weatherData.temperature,
        weatherDescriptions: weatherData.weatherDescriptions,
        windSpeed: weatherData.windSpeed,
        pressure: weatherData.pressure,
        humidity: weatherData.humidity,
        feelsLike: weatherData.feelsLike,
        uvIndex: weatherData.uvIndex,
        visibility: weatherData.visibility,
        location: weatherData.location
      },
      error: null
    };
  }
}
