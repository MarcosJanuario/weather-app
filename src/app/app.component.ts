import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Settings, Theme } from './shared/types/Settings';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { UiController } from './shared/types/UiController';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  settingsObservable$: Observable<Settings>;
  uiControllerObservable$: Observable<UiController>;

  settings: Settings = <Settings>{};
  uiController: UiController = <UiController>{};

  constructor(private store: Store<{ settings: Settings; ui: UiController }>) {
    this.settingsObservable$ = store.select('settings');
    this.uiControllerObservable$ = store.select('ui');

    this.subscribeToSettings();
    this.subscribeToUiController();
  }

  private subscribeToSettings(): void {
    this.settingsObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((settings: Settings): void => {
        this.settings = settings;
      });
  }

  private subscribeToUiController(): void {
    this.uiControllerObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((ui: UiController): void => {
        this.uiController = ui;
      });
  }

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.DARK;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
