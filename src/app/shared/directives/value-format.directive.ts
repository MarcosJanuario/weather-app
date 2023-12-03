import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

type ValueFormat = { header: string, contentValue: any };
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
    let suffix = '';

    switch (header) {
      case 'feelsLike':
      case 'temperature':
        suffix = 'celsius degree';
        break;
      case 'humidity':
        suffix = '%';
        break;
      case 'pressure':
        suffix = 'hPa';
        break;
      case 'visibility':
        suffix = 'km';
        break;
      case 'windSpeed':
        suffix = 'km/h';
        break;
    }

    const formattedValue = `${contentValue} ${suffix}`;
    this.renderer.setProperty(this.el.nativeElement, 'innerText', formattedValue);
  }
}
