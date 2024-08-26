import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { LibroService } from '../../services/libro.service';

@Directive({
  selector: '[appDecoraEtiqueta]',
  standalone: true,
})
export class DecoraEtiquetaDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private libroService: LibroService
  ) {
    console.log('He invocado la directiva: ' + this.elementRef.nativeElement);
  }
  @HostListener('click', ['$event.target'])
  onClick() {
    console.log(this.elementRef.nativeElement.innerHTML);
    const titulo: string = this.elementRef.nativeElement.innerHTML;
    this.renderer.addClass(this.elementRef.nativeElement, 'colorRojo');

    // Recuperar la información extra
    const infoExtraHtml: string = this.libroService.recuperaInfoExtra(titulo);
    // Crear un elemento HTML para la información extra
    const infoExtraElement = this.renderer.createElement('div');
    infoExtraElement.innerHTML = infoExtraHtml;
    // Añadir el elemento al DOM
    this.renderer.appendChild(this.elementRef.nativeElement, infoExtraElement);
  }
}
