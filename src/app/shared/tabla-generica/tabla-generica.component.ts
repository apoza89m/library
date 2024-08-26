import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-generica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-generica.component.html',
  styleUrl: './tabla-generica.component.scss',
})
export class TablaGenericaComponent {
  @Input() datos!: any[];
  @Input() columnas!: string[];
  @Input() modelos!: string[];

  // Obtener propiedades anidadas
  getPropiedad(elemento: any, atributo: string): any {
    if (atributo === 'name' && elemento.author) {
      return elemento.author.name;
    }
    return elemento[atributo];
  }
}
