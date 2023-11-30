import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Settings, Theme } from '../../types/Settings';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  settings$: Observable<Settings>;
  initialSettings: Settings = <Settings>{};

  constructor(private store: Store<{ settings: Settings }>) {
    this.settings$ = store.select('settings');
  }

  ngOnInit() {
    this.settings$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(settings => {
        this.initialSettings = settings;
        console.log('[WEATHER] this.initialSettings: ', this.initialSettings);
      });
  }

  get isDarkMode(): boolean {
    return this.initialSettings.theme === Theme.BLACK;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
