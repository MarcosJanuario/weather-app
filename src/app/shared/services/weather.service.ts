import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponseData } from '../types/Weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:3000/weather';

  constructor(private http: HttpClient) {}

  getCurrentWeather(cityName: string): Observable<WeatherResponseData> {
    const requestBody = { cityName };
    return this.http.post<WeatherResponseData>(this.apiUrl, requestBody);
  }
}
