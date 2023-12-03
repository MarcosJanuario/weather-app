import { createAction, props } from '@ngrx/store';
import { SideMenuAction } from '../../shared/types/UiController';


export const toggleSideMenu = createAction('[UI] Toggle Side Menu', props<SideMenuAction>());
