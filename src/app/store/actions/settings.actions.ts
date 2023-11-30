import { createAction, props } from '@ngrx/store';
import { Settings,  } from '../../shared/types/Settings';

export const updateTheme = createAction('[Updating theme]', props<Settings>());
export const resetSettings = createAction('[Resetting settings]', props<Settings>());
