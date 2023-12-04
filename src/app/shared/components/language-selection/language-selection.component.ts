import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Language, Settings } from '../../types/Settings';
import { updateLanguage } from '../../../store/actions/settings.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  settingsObservable$: Observable<Settings>;
  selectedLanguage: Language = Language.ENGLISH;

  constructor(
    private store: Store<{ settings: Settings }>,
    private translateService: TranslateService
  ) {
    this.settingsObservable$ = store.select('settings');
  }

  private subscribeToSettings(): void {
    this.settingsObservable$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((settings: Settings): void => {
        this.selectedLanguage = settings.language;
      });
  }

  ngOnInit(): void {
    this.subscribeToSettings();
  }

  onLanguageChange(event: Event): void {
    const language = (event.target as HTMLSelectElement).value;
    console.log('LANGUAGE SELECTION: ', language);
    this.translateService.use(language);
    this.store.dispatch(updateLanguage({
      data: this.selectedLanguage
    }));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
