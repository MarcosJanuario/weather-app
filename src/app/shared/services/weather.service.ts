import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../types/Weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:3000/weather';

  constructor(private http: HttpClient) {}

  getCurrentWeather(cityName: string): Observable<WeatherData> {
    const requestBody = { cityName };
    return this.http.post<WeatherData>(this.apiUrl, requestBody);
  }
}
