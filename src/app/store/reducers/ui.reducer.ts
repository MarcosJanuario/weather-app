import { createReducer, on } from '@ngrx/store';
import { toggleSideMenu } from '../actions/ui.actions';
import { UiController } from '../../shared/types/UiController';

export const initialState: UiController = {
  sideMenu: { show: 'hidden' }
};

export const uiReducer = createReducer(
  initialState,
  on(toggleSideMenu, (state, action) => {
    console.log('[REDUCER] toggleSideMenu state: ', state);
    console.log('[REDUCER] toggleSideMenu action: ', action);
    return {
      ...state,
      sideMenu: {
        show: action.sideMenu.show
      }
    };
  })
);
