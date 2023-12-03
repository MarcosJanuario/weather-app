import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Settings, Theme } from '../../types/Settings';
import { takeUntil } from 'rxjs/operators';
import { Weather, WeatherData } from '../../types/Weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  settingsObservable$: Observable<Settings>;
  weatherObservable$: Observable<WeatherData>
  settings: Settings = <Settings>{};
  weatherData: Weather = <Weather>{
    "observationTime": "04:09 PM",
    "temperature": 4,
    "weatherDescriptions": [
      "Overcast"
    ],
    "windSpeed": 4,
    "humidity": 78,
    "feelsLike": 3,
    "uvIndex": 1,
    "visibility": 10,
    "location": {
      "name": "Mainz",
      "country": "Germany",
      "region": "Rheinland-Pfalz",
      "lat": "50.000",
      "lon": "8.271",
      "timezoneId": "Europe/Berlin",
      "localtime": "2023-11-30 17:09",
      "localtimeEpoch": 1701364140,
      "utcOffset": "1.0"
    }
  };

  constructor(private store: Store<{ settings: Settings; weather: WeatherData}>) {
    this.settingsObservable$ = store.select('settings');
    this.weatherObservable$ = store.select('weather');
  }

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.BLACK;
  }

  ngOnInit() {
    this.subscribeToSettings();
    this.subscribeToWeatherData();
  }

  subscribeToSettings(): void {
    this.settingsObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((settings: Settings): void => {
        this.settings = settings;
        console.log('[SETTINGS] this.settings: ', this.settings);
      });
  }

  subscribeToWeatherData(): void {
    this.weatherObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((weatherData: WeatherData): void => {
        if (weatherData.data) {
          this.weatherData = weatherData.data;
          console.log('[WEATHER] this.weatherData: ', this.weatherData);
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
