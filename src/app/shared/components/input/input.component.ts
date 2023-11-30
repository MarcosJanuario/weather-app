import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Settings, Theme } from '../../types/Settings';
import { updateTheme } from '../../../store/actions/settings.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _inputChange$ = new Subject<string>();

  inputValue: string = '';

  constructor(private store: Store<{ settings: Settings }>) {
    this._inputChange$
      .pipe(
        debounceTime(1000),
        takeUntil(this._destroy$)
      )
      .subscribe(newValue => {
        this.inputValue = newValue;
      });
  }

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this._inputChange$.next(newValue);
  }

  searchCity(): void {
    console.log('SEARCHING: ', this.inputValue);
    this.store.dispatch(updateTheme({
      theme: Theme.BLACK
    }));
  }

  get isButtonDisabled(): boolean {
    return this.inputValue === '';
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
