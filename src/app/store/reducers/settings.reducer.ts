import { createReducer, on } from '@ngrx/store';
import { updateTheme, resetSettings } from '../actions/settings.actions';
import { Settings, Theme } from '../../shared/types/Settings';

export const initialState: Settings = {
  theme: Theme.WHITE
};

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
