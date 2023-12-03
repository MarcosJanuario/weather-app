import { createAction, props } from '@ngrx/store';
import { Settings, ThemeAction, } from '../../shared/types/Settings';

export const updateTheme = createAction('[Updating theme]', props<ThemeAction>());
export const resetSettings = createAction('[Resetting settings]', props<Settings>());
