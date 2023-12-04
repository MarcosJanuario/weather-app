import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponseData } from '../types/Weather';
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
}
