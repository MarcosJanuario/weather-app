import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Settings, Theme } from '../../types/Settings';
import { takeUntil } from 'rxjs/operators';
import { WeatherData } from '../../types/Weather';

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
  weatherData: WeatherData = <WeatherData>{};

  constructor(private store: Store<{ settings: Settings; weather: WeatherData}>) {
    this.settingsObservable$ = store.select('settings');
    this.weatherObservable$ = store.select('weather');
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
        console.log('[WEATHER] this.settings: ', this.settings);
      });
  }

  subscribeToWeatherData(): void {
    this.weatherObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((weatherData: WeatherData): void => {
        this.weatherData = weatherData;
        console.log('[WEATHER] this.weatherData: ', this.weatherData);
      });
  }

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.BLACK;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
