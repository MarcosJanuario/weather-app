import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Settings, Theme } from '../../types/Settings';
import { Store } from '@ngrx/store';

@Component({
  selector: 'weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit, OnDestroy {
  @Input() header: string = '';
  @Input() contentValue: any = '';

  private _destroy$: Subject<void> = new Subject<void>();
  settingsObservable$: Observable<Settings>;
  settings: Settings = <Settings>{};

  constructor(private store: Store<{ settings: Settings }>) {
    this.settingsObservable$ = store.select('settings');
    console.log('[contentValue]: ', this.contentValue);
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

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.DARK;
  }

  ngOnInit() {
    this.subscribeToSettings();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
