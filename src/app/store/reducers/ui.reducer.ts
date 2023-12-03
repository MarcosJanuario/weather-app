import { createReducer, on } from '@ngrx/store';
import { toggleLoadingSpinner, toggleSideMenu } from '../actions/ui.actions';
import { LoadingSpinnerAction, SideMenuAction, UiController } from '../../shared/types/UiController';

export const initialState: UiController = {
  sideMenu: { show: 'hidden' },
  loadingSpinner: { show: false }
};

export const uiReducer = createReducer(
  initialState,
  on(toggleSideMenu, (state: UiController, action: SideMenuAction) => {
    console.log('[REDUCER] toggleSideMenu state: ', state);
    console.log('[REDUCER] toggleSideMenu action: ', action);
    return {
      ...state,
      sideMenu: {
        show: action.data
      }
    };
  }),
  on(toggleLoadingSpinner, (state: UiController, action: LoadingSpinnerAction) => {
    console.log('[REDUCER] toggleLoadingSpinner state: ', state);
    console.log('[REDUCER] toggleLoadingSpinner action: ', action);
    return {
      ...state,
      loadingSpinner: {
        show: action.data
      }
    };
  })
);
