import { createAction, props } from '@ngrx/store';
import { LanguageAction, Settings, ThemeAction, } from '../../shared/types/Settings';

export const updateTheme = createAction('[Updating theme]', props<ThemeAction>());
export const updateLanguage = createAction('[Updating language]', props<LanguageAction>());
export const resetSettings = createAction('[Resetting settings]', props<Settings>());
