import { createAction, props } from '@ngrx/store';
import { WeatherData } from '../../shared/types/Weather';

export const updateWeather = createAction('[Weather] Weather Data', props<WeatherData>());
