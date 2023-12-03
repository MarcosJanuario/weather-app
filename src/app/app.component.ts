import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Settings, Theme } from './shared/types/Settings';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  settingsObservable$: Observable<Settings>;

  settings: Settings = <Settings>{};
  title = 'weather-app';

  constructor(private store: Store<{ settings: Settings }>) {
    this.settingsObservable$ = store.select('settings');
    this.subscribeToSettings();
  }

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.BLACK;
  }

  subscribeToSettings(): void {
    this.settingsObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((settings: Settings): void => {
        this.settings = settings;
        console.log('[SETTINGS] app.comp settings: ', this.settings);
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
