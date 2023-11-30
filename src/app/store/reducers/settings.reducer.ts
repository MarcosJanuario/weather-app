import { createReducer, on } from '@ngrx/store';
import { updateTheme, resetSettings } from '../actions/settings.actions';
import { Settings } from '../../shared/types/Settings';
import { INITIAL_SETTINGS_DATA } from '../../shared/constants';

export const initialState: Settings = INITIAL_SETTINGS_DATA;

export const settingsReducer = createReducer<Settings>(
  initialState,
  on(updateTheme, (state: Settings, action): Settings => {
    return {
      ...state,
      theme: action.theme
    }
  }),
  on(resetSettings, (state: Settings): Settings => ({
    ...initialState
  }))
);
