import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { VALUE_FORMAT_DIRECTIVE_MAP } from '../utils/constants';

type ValueFormat = { header: string, contentValue: any };

const SUFFIX_MAP = new Map<string, string>(VALUE_FORMAT_DIRECTIVE_MAP);

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
    console.log('[SUFFIX_MAP]: ', SUFFIX_MAP);
    const suffix = SUFFIX_MAP.get(header) || '';
    console.log('[suffix]: ', suffix);

    const formattedValue = `${contentValue} ${suffix}`;
    this.setInnerHtml(formattedValue);
  }

  private setInnerHtml(value: string): void {
    this.renderer.setProperty(this.el.nativeElement, 'innerText', value);
  }
}
