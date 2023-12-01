import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Settings } from '../../types/Settings';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, WeatherResponseData } from '../../types/Weather';
import { updateWeather } from '../../../store/actions/weather.actions';

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _inputChange$ = new Subject<string>();

  inputValue: string = '';

  constructor(
    private store: Store<{ settings: Settings; weather: WeatherData }>,
    private weatherService: WeatherService,
  ) {
    this._inputChange$
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy$)
      )
      .subscribe(newValue => {
        this.inputValue = newValue;
      });
  }

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this._inputChange$.next(newValue);
  }

  searchCity(): void {
    if (this.inputValue !== '') {
      this.weatherService.getCurrentWeather(this.inputValue)
        .subscribe({
            next: (weatherData: WeatherResponseData): void => {
              this.store.dispatch(updateWeather({
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
                  location: weatherData.location,
                }
              }));
            },
            error: (error): void => console.error('Error fetching weather data:', error),
            complete: (): void => console.log('Weather data fetch completed.')
          }
        );
    }
  }

  get isButtonDisabled(): boolean {
    return this.inputValue === '';
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
