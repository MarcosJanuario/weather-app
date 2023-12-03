import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UiController } from '../../types/UiController';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toggleSideMenu } from '../../../store/actions/ui.actions';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  animations: [
    trigger('slideInOut', [
      state('hidden', style({
        transform: 'translateX(100%)'
        // right: '-350px'
      })),
      state('visible', style({
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', animate('300ms ease-in-out')),
      transition('visible => hidden', animate('300ms ease-in-out'))
    ])
  ]
})
export class SideMenuComponent implements OnInit {
  private _destroy$: Subject<void> = new Subject<void>();
  uiControllerObservable$: Observable<UiController>;

  ui: UiController = <UiController>{};
  sideMenuState: 'hidden' | 'visible' = 'hidden';

  constructor(private store: Store<{ ui: UiController}>) {
    this.uiControllerObservable$ = store.select('ui');
  }

  ngOnInit() {
    this.subscribeToUiController();
  }

  subscribeToUiController(): void {
    this.uiControllerObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((ui: UiController): void => {
        console.log('[UI CONTROLLER] ui: ', ui);
        this.ui = ui;
        this.sideMenuState = ui.sideMenu.show;
      });
  }

  close(): void {
    console.log('closing menu ...');
    this.store.dispatch(toggleSideMenu({
      sideMenu: {
        show: 'hidden'
      }}
    ));
  }

  toggleSideMenu() {
    console.log('toggleSideMenu...');
    this.sideMenuState = (this.sideMenuState === 'hidden') ? 'visible' : 'hidden';
  }
}
