import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

type ValueFormat = { header: string, contentValue: any };

const SUFFIX_MAP = new Map<string, string>([
  ['feelsLike', 'celsius degree'],
  ['temperature', 'celsius degree'],
  ['humidity', '%'],
  ['pressure', 'hPa'],
  ['visibility', 'km'],
  ['windSpeed', 'km/h'],
]);

@Directive({
  selector: '[appValueFormat]'
})
export class ValueFormatDirective implements OnChanges {
  @Input('appValueFormat') valueFormat: ValueFormat = { header: '', contentValue: '' };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valueFormat']) {
      this.formatContentValue();
    }
  }

  private formatContentValue(): void {
    const { header, contentValue } = this.valueFormat;
    const suffix = SUFFIX_MAP.get(header) || '';

    const formattedValue = `${contentValue} ${suffix}`;
    this.setInnerHtml(formattedValue);
  }

  private setInnerHtml(value: string): void {
    this.renderer.setProperty(this.el.nativeElement, 'innerText', value);
  }
}
