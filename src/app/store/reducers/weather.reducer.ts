import { createReducer, on } from '@ngrx/store';
import { updateWeather } from '../actions/weather.actions';
import { WeatherData } from '../../shared/types/Weather';
import { INITIAL_WEATHER_DATA } from '../../shared/constants';

export const initialState: WeatherData = INITIAL_WEATHER_DATA;
export const weatherReducer = createReducer(
  initialState,
  on(updateWeather, (state: WeatherData, action: WeatherData) => {
    console.log('[REDUCER] updateWeather: ', action);
    return {
      data: action.data
    };
  })
);
