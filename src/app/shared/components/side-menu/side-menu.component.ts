import { Component, HostListener } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UiController } from '../../types/UiController';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toggleSideMenu } from '../../../store/actions/ui.actions';
import { Settings, Theme } from '../../types/Settings';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  animations: [
    trigger('slideInOut', [
      state('hidden', style({
        transform: 'translateX(100%)'
      })),
      state('visible', style({
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', animate('300ms ease-in-out')),
      transition('visible => hidden', animate('300ms ease-in-out'))
    ])
  ]
})
export class SideMenuComponent {
  private _destroy$: Subject<void> = new Subject<void>();

  uiControllerObservable$: Observable<UiController>;
  settingsObservable$: Observable<Settings>;

  ui: UiController = <UiController>{};
  settings: Settings = <Settings>{};
  sideMenuState: 'hidden' | 'visible' = 'hidden';

  constructor(private store: Store<{ ui: UiController; settings: Settings}>) {
    this.uiControllerObservable$ = store.select('ui');
    this.settingsObservable$ = store.select('settings');

    this.subscribeToUiController();
    this.subscribeToSettings();
  }

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.DARK;
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.closeSideMenu();
  }

  subscribeToUiController(): void {
    this.uiControllerObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((ui: UiController): void => {
        this.ui = ui;
        this.sideMenuState = ui.sideMenu.show;
      });
  }

  subscribeToSettings(): void {
    this.settingsObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((settings: Settings): void => {
        this.settings = settings;
      });
  }

  closeSideMenu(): void {
    this.store.dispatch(toggleSideMenu({
      data: 'hidden'
    }));
  }
}
