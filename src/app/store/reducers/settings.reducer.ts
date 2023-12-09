import { createReducer, on } from '@ngrx/store';
import { updateTheme, resetSettings, updateLanguage } from '../actions/settings.actions';
import { LanguageAction, Settings, ThemeAction } from '../../shared/types/Settings';
import { INITIAL_SETTINGS_DATA } from '../../shared/utils/constants';

export const initialState: Settings = INITIAL_SETTINGS_DATA;

export const settingsReducer = createReducer<Settings>(
  initialState,
  on(updateTheme, (state: Settings, action: ThemeAction): Settings => {
    return {
      ...state,
      theme: action.data
    }
  }),
  on(updateLanguage, (state: Settings, action: LanguageAction): Settings => {
    return {
      ...state,
      language: action.data
    }
  }),
  on(resetSettings, (state: Settings): Settings => ({
    ...initialState
  }))
);
