export type SideMenuDisplay = 'hidden' | 'visible';

export type SideMenuAction = {
  data: SideMenuDisplay
}

export type LoadingSpinnerAction = {
  data: boolean;
}

export type UiController = {
  sideMenu: {
    show: SideMenuDisplay;
  },
  loadingSpinner: {
    show: boolean
  }
}
