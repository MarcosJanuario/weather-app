import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Settings, Theme } from '../../types/Settings';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, WeatherResponseData } from '../../types/Weather';
import { updateWeather } from '../../../store/actions/weather.actions';
import { toggleLoadingSpinner, toggleSideMenu } from '../../../store/actions/ui.actions';

const INPUT_DEBOUNCE_TIME = 500;

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _inputChange$ = new Subject<string>();

  settingsObservable$: Observable<Settings>;

  inputValue: string = '';
  settings: Settings = <Settings>{};

  constructor(
    private store: Store<{ settings: Settings; weather: WeatherData; }>,
    private weatherService: WeatherService,
  ) {
    this.settingsObservable$ = store.select('settings');

    this._inputChange$
      .pipe(
        debounceTime(INPUT_DEBOUNCE_TIME),
        takeUntil(this._destroy$)
      )
      .subscribe(newValue => {
        this.inputValue = newValue;
      });

    this.subscribeToSettings();
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

  private handleLoadingSpinner(value: boolean) {
    this.store.dispatch(toggleLoadingSpinner({
      data: value
    }));
  }

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.DARK;
  }

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this._inputChange$.next(newValue);
  }

  searchCity(): void {
    if (this.inputValue !== '') {
      this.handleLoadingSpinner(true);

      this.weatherService.getCurrentWeather(this.inputValue)
        .subscribe({
            next: (weatherData: WeatherResponseData): void => {
              const transformedData: WeatherData = this.weatherService.transformWeatherData(weatherData);
              this.store.dispatch(updateWeather(transformedData));
            },
            error: (error): void => {
              console.error('Error fetching weather data:', error);
              this.handleLoadingSpinner(false);
              this.store.dispatch(updateWeather({ data: null, error: error.error.error }));
            },
            complete: (): void => this.handleLoadingSpinner(false)
          }
        );
    }
  }

  get isButtonDisabled(): boolean {
    return this.inputValue === '';
  }

  toggleSideMenu(): void {
    this.store.dispatch(toggleSideMenu({
      data: 'visible'
    }));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
