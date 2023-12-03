export type SideMenuDisplay = 'hidden' | 'visible';

export type SideMenuAction = {
  data: SideMenuDisplay
}

export type UiController = {
  sideMenu: {
    show: SideMenuDisplay;
  }
}
