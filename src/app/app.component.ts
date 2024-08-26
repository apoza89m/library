import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { LibroService } from './services/libro.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
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
}
