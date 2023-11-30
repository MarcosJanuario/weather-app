import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private inputChange$ = new Subject<string>();

  value: string = '';

  constructor() {
    this.inputChange$
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(newValue => {
        console.log('SUBSCRIBED new value: ', newValue);
        this.value = newValue;
      });
  }

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.inputChange$.next(newValue);
  }

  searchCity(): void {
    console.log('SEARCHING: ', this.value);
  }

  get isButtonDisabled(): boolean {
    return this.value === '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
