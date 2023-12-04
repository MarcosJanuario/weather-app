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

  private subscribeToSettings(): void {
    this.settingsObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((settings: Settings): void => {
        this.settings = settings;
      });
  }

  private subscribeToWeatherData(): void {
    this.weatherObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((weatherData: WeatherData): void => {
        if (weatherData) {
          this.weatherData = weatherData;
        }
      });
  }

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.DARK;
  }

  ngOnInit() {
    this.subscribeToSettings();
    this.subscribeToWeatherData();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
