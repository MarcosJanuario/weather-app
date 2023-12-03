import { createAction, props } from '@ngrx/store';
import { UiController } from '../../shared/types/UiController';

export const toggleSideMenu = createAction('[UI] Toggle Side Menu', props<UiController>());
