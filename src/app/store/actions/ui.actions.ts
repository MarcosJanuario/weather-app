import { createAction, props } from '@ngrx/store';
import { LoadingSpinnerAction, SideMenuAction } from '../../shared/types/UiController';


export const toggleSideMenu = createAction('[UI] Toggle Side Menu', props<SideMenuAction>());
export const toggleLoadingSpinner = createAction('[UI] Toggle Loading Spinner', props<LoadingSpinnerAction>());
