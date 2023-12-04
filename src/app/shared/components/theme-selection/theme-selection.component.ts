import { Component } from '@angular/core';
import { Settings, Theme } from '../../types/Settings';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { updateTheme } from '../../../store/actions/settings.actions';

@Component({
  selector: 'theme-selection',
  templateUrl: './theme-selection.component.html',
  styleUrl: './theme-selection.component.scss'
})
export class ThemeSelectionComponent {
  private _destroy$: Subject<void> = new Subject<void>();

  settingsObservable$: Observable<Settings>;

  selectedTheme: Theme = Theme.LIGHT;
  settings: Settings = <Settings>{};

  constructor(private store: Store<{ settings: Settings }>) {
    this.settingsObservable$ = store.select('settings');

    this.subscribeToSettings();
  }

  private subscribeToSettings(): void {
    this.settingsObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((settings: Settings): void => {
        this.settings = settings;
        this.selectedTheme = settings.theme
      });
  }

  get isDarkMode(): boolean {
    return this.settings.theme === Theme.DARK;
  }

  onThemeChanged(): void {
    this.store.dispatch(updateTheme({
      data: this.selectedTheme
    }));
  }

  protected readonly Theme = Theme;
}
