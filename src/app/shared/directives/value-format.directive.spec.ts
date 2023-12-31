import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ValueFormatDirective } from './value-format.directive';

@Component({
  template: '<div [appValueFormat]="valueFormat"></div>',
})
class TestComponent {
  valueFormat!: { header: string; contentValue: number | string };
}

describe('ValueFormatDirective', (): void => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueFormatDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(ValueFormatDirective));
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(ValueFormatDirective);
    expect(directive).toBeTruthy();
  });

  it('should format content value with suffix', (): void => {
    testComponent.valueFormat = { header: 'temperature', contentValue: 25 };

    fixture.detectChanges();
    const formattedValue = '25 celsius degree';

    expect(directiveElement.nativeElement.innerText).toBe(formattedValue);
  });

  it('should handle header without prefix', (): void => {
    testComponent.valueFormat = { header: 'Some other Header different than the ones filtered', contentValue: 42 };

    fixture.detectChanges();

    const formattedValue = '42';
    expect(directiveElement.nativeElement.innerText).toBe(formattedValue);
  });
});
