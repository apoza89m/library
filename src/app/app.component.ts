import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { LibroService } from './services/libro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Readizonia';

  tituloMenu!: string;

  constructor(private libroService: LibroService) {
    console.log('Bienvenido');
    this.libroService.tituloWeb.subscribe(
      (nuevoTitulo) => (this.tituloMenu = nuevoTitulo)
    );
  }
  /*   ngAfterViewInit(): void {
    this.libroService.tituloWeb.next('Libreria');
  } */
}
