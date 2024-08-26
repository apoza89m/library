import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appConvierteInput]',
  standalone: true,
})
export class ConversionInputDirective {
  @Input('appConvierteInput')
  tipo!: string;

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    const initialValue: string = this.elementRef.nativeElement.value;
    switch (this.tipo) {
      case 'upper':
        this.elementRef.nativeElement.value = initialValue.toUpperCase();
        break;
      case 'lower':
        this.elementRef.nativeElement.value = initialValue.toLowerCase();
        break;
    }
  }
}
